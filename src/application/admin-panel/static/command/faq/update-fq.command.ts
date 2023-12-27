import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class UpdateFaqContentCommand {
  constructor(
    public id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(UpdateFaqContentCommand)
export class UpdateFaqContentHandler
  implements ICommandHandler<UpdateFaqContentCommand>
{
  constructor(
    private readonly staticRepository: StaticsRepository,
    private readonly faqRepository: FaqRepository,

  ) {}

  async execute(command: UpdateFaqContentCommand): Promise<void> {
    let foundFaqContent = await this.staticRepository.getFAQContent();

    if (!foundFaqContent) 
      throw new BadRequestException(NotFoundExceptionMessage);
     else {
      foundFaqContent.faq_list=  this.faqRepository.createFaq(command,foundFaqContent.faq_list)
        await this.staticRepository.updateFAQContent(
          foundFaqContent.id,
          foundFaqContent,
        );
      }
  }
}
