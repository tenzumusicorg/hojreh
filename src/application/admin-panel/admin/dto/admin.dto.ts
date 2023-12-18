import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../../../domain/auth/constant/role.enum';
import { AdminStatusEnum } from '../../../../domain/admin/constant/admin-status.enum';

export class AdminDto {
  @ApiProperty({ example: 'object id' })
  id: string;

  @ApiProperty({ enum: RolesEnum, example: RolesEnum.Admin })
  role: RolesEnum = RolesEnum.Admin;

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

  @Exclude()
  password: string;
}

export default class AdminsResponseDto {
  @ValidateNested({ each: true })
  @Type(() => AdminDto)
  data?: AdminDto[] = [];
}
