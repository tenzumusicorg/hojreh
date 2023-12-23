import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import TagRepository from 'src/domain/tag/repository/tag.repository';

export class MoveDownTagFaqCommand {
  constructor(
    public tag_id: string,
    public id: string,
  ) {}
}

@CommandHandler(MoveDownTagFaqCommand)
export class MoveDownTagFaqHandler
  implements ICommandHandler<MoveDownTagFaqCommand>
{
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: MoveDownTagFaqCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.tag_id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    foundTag.faq_list = this.faqRepository.moveDownFaq(
      command.id,
      foundTag.faq_list,
    );

    this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
