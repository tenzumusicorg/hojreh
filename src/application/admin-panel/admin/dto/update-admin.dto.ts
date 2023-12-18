import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminStatusEnum } from 'src/domain/admin/constant/admin-status.enum';

export class UpdateAdminReqDto {
  @ApiProperty({
    type: Number,
    example: 'object id',
  })
  @IsNotEmpty()
  @IsMongoId()
  admin_id: string;

  @ApiProperty({
    type: Number,
    example: 'admin first name',
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    type: Number,
    example: 'admin last name',
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    type: Number,
    example: 'testemail@tenzumusic.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: Number,
    example: '12345678',
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @ApiProperty({
    type: Number,
    example: AdminStatusEnum.ACTIVE,
  })
  @IsEnum(AdminStatusEnum)
  @IsOptional()
  status: AdminStatusEnum;
}

export class UpdateAdminResDto {
  @ApiProperty({
    example: {
      en: 'admin created successfully',
      fa: 'ادمین با موفقیت بروزرسانی شد',
    },
  })
  message = {
    en: 'admin created successfully',
    fa: 'ادمین با موفقیت بروزرسانی شد',
  };
}
