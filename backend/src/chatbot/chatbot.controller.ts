import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import type { Response } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  async chat(@Body('message') message: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      for await (const chunk of this.chatbotService.chatStream(message)) {
        res.write(chunk);
      }
      res.end();
    } catch (error) {
      console.log("🚀 ~ ChatbotController ~ chat ~ error:", error)
      res.status(500).end('Error generating response');
    }
  }
}