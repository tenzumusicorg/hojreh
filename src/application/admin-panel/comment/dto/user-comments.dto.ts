import { ApiProperty } from '@nestjs/swagger';
import { ProductCommentItemRatingDto } from './comment.dto';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';
import { ProductDto } from '../../product/dto/product.dto';

export class UserCommentItemDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    example: 'comment title',
  })
  title: string;

  @ApiProperty({
    example: 'comment body',
  })
  body: string;

  @ApiProperty({
    example: 1000,
  })
  likes: number;

  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  dis_likes: number;

  @ApiProperty({
    type: ProductCommentItemRatingDto,
  })
  rating: ProductCommentItemRatingDto;

  @ApiProperty({
    example: new Date().toDateString(),
  })
  date: Date;

  @ApiProperty({
    example: CommentStatusEnum.NEW,
  })
  status: CommentStatusEnum;

  @ApiProperty({
    type: ProductDto,
  })
  product: ProductDto;
}

export class UserCommentListDto {
  @ApiProperty({
    type: UserCommentItemDto,
    isArray: true,
  })
  items: Array<UserCommentItemDto>;
}
