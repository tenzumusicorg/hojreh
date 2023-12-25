import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { FaqItemDto } from 'src/domain/faq/dto/faq-dto';

export default class FaqContentDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'سوالات متداول', en: 'faq title' },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  content: DualLanguageTextDto;

  @ApiProperty({
    type: FaqItemDto,
    isArray: true,
    example: [
      {
        answer: { fa: 'پاسخ اول', en: 'answer 1' },
        question: { fa: 'سوال', en: 'question 1' },
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => FaqItemDto)
  @IsNotEmpty()
  faq_list: Array<FaqItemDto>;
}
