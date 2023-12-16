import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { RolesEnum } from 'src/domain/admin/constant/admin-role.enum';

export enum UserStatusEnum {
  active = 'active',
  deactivated = 'deactivated',
}

@Schema({ id: true })
export class UserModel {
  @Prop({
    required: true,
    type: String,
  })
  phone_number: string;

  @Prop({
    required: true,
    type: String,
  })
  country_code: string;

  @Prop({
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  email_verified: boolean;

  @Prop({
    type: String,
  })
  first_name: string;

  @Prop({
    type: String,
  })
  last_name: string;

  @Prop({
    type: String,
  })
  avatar_image: string;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  signup_complete: boolean;

  @Prop({
    type: [String],
    required: false,
    default: [RolesEnum.User],
  })
  roles: RolesEnum[];

  @Prop({
    type: Date,
    default: new Date(),
    required: true,
  })
  register_date: Date;

  @Prop({
    type: String,
  })
  national_code: string;

  @Prop({
    required: true,
    default: UserStatusEnum.active,
  })
  status: UserStatusEnum;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel).set(
  'versionKey',
  false,
);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.plugin(paginate);
