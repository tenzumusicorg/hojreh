import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import FooterContentDto from '../dto/get-footer.dto';

export class FooterQuery {
  constructor() {}
}

@QueryHandler(FooterQuery)
export class FooterDetailHandler implements IQueryHandler<FooterQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: FooterQuery) {
    let aboutUsContent = await this.staticRepository.getFooterContent();
    let res = new FooterContentDto();
    if (aboutUsContent) {
      res.address = aboutUsContent.address;
      res.social_media = aboutUsContent.social_media;
      res.call_numbers = aboutUsContent.call_numbers;
    }
    return res;
  }
}
