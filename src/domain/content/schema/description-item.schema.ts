import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DualLanguageTextModel } from './dual-language.schema';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class DescriptionItemModel {
  @Prop()
  title: DualLanguageTextModel;

  @Prop()
  description: DualLanguageTextModel;
}

export type DescriptionItemDocument = HydratedDocument<DescriptionItemModel>;

export const DescriptionItemSchema = SchemaFactory.createForClass(
  DescriptionItemModel,
).set('versionKey', false);
