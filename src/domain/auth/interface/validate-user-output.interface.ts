import { RolesEnum } from '../constant/role.enum';

export interface ValidateUserOutput {
  id: string;
  email?: string;
  role?: RolesEnum;
}
