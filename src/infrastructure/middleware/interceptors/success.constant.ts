import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class SuccessResponse {
  @ApiProperty({
    type: DualLanguageText,
    example: {
      en: 'operation done successfully',
      fa: 'عملیات با موفقیت انجام شد',
    },
  })
  message: DualLanguageText = {
    en: 'operation done successfully',
    fa: 'عملیات با موفقیت انجام شد',
  };
}
