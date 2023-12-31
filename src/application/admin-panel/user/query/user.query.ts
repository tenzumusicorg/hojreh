import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import { UserDto } from '../dto/user.dto';

export class UserDetailQuery {
  constructor(public id: string) {}
}

@QueryHandler(UserDetailQuery)
export class UserDetailHandler implements IQueryHandler<UserDetailQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: UserDetailQuery) {
    let foundUser = await this.userRepository.findOne(query.id);

    if (!foundUser) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }
    let user = new UserDto();
    user.id = foundUser.id;
    user.first_name = foundUser.first_name;
    user.last_name = foundUser.last_name;
    user.email = foundUser.email;
    user.phone_number = foundUser.phone_number;
    user.email_verified = foundUser.email_verified;
    user.national_code = foundUser.national_code;
    user.register_date = foundUser.register_date;
    user.roles = foundUser.roles;
    user.status = foundUser.status;
    user.signup_complete = foundUser.signup_complete;

    return user;
  }
}
