import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';


export class UpdateUserAddressCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(UpdateUserAddressCommand)
export class UpdateUserAddressHandler implements ICommandHandler<UpdateUserAddressCommand> {
    constructor(
        @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
    ) { }

    async execute(command: UpdateUserAddressCommand): Promise<void> {
  
    }
}
