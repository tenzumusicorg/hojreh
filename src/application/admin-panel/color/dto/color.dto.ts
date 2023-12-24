import { ApiProperty } from '@nestjs/swagger';

export class ColorDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'red',
  })
  color_fa: string;

  @ApiProperty({
    type: String,
    example: 'قرمز',
  })
  color_en: string;

  @ApiProperty({
    type: String,
    example: 'url',
  })
  link: string;
}
