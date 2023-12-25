import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class SetContactUsContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'تهران، فرمانیه، خیابان نارنجستان هفتم، پارک مرکزی، پلاک 1501، طبقه 15',
      en: 'english content',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  address: DualLanguageTextDto;

  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'شنبه تا چهارشنبه | ۱۰ تا ۱۸ پنجشنبه | ۱۰ تا ۱ ',
      en: 'saturday 9-18',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  work_hours: DualLanguageTextDto;

  @ApiProperty({
    type: String,
    example: '+98 21 4022 61',
  })
  @IsString()
  @IsNotEmpty()
  call_numbers: string;
}

export class SetContactUsContentResDto {
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
