import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import BannerItemDto, { BannerListDto } from '../../dto/Banner/get-Banners-list.dto';

export class BannerListQuery {
  constructor() {}
}

@QueryHandler(BannerListQuery)
export class BannerListHandler implements IQueryHandler<BannerListQuery> {
  constructor(private readonly staticsRepository: StaticsRepository) {}

  async execute() {
    let foundBanners = await this.staticsRepository.findAllBanner();
    let response = new BannerListDto();
    response.items = new Array<BannerItemDto>();
    for  (const banner of foundBanners) {
      let res = new BannerItemDto();
      res.id = banner.id;
      res.description = banner.description;
      res.link = banner.link;
      res.title = banner.title;
      res.name = banner.name;
      res.image = !!banner.image ? banner.image.url : '',
      res.image_id = !!banner.image ? banner.image.url : '',
      response.items.push(res);
    }
    return response;
  }
}
