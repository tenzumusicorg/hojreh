import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema()
export class PolicyContentModel {
  @Prop({
    required: true,
    type: DualLanguageTextSchema,
  })
  content: DualLanguageTextModel;
}

export type PolicyContentDocument = HydratedDocument<PolicyContentModel>;
export const PolicyContentSchema = SchemaFactory.createForClass(
  PolicyContentModel,
).set('versionKey', false);
