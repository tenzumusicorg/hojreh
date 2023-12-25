import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class SetAboutUsContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'درباره تنزو',
      en: 'About Tenzu...',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  content: DualLanguageTextDto;
}

export class SetAboutUsContentResDto {
  @ApiProperty({
    example: {
      en: 'data updated successfully',
      fa: 'اطلاعات با موفقیت بروزرسانی شد',
    },
  })
  message = {
    en: 'data updated successfully',
    fa: 'اطلاعات با موفقیت بروزرسانی شد',
  };
}
