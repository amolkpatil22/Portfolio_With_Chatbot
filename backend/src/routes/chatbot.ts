import { Router } from 'express';
import { ServiceManager } from '../services/ServiceManager';

const router = Router();

router.post('/chat', async (req, res) => {
  const { message, history } = req.body;
  
  if (!message || message.length > 500) {
    return res.status(400).json({ error: 'Message required and must be under 500 characters' });
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const agenticService = ServiceManager.getAgenticLangChainService();
    
    // Stream agentic response
    for await (const chunk of agenticService.chatStream(message, history)) {
      res.write(chunk);
    }
    res.end();
  } catch (error: any) {
    console.error('❌ Chat error:', error.message);
    res.status(500).end(`Error: ${error.message}`);
  }
});

export { router as chatbotRoutes };