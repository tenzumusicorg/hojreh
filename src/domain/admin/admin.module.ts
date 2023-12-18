import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { IAdminRepository } from './interface/IAdmin.repository';
import AdminsRepository from './repository/admin.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IAdminRepository,
      useClass: AdminsRepository,
    },
  ],
  exports: [IAdminRepository],
})
export default class AdminDomainModule {}
