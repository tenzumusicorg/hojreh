import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FaqItemDto } from '../../../../domain/faq/dto/faq-dto';

export class GetBrandDetailResDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: DualLanguageText,
    example: {
      en: 'yohama',
      fa: 'یوهاما',
    },
  })
  name: DualLanguageText;

  @ApiProperty({ type: String, example: 'https://tenzushop/categort/guitar' })
  logo: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  logo_id: Types.ObjectId;

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
