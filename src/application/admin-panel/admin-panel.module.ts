import { Module } from '@nestjs/common';
import AuthModule from 'src/application/admin-panel/auth/auth.module';
import AdminModule from './admin/admin.module';
import { RouterModule, Routes } from '@nestjs/core';
import BrandModule from './brand/brand.module';
import ModelModule from './model/model.module';

const routes: Routes = [
  {
    path: '/admin',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/admins', module: AdminModule },
      { path: '/brand', module: BrandModule },
      { path: '/model', module: ModelModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    AdminModule,
    BrandModule,
    ModelModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminPanelModule {}
