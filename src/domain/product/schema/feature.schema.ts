import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FeatureModel {
  @Prop()
  fa: string;

  @Prop()
  en: string;
}
export const FeatureSchema = SchemaFactory.createForClass(FeatureModel).set(
  'versionKey',
  false,
);
