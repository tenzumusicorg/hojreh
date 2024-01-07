import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { ProductModel } from './product.schema';

@Schema()
export class ProductGroupModel {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product_id: ProductModel;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  products: Array<ProductModel>;
}

export type ProductGroupDocument = HydratedDocument<ProductGroupModel>;

export const ProductGroupSchema = SchemaFactory.createForClass(
  ProductGroupModel,
).set('versionKey', false);
ProductGroupSchema.plugin(paginate);
