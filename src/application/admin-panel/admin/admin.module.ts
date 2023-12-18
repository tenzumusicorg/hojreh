import { Module, OnModuleInit } from '@nestjs/common';
import { IAdminRepository } from '../../../domain/admin/interface/IAdmin.repository';
import AdminService from './admin.service';
import AdminDomainModule from 'src/domain/admin/admin.module';

@Module({
  imports: [AdminDomainModule],
  controllers: [],
  providers: [AdminService],
  exports: [],
})
export default class AdminModule implements OnModuleInit {
  constructor(private adminService: AdminService) {}
  async onModuleInit() {
    this.adminService.createSystemAdmin();
  }
}
