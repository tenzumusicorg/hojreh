import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import StaticsRepository from 'src/domain/static/repository/statics.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';


export class SetFaqContentCommand {
    constructor(
        public id: string,

    ) { }
}
@CommandHandler(SetFaqContentCommand)
export class SetFaqContentHandler implements ICommandHandler<SetFaqContentCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetFaqContentCommand): Promise<void> {
    
    }
}
