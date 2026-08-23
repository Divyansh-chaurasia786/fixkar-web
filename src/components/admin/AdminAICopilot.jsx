import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Server,
  CreditCard,
  Smartphone,
  RefreshCw,
  Zap,
  ArrowRight,
  FileText,
  MessageSquare,
} from 'lucide-react';

export function AdminAICopilot({
  leads,
  setLeads,
  projects,
  setProjects,
  onGenerateReceipt,
  onUpdateLeadStatus,
  onUpdateProjectStatus,
  onDeleteLead,
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text:
        '👋 **Hello Admin! I am your Fixkar Autonomous Operations AI.**\n\n' +
        'I have direct access to your database. You can ask me questions or give me direct commands like:\n' +
        '• *"Naya client add karo: Apex Fitness, Rahul Sharma, apexfit.in, budget 35000"*\n' +
        '• *"S Caterers ka status Live in Production mark karo"*\n' +
        '• *"Kaunse clients ka server payment due hai?"*\n' +
        '• *"S Caterers ki PDF receipt generate karo"*\n' +
        '• *"Uncontacted leads ki list dikhao"*',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [executing, setExecuting] = useState(false);

  // Helper: Calculate days remaining
  const calculateDaysRemaining = (expireDateStr) => {
    if (!expireDateStr) return 999;
    const now = new Date();
    const expire = new Date(expireDateStr);
    const diffTime = expire.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Autonomous Natural Language Command Processor
  const handleSendCommand = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setExecuting(true);

    setTimeout(() => {
      processAIAction(query);
      setExecuting(false);
    }, 450);
  };

  const processAIAction = (query) => {
    const qLower = query.toLowerCase();
    let replyText = '';
    let actionBadge = null;

    // ACTION 1: ADD NEW CLIENT / PROJECT
    // e.g. "naya client add karo: Apex Fitness, Rahul Sharma, apexfit.in, budget 35000"
    if (
      qLower.includes('add client') ||
      qLower.includes('add project') ||
      qLower.includes('naya client') ||
      qLower.includes('new client') ||
      qLower.includes('add karo')
    ) {
      // Extract details or create a structured client
      const budgetMatch = query.match(/(\d[\d,]*\d|\d+)\s*(k|thousand|rupees|rs|inr)?/i);
      const budgetNum = budgetMatch ? parseInt(budgetMatch[1].replace(/\D/g, ''), 10) || 25000 : 25000;
      const budgetFormatted = `₹${budgetNum.toLocaleString('en-IN')}`;
      const advFormatted = `₹${Math.round(budgetNum / 2).toLocaleString('en-IN')}`;
      const balFormatted = `₹${(budgetNum - Math.round(budgetNum / 2)).toLocaleString('en-IN')}`;

      // Extract client name if possible
      let clientName = 'New Business Client';
      if (query.includes(':')) {
        const parts = query.split(':')[1].split(',');
        if (parts[0]) clientName = parts[0].trim();
      } else {
        const words = query.split(' ');
        const clientIdx = words.findIndex((w) => w.toLowerCase() === 'client');
        if (clientIdx !== -1 && words[clientIdx + 1]) {
          clientName = words.slice(clientIdx + 1, clientIdx + 3).join(' ');
        }
      }

      const domainGuess = clientName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.in';

      const newProj = {
        id: `proj_${Date.now()}`,
        clientName: clientName,
        contactPerson: 'Lead Contact',
        phone: '919876543210',
        domain: domainGuess,
        domainExpires: '2027-08-30',
        hosting: 'High-Speed Edge Cloud',
        totalBudget: budgetFormatted,
        advancePaid: advFormatted,
        balanceDue: balFormatted,
        paymentStatus: '50% Advance Received',
        sprintStatus: 'Discovery & Planning',
        deliveryDate: '2026-09-15',
        projectType: 'Full-Stack Custom Web Application',
      };

      setProjects((prev) => [newProj, ...prev]);

      replyText =
        `✅ **Autonomous Action Executed: New Client Created!**\n\n` +
        `• **Client Name:** ${newProj.clientName}\n` +
        `• **Domain:** \`${newProj.domain}\`\n` +
        `• **Budget:** ${newProj.totalBudget} (50% Adv: ${newProj.advancePaid} | 50% Bal: ${newProj.balanceDue})\n` +
        `• **Sprint Status:** Discovery & Planning (Delivery: ${newProj.deliveryDate})\n\n` +
        `*Client Projects list aur Dashboard metrics live update ho chuke hain.*`;
      actionBadge = 'PROJECT_ADDED';
    }

    // ACTION 2: SERVER EXPIRY RADAR & RENEWALS
    else if (
      qLower.includes('server') ||
      qLower.includes('expiry') ||
      qLower.includes('renewal') ||
      qLower.includes('due') ||
      qLower.includes('hosting')
    ) {
      const expiring = projects.filter((p) => calculateDaysRemaining(p.domainExpires) <= 30);
      if (expiring.length > 0) {
        replyText =
          `🚨 **Server Renewal Alert: ${expiring.length} Website(s) Expiring Soon!**\n\n` +
          expiring
            .map(
              (p) =>
                `• **${p.clientName}** (\`${p.domain}\`)\n` +
                `  ↳ 🚨 **${calculateDaysRemaining(p.domainExpires)} days left** (Due: ${p.domainExpires})\n` +
                `  ↳ Hosting: ${p.hosting}`
            )
            .join('\n\n') +
          `\n\n💡 *Aap inka PDF invoice generate karke client ko WhatsApp par bhej sakte hain.*`;
      } else {
        replyText = `✅ **Sabhi client servers healthy hain!** Agle 30 dino mein kisi bhi website ka hosting payment due nahi hai.`;
      }
      actionBadge = 'SERVER_RADAR';
    }

    // ACTION 3: GENERATE PDF RECEIPT
    else if (
      qLower.includes('receipt') ||
      qLower.includes('invoice') ||
      qLower.includes('bill') ||
      qLower.includes('generate')
    ) {
      const matchingProj = projects.find((p) =>
        qLower.includes((p.clientName || '').toLowerCase()) || qLower.includes((p.domain || '').toLowerCase())
      ) || projects[0];

      if (matchingProj) {
        onGenerateReceipt(matchingProj);
        replyText =
          `📄 **Official PDF Receipt Generated for ${matchingProj.clientName}!**\n\n` +
          `• **Domain:** \`${matchingProj.domain}\`\n` +
          `• **Amount:** ${matchingProj.totalBudget} (Paid in Full)\n` +
          `• **Modal Status:** Printable PDF sheet screen par open ho chuki hai. Aap use Download/Print ya WhatsApp par share kar sakte hain.`;
        actionBadge = 'RECEIPT_OPENED';
      } else {
        replyText = `Kripya client ka naam batayein jinki receipt banani hai (e.g. *"S Caterers ki receipt generate karo"*).`;
      }
    }

    // ACTION 4: STATUS CHANGE (MARK LIVE / CONVERTED)
    else if (
      qLower.includes('live') ||
      qLower.includes('status') ||
      qLower.includes('mark') ||
      qLower.includes('change')
    ) {
      const matchingProj = projects.find((p) =>
        qLower.includes((p.clientName || '').toLowerCase()) || qLower.includes((p.domain || '').toLowerCase())
      );

      if (matchingProj) {
        onUpdateProjectStatus(matchingProj.id, 'Paid in Full', 'Live in Production');
        replyText =
          `🎉 **Status Updated Successfully!**\n\n` +
          `• **Client:** ${matchingProj.clientName}\n` +
          `• **New Sprint Status:** \`Live in Production\` ✅\n` +
          `• **Payment Status:** \`Paid in Full\` (Balance Cleared)\n\n` +
          `*Ab aap is client ke liye 1-click handover PDF receipt bana sakte hain.*`;
        actionBadge = 'STATUS_UPDATED';
      } else {
        replyText = `Status update karne ke liye client ka naam specify karein (e.g. *"RK Computer Classes ko Live mark karo"*).`;
      }
    }

    // ACTION 5: DELETE / REMOVE CLIENT OR LEAD
    else if (
      qLower.includes('delete') ||
      qLower.includes('remove') ||
      qLower.includes('hata do')
    ) {
      const matchingLead = leads.find((l) => qLower.includes((l.name || l.businessName || '').toLowerCase()));
      if (matchingLead) {
        onDeleteLead(matchingLead.id);
        replyText = `🗑️ **Lead Removed:** ${matchingLead.name || matchingLead.businessName} (${matchingLead.serviceRequired || 'Lead'}) ko leads list se delete kar diya gaya hai.`;
        actionBadge = 'LEAD_DELETED';
      } else {
        replyText = `Record delete karne ke liye name mention karein (e.g. *"Rajesh Kumar lead ko delete karo"*).`;
      }
    }

    // ACTION 6: FINANCIAL & REVENUE SUMMARY
    else if (
      qLower.includes('revenue') ||
      qLower.includes('kamai') ||
      qLower.includes('balance') ||
      qLower.includes('advance') ||
      qLower.includes('financial')
    ) {
      const totalRev = projects.reduce((acc, p) => acc + (parseInt(String(p.totalBudget).replace(/\D/g, ''), 10) || 0), 0);
      const totalAdv = projects.reduce((acc, p) => acc + (parseInt(String(p.advancePaid).replace(/\D/g, ''), 10) || 0), 0);
      const totalBal = projects.reduce((acc, p) => acc + (parseInt(String(p.balanceDue).replace(/\D/g, ''), 10) || 0), 0);

      replyText =
        `💰 **Fixkar Studio Financial & Milestone Summary:**\n\n` +
        `• **Total Project Pipeline:** ₹${totalRev.toLocaleString('en-IN')}\n` +
        `• **50% Advance Collected:** ₹${totalAdv.toLocaleString('en-IN')} ✅\n` +
        `• **50% Balance Pending on Live:** ₹${totalBal.toLocaleString('en-IN')} ⏳\n` +
        `• **Total Active Builds:** ${projects.length} Projects`;
      actionBadge = 'FINANCIAL_REPORT';
    }

    // ACTION 7: OTP INFRASTRUCTURE CHECK
    else if (qLower.includes('otp') || qLower.includes('sms') || qLower.includes('credit')) {
      replyText =
        `📱 **OTP Infrastructure Health Report:**\n\n` +
        `• **Master Pool Balance:** 44,253 / 50,000 Credits (88.5% Available)\n` +
        `• **SMS Gateway:** FAST2SMS Dedicated HTTP API\n` +
        `• **Gateway Status:** ONLINE • 99.98% Delivery Rate\n` +
        `• **Active Client Pools:** RK Computer Classes (1,247), Ecofone (4,500), Singh's Glamour (820).`;
      actionBadge = 'OTP_REPORT';
    }

    // GENERAL HELPER / SEARCH
    else {
      replyText =
        `🤖 **Fixkar Ops Assistant at your command!**\n\n` +
        `Aap mujhse natural language mein koi bhi command de sakte hain:\n` +
        `1. *"Naya client add karo: [Name], [Domain], [Budget]"*\n` +
        `2. *"[Client Name] ko Live mark karo"*\n` +
        `3. *"[Client Name] ki PDF receipt generate karo"*\n` +
        `4. *"Kiska server payment due hai?"*\n` +
        `5. *"Revenue breakdown dikhao"*`;
    }

    const aiMsg = {
      id: Date.now().toString(),
      sender: 'ai',
      text: replyText,
      badge: actionBadge,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(13, 19, 35, 0.95) 0%, rgba(8, 12, 22, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '18px',
        display: 'flex',
        flexDirection: 'column',
        height: '620px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            }}
          >
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Fixkar Operations AI Copilot</span>
              <span style={{ fontSize: '0.64rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                ADMIN EXCLUSIVE
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              Autonomous natural language commands & database management
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
          <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#4ADE80' }}>AUTONOMOUS READY</span>
        </div>
      </div>

      {/* Quick Action Suggestion Chips */}
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <button
          onClick={() => handleSendCommand('Naya client add karo: Apex Fitness, Rahul Sharma, apexfit.in, budget 35000')}
          style={{
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38BDF8',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Plus size={11} />
          <span>➕ Add New Client</span>
        </button>

        <button
          onClick={() => handleSendCommand('Kaunse clients ka server renewal due hai?')}
          style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#FDA4AF',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Server size={11} />
          <span>🚨 Server Expiry Radar</span>
        </button>

        <button
          onClick={() => handleSendCommand('S Caterers ki PDF receipt generate karo')}
          style={{
            background: 'rgba(74, 222, 128, 0.12)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            color: '#86EFAC',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <FileText size={11} />
          <span>📄 Generate PDF Receipt</span>
        </button>

        <button
          onClick={() => handleSendCommand('Revenue breakdown dikhao')}
          style={{
            background: 'rgba(251, 191, 36, 0.12)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#FDE047',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <CreditCard size={11} />
          <span>💰 Revenue Pipeline</span>
        </button>

        <button
          onClick={() => handleSendCommand('OTP credits check karo')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#CBD5E1',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Smartphone size={11} />
          <span>📱 OTP Balance</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
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
              maxWidth: '85%',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
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
                whiteSpace: 'pre-line',
                boxShadow:
                  m.sender === 'user'
                    ? '0 4px 15px rgba(37, 99, 235, 0.3)'
                    : '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {m.text}
            </div>

            <span
              style={{
                fontSize: '0.65rem',
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

        {executing && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#38BDF8',
              fontSize: '0.78rem',
              fontFamily: 'monospace',
              padding: '10px 14px',
              background: 'rgba(56, 189, 248, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              alignSelf: 'flex-start',
            }}
          >
            <Sparkles size={14} className="animate-spin" />
            <span>Autonomous agent executing database action...</span>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendCommand();
        }}
        style={{
          padding: '14px 16px',
          background: 'rgba(10, 15, 28, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Command AI: 'Naya client add karo...', 'Status change karo...', 'Receipt generate karo'..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '0.84rem',
            outline: 'none',
          }}
        />

        <button
          type="submit"
          disabled={!inputText.trim() || executing}
          style={{
            background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
            border: 'none',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed',
            opacity: inputText.trim() ? 1 : 0.5,
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)',
          }}
        >
          <span>Execute</span>
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
