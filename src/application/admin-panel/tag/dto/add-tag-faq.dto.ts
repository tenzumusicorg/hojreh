import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class AddTagFaqDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  tag_id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'سوال',
      en: 'question 1',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  question: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'پاسخ اول',
      en: 'answer 1',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  answer: DualLanguageTextDto;
}
