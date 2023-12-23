import { Inject, NotFoundException } from '@nestjs/common';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class MoveUpSubCategoryFaqCommand {
  constructor(
    public sub_category_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveUpSubCategoryFaqCommand)
export class MoveUpSubCategoryFaqHandler
  implements ICommandHandler<MoveUpSubCategoryFaqCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveUpSubCategoryFaqCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(
      command.sub_category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    foundSubCategory.faq_list = this.faqRepository.moveUpFaq(
      command.id,
      foundSubCategory.faq_list,
    );

    this.subCategoryRepository.updateOne(foundSubCategory.id, foundSubCategory);
  }
}
