import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';


export class SetAboutUsCommand {
    constructor(
        public content: DualLanguageText,
    ) { }
}
@CommandHandler(SetAboutUsCommand)
export class SetAboutUsHandler implements ICommandHandler<SetAboutUsCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetAboutUsCommand): Promise<void> {
        await this.staticRepository.setAboutUsContent(command);

    }
}
