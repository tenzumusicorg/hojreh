import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';



export class SetFaqContentCommand {
    faq_list:Array<FAQItem>=[]
    constructor(
        public content: DualLanguageText,
    ) { }
}
@CommandHandler(SetFaqContentCommand)
export class SetFaqContentHandler implements ICommandHandler<SetFaqContentCommand> {
    constructor(
        private readonly staticRepository: StaticsRepository,
    ) { }

    async execute(command: SetFaqContentCommand): Promise<void> {
        let foundFaqContent = await this.staticRepository.getFAQContent();

        if (!foundFaqContent) {
          await this.staticRepository.createFAQContent(command);
        } else {
          foundFaqContent.content = command.content;
          await this.staticRepository.updateFAQContent(
            foundFaqContent.id,
            foundFaqContent,
          );
    }
}
}
