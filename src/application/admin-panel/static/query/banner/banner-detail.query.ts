import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import BannerDto from '../../dto/banner/get-banner-detail.dto';

export class BannerDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(BannerDetailQuery)
export class BannerDetailHandler implements IQueryHandler<BannerDetailQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: BannerDetailQuery): Promise<BannerDto> {
    let foundBanner = await this.staticRepository.findBannerById(query.id);
    if (!foundBanner) throw new NotFoundException(NotFoundExceptionMessage);

    let res = new BannerDto();
    res.id = foundBanner.id;
    res.description = foundBanner.description;
    res.link = foundBanner.link;
    res.title = foundBanner.title;
    res.name = foundBanner.name;
    res.image = !!foundBanner.image ? foundBanner.image.url : ''
    res.image_id = !!foundBanner.image ? foundBanner.image.url : ''

    return res;
  }
}
