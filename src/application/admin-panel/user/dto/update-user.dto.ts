import { IsNotEmpty, IsMongoId, IsEnum, IsEmail, IsOptional, IsString, MaxLength, MinLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatusEnum } from 'src/domain/user/schema/user.schema';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export default class UpdateUserDto {
  @ApiProperty({ type: String, example: 'object id' })
  @IsNotEmpty()
  @IsMongoId()
  user_id: string

  @ApiProperty({
    type: String,
    example: 'admin@tenzumusic.com',
  })
  @IsEmail()
  @IsOptional()
  email: string = '';

  @ApiProperty({
    type: String,
    example: '09128765432',
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  phone_number: string;

  @ApiProperty({
    type: String,
    example: 'user first name',
  })
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiProperty({
    type: String,
    example: 'user last name',
  })
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiProperty({
    type: String,
    example: '0020553720',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  national_code: string;

  @ApiProperty({
    enum: UserStatusEnum,
    example: UserStatusEnum.active,
  })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @ApiProperty({
    type: String,
    example: 'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/1748ff1b-af0a-4011-9cc7-260c440bf0b3.webp',
  })
  @IsOptional()
  @IsUrl()
  avatar_image: string;
}

export class UpdateUserResDto {
  @ApiProperty({
    description: 'message',
    example: {
      en: 'user updated successfully',
      fa: 'کاربر با موفقیت بروزرسانی شد',
    },
  })
  message: DualLanguageTextDto = {
    en: 'user updated successfully',
    fa: 'کاربر با موفقیت بروزرسانی شد',
  };
}

export class UpdateUserCommand {
  status?: UserStatusEnum;
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  national_code?: string;
  avatar_image?: string;
}
