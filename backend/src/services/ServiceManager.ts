import { PineconeService } from './PineconeService';
import { AgenticLangChainService } from './AgenticLangChainService';

class ServiceManager {
  private static pineconeInstance: PineconeService;
  private static agenticLangChainInstance: AgenticLangChainService;

  static getPineconeService(): PineconeService {
    if (!this.pineconeInstance) {
      this.pineconeInstance = new PineconeService();
    }
    return this.pineconeInstance;
  }

  static getAgenticLangChainService(): AgenticLangChainService {
    if (!this.agenticLangChainInstance) {
      this.agenticLangChainInstance = new AgenticLangChainService();
    }
    return this.agenticLangChainInstance;
  }
}

export { ServiceManager };