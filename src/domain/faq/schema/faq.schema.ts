import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

@Schema({ _id: true, id: true })
export class FAQItemModel {
  @Prop()
  question: DualLanguageText;

  @Prop()
  answer: DualLanguageText;
}

// export type FAQItemDocument = HydratedDocument<FAQItemModel>;
export const FAQItemSchema = SchemaFactory.createForClass(FAQItemModel);

FAQItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
