import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  ProductBrandDto,
  ProductCategoryDto,
  ProductModelDto,
  ProductSubCategoryDto,
} from './product.dto';
import { ProductMockData } from './mock/data';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class ProductGroupItemDto {
  @ApiProperty({ example: 'object id' })
  id: string;

  @ApiProperty({
    example: ProductMockData.name,
  })
  name: string;

  @ApiProperty({
    example: ProductMockData.seo_name,
  })
  seo_name: DualLanguageTextDto;

  @ApiProperty({
    type: () => ProductBrandDto,
  })
  brand: ProductBrandDto;

  @ApiProperty({
    type: () => ProductCategoryDto,
  })
  category: ProductCategoryDto;

  @ApiProperty({
    type: () => ProductSubCategoryDto,
  })
  subcategory: ProductSubCategoryDto;

  @ApiProperty({
    type: () => ProductModelDto,
  })
  model: ProductModelDto;

  @ApiProperty({
    example: 'product image url',
  })
  thumbnail: string;
}

export class ProductGroupDto {
  @ApiProperty({
    type: () => ProductGroupItemDto,
  })
  product_id: ProductGroupItemDto;

  @ApiProperty({
    isArray: true,
    type: () => ProductGroupItemDto,
  })
  products: Array<ProductGroupItemDto>;
}
