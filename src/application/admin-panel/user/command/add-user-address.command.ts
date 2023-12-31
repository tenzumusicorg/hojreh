import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAddress } from 'src/domain/user/entity/user-address';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';

export class AddUserAddressCommand {
  constructor(
    public user_id: string,
    public title: string,
    public no: string,
    public floor: string,
    public postal_address: string,
    public postal_code: string,
    public lat: string,
    public lon: string,
  ) {}
}
@CommandHandler(AddUserAddressCommand)
export class AddUserAddressHandler
  implements ICommandHandler<AddUserAddressCommand>
{
  constructor(
    @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
  ) {}

  async execute(command: AddUserAddressCommand): Promise<void> {
    let address = new UserAddress();
    address = { ...command, id: undefined };
    await this.userAddressRepository.createOne(address);
  }
}
