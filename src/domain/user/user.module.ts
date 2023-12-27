import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { IUserRepository } from './interface/IUser.repository';
import UsersRepository from './repository/users.repository';


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
  ],
  exports: [IUserRepository],
})
export default class TagDomainModule {}
