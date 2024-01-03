import { ApiProperty } from '@nestjs/swagger';
import { ProductPriceDto } from '../../product/dto/price.dto';
import {
  ProductBrandDto,
  ProductCategoryDto,
} from '../../product/dto/product.dto';
import { ProductImageResponseDto } from '../../product/dto/product-image.dto';
import { CommentStatusEnum } from 'src/domain/product/constant/comment-status.enum';

export class ProductCommentUserDto {
  @ApiProperty({
    example: 'soheib mohammadi',
  })
  name: string;

  @ApiProperty({
    example: true,
  })
  purchased_before: boolean;
}

export class CommentProductDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    example: 'guitar fender 141kg',
  })
  name: string;

  @ApiProperty({
    type: ProductImageResponseDto,
    isArray: true,
  })
  images: Array<ProductImageResponseDto>;

  @ApiProperty({
    type: ProductCategoryDto,
  })
  category: ProductCategoryDto;

  @ApiProperty({
    type: ProductBrandDto,
  })
  brand: ProductBrandDto;

  @ApiProperty({
    type: ProductPriceDto,
  })
  price: ProductPriceDto;
}

export class ProductCommentItemRatingDto {
  @ApiProperty({
    example: 4,
  })
  stars: number;

  @ApiProperty({
    example: 5,
  })
  score: number;
}

export class CommentDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: ProductCommentUserDto,
  })
  user: ProductCommentUserDto;

  @ApiProperty({
    example: 'comment title',
  })
  title: string;

  @ApiProperty({
    example: 'comment body',
  })
  body: string;

  @ApiProperty({
    example: CommentStatusEnum.NEW,
  })
  status: string;

  @ApiProperty({
    type: ProductCommentItemRatingDto,
  })
  rating: ProductCommentItemRatingDto;

  @ApiProperty({
    example: new Date().toDateString(),
  })
  date: string;

  @ApiProperty({
    type: CommentProductDto,
  })
  product: CommentProductDto;
}
