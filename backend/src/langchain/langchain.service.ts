import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class LangChainService {
  private llm: ChatOpenAI;
  private ragChain: RunnableSequence;

  constructor(private portfolioService: PortfolioService) {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 300,
      streaming: true,
    });

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", "You are Amol Patil answering questions about your portfolio. Use the provided context to answer accurately. If someone asks irrelevant things, use humour in the reply."],
      ["system", "Context: {context}"],
      new MessagesPlaceholder("msgs")
    ]);

    this.ragChain = RunnableSequence.from([
      {
        context: async (input: { question: string, history?: any[] }) => {
          const results = await this.portfolioService.vectorSearch(input.question, 3);
          return results.map(item =>
            `${item.portfolio?.type}: ${item.portfolio?.title}\n${item.portfolio?.content}`
          ).join('\n\n');
        },
        msgs: (input: { question: string, history?: any[] }) => {
          const messages: BaseMessage[] = [];
          if (input.history) {
            input.history.forEach(msg => {
              if (msg.role === 'user') {
                messages.push(new HumanMessage(msg.content));
              } else {
                messages.push(new AIMessage(msg.content));
              }
            });
          }
          messages.push(new HumanMessage(input.question));
          return messages;
        }
      },
      promptTemplate,
      this.llm,
      new StringOutputParser(),
    ]);
  }

  async *chatStream(query: string, history?: any[]) {
    const stream = await this.ragChain.stream({ question: query, history });

    for await (const chunk of stream) {
      yield chunk;
    }
  }
}