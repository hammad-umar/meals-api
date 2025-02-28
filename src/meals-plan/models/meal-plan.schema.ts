import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class MealPlanDocument extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'MemberDocument', required: true })
  member: Types.ObjectId;

  @Prop({ type: [String] })
  meals: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MealPlanSchema = SchemaFactory.createForClass(MealPlanDocument);
