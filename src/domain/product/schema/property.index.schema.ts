import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { ProductModel } from './product.schema';
import { SubCategoryModel } from 'src/domain/subcategory/schema/subcategory.schema';

@Schema()
export class PropertyIndexModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product_id: ProductModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCategory' })
  subcategory_id: SubCategoryModel;

  @Prop()
  prop: string;

  @Prop()
  value: string;
}
export type PropertyIndexDocument = HydratedDocument<PropertyIndexModel>;

export const PropertyIndexSchema = SchemaFactory.createForClass(
  PropertyIndexModel,
).set('versionKey', false);
PropertyIndexSchema.plugin(paginate);
