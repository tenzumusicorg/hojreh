import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductAvailabilityModel {
  @Prop()
  is_available: boolean;

  @Prop()
  total_count: number;
}
export const ProductAvailabilitySchema = SchemaFactory.createForClass(
  ProductAvailabilityModel,
).set('versionKey', false);
