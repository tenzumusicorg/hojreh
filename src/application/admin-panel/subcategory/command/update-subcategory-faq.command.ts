import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class UpdateSubCategoryFaqCommand {
  constructor(
    public sub_category_id: string,
    public id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(UpdateSubCategoryFaqCommand)
export class UpdateSubCategoryFaqHandler
  implements ICommandHandler<UpdateSubCategoryFaqCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: UpdateSubCategoryFaqCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(
      command.sub_category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    foundSubCategory.faq_list = this.faqRepository.updateFaq(
      { id: command.id, question: command.question, answer: command.answer },
      foundSubCategory.faq_list,
    );

    this.subCategoryRepository.updateOne(foundSubCategory.id, foundSubCategory);
  }
}
