import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import AboutUsContentDto from '../dto/get-about-us.dto';

export class AboutUsQuery {
  constructor() {}
}

@QueryHandler(AboutUsQuery)
export class BannerDetailHandler implements IQueryHandler<AboutUsQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: AboutUsQuery) {
    let aboutUsContent = await this.staticRepository.getAboutUsContent();
    let res = new AboutUsContentDto();
    if (aboutUsContent) {
      res.content = aboutUsContent.content;
    }
    return res;
  }
}
