import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { UserModel } from './user.schema';

@Schema({ id: true })
export class UserAddressModel {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user_id: UserModel;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  postal_address: string;

  @Prop({
    type: String,
  })
  no: string;

  @Prop({
    type: String,
  })
  floor: string;

  @Prop({
    type: String,
  })
  postal_code: string;

  @Prop({
    type: String,
  })
  lat: string;

  @Prop({
    type: String,
  })
  lon: string;
}

export type UserAddressDocument = HydratedDocument<UserAddressModel>;

export const UserAddressSchema = SchemaFactory.createForClass(
  UserAddressModel,
).set('versionKey', false);

UserAddressSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserAddressSchema.plugin(paginate);
