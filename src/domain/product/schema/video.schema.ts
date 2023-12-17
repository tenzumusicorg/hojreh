import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema({ _id: false })
export class ProductVideoModel {
  @Prop({ type: DualLanguageTextSchema })
  title: DualLanguageTextModel;

  @Prop()
  thumbnail: string;

  @Prop()
  length: number;

  @Prop()
  url: string;

  @Prop({ type: DualLanguageTextSchema })
  category: DualLanguageTextModel;
}

export const ProductVideoSchema = SchemaFactory.createForClass(
  ProductVideoModel,
).set('versionKey', false);
