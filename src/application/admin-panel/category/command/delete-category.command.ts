import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CategoryRepository from 'src/domain/category/repository/category.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteCategoryCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: DeleteCategoryCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(command.id);
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    this.categoryRepository.deleteOne(foundCategory.id);
  }
}
