import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserAddressRepository } from 'src/domain/user/interface/IUserAddress.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteUserAddressCommand {
  constructor(public id: string) {}
}
@CommandHandler(DeleteUserAddressCommand)
export class DeleteUserAddressHandler
  implements ICommandHandler<DeleteUserAddressCommand>
{
  constructor(
    @Inject(IUserAddressRepository)
    private readonly userAddressRepository: IUserAddressRepository,
  ) {}

  async execute(command: DeleteUserAddressCommand): Promise<void> {
    let foundAddress = await this.userAddressRepository.findOne(command.id);
    if (!foundAddress) throw new NotFoundException(NotFoundExceptionMessage);

    this.userAddressRepository.deleteOne(foundAddress.id);
  }
}
