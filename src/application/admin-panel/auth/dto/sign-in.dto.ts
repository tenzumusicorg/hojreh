import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class SignInDto {
  constructor(body: SignInDto | null = null) {
    if (body) {
      this.email = body.email;
      this.password = body.password;
    }
  }

  @ApiProperty({ type: String, example: 'admin@tenzumusic.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string;

  @ApiProperty({ type: String, example: 'adminadmin' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  readonly password: string;
}
