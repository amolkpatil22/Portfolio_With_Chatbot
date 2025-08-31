import { Router } from 'express';
import { Portfolio } from '../models/Portfolio';
import { ServiceManager } from '../services/ServiceManager';

const router = Router();

// Create portfolio
router.post('/', async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    const saved = await portfolio.save();

    const pineconeService = ServiceManager.getPineconeService();
    await pineconeService.upsertRecords((saved as any)._id.toString(),
      `${saved.type},${saved.title},${saved.content}`,
      {
        type: saved.type,
        title: saved.title,
      });

    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get by type
router.get('/:type', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ type: req.params.type }).sort({ "metadata.index": 1 })
    res.json(portfolios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as portfolioRoutes };