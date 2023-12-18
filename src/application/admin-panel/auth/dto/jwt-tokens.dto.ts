import { ApiProperty } from '@nestjs/swagger';

export default class JwtTokensDto {
  @ApiProperty({
    type: String,
  })
  readonly access_token: string;

  @ApiProperty({
    type: String,
  })
  readonly refresh_token: string;
}
