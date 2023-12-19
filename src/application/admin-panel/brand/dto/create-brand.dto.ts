import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DescriptionItemDto } from 'src/domain/content/dto/description-item.dto';

export class CreateBrandReqDto {
  @ApiProperty({
    type: String,
    example: 'یوهاما',
  })
  @IsNotEmpty()
  @IsString()
  name_fa: string;

  @ApiProperty({
    type: String,
    example: 'yohama',
  })
  @IsNotEmpty()
  @IsString()
  name_en: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
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
