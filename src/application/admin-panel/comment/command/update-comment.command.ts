import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';

export class UpdateCommentCommand {
  constructor(
    public id: string,
    public title: string,
    public body: string,
  ) {}
}

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
  ) {}

  async execute(command: UpdateCommentCommand): Promise<void> {
    let foundComment = await this.commentRepository.findOne(command.id);
    if (!foundComment) throw new NotFoundException(NotFoundExceptionMessage);

    if (!!command.title) {
      foundComment.title = command.title;
    }
    if (!!command.body) {
      foundComment.body = command.body;
    }

    this.commentRepository.updateOne(foundComment.id, foundComment);
  }
}
