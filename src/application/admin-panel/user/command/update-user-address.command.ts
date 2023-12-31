import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateUserAddressCommand {
  constructor(
    public id: string,
    public title: string,
    public no: string,
    public floor: string,
    public postal_address: string,
    public postal_code: string,
    public lat: string,
    public lon: string,
  ) {}
}
@CommandHandler(UpdateUserAddressCommand)
export class UpdateUserAddressHandler
  implements ICommandHandler<UpdateUserAddressCommand>
{
  constructor(
    @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
  ) {}

  async execute(command: UpdateUserAddressCommand): Promise<void> {
    let foundUserAddress = await this.userAddressRepository.findOne(command.id);
    if (!foundUserAddress)
      throw new NotFoundException(NotFoundExceptionMessage);

    await this.userAddressRepository.updateOne(foundUserAddress.id, {
      ...command,
    });
  }
}
