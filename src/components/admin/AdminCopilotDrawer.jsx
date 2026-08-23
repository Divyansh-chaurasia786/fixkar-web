import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ShieldAlert,
  Printer,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Server,
  CreditCard,
  Smartphone,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Clock,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';

function formatTextInline(str) {
  if (!str) return null;
  // Match links, inline code, bold text, and italic text
  const regex = /(\[.*?\]\(.*?\)|\`.*?\`|\*\*.*?\*\*|\*.*?\*)/g;
  const parts = str.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} style={{ color: '#FFFFFF', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      return (
        <em key={i} style={{ color: '#93C5FD', fontStyle: 'italic' }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          style={{
            color: '#38BDF8',
            background: 'rgba(56, 189, 248, 0.14)',
            padding: '1px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.82em',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const label = part.slice(1, part.indexOf(']('));
      const url = part.slice(part.indexOf('](') + 2, -1);
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#38BDF8', textDecoration: 'underline', fontWeight: 600 }}
        >
          {label}
        </a>
      );
    }
    return part;
  });
}

function renderCopilotMessage(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const rendered = [];
  let tableRows = [];
  let inTable = false;

  const flushTable = (key) => {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const dataRows = tableRows.slice(1).filter(r => !r.every(c => c.replace(/[-:\s]/g, '') === ''));
      rendered.push(
        <div key={`tbl-${key}`} style={{ overflowX: 'auto', margin: '8px 0', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(56, 189, 248, 0.12)', borderBottom: '1px solid rgba(56, 189, 248, 0.2)' }}>
                {header.map((col, idx) => (
                  <th key={idx} style={{ padding: '6px 8px', textAlign: 'left', color: '#38BDF8', fontWeight: 700 }}>
                    {formatTextInline(col.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ padding: '6px 8px', color: '#E2E8F0' }}>
                      {formatTextInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      const cols = trimmed.slice(1, -1).split('|');
      tableRows.push(cols);
    } else {
      if (inTable) flushTable(idx);
      if (!trimmed) {
        rendered.push(<div key={idx} style={{ height: '4px' }} />);
      } else if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        rendered.push(
          <div key={idx} style={{ display: 'flex', gap: '6px', marginTop: '2px', lineHeight: 1.45 }}>
            <span style={{ color: '#38BDF8', flexShrink: 0 }}>•</span>
            <span style={{ color: '#E2E8F0', fontSize: '0.80rem' }}>{formatTextInline(trimmed.replace(/^[•\-]\s*/, ''))}</span>
          </div>
        );
      } else {
        rendered.push(
          <div key={idx} style={{ color: '#E2E8F0', fontSize: '0.82rem', lineHeight: 1.5 }}>
            {formatTextInline(trimmed)}
          </div>
        );
      }
    }
  });
  if (inTable) flushTable('end');
  return rendered;
}

export function AdminCopilotDrawer({
  isOpen,
  onClose,
  currentContext,
  adminToken,
  API_BASE,
  onOpenSuperAdmin,
  onOpenReceipt,
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text:
        `Hey! Kaise hain aap? Main live dashboard par aapka AI co-pilot hoon. 🤝\n\n` +
        `Aap normal bhasha me batayein aaj kya karna hai — naya client add karna, receipt generate karna, invoice banana, ya pending payment check karna.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState(null);
  const [actionReason, setActionReason] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Context-specific quick suggestion chips
  const getContextSuggestions = () => {
    const page = currentContext?.page || 'dashboard';
    switch (page) {
      case 'leads':
        return [
          'Uncontacted leads dikhao',
          'Rajesh Kumar ko follow-up message ready karo',
          'Is month kitne naye leads aaye?',
        ];
      case 'projects':
        return [
          'In progress projects status batao',
          'S Caterers ka milestone breakdown do',
          'Overdue target dates dikhao',
        ];
      case 'otp':
        return [
          'Sabse low OTP balance kiska hai?',
          'RKCC ke OTP credits check karo',
          'RKCC ko 1000 OTP add karo',
        ];
      default:
        return [
          "Today's Briefing",
          'Next 15 days me kaunse server expire ho rahe hain?',
          'Low OTP credits wale clients dikhao',
          'Pending payments batao',
        ];
    }
  };

  const handleSendQuery = async (queryText) => {
    const query = (queryText || inputText).trim();
    if (!query || loading) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    const historyPayload = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    try {
      const res = await fetch(`${API_BASE}/api/admin/copilot/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          query,
          currentContext,
          history: historyPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg = {
          id: Date.now().toString(),
          sender: 'ai',
          text: data.reply,
          level: data.level,
          requiresSuperAdmin: data.requiresSuperAdmin,
          actionCard: data.actionCard,
          draftCard: data.draftCard,
          clientCard: data.clientCard,
          actions: data.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API query failed');
      }
    } catch (err) {
      console.error('[Copilot Drawer query error]', err);
      // Graceful AI failure handling
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text:
            `⚠️ **Fixkar AI Copilot is temporarily offline.**\n\n` +
            `Your core Admin dashboard, leads, projects, and billing tools are working normally. Please try your query again in a moment.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Execute Level 3 Confirmed Action
  const handleExecuteConfirmedAction = async (actionCard) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/copilot/confirm-action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          actionType: actionCard.actionType,
          targetId: actionCard.targetId,
          targetName: actionCard.targetName,
          additionAmount: actionCard.requestedAddition.replace(/\D/g, ''),
          reason: actionReason || 'Admin Confirmed through Copilot',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setActionSuccessMsg(`✅ ${actionCard.targetName}: ${actionCard.requestedAddition} added successfully! Audit record saved.`);
        setConfirmingAction(null);
        setActionReason('');

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'ai',
            text: `✅ **Action Completed:** ${data.message || 'Operation executed and verified.'}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      console.error('[Execute action error]', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '24px',
        width: '410px',
        maxWidth: 'calc(100vw - 32px)',
        height: 'min(530px, calc(100vh - 90px))',
        maxHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(9, 13, 26, 0.99) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '20px',
        backdropFilter: 'blur(30px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.22)',
        animation: 'fadeInPage 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* ─── MODERN ROUNDED CARD HEADER BAR ─────────────────────────────── */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.18) 0%, rgba(147, 51, 234, 0.18) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.5)',
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Fixkar AI Copilot</span>
              <span
                style={{
                  fontSize: '0.60rem',
                  fontFamily: 'monospace',
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38BDF8',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                ADMIN
              </span>
            </div>
            <div style={{ fontSize: '0.70rem', color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }} />
              Live Operations Intelligence
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#CBD5E1',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          title="Close Copilot (Esc)"
        >
          <X size={14} />
        </button>
      </div>

      {/* ─── MESSAGES CONVERSATION SCROLL AREA ─────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '92%',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {/* Chat Bubble */}
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '14px',
                background:
                  m.sender === 'user'
                    ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                border:
                  m.sender === 'user'
                    ? '1px solid rgba(56, 189, 248, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                boxShadow:
                  m.sender === 'user'
                    ? '0 4px 15px rgba(37, 99, 235, 0.3)'
                    : '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {renderCopilotMessage(m.text)}
            </div>

            {/* LEVEL 2: DRAFT CARD (REVIEW BEFORE SENDING) */}
            {m.draftCard && (
              <div
                style={{
                  marginTop: '10px',
                  width: '100%',
                  background: 'rgba(14, 21, 38, 0.95)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#38BDF8' }}>
                    {m.draftCard.title}
                  </span>
                  <span style={{ fontSize: '0.64rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                    DRAFT
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    color: '#CBD5E1',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    marginBottom: '10px',
                  }}
                >
                  {m.draftCard.message}
                </div>

                <a
                  href={`https://wa.me/${m.draftCard.phone.replace(/\D/g, '')}?text=${encodeURIComponent(m.draftCard.message)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <MessageSquare size={13} />
                  <span>Review & Send on WhatsApp →</span>
                </a>
              </div>
            )}

            {/* LEVEL 3: SENSITIVE ACTION CONFIRMATION CARD */}
            {m.actionCard && (
              <div
                style={{
                  marginTop: '10px',
                  width: '100%',
                  background: 'rgba(38, 18, 24, 0.95)',
                  border: '1px solid #F43F5E',
                  borderRadius: '12px',
                  padding: '14px',
                  boxShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FDA4AF', marginBottom: '8px' }}>
                  <AlertTriangle size={15} color="#F43F5E" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>
                    Human Confirmation Required
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#F8FAFC', marginBottom: '8px' }}>
                  <strong>Client:</strong> {m.actionCard.targetName}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.74rem', background: 'rgba(0, 0, 0, 0.3)', padding: '8px', borderRadius: '6px', marginBottom: '10px' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Current Credits:</span>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{m.actionCard.currentValue}</div>
                  </div>
                  <div>
                    <span style={{ color: '#4ADE80' }}>Requested:</span>
                    <div style={{ fontWeight: 800, color: '#4ADE80' }}>{m.actionCard.requestedAddition}</div>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Reason for addition (e.g. UPI Top-up received)..."
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: '#fff',
                    fontSize: '0.74rem',
                    outline: 'none',
                    marginBottom: '10px',
                  }}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleExecuteConfirmedAction(m.actionCard)}
                    style={{
                      background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Check size={13} />
                    <span>Confirm Action</span>
                  </button>

                  <button
                    onClick={() => setMessages((prev) => prev.filter((msg) => msg.id !== m.id))}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94A3B8',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* SUPER ADMIN ELEVATION TRIGGER */}
            {m.requiresSuperAdmin && (
              <div style={{ marginTop: '8px' }}>
                <button
                  onClick={onOpenSuperAdmin}
                  style={{
                    background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(225, 29, 72, 0.3) 100%)',
                    border: '1px solid #F43F5E',
                    color: '#FDA4AF',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 15px rgba(244, 63, 94, 0.3)',
                  }}
                >
                  <ShieldAlert size={14} />
                  <span>Enter Super Admin Step-Up →</span>
                </button>
              </div>
            )}

            {/* DIRECT ACTION BUTTONS (e.g. Receipt / WhatsApp) */}
            {m.actions && m.actions.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {m.actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (act.action === 'OPEN_RECEIPT' && act.target) {
                        onOpenReceipt(act.target);
                      } else if (act.action === 'OPEN_WHATSAPP' && act.url) {
                        window.open(act.url, '_blank');
                      } else if (act.action === 'DRAFT_MESSAGE' && act.target) {
                        handleSendQuery(`Draft message for ${act.target.businessName || act.target.clientName}`);
                      } else if (act.action === 'DRAFT_RECEIPT' && act.target) {
                        handleSendQuery(`Generate receipt for ${act.target.businessName || act.target.clientName}`);
                      }
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.25) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.5)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 10px rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    <span>{act.label}</span>
                  </button>
                ))}
              </div>
            )}

            <span
              style={{
                fontSize: '0.64rem',
                fontFamily: 'monospace',
                color: '#64748B',
                marginTop: '4px',
                padding: '0 4px',
              }}
            >
              {m.timestamp}
            </span>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#38BDF8',
              fontSize: '0.76rem',
              fontFamily: 'monospace',
              padding: '8px 12px',
              background: 'rgba(56, 189, 248, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              alignSelf: 'flex-start',
            }}
          >
            <Sparkles size={13} className="animate-spin" />
            <span>Analyzing Fixkar business context...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── INPUT FORM BAR (MODERN PILL STYLE) ───────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery();
        }}
        style={{
          padding: '12px 16px',
          background: 'rgba(10, 15, 28, 0.96)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Fixkar AI Copilot..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '10px 18px',
            color: '#fff',
            fontSize: '0.82rem',
            outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed',
            opacity: inputText.trim() ? 1 : 0.45,
            boxShadow: '0 0 14px rgba(56, 189, 248, 0.4)',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
