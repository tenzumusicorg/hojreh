import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema({ id: true })
export class ContactUsContentModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  address: DualLanguageTextModel;

  @Prop({
    required: true,
    type: DualLanguageTextModel,
  })
  work_hours: DualLanguageTextModel;

  @Prop({
    required: true,
  })
  call_numbers: string;
}

export type ContactUsContentDocument = HydratedDocument<ContactUsContentModel>;

export const ContactUsContentSchema = SchemaFactory.createForClass(
  ContactUsContentModel,
).set('versionKey', false);

ContactUsContentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
