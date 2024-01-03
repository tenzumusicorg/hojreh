import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class ProductAvailabilityDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  is_available: boolean;

  @ApiProperty({
    example: 4,
  })
  @IsNumber()
  total_count: number;
}
