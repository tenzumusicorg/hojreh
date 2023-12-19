import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteBrandCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler implements ICommandHandler<DeleteBrandCommand> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(command: DeleteBrandCommand): Promise<void> {
    let foundBrand = await this.brandRepository.findOne(command.id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    this.brandRepository.deleteOne(foundBrand.id);
  }
}
