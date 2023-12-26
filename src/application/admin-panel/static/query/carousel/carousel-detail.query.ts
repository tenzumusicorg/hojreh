import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import CarouselDto from '../../dto/carousel/get-carouesl-detail.dto';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class CarouselDetailQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(CarouselDetailQuery)
export class CarouselDetailHandler implements IQueryHandler<CarouselDetailQuery> {
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(query: CarouselDetailQuery): Promise<CarouselDto> {
    let foundCarousel = await this.staticRepository.findCarouselById(query.id);
    if (!foundCarousel) {
      throw new NotFoundException(NotFoundExceptionMessage);
    }

    let res = new CarouselDto();
    res.id = foundCarousel.id;
    res.title = foundCarousel.title;
    res.description = foundCarousel.description;
    res.image = foundCarousel.image?.url,
    res.image_id = foundCarousel.image?.url
    res.link = foundCarousel.link;
    res.below_text = foundCarousel.below_text;

    return res;
  }
}
