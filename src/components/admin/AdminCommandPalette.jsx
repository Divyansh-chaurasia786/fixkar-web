import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Smartphone,
  CreditCard,
  RefreshCw,
  Clock,
  LifeBuoy,
  FileText,
  Bell,
  Activity,
  UserCheck,
  ShieldAlert,
  Sparkles,
  Server,
  X,
  CornerDownLeft,
} from 'lucide-react';

export function AdminCommandPalette({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenCopilotWithQuery,
  onOpenSuperAdmin,
  projects = [],
  leads = [],
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const safeQuery = (query || '').toLowerCase().trim();

  // Navigation commands
  const navCommands = [
    { id: 'nav-dash', title: 'Go to Operations Dashboard', tab: 'dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { id: 'nav-leads', title: 'Go to Leads & Enquiries', tab: 'leads', icon: Users, category: 'Navigation' },
    { id: 'nav-clients', title: 'Go to Client Management', tab: 'clients', icon: Users, category: 'Navigation' },
    { id: 'nav-projects', title: 'Go to Client Projects', tab: 'projects', icon: Briefcase, category: 'Navigation' },
    { id: 'nav-services', title: 'Go to Services & Infrastructure', tab: 'services', icon: Layers, category: 'Navigation' },
    { id: 'nav-invoices', title: 'Go to Invoices & Billing', tab: 'invoices', icon: CreditCard, category: 'Navigation' },
    { id: 'nav-payments', title: 'Go to Payments Ledger', tab: 'payments', icon: CreditCard, category: 'Navigation' },
    { id: 'nav-renewals', title: 'Go to Server Renewals Radar', tab: 'renewals', icon: Clock, category: 'Navigation' },
    { id: 'nav-otp', title: 'Go to Client OTP Accounts', tab: 'otp-accounts', icon: Smartphone, category: 'Navigation' },
    { id: 'nav-recharges', title: 'Go to Recharge Requests', tab: 'recharges', icon: RefreshCw, category: 'Navigation' },
    { id: 'nav-support', title: 'Go to Support Tickets', tab: 'support', icon: LifeBuoy, category: 'Navigation' },
    { id: 'nav-documents', title: 'Go to Client Documents', tab: 'documents', icon: FileText, category: 'Navigation' },
    { id: 'nav-notifications', title: 'Go to Notifications', tab: 'notifications', icon: Bell, category: 'Navigation' },
    { id: 'nav-activity', title: 'Go to Business Activity Log', tab: 'activity', icon: Activity, category: 'Navigation' },
    { id: 'nav-account', title: 'Go to Admin Profile', tab: 'account', icon: UserCheck, category: 'Navigation' },
  ];

  // AI Quick Actions
  const aiActions = [
    { id: 'ai-brief', title: "Ask AI: Today's Briefing", query: "Today's Briefing", icon: Sparkles },
    { id: 'ai-otp', title: 'Ask AI: Low OTP Balances', query: 'Low OTP credits wale clients dikhao', icon: Smartphone },
    { id: 'ai-renew', title: 'Ask AI: Next 15 Days Server Renewals', query: 'Next 15 days me kaunse server expire ho rahe hain?', icon: Server },
    { id: 'ai-bill', title: 'Ask AI: Pending Milestone Payments', query: 'Pending payments batao', icon: CreditCard },
  ];

  // Filter commands with safe checks
  const filteredNav = navCommands.filter((c) =>
    (c.title || '').toLowerCase().includes(safeQuery)
  );

  const filteredProjects = (projects || []).filter((p) =>
    (p.clientName || '').toLowerCase().includes(safeQuery) ||
    (p.domain || '').toLowerCase().includes(safeQuery)
  );

  const filteredLeads = (leads || []).filter((l) =>
    (l.name || '').toLowerCase().includes(safeQuery) ||
    (l.businessName || '').toLowerCase().includes(safeQuery) ||
    (l.contactPerson || '').toLowerCase().includes(safeQuery) ||
    (l.clientCode || '').toLowerCase().includes(safeQuery)
  );

  // Combine items for keyboard navigation
  const allItems = [
    ...(safeQuery ? [{ id: 'ai-custom', title: `Ask AI Copilot: "${query}"`, isCustomAI: true, query }] : []),
    ...aiActions.filter((a) => (a.title || '').toLowerCase().includes(safeQuery)),
    ...filteredNav,
    ...filteredProjects.slice(0, 5).map((p) => ({
      id: `proj-${p.id}`,
      title: `Project: ${p.clientName || 'Client'} (${p.domain || 'domain'})`,
      icon: Briefcase,
      action: () => { onNavigateTab('projects'); onClose(); },
    })),
    ...filteredLeads.slice(0, 5).map((l) => ({
      id: `lead-${l.id}`,
      title: `Client / Lead: ${l.businessName || l.name || 'Client'} (${l.clientCode || l.serviceRequired || 'Active'})`,
      icon: Users,
      action: () => { onNavigateTab('clients'); onClose(); },
    })),
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (allItems.length || 1)) % (allItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = allItems[selectedIndex];
      if (item) handleSelect(item);
    }
  };

  const handleSelect = (item) => {
    if (item.isCustomAI || item.query) {
      onOpenCopilotWithQuery(item.query);
      onClose();
    } else if (item.tab) {
      onNavigateTab(item.tab);
      onClose();
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 4, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '640px',
          maxWidth: '92vw',
          background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden',
          animation: 'fadeInPage 0.15s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Search size={18} color="#38BDF8" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, clients, projects, or ask AI Copilot..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.94rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '0.66rem',
              fontFamily: 'monospace',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
          {allItems.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#64748B', fontSize: '0.84rem' }}>
              No matches found for "{query}".
            </div>
          ) : (
            allItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon || (item.isCustomAI ? Sparkles : Command);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: isSelected
                      ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.3) 0%, rgba(56, 189, 248, 0.1) 100%)'
                      : 'transparent',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: isSelected ? '#2563EB' : 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#fff' : '#38BDF8',
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <span style={{ fontSize: '0.84rem', color: isSelected ? '#fff' : '#CBD5E1', fontWeight: isSelected ? 600 : 400 }}>
                      {item.title}
                    </span>
                  </div>

                  {isSelected && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '0.7rem' }}>
                      <span>Select</span>
                      <CornerDownLeft size={12} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: '#64748B',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Fixkar Spotlight v2.0</span>
        </div>
      </div>
    </div>
  );
}
