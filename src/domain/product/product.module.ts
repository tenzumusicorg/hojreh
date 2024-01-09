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
import { ICommentRepository } from './interface/IComment.repository';
import CommentRepository from './repository/comment.repository';
import { ProductCommentSchema } from './schema/product-comment.schema';

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
      {
        name: 'Comment',
        schema: ProductCommentSchema,
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
    {
      provide: ICommentRepository,
      useClass: CommentRepository,
    },
    ProductRepository,
  ],
  exports: [
    IProductRepository,
    ProductRepository,
    IProductGroupRepository,
    IPropertyIndexRepository,
    ICommentRepository,
  ],
})
export default class ProductDomainModule {}
