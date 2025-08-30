import { Pinecone } from '@pinecone-database/pinecone';

export class PineconeService {
  private pinecone: Pinecone;
  private index: any;
  private indexName = 'portfolio-index';
  private initPromise: Promise<void>;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });
    this.initPromise = this.init();
  }

  private async init() {
    try {
      await this.pinecone.createIndexForModel({
        name: this.indexName,
        cloud: 'aws',
        region: 'us-east-1',
        embed: {
          model: 'llama-text-embed-v2',
          fieldMap: { text: 'chunk_text' },
        },
        waitUntilReady: true,
      });
    } catch (error: any) {
      if (error.message?.includes('ALREADY_EXISTS')) {
        console.log('Index already exists');
      }
    }
    this.index = this.pinecone.index(this.indexName);
  }

  async upsertRecords(id: string, text: string, metadata: any) {
    await this.initPromise;
    await this.index.upsertRecords([{
      id,
      chunk_text: text,
      // metadata,
    }]);
  }

  async query(text: string, topK: number = 5) {
    await this.initPromise;
    const result = await this.index.searchRecords({
      query: {
        topK,
        inputs: { text }
      }
    });
    return result.result.hits;
  }
}