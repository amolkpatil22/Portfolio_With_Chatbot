import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService implements OnModuleInit {
  private pinecone: Pinecone;
  private index: any;
  private indexName = 'portfolio-index';

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || "",
    });
  }

  async onModuleInit() {
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
        console.log('Index already exists, using existing index');
      } else {
        throw error;
      }
    }
    this.index = this.pinecone.index(this.indexName);
  }

  async upsertRecords(id: string, text: string, metadata: any) {
    await this.index.upsertRecords([{
      id,
      chunk_text: text,
      // metadata,
    }]);
  }

  async query(text: string, topK: number = 5) {
    const result = await this.index.query({
      text,
      topK,
      includeMetadata: true,
    });
    return result.matches;
  }

  async deleteVector(id: string) {
    await this.index.deleteOne(id);
  }
}