import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';
import { Inject } from '@nestjs/common';

export class UserDetailQuery {
  constructor() {}
}

@QueryHandler(UserDetailQuery)
export class UserDetaillHandler implements IQueryHandler<UserDetailQuery> {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: UserDetailQuery){
  }
}
