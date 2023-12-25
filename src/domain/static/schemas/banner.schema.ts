import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import { FileModel, FileSchema } from 'src/domain/file/schema/file.schema';

@Schema({ id: true })
export class BannerModel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  type: DualLanguageTextModel;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  description: DualLanguageTextModel;

  @Prop({ type: FileSchema })
  image: FileModel;

  @Prop({
    required: true,
    type: String,
  })
  link: string;
}

export type BannerDocument = HydratedDocument<BannerModel>;
export const BannerSchema = SchemaFactory.createForClass(BannerModel).set(
  'versionKey',
  false,
);

BannerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
