import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class ProductImageDto {
  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_primary: boolean;
}

export class ProductImageResponseDto {
  @ApiProperty({
    example: 'image url',
  })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 'image url',
  })
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_primary: boolean;

  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  url_id: string;

  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  thumbnail_id: string;
}

export class UploadProductImageResDto {
  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: '6406f19211c2440bc2e12f1b',
  })
  @IsMongoId()
  @IsNotEmpty()
  thumbnail: string;
}
