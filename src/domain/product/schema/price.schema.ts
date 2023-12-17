import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PriceSaleModel {
  @Prop()
  is_on_sale: boolean;

  @Prop()
  off_percent: number;
}
export const PriceSaleSchema = SchemaFactory.createForClass(PriceSaleModel).set(
  'versionKey',
  false,
);

@Schema({ _id: false })
export class PriceModel {
  @Prop()
  price: number;

  @Prop()
  is_competitive: boolean;

  @Prop()
  call_to_buy: boolean;

  @Prop({ type: PriceSaleSchema })
  sale: PriceSaleModel;

  @Prop()
  is_used: boolean;
}
export const PriceSchema = SchemaFactory.createForClass(PriceModel).set(
  'versionKey',
  false,
);
