import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class CarouselItemDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام محتوا', en: 'Carousel name' },
  })
  title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'توضیحات', en: 'Carousel description ' },
  })
  description: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  image: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  image_id: string;

  @ApiProperty({
    type: Number,
    example: 4,
  })
  index: number;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'متن زیر دکمه اسلاید', en: 'Carousel text below' },
  })
  below_text: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  link: string;
}

export class CarouselListDto {
  @ApiProperty({ type: () => [CarouselItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CarouselItemDto)
  data?: CarouselItemDto[] = [];
}
