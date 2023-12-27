import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';


export class DeleteUserAddressCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(DeleteUserAddressCommand)
export class DeleteUserAddressHandler implements ICommandHandler<DeleteUserAddressCommand> {
    constructor(
        @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
    ) { }

    async execute(command: DeleteUserAddressCommand): Promise<void> {
  
    }
}
