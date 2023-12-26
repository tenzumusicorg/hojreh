import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class DeleteCarouselCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(DeleteCarouselCommand)
export class DeleteCarouselHandler implements ICommandHandler<DeleteCarouselCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: DeleteCarouselCommand): Promise<void> {
        let foundCarousel = await this.staticRepository.findCarouselById(
            command.id,
        );
        if (!foundCarousel) throw new NotFoundException(NotFoundExceptionMessage);

        this.staticRepository.deleteCarousel(foundCarousel.id);
    }
}
