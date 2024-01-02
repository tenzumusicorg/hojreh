import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto, { CreateUserResDto } from './dto/create-user.dto';
import UpdateUserDto, { UpdateUserResDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { UserDetailQuery } from './query/user.query';
import { CreateUserCommand } from './command/create-user.command';
import { UpdateUserAddressCommand } from './command/update-user-address.command';
import { UpdateUserCommand } from './command/update-user.command';
import { GetUserListDto, UserListDto } from './dto/user-list.dto';
import { UserListQuery } from './query/user-list.query';
import {
  UserAddressItemDto,
  UserAddressListDto,
} from './dto/user-address-list.dto';
import { UserAddressListQuery } from './query/user-address-list.query';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import { AddUserAddressDto } from './dto/add-user-address.dto';
import { AddUserAddressCommand } from './command/add-user-address.command';
import UpdateUserAddressDto from './dto/update-user-address.dto';
import { DeleteUserAddressCommand } from './command/delete-user-address.command';
import { UserAddressQuery } from './query/user-address.query';
import { UserExcelQuery } from './query/download-user-excel.query';

@ApiTags('Admin/Users')
@ApiBearerAuth()
@ApiExtraModels(UserDto)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('profile/:id')
  @ApiOkResponse({
    type: UserDto,
    description: '200. Success. Returns a user',
  })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(HttpStatus.OK)
  @AdminAuth()
  async getById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserDto> {
    return this.queryBus.execute(new UserDetailQuery(id));
  }

  @Post('create')
  @ApiOkResponse({
    type: CreateUserDto,
    description: '201. Success. create a new user',
  })
  @HttpCode(HttpStatus.CREATED)
  @AdminAuth()
  async createUser(@Body() request: CreateUserDto): Promise<CreateUserResDto> {
    this.commandBus.execute(
      new CreateUserCommand(
        request.email,
        request.first_name,
        request.last_name,
        request.phone_number,
        request.avatar_image,
      ),
    );
    return new CreateUserResDto();
  }

  @Patch('update')
  @ApiOkResponse({
    type: UpdateUserResDto,
    description: '200. Success. update a existing user',
  })
  @HttpCode(HttpStatus.OK)
  @AdminAuth()
  async updateUser(@Body() request: UpdateUserDto): Promise<UpdateUserResDto> {
    this.commandBus.execute(
      new UpdateUserCommand(
        request.user_id,
        request.email,
        request.phone_number,
        request.first_name,
        request.last_name,
        request.national_code,
        request.status,
        request.avatar_image,
      ),
    );
    return new UpdateUserResDto();
  }

  @Post('list')
  @ApiOkResponse({
    type: UserListDto,
    description: '200. Success. get list of users with pagination and filter',
  })
  @HttpCode(HttpStatus.OK)
  @AdminAuth()
  async getUsersList(@Body() request: GetUserListDto): Promise<UserListDto> {
    return this.queryBus.execute(
      new UserListQuery(
        request.page,
        request.limit,
        request.query,
        request.filter_status,
      ),
    );
  }

  @Get('address/list/:id')
  @ApiOkResponse({
    type: UserAddressListDto,
    description: '200. Success. Returns a user address list',
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String })
  @AdminAuth()
  async getUserAddressList(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserAddressListDto> {
    return this.queryBus.execute(new UserAddressListQuery(id));
  }

  @Post('address/add')
  @ApiOkResponse({
    type: SuccessResponse,
  })
  @ApiBody({ type: AddUserAddressDto })
  @ApiBearerAuth()
  @AdminAuth()
  async addUserAddress(
    @Body() request: AddUserAddressDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new AddUserAddressCommand(
        request.user_id,
        request.title,
        request.no,
        request.floor,
        request.postal_address,
        request.postal_code,
        request.lat,
        request.lon,
      ),
    );
    return new SuccessResponse();
  }

  @Patch('address/edit')
  @ApiOkResponse({
    type: SuccessResponse,
  })
  @ApiBody({ type: UpdateUserAddressDto })
  @ApiBearerAuth()
  @AdminAuth()
  async updateUserAddress(
    @Body() request: UpdateUserAddressDto,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(
      new UpdateUserAddressCommand(
        request.address_id,
        request.title,
        request.no,
        request.floor,
        request.postal_address,
        request.postal_code,
        request.lat,
        request.lon,
      ),
    );
    return new SuccessResponse();
  }

  @Delete('address/delete/:id')
  @ApiOkResponse({
    type: SuccessResponse,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @AdminAuth()
  @ApiBearerAuth()
  async deleteUserAddress(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteUserAddressCommand(id));
    return new SuccessResponse();
  }

  @Get('address/:id')
  @ApiOkResponse({
    type: UserAddressItemDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiBearerAuth()
  @AdminAuth()
  async getUserAddressDetail(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserAddressItemDto> {
    return this.queryBus.execute(new UserAddressQuery(id));
  }

  @Get('excel-list')
  @ApiOkResponse({
    description: '200. Success. get users list excel file',
  })
  @HttpCode(HttpStatus.OK)
  @AdminAuth()
  async getUsersListExcel() {
    return this.queryBus.execute(new UserExcelQuery());
  }
}
