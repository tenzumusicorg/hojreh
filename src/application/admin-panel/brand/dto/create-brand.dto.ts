import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
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

  @ApiProperty({ type: String, example: 's3 url' })
  @IsUrl()
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
