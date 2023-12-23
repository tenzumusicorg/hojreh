import { NotFoundException } from '@nestjs/common';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import TagRepository from 'src/domain/tag/repository/tag.repository';

export class MoveUpTagFaqCommand {
  constructor(
    public tag_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveUpTagFaqCommand)
export class MoveUpTagFaqHandler
  implements ICommandHandler<MoveUpTagFaqCommand>
{
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveUpTagFaqCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.tag_id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    foundTag.faq_list = this.faqRepository.moveUpFaq(
      command.id,
      foundTag.faq_list,
    );

    this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
