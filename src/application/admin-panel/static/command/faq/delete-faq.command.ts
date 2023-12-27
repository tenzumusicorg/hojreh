import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import StaticsRepository from 'src/domain/static/repository/statics.repository';

export class DeleteFaqContentCommand {
  constructor(
    public id: string,
  ) {}
}

@CommandHandler(DeleteFaqContentCommand)
export class DeleteFaqContentHandler
  implements ICommandHandler<DeleteFaqContentCommand>
{
  constructor(
    private readonly staticRepository: StaticsRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: DeleteFaqContentCommand): Promise<void> {
    let foundFaqContent = await this.staticRepository.getFAQContent();

    if (!foundFaqContent) 
      throw new BadRequestException(NotFoundExceptionMessage);
     else {
      foundFaqContent.faq_list=  this.faqRepository.moveDownFaq(command.id,foundFaqContent.faq_list)


        await this.staticRepository.updateFAQContent(
          foundFaqContent.id,
          foundFaqContent,
        );
      }
    
}
}
