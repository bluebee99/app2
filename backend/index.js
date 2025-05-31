const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { OpenAI } = require('openai');

dotenv.config();

const fs = require('fs');
// console.log('env file exists:', fs.existsSync('.env'));

// console.log('CLIENT_ID:', process.env.CLIENT_ID);
// console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET ? 'set' : 'NOT SET');
// console.log('TENANT_ID:', process.env.TENANT_ID);

const app = express();
app.use(cors());
app.use(express.json());

// MSAL設定
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};
const cca = new ConfidentialClientApplication(msalConfig);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// メール一覧取得API
app.post('/api/mail', async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) return res.status(400).json({ error: 'No access token' });

  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?$top=10&$select=receivedDateTime,from,subject',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    res.json(response.data.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OpenAIチャットAPI
app.post('/api/openai-chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // o4-mini相当
      messages,
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    console.error('OpenAI API error:', e); // ここで詳細なエラーを出力
    res.status(500).json({ error: e.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});