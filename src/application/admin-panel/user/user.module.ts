import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import UserDomainModule from 'src/domain/user/user.module';
import { AddUserAddressHandler } from './command/add-user-address.command';
import { CreateUserHandler } from './command/create-user.command';
import { DeleteUserHandler } from './command/delete-user.command';
import { UpdateUserHandler } from './command/update-user.command';
import { UpdateUserAddressHandler } from './command/update-user-address.command';
import { DeleteUserAddressHandler } from './command/delete-user-address.command';
import { UserListHandler } from './query/user-list.query';
import { UserDetailHandler } from './query/user.query';
import { UserAddressHandler } from './query/user-address.query';
import { UserAddressListHandler } from './query/user-address-list.query';
import { UserExcelHandler } from './query/download-user-excel.query';
import UserController from './user.controller';

export const commandHandlers = [
  AddUserAddressHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  UpdateUserAddressHandler,
  DeleteUserAddressHandler,
];
export const queryHandlers = [
  UserListHandler,
  UserDetailHandler,
  UserAddressHandler,
  UserAddressListHandler,
  UserExcelHandler,
];

@Module({
  imports: [CqrsModule, UserDomainModule],
  controllers: [UserController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class UserModule {}
