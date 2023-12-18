import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly first_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly last_name: string;
}

export class SignUpResDto {
  @ApiProperty({
    example: {
      en: 'admin created successfully',
      fa: 'ادمین با موفقیت اضافه شد',
    },
  })
  message = {
    en: 'admin created successfully',
    fa: 'ادمین با موفقیت اضافه شد',
  };
}
