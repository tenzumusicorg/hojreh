import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema()
export class VideoModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  title: DualLanguageTextModel;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  category: DualLanguageTextModel;

  @Prop({
    required: true,
    type: String,
  })
  cover: string;

  @Prop({
    required: true,
    type: String,
  })
  link: string;

  @Prop({
    required: true,
    type: String,
  })
  duration: string;

  @Prop({
    required: true,
    type: String,
  })
  category_link: string;
}

export type VideoDocument = HydratedDocument<VideoModel>;
export const VideoSchema = SchemaFactory.createForClass(VideoModel).set(
  'versionKey',
  false,
);
