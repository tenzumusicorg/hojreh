import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { PaginationParams } from 'src/domain/database/pagination-params.interface';

export class GetBrandListReqDto {
  @ApiProperty({
    type: PaginationParams,
    required: true,
  })
  @ValidateNested()
  @Type(() => PaginationParams)
  @IsNotEmpty()
  pagination: PaginationParams;

  @ApiProperty({
    example: 'brand name',
    required: false,
  })
  @IsString()
  @IsOptional()
  query: string;
}

export class BrandItemDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: DualLanguageText,
    example: {
      en: 'yohama',
      fa: 'یوهاما',
    },
  })
  name: DualLanguageText;

  @ApiProperty({ type: String, example: 'https://tenzushop/categort/guitar' })
  logo: string;
}

export class GetBrandListResDto {
  @ApiProperty({ type: [BrandItemDto] })
  items: Array<BrandItemDto>;
}
