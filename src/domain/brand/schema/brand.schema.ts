import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { HydratedDocument } from 'mongoose';
import { FAQItemModel, FAQItemSchema } from 'src/domain/faq/schema/faq.schema';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import {
  DescriptionItemModel,
  DescriptionItemSchema,
} from 'src/domain/content/schema/description-item.schema';
import { FileModel, FileSchema } from 'src/domain/file/schema/file.schema';

@Schema({ id: true })
export class BrandModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  name: DualLanguageTextModel;

  @Prop({ type: FileSchema })
  logo: FileModel;

  @Prop({
    required: true,
    type: [DescriptionItemSchema],
    default: [],
  })
  descriptions: Array<DescriptionItemModel>;

  @Prop({
    required: true,
    type: [FAQItemSchema],
    default: [],
  })
  faq_list: FAQItemModel[];
}
export type BrandDocument = HydratedDocument<BrandModel>;
export const BrandSchema = SchemaFactory.createForClass(BrandModel).set(
  'versionKey',
  false,
);
BrandSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

BrandSchema.plugin(paginate);
