import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DualLanguageTextModel,
  DualLanguageTextSchema,
} from 'src/domain/content/schema/dual-language.schema';

@Schema({ _id: false })
export class PropertyItemModel {
  @Prop()
  prop: string;

  @Prop()
  value: string;
}
export const PropertyItemSchema = SchemaFactory.createForClass(
  PropertyItemModel,
).set('versionKey', false);

@Schema({ _id: false })
export class PropertiesItemDualLanguageModel {
  @Prop({ type: PropertyItemSchema })
  fa: PropertyItemModel;

  @Prop()
  en: PropertyItemModel;
}
export const PropertiesItemDualLanguageSchema = SchemaFactory.createForClass(
  PropertyItemModel,
).set('versionKey', false);

@Schema({ _id: false })
export class PropertiesModel {
  @Prop({ type: DualLanguageTextSchema })
  title: DualLanguageTextModel;

  @Prop()
  icon: string;

  @Prop({ type: [PropertiesItemDualLanguageSchema] })
  items: Array<PropertiesItemDualLanguageModel>;
}
export const PropertiesSchema = SchemaFactory.createForClass(
  PropertiesModel,
).set('versionKey', false);
