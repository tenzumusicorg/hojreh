import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RatingModel {
  @Prop()
  stars: number;

  @Prop()
  score: number;

  @Prop()
  total_ratings: number;
}
export const RatingSchema = SchemaFactory.createForClass(RatingModel).set(
  'versionKey',
  false,
);
