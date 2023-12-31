import { ApiProperty } from '@nestjs/swagger';

export class UserAddressItemDto {
  @ApiProperty({ example: 'object id' })
  id: string;

  @ApiProperty({
    example: 'خانه',
  })
  title: string;

  @ApiProperty({
    example: '16',
  })
  no: string;

  @ApiProperty({
    example: '1',
  })
  floor: string;

  @ApiProperty({
    example: 'فردیس. فلکه چهارم. بلوار امام رضا خیابان میرزاخانی',
  })
  postal_address: string;

  @ApiProperty({
    example: '1877765467',
  })
  postal_code: string;

  @ApiProperty({
    example: '32.23234',
  })
  lat: string;

  @ApiProperty({
    example: '43.7864834',
  })
  lon: string;
}
export class UserAddressListDto {
  @ApiProperty({
    type: UserAddressItemDto,
    isArray: true,
  })
  items: Array<UserAddressItemDto>;
}
