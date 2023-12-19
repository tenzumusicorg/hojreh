import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { Brand } from 'src/domain/brand/entity/brand.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import FileService from 'src/infrastructure/file/file.service';

export class CreateBrandCommand {
  name: DualLanguageText;
  logo: string;
  descriptions = Array<DescriptionItemDto>();
  constructor(
    name_fa: string,
    name_en: string,
    logo: string,
    descriptions: Array<DescriptionItemDto>,
  ) {
    this.name = { en: name_en, fa: name_fa };
    this.logo = logo;
    this.descriptions = descriptions;
  }
}

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
    private fileService: FileService,
  ) {}

  async execute(command: CreateBrandCommand): Promise<void> {
    let foundLogo = await this.fileService.getFileDetail(command.logo);

    let brand = new Brand();
    brand.name = command.name;
    brand.faq_list = new Array<FAQItem>();
    brand.logo = foundLogo;
    brand.descriptions = command.descriptions;

    await this.brandRepository.createOne(brand);
  }
}
