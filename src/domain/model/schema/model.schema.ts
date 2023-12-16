import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { BrandModel } from 'src/domain/brand/schema/brand.schema';

@Schema({ id: true })
export class ModelModel {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ModelModel.name })
  brand: BrandModel;
}

export type ModelDocument = HydratedDocument<ModelModel>;
export const ModelSchema = SchemaFactory.createForClass(ModelModel).set(
  'versionKey',
  false,
);

ModelSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ModelSchema.plugin(paginate);
