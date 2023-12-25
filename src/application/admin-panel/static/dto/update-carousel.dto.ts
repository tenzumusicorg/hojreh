import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class UpdateCarouselDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsMongoId()
  carousel_id: string;

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

  @ApiProperty({ type: 'string', format: 'binary', required: false })
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

export class UpdateCarouselResDto {
  @ApiProperty({
    example: {
      en: 'Carousel updated successfully',
      fa: 'محتوا با موفقیت بروزرسانی شد',
    },
  })
  message = {
    en: 'Carousel updated successfully',
    fa: 'محتوا با موفقیت بروزرسانی شد',
  };
}
