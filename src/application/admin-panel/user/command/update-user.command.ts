import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';


export class UpdateUserCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<void> {
  
    }
}
