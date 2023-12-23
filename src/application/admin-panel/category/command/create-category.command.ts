import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from 'src/domain/category/entity/category.entity';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import FileService from 'src/infrastructure/file/file.service';

export class CreateCategoryCommand {
  constructor(
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

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private fileService: FileService,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<void> {
    let foundBanner = await this.fileService.getFileDetail(command.banner);
    let foundThumbnail = await this.fileService.getFileDetail(
      command.thumbnail,
    );

    let category = new Category();
    category.title = { en: command.title_en, fa: command.title_fa };
    category.descriptions = command.descriptions;
    category.seo_description = command.seo_description;
    category.seo_title = command.seo_description;
    category.faq_title = command.faq_title;
    category.faq_list = new Array<FAQItem>();
    category.thumbnail = foundThumbnail;
    category.banner = foundBanner;

    await this.categoryRepository.createOne(category);
  }
}
