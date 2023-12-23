import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';

export class UpdateTagFaqCommand {
  constructor(
    public tag_id: string,
    public id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(UpdateTagFaqCommand)
export class UpdateTagFaqHandler
  implements ICommandHandler<UpdateTagFaqCommand>
{
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: UpdateTagFaqCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.tag_id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    foundTag.faq_list = this.faqRepository.updateFaq(
      { id: command.id, question: command.question, answer: command.answer },
      foundTag.faq_list,
    );

    this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
