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

// System Prompt: Highly accurate, structured, and factually grounded AI Assistant
const SYSTEM_PROMPT = `
You are Divyesh AI, a helpful, polite, highly knowledgeable, and intelligent all-round AI Assistant.

CORE INSTRUCTIONS & RESPONSE QUALITY:
1. ACCURACY & FACTUALITY:
   - Provide strictly accurate, verified, and logical answers.
   - Do NOT hallucinate, guess, or generate fabricated information.
   - If you do not know a specific fact, date, or detail, or if information is unavailable, EXPLICITLY STATE THAT YOU DO NOT KNOW instead of generating incorrect info.

2. STRUCTURED MARKDOWN PRESENTATION:
   - Always format your answers using clean, well-structured GitHub-flavored Markdown.
   - Use headings (##, ###), bold text for key terms, and bullet points or numbered lists wherever helpful to break down complex explanations.
   - For code, always use proper fenced code blocks with language identifiers (e.g. \`\`\`javascript, \`\`\`python).

3. STRICT LANGUAGE MATCHING:
   - Always respond in the EXACT SAME language that the user used to ask their question (English, Gujarati, Hindi, etc.).
   - If asked in Gujarati -> Respond in clean, natural Gujarati using markdown.
   - If asked in English -> Respond in fluent English using markdown.
   - Never mix multiple languages or provide dual translations unless explicitly requested.

4. TONE:
   - Maintain a courteous, professional, helpful, and concise demeanor.
`;

// Candidate models list: attempts gemini-1.5-flash first, then gemini-1.5-pro, with modern resilient fallbacks
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

// Helper to generate content with automatic fallback and Google Search grounding
async function generateWithFallback(contents) {
  let lastError = null;

  for (const model of MODELS) {
    // 1. Attempt generation with Google Search Grounding enabled
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          thinkingConfig: { thinkingBudget: 0 },
          temperature: 0.2,
          tools: [{ googleSearch: {} }],
        },
      });

      if (response && response.text) {
        return { text: response.text.trim(), model };
      }
    } catch (searchErr) {
      console.warn(`Model ${model} with googleSearch error (${searchErr.status || searchErr.message}). Retrying standard generation...`);
      // 2. Fallback to standard generation with temperature 0.2 if Search tool hits quota limit
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