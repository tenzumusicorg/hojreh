import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileModel, FileSchema } from 'src/domain/file/schema/file.schema';

@Schema({ _id: false })
export class ProductImageModel {
  @Prop({ type: FileSchema })
  url: FileModel;

  @Prop({ type: FileSchema })
  thumbnail: FileModel;

  @Prop()
  is_primary: boolean;
}
export const ProductImageSchema = SchemaFactory.createForClass(
  ProductImageModel,
).set('versionKey', false);
