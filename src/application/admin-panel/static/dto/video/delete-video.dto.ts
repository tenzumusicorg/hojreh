import { ApiProperty } from '@nestjs/swagger';

export class DeleteVideoResDto {
  @ApiProperty({
    example: {
      en: 'video deleted successfully',
      fa: 'ویدیو با موفقیت حذف شد',
    },
  })
  message = {
    en: 'video deleted successfully',
    fa: 'ویدیو با موفقیت حذف شد',
  };
}
