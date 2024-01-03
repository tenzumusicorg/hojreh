import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductRatingDto {
  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  stars: number;

  @ApiProperty({
    example: 2.3,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  total_ratings: number;
}
