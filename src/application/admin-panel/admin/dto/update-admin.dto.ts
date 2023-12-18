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
import { AdminStatusEnum } from '../../../../domain/admin/constant/admin-status.enum';

export class UpdateAdminReqDto {
  @ApiProperty({
    type: String,
    example: 'object id',
  })
  @IsMongoId()
  @IsNotEmpty()
  admin_id: string;

  @ApiProperty({
    type: String,
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
