import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';


export class CreateUserCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
  
    }
}
