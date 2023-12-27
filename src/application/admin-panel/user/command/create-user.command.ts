import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/IUser.repository';


export class AddUserAddressCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(AddUserAddressCommand)
export class AddUserAddressHandler implements ICommandHandler<AddUserAddressCommand> {
    constructor(
        @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: AddUserAddressCommand): Promise<void> {
  
    }
}
