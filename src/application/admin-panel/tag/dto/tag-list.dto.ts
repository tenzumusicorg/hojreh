import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { PaginationParams } from 'src/domain/database/pagination-params.interface';

export class GetTagsListFilterDto {
  @ApiProperty({
    example: 'guitar',
    required: false,
  })
  @IsString()
  @IsOptional()
  query: string;

  @ApiProperty({
    example: 'category object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  category_id: string;

  @ApiProperty({
    example: 'subcategory object id',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  subcategory_id: string;
}

export class TagCategoryDto {
  @ApiProperty({ example: 'object id' })
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

export class TagSubCategoryDto {
  @ApiProperty({ example: 'object id' })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;

  @ApiProperty({
    type: TagCategoryDto,
  })
  category: TagCategoryDto;
}

export class GetTagListDto {
  @ApiProperty({
    type: PaginationParams,
    required: true,
  })
  @ValidateNested()
  @Type(() => PaginationParams)
  @IsNotEmpty()
  pagination: PaginationParams;

  @ApiProperty({
    type: GetTagsListFilterDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => GetTagsListFilterDto)
  @IsOptional()
  filter: GetTagsListFilterDto;
}

export class TagItemDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;

  @ApiProperty({ type: TagSubCategoryDto })
  subcategory: TagSubCategoryDto;

  @ApiProperty({ type: String, example: 'https://tenzushop/tag/guitar' })
  thumbnail: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  thumbnail_id: string;

  @ApiProperty({
    type: String,
    example: 'https://tenzushop/tag/banner.webpeg',
  })
  banner: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  banner_id: string;
}

export class TagListDto {
  @ApiProperty({ type: [TagItemDto] })
  items: Array<TagItemDto>;
}
