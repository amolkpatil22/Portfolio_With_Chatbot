import { PineconeService } from './PineconeService';
import { LangChainService } from './LangChainService';

class ServiceManager {
  private static pineconeInstance: PineconeService;
  private static langChainInstance: LangChainService;

  static getPineconeService(): PineconeService {
    if (!this.pineconeInstance) {
      this.pineconeInstance = new PineconeService();
    }
    return this.pineconeInstance;
  }

  static getLangChainService(): LangChainService {
    if (!this.langChainInstance) {
      this.langChainInstance = new LangChainService();
    }
    return this.langChainInstance;
  }
}

export { ServiceManager };