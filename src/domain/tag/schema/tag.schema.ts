import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
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
import { SubCategoryModel } from 'src/domain/subcategory/schema/subcategory.schema';

@Schema({ id: true })
export class TagModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCategory' })
  subcategory: SubCategoryModel;

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
export type TagDocument = HydratedDocument<TagModel>;
export const TagSchema = SchemaFactory.createForClass(TagModel).set(
  'versionKey',
  false,
);
TagSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TagSchema.plugin(paginate);
