import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from 'src/domain/auth/constant/role.enum';
import { UserStatusEnum } from 'src/domain/user/schema/user.schema';

export class UserDto {
  @ApiProperty({ example:'object id' })
  id: string;

  @ApiProperty({enum:RolesEnum, example:RolesEnum.User})
  roles: RolesEnum[]

  @ApiProperty({ type: Boolean, example: false })
  signup_complete: boolean 

  @ApiProperty({ type: String, example: 'user' })
  email: string 

  @ApiProperty({ type: Boolean, example: false })
  email_verified: boolean 

  @ApiProperty({ type: String, example: '09121234567' })
  phone_number: string;

  @ApiProperty({ type: String, example: '98' })
  country_code: string;

  @ApiProperty({ type: String, example: 'user first name' })
  first_name: string;

  @ApiProperty({ type: String, example: 'user last name' })
  last_name: string;

  @ApiProperty({ type: String, example: new Date() })
  register_date: Date;

  @ApiProperty({ type: String, example: '2745665412' })
  national_code: string

  @ApiProperty({ enum: UserStatusEnum, example: UserStatusEnum.active })
  status: UserStatusEnum
}

