import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductRatingDto } from './rate.dto';
import { ProductImageResponseDto } from './product-image.dto';
import { ProductPriceDto } from './price.dto';
import { ProductAvailabilityDto } from './product-availability.schema';
import { ProductFeatureDto } from './features.dto';
import { ProductPropertiesDto } from './properties.dto';
import { ProductGroupItemDto } from './product-group.dto';
import { ProductVideoDto } from './product-video.dto';
import { ProductColorDto } from './color.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { ProductMockData } from './mock/data';

export class GetProductDto {
  @ApiProperty({
    example: 'this-is-test-product-slug-that-works',
  })
  @IsString()
  @ValidateIf(
    (obj) => {
      return obj.slug || obj.id;
    },
    { message: 'slug or id must be sent' },
  )
  @IsOptional()
  slug: string;

  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  @IsMongoId()
  @ValidateIf(
    (obj) => {
      return obj.slug || obj.id;
    },
    { message: 'slug or id must be sent' },
  )
  @IsOptional()
  id: string;
}

export class ProductCategoryDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;
}

export class ProductSubCategoryDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;
}

export class ProductTagItemDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;
}

export class ProductBrandDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  name: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example: '',
  })
  logo: String;
}

export class ProductModelDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'guitar electronic',
  })
  name: string;
}

export class ProductDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: string;

  @ApiProperty({
    example: ProductMockData.name,
  })
  name: string;

  @ApiProperty({
    example: 'TZ-aje3Da',
  })
  custom_id: string;

  @ApiProperty({
    example: ProductMockData.seo_name,
  })
  seo_name: {
    fa: string;
    en: string;
  };

  @ApiProperty({
    type: ProductCategoryDto,
    example: ProductMockData.category,
  })
  category: ProductCategoryDto = new ProductCategoryDto();

  @ApiProperty({
    type: ProductSubCategoryDto,
    example: ProductMockData.subcategory,
  })
  subcategory: ProductSubCategoryDto = new ProductSubCategoryDto();

  @ApiProperty({
    example: ProductMockData.tags,
  })
  tags: Array<ProductTagItemDto> = new Array<ProductTagItemDto>();

  @ApiProperty({
    type: ProductBrandDto,
    example: ProductMockData.brand,
  })
  brand: ProductBrandDto = new ProductBrandDto();

  @ApiProperty({
    type: ProductModelDto,
    example: ProductMockData.model,
  })
  model: ProductModelDto = new ProductModelDto();

  @ApiProperty({
    type: ProductRatingDto,
    example: ProductMockData.rating,
  })
  rating: ProductRatingDto = new ProductRatingDto();

  @ApiProperty({
    type: [ProductImageResponseDto],
  })
  images: Array<ProductImageResponseDto> = new Array<ProductImageResponseDto>();

  @ApiProperty({
    type: ProductPriceDto,
    example: ProductMockData.pricing,
  })
  price: ProductPriceDto = new ProductPriceDto();

  @ApiProperty({
    type: ProductAvailabilityDto,
    example: ProductMockData.availability,
  })
  availability: ProductAvailabilityDto = new ProductAvailabilityDto();

  @ApiProperty({
    type: ProductColorDto,
  })
  color: ProductColorDto = new ProductColorDto();

  @ApiProperty({
    example: ProductMockData.product_group,
  })
  product_group: Array<ProductGroupItemDto>;

  @ApiProperty({
    example: ProductMockData.videos,
  })
  videos: Array<ProductVideoDto>;

  @ApiProperty({
    type: [ProductFeatureDto],
    example: ProductMockData.features,
  })
  features: Array<ProductFeatureDto> = new Array<ProductFeatureDto>();

  @ApiProperty({
    type: DualLanguageTextDto,
    example: ProductMockData.description,
  })
  description: DualLanguageTextDto;

  @ApiProperty({
    isArray: true,
    type: ProductPropertiesDto,
    example: ProductMockData.properties,
  })
  properties: Array<ProductPropertiesDto>;

  @ApiProperty({
    example: ProductMockData.related_products,
  })
  admin_preferred_related_products: Array<ProductDto>;

  @ApiProperty({
    example: new Date(),
  })
  last_update: Date;

  @ApiProperty({
    example: new Date(),
  })
  created_at: Date;

  @ApiProperty({
    example: new Date(),
  })
  updated_at: Date;
}
