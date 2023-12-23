import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import FaqRepository from 'src/domain/faq/faq.repository';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';

export class DeleteTagFaqCommand {
  constructor(
    public tag_id: string,
    public id: string,
  ) {}
}

@CommandHandler(DeleteTagFaqCommand)
export class DeleteTagFaqHandler
  implements ICommandHandler<DeleteTagFaqCommand>
{
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
    private readonly faqRepository: FaqRepository,
  ) {}

  async execute(command: DeleteTagFaqCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.tag_id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    foundTag.faq_list = this.faqRepository.deleteFaq(
      command.id,
      foundTag.faq_list,
    );

    this.tagRepository.updateOne(foundTag.id, foundTag);
  }
}
