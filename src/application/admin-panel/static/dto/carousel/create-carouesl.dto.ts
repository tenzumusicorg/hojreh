import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateCarouselDto {
  @ApiProperty({
    type: String,
    example: 'تام کروسل',
  })
  @IsNotEmpty()
  @IsString()
  title_fa: string;

  @ApiProperty({
    type: String,
    example: 'carousel title',
  })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({
    type: String,
    example: 'توضیحات کروسل',
  })
  @IsNotEmpty()
  @IsString()
  description_fa: string;

  @ApiProperty({
    type: String,
    example: 'carousel description_en',
  })
  @IsNotEmpty()
  @IsString()
  description_en: string;

  @ApiProperty({
    type: String,
    example: 'carousel below text',
  })
  @IsNotEmpty()
  @IsString()
  below_text_en: string;

  @ApiProperty({
    type: String,
    example: 'متن زیر اسلایدر',
  })
  @IsNotEmpty()
  @IsString()
  below_text_fa: string;

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

export class CreateCarouselResDto {
  @ApiProperty({
    example: {
      en: 'Carousel created successfully',
      fa: 'کروسل با موفقیت اضافه شد',
    },
  })
  message = {
    en: 'Carousel created successfully',
    fa: 'کروسل با موفقیت اضافه شد',
  };
}
