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

// System Prompt: Highly accurate, transparent, factually verified AI Assistant
const SYSTEM_PROMPT = `
You are Divyesh AI, a helpful, polite, highly knowledgeable, and intelligent all-round AI Assistant.

CORE INSTRUCTIONS & FACTUAL RIGOR:
1. FACT-CHECKING & SEARCH VERIFICATION:
   - Always fact-check using Google Search.
   - If a person, company, or entity is obscure, unverified, or cannot be corroborated, state clearly that you cannot find official records for them instead of making assumptions or guessing.
   - Include references, citations, or sources wherever available.

2. ACCURACY & ZERO SPECULATION:
   - Strive for 100% deterministic, accurate, and factually verifiable statements.
   - Do NOT speculate, hallucinate, or fabricate details.
   - If you do not know a specific fact, date, or detail, or if reliable information is unavailable, explicitly state that you do not know.

3. STRUCTURED MARKDOWN PRESENTATION:
   - Always format answers using clean, well-structured GitHub-flavored Markdown.
   - Use headings (##, ###), bold text for key concepts, and bullet points or numbered lists to ensure maximum readability and clarity.
   - For code, always use proper fenced code blocks with language identifiers (e.g. \`\`\`javascript, \`\`\`python).

4. STRICT LANGUAGE MATCHING:
   - Always respond in the EXACT SAME language that the user used to ask their question (English, Gujarati, Hindi, etc.).
   - If asked in Gujarati -> Reply in clear, natural Gujarati using markdown.
   - If asked in English -> Reply in fluent English using markdown.
   - Never mix multiple languages or provide dual translations unless explicitly requested.

5. TONE:
   - Maintain a courteous, professional, transparent, and concise demeanor.
`;

// Candidate models list: attempts gemini-1.5-flash first, then gemini-1.5-pro, with modern resilient fallbacks
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

// Helper to generate content with automatic fallback across models and search tools
async function generateWithFallback(contents) {
  let lastError = null;

  // Search config with strict deterministic temperature (0.1)
  const searchConfig = {
    systemInstruction: SYSTEM_PROMPT,
    thinkingConfig: { thinkingBudget: 0 },
    temperature: 0.1,
    tools: [{ googleSearch: {} }],
  };

  const standardConfig = {
    systemInstruction: SYSTEM_PROMPT,
    thinkingConfig: { thinkingBudget: 0 },
    temperature: 0.1,
  };

  for (const model of MODELS) {
    // 1. Attempt generation with Google Search Grounding enabled on the model
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: searchConfig,
      });

      if (response && response.text) {
        return { text: response.text.trim(), model };
      }
    } catch (searchErr) {
      console.warn(`Model ${model} with search failed (${searchErr.status || searchErr.message}). Checking next steps...`);
      lastError = searchErr;

      // 2. If failure is a tool quota limitation (429 specifically on googleSearch), retry standard generation on same model
      if (searchErr.status === 429 || searchErr.message?.includes('quota') || searchErr.message?.includes('tools')) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: standardConfig,
          });

          if (response && response.text) {
            return { text: response.text.trim(), model };
          }
        } catch (stdErr) {
          console.warn(`Model ${model} standard generation also failed (${stdErr.status || stdErr.message}). Falling back to next model...`);
          lastError = stdErr;
        }
      }
      // Otherwise proceed to fallback model (e.g. gemini-1.5-flash -> gemini-1.5-pro -> modern flash)
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