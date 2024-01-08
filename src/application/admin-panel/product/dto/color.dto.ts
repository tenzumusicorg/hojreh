import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Color } from 'src/domain/color/entity/color.entity';

export class ProductColorReqDto {
  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  has_color: boolean;

  @ApiProperty({
    example: 'red',
  })
  @IsOptional()
  @IsString()
  product_color_name_fa: string;

  @ApiProperty({
    example: 'red',
  })
  @IsOptional()
  @IsString()
  product_color_name_en: string;

  @ApiProperty({
    example: 'base color object id',
  })
  @IsMongoId()
  @IsOptional()
  base_color: string;
}

export class ColorDto {
  @ApiProperty({
    example: true,
  })
  id: string;

  @ApiProperty({
    example: 'red',
  })
  color_fa: string;

  @ApiProperty({
    example: 'red',
  })
  color_en: string;

  @ApiProperty({
    example: 'color link',
  })
  link: string;
}

export class ProductColorDto {
  @ApiProperty({
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  has_color: boolean;

  @ApiProperty({
    example: 'red',
  })
  @IsOptional()
  @IsString()
  product_color_name_en: string = '';

  @ApiProperty({
    example: 'red',
  })
  @IsOptional()
  @IsString()
  product_color_name_fa: string = '';

  @ApiProperty({
    example: 'base color object id',
  })
  @IsNotEmpty()
  @IsMongoId()
  base_color: ColorDto;
}
