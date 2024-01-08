import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './command/create-product.command';
import ProductDomainModule from 'src/domain/product/product.module';
import FileDomainModule from 'src/domain/file/file.module';
import BrandDomainModule from 'src/domain/brand/brand.module';
import ModelDomainModule from 'src/domain/model/model.module';
import CategoryDomainModule from 'src/domain/category/category.module';
import SubCategoryDomainModule from 'src/domain/subcategory/subcategory.module';
import TagDomainModule from 'src/domain/tag/tag.module';
import ColorDomainModule from 'src/domain/color/color.module';
import { UpdateProductHandler } from './command/update-product.command';
import ProductService from './product.service';
import { UpdateProductPriceByExcelHandler } from './command/update-product-price-excel.command';
import { UpdateProductPriceHandler } from './command/update-product-price.command';
import { FileModule } from 'src/infrastructure/file/file.module';
import ProductController from './product.controller';

export const commandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  UpdateProductPriceByExcelHandler,
  UpdateProductPriceHandler,
];
export const queryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    ProductDomainModule,
    FileDomainModule,
    BrandDomainModule,
    ModelDomainModule,
    CategoryDomainModule,
    SubCategoryDomainModule,
    TagDomainModule,
    BrandDomainModule,
    ColorDomainModule,
  ],
  controllers: [ProductController],
  providers: [...commandHandlers, ...queryHandlers, ProductService],
  exports: [],
})
export default class ProductModule {}
