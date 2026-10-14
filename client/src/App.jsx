import React, { useState } from 'react';
import ChatWidget from './ChatWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState('react');

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', cursor: 'pointer' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 3.3 2 6.1 4.9 7.3L8 22l4.8-2.4c.4.1.8.1 1.2.1a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                <circle cx="9" cy="10" r="1" fill="#fff" />
                <circle cx="15" cy="10" r="1" fill="#fff" />
              </svg>
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
            <a href="#integration" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.target.style.color = '#fff'}
               onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
              Integration
            </a>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '12px',
              color: '#34d399',
              fontWeight: '600'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
              Gemini 3.1 Ready
            </div>
            <button
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
            Experience instant, context-aware responses powered by Google Gemini.
            Full conversation memory, strict native language detection, and resilient 0-downtime architecture.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
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
                { label: '🧠 "Remember: My company is Acme Corp"', text: 'Remember that my company name is Acme Corp.' },
              ].map((chip, idx) => (
                <button
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

        {/* 💻 Code Integration Preview Section */}
        <section id="integration" style={{ marginTop: '90px' }}>
          <div style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}>
            {/* Window Top bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                <span style={{ marginLeft: '12px', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>
                  Full-Stack Architecture Preview
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('react')}
                  style={{
                    backgroundColor: activeTab === 'react' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                    color: activeTab === 'react' ? '#c7d2fe' : '#64748b',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  React Frontend
                </button>
                <button
                  onClick={() => setActiveTab('backend')}
                  style={{
                    backgroundColor: activeTab === 'backend' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                    color: activeTab === 'backend' ? '#c7d2fe' : '#64748b',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Express API Route
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div style={{ padding: '24px', overflowX: 'auto', backgroundColor: '#070a11', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.7', color: '#cbd5e1' }}>
              {activeTab === 'react' ? (
                <pre style={{ margin: 0 }}>
                  <span style={{ color: '#a855f7' }}>const</span> res = <span style={{ color: '#a855f7' }}>await</span> axios.post(<span style={{ color: '#22c55e' }}>`$&#123;API_BASE_URL&#125;/api/chat`</span>, &#123;<br />
                  &nbsp;&nbsp;message: userMessage,<br />
                  &nbsp;&nbsp;<span style={{ color: '#60a5fa' }}>history</span>: validHistory.filter(m =&gt; m.role === <span style={{ color: '#22c55e' }}>'user'</span> || m.role === <span style={{ color: '#22c55e' }}>'bot'</span>)<br />
                  &#125;);<br />
                  <span style={{ color: '#a855f7' }}>if</span> (res.data.success) &#123;<br />
                  &nbsp;&nbsp;setMessages(prev =&gt; [...prev, &#123; role: <span style={{ color: '#22c55e' }}>'bot'</span>, text: res.data.reply &#125;]);<br />
                  &#125;
                </pre>
              ) : (
                <pre style={{ margin: 0 }}>
                  <span style={{ color: '#64748b' }}>// Express Route with Gemini Memory & Fallback</span><br />
                  app.post(<span style={{ color: '#22c55e' }}>'/api/chat'</span>, <span style={{ color: '#a855f7' }}>async</span> (req, res) =&gt; &#123;<br />
                  &nbsp;&nbsp;<span style={{ color: '#a855f7' }}>const</span> &#123; message, history &#125; = req.body || &#123;&#125;;<br />
                  &nbsp;&nbsp;<span style={{ color: '#a855f7' }}>const</span> contents = [...formatHistory(history), &#123; role: <span style={{ color: '#22c55e' }}>'user'</span>, parts: [&#123; text: message &#125;] &#125;];<br />
                  &nbsp;&nbsp;<span style={{ color: '#a855f7' }}>const</span> &#123; text, model &#125; = <span style={{ color: '#a855f7' }}>await</span> generateWithFallback(contents);<br />
                  &nbsp;&nbsp;<span style={{ color: '#a855f7' }}>return</span> res.json(&#123; success: <span style={{ color: '#38bdf8' }}>true</span>, reply: text, model &#125;);<br />
                  &#125;);
                </pre>
              )}
            </div>
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
            © 2026 ChatBoat.AI — Powered by Google Gemini 3.1 & Node.js
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#34d399' }}>● 100% Operational</span>
            <span>Render Backend</span>
            <span>Vercel Frontend</span>
          </div>
        </div>
      </footer>

      {/* 💬 The Ultra-Modern AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}