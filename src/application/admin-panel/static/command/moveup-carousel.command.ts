import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Carousel } from 'src/domain/static/entity/carouesl';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { BadRequestExceptionMessage, NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class MoveUpCarouselCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(MoveUpCarouselCommand)
export class MoveUpCarouselHandler implements ICommandHandler<MoveUpCarouselCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: MoveUpCarouselCommand): Promise<void> {
        let foundCarouselList = await this.staticRepository.findAllCarousels();

        let foundCarouselIndex = foundCarouselList.findIndex((element) => {
          return element.id.toString() === request.carousel_id.toString();
        });
        if (foundCarouselIndex < -1) {
          throw new BadRequestException(BadRequestExceptionMessage);
        }
    
        let tempIndex = foundCarouselList[foundCarouselIndex].index;
        foundCarouselList[foundCarouselIndex].index =
          foundCarouselList[foundCarouselIndex - 1].index;
        foundCarouselList[foundCarouselIndex - 1].index = tempIndex;
    
        let movedUpCarouselDto = new Carousel();
        movedUpCarouselDto.index = foundCarouselList[foundCarouselIndex].index;
    
        let movedDownCarouselDto = new Carousel();
        movedDownCarouselDto.index =
          foundCarouselList[foundCarouselIndex - 1].index;
    
        await this.staticRepository.updateCarousel(
          foundCarouselList[foundCarouselIndex].id,
          movedUpCarouselDto,
        );
        await this.staticsRepository.updateCarousel(
          foundCarouselList[foundCarouselIndex - 1]._id,
          movedDownCarouselDto,
        );

    }
}
