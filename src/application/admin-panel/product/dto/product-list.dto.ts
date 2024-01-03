import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductColorDto } from './color.dto';
import {
  PaginationParams,
  PaginationParamsResponse,
} from 'src/domain/database/pagination-params.interface';
import { ProductMockData } from './mock/data';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import {
  ProductBrandDto,
  ProductCategoryDto,
  ProductModelDto,
  ProductSubCategoryDto,
} from './product.dto';

export class SearchPriceFilterDto {
  @ApiProperty({
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  from: number;

  @ApiProperty({
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  to: number;
}

export class SearchCreatedAtFilterDto {
  @ApiProperty({
    example: new Date().setMonth(new Date().getFullYear() - 3),
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  from: number;

  @ApiProperty({
    example: Date.now(),
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  to: number;
}

export enum SearchSortEnum {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DSC = 'PRICE_DSC',
  CREATED_AT_ASC = 'CREATED_AT_ASC',
  CREATED_AT_DSC = 'CREATED_AT_DSC',
  UPDATED_AT_ASC = 'UPDATED_AT_ASC',
  UPDATED_AT_DSC = 'UPDATED_AT_DSC',
}

export class ProductSearchFilterDto {
  @ApiProperty({
    example: 'guitar',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'brand object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  brand: string;

  @ApiProperty({
    example: 'model object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  model: string;

  @ApiProperty({
    example: 'category object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  category: string;

  @ApiProperty({
    example: 'subcategory object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  subcategory: string;

  @ApiProperty({
    example: ['tag object id'],
    required: false,
  })
  @IsMongoId({ each: true })
  @IsOptional()
  tags: Array<string>;

  @ApiProperty({
    type: SearchPriceFilterDto,
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => SearchPriceFilterDto)
  price: SearchPriceFilterDto;

  @ApiProperty({
    type: SearchCreatedAtFilterDto,
    required: false,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => SearchCreatedAtFilterDto)
  date: SearchCreatedAtFilterDto;
}

export class ProductSearchReqDto {
  @ApiProperty({
    required: false,
    example: 'guitar',
  })
  @IsString()
  @IsOptional()
  query: string;

  @ApiProperty({
    type: PaginationParams,
    required: true,
  })
  @ValidateNested()
  @Type(() => PaginationParams)
  @IsNotEmpty()
  pagination: PaginationParams;

  @ApiProperty({
    enum: SearchSortEnum,
    example: SearchSortEnum.CREATED_AT_ASC,
    required: false,
  })
  @IsEnum(SearchSortEnum)
  @IsOptional()
  sorting: string;

  @ApiProperty({
    type: ProductSearchFilterDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => ProductSearchFilterDto)
  @IsOptional()
  filter: ProductSearchFilterDto;
}

export class SearchProductColorDto {
  @ApiProperty({ example: 'object id' })
  product_id: string;

  @ApiProperty({
    type: ProductColorDto,
  })
  color: ProductColorDto;
}

export class SearchProductItem {
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
    type: ProductBrandDto,
  })
  brand: ProductBrandDto;

  @ApiProperty({
    type: ProductCategoryDto,
  })
  category: ProductCategoryDto;

  @ApiProperty({
    type: ProductSubCategoryDto,
  })
  subcategory: ProductSubCategoryDto;

  @ApiProperty({
    type: ProductModelDto,
  })
  model: ProductModelDto;

  @ApiProperty({
    example: 'product image url',
  })
  image: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  image_id: string;

  @ApiProperty({
    example: 30000000,
  })
  price: number;

  @ApiProperty({
    example: false,
  })
  call_to_buy: boolean;

  @ApiProperty({
    example: true,
  })
  is_available: boolean;

  @ApiProperty({
    example: false,
  })
  is_used: boolean;

  @ApiProperty({
    example: 300,
  })
  total_count: number;

  @ApiProperty({
    example: new Date(),
  })
  created_at: Date;

  @ApiProperty({
    example: new Date(),
  })
  updated_at: Date;

  @ApiProperty({
    type: SearchProductColorDto,
    isArray: true,
  })
  colors: Array<SearchProductColorDto>;

  @ApiProperty({ example: 'object id' })
  product_group: string;

  @ApiProperty({
    example: new Date(),
  })
  last_update: Date | null;

  @ApiProperty({
    example: false,
  })
  is_draft: boolean;

  @ApiProperty({
    example: true,
  })
  is_published: boolean;
}

export class ProductSearchResDto {
  @ApiProperty({
    type: PaginationParamsResponse,
  })
  pagination: PaginationParamsResponse;

  @ApiProperty({
    type: SearchProductItem,
  })
  @ValidateNested()
  @Type(() => SearchProductItem)
  items: Array<SearchProductItem>;
}

export class GetProductListExcelReqDto {
  @ApiProperty({
    example: 'category object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  category: string;
}
