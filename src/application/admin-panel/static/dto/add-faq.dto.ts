import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class AddFaqItemDto {
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
