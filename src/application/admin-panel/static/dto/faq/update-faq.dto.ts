import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';
import { FaqItemDto } from 'src/domain/faq/dto/faq-dto';

export class UpdateFAQContentDto {
  content?: DualLanguageTextDto;
  faq_list?: Array<FaqItemDto>;
}

export default class UpdateFaqItemDto {
  @ApiProperty({
    type: String,
    example: '64089176480b435e048480a7',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

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
      fa: 'سوال',
      en: 'question 1',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  answer: DualLanguageTextDto;
}
