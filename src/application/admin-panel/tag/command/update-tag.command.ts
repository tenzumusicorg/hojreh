import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { ITagRepository } from 'src/domain/Tag/interface/ITag.repository';
import TagRepository from 'src/domain/tag/repository/tag.repository';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateTagCommand {
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

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  constructor(
    private readonly tagRepository: TagRepository,
    private fileService: FileService,
  ) {}

  async execute(command: UpdateTagCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.title_en) foundTag.title.en = command.title_en;

    if (!!command.title_fa) foundTag.title.fa = command.title_fa;

    if (!!command.banner) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundTag.banner = foundFile;
    }
    if (!!command.thumbnail) {
      let foundFile = await this.fileService.getFileDetail(command.banner);
      foundTag.thumbnail = foundFile;
    }

    if (!!command.descriptions) {
      foundTag.descriptions = command.descriptions;
    }

    if (!!command.seo_title) foundTag.seo_title = command.seo_title;

    if (!!command.seo_description)
      foundTag.seo_description = command.seo_description;

    if (!!command.faq_title) foundTag.faq_title = command.faq_title;

    await this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
