import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class TestimonialDocument extends AbstractDocument {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  projectDescription: string;

  @Prop({ required: true })
  ethnicity: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TestimonialSchema =
  SchemaFactory.createForClass(TestimonialDocument);
