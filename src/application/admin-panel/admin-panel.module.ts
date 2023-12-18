import { Module } from '@nestjs/common';
import AuthModule from 'src/application/admin-panel/auth/auth.module';
import AdminModule from './admin/admin.module';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AdminPanelModule {}
