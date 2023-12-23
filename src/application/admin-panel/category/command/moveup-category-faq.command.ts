import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';

export class MoveUpCategoryFaqCommand {
  constructor(
    public category_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveUpCategoryFaqCommand)
export class MoveUpCategoryFaqHandler
  implements ICommandHandler<MoveUpCategoryFaqCommand>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveUpCategoryFaqCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(
      command.category_id,
    );
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    foundCategory.faq_list = this.faqRepository.moveUpFaq(
      command.id,
      foundCategory.faq_list,
    );

    this.categoryRepository.updateOne(foundCategory.id, foundCategory);
  }
}
