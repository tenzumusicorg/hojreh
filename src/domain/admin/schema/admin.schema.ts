import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { RolesEnum } from '../../auth/constant/role.enum';
import { AdminStatusEnum } from '../constant/admin-status.enum';

@Schema({ id: true })
export class AdminModel {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string = '';

  @Prop({
    required: true,
    type: String,
  })
  password: string = '';

  @Prop({
    type: String,
    required: false,
    default: RolesEnum.Admin,
  })
  role: RolesEnum;

  @Prop({
    required: true,
    type: String,
  })
  first_name: string = '';

  @Prop({
    required: true,
    type: String,
  })
  last_name: string = '';

  @Prop({
    required: true,
    type: String,
    default: AdminStatusEnum.ACTIVE,
  })
  status: AdminStatusEnum = AdminStatusEnum.ACTIVE;

  @Prop({
    required: true,
    type: Date,
    default: new Date(),
  })
  register_date: Date;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  is_deleted: Boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Admin' })
  created_by: AdminModel;
}

export type AdminDocument = HydratedDocument<AdminModel>;
export const AdminSchema = SchemaFactory.createForClass(AdminModel).set(
  'versionKey',
  false,
);

AdminSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
AdminSchema.plugin(paginate);
