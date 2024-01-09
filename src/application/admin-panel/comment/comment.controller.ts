import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import AdminAuth from '../auth/decorator/admin-auth.decorator';
import { SuccessResponse } from 'src/infrastructure/middleware/interceptors/success.constant';
import WrapResponseInterceptor from 'src/infrastructure/middleware/interceptors/wrap-response.interceptor';
import ParseObjectIdPipe from 'src/infrastructure/middleware/pipes/parse-object-id.pipe';
import { RejectCommentDto } from './dto/reject-comment.dto';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { ConfirmCommentDto } from './dto/confirm-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentListDto, GetCommentListDto } from './dto/comment-list.dto';
import { UpdateCommentCommand } from './command/update-comment.command';
import { ConfirmCommentCommand } from './command/confirm-comment.command';
import { RejectCommentCommand } from './command/reject-comment.command';
import { DeleteCommentCommand } from './command/delete-comment.command';
import { UserCommentListQuery } from './query/user-comments.query';
import { UserCommentListDto } from './dto/user-comments.dto';
import { CommentListQuery } from './query/comment-list.query';

@Controller()
@ApiTags('Admin/Comments')
@UseInterceptors(WrapResponseInterceptor)
export default class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/comments/list')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({
    type: CommentListDto,
    description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  })
  @ApiOkResponse({
    type: CommentListDto,
  })
  async getComments(@Body() body: GetCommentListDto) {
    return this.queryBus.execute(
      new CommentListQuery(body.pagination, body.filter),
    );
  }

  @Patch('/comments/update')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({
    type: UpdateCommentDto,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async updateComment(@Body() body: UpdateCommentDto) {
    this.commandBus.execute(
      new UpdateCommentCommand(body.id, body.title, body.body),
    );
    return new SuccessResponse();
  }

  @Patch('/comments/confirm')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({
    type: ConfirmCommentDto,
    description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async confirmComment(@Body() body: ConfirmCommentDto) {
    this.commandBus.execute(new ConfirmCommentCommand(body.id));
    return new SuccessResponse();
  }

  @Patch('/comments/reject')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiBody({
    type: RejectCommentDto,
    description: `enum status values: CONFIRMED: ${CommentStatusEnum.CONFIRMED}, REJECTED:${CommentStatusEnum.REJECTED}`,
  })
  @ApiOkResponse({
    type: SuccessResponse,
  })
  async rejectComment(@Body() body: RejectCommentDto) {
    this.commandBus.execute(new RejectCommentCommand(body.id));
    return new SuccessResponse();
  }

  @Delete('comments/:id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  async deleteComment(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<SuccessResponse> {
    this.commandBus.execute(new DeleteCommentCommand(id));
    return new SuccessResponse();
  }

  @Get('/user-comments/:id')
  @ApiBearerAuth()
  @AdminAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiOkResponse({
    type: UserCommentListDto,
  })
  async getUserComments(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserCommentListDto> {
    return this.queryBus.execute(new UserCommentListQuery(id));
  }
}
