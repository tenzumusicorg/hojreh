import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITagRepository } from 'src/domain/tag/interface/ITag.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteTagCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  constructor(
    @Inject(ITagRepository)
    private readonly tagRepository: ITagRepository,
  ) {}

  async execute(command: DeleteTagCommand): Promise<void> {
    let foundTag = await this.tagRepository.findOne(command.id);
    if (!foundTag) throw new NotFoundException(NotFoundExceptionMessage);

    this.tagRepository.deleteOne(foundTag.id);
  }
}
