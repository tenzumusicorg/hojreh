import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { WEBSITE_BUCKET } from 'src/modules/app/file/constants/app-bucket.constant';
import { ExcelService } from 'src/modules/app/file/execl.service';
import FileService from 'src/modules/app/file/file.service';
import { MailService } from 'src/modules/app/mail/mail.service';
import CreateUserReqDto, { CreateUserResDto } from './dto/create-user.dto';
import {
  GetUsersListReqDto,
  GetUsersListResDto,
  GetUsersListResItemDto,
} from './dto/user-list.dto';
import UpdateUserReqDto, { UpdateUserResDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user.dto';
import { PanelUser, UserDocument } from './schemas/users.schema';
import UsersRepository from './users.repository';
import {
  BadRequestExceptionMessage,
  EmailAlreadyExistsExceptionMessage,
  NotFoundExceptionMessage,
  PhoneAlreadyExistsExceptionMessage,
} from 'src/constants/exception.constants';
import UserAddressRepository from './user-address.repository';
import { GetUserAddressListResDto, UserAddressItemDto } from './dto/user-address-list.dto';
import { userCreatedEmailValues, userEmailUpdatedEmailValues } from './users.constants';
import { ConfigService } from '@nestjs/config';
import { AddUserAddressReqDto } from './dto/add-user-address.dto';
import UpdateUserAddressReqDto from './dto/update-user-address.dto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(PanelUser.name)
    private usersPaginateModel: PaginateModel<UserDocument>,
    private readonly usersRepository: UsersRepository,
    private readonly usersAddressRepository: UserAddressRepository,
    private readonly mailService: MailService,
    private excelService: ExcelService,
    private fileService: FileService,
    private configService: ConfigService
  ) {}

  public async getById(id: Types.ObjectId): Promise<UserResponseDto> {
    let foundUser = await this.usersRepository.findOneById(id);

    if (!foundUser) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    return { ...foundUser, id: foundUser._id };
  }

  public async createUser(
    request: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    let userExistsWithEmail = await this.usersRepository.findOneByEmail(
      request.email,
    );
    let userExistsWithPhoneNumber =
      await this.usersRepository.findOneByPhoneNumber(request.phone_number);

    if (!!userExistsWithEmail || !!userExistsWithPhoneNumber) {
      throw new BadRequestException(BadRequestExceptionMessage);
    }
    await this.usersRepository.create(
      request.phone_number,
      request.first_name,
      request.last_name,
      request.email,
      request.avatar_image,
    );

    this.mailService.sendEmail({
      to: request.first_name,
      subject: userCreatedEmailValues.subject,
      upText: `${request.first_name} ${userCreatedEmailValues.upText}`,
      bottomText: `${userCreatedEmailValues.bottomText}`,
      code1: `شماره تلفن: ${request.phone_number}`,
      linkText: `ورود به تنزوشاپ`,
      linkUrl: `${this.configService.get<string>('SHOP_APP_HOST')!}‍‍‍‍‍‍`,
    });

    return new CreateUserResDto();
  }

  async updateUser(request: UpdateUserReqDto) {
    let foundUser = await this.usersRepository.findOneById(request.user_id);
    if (!foundUser) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    if (!!request.phone_number) {
      let userExistsWithPhoneNumber =
        await this.usersRepository.findOneByPhoneNumber(request.phone_number);

      if (
        !!userExistsWithPhoneNumber &&
        userExistsWithPhoneNumber._id.toString() !== foundUser._id.toString()
      ) {
        throw new BadRequestException(PhoneAlreadyExistsExceptionMessage);
      }
    }

    if (!!request.email) {
      let userExistsWithEmail = await this.usersRepository.findOneByEmail(
        request.email,
      );
      if (
        !!userExistsWithEmail &&
        userExistsWithEmail._id.toString() !== foundUser._id.toString()
      ) {
        throw new BadRequestException(EmailAlreadyExistsExceptionMessage);
      }
      this.mailService.sendEmail({
        to: request.first_name,
        subject: userEmailUpdatedEmailValues.subject,
        upText: `${request.first_name} ${userEmailUpdatedEmailValues.upText}`,
        bottomText: `${userEmailUpdatedEmailValues.bottomText}`,
        code1: `شماره تلفن: ${request.phone_number}`,
        linkText: `ورود به تنزوشاپ`,
        linkUrl: `${this.configService.get<string>('SHOP_APP_HOST')!}‍‍‍‍‍‍`,
      });
    }

    await this.usersRepository.updateById(request.user_id, { ...request });
    return new UpdateUserResDto();
  }

  public async getUsersList(
    request: GetUsersListReqDto,
  ): Promise<GetUsersListResDto> {
    const options: PaginateOptions = {
      select: [
        'id',
        'first_name',
        'last_name',
        'register_date',
        'phone_number',
        'status',
        'avatar_image',
      ],
      page: request.page,
      limit: request.limit,
    };
    let query = this.usersPaginateModel.find();
    if (!!request.query) {
      query.where({
        $or: [
          { first_name: new RegExp(request.query, 'i') },
          { last_name: new RegExp(request.query, 'i') },
          { phone_number: new RegExp(request.query, 'i') },
        ],
      });
    }
    if (request.filter_status.length != 0)
      query.where({ status: { $in: request.filter_status } });

    let foundUsersList = await this.usersPaginateModel.paginate(query, options);

    let res = new GetUsersListResDto();
    res.page = foundUsersList.page || request.page;
    res.total_pages = foundUsersList.totalPages;
    res.items = foundUsersList.docs.map((element) => {
      return {
        id: element._id.toString(),
        avatar_image: element.avatar_image,
        first_name: element.first_name,
        last_name: element.last_name,
        register_date: element.register_date,
        status: element.status,
        phone_number: element.phone_number,
      } as GetUsersListResItemDto;
    });
    res.total_users = await this.usersPaginateModel.countDocuments({});
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    res.total_users_in_month = await this.usersPaginateModel.countDocuments({
      createdAt: { $gte: lastMonth },
    });
    res.total_customers = await this.getTotalCustomers();

    return res;
  }

  async downloadUserListExcelFile() {
    let foundUsersList = await this.usersRepository.findAll();
    let columns = [
      { header: 'User Id', key: '_id', width: 25 },
      { header: 'First Name', key: 'first_name', width: 15 },
      { header: 'Last Name', key: 'last_name', width: 15 },
      { header: 'Phone number', key: 'phone_number', width: 15 },
      { header: 'email', key: 'email', width: 25 },
      { header: 'Status', key: 'status', width: 10 },
    ];
    let fileName: string = 'users.xlsx';
    let excelBuffer = await this.excelService.createExcel({
      data: foundUsersList,
      columns,
      file_name: 'users',
    });

    let uploadedFile = await this.fileService.saveFileInObjectStorage(
      excelBuffer!,
      fileName,
      WEBSITE_BUCKET,
      'public-read',
      'xlsx'
    );
    let link = await this.fileService.getUrl(fileName, WEBSITE_BUCKET);
    return {
      download_url: link,
    };
  }

  private async getTotalCustomers(): Promise<number> {
    const count = await this.usersPaginateModel
      .aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'user_id',
            as: 'orders',
          },
        },
        {
          $project: {
            _id: 1,
            email: 1,
            orderCount: { $size: '$orders' },
          },
        },
        {
          $match: { orderCount: { $gte: 1 } },
        },
        {
          $group: { _id: null, customerCount: { $sum: 1 } },
        },
      ])
      .exec();

    return count.length > 0 ? count[0].customerCount : 0;
  }

  public async getUserAddressList(
    user_id: Types.ObjectId,
  ): Promise<GetUserAddressListResDto> {
    let foundAddressList = await this.usersAddressRepository.findAll(user_id);
    let res = new GetUserAddressListResDto();
    res.items = foundAddressList.map((element) => {
      return {
        id: element._id,
        title: element.title,
        postal_address: element.postal_address,
        postal_code: element.postal_code,
        no: element.no,
        floor: element.floor,
        lat: element.lat,
        lon: element.lon,
      };
    });

    return res;
  }


  public async getUserAddressDetail(
    address_id: Types.ObjectId,
  ): Promise<UserAddressItemDto> {
    let foundAddress = await this.usersAddressRepository.findOneById(
      address_id,
    );
    if (!foundAddress) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new UserAddressItemDto();
    res = {
      id: foundAddress._id,
      title: foundAddress.title,
      postal_address: foundAddress.postal_address,
      postal_code: foundAddress.postal_code,
      no: foundAddress.no,
      floor: foundAddress.floor,
      lat: foundAddress.lat,
      lon: foundAddress.lon,
    };

    return res;
  }

  public async deleteUserAddress(address_id: Types.ObjectId) {
    let foundAddress = await this.usersAddressRepository.findOneById(
      address_id,
    );
    if (!foundAddress) throw new NotFoundException(NotFoundExceptionMessage);

    await this.usersAddressRepository.deleteUserAddress(foundAddress._id);
  }

  async addUserAddress(
    request: AddUserAddressReqDto,
  ) {
    await this.usersAddressRepository.create({
      ...request
    });
  }

  async updateUserAddress(request: UpdateUserAddressReqDto) {
    let foundUserAddress = await this.usersAddressRepository.findOneById(
      request.address_id,
    );
    if (!foundUserAddress) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    await this.usersAddressRepository.updateById(foundUserAddress._id, {
      ...request,
    });
  }
}
