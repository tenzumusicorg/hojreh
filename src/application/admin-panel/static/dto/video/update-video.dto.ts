import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class UpdateVideoReqDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  video_id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام ویدیو', en: 'video name' },
  })
  @IsNotEmpty()
  title: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'تام دسته بندی ویدیو', en: 'video category name' },
  })
  @IsNotEmpty()
  category: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  @IsUrl()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    type: String,
    example: '02:43',
  })
  @IsUrl()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    type: String,
    example: 'category_link',
  })
  @IsString()
  @IsNotEmpty()
  category_link: string;
}

export class UpdateVideoResDto {
  @ApiProperty({
    example: {
      en: 'video updated successfully',
      fa: 'ویدیو با موفقیت بروزرسانی شد',
    },
  })
  message = {
    en: 'video updated successfully',
    fa: 'ویدیو با موفقیت بروزرسانی شد',
  };
}
