import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class FaqItemDto {
  @ApiProperty({
    type: DualLanguageText,
    example: {
      fa: 'سوال',
      en: 'question 1',
    },
  })
  question: DualLanguageText;

  @ApiProperty({
    type: DualLanguageText,
    example: {
      fa: 'پاسخ اول',
      en: 'answer 1',
    },
  })
  answer: DualLanguageText;
}
