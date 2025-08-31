import { Portfolio } from '../models/Portfolio';
import { ServiceManager } from '../services/ServiceManager';

export class PortfolioTools {
  static async searchPortfolio(query: string) {
    const pineconeService = ServiceManager.getPineconeService();
    const hits = await pineconeService.query(query, 2);
    const ids = hits.map((hit: any) => hit._id);
    const portfolios = await Portfolio.find({ _id: { $in: ids } }).lean();

    return hits.map((hit: any) => {
      const portfolio = portfolios.find((p: any) => p._id.toString() === hit._id);
      if (!portfolio) return "";

      let metadataText = "";
      if (portfolio.metadata) {
        metadataText = "\nMetadata:\n" +
          Object.entries(portfolio.metadata)
            .map(([key, value]) => `- ${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
            .join("\n");
      }

      return `${portfolio.type}: ${portfolio.title}\n${portfolio.content}${metadataText}`;
    }).filter(Boolean).join("\n\n");
  }

  static getToolDefinitions() {
    return [{
      name: "search_portfolio",
      description: "Search Amol's portfolio for information about projects, skills, experience, social media links or personal details",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query for portfolio information"
          }
        },
        required: ["query"]
      }
    }];
  }

  static async executeTool(toolName: string, args: any) {
    switch (toolName) {
      case 'search_portfolio':
        return await this.searchPortfolio(args.query);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
}