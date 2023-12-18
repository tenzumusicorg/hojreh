import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesEnum } from 'src/domain/auth/constant/role.enum';
import { AdminJwtAccessGuard } from '../guard/admin-jwt-access.guard';

export default function AdminAuth(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AdminJwtAccessGuard),
  );
}
