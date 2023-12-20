import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetModelListDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  brand_id: string;

  @ApiProperty({
    example: 'yohama',
  })
  @IsString()
  @IsOptional()
  query: string;
}

export class ModelItemDto {
  @ApiProperty({ type: String, example: '6406f19211c2440bc2e12f1b' })
  id: Types.ObjectId;

  @ApiProperty({
    type: String,
    example: 'yohamma',
  })
  name: string;
}

export class ModelListDto {
  @ApiProperty({ type: [ModelItemDto] })
  items: Array<ModelItemDto>;
}
