import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MoveDownCarouselDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsMongoId()
  carousel_id: string;
}

export class MoveDownCarouselResDto {
  @ApiProperty({
    example: {
      en: 'Carousel moved down successfully',
      fa: 'محتوا با موفقیت جابه جا شد',
    },
  })
  message = {
    en: 'Carousel moved down successfully',
    fa: 'محتوا با موفقیت جابه جا شد',
  };
}
