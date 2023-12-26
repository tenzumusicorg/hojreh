import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class DeleteVideoCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(DeleteVideoCommand)
export class DeleteVideoHandler implements ICommandHandler<DeleteVideoCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: DeleteVideoCommand): Promise<void> {
        let foundVideo = await this.staticRepository.findVideoById(command.id);
        if (!foundVideo) 
          throw new NotFoundException(NotFoundExceptionMessage);
        
        await this.staticRepository.deleteVideo(command.id);
    }
}
