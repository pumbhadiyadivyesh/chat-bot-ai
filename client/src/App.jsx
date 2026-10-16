import React, { useState } from 'react';
import ChatWidget from './ChatWidget';
import ChatBoatLogo from './ChatBoatLogo';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'gu', label: 'ગુજરાતી' },
  { id: 'hi', label: 'हिन्दी' },
];

const SECTION_TEXTS = {
  gu: {
    superpowers: '🚀 Real-World Superpowers',
    heading1: 'તમારા દરેક કાર્ય માટે',
    headingHighlight: 'શક્તિશાળી AI ક્ષમતાઓ',
    desc: 'કોઈપણ ફેક કે પ્રી-રેકોર્ડેડ ચેટ વગર — નીચે આપેલા કોઈપણ ક્ષેત્રનો પ્રશ્ન પસંદ કરો અને સીધા જ વાસ્તવિક લાઈવ ChatBoat AI સાથે અજમાવી જુઓ.',
    sampleQueryLabel: '💡 ઉદાહરણ સવાલ (SAMPLE QUERY)',
    btnText: 'Try Prompt in Live Chat 💬',
  },
  en: {
    superpowers: '🚀 Real-World Superpowers',
    heading1: 'Supercharge Your Workflow With',
    headingHighlight: 'Intelligent AI Capabilities',
    desc: 'No fake or pre-recorded chat bubbles — pick any real use-case prompt below and test it live with ChatBoat AI.',
    sampleQueryLabel: '💡 SAMPLE QUERY TO ASK',
    btnText: 'Try Prompt in Live Chat 💬',
  },
  hi: {
    superpowers: '🚀 Real-World Superpowers',
    heading1: 'आपके हर काम के लिए',
    headingHighlight: 'शक्तिशाली AI क्षमताएं',
    desc: 'बिना किसी नकली या प्री-रिकॉर्डेड चैट के — नीचे दिए गए किसी भी क्षेत्र का सवाल चुनें और सीधे लाइव ChatBoat AI से पूछें।',
    sampleQueryLabel: '💡 उदाहरण सवाल (SAMPLE QUERY)',
    btnText: 'लाइव चैट में पूछें 💬',
  },
};

