import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DualLanguageTextDto {
  @ApiProperty({
    type: String,
    example: 'yohama',
  })
  @IsNotEmpty()
  @IsString()
  en: string;

  @ApiProperty({
    type: String,
    example: 'یوهاما',
  })
  @IsString()
  @IsNotEmpty()
  fa: string;
}
