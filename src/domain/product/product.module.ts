import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { IProductRepository } from './interface/IProduct.repository';
import ProductRepository from './repository/product.repository';
import { IProductGroupRepository } from './interface/IProduct-group.repository';
import { ProductGroupRepository } from './repository/product-group.repository';
import { IPropertyIndexRepository } from './interface/IProperty-index.repository';
import { PropertyIndexRepository } from './repository/property-index.repository';
import { ProductGroupSchema } from './schema/product-group.schema';
import { PropertyIndexSchema } from './schema/property.index.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'ProductGroup',
        schema: ProductGroupSchema,
      },
      {
        name: 'PropertyIndex',
        schema: PropertyIndexSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    {
      provide: IProductGroupRepository,
      useClass: ProductGroupRepository,
    },
    {
      provide: IPropertyIndexRepository,
      useClass: PropertyIndexRepository,
    },
    ProductRepository,
  ],
  exports: [
    IProductRepository,
    ProductRepository,
    IProductGroupRepository,
    IPropertyIndexRepository,
  ],
})
export default class ProductDomainModule {}
