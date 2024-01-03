import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class UpdateProductPriceItemDto {
  @ApiProperty({
    type: String,
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: 200000,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_competitive: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  call_to_buy: boolean;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  total_count: number;
}

export class UpdateProductsPriceDto {
  @ApiProperty({ type: UpdateProductPriceItemDto, isArray: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductPriceItemDto)
  products: Array<UpdateProductPriceItemDto>;
}

export class UpdateProductPriceExcelItemDto {
  constructor(body: UpdateProductPriceExcelItemDto | null = null) {
    if (body) {
      this.id = body.id;
      this.call_to_buy = body.call_to_buy;
      this.is_competitive = body.is_competitive;
      this.price = body.price;
      this.total_count = body.total_count;
      this.off_percent = body.total_count;
    }
  }
  @ApiProperty({
    type: String,
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: 200000,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_competitive: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  call_to_buy: boolean;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  off_percent: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  total_count: number;
}
