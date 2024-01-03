import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class ProductPropertyItemDto {
  @ApiProperty({
    example: 'prop',
  })
  @IsString()
  @IsNotEmpty()
  prop: string;

  @ApiProperty({
    example: 'value',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class PropertiesItemDualLanguageDto {
  @ApiProperty({
    type: ProductPropertyItemDto,
  })
  @ValidateNested()
  @Type(() => ProductPropertyItemDto)
  fa: ProductPropertyItemDto;

  @ApiProperty({
    example: ProductPropertyItemDto,
  })
  @ValidateNested()
  @Type(() => ProductPropertyItemDto)
  en: ProductPropertyItemDto;
}

export class ProductPropertiesDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      en: 'guitar electronic',
      fa: 'گیتار الکتریک',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  title: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example: 'product icon link',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    type: PropertiesItemDualLanguageDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => PropertiesItemDualLanguageDto)
  @IsNotEmpty()
  items: Array<PropertiesItemDualLanguageDto>;
}
