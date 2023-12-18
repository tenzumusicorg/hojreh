import { RolesEnum } from '../constant/role.enum';

export interface LoginPayload {
  readonly id: string;
  readonly email: string;
  readonly role: RolesEnum;
}
