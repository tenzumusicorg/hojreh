import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from 'src/domain/category/entity/category.entity';
import { ICategoryRepository } from 'src/domain/category/interface/ICategory.repository';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateCategoryCommand {
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

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private fileService: FileService,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<void> {
    let foundCategory = await this.categoryRepository.findOne(command.id);
    if (!foundCategory) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    if (!!command.title_en) foundCategory.title.en = command.title_en;

    if (!!command.title_fa) foundCategory.title.fa = command.title_fa;

    if (!!command.banner) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundCategory.banner = foundFile;
    }
    if (!!command.thumbnail) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundCategory.thumbnail = foundFile;
    }

    if (!!command.descriptions) {
      foundCategory.descriptions = command.descriptions;
    }

    if (!!command.seo_title) foundCategory.seo_title = command.seo_title;

    if (!!command.seo_description)
      foundCategory.seo_description = command.seo_description;

    if (!!command.faq_title) foundCategory.faq_title = command.faq_title;

    await this.categoryRepository.updateOne(foundCategory.id, foundCategory);
  }
}
