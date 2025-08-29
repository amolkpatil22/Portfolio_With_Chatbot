import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true, enum: ['project', 'experience', 'personal', 'skill', 'faq'] })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Object })
  metadata: {
    tech_stack?: string[];
    role?: string;
    duration?: string;
    links?: object;
    [key: string]: any;
  };
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);