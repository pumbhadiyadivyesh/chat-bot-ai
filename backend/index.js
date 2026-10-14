const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

// System Prompt: All-round, highly accurate AI Assistant
const SYSTEM_PROMPT = `
You are Divyesh AI, a helpful, polite, highly knowledgeable, and intelligent all-round AI Assistant.

CORE GUIDELINES:
1. CAPABILITIES & SCOPE:
   - You can assist with all topics: general knowledge, coding, programming, mathematics, logic, science, history, writing, business, analysis, and everyday queries.
   - Provide clear, well-structured, insightful, and practical answers.

2. HIGH ACCURACY & LOGIC:
   - Be strictly logical, accurate, and fact-based in your explanations.
   - Avoid hallucinating or inventing false information.
   - If you are unsure about a specific factual claim, date, or detail, clearly state your uncertainty rather than guessing.

3. STRICT LANGUAGE MATCHING:
   - Always detect and respond in the EXACT SAME language that the user asks their question in.
   - If asked in English -> Reply in clear, natural English.
   - If asked in Gujarati -> Reply in polite, natural Gujarati.
   - If asked in Hindi -> Reply in polite, clear Hindi.
   - If asked in Gujlish or Hinglish (Latin script) -> Reply in that same conversational style.
   - Never mix multiple languages or provide dual translations unless explicitly asked.

4. TONE & PRESENTATION:
   - Be courteous, professional, concise, and helpful.
   - Use clean formatting, bullet points, and code blocks when appropriate.
`;

// Candidate models list: attempts gemini-1.5-flash first, then gemini-1.5-pro, with modern resilient fallbacks
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

// Helper to generate content with automatic fallback
async function generateWithFallback(contents) {
  let lastError = null;

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          thinkingConfig: { thinkingBudget: 0 },
          temperature: 0.2,
        },
      });

      if (response && response.text) {
        return { text: response.text.trim(), model };
      }
    } catch (err) {
      console.warn(`Model ${model} error (${err.status || err.message}). Switching to fallback...`);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini candidate models failed.');
}

// Health check route
app.get('/', (req, res) => {
  res.send('Gemini Chatbot Server is running successfully!');
});

// Chat API Route supporting conversation memory
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message is required.',
      });
    }

    const trimmedMessage = message.trim();

    // 1. Format the history array: map roles to 'user' and 'model', wrap contents in parts: [{ text }]
    const formattedHistory = (Array.isArray(history) ? history : [])
      .filter((item) => item && (item.text || item.content))
      .map((item) => {
        const text = item.text || item.content || '';
        const role = (item.role === 'bot' || item.role === 'model' || item.role === 'assistant')
          ? 'model'
          : 'user';
        return {
          role,
          parts: [{ text }],
        };
      });

    // 2. Append the new user message at the end of contents array
    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: trimmedMessage }],
      },
    ];

    // 3. Pass formatted contents along with SYSTEM_PROMPT to Gemini model
    const { text, model } = await generateWithFallback(contents);

    return res.status(200).json({
      success: true,
      reply: text,
      model,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error. Please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});