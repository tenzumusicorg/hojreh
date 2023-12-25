import { IsMongoId, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateBannerDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsNotEmpty()
  @IsMongoId()
  banner_id: string;

  @ApiProperty({
    type: String,
    example: 'تام بنر',
  })
  @IsNotEmpty()
  @IsString()
  title_fa: string;

  @ApiProperty({
    type: String,
    example: 'banner title',
  })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({
    type: String,
    example: 'توضیحات بنر',
  })
  @IsNotEmpty()
  @IsString()
  description_fa: string;

  @ApiProperty({
    type: String,
    example: 'banner description_en',
  })
  @IsNotEmpty()
  @IsString()
  description_en: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}

export class CreateBannerResDto {
  @ApiProperty({
    example: {
      en: 'Banner created successfully',
      fa: 'بنر با موفقیت اضافه شد',
    },
  })
  message = {
    en: 'Banner created successfully',
    fa: 'بنر با موفقیت اضافه شد',
  };
}
