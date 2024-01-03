import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class ProductVideoDto {
  @ApiProperty({
    example: { fa: 'چطور گیتار بنوازیم؟؟', en: 'How to play a guitar?' },
    type: DualLanguageTextDto,
  })
  title: DualLanguageTextDto;

  @ApiProperty({
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
  })
  thumbnail: string;

  @ApiProperty({
    example: 8270,
  })
  length: number;

  @ApiProperty({
    example:
      'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
  })
  url: string;

  @ApiProperty({
    type: DualLanguageTextDto,
  })
  category: DualLanguageTextDto;
}
