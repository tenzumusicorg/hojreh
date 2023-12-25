import { ApiProperty } from '@nestjs/swagger';

export class DeleteVideoDto {
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
