import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class DeleteCommentCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
  ) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    let foundComment = await this.commentRepository.findOne(command.id);
    if (!foundComment) throw new NotFoundException(NotFoundExceptionMessage);

    this.commentRepository.deleteOne(foundComment.id);
  }
}
