import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { BadRequestExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class AddFaqContentCommand {
  constructor(
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(AddFaqContentCommand)
export class AddFaqContentHandler
  implements ICommandHandler<AddFaqContentCommand>
{
  constructor(
    private readonly staticRepository: StaticsRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: AddFaqContentCommand): Promise<void> {
    let foundFaqContent = await this.staticRepository.getFAQContent();

    if (!foundFaqContent) 
      throw new BadRequestException(BadRequestExceptionMessage);
     else {
    foundFaqContent.faq_list=  this.faqRepository.createFaq(command,foundFaqContent.faq_list)
      await this.staticRepository.updateFAQContent(
        foundFaqContent.id,
        foundFaqContent,
      );
    }
  }
}
