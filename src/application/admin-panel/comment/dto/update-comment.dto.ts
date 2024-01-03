import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'comment title',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'comment body',
  })
  @IsOptional()
  @IsString()
  body: string;
}
