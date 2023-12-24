import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetTagsStatusDto {
  @ApiProperty({
    type: String,
    example: '6406f19211c2440bc2e12f1b',
    isArray: true,
  })
  @IsNotEmpty()
  @IsMongoId({ each: true })
  tags: Array<string>;
}

export class TagStatusItemDto {
  @ApiProperty({
    type: String,
    example: '6406f19211c2440bc2e12f1b',
  })
  tag_id: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  is_completed: boolean;
}

export class TagsStatusDto {
  @ApiProperty({
    type: TagStatusItemDto,
    isArray: true,
  })
  tags: Array<TagStatusItemDto>;
}
