import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio, PortfolioSchema } from './portfolio.schema';
import { PineconeService } from '../pinecone/pinecone.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PineconeService],
  exports: [PortfolioService],
})
export class PortfolioModule {}