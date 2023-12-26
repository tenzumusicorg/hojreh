import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { File } from 'src/domain/file/entity/file.entity';
import { Carousel } from 'src/domain/static/entity/carouesl';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class UpdateCarouselCommand {
  constructor(
    public carousel_id: string,
    public title_fa: string,
    public title_en: string,
    public description_fa: string,
    public description_en: string,
    public below_text_en: string,
    public below_text_fa: string,
    public image: File,
    public link: string,

  ) { }
}
@CommandHandler(UpdateCarouselCommand)
export class UpdateCarouselHandler implements ICommandHandler<UpdateCarouselCommand> {
  constructor(
    private readonly staticRepository: StaticsRepository,
  ) { }

  async execute(command: UpdateCarouselCommand): Promise<void> {
    let foundCarousel = await this.staticRepository.findCarouselById(
      command.carousel_id,
    );
    if (!foundCarousel) throw new NotFoundException(NotFoundExceptionMessage);

    let carouselDto = new Carousel();
    carouselDto.title = { en: command.title_en, fa: command.title_fa };
    carouselDto.description = {
      en: command.description_en,
      fa: command.description_fa,
    };
    carouselDto.below_text = {
      en: command.below_text_en,
      fa: command.below_text_fa,
    };
    carouselDto.link = command.link;

    if (!!command.image) {
      carouselDto.image = command.image
    }

    await this.staticRepository.updateCarousel(command.carousel_id, {
      ...carouselDto,
    });
  }
}
