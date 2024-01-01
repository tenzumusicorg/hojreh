import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MoveUpCarouselDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsMongoId()
  carousel_id: string;
}

export class MoveUpCarouselResDto {
  @ApiProperty({
    example: {
      en: 'Carousel moved up successfully',
      fa: 'محتوا با موفقیت جابه جا شد',
    },
  })
  message = {
    en: 'Carousel moved up successfully',
    fa: 'محتوا با موفقیت جابه جا شد',
  };
}
