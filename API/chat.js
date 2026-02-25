// api/chat.js
// Vercel serverless function — proxies Claude API securely
// Your API key stays hidden on Vercel's servers, never exposed to visitors

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Allow requests from your own site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { messages, system } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,  // ← set in Vercel dashboard
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // fast + affordable for chat
        max_tokens: 350,
        system,
        messages
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Claude API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
