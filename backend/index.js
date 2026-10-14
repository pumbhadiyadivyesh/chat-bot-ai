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

// Company Knowledge Base (Sole Source of Truth)
const COMPANY_KNOWLEDGE_BASE = `
COMPANY PROFILE:
- Company Name: Divyesh AI Solutions (ChatBoat AI)
- Tagline: Next-Gen Conversational Intelligence for Modern Businesses
- Website: https://chat-bot-ai-uk7s.onrender.com

SERVICES OFFERED:
1. AI Chatbot Integration: Custom website & mobile AI customer support bots powered by modern LLMs.
2. Workflow Automation: Automated ticket routing, CRM syncing, and automated email follow-ups.
3. Multi-language Support: Real-time conversational AI in English, Gujarati, Hindi, and 50+ languages.
4. Custom AI Model Fine-tuning: Tailoring AI assistants with custom enterprise documentation and PDFs.

PRICING PLANS:
1. Starter Plan: $29/month - Up to 2,000 messages/month, 1 chatbot widget, standard support.
2. Growth Plan: $79/month - Up to 10,000 messages/month, 3 chatbot widgets, custom branding, priority support.
3. Enterprise Plan: $199/month - Unlimited messages, dedicated account manager, custom API integrations, 99.9% uptime SLA.
- Free Trial: 14-day full-feature free trial available, no credit card required.

OFFICE HOURS & SUPPORT:
- Business Hours: Monday to Friday, 9:00 AM to 6:00 PM IST (Indian Standard Time).
- Weekend Support: Emergency ticket support available on Saturday from 10:00 AM to 2:00 PM IST. Closed on Sundays.
- Email Support: support@divyeshai.com
- Phone / WhatsApp: +91 98765 43210
- Headquarters: Ahmedabad / Surat, Gujarat, India.

RETURN & REFUND POLICY:
- 30-day money-back guarantee if you are not fully satisfied with our services.
`;

// System Prompt with Strict Domain-Bound Constraints
const SYSTEM_PROMPT = `
You are Divyesh AI Solutions' dedicated customer support assistant.

==================================================
COMPANY KNOWLEDGE BASE:
${COMPANY_KNOWLEDGE_BASE}
==================================================

STRICT DOMAIN BOUNDARY & CONSTRAINTS (MANDATORY):
1. SOLE SOURCE OF TRUTH:
   - You MUST ONLY answer questions using the information provided inside COMPANY_KNOWLEDGE_BASE above.
   - Do NOT assume, invent, or extrapolate information that is not in the knowledge base.

2. STRICT REFUSAL POLICY (OUT OF SCOPE TOPICS):
   - You MUST NOT attempt to answer general knowledge questions, questions about politicians, public figures, celebrities, history, geography, science, math, or any unrelated topics outside our company services.
   - If a user asks ANY question not covered in COMPANY_KNOWLEDGE_BASE (such as "who is X", general trivia, world facts, or political questions), you MUST politely refuse.
   - Refusal message (translated naturally to the user's language):
     "I can only assist with questions related to our company services, pricing, office hours, and support. How may I help you with our services today?"

3. MULTI-LANGUAGE CAPABILITY:
   - Always detect and respond in the EXACT SAME language that the user asks in (English, Gujarati, Hindi, or Gujlish/Hinglish).
   - If refusing in Gujarati, say politely:
     "હું ફક્ત અમારી કંપનીની સેવાઓ, કિંમત (pricing), ઓફિસ સમય અને સપોર્ટ સંબંધિત પ્રશ્નોમાં જ મદદ કરી શકું છું. આજે હું અમારી સેવાઓ અંગે તમને કેવી રીતે મદદ કરી શકું?"
   - If refusing in Hindi, say politely:
     "मैं केवल हमारी कंपनी की सेवाओं, कीमतों, कार्यालय समय और सहायता से संबंधित प्रश्नों में ही मदद कर सकता हूँ। आज मैं हमारी सेवाओं के बारे में आपकी किस प्रकार सहायता कर सकता हूँ?"
   - NEVER combine multiple languages or provide dual translations unless explicitly asked.

4. SPEED & TONE:
   - Keep responses polite, professional, concise, and helpful.
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