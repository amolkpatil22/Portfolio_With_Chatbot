import { Injectable } from '@nestjs/common';
import { PortfolioService } from '../portfolio/portfolio.service';
import { GptService } from '../gpt/gpt.service';

@Injectable()
export class ChatbotService {
  constructor(
    private portfolioService: PortfolioService,
    private gptService: GptService,
  ) {}

  async *chatStream(query: string) {
    const searchResults = await this.portfolioService.vectorSearch(query, 3);
    
    for await (const chunk of this.gptService.generateStreamResponse(query, searchResults)) {
      yield chunk;
    }
  }
}