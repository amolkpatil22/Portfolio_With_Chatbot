import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { LangChainService } from '../langchain/langchain.service';

@Module({
  imports: [PortfolioModule],
  controllers: [ChatbotController],
  providers: [ChatbotService, LangChainService],
})
export class ChatbotModule {}