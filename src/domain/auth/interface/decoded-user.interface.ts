import { RolesEnum } from '../constant/role.enum';

export interface DecodedUser {
  readonly id: string;
  readonly role: RolesEnum;
  readonly iat?: number;
  readonly exp?: number;
}
