import { ApiProperty } from "@nestjs/swagger";

export class DeleteAdminResDto {
    @ApiProperty({
      example: {
        en: 'admin deleted successfully',
        fa: 'ادمین با موفقیت حذف شد',
      }
    })
    message = {
      en: 'admin deleted successfully',
      fa: 'ادمین با موفقیت حذف شد',
    };
  }