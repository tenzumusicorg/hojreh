import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { BannerNames } from 'src/domain/static/constants/banner-constants';

export default class BannerDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: BannerNames[0].name,
  })
  name: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام محتوا', en: 'Banner title' },
  })
  title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'توضیحات', en: 'Banner description ' },
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
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  link: string;
}

export class BannerListDto {
  @ApiProperty({
    type: BannerDto,
    isArray: true,
  })
  items: Array<BannerDto>;
}
