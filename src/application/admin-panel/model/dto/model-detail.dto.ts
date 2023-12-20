import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class BrandDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'logo address',
  })
  logo: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  logo_id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'yohama',
      fa: 'یوهاما',
    },
  })
  name: DualLanguageTextDto;
}

export class ModelDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'model name',
  })
  name: string;

  @ApiProperty({
    type: BrandDto,
  })
  brand: BrandDto;
}
