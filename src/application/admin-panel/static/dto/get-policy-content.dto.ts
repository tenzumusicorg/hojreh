import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class PolicyContentDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  id: string;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: '...قوانین',
      en: 'Terms and Policy...',
    },
  })
  content: DualLanguageTextDto;
}
