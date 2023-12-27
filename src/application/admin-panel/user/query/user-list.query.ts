import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { Inject } from '@nestjs/common';

export class UserListQuery {
  constructor() {}
}

@QueryHandler(UserListQuery)
export class UserListHandler implements IQueryHandler<UserListQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: UserListQuery){
  }
}
