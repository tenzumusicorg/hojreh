import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import ProductDomainModule from 'src/domain/product/product.module';
import { CommentListHandler } from './query/comment-list.query';
import { UserCommentListHandler } from './query/user-comments.query';
import { UpdateCommentHandler } from './command/update-comment.command';
import { RejectCommentHandler } from './command/reject-comment.command';
import { ConfirmCommentHandler } from './command/confirm-comment.command';
import CommentController from './comment.controller';
import CommentService from './comment.service';

export const commandHandlers = [
  UpdateCommentHandler,
  RejectCommentHandler,
  ConfirmCommentHandler,
];
export const queryHandlers = [CommentListHandler, UserCommentListHandler];

@Module({
  imports: [CqrsModule, ProductDomainModule],
  controllers: [CommentController],
  providers: [...commandHandlers, ...queryHandlers, CommentService],
  exports: [],
})
export default class CommentModule {}
