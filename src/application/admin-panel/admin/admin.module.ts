import { Module, OnModuleInit } from '@nestjs/common';
import AdminService from './admin.service';
import AdminDomainModule from 'src/domain/admin/admin.module';
import { UpdateAdminHandler } from './command/update-admin.command';
import { DeleteAdminHandler } from './command/delete-admin.command';
import { AdminProfileHandler } from './query/admin-profile.query';
import { AdminListHandler } from './query/admin-list.query';
import AdminsController from './admins.controller';
import { CqrsModule } from '@nestjs/cqrs';

export const commandHandlers = [UpdateAdminHandler, DeleteAdminHandler];
export const queryHandlers = [AdminProfileHandler, AdminListHandler];

@Module({
  imports: [CqrsModule, AdminDomainModule],
  controllers: [AdminsController],
  providers: [AdminService, ...commandHandlers, ...queryHandlers],
  exports: [],
})
export default class AdminModule implements OnModuleInit {
  constructor(private adminService: AdminService) {}
  async onModuleInit() {
    this.adminService.createSystemAdmin();
  }
}
