import { ApiProperty } from '@nestjs/swagger';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { FaqItemDto } from 'src/domain/faq/dto/faq-dto';

export class CategoryDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
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
    isArray: true,
    type: DescriptionItemDto,
  })
  descriptions: Array<DescriptionItemDto>;

  @ApiProperty({
    isArray: true,
    type: FaqItemDto,
  })
  faq_list: Array<FaqItemDto>;

  @ApiProperty({
    type: String,
    example: 'https://arvanclouc/categort/thumbnail.webpeg',
  })
  thumbnail: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  thumbnail_id: string;

  @ApiProperty({
    type: String,
    example: 'https://tenzushop/categort/banner.webpeg',
  })
  banner: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  banner_id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  seo_title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  seo_description: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  faq_title: DualLanguageTextDto;
}
