import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { GptService } from '../gpt/gpt.service';

@Module({
  imports: [PortfolioModule],
  controllers: [ChatbotController],
  providers: [ChatbotService, GptService],
})
export class ChatbotModule {}