import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export default class UpdateBrandFaqDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  brand_id: string;

  @ApiProperty({
    type: String,
    example: '64089176480b435e048480a7',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    type: DualLanguageText,
    example: {
      fa: 'سوال',
      en: 'question 1',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageText)
  @IsNotEmpty()
  question: DualLanguageText;

  @ApiProperty({
    type: DualLanguageText,
    example: {
      fa: 'پاسخ اول',
      en: 'answer 1',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageText)
  @IsNotEmpty()
  answer: DualLanguageText;
}
