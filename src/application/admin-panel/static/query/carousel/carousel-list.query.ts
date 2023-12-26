import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import CarouselItemDto, { CarouselListDto } from '../../dto/carousel/get-carouesl-list.dto';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class ColorListQuery {
  constructor() {}
}

@QueryHandler(ColorListQuery)
export class ColorListHandler implements IQueryHandler<ColorListQuery> {
  constructor(private readonly staticsRepository: StaticsRepository) {}

  async execute() {
    let foundCarousels = await this.staticsRepository.findAllCarousels();
    let res = new CarouselListDto();
    res.data = new Array<CarouselItemDto>();
    for  (const carousel of foundCarousels) {
      let carouselListItem = new CarouselItemDto();
      carouselListItem.id = carousel.id;
      carouselListItem.title = carousel.title;
      carouselListItem.description = carousel.description;
      carouselListItem.image =   carousel.image?.url;
      carouselListItem.image_id =   carousel.image?.url;
      carouselListItem.below_text = carousel.below_text;
      carouselListItem.link = carousel.link;
      carouselListItem.index = carousel.index;
      res.data.push(carouselListItem);
    }

    return res;
  }
}
