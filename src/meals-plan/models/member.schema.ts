import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false, timestamps: false })
export class MemberDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  dietaryRestrictions: string;
}

export const MemberSchema = SchemaFactory.createForClass(MemberDocument);
