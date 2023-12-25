import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import { FileModel, FileSchema } from 'src/domain/file/schema/file.schema';

@Schema({ id: true })
export class CarouselModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  title: DualLanguageTextModel;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  description: DualLanguageTextModel;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  below_text: DualLanguageTextModel;

  @Prop({
    required: true,
    type: FileSchema,
  })
  image: FileModel;

  @Prop({
    required: true,
    type: String,
  })
  link: string;

  @Prop({
    required: true,
    type: Number,
  })
  index: number;
}

export type CarouselDocument = HydratedDocument<CarouselModel>;
export const CarouselSchema = SchemaFactory.createForClass(CarouselModel).set(
  'versionKey',
  false,
);

CarouselSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
