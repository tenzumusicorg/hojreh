import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { BrandModel } from 'src/domain/brand/schema/brand.schema';
import { CategoryModel } from 'src/domain/category/schema/category.schema';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';
import { ModelModel } from 'src/domain/model/schema/model.schema';
import { SubCategoryModel } from 'src/domain/subcategory/schema/subcategory.schema';
import { TagModel } from 'src/domain/tag/schema/tag.schema';
import { RatingModel, RatingSchema } from './rate.schema';
import { ProductImageModel, ProductImageSchema } from './product-image.schema';
import { PriceModel, PriceSchema } from './price.schema';
import {
  ProductAvailabilityModel,
  ProductAvailabilitySchema,
} from './product-availability.schema';
import { ProductColorModel, ProductColorSchema } from './color.schema';
import { ProductVideoModel, ProductVideoSchema } from './video.schema';
import { FeatureModel, FeatureSchema } from './feature.schema';
import { PropertiesModel, PropertiesSchema } from './properties.schema';
import { AdminModel } from 'src/domain/admin/schema/admin.schema';
import paginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class ProductModel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  seo_name: DualLanguageTextModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: CategoryModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCategory' })
  subcategory: SubCategoryModel;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tag' }] })
  tags: Array<TagModel>;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Brand' })
  brand: BrandModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Model' })
  model_id: ModelModel;

  @Prop({ type: RatingSchema })
  rating: RatingModel;

  @Prop({ type: [ProductImageSchema] })
  images: Array<ProductImageModel>;

  @Prop({ type: PriceSchema })
  price: PriceModel;

  @Prop()
  custom_id: string;

  @Prop({ type: ProductAvailabilitySchema })
  availability: ProductAvailabilityModel;

  @Prop({ type: ProductColorSchema })
  color: ProductColorModel;

  @Prop()
  product_group: string;

  @Prop({ type: [ProductVideoSchema] })
  videos: Array<ProductVideoModel>;

  @Prop({ type: [FeatureSchema] })
  features: Array<FeatureModel>;

  @Prop({ type: DualLanguageTextSchema })
  description: DualLanguageTextModel;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }],
  })
  admin_preferred_related_products: Array<ProductModel>;

  @Prop({ type: PropertiesSchema })
  properties: Array<PropertiesModel>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  last_update: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Admin' })
  updated_by: AdminModel;

  @Prop()
  is_draft: boolean;

  @Prop()
  is_published: boolean;
}
export type ProductDocument = HydratedDocument<ProductModel>;
export const ProductSchema = SchemaFactory.createForClass(ProductModel).set(
  'versionKey',
  false,
);
ProductSchema.plugin(paginate);
