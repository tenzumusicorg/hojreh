import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ColorModel } from 'src/domain/color/schema/color.schema';

@Schema({ _id: false })
export class ProductColorModel {
  @Prop()
  has_color: boolean;

  @Prop()
  product_color_name_fa: string;

  @Prop()
  product_color_name_en: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Color' })
  base_color: ColorModel;
}
export const ProductColorSchema = SchemaFactory.createForClass(
  ProductColorModel,
).set('versionKey', false);
