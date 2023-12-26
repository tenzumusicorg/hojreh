import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export default class MoveDownCarouselDto {
  @ApiProperty({
    type: Types.ObjectId,
    example: new Types.ObjectId(),
  })
  @IsMongoId()
  carousel_id: Types.ObjectId;
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
