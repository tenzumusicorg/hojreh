import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class RefreshTokenReqDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @MinLength(32)
  @IsString()
  readonly refresh_token: string;
}
