import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import { SubCategory } from 'src/domain/subcategory/entity/subcategory.entity';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class CreateSubCategoryCommand {
  constructor(
    public category_id: string,
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

@CommandHandler(CreateSubCategoryCommand)
export class CreateSubCategoryHandler
  implements ICommandHandler<CreateSubCategoryCommand>
{
  constructor(
    @Inject(ISubCategoryRepository)
    private readonly subCategoryRepository: ISubCategoryRepository,
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private fileService: FileService,
  ) {}

  async execute(command: CreateSubCategoryCommand): Promise<void> {
    let foundBanner = await this.fileService.getFileDetail(command.banner);
    let foundThumbnail = await this.fileService.getFileDetail(
      command.thumbnail,
    );

    let foundCategory = await this.categoryRepository.findOne(
      command.category_id,
    );
    if (!foundCategory) throw new NotFoundException(NotFoundExceptionMessage);

    let subcategory = new SubCategory();
    subcategory.category = foundCategory.id;
    subcategory.title = { en: command.title_en, fa: command.title_fa };
    subcategory.descriptions = command.descriptions;
    subcategory.seo_description = command.seo_description;
    subcategory.seo_title = command.seo_description;
    subcategory.faq_title = command.faq_title;
    subcategory.faq_list = new Array<FAQItem>();
    subcategory.thumbnail = foundThumbnail;
    subcategory.banner = foundBanner;

    await this.subCategoryRepository.createOne(subcategory);
  }
}
