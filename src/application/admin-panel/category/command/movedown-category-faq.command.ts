import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import CategoryRepository from 'src/domain/category/repository/category.repository';

export class MoveDownCategoryFaqCommand {
  constructor(
    public category_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveDownCategoryFaqCommand)
export class MoveDownCategoryFaqHandler
  implements ICommandHandler<MoveDownCategoryFaqCommand>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveDownCategoryFaqCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(
      command.category_id,
    );
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    foundCategory.faq_list = this.faqRepository.moveDownFaq(
      command.id,
      foundCategory.faq_list,
    );

    this.categoryRepository.updateOne(foundCategory.id, foundCategory);
  }
}
