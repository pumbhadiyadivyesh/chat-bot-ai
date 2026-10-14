import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// 🎨 Premium Inlined SVG Icons (Zero dependencies, guaranteed 0 build errors)
const MessageIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const CloseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const SparklesIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>
);

const TrashIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CopyIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hello! 👋 I am Divyesh AI Assistant, powered by Google Gemini. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll smooth
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Listen to external custom events (from landing page prompt chips)
  useEffect(() => {
    const handleExternalTrigger = (e) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        handleDirectSend(e.detail.prompt);
      }
    };
    window.addEventListener('open-ai-chat', handleExternalTrigger);
    return () => window.removeEventListener('open-ai-chat', handleExternalTrigger);
  }, [messages, loading]);

  const handleDirectSend = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    const userMessage = textToSend.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const validHistory = messages.filter(
      (msg) => msg && (msg.role === 'user' || msg.role === 'bot') && msg.text && msg.text.trim()
    );

    setMessages((prev) => [...prev, { role: 'user', text: userMessage, time: currentTime }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage,
        history: validHistory,
      });

      if (res.data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: res.data.reply,
            model: res.data.model,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const serverError = error.response?.data?.error;
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: serverError || 'Sorry, unable to connect to the server. Please ensure backend is running.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const messageText = input;
    setInput('');
    await handleDirectSend(messageText);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'bot',
        text: 'Chat history cleared. How else can I assist you?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, fontFamily: 'var(--font-main, sans-serif)' }}>
      
      {/* 🔘 Floating Launcher Button with Glowing Pulse */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5), 0 0 20px rgba(168, 85, 247, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.65), 0 0 25px rgba(168, 85, 247, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5), 0 0 20px rgba(168, 85, 247, 0.4)';
          }}
        >
          {/* Active Status Pulse Dot */}
          <span style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2.5px solid #090d16',
            boxShadow: '0 0 10px #10b981',
          }} />

          <MessageIcon size={28} />
        </button>
      )}

      {/* 💬 Ultra-Modern Chat Window */}
      {isOpen && (
        <div
          style={{
            width: '390px',
            maxWidth: 'calc(100vw - 32px)',
            height: '600px',
            maxHeight: 'calc(100vh - 48px)',
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* 🌟 Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Bot Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                position: 'relative',
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
              }}>
                <SparklesIcon size={20} />
                {/* Green Status dot */}
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  border: '2px solid #0f172a',
                }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc' }}>
                    Divyesh AI
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    backgroundColor: 'rgba(99, 102, 241, 0.3)',
                    color: '#c7d2fe',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                  }}>
                    Turbo
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Always ready to help • Gemini AI
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <TrashIcon size={15} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94a3b8',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <CloseIcon size={18} />
              </button>
            </div>
          </div>

          {/* 💬 Chat Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%), #0b0f19',
            }}
          >
            {/* Quick Starters (Only when conversation is fresh) */}
            {messages.length === 1 && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '16px',
                padding: '14px',
                marginTop: '4px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  Suggested Prompts
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    '👋 What can you do for me?',
                    '🌐 તમે ગુજરાતીમાં જવાબ આપી શકો છો?',
                    '⚡ How does your conversation memory work?',
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDirectSend(suggestion.replace(/^[^\w\s]+\s*/, ''))}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(99, 102, 241, 0.07)',
                        border: '1px solid rgba(99, 102, 241, 0.18)',
                        borderRadius: '10px',
                        color: '#c7d2fe',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                        e.currentTarget.style.borderColor = '#818cf8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.07)';
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.18)';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Render Messages */}
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '100%',
                    animation: 'slideUpFade 0.25s ease-out',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '14px',
                      lineHeight: '1.55',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      background: isUser
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        : msg.isError
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(255, 255, 255, 0.06)',
                      color: isUser ? '#fff' : msg.isError ? '#fca5a5' : '#f1f5f9',
                      border: isUser
                        ? 'none'
                        : msg.isError
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.09)',
                      boxShadow: isUser
                        ? '0 4px 14px rgba(99, 102, 241, 0.35)'
                        : '0 4px 12px rgba(0, 0, 0, 0.2)',
                      position: 'relative',
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Subtext: Time & Copy Action */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '4px',
                    padding: '0 4px',
                  }}>
                    {msg.time && (
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {msg.time}
                      </span>
                    )}

                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        title="Copy message"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedIndex === index ? '#34d399' : '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '11px',
                          padding: '2px 4px',
                          borderRadius: '4px',
                        }}
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckIcon size={12} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <CopyIcon size={12} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                <div style={{
                  padding: '10px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#818cf8', display: 'inline-block', animation: 'typingBounce 1.2s infinite ease-in-out' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7', display: 'inline-block', animation: 'typingBounce 1.2s infinite ease-in-out 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ec4899', display: 'inline-block', animation: 'typingBounce 1.2s infinite ease-in-out 0.4s' }} />
                  <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '6px' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ✍️ Input Bar Footer */}
          <form
            onSubmit={sendMessage}
            style={{
              padding: '14px 16px',
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything in any language..."
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '11px 16px',
                color: '#f8fafc',
                fontSize: '13.5px',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#818cf8';
                e.target.style.boxShadow = '0 0 12px rgba(99, 102, 241, 0.25)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              title="Send message"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: input.trim() && !loading ? '#fff' : '#64748b',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: input.trim() && !loading ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <SendIcon size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}