import { RolesEnum } from "src/domain/auth/constant/role.enum";
import { UserStatusEnum } from "../schema/user.schema";

export class User {    
    id:string
    phone_number: string;
    country_code: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    last_name: string;
    avatar_image: string;
    signup_complete: boolean;
    roles: RolesEnum[];
    register_date: Date;
    national_code: string;
    status: UserStatusEnum;
  }
  