import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

export class FooterSocialMediaModel {
  @Prop()
  instagram: string;

  @Prop()
  telegram: string;

  @Prop()
  twitter: string;

  @Prop()
  youtube: string;

  @Prop()
  aparat: string;

  @Prop()
  linkedin: string;
}
export const FooterSocialMediaSchema = SchemaFactory.createForClass(
  FooterSocialMediaModel,
).set('versionKey', false);

@Schema()
export class FooterContentModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  address: DualLanguageTextModel;

  @Prop({
    required: true,
  })
  call_numbers: string;

  @Prop({
    required: true,
    type:FooterSocialMediaSchema
  })
  social_media: FooterSocialMediaModel;
}

export type FooterContentDocument = HydratedDocument<FooterContentModel>;
export const FooterContentSchema = SchemaFactory.createForClass(
  FooterContentModel,
).set('versionKey', false);
