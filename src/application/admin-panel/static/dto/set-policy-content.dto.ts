import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class SetPolicyContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'قوانین',
      en: 'Terms and Policy',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  content: DualLanguageTextDto;
}

export class SetPolicyContentResDto {
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
