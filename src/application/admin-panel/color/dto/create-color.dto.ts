import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({
    type: String,
    example: 'قرمز',
  })
  @IsNotEmpty()
  @IsString()
  color_fa: string;

  @ApiProperty({
    type: String,
    example: 'قرمز',
  })
  @IsNotEmpty()
  @IsString()
  color_en: string;

  @ApiProperty({
    type: String,
    example: 'red',
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}
