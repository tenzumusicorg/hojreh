import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { IUserRepository } from './interface/IUser.repository';
import UsersRepository from './repository/users.repository';
import { IUserAddressRepository } from './interface/IUserAddress.repository';
import UserAddressRepository from './repository/user-address.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UsersRepository,
    },
    {
        provide: IUserAddressRepository,
        useClass: UserAddressRepository,
      },
  ],
  exports: [IUserRepository,IUserAddressRepository],
})
export default class UserDomainModule {}
