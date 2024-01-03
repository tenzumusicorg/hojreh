import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class ProductPriceSaleDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  is_on_sale: boolean;

  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  off_percent: number;
}

export class ProductPriceDto {
  @ApiProperty({
    example: 200000,
  })
  price_to_pay?: number; //calculated

  @ApiProperty({
    example: 200000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  call_to_buy: boolean;

  @ApiProperty({
    type: ProductPriceSaleDto,
  })
  @ValidateNested()
  @Type(() => ProductPriceSaleDto)
  @IsNotEmpty()
  sale: ProductPriceSaleDto;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  is_used: boolean;
}

export class ProductPriceReqDto {
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
    type: ProductPriceSaleDto,
  })
  @ValidateNested()
  @Type(() => ProductPriceSaleDto)
  sale: ProductPriceSaleDto;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_used: boolean;
}


