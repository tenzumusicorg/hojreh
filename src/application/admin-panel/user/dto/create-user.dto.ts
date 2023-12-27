import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class CreateUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  first_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  last_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phone_number: string;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/Avatar/avatar1.webp',
  })
  @IsNotEmpty()
  @IsUrl()
  avatar_image: string = '';
}

export class CreateUserResDto {
  @ApiProperty({
    description: 'message',
    example: {
      en: 'user created successfully',
      fa: 'کاربر با موفقیت ساخته شد',
    },
  })
  message: DualLanguageTextDto = {
    en: 'user created successfully',
    fa: 'کاربر با موفقیت ساخته شد',
  };
}