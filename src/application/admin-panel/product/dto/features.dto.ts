import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductFeatureDto {
  @ApiProperty({
    example: 'ویژگی فارسی',
  })
  @IsString()
  @IsNotEmpty()
  fa: string;

  @ApiProperty({
    example: 'en feature',
  })
  @IsString()
  @IsNotEmpty()
  en: string;
}
