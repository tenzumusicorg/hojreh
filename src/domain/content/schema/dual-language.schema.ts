import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class DualLanguageTextModel {
  @Prop()
  en: string;

  @Prop()
  fa: string;
}

export type DualLanguageTextDocument = HydratedDocument<DualLanguageTextModel>;

export const DualLanguageTextSchema = SchemaFactory.createForClass(
  DualLanguageTextModel,
).set('versionKey', false);
