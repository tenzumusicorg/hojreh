import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import { FAQItemModel, FAQItemSchema } from 'src/domain/faq/schema/faq.schema';

@Schema()
export class FAQContentModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  content: DualLanguageTextModel;

  @Prop({
    required: true,
    default: [],
    type: [FAQItemSchema],
  })
  faq_list: Array<FAQItemModel>;
}

export type FAQContentDocument = HydratedDocument<FAQContentModel>;
export const FAQContentSchema = SchemaFactory.createForClass(
  FAQContentModel,
).set('versionKey', false);
