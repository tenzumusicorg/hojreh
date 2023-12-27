import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';


export class AddUserAddressCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(AddUserAddressCommand)
export class AddUserAddressHandler implements ICommandHandler<AddUserAddressCommand> {
    constructor(
        @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
    ) { }

    async execute(command: AddUserAddressCommand): Promise<void> {
  
    }
}
