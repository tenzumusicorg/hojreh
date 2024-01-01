import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { File } from 'src/domain/file/entity/file.entity';
import { BannerNames } from 'src/domain/static/constants/banner-constants';
import { Banner } from 'src/domain/static/entity/banner';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class CreateDefaultBannerCommand {
  constructor() {}
}
@CommandHandler(CreateDefaultBannerCommand)
export class CreateDefaultBannerHandler
  implements ICommandHandler<CreateDefaultBannerCommand>
{
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(): Promise<void> {
    let foundFirstBanner = await this.staticRepository.findBannerByName(
      BannerNames[0].name,
    );
    let foundSecondBanner = await this.staticRepository.findBannerByName(
      BannerNames[1].name,
    );

    if (!foundFirstBanner) {
      let banner = new Banner();
      banner.description = { en: ' ', fa: ' ' };
      banner.title = { fa: ' ', en: ' ' };
      banner.link = ' ';
      banner.image = new File();
      banner.name = BannerNames[0].name;
      await this.staticRepository.createBanner(banner);
    }

    if (!foundSecondBanner) {
      let banner = new Banner();
      banner.description = { en: ' ', fa: ' ' };
      banner.title = { fa: ' ', en: ' ' };
      banner.link = ' ';
      banner.image = new File();
      banner.name = BannerNames[1].name;
      await this.staticRepository.createBanner(banner);
    }
  }
}
