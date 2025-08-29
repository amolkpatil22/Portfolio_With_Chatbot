import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './portfolio.schema';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PineconeService } from '../pinecone/pinecone.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
    private pineconeService: PineconeService,
  ) { }

  async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const createdPortfolio = new this.portfolioModel(createPortfolioDto);
    const saved = await createdPortfolio.save();

    await this.pineconeService.upsertRecords((saved as any)?._id?.toString(),
      `${saved.type},${saved.title},${saved.content}`,
      {
        type: saved.type,
        title: saved.title,
      });

    return saved;
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto): Promise<Portfolio | null> {
    const updated = await this.portfolioModel.findByIdAndUpdate(id, updatePortfolioDto, { new: true }).exec();

    if (updated && updatePortfolioDto.content) {
      await this.pineconeService.upsertRecords(id, updated.content, {
        type: updated.type,
        title: updated.title,
        metadata: updated.metadata,
      });
    }

    return updated;
  }

  async findByType(type: string): Promise<Portfolio[]> {
    return this.portfolioModel.find({ type }).exec();
  }

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioModel.find().exec();
  }

  async vectorSearch(query: string, topK: number = 5) {
    const matches = await this.pineconeService.query(query, topK);

    const ids = matches.map(match => match.id);
    const portfolios = await this.portfolioModel.find({ _id: { $in: ids } }).exec();

    return matches.map(match => ({
      score: match.score,
      portfolio: portfolios.find((p: any) => p._id.toString() === match.id)
    }));
  }
}