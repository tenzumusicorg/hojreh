import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class AddSubCategoryFaqCommand {
  constructor(
    public category_id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(AddSubCategoryFaqCommand)
export class AddSubCategoryFaqHandler
  implements ICommandHandler<AddSubCategoryFaqCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: AddSubCategoryFaqCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(
      command.category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    foundSubCategory.faq_list = this.faqRepository.createFaq(
      { answer: command.answer, question: command.question },
      foundSubCategory.faq_list,
    );

    this.subCategoryRepository.updateOne(foundSubCategory.id, foundSubCategory);
  }
}
