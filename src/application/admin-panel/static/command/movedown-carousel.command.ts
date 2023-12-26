import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


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
        let foundCarousel = await this.staticRepository.findCarouselById(
            command.id,
        );
        if (!foundCarousel) throw new NotFoundException(NotFoundExceptionMessage);

        this.staticRepository.updateCarousel(foundCarousel.id,foundCarousel);
    }
}
