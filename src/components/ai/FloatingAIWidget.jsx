import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight, RotateCcw, Calculator, CheckCircle2 } from 'lucide-react';

function formatInline(str) {
  if (!str) return null;
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#FFFFFF', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderFormattedMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const cleanLine = line.trim();
    if (!cleanLine) {
      return <div key={idx} style={{ height: '6px' }} />;
    }

    if (cleanLine.startsWith('###')) {
      const headingText = cleanLine.replace(/^###\s*/, '');
      return (
        <div key={idx} style={{ fontWeight: 700, fontSize: '0.94rem', color: '#FFFFFF', marginTop: '6px', marginBottom: '4px' }}>
          {formatInline(headingText)}
        </div>
      );
    }

    if (cleanLine.startsWith('•') || cleanLine.startsWith('-') || /^\d+\./.test(cleanLine)) {
      return (
        <div key={idx} style={{ display: 'flex', gap: '6px', fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.5, marginTop: '2px' }}>
          <span style={{ color: 'var(--blue-highlight)', flexShrink: 0 }}>•</span>
          <span>{formatInline(cleanLine.replace(/^[•\-\d\.]+\s*/, ''))}</span>
        </div>
      );
    }

    return (
      <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
        {formatInline(cleanLine)}
      </div>
    );
  });
}

