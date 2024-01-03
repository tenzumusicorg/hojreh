import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { CreateProductDto } from './create-product.dto';
import { ProductAvailabilityDto } from './product-availability.schema';
import { ProductImageDto } from './product-image.dto';
import { ProductPropertiesDto } from './properties.dto';
import { ProductRatingDto } from './rate.dto';
import { ProductVideoDto } from './product-video.dto';
import { ProductColorReqDto } from './color.dto';
import { ProductPriceReqDto } from './price.dto';
import { ProductFeatureDto } from './features.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class UpdateProductReqDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsOptional()
  @IsString()
  seo_name_fa: string;

  @ApiProperty({
    type: String,
    example: 'guitar electronic',
  })
  @IsOptional()
  @IsString()
  seo_name_en: string;

  @ApiProperty({
    isArray: true,
    type: DualLanguageTextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  description: DualLanguageTextDto;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsOptional()
  @IsMongoId()
  category: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsOptional()
  @IsMongoId()
  subcategory: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['6406f19211c2440bc2e12f1b'],
  })
  @IsOptional()
  @IsMongoId({ each: true })
  tags: Array<string>;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsOptional()
  @IsMongoId()
  brand: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsOptional()
  @IsMongoId()
  model: string;

  @ApiProperty({
    type: ProductRatingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductRatingDto)
  rating: ProductRatingDto;

  @ApiProperty({
    isArray: true,
    type: ProductImageDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images: Array<ProductImageDto>;

  @ApiProperty({
    isArray: true,
    type: ProductPriceReqDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductPriceReqDto)
  price: ProductPriceReqDto;

  @ApiProperty({
    isArray: true,
    type: ProductAvailabilityDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductAvailabilityDto)
  availability: ProductAvailabilityDto;

  @ApiProperty({
    isArray: false,
    type: ProductColorReqDto,
  })
  @ValidateNested()
  @Type(() => ProductColorReqDto)
  @IsOptional()
  color: ProductColorReqDto;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['6406f19211c2440bc2e12f1b'],
  })
  @IsOptional()
  @IsMongoId({ each: true })
  videos: Array<ProductVideoDto>;

  @ApiProperty({
    isArray: true,
    type: ProductFeatureDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductFeatureDto)
  features: Array<ProductFeatureDto>;

  @ApiProperty({
    isArray: true,
    type: ProductPropertiesDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductPropertiesDto)
  properties: Array<ProductPropertiesDto>;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['6406f19211c2440bc2e12f1b'],
  })
  @IsOptional()
  @IsMongoId({ each: true })
  admin_preferred_related_products: Array<Types.ObjectId>;

  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_draft: boolean;

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  is_published: boolean;
}
