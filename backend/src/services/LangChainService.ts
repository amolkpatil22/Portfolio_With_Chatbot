import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { Portfolio } from '../models/Portfolio';
import { PineconeService } from './PineconeService';

export class LangChainService {
  private llm: ChatOpenAI;
  private ragChain: RunnableSequence;

  constructor() {
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
          const pineconeService = new PineconeService();
          const hits = await pineconeService.query(input.question, 3);
          const ids = hits.map((hit: any) => hit.id);
          const portfolios = await Portfolio.find({ _id: { $in: ids } });
          
          return hits.map((hit: any) => {
            const portfolio = portfolios.find((p: any) => p._id.toString() === hit.id);
            return `${portfolio?.type}: ${portfolio?.title}\n${portfolio?.content}`;
          }).join('\n\n');
        },
        msgs: (input: { question: string, history?: any[] }) => {
          const messages: BaseMessage[] = [];
          if (input.history) {
            input.history.forEach((msg: any) => {
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