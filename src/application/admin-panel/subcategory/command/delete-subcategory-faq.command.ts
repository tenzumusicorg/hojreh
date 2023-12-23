import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';

export class DeleteSubCategoryFaqCommand {
  constructor(
    public sub_category_id: string,
    public id: string,
  ) {}
}

@CommandHandler(DeleteSubCategoryFaqCommand)
export class DeleteSubCategoryFaqHandler
  implements ICommandHandler<DeleteSubCategoryFaqCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: DeleteSubCategoryFaqCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(
      command.sub_category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    foundSubCategory.faq_list = this.faqRepository.deleteFaq(
      command.id,
      foundSubCategory.faq_list,
    );

    this.subCategoryRepository.updateOne(foundSubCategory.id, foundSubCategory);
  }
}
