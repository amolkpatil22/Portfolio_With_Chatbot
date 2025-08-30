import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { portfolioRoutes } from './routes/portfolio';
import { chatbotRoutes } from './routes/chatbot';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Memory logging
const logMemory = (label: string) => {
  const usage = process.memoryUsage();
  console.log(`${label}: RSS ${Math.round(usage.rss / 1024 / 1024)}MB, Heap ${Math.round(usage.heapUsed / 1024 / 1024)}MB`);
};

logMemory('🚀 Initial');

// Database connection
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('✅ MongoDB connected');
    logMemory('📱 After MongoDB');
  })
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/portfolio', portfolioRoutes);
app.use('/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API running', memory: process.memoryUsage() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  logMemory('✅ Server started');
});