import { Module } from '@nestjs/common';
import AuthModule from 'src/application/admin-panel/auth/auth.module';
import AdminModule from './admin/admin.module';
import { RouterModule, Routes } from '@nestjs/core';
import BrandModule from './brand/brand.module';
import ModelModule from './model/model.module';
import CategoryModule from './category/category.module';
import SubCategoryModule from './subcategory/subcategory.module';
import TagModule from './tag/tag.module';
import ColorModule from './color/color.module';
import StaticModule from './static/static.module';
import ProductModule from './product/product.module';

const routes: Routes = [
  {
    path: '/admin',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/admins', module: AdminModule },
      { path: '/brand', module: BrandModule },
      { path: '/model', module: ModelModule },
      { path: '/category', module: CategoryModule },
      { path: '/subcategory', module: SubCategoryModule },
      { path: '/tag', module: TagModule },
      { path: '/color', module: ColorModule },
      { path: '/static', module: StaticModule },
      { path: '/product', module: ProductModule },
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
    CategoryModule,
    SubCategoryModule,
    TagModule,
    ColorModule,
    StaticModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminPanelModule {}
