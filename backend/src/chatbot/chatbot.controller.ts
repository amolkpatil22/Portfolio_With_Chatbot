import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatDto } from './dto/chat.dto';
import type { Response } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  async chat(@Body() chatDto: ChatDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      for await (const chunk of this.chatbotService.chatStream(chatDto.message, chatDto.history)) {
        res.write(chunk);
      }
      res.end();
    } catch (error) {
      res.status(500).end('Error generating response');
    }
  }
}