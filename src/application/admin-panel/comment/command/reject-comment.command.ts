import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import CommentService from '../comment.service';

export class RejectCommentCommand {
  constructor(public id: string) {}
}

@CommandHandler(RejectCommentCommand)
export class RejectCommentHandler
  implements ICommandHandler<RejectCommentCommand>
{
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
    private commentService: CommentService,
  ) {}

  async execute(command: RejectCommentCommand): Promise<void> {
    let foundComment = await this.commentRepository.findOne(command.id);
    if (!foundComment) throw new NotFoundException(NotFoundExceptionMessage);

    if (foundComment.status !== CommentStatusEnum.REJECTED) {
      foundComment.status = CommentStatusEnum.REJECTED;
      this.commentRepository.updateOne(foundComment.id, foundComment);
      this.commentService.updateProductRating(foundComment.product_id);
    } else throw new BadRequestException('already rejected');
  }
}
