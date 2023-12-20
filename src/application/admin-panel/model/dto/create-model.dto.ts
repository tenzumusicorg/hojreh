import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateModelDto {
  @ApiProperty({
    type: String,
    example: 'یوهاما',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  brand: string;
}
