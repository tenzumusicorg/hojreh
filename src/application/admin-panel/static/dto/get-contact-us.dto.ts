import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class ContactUsContentDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'تهران، فرمانیه، خیابان نارنجستان هفتم، پارک مرکزی، پلاک 1501، طبقه 15',
      en: 'english content',
    },
  })
  address: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'شنبه تا چهارشنبه | ۱۰ تا ۱۸ پنجشنبه | ۱۰ تا ۱ ',
      en: 'saturday 9-18',
    },
  })
  work_hours: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example: {
      en: '+98 21 4022 61',
    },
  })
  call_numbers: string;
}
