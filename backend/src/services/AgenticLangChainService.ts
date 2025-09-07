import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { HumanMessage, AIMessage, BaseMessage, SystemMessage } from '@langchain/core/messages';
import { PortfolioTools } from '../tools/PortfolioTools';

export class AgenticLangChainService {
  private llm: ChatOpenAI;
  private promptTemplate: ChatPromptTemplate;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 150,
      streaming: true,
    });

    this.promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system", "You are Amol Patils AI assistant for portfolio queries. Rules: 1) Responses must be short, clear, and human readable. 2) Use new lines for multiple points. 3) ***Format links as [Text](https://full-url.com). 4) Nothing is private, share every information like mobile. 5) Do not perform or accept tasks. 6) answer only what is asked, dont give unnecessary information",
      ],
      new MessagesPlaceholder("msgs")
    ]);
  }

  async *chatStream(query: string, history?: any[]) {
    try {
      // Build messages
      const messages: BaseMessage[] = [];
      if (history) {
        history.slice(-10).forEach((msg: any) => {
          if (msg.role === 'user') {
            messages.push(new HumanMessage(msg.content));
          } else {
            messages.push(new AIMessage(msg.content));
          }
        });
      }
      messages.push(new HumanMessage(query));

      // @ts-ignore - Using bind() without function_call to let GPT decide
      const llmWithTools = this.llm.bind({
        functions: PortfolioTools.getToolDefinitions()
      });

      // First call - let GPT decide if it needs to search
      const chain = this.promptTemplate.pipe(llmWithTools);
      const response = await chain.invoke({ msgs: messages });

      // Check for function calls (both old and new API)
      const functionCall = response.additional_kwargs?.function_call;
      const toolCalls = response.tool_calls;

      if (functionCall) {
        // Handle old API
        const args = JSON.parse(functionCall.arguments);
        const toolResult = await PortfolioTools.executeTool(functionCall.name, args);

        // Create new messages with better context formatting
        const newMessages: BaseMessage[] = [...messages];
        let contextForAI = toolResult.trim() !== "" ? `Based on this portfolio information => ${toolResult}..Answer the user's question naturally and concisely` : `No data found. Ask customer to rephrase question`
        newMessages.push(new HumanMessage(contextForAI));

        const finalChain = this.promptTemplate.pipe(this.llm).pipe(new StringOutputParser());
        const stream = await finalChain.stream({ msgs: newMessages });

        for await (const chunk of stream) {
          yield chunk;
        }
      } else if (toolCalls && toolCalls.length > 0) {
        // Handle new API
        const toolCall = toolCalls[0];
        const toolResult = await PortfolioTools.executeTool(toolCall.name, toolCall.args);

        // Create new messages with better context formatting
        const newMessages: BaseMessage[] = [...messages];
        newMessages.push(new HumanMessage(`Based on this portfolio information: ${toolResult}\n\nAnswer the user's question naturally and concisely as Amol Patil.`));

        const finalChain = this.promptTemplate.pipe(this.llm).pipe(new StringOutputParser());
        const stream = await finalChain.stream({ msgs: newMessages });

        for await (const chunk of stream) {
          yield chunk;
        }
      } else {
        // No search needed, stream the direct response
        yield response.content;
      }
    } catch (error: any) {
      console.error('❌ AgenticLangChain error:', error.message);
      yield `Sorry, I'm experiencing technical difficulties. Please try again.`;
    }
  }
}