const CAPABILITIES = [
  {
    id: 'multilingual',
    icon: '🌐',
    badgeColor: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.12)',
    badgeBorder: 'rgba(168, 85, 247, 0.3)',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    badge: {
      gu: '100% Native Language',
      en: 'Multilingual Fluency',
      hi: 'मातृभाषा संवाद',
    },
    title: {
      gu: 'માતૃભાષામાં સહજ સંવાદ',
      en: 'Natural Multilingual Chat',
      hi: 'मातृभाषा में सहज संवाद',
    },
    subtitle: {
      gu: 'Native Gujarati, Hindi & English',
      en: 'Fluent in Gujarati, Hindi & English',
      hi: 'गुजराती, हिन्दी एवं अंग्रेजी में वार्तालाप',
    },
    desc: {
      gu: 'કોઈપણ કૃત્રિમ કે અજુગતા અનુવાદ વગર, કુદરતી ગુજરાતી ભાષામાં સચોટ અને વિવેકપૂર્ણ જવાબો મેળવો.',
      en: 'Communicate naturally without awkward machine translations. Fluent and grammatically precise across all Indian languages.',
      hi: 'बिना किसी अटपटे अनुवाद के, स्वाभाविक और व्याकरण की शुद्धता के साथ सटीक जवाब प्राप्त करें।',
    },
    sampleQuery: {
      gu: 'નમસ્તે! ડિજિટલ માર્કેટિંગ શરૂ કરવા માટે ૩ સૌથી સરળ સ્ટેપ્સ સમજાવો.',
      en: 'Explain the 3 most crucial steps to start digital marketing for beginners.',
      hi: 'नमस्ते! डिजिटल मार्केटिंग शुरू करने के लिए 3 सबसे आसान स्टेप्स समझाइए।',
    },
    promptToTry: {
      gu: 'નમસ્તે! શું તમે મને ડિજિટલ માર્કેટિંગ શરૂ કરવા માટે ૩ સૌથી મહત્વના સરળ સ્ટેપ્સ ગુજરાતીમાં સમજાવી શકો?',
      en: 'Hello! Can you explain the 3 most crucial steps to start digital marketing in simple terms?',
      hi: 'नमस्ते! क्या आप मुझे डिजिटल मार्केटिंग शुरू करने के 3 सबसे महत्वपूर्ण स्टेप्स आसानी से समझा सकते हैं?',
    },
  },
  {
    id: 'memory',
    icon: '🧠',
    badgeColor: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'rgba(56, 189, 248, 0.3)',
    accentGlow: 'rgba(56, 189, 248, 0.25)',
    badge: {
      gu: 'Context-Aware AI',
      en: 'Stateful Memory',
      hi: 'कन्टेक्स्ट आधारित AI',
    },
    title: {
      gu: 'સ્માર્ટ યાદશક્તિ & કન્ટેક્સ્ટ',
      en: 'Smart Budget & Context Memory',
      hi: 'स्मार्ट याददाश्त और संदर्भ',
    },
    subtitle: {
      gu: 'Multi-Turn Budget & Preference Recall',
      en: 'Multi-Turn Conversation Memory',
      hi: 'पूर्व बातचीत और बजट का सटीक स्मरण',
    },
    desc: {
      gu: 'તમારું બજેટ, પસંદગી અને અગાઉની વાતચીત યાદ રાખીને આગળના સવાલોના સાતત્યપૂર્ણ જવાબો આપે છે.',
      en: 'Remembers past context, shopping budgets, and preferences across the entire conversation.',
      hi: 'आपके बजट, प्राथमिकताओं और पिछली बातचीत को याद रखकर सिलसिलेवार सटीक सुझाव देता है।',
    },
    sampleQuery: {
      gu: 'મારું લેપટોપ ખરીદવાનું બજેટ ₹૫૦,૦૦૦ છે, બેસ્ટ ઓપ્શન્સ સજેસ્ટ કરો.',
      en: 'My laptop shopping budget is ₹50,000. Recommend the best 3 options.',
      hi: 'मेरा लैपटॉप खरीदने का बजट ₹50,000 है, बेस्ट 3 ऑप्शन्स सुझाइए।',
    },
    promptToTry: {
      gu: 'મારું લેપટોપ ખરીદવાનું બજેટ ₹૫૦,૦૦૦ છે, તે માટે શ્રેષ્ઠ ૩ ઓપ્શન્સ સજેસ્ટ કરો.',
      en: 'My laptop shopping budget is ₹50,000. Recommend the best 3 options.',
      hi: 'मेरा लैपटॉप खरीदने का बजट ₹50,000 है, कृपया बेस्ट 3 ऑप्शन्स सुझाइए।',
    },
  },
  {
    id: 'support',
    icon: '💼',
    badgeColor: '#34d399',
    badgeBg: 'rgba(52, 211, 153, 0.12)',
    badgeBorder: 'rgba(52, 211, 153, 0.3)',
    accentGlow: 'rgba(52, 211, 153, 0.25)',
    badge: {
      gu: '24/7 Automation',
      en: '24/7 Customer Support',
      hi: '24/7 ऑटोमेशन',
    },
    title: {
      gu: 'ગ્રાહક સેવા & બિઝનેસ સપોર્ટ',
      en: 'Customer Support & Business Help',
      hi: 'ग्राहक सेवा एवं व्यापार सहायता',
    },
    subtitle: {
      gu: 'Automated 24/7 Store & Client Help',
      en: 'E-commerce, Retail & FAQ Handling',
      hi: 'ई-कॉमर्स, रिटर्न पॉलिसी और 24/7 सपोर्ट',
    },
    desc: {
      gu: 'ઈ-કોમર્સ, રિટેલ કે સર્વિસ બિઝનેસ માટે રિટર્ન પોલિસી, FAQ અને ગ્રાહક સહાય તાત્કાલિક તૈયાર કરો.',
      en: 'Instant return policies, customer FAQ handling, and service automation for e-commerce and retail.',
      hi: 'ई-कॉमर्स या सर्विस बिजनेस के लिए रिटर्न पॉलिसी, ग्राहक सहायता और त्वरित उत्तर तैयार करें।',
    },
    sampleQuery: {
      gu: 'અમારા ઓનલાઇન સ્ટોર માટે સરળ રિટર્ન અને રિફંડ પોલિસી બનાવો.',
      en: 'Draft a friendly 7-day return and refund policy for an online store.',
      hi: 'हमारे ऑनलाइन स्टोर के लिए आसान रिटर्न और रिफंड पॉलिसी बनाएं।',
    },
    promptToTry: {
      gu: 'અમારા ઈ-કોમર્સ સ્ટોર માટે ગ્રાહકને પ્રોડક્ટ રીટર્ન અને રિફંડ પોલિસી સરળ શબ્દોમાં સમજાવો.',
      en: 'Draft a clear, friendly 7-day product return and refund policy for our e-commerce store.',
      hi: 'हमारे ई-कॉमर्स स्टोर के लिए ग्राहकों हेतु आसान रिटर्न और रिफंड पॉलिसी समझाइए।',
    },
  },
  {
    id: 'content',
    icon: '📝',
    badgeColor: '#f472b6',
    badgeBg: 'rgba(244, 114, 182, 0.12)',
    badgeBorder: 'rgba(244, 114, 182, 0.3)',
    accentGlow: 'rgba(244, 114, 182, 0.25)',
    badge: {
      gu: 'Creative Engine',
      en: 'Copywriting & Content',
      hi: 'क्रिएटिव राइटिंग',
    },
    title: {
      gu: 'ક્રિએટિવ રાઇટિંગ & સોશિયલ મીડિયા',
      en: 'Creative Writing & Social Media',
      hi: 'क्रिएटिव राइटिंग और सोशल मीडिया',
    },
    subtitle: {
      gu: 'Marketing Copy, Captions & Emails',
      en: 'High-Converting Copy & Viral Captions',
      hi: 'मार्केटिंग कंटेंट, कैप्शन्स एवं ईमेल ड्राफ्ट',
    },
    desc: {
      gu: 'ઇન્સ્ટાગ્રામ કેપ્શન્સ, ઈમેલ ન્યૂઝલેટર, જાહેરાતો અને બિઝનેસ પ્રપોઝલ ક્ષણવારમાં તૈયાર કરો.',
      en: 'Generate catchy Instagram captions, persuasive email newsletters, and business proposals in seconds.',
      hi: 'इंस्टाग्राम कैप्शन्स, बिजनेस ईमेल, विज्ञापन और आकर्षक कंटेंट सेकंडों में लिखें।',
    },
    sampleQuery: {
      gu: 'તહેવારની ઓફર માટે આકર્ષક ઇન્સ્ટાગ્રામ કેપ્શન અને હેશટેગ લખો.',
      en: 'Write a catchy festive sale Instagram caption with trending hashtags.',
      hi: 'त्योहार के डिस्काउंट ऑफर के लिए आकर्षक इंस्टाग्राम कैप्शन और हैशटैग लिखें।',
    },
    promptToTry: {
      gu: 'દિવાળી સ્પેશિયલ ડિસ્કાઉન્ટ ઓફર માટે આકર્ષક ઇન્સ્ટાગ્રામ કેપ્શન અને હેશટેગ લખો.',
      en: 'Write an engaging festive sale Instagram caption with emojis and high-reach hashtags.',
      hi: 'त्योहारों के विशेष डिस्काउंट ऑफर के लिए आकर्षक इंस्टाग्राम कैप्शन और हैशटैग लिखिए।',
    },
  },
  {
    id: 'learning',
    icon: '⚡',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'rgba(251, 191, 36, 0.3)',
    accentGlow: 'rgba(251, 191, 36, 0.25)',
    badge: {
      gu: 'Instant Explanations',
      en: 'Deep Learning & Research',
      hi: 'तुरंत सटीक समाधान',
    },
    title: {
      gu: 'જ્ઞાન, શિક્ષણ & સવાલ-જવાબ',
      en: 'Learning, Research & Explanations',
      hi: 'ज्ञान, शिक्षा और समस्या निवारण',
    },
    subtitle: {
      gu: 'Deep Explanations & Problem Solving',
      en: 'Complex Topics Made Simple',
      hi: 'जटिल विषयों की आसान व्याख्या',
    },
    desc: {
      gu: 'વિદ્યાર્થીઓ અને પ્રોફેશનલ્સ માટે કોઈપણ અઘરો વિષય, ટેકનોલોજી કે સામાન્ય જ્ઞાન સરળ ભાષામાં સમજો.',
      en: 'Break down complex concepts, science, code, and academic subjects into easy-to-understand steps.',
      hi: 'विद्यार्थियों और प्रोफेशनल्स के लिए किसी भी कठिन विषय और टेक्नोलॉजी को आसान भाषा में समझें।',
    },
    sampleQuery: {
      gu: 'AI સામાન્ય માણસના રોજિંદા જીવનમાં ક્યાં ઉપયોગી થઈ રહ્યું છે?',
      en: 'How is Artificial Intelligence (AI) helping people in everyday life?',
      hi: 'AI आम इंसान के दैनिक जीवन में कैसे उपयोगी साबित हो रहा है?',
    },
    promptToTry: {
      gu: 'આર્ટિફિશિયલ ઇન્ટેલિજન્સ (AI) સામાન્ય માણસના રોજિંદા જીવનમાં ક્યાં ઉપયોગી થઈ રહ્યું છે?',
      en: 'How is Artificial Intelligence (AI) impacting everyday life for normal people? Explain simply.',
      hi: 'आर्टिफिशियल इंटेलिजेंस (AI) आम आदमी के रोजमर्रा के जीवन में कहाँ उपयोगी साबित हो रहा है?',
    },
  },
  {
    id: 'productivity',
    icon: '⏱️',
    badgeColor: '#818cf8',
    badgeBg: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: 'rgba(129, 140, 248, 0.3)',
    accentGlow: 'rgba(129, 140, 248, 0.25)',
    badge: {
      gu: 'Sub-Second Latency',
      en: 'Ultra Fast Productivity',
      hi: 'सुपरफास्ट प्रोडक्टिविटी',
    },
    title: {
      gu: 'પ્રોડક્ટિવિટી & ટાઈમ મેનેજમેન્ટ',
      en: 'Productivity & Daily Planning',
      hi: 'समय प्रबंधन और उत्पादकता',
    },
    subtitle: {
      gu: 'Daily Planning, Summaries & Strategy',
      en: 'Instant Summaries & Task Prioritization',
      hi: 'दैनिक योजना, समरी और कार्य प्रबंधन',
    },
    desc: {
      gu: 'મોટા આર્ટિકલના સમરી, દૈનિક સમય આયોજન અને નિર્ણય લેવાની પ્રક્રિયાને અતિ ઝડપી બનાવો.',
      en: 'Summarize long documents, organize daily schedules, and make fast, informed decisions with sub-second AI.',
      hi: 'बड़े आर्टिकल्स की समरी, दैनिक शेड्यूल और महत्वपूर्ण निर्णय लेने की गति को कई गुना बढ़ाएं।',
    },
    sampleQuery: {
      gu: 'રોજિંદા કામમાં ફોકસ અને પ્રોડક્ટિવિટી વધારવા માટે ૩ વ્યવહારુ ટિપ્સ આપો.',
      en: 'Give 3 actionable tips to improve daily focus and avoid procrastination.',
      hi: 'दैनिक कार्य में फोकस और प्रोडक्टिविटी बढ़ाने के लिए 3 व्यावहारिक टिप्स दीजिए।',
    },
    promptToTry: {
      gu: 'રોજિંદા કામમાં સમય બચાવવા અને ફોકસ વધારવા માટે ૩ શ્રેષ્ઠ વ્યવહારુ ટિપ્સ આપો.',
      en: 'Give me 3 practical, high-impact strategies to boost productivity and manage time better.',
      hi: 'दैनिक कार्यों में समय बचाने और प्रोडक्टिविटी बढ़ाने के लिए 3 बेहतरीन टिप्स दें।',
    },
  },
];

