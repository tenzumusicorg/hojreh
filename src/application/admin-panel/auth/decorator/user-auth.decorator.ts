import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesEnum } from 'src/domain/auth/constant/role.enum';

// export default function UserAuth(...roles: RolesEnum[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(UserJwtAccessGuard, RolesGuard),
//   );
// }
