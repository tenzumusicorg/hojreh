import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class AboutUsContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'درباره تنزو',
      en: 'About Tenzu...',
    },
  })
  content: DualLanguageTextDto;
}
