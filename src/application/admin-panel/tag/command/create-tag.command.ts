import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import { ISubCategoryRepository } from 'src/domain/subcategory/interface/ISubCategory.repository';
import { Tag } from 'src/domain/tag/entity/tag.entity';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class CreateTagCommand {
  constructor(
    public sub_category_id: string,
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

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
  constructor(
    @Inject(ITagRepository)
    private readonly TagRepository: ITagRepository,
    @Inject(ISubCategoryRepository)
    private readonly subcategoryRepository: ISubCategoryRepository,
    private fileService: FileService,
  ) {}

  async execute(command: CreateTagCommand): Promise<void> {
    let foundBanner = await this.fileService.getFileDetail(command.banner);
    let foundThumbnail = await this.fileService.getFileDetail(
      command.thumbnail,
    );

    let foundSubCategory = await this.subcategoryRepository.findOne(
      command.sub_category_id,
    );
    if (!foundSubCategory)
      throw new NotFoundException(NotFoundExceptionMessage);

    let tag = new Tag();
    tag.subcategory = foundSubCategory.id;
    tag.title = { en: command.title_en, fa: command.title_fa };
    tag.descriptions = command.descriptions;
    tag.seo_description = command.seo_description;
    tag.seo_title = command.seo_description;
    tag.faq_title = command.faq_title;
    tag.faq_list = new Array<FAQItem>();
    tag.thumbnail = foundThumbnail;
    tag.banner = foundBanner;

    await this.TagRepository.createOne(tag);
  }
}
