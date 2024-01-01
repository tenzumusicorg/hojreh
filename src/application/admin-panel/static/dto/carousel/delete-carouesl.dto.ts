import { ApiProperty } from '@nestjs/swagger';

export class DeleteCarouselResDto {
  @ApiProperty({
    example: {
      en: 'Carousel deleted successfully',
      fa: 'محتوا با موفقیت حذف شد',
    },
  })
  message = {
    en: 'Carousel deleted successfully',
    fa: 'محتوا با موفقیت حذف شد',
  };
}
