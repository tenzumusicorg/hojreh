import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';

export class AddCategoryFaqCommand {
  constructor(
    public category_id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(AddCategoryFaqCommand)
export class AddCategoryFaqHandler
  implements ICommandHandler<AddCategoryFaqCommand>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: AddCategoryFaqCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(
      command.category_id,
    );
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    foundCategory.faq_list = this.faqRepository.createFaq(
      { answer: command.answer, question: command.question },
      foundCategory.faq_list,
    );

    this.categoryRepository.updateOne(foundCategory.id, foundCategory);
  }
}
