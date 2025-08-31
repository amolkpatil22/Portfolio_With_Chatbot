import { PineconeService } from './PineconeService';
import { LangChainService } from './LangChainService';
import { AgenticLangChainService } from './AgenticLangChainService';

class ServiceManager {
  private static pineconeInstance: PineconeService;
  private static langChainInstance: LangChainService;
  private static agenticLangChainInstance: AgenticLangChainService;

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

  static getAgenticLangChainService(): AgenticLangChainService {
    if (!this.agenticLangChainInstance) {
      this.agenticLangChainInstance = new AgenticLangChainService();
    }
    return this.agenticLangChainInstance;
  }
}

export { ServiceManager };