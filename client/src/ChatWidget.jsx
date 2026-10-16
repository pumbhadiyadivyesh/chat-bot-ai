import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatBoatLogo from './ChatBoatLogo';

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

const MaximizeIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

const MinimizeIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h6v6" />
    <path d="M20 10h-6V4" />
    <path d="M14 10l7-7" />
    <path d="M10 14l-7 7" />
  </svg>
);

// 💻 Interactive Code Block with Copy Action
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      margin: '10px 0',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      backgroundColor: '#070a12',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '11px',
        color: '#94a3b8',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: copied ? '#34d399' : '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'color 0.15s ease',
          }}
        >
          {copied ? (
            <>
              <CheckIcon size={12} />
              <span style={{ color: '#34d399' }}>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div style={{ padding: '12px', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px', lineHeight: '1.6', color: '#e2e8f0' }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// 📖 Rich Markdown Renderer for Bot Responses
function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 style={{ fontSize: '18px', fontWeight: '800', margin: '14px 0 8px', color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '4px' }}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '12px 0 6px', color: '#f1f5f9' }}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ fontSize: '14.5px', fontWeight: '700', margin: '10px 0 4px', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '4px', height: '14px', borderRadius: '2px', backgroundColor: '#a855f7' }}></span>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 style={{ fontSize: '13.5px', fontWeight: '600', margin: '8px 0 4px', color: '#a78bfa' }}>
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p style={{ margin: '0 0 11px 0', lineHeight: '1.7', color: '#f1f5f9' }}>
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong style={{
            fontWeight: '700',
            color: '#ffffff',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            padding: '1px 5px',
            borderRadius: '4px',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.15)',
          }}>
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em style={{ fontStyle: 'italic', color: '#cbd5e1' }}>
            {children}
          </em>
        ),
        ul: ({ children }) => (
          <ul style={{ margin: '8px 0 12px 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol style={{ margin: '8px 0 12px 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li style={{ lineHeight: '1.7', margin: '3px 0', color: '#f1f5f9' }}>
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote style={{
            margin: '8px 0',
            borderLeft: '3px solid #8b5cf6',
            color: '#cbd5e1',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            padding: '8px 12px',
            borderRadius: '0 8px 8px 0',
          }}>
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div style={{ overflowX: 'auto', margin: '10px 0', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '8px 12px', textAlign: 'left', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {children}
          </td>
        ),
        code: ({ className, children }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match && !String(children).includes('\n');
          if (isInline) {
            return (
              <code style={{
                backgroundColor: 'rgba(99, 102, 241, 0.18)',
                color: '#c7d2fe',
                padding: '2px 6px',
                borderRadius: '5px',
                fontSize: '12.5px',
                fontFamily: 'ui-monospace, monospace',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}>
                {children}
              </code>
            );
          }
          return <CodeBlock language={match ? match[1] : ''} code={String(children).replace(/\n$/, '')} />;
        },
        pre: ({ children }) => <>{children}</>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#818cf8', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://chat-bot-ai-uk7s.onrender.com';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hello! 👋 I am ChatBoat AI Assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const widgetRef = useRef(null);

  // Auto-scroll smooth
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close when clicking outside the widget or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(e.target) &&
        !e.target.closest('[data-chat-trigger]')
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const messageText = input;
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    await handleDirectSend(messageText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
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

          <ChatBoatLogo size={32} />
        </button>
      )}

      {/* 💬 Ultra-Modern Chat Window */}
      {isOpen && (
        <div
          ref={widgetRef}
          className="chat-window-modal"
          style={{
            width: isExpanded ? '760px' : '390px',
            maxWidth: 'calc(100vw - 32px)',
            height: isExpanded ? '720px' : '590px',
            maxHeight: 'calc(100vh - 48px)',
            backgroundColor: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transition: 'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
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
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.45)',
              }}>
                <ChatBoatLogo size={24} />
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
                  boxShadow: '0 0 8px #10b981',
                }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.2px' }}>
                    ChatBoat AI
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '2px 7px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}>
                    Online
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  Instant Assistant • Always Active
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Expand/Collapse Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore size' : 'Expand window'}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: isExpanded ? '#c7d2fe' : '#94a3b8',
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
                  e.currentTarget.style.color = isExpanded ? '#c7d2fe' : '#94a3b8';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                {isExpanded ? <MinimizeIcon size={15} /> : <MaximizeIcon size={15} />}
              </button>

              {/* Clear conversation */}
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

              {/* Close */}
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
                      maxWidth: isUser ? '85%' : (isExpanded ? '92%' : '88%'),
                      padding: isUser ? '12px 16px' : '14px 18px',
                      borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      wordBreak: 'break-word',
                      background: isUser
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        : msg.isError
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isUser ? '#fff' : msg.isError ? '#fca5a5' : '#f1f5f9',
                      border: isUser
                        ? 'none'
                        : msg.isError
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: isUser
                        ? '0 4px 14px rgba(99, 102, 241, 0.35)'
                        : '0 4px 16px rgba(0, 0, 0, 0.25)',
                      position: 'relative',
                    }}
                  >
                    {isUser ? (
                      <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                    ) : msg.isError ? (
                      <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                    ) : (
                      <MarkdownRenderer content={msg.text} />
                    )}
                  </div>

                  {/* Subtext: Time, Model & Copy Action */}
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

                  {/* ⚡ Modern Horizontal Suggested Prompts (Rendered beneath the welcome message on a fresh chat) */}
                  {!isUser && index === 0 && messages.length === 1 && (
                    <div style={{
                      marginTop: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      animation: 'slideUpFade 0.3s ease-out',
                      maxWidth: isExpanded ? '92%' : '100%',
                    }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        paddingLeft: '2px',
                      }}>
                        <span>✨</span> Suggested Prompts:
                      </span>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '7px',
                      }}>
                        {[
                          { icon: '⚡', label: 'What can you do for me?', prompt: 'What can you do for me?' },
                          { icon: '🌐', label: 'ગુજરાતીમાં વાત કરી શકો છો?', prompt: 'તમે ગુજરાતીમાં વાત કરી શકો છો?' },
                          { icon: '💡', label: 'Draft a professional email', prompt: 'Draft a polite follow-up email to a business client.' },
                          { icon: '🧠', label: 'How does your memory work?', prompt: 'How does your multi-turn conversation memory work?' },
                        ].map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDirectSend(chip.prompt)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 13px',
                              backgroundColor: 'rgba(99, 102, 241, 0.08)',
                              border: '1px solid rgba(99, 102, 241, 0.22)',
                              borderRadius: '20px',
                              color: '#c7d2fe',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                              textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.22)';
                              e.currentTarget.style.borderColor = '#818cf8';
                              e.currentTarget.style.color = '#ffffff';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
                              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.22)';
                              e.currentTarget.style.color = '#c7d2fe';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            <span>{chip.icon}</span>
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
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

          {/* ✍️ Ultra-Modern Input Bar Footer */}
          <div
            style={{
              padding: '12px 16px 10px',
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <form
              onSubmit={sendMessage}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '6px 8px 6px 14px',
                transition: 'all 0.2s ease',
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = '#818cf8';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(99, 102, 241, 0.25)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask in Gujarati, English, or Hindi..."
                disabled={loading}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  color: '#f8fafc',
                  fontSize: '13.5px',
                  fontFamily: 'inherit',
                  maxHeight: '110px',
                  minHeight: '26px',
                  lineHeight: '22px',
                  padding: '4px 0',
                  overflowY: input.length > 80 || input.includes('\n') ? 'auto' : 'hidden',
                  boxSizing: 'border-box',
                }}
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                title="Send message (Enter)"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: input.trim() && !loading
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'rgba(255, 255, 255, 0.06)',
                  color: input.trim() && !loading ? '#fff' : '#64748b',
                  border: 'none',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: input.trim() && !loading ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <SendIcon size={16} />
              </button>
            </form>

            {/* Subtle Helper Tip underneath */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 4px',
              fontSize: '11px',
              color: '#64748b',
            }}>
              <span>Enter ↵ to send • Shift+Enter for new line</span>
              <span style={{ color: '#818cf8', fontWeight: '500' }}>⚡ ChatBoat AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}