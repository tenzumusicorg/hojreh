import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AdminStatusEnum } from '../../../../domain/admin/constant/admin-status.enum';
import { RolesEnum } from '../../../../domain/auth/constant/role.enum';

export class AdminListReqDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  page: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: String,
    example: 'guitar',
  })
  @IsOptional()
  @IsString()
  query: string;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsEnum(AdminStatusEnum)
  @IsOptional()
  filter_status: AdminStatusEnum;
}

export class AdminItemDto {
  @ApiProperty({ example: new Types.ObjectId() })
  id: string;

  @ApiProperty({ enum: RolesEnum, example: RolesEnum.Admin })
  role: RolesEnum;

  @ApiProperty({ example: 'admin@tenzumusic.com' })
  email: string;

  @ApiProperty({ example: 'admin first name' })
  first_name: string;

  @ApiProperty({ example: 'admin last name' })
  last_name: string;

  @ApiProperty({ type: Date, example: new Date() })
  register_date: Date;

  @ApiProperty({ enum: AdminStatusEnum, example: AdminStatusEnum.ACTIVE })
  status: AdminStatusEnum;
}

export class AdminListResDto {
  @ApiProperty({
    type: AdminItemDto,
    isArray: true,
  })
  items: AdminItemDto[];

  @ApiProperty({ example: 10 })
  total_pages: number;

  @ApiProperty({
    example: 1,
  })
  page: number;
}
