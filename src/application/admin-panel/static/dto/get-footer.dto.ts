import { ApiProperty } from '@nestjs/swagger';
import { FooterSocialMediaDto } from './set-footer.dto';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class FooterContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'تهرانو فرمانیه...',
      en: ' Tehran, Farmanie..',
    },
  })
  address: DualLanguageTextDto;

  @ApiProperty({
    example: '۰۲۱-۱۱۰',
  })
  call_numbers: string;

  @ApiProperty({
    required: true,
    type: FooterSocialMediaDto,
  })
  social_media: FooterSocialMediaDto;
}
