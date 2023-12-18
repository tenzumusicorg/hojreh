import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ProductModel } from './product.schema';
import { UserModel } from 'src/domain/user/schema/user.schema';
import { CommentStatusEnum } from '../constant/comment-status.enum';

@Schema()
export class ProductCommentModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product_id: ProductModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user_id: UserModel;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  status: CommentStatusEnum;

  @Prop()
  likes: number;

  @Prop()
  dislikes: number;

  @Prop()
  rating_stars: number;

  @Prop()
  rating_score: number;

  @Prop({
    default: new Date(),
  })
  date: Date;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_deleted: Boolean;
}
export type ProductDocument = HydratedDocument<ProductCommentModel>;
export const ProductCommentSchema = SchemaFactory.createForClass(
  ProductCommentModel,
).set('versionKey', false);
ProductCommentSchema.plugin(paginate);
