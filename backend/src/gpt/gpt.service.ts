import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async *generateStreamResponse(userQuery: string, context: any[]) {
    const contextText = context.map(item => 
      `${item.portfolio?.type}: ${item.portfolio?.title}\n${item.portfolio?.content}`
    ).join('\n\n');

    const stream = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for Amol Patil answering questions about a portfolio. Use the provided context to answer questions accurately.Your response should not look like you are different entity than amol patil'
        },
        {
          role: 'user',
          content: `Context:\n${contextText}\n\nQuestion: ${userQuery}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }
}