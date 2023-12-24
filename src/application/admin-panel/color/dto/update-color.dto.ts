import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateColorDto {
  @ApiProperty({
    type: String,
    example: '64106fe12994b8fbd0423189',
  })
  @IsNotEmpty()
  @IsMongoId()
  color_id: string;

  @ApiProperty({
    type: String,
    example: 'قرمز',
  })
  @IsOptional()
  @IsString()
  color_fa: string;

  @IsOptional()
  @IsString()
  color_en: string;

  @ApiProperty({
    type: String,
    example: 'red',
  })
  @IsOptional()
  @IsUrl()
  link: string;
}
