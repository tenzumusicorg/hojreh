import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema({ id: true })
export class AboutUsContentModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  content: DualLanguageTextModel;
}

export type AboutUsContentDocument = HydratedDocument<AboutUsContentModel>;
export const AboutUsContentSchema = SchemaFactory.createForClass(
  AboutUsContentModel,
).set('versionKey', false);

AboutUsContentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
