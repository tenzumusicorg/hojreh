import { RolesEnum } from '../constant/admin-role.enum';
import { AdminStatusEnum } from '../constant/admin-status.enum';

export class Admin {
  id: string;
  email: string;
  password: string;
  role: RolesEnum;
  first_name: string;
  last_name: string;
  status: AdminStatusEnum;
  register_date: Date;
  is_deleted: Boolean;
  created_by: string;
}
