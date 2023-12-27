import { BadRequestException} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class MoveUpFaqContentCommand {
  constructor(
    public id: string,
  ) {}
}

@CommandHandler(MoveUpFaqContentCommand)
export class MoveUpFaqContentHandler
  implements ICommandHandler<MoveUpFaqContentCommand>
{
  constructor(
    private readonly staticRepository: StaticsRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveUpFaqContentCommand): Promise<void> {
    let foundFaqContent = await this.staticRepository.getFAQContent();

    if (!foundFaqContent) 
      throw new BadRequestException(NotFoundExceptionMessage);
     else {
      foundFaqContent.faq_list=  this.faqRepository.moveUpFaq(command.id,foundFaqContent.faq_list)


        await this.staticRepository.updateFAQContent(
          foundFaqContent.id,
          foundFaqContent,
        );
      }
    
  }
}
