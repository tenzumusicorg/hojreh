import { ApiProperty } from '@nestjs/swagger';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { FaqItemDto } from '../../../../domain/faq/dto/faq-dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class BrandDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'yohama',
      fa: 'یوهاما',
    },
  })
  name: DualLanguageTextDto;

  @ApiProperty({ type: String, example: 'https://tenzushop/categort/guitar' })
  logo: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  logo_id: string;

  @ApiProperty({
    isArray: true,
    type: FaqItemDto,
  })
  faq_list: Array<FaqItemDto>;

  @ApiProperty({
    isArray: true,
    type: DescriptionItemDto,
  })
  descriptions: Array<DescriptionItemDto>;
}
