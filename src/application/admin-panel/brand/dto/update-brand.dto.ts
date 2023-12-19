import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';

export class UpdateBrandReqDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsNotEmpty()
  @IsMongoId()
  brand_id: string;

  @ApiProperty({
    type: String,
    example: 'یوهاما',
  })
  @IsOptional()
  @IsString()
  name_fa: string;

  @ApiProperty({
    type: String,
    example: 'yohama',
  })
  @IsOptional()
  @IsString()
  name_en: string;

  @ApiProperty({ type: String, example: 's3 url' })
  @IsOptional()
  @IsMongoId()
  logo: string;

  @ApiProperty({
    isArray: true,
    type: DescriptionItemDto,
  })
  @ValidateNested({ each: true })
  @Type(() => DescriptionItemDto)
  @IsArray()
  @IsNotEmpty()
  descriptions: Array<DescriptionItemDto>;
}
