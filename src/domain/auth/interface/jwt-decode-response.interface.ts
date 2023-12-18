import { RolesEnum } from '../constant/role.enum';

export interface IJwtDecode {
  id: string;
  role: RolesEnum;
  is_new_user: boolean;
  iat?: number;
  exp?: number;
}
