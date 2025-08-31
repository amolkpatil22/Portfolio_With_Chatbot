import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { Portfolio } from '../models/Portfolio';
import { ServiceManager } from './ServiceManager';

export class LangChainService {
  private llm: ChatOpenAI;
  private ragChain: RunnableSequence;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 100,
      streaming: true,
    });

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", "You are Amol Patil's chatbot for portfolio. ***Don't entertain out of scope questions. Add new liner if required. *****links must follow this format: [Link Text](https://full-url.com)"],
      ["system", "Context: {context}"],
      new MessagesPlaceholder("msgs")
    ]);

    this.ragChain = RunnableSequence.from([
      {
        context: async (input: { question: string, history?: any[] }) => {
          const pineconeService = ServiceManager.getPineconeService();
          const hits = await pineconeService.query(input.question, 2);
          const ids = hits.map((hit: any) => hit._id);
          const portfolios = await Portfolio.find({ _id: { $in: ids } }).lean();

          const cont = hits.map((hit: any) => {
            const portfolio = portfolios.find((p: any) => p._id.toString() === hit._id);
            if (!portfolio) return "";

            let metadataText = "";
            if (portfolio.metadata) {
              metadataText =
                "\nMetadata:\n" +
                Object.entries(portfolio.metadata)
                  .map(([key, value]) => {
                    if (typeof value === "object" && value !== null) {
                      return `- ${key}: ${JSON.stringify(value)}`;
                    }
                    return `- ${key}: ${value}`;
                  })
                  .join("\n");
            }

            return `${portfolio.type}: ${portfolio.title}\n${portfolio.content}${metadataText}`;
          }).filter(Boolean).join("\n\n");

          return cont
        },
        msgs: (input: { question: string, history?: any[] }) => {
          const messages: BaseMessage[] = [];
          if (input.history) {
            const recentHistory = input.history.slice(-10);
            recentHistory.forEach((msg: any) => {
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