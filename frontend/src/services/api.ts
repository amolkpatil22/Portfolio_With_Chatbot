const API_BASE = 'https://portfolio-with-chatbot-iwd0.onrender.com';

export interface Portfolio {
  _id: string;
  type: 'project' | 'education' | 'experience' | 'personal' | 'skill' | 'faq';
  title: string;
  content: string;
  metadata?: {
    tech_stack?: string[];
    role?: string;
    duration?: string;
    links?: { [key: string]: any };
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export const api = {
  getPortfolioByType: async (type: string): Promise<Portfolio[]> => {
    const response = await fetch(`${API_BASE}/portfolio/${type}`);
    if (!response.ok) throw new Error(`Failed to fetch ${type}`);
    return response.json();
  },

  getAllPortfolio: async (): Promise<Portfolio[]> => {
    const response = await fetch(`${API_BASE}/portfolio`);
    if (!response.ok) throw new Error('Failed to fetch portfolio');
    return response.json();
  },

  chat: async (message: string, history: any[] = []) => {
    const response = await fetch(`${API_BASE}/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) throw new Error('Chat failed');
    return response;
  }
};