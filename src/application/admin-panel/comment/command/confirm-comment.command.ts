import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { ICommentRepository } from 'src/domain/product/interface/IComment.repository';
import { NotFoundExceptionMessage } from 'src/infrastructure/middleware/exceptions/exception.constants';
import CommentService from '../comment.service';

export class ConfirmCommentCommand {
  constructor(public id: string) {}
}

@CommandHandler(ConfirmCommentCommand)
export class ConfirmCommentHandler
  implements ICommandHandler<ConfirmCommentCommand>
{
  constructor(
    @Inject(ICommentRepository)
    private commentRepository: ICommentRepository,
    private commentService: CommentService,
  ) {}

  async execute(command: ConfirmCommentCommand): Promise<void> {
    let foundComment = await this.commentRepository.findOne(command.id);
    if (!foundComment) throw new NotFoundException(NotFoundExceptionMessage);

    if (foundComment.status !== CommentStatusEnum.CONFIRMED) {
      foundComment.status = CommentStatusEnum.CONFIRMED;
      this.commentRepository.updateOne(foundComment.id, foundComment);
      this.commentService.updateProductRating(foundComment.product_id);
    } else throw new BadRequestException('already confirmed');
  }
}
