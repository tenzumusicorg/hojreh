import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';

export class AddTagFaqCommand {
  constructor(
    public tag_id: string,
    public answer: DualLanguageText,
    public question: DualLanguageText,
  ) {}
}

@CommandHandler(AddTagFaqCommand)
export class AddTagFaqHandler implements ICommandHandler<AddTagFaqCommand> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: AddTagFaqCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.tag_id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    foundTag.faq_list = this.faqRepository.createFaq(
      { answer: command.answer, question: command.question },
      foundTag.faq_list,
    );

    this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
