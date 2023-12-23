import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from 'src/domain/category/entity/category.entity';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateSubCategoryCommand {
  constructor(
    public id: string,
    public title_fa: string,
    public title_en: string,
    public thumbnail: string,
    public banner: string,
    public descriptions: Array<DescriptionItem>,
    public seo_title: DualLanguageText,
    public seo_description: DualLanguageText,
    public faq_title: DualLanguageText,
  ) {}
}

@CommandHandler(UpdateSubCategoryCommand)
export class UpdateSubCategoryHandler
  implements ICommandHandler<UpdateSubCategoryCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    private fileService: FileService,
  ) {}

  async execute(command: UpdateSubCategoryCommand): Promise<void> {
    let foundSubCategory = await this.subCategoryRepository.findOne(command.id);
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.title_en) foundSubCategory.title.en = command.title_en;

    if (!!command.title_fa) foundSubCategory.title.fa = command.title_fa;

    if (!!command.banner) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundSubCategory.banner = foundFile;
    }
    if (!!command.thumbnail) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundSubCategory.thumbnail = foundFile;
    }

    if (!!command.descriptions) {
      foundSubCategory.descriptions = command.descriptions;
    }

    if (!!command.seo_title) foundSubCategory.seo_title = command.seo_title;

    if (!!command.seo_description)
      foundSubCategory.seo_description = command.seo_description;

    if (!!command.faq_title) foundSubCategory.faq_title = command.faq_title;

    await this.subCategoryRepository.updateOne(
      foundSubCategory.id,
      foundSubCategory,
    );
  }
}
