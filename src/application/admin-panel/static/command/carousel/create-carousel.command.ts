import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { File } from 'src/domain/file/entity/file.entity';
import { CarouselBaseIndex } from 'src/domain/static/constants/carousel-constants';
import { Carousel } from 'src/domain/static/entity/carouesl';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class CreateCarouselCommand {
  constructor(
    public title_fa: string,
    public title_en: string,
    public description_fa: string,
    public description_en: string,
    public below_text_en: string,
    public below_text_fa: string,
    public image: File,
    public link: string,
  ) {}
}
@CommandHandler(CreateCarouselCommand)
export class CreateCarouselHandler
  implements ICommandHandler<CreateCarouselCommand>
{
  constructor(private readonly staticRepository: StaticsRepository) {}

  async execute(command: CreateCarouselCommand): Promise<void> {
    let list = await this.staticRepository.findAllCarousels();

    let carousel = new Carousel();
    carousel.title = { fa: command.title_fa, en: command.title_en };
    carousel.description = { fa: command.title_fa, en: command.title_en };
    carousel.below_text = { fa: command.title_fa, en: command.title_en };
    carousel.image = command.image;
    carousel.link = command.link;
    if (list.length != 0) {
      carousel.index = list[0].index + 1;
    } else {
      carousel.index = CarouselBaseIndex;
    }
    this.staticRepository.createCarousel(carousel);
  }
}
