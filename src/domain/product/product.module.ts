import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { IProductRepository } from './interface/IProduct.repository';
import ProductRepository from './repository/product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
  exports: [IProductRepository],
})
export default class ProductDomainModule {}
