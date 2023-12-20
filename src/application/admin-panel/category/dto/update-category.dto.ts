import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class UpdateCategoryDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  id: string;

  @ApiProperty({
    type: String,
    example: 'گیتار الکتریک',
  })
  @IsOptional()
  @IsString()
  title_fa: string;

  @ApiProperty({
    type: String,
    example: 'guitar electronic',
  })
  @IsOptional()
  @IsString()
  title_en: string;

  @ApiProperty({
    isArray: true,
    type: DescriptionItemDto,
  })
  @ValidateNested({ each: true })
  @Type(() => DescriptionItemDto)
  @IsArray()
  @IsOptional()
  descriptions: Array<DescriptionItemDto>;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsUrl()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsUrl()
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  faq_title: DualLanguageTextDto;
}
