import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { ProductImageDto } from './product-image.dto';
import { ProductPriceReqDto } from './price.dto';
import { ProductAvailabilityDto } from './product-availability.schema';
import { ProductColorReqDto } from './color.dto';
import { ProductVideoDto } from './product-video.dto';
import { ProductFeatureDto } from './features.dto';
import { ProductPropertiesDto } from './properties.dto';

// export class CreateProductDto {
//   name: string;
//   seo_name: DualLanguageText;
//   description: DualLanguageText;
//   model_id: Types.ObjectId;
//   brand: Types.ObjectId;
//   category: Types.ObjectId;
//   subcategory: Types.ObjectId;
//   color: ProductColor;
//   tags: Array<Types.ObjectId> = new Array<Types.ObjectId>();
//   rating: Rating = new Rating();
//   custom_id: string
//   images: Array<ProductImage> = new Array<ProductImage>();
//   price: Price = new Price();
//   availability: ProductAvailability = new ProductAvailability();
//   product_group: Types.ObjectId;
//   videos: Array<ProductVideoDto> = new Array<ProductVideoDto>();
//   features: Array<Feature> = new Array<Feature>();
//   properties: Array<Properties> = new Array<Properties>();
//   admin_preferred_related_products: Array<Types.ObjectId> =
//     new Array<Types.ObjectId>();
//   is_draft: boolean;
//   is_published: boolean;

//   constructor(
//     name: string,
//     seo_name_fa: string,
//     seo_name_en: string,
//     description: DualLanguageText,
//     model: Types.ObjectId,
//     brand: Types.ObjectId,
//     category: Types.ObjectId,
//     subcategory: Types.ObjectId,
//     tags: Array<Types.ObjectId>,
//     images: Array<ProductImage>,
//     price: Price,
//     custom_id: string,
//     availability: ProductAvailability,
//     color: ProductColor,
//     videos: Array<ProductVideoDto>,
//     features: Array<Feature>,
//     properties: Array<Properties>,
//     admin_preferred_related_products: Array<Types.ObjectId>,
//     is_draft: boolean,
//     is_published: boolean,
//   ) {
//     this.seo_name = {
//       en: seo_name_fa,
//       fa: seo_name_en,
//     };
//     this.name = name;
//     this.description = description;
//     this.category = category;
//     this.subcategory = subcategory;
//     this.tags = tags;
//     this.images = images;
//     this.model_id = model;
//     this.brand = brand;
//     this.price = price;
//     this.custom_id = custom_id
//     this.rating = { score: 0, stars: 0, total_ratings: 0 };
//     this.availability = availability;
//     this.color = color;
//     this.videos = videos;
//     this.features = features;
//     this.properties = properties;
//     this.admin_preferred_related_products = admin_preferred_related_products;
//     this.is_draft = is_draft;
//     this.is_published = is_published;
//   }
// }

export class CreateProductDto {
  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsNotEmpty()
  @IsString()
  seo_name_fa: string;

  @ApiProperty({
    type: String,
    example: 'guitar electronic',
  })
  @IsNotEmpty()
  @IsString()
  seo_name_en: string;

  @ApiProperty({
    isArray: true,
    type: DualLanguageTextDto,
    example: { fa: 'توضیحات محصول ', en: 'product desc' },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  description: DualLanguageTextDto;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  subcategory: string;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['6406f19211c2440bc2e12f1b'],
  })
  @IsMongoId({ each: true })
  tags: Array<string>;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    isArray: true,
    type: ProductImageDto,
    example: [
      {
        url: '6406f19211c2440bc2e12f1b',
        thumbnail: '6406f19211c2440bc2e12f1b',
        is_primary: true,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images: Array<ProductImageDto>;

  @ApiProperty({
    type: ProductPriceReqDto,
    isArray: false,
  })
  @ValidateNested()
  @Type(() => ProductPriceReqDto)
  @IsNotEmpty()
  price: ProductPriceReqDto;

  @ApiProperty({
    isArray: false,
    type: ProductAvailabilityDto,
  })
  @ValidateNested()
  @Type(() => ProductAvailabilityDto)
  @IsNotEmpty()
  availability: ProductAvailabilityDto;

  @ApiProperty({
    type: String,
    example: '6406f19211c2440bc2e12f1b',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  product_group: string;

  @ApiProperty({
    isArray: false,
    type: ProductColorReqDto,
  })
  @ValidateNested()
  @Type(() => ProductColorReqDto)
  @IsNotEmpty()
  color: ProductColorReqDto;

  @ApiProperty({
    type: ProductVideoDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductVideoDto)
  videos: Array<ProductVideoDto>;

  @ApiProperty({
    isArray: true,
    type: ProductFeatureDto,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductFeatureDto)
  features: Array<ProductFeatureDto>;

  @ApiProperty({
    isArray: true,
    type: ProductPropertiesDto,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductPropertiesDto)
  properties: Array<ProductPropertiesDto>;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['6406f19211c2440bc2e12f1b'],
  })
  @IsMongoId({ each: true })
  admin_preferred_related_products: Array<string>;

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
