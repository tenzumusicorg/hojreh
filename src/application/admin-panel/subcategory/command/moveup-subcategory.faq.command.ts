import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class MoveDownSubCategoryFaqCommand {
  constructor(
    public sub_category_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveDownSubCategoryFaqCommand)
export class MoveDownSubCategoryFaqHandler
  implements ICommandHandler<MoveDownSubCategoryFaqCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveDownSubCategoryFaqCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(
      command.sub_category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    foundSubCategory.faq_list = this.faqRepository.moveDownFaq(
      command.id,
      foundSubCategory.faq_list,
    );

    this.subCategoryRepository.updateOne(foundSubCategory.id, foundSubCategory);
  }
}
