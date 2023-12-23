import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class CreateSubCategoryDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsNotEmpty()
  @IsString()
  title_fa: string;

  @ApiProperty({
    type: String,
    example: 'guitar electronic',
  })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({
    isArray: true,
    type: DescriptionItemDto,
  })
  @ValidateNested({ each: true })
  @Type(() => DescriptionItemDto)
  @IsArray()
  descriptions: Array<DescriptionItemDto>;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsUrl()
  @IsNotEmpty()
  banner: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  seo_title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  seo_description: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  faq_title: DualLanguageTextDto;
}
