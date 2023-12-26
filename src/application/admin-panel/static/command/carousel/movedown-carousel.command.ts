import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Carousel } from 'src/domain/static/entity/carouesl';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { BadRequestExceptionMessage, NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class MoveDownCarouselCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(MoveDownCarouselCommand)
export class MoveDownCarouselHandler implements ICommandHandler<MoveDownCarouselCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: MoveDownCarouselCommand): Promise<void> {
        let foundCarouselList = await this.staticRepository.findAllCarousels();

        let foundCarouselIndex = foundCarouselList.findIndex((element) => {
          return element.id === command.id;
        });
        if (
          foundCarouselIndex === -1 ||
          foundCarouselIndex === foundCarouselList.length - 1
        ) {
          throw new BadRequestException(BadRequestExceptionMessage);
        }
    
        let tempIndex = foundCarouselList[foundCarouselIndex + 1].index;
        foundCarouselList[foundCarouselIndex + 1].index =
          foundCarouselList[foundCarouselIndex].index;
        foundCarouselList[foundCarouselIndex].index = tempIndex;
    
        let movedUpCarouselDto = new Carousel();
        movedUpCarouselDto.index = foundCarouselList[foundCarouselIndex + 1].index;
    
        let movedDownCarouselDto = new Carousel();
        movedDownCarouselDto.index = foundCarouselList[foundCarouselIndex].index;
    
        await this.staticRepository.updateCarousel(
          foundCarouselList[foundCarouselIndex + 1].id,
          movedUpCarouselDto,
        );
        await this.staticRepository.updateCarousel(
          foundCarouselList[foundCarouselIndex].id,
          movedDownCarouselDto,
        );
    }
}
