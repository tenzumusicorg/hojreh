import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export default class MoveFaqItemOrderUpDto {
  @ApiProperty({
    type: String,
    example: '64089176480b435e048480a7',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
