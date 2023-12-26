import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { File } from 'src/domain/file/entity/file.entity';
import { Banner } from 'src/domain/static/entity/banner';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import FileService from 'src/infrastructure/file/file.service';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class  UpdateBannerCommand {
    constructor(
        public id: string,
        public title_fa: string,
        public title_en: string,
        public description_fa: string,
        public description_en: string,
        public image: File,
        public link : string


    ) { }
}
@CommandHandler(UpdateBannerCommand)
export class  UpdateBannerHandler implements ICommandHandler< UpdateBannerCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
        private fileService: FileService,

    ) { }

    async execute(command: UpdateBannerCommand): Promise<void> {
        let foundBanner = await this.staticRepository.findBannerById(
            command.id,
          );
          if (!foundBanner) throw new NotFoundException(NotFoundExceptionMessage);
      
          let bannerDto = new Banner();
          bannerDto.title = { en: command.title_en, fa: command.title_fa };
          bannerDto.description = {
            en: command.description_en,
            fa: command.description_fa,
          };
          bannerDto.link = command.link;
          bannerDto.image = command.image
          await this.staticRepository.updateBanner(foundBanner.id, bannerDto);
    }
}
