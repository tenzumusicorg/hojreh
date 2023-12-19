import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface PaginationParamsInterface {
  readonly page: number;
  readonly limit?: number;
}

export class PaginationParams {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  page: number = 1;

  @ApiProperty({
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number = 10;
}

export class PaginationParamsResponse {
  @ApiProperty({
    example: 42,
  })
  total_pages: number;

  @ApiProperty({
    example: 2,
  })
  current_page: number;

  @ApiProperty({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 123,
  })
  total_items: number;
}
