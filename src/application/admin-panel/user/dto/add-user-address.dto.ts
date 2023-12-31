import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddUserAddressDto {
  @ApiProperty({
    example: 'object id',
  })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string;

  @ApiProperty({
    example: 'خانه',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '16',
  })
  @IsNotEmpty()
  @IsString()
  no: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  floor: string;

  @ApiProperty({
    example: 'فردیس. فلکه چهارم. بلوار امام رضا خیابان میرزاخانی',
  })
  @IsNotEmpty()
  @IsString()
  postal_address: string;

  @ApiProperty({
    example: '1877765467',
  })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: '32.23234',
  })
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty({
    example: '43.7864834',
  })
  @IsNotEmpty()
  @IsString()
  lon: string;
}

export class CreateUserAddressDto extends AddUserAddressDto {}
