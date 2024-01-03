import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';
import {
  PaginationParams,
  PaginationParamsResponse,
} from 'src/domain/database/pagination-params.interface';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';

export class GetCommentListDto {
  @ApiProperty({
    type: PaginationParams,
    required: true,
  })
  @ValidateNested()
  @Type(() => PaginationParams)
  @IsNotEmpty()
  pagination: PaginationParams;

  @ApiProperty({
    enum: CommentStatusEnum,
    example: CommentStatusEnum.CONFIRMED,
    required: false,
  })
  @IsEnum(CommentStatusEnum)
  @IsOptional()
  filter: CommentStatusEnum;
}

export class CommentListDto {
  @ApiProperty({
    type: CommentDto,
    isArray: true,
  })
  items: Array<CommentDto>;

  @ApiProperty({
    type: PaginationParamsResponse,
  })
  pagination: PaginationParamsResponse;

  @ApiProperty({
    example: 5,
  })
  total_comments: number;

  @ApiProperty({
    example: 5,
  })
  total_comments_in_month: number;

  @ApiProperty({
    example: 5,
  })
  total_confirmed_comments: number;

  @ApiProperty({
    example: 5,
  })
  total_rejected_comments: number;
}
