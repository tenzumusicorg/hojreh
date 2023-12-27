import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserStatusEnum } from 'src/domain/user/schema/user.schema';

export class GetUserListDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({ type: String, example: 'محمد' })
  @IsString()
  @IsOptional()
  query: string;

  @ApiProperty({ enum: [UserStatusEnum], example: [UserStatusEnum.active] })
  @IsEnum(UserStatusEnum ,{each: true})
  @IsArray()
  @IsNotEmpty()
  filter_status: UserStatusEnum[];
}

export class UserItemDto {
  @ApiProperty({ type: String, example:'object id'})
  id: string

  @ApiProperty({ type: String, example: '09121234567' })
  phone_number: string;

  @ApiProperty({ type: String, example: 'user first name' })
  first_name: string;

  @ApiProperty({ type: String, example: 'user last name' })
  last_name: string;

  @ApiProperty({ type: String, example: new Date() })
  register_date: Date;

  @ApiProperty({ enum: UserStatusEnum, example: UserStatusEnum.active })
  status: UserStatusEnum;

  @ApiProperty({
    type: String,
    example:
      'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/Avatar/avatar1.webp',
  })
  avatar_image: string;
}

export class UserListDto {
  @ApiProperty({ type: Number,example:1 })
  page: number;

  @ApiProperty({ type: Number,example:13 })
  total_pages: number;

  @ApiProperty({ type: UserItemDto,isArray:true })
  items: UserItemDto[];

  @ApiProperty({ type: Number,example:1300 })
  total_users: number

  @ApiProperty({ type: Number,example:135 })
  total_users_in_month: number

  @ApiProperty({ type: Number,example:100 })
  total_customers: number
}
