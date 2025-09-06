import { Portfolio } from '../models/Portfolio';
import { ServiceManager } from '../services/ServiceManager';

export class PortfolioTools {
  static async searchPortfolio(query: string, type?: string) {
    const pineconeService = ServiceManager.getPineconeService();

    // Use Pinecone metadata filtering if type is specified
    const hits = await pineconeService.query(query, 3, type);
    const ids = hits.map((hit: any) => hit._id);
    const portfolios = await Portfolio.find({ _id: { $in: ids } }).lean();

    return hits.map((hit: any) => {
      const portfolio = portfolios.find((p: any) => p._id.toString() === hit._id);
      if (!portfolio) return "";

      let metadataText = "";
      if (portfolio.metadata) {
        metadataText =
          "\nMetadata:\n" +
          Object.entries(portfolio.metadata)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return `- ${key}: ${value.join(", ")}`;
              } else if (typeof value === "object" && value !== null) {
                // Flatten nested objects instead of JSON.stringify
                return `- ${key}: ${Object.entries(value)
                  .map(([k, v]) => `${k}=${v}`)
                  .join(", ")}`;
              } else {
                return `- ${key}: ${value}`;
              }
            })
            .join("\n");
      }

      return `Type: ${portfolio.type}\nTitle: ${portfolio.title}\nContent: ${portfolio.content}${metadataText}`;
    }).filter(Boolean).join("\n\n");

  }

  static getToolDefinitions() {
    return [
      {
        name: "search_portfolio",
        description: "Search Amol's portfolio using vector similarity. Available types: project, experience, personal, skill, faq, education",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query for portfolio information"
            },
            type: {
              type: "string",
              description: "Optional: Filter by specific type using Pinecone metadata (project, experience, personal, skill, faq, education)",
              enum: ["project", "experience", "personal", "skills", "faq", "education"]
            }
          },
          required: ["query"]
        }
      }
    ];
  }

  static async executeTool(toolName: string, args: any) {
    switch (toolName) {
      case 'search_portfolio':
        return await this.searchPortfolio(args.query, args.type);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
}