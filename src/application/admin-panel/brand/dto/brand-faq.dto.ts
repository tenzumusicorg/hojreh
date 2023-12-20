import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export default class ChangeBrandFaqDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  @IsNotEmpty()
  brand_id: string;

  @ApiProperty({
    type: String,
    example: '64089176480b435e048480a7',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
