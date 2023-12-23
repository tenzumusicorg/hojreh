import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class UpdateCategoryFaqCommand {
  constructor(
    public category_id: string,
    public id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(UpdateCategoryFaqCommand)
export class UpdateCategoryFaqHandler
  implements ICommandHandler<UpdateCategoryFaqCommand>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: UpdateCategoryFaqCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(
      command.category_id,
    );
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    foundCategory.faq_list = this.faqRepository.updateFaq(
      { id: command.id, question: command.question, answer: command.answer },
      foundCategory.faq_list,
    );

    this.categoryRepository.updateOne(foundCategory.id, foundCategory);
  }
}
