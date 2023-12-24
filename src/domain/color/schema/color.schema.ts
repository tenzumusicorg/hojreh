import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

@Schema()
export class ColorModel {
  @Prop()
  color_en: string;

  @Prop()
  color_fa: string;

  @Prop()
  link: string;
}
export type ColorDocument = HydratedDocument<ColorModel>;
export const ColorSchema = SchemaFactory.createForClass(ColorModel).set(
  'versionKey',
  false,
);

ColorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ColorSchema.plugin(paginate);
