import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: true, id: true })
export class FileModel {
  @Prop()
  url: string;

  @Prop()
  key: string;

  @Prop()
  size: string;

  @Prop()
  mim_type: string;
}

export type FileDocument = HydratedDocument<FileModel>;

export const FileSchema = SchemaFactory.createForClass(File).set(
  'versionKey',
  false,
);

FileSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
