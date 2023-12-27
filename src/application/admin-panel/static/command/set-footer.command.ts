import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FooterSocialMedia } from 'src/domain/static/entity/footer';
import StaticsRepository from 'src/domain/static/repository/statics.repository';


export class SetFooterCommand {
    constructor(
        public address: DualLanguageText,     
        public call_numbers: string,
        public social_media: FooterSocialMedia,
    ) { }
}
@CommandHandler(SetFooterCommand)
export class SetFooterHandler implements ICommandHandler<SetFooterCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetFooterCommand): Promise<void> {
        await this.staticRepository.setFooterContent(command);
    }
}
