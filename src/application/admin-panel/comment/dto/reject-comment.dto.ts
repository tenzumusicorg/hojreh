import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RejectCommentDto {
  @ApiProperty({
    example: '64106fe12994b8fbd0423189',
  })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