export default function App() {
  const [selectedLang, setSelectedLang] = useState('en');
  const currentText = SECTION_TEXTS[selectedLang] || SECTION_TEXTS.en;

  const openChatWithPrompt = (promptText) => {
    window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { prompt: promptText } }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', overflowX: 'hidden' }}>
      
      {/* 🌟 Ambient Background Glowing Orbs */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.15) 45%, transparent 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute',
        top: '600px',
        right: '-100px',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, transparent 60%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* 🧭 Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(9, 13, 22, 0.75)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#fff', cursor: 'pointer' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.2) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4), inset 0 0 12px rgba(168, 85, 247, 0.2)',
            }}>
              <ChatBoatLogo size={26} />
            </div>
            <div>
              <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                ChatBoat<span style={{ color: '#a855f7' }}>.AI</span>
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.target.style.color = '#fff'}
               onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
              Features
            </a>
            <a href="#capabilities" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.target.style.color = '#fff'}
               onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
              Capabilities
            </a>

            <button
              data-chat-trigger="true"
              onClick={() => openChatWithPrompt('Hello! How can you assist me today?')}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Open Live Assistant 💬
            </button>
          </nav>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '14px' }}>⚡</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#c7d2fe', letterSpacing: '0.2px' }}>
              High-Velocity AI with Multi-Turn Memory & Auto-Fallback
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: '52px',
            fontWeight: '800',
            lineHeight: '1.15',
            letterSpacing: '-1.5px',
            marginBottom: '20px',
            color: '#f8fafc',
          }}>
            Intelligent Conversational AI <br />
            <span style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              That Truly Understands You.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#94a3b8',
            maxWidth: '680px',
            margin: '0 auto 36px',
          }}>
            Experience instant, context-aware responses powered by cutting-edge AI architecture.
            Full conversation memory, strict native language detection, and resilient 0-downtime architecture.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              data-chat-trigger="true"
              onClick={() => openChatWithPrompt('Tell me about your core features and how you help users!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.45)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.45)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Try Interactive Assistant
            </button>

            <a
              href="#features"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#e2e8f0',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              Explore Capabilities ↓
            </a>
          </div>

          {/* Quick interactive test chips */}
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 20px',
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
          }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
              Click any question to ask live:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {[
                { label: '👋 "How are you today?"', text: 'How are you today?' },
                { label: '🌐 "ગુજરાતીમાં વાત કરી શકો છો?"', text: 'તમે ગુજરાતીમાં વાત કરી શકો છો?' },
                { label: '⚡ "What is your response latency?"', text: 'What is your response latency and model architecture?' },
                { label: '🧠 "Remember: My budget is ₹50,000"', text: 'Remember that my shopping budget is ₹50,000 for a laptop.' },
              ].map((chip, idx) => (
                <button
                  data-chat-trigger="true"
                  key={idx}
                  onClick={() => openChatWithPrompt(chip.text)}
                  style={{
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    color: '#c7d2fe',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.borderColor = '#818cf8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 💎 4 Value Pillar Feature Cards */}
        <section id="features" style={{ marginTop: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '10px' }}>
              Engineered for Speed, Context & Reliability
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>
              Everything built directly into your full-stack chat ecosystem.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                icon: '⚡',
                title: 'Sub-Second Latency',
                desc: 'Thinking latency budget tuned to 0 for instant, snappy conversation delivery within ~1 second.',
                gradient: 'rgba(99, 102, 241, 0.15)',
                border: 'rgba(99, 102, 241, 0.3)',
              },
              {
                icon: '🧠',
                title: 'Stateful Context Memory',
                desc: 'Maintains entire multi-turn conversation history. Recalls names, details, and previous topics seamlessly.',
                gradient: 'rgba(168, 85, 247, 0.15)',
                border: 'rgba(168, 85, 247, 0.3)',
              },
              {
                icon: '🌐',
                title: 'Strict Language Matching',
                desc: 'Automatically matches the exact language of the user (Gujarati, Hindi, English) without awkward dual translations.',
                gradient: 'rgba(236, 72, 153, 0.15)',
                border: 'rgba(236, 72, 153, 0.3)',
              },
              {
                icon: '🛡️',
                title: 'Resilient Auto-Failover',
                desc: 'Built-in multi-model fallback chain prevents 503 high-demand errors, guaranteeing high service availability.',
                gradient: 'rgba(16, 185, 129, 0.15)',
                border: 'rgba(16, 185, 129, 0.3)',
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.7)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '28px 24px',
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = card.border;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${card.gradient}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: card.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '18px',
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '8px', color: '#f8fafc' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.55' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 Real-World Capabilities Grid (Option 1 with Language Selector) */}
        <section id="capabilities" style={{ marginTop: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              fontSize: '12.5px',
              color: '#c7d2fe',
              fontWeight: '600',
              marginBottom: '14px',
            }}>
              <span>{currentText.superpowers}</span>
            </div>
            <h2 style={{ fontSize: '34px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '12px', color: '#f8fafc' }}>
              {currentText.heading1} <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{currentText.headingHighlight}</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '680px', margin: '0 auto 28px' }}>
              {currentText.desc}
            </p>

            {/* 🌐 Interactive Language Switcher Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45), 0 0 25px rgba(99, 102, 241, 0.15)',
            }}>
              <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: '600', padding: '0 8px 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>🌐</span> Language:
              </span>
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: isSelected ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'transparent',
                      border: isSelected ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid transparent',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      fontSize: '13.5px',
                      fontWeight: isSelected ? '700' : '500',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginTop: '20px',
          }}>
            {CAPABILITIES.map((cap) => {
              const cardBadge = cap.badge[selectedLang] || cap.badge.en || cap.badge.gu;
              const cardTitle = cap.title[selectedLang] || cap.title.en || cap.title.gu;
              const cardSubtitle = cap.subtitle[selectedLang] || cap.subtitle.en || cap.subtitle.gu;
              const cardDesc = cap.desc[selectedLang] || cap.desc.en || cap.desc.gu;
              const cardSampleQuery = cap.sampleQuery[selectedLang] || cap.sampleQuery.en || cap.sampleQuery.gu;
              const cardPromptToTry = cap.promptToTry[selectedLang] || cap.promptToTry.en || cap.promptToTry.gu;

              return (
                <div
                  key={cap.id}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cap.badgeBorder;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 14px 35px ${cap.accentGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    {/* Top Bar with Icon & Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: cap.badgeBg,
                        border: `1px solid ${cap.badgeBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                      }}>
                        {cap.icon}
                      </div>
                      <span style={{
                        fontSize: '11.5px',
                        fontWeight: '700',
                        color: cap.badgeColor,
                        backgroundColor: cap.badgeBg,
                        border: `1px solid ${cap.badgeBorder}`,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.3px',
                      }}>
                        {cardBadge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#f8fafc', marginBottom: '4px' }}>
                      {cardTitle}
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: '500', marginBottom: '14px' }}>
                      {cardSubtitle}
                    </div>

                    {/* Description */}
                    <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {cardDesc}
                    </p>
                  </div>

                  <div>
                    {/* Prompt Box */}
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px dashed rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      marginBottom: '18px',
                    }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700', marginBottom: '6px' }}>
                        {currentText.sampleQueryLabel}
                      </div>
                      <div style={{ fontSize: '13px', color: '#e2e8f0', fontStyle: 'italic', lineHeight: '1.5' }}>
                        "{cardSampleQuery}"
                      </div>
                    </div>

                    {/* Interactive Button to Live Chat */}
                    <button
                      data-chat-trigger="true"
                      onClick={() => openChatWithPrompt(cardPromptToTry)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.35)',
                        color: '#ffffff',
                        fontSize: '13.5px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>{currentText.btnText}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* 🦶 Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '30px 24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '13px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            © 2026 ChatBoat.AI — Next-Gen Conversational Intelligence. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '12.5px', fontWeight: '500' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            All Systems Operational
          </div>
        </div>
      </footer>

      {/* 💬 The Ultra-Modern AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}