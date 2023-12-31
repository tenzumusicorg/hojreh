import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class VideoDto {
  @ApiProperty({
    type: Types.ObjectId,
    example: new Types.ObjectId(),
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام ویدیو', en: 'video name' },
  })
  title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام دسته بندی ویدیو', en: 'video category name' },
  })
  category: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  cover: string;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  link: string;

  @ApiProperty({
    type: String,
    example: '02:43',
  })
  duration: string;

  @ApiProperty({
    type: String,
    example: 'category_link',
  })
  category_link: string;
}
