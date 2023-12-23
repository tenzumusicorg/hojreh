import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class CategoryItemDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  title: DualLanguageTextDto;

  @ApiProperty({ type: String, example: 'https://tenzushop/categort/guitar' })
  thumbnail: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  thumbnail_id: string;

  @ApiProperty({ type: Number, example: 89 })
  product_count: number;
}

export class CategoryListDto {
  @ApiProperty({ type: [CategoryItemDto] })
  items: Array<CategoryItemDto>;
}
