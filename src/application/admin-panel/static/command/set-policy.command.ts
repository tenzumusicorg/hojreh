import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';


export class SetPolicyContentCommand {
    constructor(
        public content: DualLanguageText,

    ) { }
}
@CommandHandler(SetPolicyContentCommand)
export class SetPolicyContentHandler implements ICommandHandler<SetPolicyContentCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetPolicyContentCommand): Promise<void> {
        await this.staticRepository.setPolicyContent(command);
    }
}
