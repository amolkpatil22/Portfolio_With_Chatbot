import { Injectable } from '@nestjs/common';
import { LangChainService } from '../langchain/langchain.service';

@Injectable()
export class ChatbotService {
  constructor(private langChainService: LangChainService) {}

  async *chatStream(query: string, history?: any[]) {
    for await (const chunk of this.langChainService.chatStream(query, history)) {
      yield chunk;
    }
  }
}