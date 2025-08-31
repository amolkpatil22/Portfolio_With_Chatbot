import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  type: 'project' | 'experience' | 'personal' | 'skill' | 'faq' | 'about me';
  title: string;
  content: string;
  metadata?: {
    tech_stack?: string[];
    role?: string;
    duration?: string;
    links?: object;
    [key: string]: any;
  };
  semanticSearchKeys: string[]
}

const PortfolioSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  metadata: { type: Object },
  semanticSearchKeys: { type: [String], required: true }
}, { timestamps: true });

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);