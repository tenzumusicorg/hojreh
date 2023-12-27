import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SetBannerDeactivateDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsMongoId()
  banner_id: string;
}

export class SetBannerDeactivateResDto {
  @ApiProperty({
    example: {
      en: 'Banner deactivated successfully',
      fa: 'بنر با موفقیت غیرفعال شد',
    },
  })
  message = {
    en: 'Banner deactivated successfully',
    fa: 'بنر با موفقیت غیرفعال شد',
  };
}
