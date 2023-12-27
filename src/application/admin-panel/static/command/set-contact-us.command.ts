import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';


export class SetContactUsCommand {
    constructor(
        public address: DualLanguageText,
        public work_hours: DualLanguageText,
        public call_numbers: string,

    ) { }
}
@CommandHandler(SetContactUsCommand)
export class SetContactUsHandler implements ICommandHandler<SetContactUsCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetContactUsCommand): Promise<void> {
        await this.staticRepository.setContactUsContent(command);
    }
}