function LeadFormCard({ leadForm, scope, estimationCard, onSubmitLead }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bizName, setBizName] = useState(leadForm?.businessName || scope?.businessName || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please provide Name, Mobile Number and Email.');
      return;
    }
    setError('');
    setSubmitting(true);
    const resolvedBiz = (bizName || leadForm?.businessName || scope?.businessName || 'Web Project').trim();
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      businessName: resolvedBiz,
      scope,
      estimationCard,
      timestamp: new Date().toISOString()
    };
    try {
      await fetch('http://localhost:5050/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Lead submit fallback:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      if (onSubmitLead) {
        onSubmitLead(payload);
      }
    }
  };

  if (submitted) {
    return (
      <div style={{ background: 'rgba(163, 230, 53, 0.08)', border: '1px solid rgba(163, 230, 53, 0.3)', borderRadius: '12px', padding: '10px 12px', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A3E635', fontSize: '0.82rem', fontWeight: 600 }}>
          <CheckCircle2 size={15} /> Details Submitted to Engineering Team!
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-body)', marginTop: '3px', lineHeight: 1.4 }}>
          Our lead engineer will contact you on <strong>{phone}</strong> shortly.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(120, 170, 255, 0.28)', borderRadius: '12px', padding: '12px', marginTop: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
          📋 Confirm Details for Engineer Callback
        </span>
        <span style={{ fontSize: '0.66rem', color: '#A3E635', fontFamily: 'var(--font-mono)' }}>Direct AI Submit</span>
      </div>

      {leadForm?.askBusinessName && (
        <div style={{ marginBottom: '6px' }}>
          <input
            type="text"
            placeholder="Business / Institute Name"
            value={bizName}
            onChange={(e) => setBizName(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', fontSize: '0.78rem', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff', outline: 'none' }}
          />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '6px' }}>
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '7px 10px', fontSize: '0.78rem', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff', outline: 'none' }}
        />
        <input
          type="tel"
          placeholder="Mobile Number (Important) *"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '7px 10px', fontSize: '0.78rem', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff', outline: 'none' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <input
          type="email"
          placeholder="Email Address *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '7px 10px', fontSize: '0.78rem', background: 'rgba(0, 0, 0, 0.35)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff', outline: 'none' }}
        />
      </div>

      {error && <div style={{ color: '#F87171', fontSize: '0.72rem', marginBottom: '6px' }}>{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary-cta"
        style={{ width: '100%', padding: '7px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
      >
        <span>{submitting ? 'Submitting Scope...' : '🚀 Submit Scope to Engineering Team'}</span>
      </button>
    </form>
  );
}

export function FloatingAIWidget({ onNavigate, onPrefillQuote, onExecuteCommand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fixkar_ai_chat_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('[FloatingAIWidget] Error loading saved chat history:', e);
      }
    }
    return [
      {
        id: 1,
        sender: 'agent',
        text: 'Hi! 👋 I am your **Fixkar AI Website Copilot**.\n\nI can answer any question, control the website (change pages, switch languages, filter case studies), or automatically configure your custom quote!',
        chips: [
          '🚀 Show Real Client Projects',
          '💡 What is the price of hosting my website?',
          '🍽️ Catering / Restaurant Estimate',
          '💇 Salon & Bridal Booking Estimate',
          '🌐 Switch Language to Hindi',
          '💰 All Website Pricing Plans',
        ],
      },
    ];
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && messages && messages.length > 0) {
      try {
        localStorage.setItem('fixkar_ai_chat_history', JSON.stringify(messages));
      } catch (e) {
        console.warn('[FloatingAIWidget] Error saving chat history:', e);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleLeadSubmitted = (leadData) => {
    const totalDisplay = typeof leadData.estimationCard?.total === 'number'
      ? `₹${leadData.estimationCard.total.toLocaleString('en-IN')}`
      : (leadData.estimationCard?.total || '₹7,999');
    
    const confirmMsg = {
      id: Date.now(),
      sender: 'agent',
      text: `✅ **Thank you, ${leadData.name}! Your requirements for ${leadData.businessName || 'your website project'} have been successfully received.**\n\nOur Lead Engineering Team at Fixkar Studio will contact you directly on **${leadData.phone}** (and via email at **${leadData.email}**) soon to discuss your roadmap!\n\nYour dynamic project estimate of **${totalDisplay}** is locked with our risk-free 50/50 milestone payment terms (50% advance to start, 50% only when the website is 100% approved and ready for live launch).`,
      chips: ['💬 Open WhatsApp Direct', '🌐 Check Domain Availability', '📄 View All Features', '🔄 Plan Another Project']
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputVal('');
    setIsTyping(true);

    // Instant Autonomous Intent Execution (Zero Latency)
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('hindi') || lowerQuery.includes('हिंदी') || lowerQuery.includes('hindi me') || lowerQuery.includes('hindi mein')) {
      if (onExecuteCommand) {
        onExecuteCommand({ type: 'change_language', language: 'hi', message: 'भाषा बदलकर हिंदी कर दी गई है' });
      }
    } else if (lowerQuery.includes('english') || lowerQuery.includes('अंग्रेजी') || lowerQuery.includes('switch to english') || lowerQuery.includes('english me')) {
      if (onExecuteCommand) {
        onExecuteCommand({ type: 'change_language', language: 'en', message: 'Language switched to English' });
      }
    } else if (lowerQuery.includes('show portfolio') || lowerQuery.includes('show real work') || lowerQuery.includes('case studies') || lowerQuery.includes('असली काम')) {
      if (onExecuteCommand) {
        onExecuteCommand({ type: 'navigate', targetPage: 'work', message: 'Opening Case Studies & Portfolio' });
      }
    } else if (lowerQuery.includes('talk to engineer') || lowerQuery.includes('open contact') || lowerQuery.includes('संपर्क')) {
      if (onExecuteCommand) {
        onExecuteCommand({ type: 'navigate', targetPage: 'contact', message: 'Opening Contact Page' });
      }
    }

    try {
      const res = await fetch('http://localhost:5050/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();

        // Execute Autonomous AI Command if present
        if (data.aiCommand && onExecuteCommand) {
          onExecuteCommand(data.aiCommand);
        }

        const agentReply = {
          id: Date.now() + 1,
          sender: 'agent',
          text: data.reply || 'Here is the customized answer for your request.',
          estimationCard: data.estimationCard,
          leadForm: data.leadForm,
          scope: data.scope,
          aiCommand: data.aiCommand,
          action: data.action || (data.estimationCard ? { label: '✨ Auto-Select in Quote Estimator →', target: 'quote' } : null),
          chips: data.chips || ['💬 Contact Engineer', '💰 Compare Pricing', '⭐ View Portfolio'],
        };
        setMessages((prev) => [...prev, agentReply]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.warn('[API error, fallback]', err);
    }

    // Fallback if offline
    setTimeout(() => {
      const fallbackReply = {
        id: Date.now() + 1,
        sender: 'agent',
        text: '1-Year Fast Cloud Hosting & SSL Security is **100% INCLUDED for FREE** with all Fixkar website packages. After Year 1, standard renewal is just ₹1,499/year with full maintenance and daily backups.',
        chips: ['🍽️ Estimate Catering Site', '💇 Estimate Salon Site', '🛍️ Estimate E-Commerce', '💰 All Pricing Plans'],
      };
      setMessages((prev) => [...prev, fallbackReply]);
      setIsTyping(false);
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'agent',
        text: 'Let’s start fresh! 👋 Ask me anything about hosting, pricing, or describe your project:',
        chips: [
          '💡 What is the price of hosting my website?',
          '🍽️ Catering & Food Estimate',
          '💇 Salon & Bridal Estimate',
          '🛍️ E-Commerce Online Store',
          '💰 All Website Pricing Plans',
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Positioned inside the 1240px Card) */}
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: 'max(20px, calc((100vw - 1240px) / 2 + 32px))',
          zIndex: 99999,
          pointerEvents: 'auto',
        }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Fixkar AI Copilot"
            title="Fixkar AI Website Copilot"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #8B5CF6 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(14, 165, 233, 0.55)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.75)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(14, 165, 233, 0.55)';
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} />
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#4ADE80',
                  border: '2px solid #1E293B',
                  boxShadow: '0 0 8px #4ADE80',
                }}
              />
            </div>
          </button>
        )}
      </div>

      {/* Floating Glass Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            right: 'max(20px, calc((100vw - 1240px) / 2 + 32px))',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: '590px',
            maxHeight: 'calc(100vh - 64px)',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 24, 0.99) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(56, 189, 248, 0.25)',
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInPage 0.25s ease',
          }}
        >
          {/* Modern Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 0 14px rgba(56, 189, 248, 0.5)',
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.90rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Fixkar AI Copilot</span>
                  <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 700 }}>
                    AI 4.0
                  </span>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#4ADE80', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80' }} />
                  Live LLM Connected
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleReset}
                title="Reset Chat"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    maxWidth: '90%',
                    padding: '12px 16px',
                    borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.sender === 'user' ? '#2563EB' : 'rgba(255, 255, 255, 0.05)',
                    border: m.sender === 'user' ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border-subtle)',
                    color: m.sender === 'user' ? '#fff' : 'var(--text-body)',
                    fontSize: '0.84rem',
                    lineHeight: 1.5,
                  }}
                >
                  {/* Clean Rendered Formatted Text */}
                  {renderFormattedMessage(m.text)}

                  {/* DYNAMIC ESTIMATION CARD (Only when present) */}
                  {m.estimationCard && (
                    <div
                      style={{
                        marginTop: '10px',
                        background: 'rgba(14, 20, 36, 0.95)',
                        border: '1px solid rgba(120, 170, 255, 0.3)',
                        borderRadius: '14px',
                        padding: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-divider)', paddingBottom: '6px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#A3E635', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          <Calculator size={13} />
                          <span>DYNAMIC ESTIMATE</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>50/50 Terms</span>
                      </div>

                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>
                        {m.estimationCard.title}
                      </strong>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px', fontSize: '0.76rem', color: 'var(--text-body)' }}>
                        {(m.estimationCard.items || []).map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>• {item.name}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--blue-highlight)' }}>{item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-divider)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>ESTIMATED TOTAL</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#A3E635', fontFamily: 'var(--font-mono)' }}>
                            {typeof m.estimationCard.total === 'number' ? `₹${m.estimationCard.total.toLocaleString('en-IN')}` : m.estimationCard.total}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          <div>Start: <strong style={{ color: '#fff' }}>{typeof m.estimationCard.advance === 'number' ? `₹${m.estimationCard.advance.toLocaleString('en-IN')}` : m.estimationCard.advance}</strong></div>
                          <div>Launch: <strong style={{ color: '#fff' }}>{typeof m.estimationCard.completion === 'number' ? `₹${m.estimationCard.completion.toLocaleString('en-IN')}` : m.estimationCard.completion}</strong></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Direct Contact Details Lead Form */}
                  {m.leadForm?.show && (
                    <LeadFormCard
                      leadForm={m.leadForm}
                      scope={m.scope}
                      estimationCard={m.estimationCard}
                      onSubmitLead={handleLeadSubmitted}
                    />
                  )}

                  {/* 1-Click Action Button with Scope Pre-Selection */}
                  {m.action && (
                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid var(--border-divider)' }}>
                      <button
                        className="btn-primary-cta"
                        style={{ padding: '6px 12px', fontSize: '0.78rem', width: '100%' }}
                        onClick={() => {
                          setIsOpen(false);
                          if (m.action.target === 'quote' && onPrefillQuote) {
                            const resolvedScope = m.scope || {
                              siteType: 'business',
                              pageCount: 5,
                              hostingPlan: 'standard_cloud',
                              domainOption: 'dot_in',
                              features: {
                                whatsapp: true,
                                contactForm: true,
                                bookingCalendar: false,
                                priceCalculator: false,
                                paymentGateway: false,
                                gallery: true,
                                multiLanguage: false,
                                adminDashboard: false,
                              },
                              aiOption: 'none',
                              businessName: 'AI Customized Scope',
                              notes: 'Pre-configured automatically from your discussion with Fixkar AI.',
                            };
                            onPrefillQuote(resolvedScope);
                          } else if (onNavigate) {
                            onNavigate(m.action.target);
                          }
                        }}
                      >
                        <span>{m.action.label}</span>
                      </button>
                    </div>
                  )}
                </div>

                {m.chips && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {m.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (chip.includes('Start Over') || chip.includes('Start fresh')) handleReset();
                          else if (chip.includes('Contact')) {
                            setIsOpen(false);
                            if (onNavigate) onNavigate('contact');
                          } else {
                            handleSend(chip);
                          }
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(120, 170, 255, 0.25)',
                          borderRadius: 'var(--radius-pill)',
                          padding: '5px 11px',
                          color: 'var(--text-heading)',
                          fontSize: '0.74rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.76rem', padding: '4px' }}>
                <span className="ai-pulse-orb" style={{ width: '5px', height: '5px' }} />
                <span>Fixkar AI generating dynamic response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--border-divider)',
              display: 'flex',
              gap: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <input
              type="text"
              placeholder="Ask anything... e.g. 'What is the price of hosting?'"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.84rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-primary-cta"
              style={{ padding: '8px 12px', borderRadius: '12px' }}
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
