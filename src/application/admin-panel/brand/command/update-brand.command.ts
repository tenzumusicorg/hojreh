import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBrandRepository } from 'src/domain/brand/interface/IBrand.repository';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateBrandCommand {
  constructor(
    public id: string,
    public name_fa: string,
    public name_en: string,
    public logo: string,
    public descriptions: Array<DescriptionItemDto>,
  ) {}
}

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {
  constructor(
    @Inject(IBrandRepository)
    private readonly brandRepository: IBrandRepository,
    private fileService: FileService,
  ) {}

  async execute(command: UpdateBrandCommand): Promise<void> {
    let foundBrand = await this.brandRepository.findOne(command.id);
    if (!foundBrand) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.logo) {
      let foundLogo = await this.fileService.getFileDetail(command.logo);
      foundBrand.logo = foundLogo;
    }

    if (!!command.name_en) foundBrand.name.en = command.name_en;

    if (!!command.name_fa) foundBrand.name.fa = command.name_fa;

    if (!!command.descriptions) {
      foundBrand.descriptions = command.descriptions;
    }

    await this.brandRepository.updateOne(foundBrand.id, foundBrand);
  }
}
