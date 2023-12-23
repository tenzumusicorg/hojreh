import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import {
  DescriptionItemModel,
  DescriptionItemSchema,
} from 'src/domain/content/schema/description-item.schema';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import { FAQItemModel, FAQItemSchema } from 'src/domain/faq/schema/faq.schema';
import { FileModel, FileSchema } from 'src/domain/file/schema/file.schema';

@Schema({ id: true })
export class CategoryModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  title: DualLanguageTextModel;

  @Prop({
    required: false,
    type: DualLanguageTextSchema,
  })
  seo_title: DualLanguageTextModel;

  @Prop({
    required: false,
    type: DualLanguageTextSchema,
  })
  seo_description: DualLanguageTextModel;

  @Prop({
    required: false,
    type: DualLanguageTextSchema,
  })
  faq_title: DualLanguageTextModel;

  @Prop({ type: FileSchema })
  thumbnail: FileModel;

  @Prop({ type: FileSchema })
  banner: FileModel;

  @Prop({
    required: true,
    default: [],
    type: [DescriptionItemSchema],
  })
  descriptions: Array<DescriptionItemModel>;

  @Prop({
    required: true,
    default: [],
    type: [FAQItemSchema],
  })
  faq_list: Array<FAQItemModel>;
}
export type CategoryDocument = HydratedDocument<CategoryModel>;
export const CategorySchema = SchemaFactory.createForClass(CategoryModel).set(
  'versionKey',
  false,
);
CategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CategorySchema.plugin(paginate);
