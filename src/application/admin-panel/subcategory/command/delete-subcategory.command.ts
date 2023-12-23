import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteSubCategoryCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteSubCategoryCommand)
export class DeleteSubCategoryHandler
  implements ICommandHandler<DeleteSubCategoryCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
  ) {}

  async execute(command: DeleteSubCategoryCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(command.id);
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    this.subCategoryRepository.deleteOne(foundSubCategory.id);
  }
}
