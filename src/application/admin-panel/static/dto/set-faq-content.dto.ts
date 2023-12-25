import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class SetFAQContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: { fa: 'سوالات متداول', en: 'faq title' },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  content: DualLanguageTextDto;
}

export class CreateFAQContentDto {
  content: DualLanguageTextDto;
}

export class SetFAQContentResDto {
  @ApiProperty({
    example: {
      en: 'data updated successfully',
      fa: 'اطلاعات با موفقیت بروززسانی شد',
    },
  })
  message = {
    en: 'data updated successfully',
    fa: 'اطلاعات با موفقیت بروززسانی شد',
  };
}
