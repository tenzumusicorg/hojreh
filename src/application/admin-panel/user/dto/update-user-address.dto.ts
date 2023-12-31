import { IsOptional, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserAddressDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsNotEmpty()
  @IsMongoId()
  address_id: string;

  @ApiProperty({
    type: String,
    example: 'address title',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: '16',
  })
  @IsOptional()
  @IsString()
  no: string;

  @ApiProperty({
    example: '1',
  })
  @IsOptional()
  @IsString()
  floor: string;

  @ApiProperty({
    example: 'فردیس. فلکه چهارم. بلوار امام رضا خیابان میرزاخانی',
  })
  @IsOptional()
  @IsString()
  postal_address: string;

  @ApiProperty({
    example: '1877765467',
  })
  @IsOptional()
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: '32.23234',
  })
  @IsOptional()
  @IsString()
  lat: string;

  @ApiProperty({
    example: '43.7864834',
  })
  @IsOptional()
  @IsString()
  lon: string;
}
