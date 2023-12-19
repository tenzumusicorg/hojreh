import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageText } from '../entity/dual-language.entity';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DescriptionItemDto {
  @ApiProperty({
    type: DualLanguageText,
    example: { fa: 'گیتار الکتریک', en: 'Guitar' },
  })
  @ValidateNested()
  @Type(() => DualLanguageText)
  @IsNotEmpty()
  title: DualLanguageText;

  @ApiProperty({
    type: DualLanguageText,
    example: { fa: 'گیتار الکتریک متن', en: 'Guitar description' },
  })
  @ValidateNested()
  @Type(() => DualLanguageText)
  @IsNotEmpty()
  description: DualLanguageText;
}
