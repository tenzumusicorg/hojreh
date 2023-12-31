import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaginateModel, PaginateOptions } from 'mongoose';

// export default class UsersService {
//   constructor(
//     @InjectModel(PanelUser.name)
//     private usersPaginateModel: PaginateModel<UserDocument>,
//     private readonly usersRepository: UsersRepository,
//     private readonly usersAddressRepository: UserAddressRepository,
//     private excelService: ExcelService,
//     private fileService: FileService,
//   ) {}

//   public async getUserAddressList(
//     user_id: Types.ObjectId,
//   ): Promise<GetUserAddressListResDto> {
//     let foundAddressList = await this.usersAddressRepository.findAll(user_id);
//     let res = new GetUserAddressListResDto();
//     res.items = foundAddressList.map((element) => {
//       return {
//         id: element._id,
//         title: element.title,
//         postal_address: element.postal_address,
//         postal_code: element.postal_code,
//         no: element.no,
//         floor: element.floor,
//         lat: element.lat,
//         lon: element.lon,
//       };
//     });

//     return res;
//   }

//   public async getUserAddressDetail(
//     address_id: Types.ObjectId,
//   ): Promise<UserAddressItemDto> {
//     let foundAddress =
//       await this.usersAddressRepository.findOneById(address_id);
//     if (!foundAddress) throw new NotFoundException(NotFoundExceptionMessage);

//     let res = new UserAddressItemDto();
//     res = {
//       id: foundAddress._id,
//       title: foundAddress.title,
//       postal_address: foundAddress.postal_address,
//       postal_code: foundAddress.postal_code,
//       no: foundAddress.no,
//       floor: foundAddress.floor,
//       lat: foundAddress.lat,
//       lon: foundAddress.lon,
//     };

//     return res;
//   }
// }
