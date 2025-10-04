import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3008;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Proxy endpoint for OpenRouter API
app.post('/api/analyze-waste', async (req, res) => {
  try {
    console.log('\n🚀 ===== NEW REQUEST RECEIVED =====');
    console.log('⏰ Time:', new Date().toLocaleTimeString());
    console.log('🎯 Model:', req.body.model);
    console.log('📊 Messages:', req.body.messages?.length, 'messages');
    console.log('🌡️ Temperature:', req.body.temperature);
    console.log('🔄 Proxying to OpenRouter API...');
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3006',
          'X-Title': 'Mars Waste Recycling System'
        }
      }
    );

    console.log('✅ OpenRouter API response received');
    console.log('📈 Tokens used:', response.data.usage);
    console.log('🎉 Sending response to frontend');
    console.log('===================================\n');
    res.json(response.data);
  } catch (error) {
    console.error('❌ OpenRouter API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'API request failed',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Use http://localhost:${PORT}/api/analyze-waste for waste analysis`);
});
