import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  KeyRound,
  Database,
  Activity,
  LogOut,
  ArrowLeft,
  RefreshCw,
  Server,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Globe,
  Sliders,
  Crown,
  Plus,
  Copy,
  Terminal,
  Code,
  ShieldCheck,
  Save,
  Trash2,
  Zap,
  TrendingUp,
  DollarSign,
  Search,
  X,
  Sparkles,
  Eye,
  Power,
  LayoutDashboard,
  Mail,
  Clock,
  LifeBuoy,
  HelpCircle,
  Check,
  Key,
  Send
} from 'lucide-react';
import '../../styles/admin-console.css';

// ─── THEME-NATIVE ROYAL KING CROWN (100% SEAMLESS VECTOR) ───────────────────
function ThemeKingCrown({ size = 48 }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.8)}
      viewBox="0 0 64 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 0 14px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 4px #FDE047)',
        marginBottom: '1px',
      }}
    >
      <defs>
        <linearGradient id="themeCrownGoldMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="20%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="themeCrownBand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#FFFBEB" />
          <stop offset="70%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id="themeGemRuby" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="themePearl" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* Royal Crown 5-Peak Silhouette */}
      <path
        d="M 6 40 L 9 18 L 22 28 L 32 8 L 42 28 L 55 18 L 58 40 Z"
        fill="url(#themeCrownGoldMain)"
        stroke="#78350F"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Inner Rich 3D Facet Shading */}
      <path d="M 32 9 L 26 29 L 32 24 L 38 29 Z" fill="#FFFBEB" opacity="0.6" />
      <path d="M 9 19 L 7 39 L 17 33 Z" fill="#FFFBEB" opacity="0.4" />
      <path d="M 55 19 L 57 39 L 47 33 Z" fill="#78350F" opacity="0.4" />
      <path d="M 22 29 L 32 40 L 42 29 L 32 24 Z" fill="#B45309" opacity="0.3" />

      {/* 5 Glistening Jewels on Peak Tips */}
      <circle cx="9" cy="18" r="2.8" fill="url(#themePearl)" stroke="#78350F" strokeWidth="0.6" />
      <circle cx="22" cy="28" r="2.4" fill="url(#themePearl)" stroke="#78350F" strokeWidth="0.6" />
      <circle cx="32" cy="8" r="3.4" fill="url(#themePearl)" stroke="#78350F" strokeWidth="0.6" />
      <circle cx="42" cy="28" r="2.4" fill="url(#themePearl)" stroke="#78350F" strokeWidth="0.6" />
      <circle cx="55" cy="18" r="2.8" fill="url(#themePearl)" stroke="#78350F" strokeWidth="0.6" />

      {/* Royal Diadem Base Band */}
      <rect x="5" y="39" width="54" height="9" rx="2.5" fill="url(#themeCrownBand)" stroke="#78350F" strokeWidth="1" />
      <rect x="7" y="40.5" width="50" height="1.8" fill="#FFFBEB" opacity="0.7" rx="0.9" />

      {/* Embedded Base Jewels */}
      <ellipse cx="32" cy="43.5" rx="3.5" ry="2.6" fill="url(#themeGemRuby)" stroke="#FFFBEB" strokeWidth="0.6" />
      <circle cx="17" cy="43.5" r="2" fill="#38BDF8" stroke="#FFFBEB" strokeWidth="0.5" />
      <circle cx="47" cy="43.5" r="2" fill="#38BDF8" stroke="#FFFBEB" strokeWidth="0.5" />
      <circle cx="9" cy="43.5" r="1.4" fill="#4ADE80" stroke="#78350F" strokeWidth="0.4" />
      <circle cx="55" cy="43.5" r="1.4" fill="#4ADE80" stroke="#78350F" strokeWidth="0.4" />
      <circle cx="24.5" cy="43.5" r="0.9" fill="#FFFFFF" />
      <circle cx="39.5" cy="43.5" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

export function SuperAdminDashboardView({ onNavigateHome }) {
  const { adminToken, superAdminToken, superUser, exitSuperAdmin, API_BASE } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'gateway' | 'client-apis' | 'provisional' | 'financials' | 'audit' | 'kill-switch'
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Gateway Config State
  const [gatewayConfig, setGatewayConfig] = useState({
    provider: 'Fast2SMS Enterprise DLT Gateway',
    apiKey: 'f2s_live_sample_master_key_9835',
    senderId: 'FIXKAR',
    route: 'dlt_manual',
    upstreamWalletAmount: '₹4,850.00',
    upstreamBalance: 24250,
    status: 'Connected (Active Upstream)',
    lastSyncedTimestamp: '20/8/2026, 2:00:00 pm',
    alertThreshold: 500
  });
  const [gatewaySyncing, setGatewaySyncing] = useState(false);
  const [gatewaySaving, setGatewaySaving] = useState(false);
  const [showMasterApiKey, setShowMasterApiKey] = useState(false);

  // Client API Keys State
  const [clientApiKeys, setClientApiKeys] = useState([]);
  const [isGenerateApiKeyModalOpen, setIsGenerateApiKeyModalOpen] = useState(false);
  const [newApiKeyForm, setNewApiKeyForm] = useState({
    clientCode: '',
    clientName: '',
    dltSenderId: '',
    packId: 'otp_500',
    credits: 500,
    price: 125,
    allocationType: 'COMPLIMENTARY', // 'COMPLIMENTARY' or 'BANK_TRANSFER'
    utrNumber: '',
    notes: 'Starter Onboarding Allotment',
  });
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [selectedSnippetTab, setSelectedSnippetTab] = useState('curl');
  const [selectedApiKeyForSnippet, setSelectedApiKeyForSnippet] = useState(null);
  const [visibleKeyIds, setVisibleKeyIds] = useState({});
  const [topupModalKey, setTopupModalKey] = useState(null);
  const [topupForm, setTopupForm] = useState({
    packId: 'otp_1000',
    credits: 1000,
    price: 250,
    allocationType: 'COMPLIMENTARY',
    utrNumber: '',
    notes: 'Top-Up recharge',
  });

  // SMS / OTP Pricing & Pack Rate Engine State
  const [otpPricing, setOtpPricing] = useState({
    wholesaleCostPerSms: 0.125,
    baseRetailRatePerSms: 0.25,
    currency: 'INR',
    packages: [
      { id: 'otp_500', name: 'Starter Micro Pack', credits: 500, ratePerSms: 0.25, price: 125, popular: false, desc: 'Quick top-up for small portals & testing' },
      { id: 'otp_1000', name: 'Starter Pro Pack', credits: 1000, ratePerSms: 0.25, price: 250, popular: false, desc: 'Ideal for coaching institute student logins and attendance alerts.' },
      { id: 'otp_2500', name: 'Growth Lite Pack', credits: 2500, ratePerSms: 0.23, price: 575, popular: false, desc: 'Great for growing academy & clinic booking portals.' },
      { id: 'otp_5000', name: 'Growth Business Pack', credits: 5000, ratePerSms: 0.22, price: 1100, popular: true, desc: 'Best value for high-volume exam portals and member booking notifications.' },
      { id: 'otp_10000', name: 'Enterprise Scale Pack', credits: 10000, ratePerSms: 0.20, price: 2000, popular: false, desc: 'Maximum savings with dedicated high-throughput DLT SMS routing.' },
      { id: 'otp_25000', name: 'Mega Enterprise Pack', credits: 25000, ratePerSms: 0.18, price: 4500, popular: false, desc: 'Ultra-low bulk volume rate for large institutions.' }
    ],
    customCalculator: { minCredits: 500, defaultRate: 0.22, maxCredits: 100000 }
  });
  const [pricingSaving, setPricingSaving] = useState(false);
  const [pricingNotice, setPricingNotice] = useState(null);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    credits: 10000,
    ratePerSms: 0.20,
    price: 2000,
    desc: '',
    popular: false,
  });

  // Operational Data Stores
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectApprovingId, setProjectApprovingId] = useState(null);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectFilterState, setProjectFilterState] = useState('all');
  const [wallets, setWallets] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [provisionalRecharges, setProvisionalRecharges] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [isKillSwitchActive, setIsKillSwitchActive] = useState(false);

  // Dual-Key Kill-Switch Safeguard Modal State
  const [showKillSwitchModal, setShowKillSwitchModal] = useState(false);
  const [killSwitchSuperPin, setKillSwitchSuperPin] = useState('');
  const [killSwitchAdminPass, setKillSwitchAdminPass] = useState('');
  const [killSwitchReason, setKillSwitchReason] = useState('');
  const [killSwitchSubmitting, setKillSwitchSubmitting] = useState(false);
  const [killSwitchError, setKillSwitchError] = useState('');

  // 👑 Master Credential Governance State (Super Admin Exclusivity)
  const [adminTargetUsername, setAdminTargetUsername] = useState('admin');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [adminPassSaving, setAdminPassSaving] = useState(false);
  const [adminPassMsg, setAdminPassMsg] = useState(null);

  const [newSuperPin, setNewSuperPin] = useState('');
  const [confirmSuperPin, setConfirmSuperPin] = useState('');
  const [superPinSaving, setSuperPinSaving] = useState(false);
  const [superPinMsg, setSuperPinMsg] = useState(null);

  // Renewal Radar State
  const [renewals, setRenewals] = useState([]);
  const [renewalFilter, setRenewalFilter] = useState('All');
  const [renewalSearchQuery, setRenewalSearchQuery] = useState('');

  // Support Tickets State
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportFilter, setSupportFilter] = useState('All');
  const [supportSearchQuery, setSupportSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({
    clientCode: '',
    clientId: '',
    client: '',
    phone: '',
    email: '',
    domain: '',
    subject: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
  });

  // Email Communications Hub State (Inbound & Outbound)
  const [emailSubTab, setEmailSubTab] = useState('inbound'); // 'inbound' | 'outbound'
  const [inboundEmails, setInboundEmails] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
  const [emailLogsLoading, setEmailLogsLoading] = useState(false);
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [selectedEmailForModal, setSelectedEmailForModal] = useState(null);
  const [selectedInboundEmailModal, setSelectedInboundEmailModal] = useState(null);
  const [showInboundReplyComposer, setShowInboundReplyComposer] = useState(false);
  const [inboundReplyText, setInboundReplyText] = useState('');
  const [isInboundReplying, setIsInboundReplying] = useState(false);
  const [inboundReplyStatus, setInboundReplyStatus] = useState(null);

  const handleSendInboundReply = async () => {
    if (!selectedInboundEmailModal || !inboundReplyText.trim()) return;
    setIsInboundReplying(true);
    setInboundReplyStatus(null);
    try {
      const recipientEmail = selectedInboundEmailModal.from.includes('<')
        ? (selectedInboundEmailModal.from.match(/<([^>]+)>/)?.[1] || selectedInboundEmailModal.from)
        : selectedInboundEmailModal.from;

      const res = await fetch('/api/emails/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: `Re: ${selectedInboundEmailModal.subject || 'Inquiry to Fixkar'}`,
          message: inboundReplyText,
          inReplyToId: selectedInboundEmailModal.id
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const newLogEntry = {
          id: `reply_${Date.now()}`,
          recipient: recipientEmail,
          from: 'support@fixkar.co.in',
          subject: `Re: ${selectedInboundEmailModal.subject || 'Inquiry to Fixkar'}`,
          message: inboundReplyText,
          inReplyToId: selectedInboundEmailModal.id,
          status: 'DELIVERED',
          engine: data.engine || 'Resend (support@fixkar.co.in)',
          timestamp: new Date().toISOString(),
          formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };
        setEmailLogs(prev => [newLogEntry, ...prev]);
        setInboundReplyStatus({ type: 'success', text: `✅ Reply sent directly to ${recipientEmail} from support@fixkar.co.in!` });
        setInboundReplyText('');
        setTimeout(() => {
          setInboundReplyStatus(null);
          setShowInboundReplyComposer(false);
        }, 2500);
      } else {
        setInboundReplyStatus({ type: 'error', text: data.error || 'Failed to dispatch reply.' });
      }
    } catch (err) {
      setInboundReplyStatus({ type: 'error', text: err.message });
    } finally {
      setIsInboundReplying(false);
    }
  };

  // Current IST Time
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch All Master Data
  const fetchAllSuperData = async () => {
  const fetchSuperAdminData = fetchAllSuperData;
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${adminToken}`,
      'x-super-token': superAdminToken || '9835',
    };
    try {
      const [
        gwRes, keysRes, clientsRes, projRes, walletsRes, rchRes, provRes, auditRes, renewalsRes, supportRes, pricingRes, killRes, emailsRes, inboundRes
      ] = await Promise.all([
        fetch(`${API_BASE}/api/admin/super/otp/gateway-config`, { headers }),
        fetch(`${API_BASE}/api/admin/super/otp/client-api-keys`, { headers }),
        fetch(`${API_BASE}/api/admin/clients`, { headers }),
        fetch(`${API_BASE}/api/admin/projects`, { headers }),
        fetch(`${API_BASE}/api/admin/otp/wallets`, { headers }),
        fetch(`${API_BASE}/api/admin/recharges`, { headers }),
        fetch(`${API_BASE}/api/admin/otp/provisional-recharges`, { headers }),
        fetch(`${API_BASE}/api/super-admin/audit-logs`, { headers }),
        fetch(`${API_BASE}/api/admin/renewals`, { headers }),
        fetch(`${API_BASE}/api/admin/support`, { headers }),
        fetch(`${API_BASE}/api/otp/pricing-config`),
        fetch(`${API_BASE}/api/admin/super/kill-switch`, { headers }),
        fetch(`${API_BASE}/api/admin/emails/logs`, { headers }),
        fetch(`${API_BASE}/api/admin/emails/inbound`, { headers }),
      ]);

      if (emailsRes && emailsRes.ok) {
        const d = await emailsRes.json();
        if (d.logs && Array.isArray(d.logs)) setEmailLogs(d.logs);
      }

      if (inboundRes && inboundRes.ok) {
        const d = await inboundRes.json();
        if (d.emails && Array.isArray(d.emails)) setInboundEmails(d.emails);
      }

      if (gwRes.ok) {
        const d = await gwRes.json();
        if (d.config) setGatewayConfig(d.config);
      }
      if (keysRes.ok) {
        const d = await keysRes.json();
        if (d.apiKeys) setClientApiKeys(d.apiKeys);
      }
      if (clientsRes.ok) {
        const d = await clientsRes.json();
        if (d.clients) setClients(d.clients);
      }
      if (projRes.ok) {
        const d = await projRes.json();
        if (d.projects) setProjects(d.projects);
      }
      if (walletsRes.ok) {
        const d = await walletsRes.json();
        if (d.wallets) setWallets(d.wallets);
      }
      if (rchRes.ok) {
        const d = await rchRes.json();
        if (d.recharges) setRecharges(d.recharges);
      }
      if (provRes.ok) {
        const d = await provRes.json();
        if (d.recharges) setProvisionalRecharges(d.recharges);
      }
      if (auditRes.ok) {
        const d = await auditRes.json();
        if (d.logs) setAuditLogs(d.logs);
      }
      if (renewalsRes.ok) {
        const d = await renewalsRes.json();
        if (d.renewals) setRenewals(d.renewals);
      }
      if (supportRes.ok) {
        const d = await supportRes.json();
        if (d.tickets) setSupportTickets(d.tickets);
      }
      if (pricingRes.ok) {
        const d = await pricingRes.json();
        if (d.pricing) setOtpPricing(d.pricing);
      }
      if (killRes && killRes.ok) {
        const d = await killRes.json();
        if (typeof d.killSwitchActive === 'boolean') setIsKillSwitchActive(d.killSwitchActive);
      }
    } catch (err) {
      console.error('[Super Admin fetch error]', err);
    } finally {
      setLoading(false);
    }
  };

  // Dual-Key Emergency Kill-Switch Handler
  const handleExecuteKillSwitch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!killSwitchSuperPin.trim() || !killSwitchAdminPass.trim()) {
      setKillSwitchError('Both Super Admin PIN and Admin Master Password are required.');
      return;
    }

    const actionText = isKillSwitchActive ? 'LIFT EMERGENCY LOCKDOWN' : 'ACTIVATE SYSTEM EMERGENCY KILL-SWITCH';
    const confirmMsg = isKillSwitchActive 
      ? '⚠️ CONFIRM STAND-DOWN PROTOCOL: Are you sure you want to lift the emergency lockdown and resume normal client OTP API dispatches?' 
      : '🚨 CRITICAL CONFIRMATION: Are you 100% sure you want to trigger the System Emergency Kill-Switch?\n\n• All client OTP dispatches will be immediately FROZEN in real-time.\n• Emergency Security Alert emails will be dispatched to Super Admin and Admin.';

    if (!window.confirm(confirmMsg)) {
      return;
    }

    setKillSwitchSubmitting(true);
    setKillSwitchError('');

    try {
      const res = await fetch(`${API_BASE}/api/admin/super/kill-switch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminPin: killSwitchSuperPin.trim(),
          adminPassword: killSwitchAdminPass.trim(),
          enable: !isKillSwitchActive,
          reason: killSwitchReason.trim() || (isKillSwitchActive ? 'Emergency quarantine lifted' : 'Manual Emergency Quarantine Triggered'),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsKillSwitchActive(data.isKillSwitchActive);
        setToastMessage(data.message || (data.isKillSwitchActive ? '🚨 Emergency Lockdown Activated!' : '🟢 Lockdown Lifted.'));
        setTimeout(() => setToastMessage(''), 6000);
        setShowKillSwitchModal(false);
        fetchAllSuperData();
      } else {
        setKillSwitchError(data.message || data.error || 'Dual-Key Authorization Failed.');
      }
    } catch (err) {
      setKillSwitchError('Network Error: ' + err.message);
    } finally {
      setKillSwitchSubmitting(false);
    }
  };

  // 👑 Master Credential Governance Handlers (Super Admin Exclusive)
  const handleUpdateAdminPassword = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newAdminPassword || newAdminPassword.length < 5) {
      setAdminPassMsg({ type: 'error', text: 'New Admin Password must be at least 5 characters long.' });
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setAdminPassMsg({ type: 'error', text: 'Passwords do not match. Please retype carefully.' });
      return;
    }
    if (!window.confirm(`⚠️ CONFIRM SECURITY UPDATE: Are you sure you want to update the master login password for Admin account '${adminTargetUsername}'? Regular admins will use this new password immediately.`)) {
      return;
    }

    setAdminPassSaving(true);
    setAdminPassMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/security/update-credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          target: 'ADMIN_PASSWORD',
          username: adminTargetUsername,
          newPassword: newAdminPassword,
        }),
      });
      const d = await res.json();
      if (d.success) {
        setAdminPassMsg({ type: 'success', text: d.message });
        setNewAdminPassword('');
        setConfirmAdminPassword('');
        setToastMessage('✅ Admin Master Password Updated Successfully!');
        setTimeout(() => setToastMessage(''), 5000);
      } else {
        setAdminPassMsg({ type: 'error', text: d.message || d.error || 'Failed to update Admin password.' });
      }
    } catch (err) {
      setAdminPassMsg({ type: 'error', text: 'Network Error: ' + err.message });
    } finally {
      setAdminPassSaving(false);
    }
  };

  const handleUpdateSuperPin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newSuperPin || newSuperPin.length < 4) {
      setSuperPinMsg({ type: 'error', text: 'Super Admin PIN must be at least 4 digits/characters.' });
      return;
    }
    if (newSuperPin !== confirmSuperPin) {
      setSuperPinMsg({ type: 'error', text: 'Super Admin PINs do not match.' });
      return;
    }
    if (!window.confirm(`👑 CRITICAL SOVEREIGN ACTION: Are you sure you want to update the Super Admin (GOD-MODE) Master PIN? You will use this new PIN for all future Super Admin elevations and Kill-Switch authorizations.`)) {
      return;
    }

    setSuperPinSaving(true);
    setSuperPinMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/security/update-credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          target: 'SUPER_ADMIN_PIN',
          newPin: newSuperPin,
        }),
      });
      const d = await res.json();
      if (d.success) {
        setSuperPinMsg({ type: 'success', text: d.message });
        setNewSuperPin('');
        setConfirmSuperPin('');
        setToastMessage('👑 Super Admin Sovereign PIN Updated Successfully!');
        setTimeout(() => setToastMessage(''), 5000);
      } else {
        setSuperPinMsg({ type: 'error', text: d.message || d.error || 'Failed to update Super Admin PIN.' });
      }
    } catch (err) {
      setSuperPinMsg({ type: 'error', text: 'Network Error: ' + err.message });
    } finally {
      setSuperPinSaving(false);
    }
  };

  // ─── SMS / OTP PRICING ENGINE HANDLERS ─────────────────────────────────────
  const handleApplyTargetMargin = (targetMarginPct) => {
    const cost = Number(otpPricing.wholesaleCostPerSms) || 0.125;
    const marginFrac = targetMarginPct / 100;
    if (marginFrac >= 1) return;
    const calculatedBaseRate = Number((cost / (1 - marginFrac)).toFixed(3));
    handleRecalculatePacksFromBaseRate(calculatedBaseRate, true);
  };

  const handleRecalculatePacksFromBaseRate = (newBaseRate, autoSave = false) => {
    const base = parseFloat(newBaseRate) || 0.25;
    const defaultPacks = [
      { id: 'otp_500', name: 'Starter Micro Pack', credits: 500, tierMultiplier: 1.0, popular: false, desc: 'Quick top-up for small portals & testing' },
      { id: 'otp_1000', name: 'Starter Pro Pack', credits: 1000, tierMultiplier: 1.0, popular: false, desc: 'Ideal for coaching institute student logins and attendance alerts.' },
      { id: 'otp_2500', name: 'Growth Lite Pack', credits: 2500, tierMultiplier: 0.92, popular: false, desc: 'Great for growing academy & clinic booking portals.' },
      { id: 'otp_5000', name: 'Growth Business Pack', credits: 5000, tierMultiplier: 0.88, popular: true, desc: 'Best value for high-volume exam portals and member booking notifications.' },
      { id: 'otp_10000', name: 'Enterprise Scale Pack', credits: 10000, tierMultiplier: 0.80, popular: false, desc: 'Maximum savings with dedicated high-throughput DLT SMS routing.' },
      { id: 'otp_25000', name: 'Mega Enterprise Pack', credits: 25000, tierMultiplier: 0.72, popular: false, desc: 'Ultra-low bulk volume rate for large institutions.' },
    ];

    const currentPacks = (otpPricing.packages && otpPricing.packages.length === 6) ? otpPricing.packages : defaultPacks;

    const updatedPackages = currentPacks.map((pkg) => {
      let tierMultiplier = 1.0;
      if (pkg.credits >= 25000) tierMultiplier = 0.72;
      else if (pkg.credits >= 10000) tierMultiplier = 0.80;
      else if (pkg.credits >= 5000) tierMultiplier = 0.88;
      else if (pkg.credits >= 2500) tierMultiplier = 0.92;

      const ratePerSms = Number((base * tierMultiplier).toFixed(3));
      const price = Math.round(pkg.credits * ratePerSms);

      return {
        ...pkg,
        ratePerSms,
        price,
      };
    });

    const newPricingObj = {
      ...otpPricing,
      baseRetailRatePerSms: base,
      packages: updatedPackages,
    };

    setOtpPricing(newPricingObj);

    if (autoSave) {
      handleSaveOtpPricing(newPricingObj);
    }
  };

  const handleUpdatePackField = (index, field, value) => {
    setOtpPricing((prev) => {
      const nextPacks = [...(prev.packages || [])];
      const target = { ...nextPacks[index] };

      if (field === 'ratePerSms') {
        const rate = parseFloat(value) || 0;
        target.ratePerSms = rate;
        target.price = Math.round((target.credits || 1000) * rate);
      } else if (field === 'price') {
        const price = parseFloat(value) || 0;
        target.price = price;
        target.ratePerSms = Number((price / (target.credits || 1)).toFixed(3));
      } else if (field === 'credits') {
        const numCredits = parseInt(value) || 100;
        target.credits = numCredits;
        target.price = Math.round(numCredits * (target.ratePerSms || 0.25));
      } else {
        target[field] = value;
      }

      nextPacks[index] = target;
      return { ...prev, packages: nextPacks };
    });
  };

  const handleOpenAddPlanModal = () => {
    const base = Number(otpPricing.baseRetailRatePerSms) || 0.25;
    const defaultCredits = 15000;
    const defaultRate = Number((base * 0.78).toFixed(3));
    const defaultPrice = Math.round(defaultCredits * defaultRate);

    setNewPlanForm({
      name: '',
      credits: defaultCredits,
      ratePerSms: defaultRate,
      price: defaultPrice,
      desc: '',
      popular: false,
    });
    setIsAddPlanModalOpen(true);
  };

  const handleNewPlanFormChange = (field, value) => {
    setNewPlanForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'credits') {
        const cr = parseInt(value) || 0;
        const rt = Number(prev.ratePerSms) || 0.25;
        updated.credits = cr;
        updated.price = Math.round(cr * rt);
      } else if (field === 'ratePerSms') {
        const rt = parseFloat(value) || 0;
        const cr = Number(prev.credits) || 1000;
        updated.ratePerSms = rt;
        updated.price = Math.round(cr * rt);
      } else if (field === 'price') {
        const pr = parseFloat(value) || 0;
        const cr = Number(prev.credits) || 1000;
        updated.price = pr;
        updated.ratePerSms = Number((pr / (cr || 1)).toFixed(3));
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const handleSubmitNewPlan = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newPlanForm.name.trim()) {
      alert('Please enter a Plan Name (e.g. "Corporate Agency Jumbo Pack")');
      return;
    }
    const credits = Number(newPlanForm.credits) || 0;
    if (credits < 100) {
      alert('Please enter valid SMS credits (minimum 100 SMS)');
      return;
    }

    const newId = `otp_${Date.now()}`;
    const newPack = {
      id: newId,
      name: newPlanForm.name.trim(),
      credits: credits,
      ratePerSms: Number(newPlanForm.ratePerSms) || 0.25,
      price: Number(newPlanForm.price) || Math.round(credits * 0.25),
      desc: newPlanForm.desc.trim() || `High-capacity top-up quota of ${credits.toLocaleString('en-IN')} SMS credits for client notifications and logins.`,
      popular: !!newPlanForm.popular,
    };

    const newPricing = {
      ...otpPricing,
      packages: [...(otpPricing.packages || []), newPack],
    };

    setOtpPricing(newPricing);
    setIsAddPlanModalOpen(false);
    await handleSaveOtpPricing(newPricing);
  };

  const handleRemovePack = async (indexToRemove) => {
    const currentPacks = Array.isArray(otpPricing?.packages) ? [...otpPricing.packages] : [];
    if (currentPacks.length <= 1) {
      alert('⚠️ You must keep at least 1 active recharge package.');
      return;
    }
    const packName = currentPacks[indexToRemove]?.name || 'this plan';
    const updated = currentPacks.filter((_, idx) => idx !== indexToRemove);
    const newPricing = {
      ...otpPricing,
      packages: updated,
    };
    setOtpPricing(newPricing);
    await handleSaveOtpPricing(newPricing);
  };

  const handleSaveOtpPricing = async (explicitPricing = null, explicitGateway = null) => {
    setPricingSaving(true);
    setPricingNotice(null);
    const targetPricing = explicitPricing || otpPricing;
    const targetGateway = explicitGateway || gatewayConfig;
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken || 'adm_session_token_2026'}`,
        'x-super-token': superAdminToken || '9835',
      };

      // 1. Save Gateway Config
      const gwPromise = fetch(`${API_BASE}/api/admin/super/otp/gateway-config`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          provider: targetGateway.provider || 'Fast2SMS Enterprise DLT Gateway',
          apiKey: targetGateway.apiKey || '',
          senderId: targetGateway.senderId || 'FIXKAR',
          route: targetGateway.route || 'dlt_manual',
          alertThreshold: targetGateway.alertThreshold || 5000,
        }),
      });

      // 2. Save Pricing Config
      const pricingPromise = fetch(`${API_BASE}/api/super-admin/otp/pricing-config`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          baseRetailRatePerSms: targetPricing.baseRetailRatePerSms || 0.25,
          wholesaleCostPerSms: targetPricing.wholesaleCostPerSms || 0.125,
          packages: targetPricing.packages,
          customCalculator: targetPricing.customCalculator,
        }),
      });

      const [gwRes, pRes] = await Promise.all([gwPromise, pricingPromise]);
      const pData = await pRes.json();

      if (pRes.ok && pData.success) {
        setPricingNotice(`✅ Master Fast2SMS Gateway credentials & all ${(targetPricing.packages || []).length} SMS recharge pack prices published live!`);
        setTimeout(() => setPricingNotice(null), 6000);
        if (pData.pricing) setOtpPricing(pData.pricing);
      } else {
        alert('Error updating pricing: ' + (pData.message || pData.error));
      }
    } catch (err) {
      alert('Error updating gateway and pricing: ' + err.message);
    } finally {
      setPricingSaving(false);
    }
  };

  const handleSuperUpdateProject = async (projectId, updates) => {
    // 1. Instant optimistic UI update
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p)));
    setProjectApprovingId(projectId);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
      'x-super-token': superAdminToken || '9835',
    };
    try {
      const res = await fetch(`${API_BASE}/api/super-admin/projects/${projectId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.project) {
        setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...data.project } : p)));
        setToastMessage(`✓ Super Admin: Stage updated to "${data.project.sprintStatus}". Syncing live to Admin & Client.`);
        setTimeout(() => setToastMessage(''), 4000);
      } else {
        setToastMessage(`⚠️ ${data.error || 'Failed to update project'}`);
        setTimeout(() => setToastMessage(''), 4000);
        fetchAllSuperData();
      }
    } catch (err) {
      console.error('[Super Admin project update error]', err);
      fetchAllSuperData();
    } finally {
      setProjectApprovingId(null);
    }
  };

  const handleBulkAuthorizeAll = async (type) => {
    const isTesting = type === 'testing';
    const isLive = type === 'live';
    const isBoth = type === 'both';

    for (const p of projects) {
      const updates = {};
      if (isTesting || isBoth) updates.superAdminApprovedTesting = true;
      if (isLive || isBoth) updates.superAdminApprovedLive = true;
      await handleSuperUpdateProject(p.id, updates);
    }
    setToastMessage(`👑 Bulk Action Applied: All projects authorized for ${type}!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  useEffect(() => {
    fetchAllSuperData();
  }, [adminToken, superAdminToken]);

  // Sync Live Fast2SMS Balance
  const handleSyncGatewayBalance = async () => {
    setGatewaySyncing(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/sync-upstream-balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835' }),
      });
      const data = await res.json();
      if (data.success) {
        setGatewayConfig((prev) => ({
          ...prev,
          upstreamWalletAmount: data.upstreamWalletAmount,
          upstreamBalance: data.upstreamBalance,
          status: data.status,
          lastSyncedTimestamp: data.lastSyncedTimestamp,
        }));
        setPricingNotice(`✅ ${data.message || 'Fast2SMS Upstream Balance Synced Successfully!'}`);
        setTimeout(() => setPricingNotice(null), 5000);
      } else {
        alert(data.message || 'Failed to sync balance');
      }
    } catch (err) {
      alert('Error syncing balance: ' + err.message);
    } finally {
      setGatewaySyncing(false);
    }
  };

  // Save Gateway Configuration
  const handleSaveGatewayConfig = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setGatewaySaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/gateway-config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          ...gatewayConfig,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPricingNotice('✅ Master Fast2SMS Gateway Configuration Saved!');
        setTimeout(() => setPricingNotice(null), 5000);
      } else {
        alert(data.message || 'Failed to save configuration');
      }
    } catch (err) {
      alert('Error saving configuration: ' + err.message);
    } finally {
      setGatewaySaving(false);
    }
  };

  // ─── Renewal Radar Handlers ───────────────────────────────────────────────
  const handleSendRenewalEmail = async (r) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/renewals/${r.id || r.clientId}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835' }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`✅ Renewal email sent to ${r.clientName}`);
        setTimeout(() => setToastMessage(''), 5000);
        setRenewals((prev) => prev.map((x) => (x.id === r.id ? { ...x, emailSent: true } : x)));
      } else {
        alert(data.message || 'Failed to send renewal email');
      }
    } catch (err) {
      alert('Error sending email: ' + err.message);
    }
  };

  const handleMarkRenewalPaid = (r) => {
    setRenewals((prev) =>
      prev.map((x) =>
        x.id === r.id ? { ...x, daysRemaining: 365, renewalDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10) } : x
      )
    );
    setToastMessage(`✅ ${r.clientName} renewed +1 Year`);
    setTimeout(() => setToastMessage(''), 5000);
  };

  // ─── Support Ticket Handlers (Super Admin & Admin Resolvable) ──────────────
  const handleUpdateTicket = async (ticketId, updates) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, ...data.ticket } : t))
        );
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket((prev) => ({ ...prev, ...data.ticket }));
        }
        setToastMessage(`✅ Ticket ${ticketId} updated successfully`);
        setTimeout(() => setToastMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error updating support ticket:', err);
      alert('Error updating support ticket: ' + err.message);
    }
  };

  const handleResolveTicket = async (ticketId) => {
    await handleUpdateTicket(ticketId, { status: 'Resolved' });
    setToastMessage(`✅ Ticket ${ticketId} marked as Resolved!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };

  const handleCreateTicketSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/admin/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify(newTicketForm),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportTickets((prev) => [data.ticket, ...prev]);
        setIsNewTicketModalOpen(false);
        setNewTicketForm({
          clientCode: '',
          clientId: '',
          client: '',
          phone: '',
          email: '',
          domain: '',
          subject: '',
          description: '',
          priority: 'Medium',
          status: 'Open',
        });
        setToastMessage(`✅ Support Ticket ${data.ticket.id} created!`);
        setTimeout(() => setToastMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error creating support ticket:', err);
      alert('Error creating support ticket: ' + err.message);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm(`Delete support ticket ${ticketId}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/${ticketId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
      });
      if (res.ok) {
        setSupportTickets((prev) => prev.filter((t) => t.id !== ticketId));
        if (isTicketModalOpen && selectedTicket?.id === ticketId) {
          setIsTicketModalOpen(false);
          setSelectedTicket(null);
        }
        setToastMessage(`🗑️ Ticket ${ticketId} deleted`);
        setTimeout(() => setToastMessage(''), 4000);
      }
    } catch (err) {
      console.error('Error deleting support ticket:', err);
      alert('Error deleting support ticket: ' + err.message);
    }
  };


  // Generate Client API Key
  const handleGenerateClientApiKey = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newApiKeyForm.clientCode) {
      alert('Please select a client to generate their isolated API key');
      return;
    }
    if (newApiKeyForm.allocationType === 'BANK_TRANSFER' && !newApiKeyForm.utrNumber.trim()) {
      alert('⚠️ Please enter a valid 12-digit Bank / UPI UTR Transaction Reference Number.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/generate-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          clientCode: newApiKeyForm.clientCode,
          clientName: newApiKeyForm.clientName,
          dltSenderId: newApiKeyForm.dltSenderId,
          packId: newApiKeyForm.packId,
          credits: Number(newApiKeyForm.credits) || 500,
          price: Number(newApiKeyForm.price) || 0,
          allocationType: newApiKeyForm.allocationType,
          utrNumber: newApiKeyForm.utrNumber.trim(),
          notes: newApiKeyForm.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🎉 ${data.message}`);
        setTimeout(() => setToastMessage(''), 6000);
        setIsGenerateApiKeyModalOpen(false);
        setNewApiKeyForm({
          clientCode: '',
          clientName: '',
          dltSenderId: '',
          packId: 'otp_500',
          credits: 500,
          price: 125,
          allocationType: 'COMPLIMENTARY',
          utrNumber: '',
          notes: 'Starter Onboarding Allotment',
        });
        fetchAllSuperData();
        if (data.apiKeyRecord) setSelectedApiKeyForSnippet(data.apiKeyRecord);
      } else {
        alert(data.message || 'Failed to generate client API key');
      }
    } catch (err) {
      alert('Error generating API key: ' + err.message);
    }
  };

  // Top-Up / Add SMS Credits to Existing API Key & Wallet
  const handleTopUpClientWallet = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!topupModalKey?.clientCode) return;
    if (topupForm.allocationType === 'BANK_TRANSFER' && !topupForm.utrNumber.trim()) {
      alert('⚠️ Please enter a valid 12-digit Bank / UPI UTR Transaction Reference Number.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/topup-client-wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({
          superAdminKey: superAdminToken || '9835',
          clientCode: topupModalKey.clientCode,
          packId: topupForm.packId,
          credits: Number(topupForm.credits) || 500,
          price: Number(topupForm.price) || 0,
          allocationType: topupForm.allocationType,
          utrNumber: topupForm.utrNumber.trim(),
          notes: topupForm.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🎉 ${data.message}`);
        setTimeout(() => setToastMessage(''), 6000);
        setTopupModalKey(null);
        fetchAllSuperData();
      } else {
        alert(data.message || 'Failed to top-up wallet');
      }
    } catch (err) {
      alert('Error topping up credits: ' + err.message);
    }
  };

  // Toggle API Key (Active / Suspended)
  const handleToggleClientApiKey = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/toggle-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835', id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setClientApiKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: nextStatus } : k)));
        setToastMessage(`Status updated to ${nextStatus}`);
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error toggling key:', err);
    }
  };

  // Rotate Key String
  const handleRotateClientApiKey = async (id, clientName) => {
    if (!window.confirm(`⚠️ Rotate API Key for ${clientName}? Old API key will stop working immediately.`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/rotate-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835', id }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🔄 ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllSuperData();
      }
    } catch (err) {
      alert('Error rotating key: ' + err.message);
    }
  };

  // Delete / Revoke API Key
  const handleDeleteClientApiKey = async (id, clientName) => {
    if (!window.confirm(`🚨 Permanently revoke and delete API key for ${clientName}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/client-api-keys/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminToken || '9835',
        },
      });
      const data = await res.json();
      if (data.success) {
        setClientApiKeys((prev) => prev.filter((k) => k.id !== id));
        setToastMessage('API key revoked.');
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting key:', err);
    }
  };

  // Confirm Provisional Top-Up
  const handleConfirmProvisional = async (provId) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/otp/provisional-recharges/${provId}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835' }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`✅ ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllSuperData();
      } else {
        alert(data.message || data.error || 'Failed to confirm deposit.');
      }
    } catch (err) {
      alert('Error confirming deposit: ' + err.message);
    }
  };

  // Reject Provisional Top-Up (Instant Rollback)
  const handleRejectProvisional = async (provId) => {
    const reason = window.prompt('Reason for rejecting provisional recharge (e.g. UTR not found in bank statement):');
    if (reason === null) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/otp/provisional-recharges/${provId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: superAdminToken || '9835', reason }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🚫 ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllSuperData();
      } else {
        alert(data.message || data.error || 'Failed to reject deposit.');
      }
    } catch (err) {
      alert('Error rejecting deposit: ' + err.message);
    }
  };

  const pendingProvisionalCount = provisionalRecharges.filter((p) => p.status === 'PENDING_SUPER_ADMIN').length;
  const totalDistributedCredits = wallets.reduce((a, b) => a + (b.availableCredits || 0), 0);
  const totalApiDispatches = clientApiKeys.reduce((a, b) => a + (b.totalRequests || 0), 0);

  return (
    <div className="fixkar-admin-root">
      {/* ─── LEFT SIDEBAR (EXACT ADMIN ARCHITECTURE) ────────────────────────── */}
      <aside className="fixkar-sidebar no-print">
        <div>
          {/* Brand Header (Centered) */}
          <div
            className="fixkar-sidebar-brand"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '8px 0 14px',
              gap: '5px',
            }}
          >
            {/* Theme-Native Royal King Crown Vector (100% Blended) */}
            <ThemeKingCrown size={46} />

            {/* FIXKAR Name (Centered) */}
            <div style={{ fontWeight: 900, letterSpacing: '0.08em', color: '#fff', fontSize: '1.25rem', lineHeight: 1.1 }}>
              FIXKAR
            </div>

            {/* GOD-MODE Below FIXKAR */}
            <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#FBBF24', letterSpacing: '0.14em', fontWeight: 800 }}>
              GOD-MODE
            </div>
          </div>

          {/* Super Admin User Profile Card */}
          <div className="fixkar-sidebar-user" style={{ border: '1px solid rgba(245, 158, 11, 0.25)', background: 'rgba(245, 158, 11, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                }}
              >
                👑
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {superUser?.name || 'Lead Architect & Founder'}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#FDE047', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {superUser?.username || 'fixkar_root'} (GOD-MODE)
                </div>
              </div>
            </div>
          </div>

          {/* GROUP 1: ROOT COMMANDS */}
          <div className="fixkar-nav-heading">LAYER 2 ROOT SOVEREIGNTY</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {/* Tab 0: Super Dashboard Overview */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`fixkar-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={14} color={activeTab === 'dashboard' ? '#38BDF8' : 'currentColor'} />
                <span>Super Dashboard</span>
              </div>
            </button>

            {/* Tab: Project Approvals & Release Governance */}
            <button
              type="button"
              onClick={() => setActiveTab('projects-governance')}
              className={`fixkar-nav-btn ${activeTab === 'projects-governance' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={14} color={activeTab === 'projects-governance' ? '#38BDF8' : 'currentColor'} />
                <span>Project Approvals</span>
              </div>
              {superStats?.pendingApprovals > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {superStats.pendingApprovals}
                </span>
              )}
            </button>

            {/* Unified Tab: SMS Gateway & Pricing */}
            <button
              type="button"
              onClick={() => setActiveTab('gateway')}
              className={`fixkar-nav-btn ${activeTab === 'gateway' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={14} color={activeTab === 'gateway' ? '#38BDF8' : 'currentColor'} />
                <span>SMS Gateway &amp; Pricing</span>
              </div>
            </button>

            {/* Tab 2: Client API Studio */}
            <button
              type="button"
              onClick={() => setActiveTab('client-apis')}
              className={`fixkar-nav-btn ${activeTab === 'client-apis' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={14} color={activeTab === 'client-apis' ? '#38BDF8' : 'currentColor'} />
                <span>Client API Studio</span>
              </div>
            </button>

            {/* Tab 3: Provisional Reconciliation */}
            <button
              type="button"
              onClick={() => setActiveTab('provisional')}
              className={`fixkar-nav-btn ${activeTab === 'provisional' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color={activeTab === 'provisional' ? '#38BDF8' : 'currentColor'} />
                <span>48h Bank Radar</span>
              </div>
              {pendingProvisionalCount > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(245, 158, 11, 0.2)', color: '#FDE047', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {pendingProvisionalCount}
                </span>
              )}
            </button>

            {/* Tab: Renewal Radar */}
            <button
              type="button"
              onClick={() => setActiveTab('renewals')}
              className={`fixkar-nav-btn ${activeTab === 'renewals' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} color={activeTab === 'renewals' ? '#38BDF8' : 'currentColor'} />
                <span>Renewal Radar</span>
              </div>
              {(() => {
                const dueRenewals = (renewals || []).filter((r) => (r?.daysRemaining ?? 999) <= 15).length;
                if (dueRenewals === 0) return null;
                return (
                  <span style={{ fontSize: '0.62rem', background: 'rgba(239, 68, 68, 0.2)', color: '#FDA4AF', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                    {dueRenewals}
                  </span>
                );
              })()}
            </button>

            {/* Tab: Support Tickets */}
            <button
              type="button"
              onClick={() => setActiveTab('support')}
              className={`fixkar-nav-btn ${activeTab === 'support' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LifeBuoy size={14} color={activeTab === 'support' ? '#38BDF8' : 'currentColor'} />
                <span>Support Tickets</span>
              </div>
              {(() => {
                const openCount = (supportTickets || []).filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
                if (openCount === 0) return null;
                return (
                  <span style={{ fontSize: '0.62rem', background: 'rgba(244, 63, 94, 0.2)', color: '#FDA4AF', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                    {openCount}
                  </span>
                );
              })()}
            </button>

            {/* Tab: Master Credential & Security Governance */}
            <button
              type="button"
              onClick={() => setActiveTab('security-credentials')}
              className={`fixkar-nav-btn ${activeTab === 'security-credentials' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color={activeTab === 'security-credentials' ? '#FDE047' : '#F59E0B'} />
                <span>Security &amp; Passwords</span>
              </div>
            </button>

            {/* Tab: Inbound Client Mail */}
            <button
              type="button"
              onClick={() => setActiveTab('emails')}
              className={`fixkar-nav-btn ${activeTab === 'emails' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color={activeTab === 'emails' ? '#38BDF8' : '#94A3B8'} />
                <span>Inbound Client Mail</span>
              </div>
              {(() => {
                const unreadCount = (inboundEmails || []).filter((e) => e.status === 'UNREAD').length;
                if (unreadCount === 0) return null;
                return (
                  <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                    {unreadCount}
                  </span>
                );
              })()}
            </button>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <button
            type="button"
            onClick={exitSuperAdmin}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FDA4AF',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={13} />
            <span>Exit Super Admin (Back to Normal)</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              padding: '7px 12px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Globe size={13} />
            <span>Public Site</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN WORKSPACE (EXACT ADMIN CONSOLE ARCHITECTURE) ──────────────── */}
      <main className="fixkar-workspace">
        {/* Top Operational Bar */}
        <div className="fixkar-topbar no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: '#FBBF24', letterSpacing: '0.08em' }}>
              SUPER ADMIN ROOT / {activeTab.toUpperCase()}
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '2px 0 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {activeTab === 'dashboard' && 'Super Admin Command & Telemetry Matrix'}
              {activeTab === 'projects-governance' && 'Project QA Testing & Live Release Governance (Master Gate)'}
              {activeTab === 'gateway' && 'Master SMS Gateway & Upstream Connection'}
              {activeTab === 'client-apis' && 'Client-Specific Isolated API Provisioning'}
              {activeTab === 'provisional' && '48-Hour Bank Statement Reconciliation Radar'}
              {activeTab === 'renewals' && 'Server & Domain Renewal Radar — All Clients'}
              {activeTab === 'support' && 'Client Support Helpdesk & Maintenance Tickets'}
              {activeTab === 'security-credentials' && 'Master Credential & Password Governance (Super Admin Exclusivity)'}
              {activeTab === 'emails' && 'Client Inbound Emails (support@fixkar.co.in)'}
              <span style={{ fontSize: '0.66rem', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#FDE047', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                ● GOD-MODE ACTIVE
              </span>
            </h1>
          </div>

          {/* Right Side: IST Clock, Sync & Quick Action Toolbar with Red Emergency Power Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '6px 12px', color: '#93C5FD', fontFamily: 'monospace', fontWeight: 700 }}>
              IST: {currentTime}
            </div>

            <button
              type="button"
              onClick={fetchAllSuperData}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#CBD5E1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Sync Super Admin Telemetry"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Sync</span>
            </button>

            {/* Glowing Red Emergency Kill-Switch Power Button */}
            <button
              type="button"
              onClick={() => {
                setShowKillSwitchModal(true);
                setKillSwitchSuperPin('');
                setKillSwitchAdminPass('');
                setKillSwitchReason('');
                setKillSwitchError('');
              }}
              style={{
                background: isKillSwitchActive
                  ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
                  : 'rgba(239, 68, 68, 0.14)',
                border: `1px solid ${isKillSwitchActive ? '#EF4444' : 'rgba(239, 68, 68, 0.5)'}`,
                borderRadius: '8px',
                padding: '6px 14px',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                boxShadow: isKillSwitchActive
                  ? '0 0 22px rgba(239, 68, 68, 0.85), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                  : '0 0 12px rgba(239, 68, 68, 0.25)',
                transition: 'all 0.2s ease',
              }}
              title="Global System Emergency Kill-Switch (Dual-Key Auth Required)"
            >
              <Power size={14} color={isKillSwitchActive ? '#fff' : '#EF4444'} style={{ filter: 'drop-shadow(0 0 6px #EF4444)' }} />
              <span style={{ color: isKillSwitchActive ? '#fff' : '#FDA4AF', fontWeight: 800, letterSpacing: '0.02em' }}>
                {isKillSwitchActive ? 'LOCKDOWN ACTIVE' : 'KILL SWITCH'}
              </span>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: isKillSwitchActive ? '#EF4444' : '#4ADE80',
                  boxShadow: isKillSwitchActive ? '0 0 8px #EF4444' : '0 0 8px #4ADE80',
                }}
              />
            </button>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            TAB 0: SUPER DASHBOARD (EXCLUSIVE COMPACT OVERVIEW CARDS + MATRIX)
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 3 Compact, Balanced KPI Cards (Exclusively in Super Dashboard) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
              {/* Card 1: Fast2SMS Master Pool */}
              <div
                className="fixkar-stat-card"
                onClick={() => setActiveTab('gateway')}
                style={{ cursor: 'pointer', padding: '14px 16px' }}
              >
                <div className="fixkar-card-top" style={{ marginBottom: '6px' }}>
                  <span className="fixkar-card-tag" style={{ fontSize: '0.66rem' }}>UPSTREAM FAST2SMS POOL</span>
                  <Globe size={16} color="#FBBF24" />
                </div>
                <div className="fixkar-card-num" style={{ color: '#FDE047', fontSize: '1.28rem', marginBottom: '6px' }}>
                  {(gatewayConfig.upstreamBalance || 24250).toLocaleString()}{' '}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94A3B8' }}>SMS</span>
                </div>
                <div className="fixkar-card-footer" style={{ fontSize: '0.72rem' }}>
                  <span style={{ color: '#4ADE80' }}>● {gatewayConfig.status}</span>
                  <span style={{ color: '#93C5FD' }}>Reserve: {gatewayConfig.upstreamWalletAmount}</span>
                </div>
              </div>

              {/* Card 2: Client Distributed Pool */}
              <div
                className="fixkar-stat-card"
                onClick={() => setActiveTab('client-apis')}
                style={{ cursor: 'pointer', padding: '14px 16px' }}
              >
                <div className="fixkar-card-top" style={{ marginBottom: '6px' }}>
                  <span className="fixkar-card-tag" style={{ fontSize: '0.66rem' }}>CLIENT DISTRIBUTED POOL</span>
                  <Smartphone size={16} color="#38BDF8" />
                </div>
                <div className="fixkar-card-num" style={{ color: '#38BDF8', fontSize: '1.28rem', marginBottom: '6px' }}>
                  {totalDistributedCredits.toLocaleString()}{' '}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94A3B8' }}>OTPs</span>
                </div>
                <div className="fixkar-card-footer" style={{ fontSize: '0.72rem' }}>
                  <span style={{ color: '#4ADE80' }}>● Realtime Atomic Deduction</span>
                  <span style={{ color: '#94A3B8' }}>{wallets.length || 4} Clients</span>
                </div>
              </div>

              {/* Card 3: Provisioned Client API Keys */}
              <div
                className="fixkar-stat-card"
                onClick={() => setActiveTab('client-apis')}
                style={{ cursor: 'pointer', padding: '14px 16px' }}
              >
                <div className="fixkar-card-top" style={{ marginBottom: '6px' }}>
                  <span className="fixkar-card-tag" style={{ fontSize: '0.66rem' }}>PROVISIONED CLIENT KEYS</span>
                  <KeyRound size={16} color="#4ADE80" />
                </div>
                <div className="fixkar-card-num" style={{ color: '#4ADE80', fontSize: '1.28rem', marginBottom: '6px' }}>
                  {clientApiKeys.length}{' '}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94A3B8' }}>Active Keys</span>
                </div>
                <div className="fixkar-card-footer" style={{ fontSize: '0.72rem' }}>
                  <span style={{ color: '#86EFAC' }}>● 100% Isolated Sub-keys</span>
                  <span style={{ color: '#94A3B8' }}>{totalApiDispatches.toLocaleString()} Sent</span>
                </div>
              </div>
            </div>

            {/* Root Sovereignty Quick Command Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {/* Box 1: Upstream Gateway Telemetry */}
              <div className="fixkar-panel" style={{ padding: '18px 20px' }}>
                <div className="fixkar-panel-head" style={{ marginBottom: '12px' }}>
                  <div className="fixkar-panel-title">
                    <Globe size={15} color="#FBBF24" />
                    <span>Master Upstream Gateway Health</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('gateway')}
                    style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#FDE047', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Configure →
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#94A3B8' }}>Provider:</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{gatewayConfig.provider || 'Fast2SMS Enterprise DLT Gateway'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#94A3B8' }}>Delivery Route:</span>
                    <span style={{ color: '#93C5FD', fontFamily: 'monospace' }}>
                      {gatewayConfig.route === 'otp' ? 'Quick OTP Route (Instant Verification)' : gatewayConfig.route === 'v3' ? 'Fast2SMS v3 Route' : 'DLT Manual Approved Templates'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                    <span style={{ color: '#94A3B8' }}>Sender Header:</span>
                    <span style={{ color: '#FDE047', fontFamily: 'monospace', fontWeight: 700 }}>{gatewayConfig.senderId || 'FIXKAR'}</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Quick Sovereign Shortcuts */}
              <div className="fixkar-panel" style={{ padding: '18px 20px' }}>
                <div className="fixkar-panel-head" style={{ marginBottom: '12px' }}>
                  <div className="fixkar-panel-title">
                    <Zap size={15} color="#38BDF8" />
                    <span>Sovereign Command Shortcuts</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('support')}
                    style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <LifeBuoy size={13} />
                      <span>Support Tickets</span>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>
                      {(supportTickets || []).filter((t) => t.status === 'Open' || t.status === 'In Progress').length} Active Tasks
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('renewals')}
                    style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.25)', borderRadius: '8px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <div style={{ color: '#FBBF24', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} />
                      <span>Renewal Radar</span>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>
                      {(renewals || []).length} Client Domains/VPS
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('client-apis')}
                    style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.78rem' }}>Client API Studio</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>Manage {clientApiKeys.length} sub-keys</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('provisional')}
                    style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '8px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.78rem' }}>48h Bank Radar</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>{pendingProvisionalCount} pending match</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowKillSwitchModal(true);
                      setKillSwitchSuperPin('');
                      setKillSwitchAdminPass('');
                      setKillSwitchReason('');
                      setKillSwitchError('');
                    }}
                    style={{ background: isKillSwitchActive ? 'rgba(239, 68, 68, 0.22)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${isKillSwitchActive ? '#EF4444' : 'rgba(239, 68, 68, 0.35)'}`, borderRadius: '8px', padding: '10px 12px', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px' }}
                  >
                    <div style={{ color: isKillSwitchActive ? '#EF4444' : '#FDA4AF', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Power size={13} color={isKillSwitchActive ? '#EF4444' : '#FDA4AF'} />
                      <span>{isKillSwitchActive ? 'Lockdown Active' : 'System Kill-Switch'}</span>
                    </div>
                    <div style={{ color: isKillSwitchActive ? '#FCA5A5' : '#94A3B8', fontSize: '0.68rem' }}>
                      {isKillSwitchActive ? '⚡ Tap to disarm / resume' : 'Dual-key emergency freeze'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Wholesale Profit Ledger (100% Dynamic Unit Economics) ───── */}
            {(() => {
              const wholesale = Number(otpPricing.wholesaleCostPerSms) || 0.125;
              const baseRate = Number(otpPricing.baseRetailRatePerSms) || 0.25;
              const packs = otpPricing.packages || [];
              const rates = packs.map((p) => Number(p.ratePerSms) || baseRate);
              const minRateVal = rates.length ? Math.min(...rates) : baseRate * 0.72;
              const maxRateVal = rates.length ? Math.max(...rates) : baseRate;
              const minMarginPct = minRateVal > 0 ? (((minRateVal - wholesale) / minRateVal) * 100).toFixed(0) : '0';
              const maxMarginPct = maxRateVal > 0 ? (((maxRateVal - wholesale) / maxRateVal) * 100).toFixed(0) : '50';

              return (
                <div className="fixkar-panel" style={{ marginTop: '0' }}>
                  <div className="fixkar-panel-head">
                    <div className="fixkar-panel-title">
                      <TrendingUp size={15} color="#4ADE80" />
                      <span>💰 Live Wholesale Profit Ledger</span>
                    </div>
                    <span style={{ fontSize: '0.66rem', color: '#86EFAC', fontFamily: 'monospace', fontWeight: 700 }}>
                      REAL-TIME UNIT ECONOMICS
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '14px' }}>
                    Transparent unit economics — dynamically calculated from your live Gateway Wholesale Cost &amp; Recharge Matrix.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div style={{ background: 'rgba(253, 224, 71, 0.04)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(253, 224, 71, 0.15)' }}>
                      <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>Wholesale Fast2SMS Cost</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FDE047', fontFamily: 'monospace', margin: '5px 0 3px' }}>
                        ₹{wholesale.toFixed(3)} <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>/ OTP</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Live Carrier Base Rate</div>
                    </div>
                    <div style={{ background: 'rgba(56, 189, 248, 0.04)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                      <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>Client Retail Sell Price</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace', margin: '5px 0 3px' }}>
                        ₹{minRateVal.toFixed(2)} – ₹{maxRateVal.toFixed(2)} <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>/ OTP</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Client Recharge Package Rate</div>
                    </div>
                    <div style={{ background: 'rgba(74, 222, 128, 0.06)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                      <div style={{ fontSize: '0.65rem', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>Fixkar Studio Net Margin</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace', margin: '5px 0 3px' }}>
                        +{minMarginPct}% to +{maxMarginPct}%
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Real-time Gross Profit Margin</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB: PROJECT APPROVALS & RELEASE GOVERNANCE (MASTER RELEASE GATE)
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'projects-governance' && (() => {
          const totalProjs = projects.length;
          const testingApprovedCount = projects.filter((p) => p.superAdminApprovedTesting).length;
          const liveApprovedCount = projects.filter((p) => p.superAdminApprovedLive).length;
          const fullyClearedCount = projects.filter((p) => p.superAdminApprovedTesting && p.superAdminApprovedLive).length;
          const pendingCount = totalProjs - fullyClearedCount;

          // Filter logic
          const filteredProjects = projects.filter((proj) => {
            const q = projectSearchQuery.toLowerCase().trim();
            const matchesSearch =
              !q ||
              (proj.clientName || '').toLowerCase().includes(q) ||
              (proj.clientCode || '').toLowerCase().includes(q) ||
              (proj.domain || '').toLowerCase().includes(q) ||
              (proj.sprintStatus || '').toLowerCase().includes(q);

            if (!matchesSearch) return false;

            if (projectFilterState === 'needs-testing') return !proj.superAdminApprovedTesting;
            if (projectFilterState === 'needs-live') return !proj.superAdminApprovedLive;
            if (projectFilterState === 'cleared') return proj.superAdminApprovedTesting && proj.superAdminApprovedLive;
            return true;
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '4px 0 24px 0' }}>
              {/* 1. TOP GOVERNANCE TELEMETRY CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
                {/* Card 1: Total Managed Deliverables */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 100%)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#93C5FD', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      TOTAL MANAGED PROJECTS
                    </span>
                    <Globe size={16} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace', lineHeight: 1.1 }}>
                    {totalProjs}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
                    Active client web deliverables
                  </div>
                </div>

                {/* Card 2: QA Testing Authorized (Stage 2) */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 100%)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#FDE047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      QA TESTING GATE (STAGE 2)
                    </span>
                    <ShieldAlert size={16} color="#F59E0B" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#F59E0B', fontFamily: 'monospace', lineHeight: 1.1 }}>
                      {testingApprovedCount} / {totalProjs}
                    </div>
                    <span style={{ fontSize: '0.66rem', background: 'rgba(245, 158, 11, 0.18)', color: '#FDE047', padding: '2px 7px', borderRadius: '4px', fontWeight: 800 }}>
                      {totalProjs > 0 ? Math.round((testingApprovedCount / totalProjs) * 100) : 0}% Approved
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px' }}>
                    Regular Admin permitted to run QA
                  </div>
                </div>

                {/* Card 3: Live Production Cleared (Stage 5) */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 100%)', border: '1px solid rgba(74, 222, 128, 0.35)', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#86EFAC', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      LIVE DEPLOY GATE (STAGE 5)
                    </span>
                    <Zap size={16} color="#4ADE80" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace', lineHeight: 1.1 }}>
                      {liveApprovedCount} / {totalProjs}
                    </div>
                    <span style={{ fontSize: '0.66rem', background: 'rgba(74, 222, 128, 0.18)', color: '#86EFAC', padding: '2px 7px', borderRadius: '4px', fontWeight: 800 }}>
                      {totalProjs > 0 ? Math.round((liveApprovedCount / totalProjs) * 100) : 0}% Cleared
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px' }}>
                    Production DNS &amp; live deploy allowed
                  </div>
                </div>

                {/* Card 4: Governance Action Status */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 100%)', border: `1px solid ${pendingCount > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(168, 85, 247, 0.35)'}`, borderRadius: '16px', padding: '18px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: pendingCount > 0 ? '#FCA5A5' : '#D8B4FE', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      PENDING CLEARANCES
                    </span>
                    <Crown size={16} color={pendingCount > 0 ? '#F87171' : '#C084FC'} />
                  </div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: pendingCount > 0 ? '#F87171' : '#C084FC', fontFamily: 'monospace', lineHeight: 1.1 }}>
                    {pendingCount === 0 ? 'All Clear' : `${pendingCount} Pending`}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px' }}>
                    {pendingCount === 0 ? 'Zero bottlenecks in pipeline' : 'Projects waiting for Super Admin review'}
                  </div>
                </div>
              </div>

              {/* 2. MASTER GOVERNANCE POLICY EXECUTIVE BANNER */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(20, 30, 50, 0.8) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '16px',
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '300px' }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.08) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '10px', borderRadius: '12px', color: '#FDE047', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 900, color: '#fff', fontSize: '0.94rem', letterSpacing: '0.02em' }}>
                        Dual-Gate Release Governance Active
                      </span>
                      <span style={{ fontSize: '0.64rem', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#fff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800 }}>
                        ROOT ENFORCED
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#CBD5E1', marginTop: '3px', lineHeight: 1.4 }}>
                      Admins are strictly blocked from activating <strong>"Stage 2: QA Testing"</strong> and <strong>"Stage 5: Live Deploy"</strong> until Super Admin clearance is granted below.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleBulkAuthorizeAll('testing')}
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.35)',
                      color: '#FDE047',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    title="Authorize all projects for QA Testing in one click"
                  >
                    <Check size={13} />
                    <span>Authorize All QA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBulkAuthorizeAll('live')}
                    style={{
                      background: 'rgba(74, 222, 128, 0.15)',
                      border: '1px solid rgba(74, 222, 128, 0.35)',
                      color: '#86EFAC',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    title="Authorize all projects for Live Production Release in one click"
                  >
                    <Zap size={13} />
                    <span>Authorize All Live</span>
                  </button>
                </div>
              </div>

              {/* 3. SEARCH & FILTER TOOLBAR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                  <Search size={14} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    placeholder="Search project, code, domain..."
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.78rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  {projectSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setProjectSearchQuery('')}
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Filter Chips */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: `All (${totalProjs})` },
                    { id: 'needs-testing', label: `Needs QA (${totalProjs - testingApprovedCount})` },
                    { id: 'needs-live', label: `Needs Live (${totalProjs - liveApprovedCount})` },
                    { id: 'cleared', label: `Fully Cleared (${fullyClearedCount})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setProjectFilterState(f.id)}
                      style={{
                        background: projectFilterState === f.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${projectFilterState === f.id ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                        color: projectFilterState === f.id ? '#38BDF8' : '#94A3B8',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. MAIN GOVERNANCE PROJECTS MATRIX */}
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>
                      Project Clearance Matrix
                    </span>
                    <span style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                      {filteredProjects.length} Active
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700 }}>
                    ● Real-Time Root Control
                  </span>
                </div>

                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table className="fixkar-table" style={{ fontSize: '0.8rem', width: '100%', minWidth: '920px', tableLayout: 'fixed' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '27%', minWidth: '220px', whiteSpace: 'nowrap' }}>CLIENT &amp; REPOSITORY</th>
                        <th style={{ width: '23%', minWidth: '200px', whiteSpace: 'nowrap' }}>CURRENT SPRINT PROGRESS</th>
                        <th style={{ width: '21%', minWidth: '185px', whiteSpace: 'nowrap' }}>🧪 QA TESTING GATE (STAGE 2)</th>
                        <th style={{ width: '21%', minWidth: '185px', whiteSpace: 'nowrap' }}>🟢 LIVE DEPLOY GATE (STAGE 5)</th>
                        <th style={{ width: '8%', minWidth: '90px', textAlign: 'center', whiteSpace: 'nowrap' }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                            No projects match the current search / filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((proj) => {
                          const isTestingApproved = !!proj.superAdminApprovedTesting;
                          const isLiveApproved = !!proj.superAdminApprovedLive;
                          const isCurrentlyBusy = projectApprovingId === proj.id;

                          // Stage progress percentage calculation
                          const stageNum = proj.sprintStatus ? parseInt(proj.sprintStatus.charAt(0)) : 1;
                          const progressPct = stageNum === 5 ? 100 : stageNum === 4 ? 90 : stageNum === 3 ? 75 : stageNum === 2 ? 50 : 20;

                          return (
                            <tr key={proj.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                              {/* 1. Client Identity & Domain */}
                              <td style={{ verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div
                                    style={{
                                      width: '36px',
                                      height: '36px',
                                      borderRadius: '10px',
                                      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.3) 100%)',
                                      border: '1px solid rgba(56, 189, 248, 0.3)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontWeight: 900,
                                      color: '#38BDF8',
                                      fontSize: '0.9rem',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {(proj.clientName || 'C').charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ minWidth: 0 }}>
                                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {proj.clientName}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', whiteSpace: 'nowrap' }}>
                                      <span style={{ color: '#38BDF8', fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 700 }}>
                                        {proj.clientCode}
                                      </span>
                                      <span style={{ color: '#475569' }}>•</span>
                                      <a
                                        href={`https://${proj.domain}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: '#94A3B8', fontSize: '0.7rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                      >
                                        <Globe size={11} />
                                        <span>{proj.domain}</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* 2. Current Sprint Stage & Super Admin Direct Override */}
                              <td style={{ verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  {/* Progress bar */}
                                  <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                      <span style={{ fontSize: '0.68rem', color: '#CBD5E1', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                        {proj.sprintStatus || '1. Planning & Development'}
                                      </span>
                                      <span style={{ fontSize: '0.66rem', color: progressPct === 100 ? '#4ADE80' : '#38BDF8', fontFamily: 'monospace', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                        {progressPct}%
                                      </span>
                                    </div>
                                    <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                                      <div
                                        style={{
                                          width: `${progressPct}%`,
                                          height: '100%',
                                          background: progressPct === 100 ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #2563EB, #38BDF8)',
                                          borderRadius: '4px',
                                          transition: 'width 0.3s ease',
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Master Dropdown */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Crown size={12} color="#F59E0B" style={{ flexShrink: 0 }} />
                                    <select
                                      value={proj.sprintStatus || '1. Planning & Development'}
                                      disabled={isCurrentlyBusy}
                                      onChange={(e) => handleSuperUpdateProject(proj.id, { sprintStatus: e.target.value })}
                                      style={{
                                        background: '#0B1120',
                                        border: '1px solid rgba(245, 158, 11, 0.4)',
                                        borderRadius: '6px',
                                        padding: '4px 6px',
                                        color: '#FDE047',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        outline: 'none',
                                        width: '100%',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      <option value="1. Planning & Development">1. 📐 Planning &amp; Development (20%)</option>
                                      <option value="2. QA & Staging Testing">2. 🧪 QA &amp; Staging Testing (50%)</option>
                                      <option value="3. Client Feedback & Updating">3. 🔄 Client Feedback &amp; Updating (75%)</option>
                                      <option value="4. Final Approval & Balance">4. 💳 Final Approval &amp; Balance (90%)</option>
                                      <option value="5. 100% Live in Production">5. 🟢 100% Live in Production (100%)</option>
                                    </select>
                                  </div>
                                </div>
                              </td>

                              {/* 3. Stage 2: QA Testing Approval Switch */}
                              <td style={{ verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <button
                                    type="button"
                                    disabled={isCurrentlyBusy}
                                    onClick={() => handleSuperUpdateProject(proj.id, { superAdminApprovedTesting: !isTestingApproved })}
                                    style={{
                                      background: isTestingApproved
                                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)'
                                        : 'rgba(245, 158, 11, 0.08)',
                                      border: `1px solid ${isTestingApproved ? '#10B981' : 'rgba(245, 158, 11, 0.35)'}`,
                                      color: isTestingApproved ? '#86EFAC' : '#FDE047',
                                      padding: '7px 10px',
                                      borderRadius: '8px',
                                      fontSize: '0.74rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      boxSizing: 'border-box',
                                      whiteSpace: 'nowrap',
                                      transition: 'all 0.15s ease',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      {isTestingApproved ? <CheckCircle2 size={14} color="#4ADE80" style={{ flexShrink: 0 }} /> : <Lock size={14} color="#F59E0B" style={{ flexShrink: 0 }} />}
                                      <span style={{ whiteSpace: 'nowrap' }}>{isTestingApproved ? 'Testing Cleared' : 'Stage 2 Locked'}</span>
                                    </div>
                                    <span style={{ fontSize: '0.62rem', background: isTestingApproved ? 'rgba(74, 222, 128, 0.2)' : 'rgba(245, 158, 11, 0.2)', padding: '1px 5px', borderRadius: '4px', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '4px' }}>
                                      {isTestingApproved ? 'OPEN' : 'LOCKED'}
                                    </span>
                                  </button>
                                  <span style={{ fontSize: '0.65rem', color: isTestingApproved ? '#94A3B8' : '#FCA5A5', whiteSpace: 'nowrap' }}>
                                    {isTestingApproved ? '✓ Admin permitted to test' : '⚠️ Admin blocked from Stage 2'}
                                  </span>
                                </div>
                              </td>

                              {/* 4. Stage 5: Live Production Deploy Switch */}
                              <td style={{ verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <button
                                    type="button"
                                    disabled={isCurrentlyBusy}
                                    onClick={() => handleSuperUpdateProject(proj.id, { superAdminApprovedLive: !isLiveApproved })}
                                    style={{
                                      background: isLiveApproved
                                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.3) 100%)'
                                        : 'rgba(239, 68, 68, 0.08)',
                                      border: `1px solid ${isLiveApproved ? '#22C55E' : 'rgba(239, 68, 68, 0.35)'}`,
                                      color: isLiveApproved ? '#86EFAC' : '#FCA5A5',
                                      padding: '7px 10px',
                                      borderRadius: '8px',
                                      fontSize: '0.74rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      boxSizing: 'border-box',
                                      whiteSpace: 'nowrap',
                                      transition: 'all 0.15s ease',
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      {isLiveApproved ? <Zap size={14} color="#4ADE80" style={{ flexShrink: 0 }} /> : <Lock size={14} color="#F87171" style={{ flexShrink: 0 }} />}
                                      <span style={{ whiteSpace: 'nowrap' }}>{isLiveApproved ? 'Live Authorized' : 'Stage 5 Locked'}</span>
                                    </div>
                                    <span style={{ fontSize: '0.62rem', background: isLiveApproved ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)', padding: '1px 5px', borderRadius: '4px', fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '4px' }}>
                                      {isLiveApproved ? 'LIVE' : 'LOCKED'}
                                    </span>
                                  </button>
                                  <span style={{ fontSize: '0.65rem', color: isLiveApproved ? '#94A3B8' : '#FCA5A5', whiteSpace: 'nowrap' }}>
                                    {isLiveApproved ? '✓ Admin permitted to go live' : '⚠️ Admin blocked from Stage 5'}
                                  </span>
                                </div>
                              </td>

                              {/* 5. Clearance Status Badge */}
                              <td style={{ textAlign: 'center' }}>
                                <span
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    fontWeight: 800,
                                    background: isTestingApproved && isLiveApproved
                                      ? 'rgba(74, 222, 128, 0.15)'
                                      : isTestingApproved
                                      ? 'rgba(245, 158, 11, 0.15)'
                                      : 'rgba(239, 68, 68, 0.15)',
                                    color: isTestingApproved && isLiveApproved
                                      ? '#86EFAC'
                                      : isTestingApproved
                                      ? '#FDE047'
                                      : '#FCA5A5',
                                    border: `1px solid ${
                                      isTestingApproved && isLiveApproved
                                        ? 'rgba(74, 222, 128, 0.35)'
                                        : isTestingApproved
                                        ? 'rgba(245, 158, 11, 0.35)'
                                        : 'rgba(239, 68, 68, 0.35)'
                                    }`,
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                  }}
                                >
                                  {isTestingApproved && isLiveApproved ? '🟢 Full Clear' : isTestingApproved ? '🟡 Testing' : '🔒 Gated'}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}


        {/* ═════════════════════════════════════════════════════════════════
            UNIFIED TAB: MASTER FAST2SMS GATEWAY & LIVE PACK PRICING ENGINE
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'gateway' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Top Success / Feedback Notice */}
            {pricingNotice && (
              <div
                style={{
                  background: 'rgba(74, 222, 128, 0.15)',
                  border: '1px solid rgba(74, 222, 128, 0.4)',
                  borderRadius: '14px',
                  padding: '14px 20px',
                  color: '#86EFAC',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 20px rgba(74, 222, 128, 0.15)',
                }}
              >
                <CheckCircle2 size={18} color="#4ADE80" />
                <span>{pricingNotice}</span>
              </div>
            )}

            {/* 1. MASTER GATEWAY & PRICING TOP CONTROLLER BAR */}
            <div className="fixkar-panel" style={{ padding: '18px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Globe size={20} color="#FBBF24" />
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                      Master SMS Gateway &amp; Live Pack Pricing Engine
                    </h2>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '4px 0 0' }}>
                    Configure upstream Fast2SMS credentials, establish wholesale margins, and set retail SMS pack rates for all client portals.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleSyncGatewayBalance}
                    disabled={gatewaySyncing}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#CBD5E1',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: gatewaySyncing ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <RefreshCw size={13} className={gatewaySyncing ? 'animate-spin' : ''} />
                    <span>{gatewaySyncing ? 'Syncing...' : 'Sync Fast2SMS Balance'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveOtpPricing}
                    disabled={pricingSaving || gatewaySaving}
                    style={{
                      background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '9px 20px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: pricingSaving ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 18px rgba(22, 163, 74, 0.45)',
                    }}
                  >
                    <Save size={15} />
                    <span>{pricingSaving ? 'Publishing Live...' : 'Save & Publish Live Pricing'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. SECTION 1: UPSTREAM FAST2SMS CREDENTIALS & SENDER ID */}
            <div className="fixkar-panel">
              <div className="fixkar-panel-head" style={{ marginBottom: '14px' }}>
                <div className="fixkar-panel-title">
                  <Server size={16} color="#38BDF8" />
                  <span>1. Upstream Fast2SMS Gateway Credentials &amp; Infrastructure</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700 }}>
                  ● Upstream Carrier Status: {gatewayConfig.status || 'Connected'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {/* Gateway Provider */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                    Gateway Provider
                  </label>
                  <input
                    type="text"
                    value={gatewayConfig.provider || 'Fast2SMS Enterprise DLT Gateway'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, provider: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Master Fast2SMS API Key */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700 }}>
                      Master Fast2SMS API Key
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMasterApiKey(!showMasterApiKey)}
                      style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      {showMasterApiKey ? 'Hide 👁️' : 'Show 👁️'}
                    </button>
                  </div>
                  <input
                    type={showMasterApiKey ? 'text' : 'password'}
                    value={gatewayConfig.apiKey || ''}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, apiKey: e.target.value })}
                    placeholder="Enter Fast2SMS Master API Key"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '8px',
                      color: '#FDE047',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Master Header Sender ID */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                    Header Sender ID (6 Letters)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={gatewayConfig.senderId || 'FIXKAR'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, senderId: e.target.value.toUpperCase() })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#93C5FD',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* SMS Route Mode */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                    SMS Delivery Route
                  </label>
                  <select
                    value={gatewayConfig.route || 'dlt_manual'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, route: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0D1323',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="dlt_manual">DLT Manual SMS (DLT Approved Templates)</option>
                    <option value="otp">Quick OTP Route (Instant Verification)</option>
                    <option value="v3">Fast2SMS v3 Route</option>
                  </select>
                </div>
              </div>

              {/* Fast2SMS Wallet Balance Bar */}
              <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Smartphone size={16} color="#38BDF8" />
                  <span style={{ fontSize: '0.76rem', color: '#CBD5E1' }}>
                    Live Fast2SMS Carrier Balance: <strong style={{ color: '#4ADE80', fontFamily: 'monospace' }}>{gatewayConfig.upstreamWalletAmount || '₹4,850.00'}</strong> ({gatewayConfig.upstreamBalance?.toLocaleString() || '24,250'} SMS Available)
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                  Last Synced: <strong style={{ color: '#CBD5E1' }}>{gatewayConfig.lastSyncedTimestamp || 'Recent'}</strong>
                </span>
              </div>
            </div>

            {/* 3. SECTION 2: MASTER RETAIL PRICE & PROFIT MARGIN CONTROLLERS */}
            <div className="fixkar-panel">
              <div className="fixkar-panel-head" style={{ marginBottom: '14px' }}>
                <div className="fixkar-panel-title">
                  <DollarSign size={16} color="#FBBF24" />
                  <span>2. Master Pricing Architecture &amp; Dynamic Profit Margins</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Upstream cost auto-gathered from Fast2SMS API. Adjust base rate or pick target margin presets.
                </span>
              </div>

              {/* Dynamic Target Margin Preset Buttons */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 700 }}>
                  ⚡ Quick Target Margin Presets (Auto-Calculates Base Price &amp; All Packs):
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[40, 50, 60, 70].map((m) => {
                    const cost = Number(otpPricing.wholesaleCostPerSms) || 0.125;
                    const calculatedRate = (cost / (1 - m / 100)).toFixed(3);
                    const isCurrent = Math.abs((((Number(otpPricing.baseRetailRatePerSms) || 0.25) - cost) / (Number(otpPricing.baseRetailRatePerSms) || 0.25)) * 100 - m) < 1.5;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleApplyTargetMargin(m)}
                        style={{
                          background: isCurrent ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${isCurrent ? '#38BDF8' : 'rgba(255, 255, 255, 0.12)'}`,
                          color: isCurrent ? '#fff' : '#CBD5E1',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        title={`Set profit margin to ${m}% (Base rate will be ₹${calculatedRate}/SMS)`}
                      >
                        <span>🎯 {m}% Margin</span>
                        <span style={{ fontSize: '0.64rem', color: isCurrent ? '#BAE6FD' : '#94A3B8' }}>
                          (₹{calculatedRate})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                {/* 1. Base Retail Rate per SMS */}
                <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '14px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#93C5FD', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Base Retail Price Per SMS (₹)
                    </label>
                    <span style={{ fontSize: '0.64rem', color: '#38BDF8', fontWeight: 700 }}>Selling Rate</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#38BDF8', fontWeight: 800, fontSize: '0.9rem' }}>₹</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.05"
                        max="2.00"
                        value={otpPricing.baseRetailRatePerSms ?? 0.25}
                        onChange={(e) => {
                          const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                          setOtpPricing((prev) => ({ ...prev, baseRetailRatePerSms: val }));
                        }}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value) || 0.25;
                          handleRecalculatePacksFromBaseRate(val);
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 10px 8px 24px',
                          background: '#0B1120',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          borderRadius: '8px',
                          color: '#38BDF8',
                          fontSize: '1rem',
                          fontWeight: 900,
                          fontFamily: 'monospace',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRecalculatePacksFromBaseRate(otpPricing.baseRetailRatePerSms || 0.25)}
                      style={{
                        background: 'rgba(56, 189, 248, 0.18)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#38BDF8',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                      title="Cascade this base rate across all 6 standard packs with volume discounts"
                    >
                      ⚡ Auto-Sync Packs
                    </button>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '6px', display: 'block' }}>
                    Standard unit rate before volume discounts
                  </span>
                </div>

                {/* 2. Upstream Fast2SMS Wholesale Cost (Locked / Auto-Gathered from Gateway API) */}
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.72rem', color: '#FDE047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Carrier Wholesale Cost (₹)
                      </label>
                      <span style={{ fontSize: '0.62rem', background: 'rgba(74, 222, 128, 0.18)', color: '#86EFAC', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        🔒 Auto-API
                      </span>
                    </div>

                    <div style={{ background: '#0B1120', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ color: '#F59E0B', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'monospace' }}>
                          ₹{Number(otpPricing.wholesaleCostPerSms || 0.125).toFixed(3)}
                        </span>
                        <span style={{ color: '#94A3B8', fontSize: '0.72rem', fontWeight: 700 }}>/SMS</span>
                      </div>
                      <span style={{ fontSize: '0.66rem', color: '#FDE047', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        DLT Route
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '8px', display: 'block' }}>
                    Auto-gathered via Fast2SMS DLT gateway API (Non-editable carrier cost)
                  </span>
                </div>

                {/* 3. Dynamic Studio Gross Margin Telemetry */}
                <div style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '14px', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#86EFAC', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Dynamic Gross Margin
                    </span>
                    <span style={{ fontSize: '0.64rem', color: '#4ADE80', fontWeight: 700 }}>Real-Time</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                    {(() => {
                      const base = Number(otpPricing.baseRetailRatePerSms) || 0.25;
                      const cost = Number(otpPricing.wholesaleCostPerSms) || 0.125;
                      const marginPct = ((base - cost) / base) * 100;
                      return `${marginPct.toFixed(1)}%`;
                    })()}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>
                    Net Studio Profit: <strong style={{ color: '#4ADE80' }}>+₹{((Number(otpPricing.baseRetailRatePerSms) || 0.25) - (Number(otpPricing.wholesaleCostPerSms) || 0.125)).toFixed(3)}</strong> per SMS
                  </div>
                </div>
              </div>

              {/* 4. SECTION 3: RECHARGE PACKAGES & DIRECT OVERRIDES MATRIX */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                      3. Recharge Package Matrix &amp; Plan Management ({otpPricing.packages?.length || 0} Plans Active)
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      Add new plans, remove unwanted plans, or edit names, credits, rates, and descriptions directly.
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleOpenAddPlanModal}
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        border: 'none',
                        color: '#fff',
                        padding: '8px 18px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
                      }}
                    >
                      <Plus size={15} />
                      <span>+ Create &amp; Add Custom Plan</span>
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '440px', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
                  <table className="fixkar-table" style={{ fontSize: '0.78rem', width: '100%' }}>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(10, 15, 29, 0.98)', backdropFilter: 'blur(10px)' }}>
                      <tr>
                        <th style={{ width: '24%' }}>PACKAGE NAME &amp; DESCRIPTION</th>
                        <th style={{ width: '12%' }}>CREDITS (SMS)</th>
                        <th style={{ width: '14%' }}>RETAIL RATE / SMS</th>
                        <th style={{ width: '13%' }}>PACK PRICE (₹)</th>
                        <th style={{ width: '11%' }}>WHOLESALE COST</th>
                        <th style={{ width: '12%' }}>NET PROFIT</th>
                        <th style={{ width: '8%', textAlign: 'center' }}>POPULAR</th>
                        <th style={{ width: '6%', textAlign: 'center' }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(otpPricing.packages || []).map((pkg, idx) => {
                        const credits = Number(pkg.credits) || 1000;
                        const cost = credits * (Number(otpPricing.wholesaleCostPerSms) || 0.125);
                        const profit = (pkg.price || 0) - cost;
                        const marginPct = (pkg.price || 0) > 0 ? (profit / pkg.price) * 100 : 0;

                        return (
                          <tr key={pkg.id || idx}>
                            {/* 1. Name & Description */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <input
                                  type="text"
                                  value={pkg.name}
                                  onChange={(e) => handleUpdatePackField(idx, 'name', e.target.value)}
                                  placeholder="Plan Name"
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    color: '#fff',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    width: '100%',
                                    boxSizing: 'border-box',
                                  }}
                                />
                                <input
                                  type="text"
                                  value={pkg.desc || ''}
                                  onChange={(e) => handleUpdatePackField(idx, 'desc', e.target.value)}
                                  placeholder="Short description for client portal..."
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '4px',
                                    padding: '3px 6px',
                                    color: '#94A3B8',
                                    fontSize: '0.68rem',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                  }}
                                />
                              </div>
                            </td>

                            {/* 2. Credits (Editable) */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <input
                                  type="number"
                                  step="500"
                                  min="100"
                                  max="1000000"
                                  value={pkg.credits}
                                  onChange={(e) => handleUpdatePackField(idx, 'credits', e.target.value)}
                                  style={{
                                    background: '#0B1120',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    borderRadius: '6px',
                                    padding: '4px 6px',
                                    color: '#38BDF8',
                                    fontSize: '0.8rem',
                                    fontFamily: 'monospace',
                                    fontWeight: 800,
                                    width: '75px',
                                  }}
                                />
                                <span style={{ color: '#64748B', fontSize: '0.68rem' }}>SMS</span>
                              </div>
                            </td>

                            {/* 3. Rate / SMS */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>₹</span>
                                <input
                                  type="number"
                                  step="0.005"
                                  min="0.01"
                                  max="2.00"
                                  value={pkg.ratePerSms}
                                  onChange={(e) => handleUpdatePackField(idx, 'ratePerSms', e.target.value)}
                                  style={{
                                    background: '#0B1120',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    borderRadius: '6px',
                                    padding: '4px 6px',
                                    color: '#38BDF8',
                                    fontSize: '0.8rem',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    width: '70px',
                                  }}
                                />
                                <span style={{ color: '#64748B', fontSize: '0.68rem' }}>/SMS</span>
                              </div>
                            </td>

                            {/* 4. Pack Price */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ color: '#4ADE80', fontWeight: 800 }}>₹</span>
                                <input
                                  type="number"
                                  step="5"
                                  min="10"
                                  max="100000"
                                  value={pkg.price}
                                  onChange={(e) => handleUpdatePackField(idx, 'price', e.target.value)}
                                  style={{
                                    background: '#0B1120',
                                    border: '1px solid rgba(74, 222, 128, 0.35)',
                                    borderRadius: '6px',
                                    padding: '4px 6px',
                                    color: '#4ADE80',
                                    fontSize: '0.84rem',
                                    fontFamily: 'monospace',
                                    fontWeight: 800,
                                    width: '80px',
                                  }}
                                />
                              </div>
                            </td>

                            {/* 5. Wholesale Cost */}
                            <td>
                              <span style={{ fontFamily: 'monospace', color: '#94A3B8', fontSize: '0.74rem' }}>
                                ₹{cost.toFixed(2)}
                              </span>
                            </td>

                            {/* 6. Net Profit & Margin */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ color: profit >= 0 ? '#86EFAC' : '#F87171', fontWeight: 800, fontFamily: 'monospace', fontSize: '0.76rem' }}>
                                  {profit >= 0 ? '+' : ''}₹{profit.toFixed(2)}
                                </span>
                                <span style={{ fontSize: '0.62rem', color: marginPct >= 40 ? '#4ADE80' : marginPct >= 20 ? '#FBBF24' : '#F87171' }}>
                                  ({marginPct.toFixed(1)}% Margin)
                                </span>
                              </div>
                            </td>

                            {/* 7. Popular Flag Toggle */}
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleUpdatePackField(idx, 'popular', !pkg.popular)}
                                style={{
                                  background: pkg.popular ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                  border: `1px solid ${pkg.popular ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                                  color: pkg.popular ? '#38BDF8' : '#64748B',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                                title="Toggle Most Popular badge on Client Portal"
                              >
                                {pkg.popular ? '⭐ Popular' : '—'}
                              </button>
                            </td>

                            {/* 8. Delete / Remove Plan Action */}
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleRemovePack(idx)}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.12)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  color: '#F87171',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                title={`Remove ${pkg.name}`}
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Action & Quick Save Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                    💡 <em>Tip: You can edit rates, pack prices, and credits directly in the table cells. Click below to publish changes to database.</em>
                  </span>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleSaveOtpPricing()}
                      disabled={pricingSaving}
                      style={{
                        background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                        border: 'none',
                        color: '#fff',
                        padding: '9px 24px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 900,
                        cursor: pricingSaving ? 'wait' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 18px rgba(22, 163, 74, 0.45)',
                      }}
                    >
                      <Save size={15} />
                      <span>{pricingSaving ? 'Saving to Database...' : 'Save & Publish Live Pricing'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. SECTION 4: LIVE CLIENT PORTAL PREVIEW */}
            <div className="fixkar-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={16} color="#38BDF8" />
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>
                    4. Live Client Portal Preview (How Clients See These Packs on /#client)
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700 }}>
                  ● Real-time synchronized with Super Admin pricing
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {(otpPricing.packages || []).map((pkg) => (
                  <div
                    key={pkg.id}
                    style={{
                      background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)',
                      border: pkg.popular ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      boxShadow: pkg.popular ? '0 10px 25px rgba(56, 189, 248, 0.15)' : 'none',
                    }}
                  >
                    {pkg.popular && (
                      <span style={{ position: 'absolute', top: '-9px', right: '14px', background: '#38BDF8', color: '#000', fontSize: '0.6rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.05em' }}>
                        MOST POPULAR
                      </span>
                    )}

                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>{pkg.name}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4ADE80', margin: '6px 0 2px' }}>
                        ₹{Number(pkg.price || 0).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>
                        +{Number(pkg.credits || 0).toLocaleString()} Credits • ₹{(pkg.ratePerSms || (pkg.price / (pkg.credits || 1))).toFixed(2)}/OTP
                      </div>
                      <p style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.4, margin: '8px 0 14px' }}>
                        {pkg.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        background: pkg.popular ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.06)',
                        border: `1px solid ${pkg.popular ? '#38BDF8' : 'rgba(255, 255, 255, 0.15)'}`,
                        color: '#fff',
                        padding: '7px 12px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      Instant Razorpay Top-Up
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 2: CLIENT API STUDIO (ISOLATED TOKENS FOR CLIENT PORTALS)
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'client-apis' && (
          <div className="fixkar-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="fixkar-panel-head" style={{ padding: '16px 20px', margin: 0 }}>
              <div className="fixkar-panel-title">
                <KeyRound size={16} color="#38BDF8" />
                <span>Client-Specific Isolated API Keys ({clientApiKeys.length})</span>
              </div>

              <button
                type="button"
                onClick={() => setIsGenerateApiKeyModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                }}
              >
                <Plus size={14} />
                <span>+ Generate Client API Key</span>
              </button>
            </div>

            {clientApiKeys.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8' }}>
                <KeyRound size={32} color="#64748B" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.94rem' }}>No Client API Keys Provisioned Yet</div>
                <div style={{ fontSize: '0.76rem', marginTop: '4px' }}>Click "+ Generate Client API Key" to issue a secure token.</div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '380px', width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <table className="fixkar-table" style={{ minWidth: '820px', width: '100%' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(10, 15, 29, 0.98)', backdropFilter: 'blur(10px)' }}>
                    <tr>
                      <th style={{ width: '22%' }}>CLIENT</th>
                      <th style={{ width: '32%' }}>ISOLATED API KEY</th>
                      <th style={{ width: '12%' }}>DLT HEADER</th>
                      <th style={{ width: '12%' }}>WALLET CREDITS</th>
                      <th style={{ width: '10%' }}>DISPATCHES</th>
                      <th style={{ width: '12%' }}>STATUS</th>
                      <th style={{ textAlign: 'right', width: '20%' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientApiKeys.map((k) => {
                      const isVisible = visibleKeyIds[k.id];
                      const isCopied = copiedKeyId === k.id;
                      return (
                        <tr key={k.id}>
                          <td>
                            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.84rem' }}>{k.clientName}</div>
                            <div style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', background: 'rgba(56, 189, 248, 0.1)', padding: '1px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '3px' }}>
                              {k.clientCode}
                            </div>
                          </td>

                          <td>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <span
                                style={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.74rem',
                                  color: '#FDE047',
                                  background: 'rgba(0, 0, 0, 0.6)',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  maxWidth: '200px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-block',
                                }}
                                title={k.apiKey}
                              >
                                {isVisible ? k.apiKey : `${k.apiKey.slice(0, 16)}••••••••`}
                              </span>
                              <button
                                type="button"
                                onClick={() => setVisibleKeyIds({ ...visibleKeyIds, [k.id]: !isVisible })}
                                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#CBD5E1', padding: '4px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem' }}
                                title={isVisible ? 'Hide key' : 'Reveal key'}
                              >
                                {isVisible ? '👁️' : '👁️‍🗨️'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(k.apiKey);
                                  setCopiedKeyId(k.id);
                                  setTimeout(() => setCopiedKeyId(null), 3000);
                                }}
                                style={{
                                  background: isCopied ? '#16A34A' : 'rgba(56, 189, 248, 0.15)',
                                  border: `1px solid ${isCopied ? '#16A34A' : 'rgba(56, 189, 248, 0.35)'}`,
                                  color: isCopied ? '#fff' : '#38BDF8',
                                  padding: '3px 8px',
                                  borderRadius: '5px',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                {isCopied ? '✓' : 'Copy'}
                              </button>
                            </div>
                          </td>

                          <td>
                            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 800, background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#93C5FD', padding: '3px 8px', borderRadius: '5px' }}>
                              {k.dltSenderId || 'FIXKAR'}
                            </span>
                          </td>

                          <td>
                            <strong style={{ fontSize: '0.84rem', color: (k.availableCredits || 0) < 500 ? '#F43F5E' : '#4ADE80', fontFamily: 'monospace' }}>
                              {(k.availableCredits || 0).toLocaleString()} Credits
                            </strong>
                          </td>

                          <td>
                            <span style={{ fontSize: '0.76rem', color: '#CBD5E1', fontFamily: 'monospace' }}>
                              {k.totalRequests || 0} OTPs
                            </span>
                          </td>

                          <td>
                            <span className={`fixkar-status-chip ${k.status === 'Active' ? 'success' : 'danger'}`}>
                              ● {k.status}
                            </span>
                          </td>

                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}>
                              <button
                                type="button"
                                onClick={() => setSelectedApiKeyForSnippet(k)}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.15)',
                                  border: '1px solid rgba(56, 189, 248, 0.35)',
                                  color: '#38BDF8',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                }}
                              >
                                <Terminal size={11} />
                                <span>Code</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setTopupModalKey(k);
                                  setTopupForm({
                                    packId: 'otp_1000',
                                    credits: 1000,
                                    price: 250,
                                    allocationType: 'BANK_TRANSFER',
                                    utrNumber: '',
                                    notes: `Top-up for ${k.clientName}`,
                                  });
                                }}
                                style={{
                                  background: 'rgba(74, 222, 128, 0.15)',
                                  border: '1px solid rgba(74, 222, 128, 0.35)',
                                  color: '#4ADE80',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                }}
                                title={`Top-up SMS credits on same API key for ${k.clientName}`}
                              >
                                <Plus size={11} />
                                <span>Top-Up</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleClientApiKey(k.id, k.status)}
                                style={{
                                  background: k.status === 'Active' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(74, 222, 128, 0.15)',
                                  border: `1px solid ${k.status === 'Active' ? 'rgba(251, 191, 36, 0.35)' : 'rgba(74, 222, 128, 0.35)'}`,
                                  color: k.status === 'Active' ? '#FBBF24' : '#4ADE80',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                {k.status === 'Active' ? 'Pause' : 'Resume'}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRotateClientApiKey(k.id, k.clientName)}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  color: '#CBD5E1',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                }}
                                title="Rotate Key"
                              >
                                Rotate
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteClientApiKey(k.id, k.clientName)}
                                style={{
                                  background: 'rgba(244, 63, 94, 0.12)',
                                  border: '1px solid rgba(244, 63, 94, 0.35)',
                                  color: '#FDA4AF',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer',
                                }}
                                title="Revoke Key"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Code Snippet Drawer */}
            {selectedApiKeyForSnippet && (
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(13, 19, 35, 0.98) 0%, rgba(9, 13, 24, 0.99) 100%)',
                  borderTop: '1px solid rgba(56, 189, 248, 0.35)',
                  padding: '20px',
                  borderRadius: '12px',
                  marginTop: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                      Integration Snippet for {selectedApiKeyForSnippet.clientName} ({selectedApiKeyForSnippet.clientCode})
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {[
                      { id: 'curl', label: 'cURL' },
                      { id: 'nodejs', label: 'Node.js (Fetch)' },
                      { id: 'python', label: 'Python' },
                      { id: 'php', label: 'PHP' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedSnippetTab(tab.id)}
                        style={{
                          background: selectedSnippetTab === tab.id ? '#2563EB' : 'transparent',
                          border: 'none',
                          color: selectedSnippetTab === tab.id ? '#fff' : '#94A3B8',
                          padding: '4px 10px',
                          borderRadius: '5px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <pre
                    style={{
                      background: '#030712',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      color: '#86EFAC',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      lineHeight: 1.45,
                      overflowX: 'auto',
                      overflowY: 'auto',
                      maxHeight: '220px',
                      margin: 0,
                    }}
                  >
                    {selectedSnippetTab === 'curl' && `curl -X POST http://localhost:5050/api/v1/otp/send \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${selectedApiKeyForSnippet.apiKey}" \\
  -d '{
    "mobile": "9835012345",
    "otp": "4921",
    "purpose": "Student Login Verification"
  }'`}

                    {selectedSnippetTab === 'nodejs' && `// Node.js (Fetch / Express Backend)
const sendOtp = async (mobileNumber, otpCode) => {
  const response = await fetch('http://localhost:5050/api/v1/otp/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${selectedApiKeyForSnippet.apiKey}'
    },
    body: JSON.stringify({
      mobile: mobileNumber,
      otp: otpCode,
      purpose: 'User Login Verification'
    })
  });
  const data = await response.json();
  console.log('OTP Result:', data);
  return data;
};`}

                    {selectedSnippetTab === 'python' && `# Python 3
import requests

url = "http://localhost:5050/api/v1/otp/send"
headers = {
    "Authorization": "Bearer ${selectedApiKeyForSnippet.apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "mobile": "9835012345",
    "otp": "4921",
    "purpose": "Portal Authentication"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}

                    {selectedSnippetTab === 'php' && `<?php
// PHP cURL
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://localhost:5050/api/v1/otp/send',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode([
    'mobile' => '9835012345',
    'otp' => '4921',
    'purpose' => 'User Login'
  ]),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ${selectedApiKeyForSnippet.apiKey}',
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;
?>`}
                  </pre>

                  <button
                    type="button"
                    onClick={() => {
                      let code = '';
                      if (selectedSnippetTab === 'curl') {
                        code = `curl -X POST http://localhost:5050/api/v1/otp/send -H "Content-Type: application/json" -H "Authorization: Bearer ${selectedApiKeyForSnippet.apiKey}" -d '{"mobile":"9835012345","otp":"4921","purpose":"Student Login"}'`;
                      } else if (selectedSnippetTab === 'nodejs') {
                        code = `fetch('http://localhost:5050/api/v1/otp/send', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ${selectedApiKeyForSnippet.apiKey}' }, body: JSON.stringify({ mobile: '9835012345', otp: '4921' }) });`;
                      } else if (selectedSnippetTab === 'python') {
                        code = `import requests\nrequests.post("http://localhost:5050/api/v1/otp/send", json={"mobile": "9835012345", "otp": "4921"}, headers={"Authorization": "Bearer ${selectedApiKeyForSnippet.apiKey}"})`;
                      } else {
                        code = `<?php /* Fixkar OTP API */ ?>`;
                      }
                      navigator.clipboard.writeText(code);
                      setToastMessage('Snippet copied to clipboard!');
                      setTimeout(() => setToastMessage(''), 3000);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Copy Snippet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 3: 48-HOUR PROVISIONAL BANK RECONCILIATION RADAR
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'provisional' && (
          <div className="fixkar-panel" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="fixkar-panel-head" style={{ padding: '16px 20px', margin: 0 }}>
              <div className="fixkar-panel-title">
                <ShieldCheck size={16} color="#FBBF24" />
                <span>48-Hour Bank Statement Reconciliation Engine</span>
              </div>

              <span style={{ fontSize: '0.74rem', color: '#FDE047', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '4px 12px', borderRadius: '12px', fontWeight: 800 }}>
                ⏳ {pendingProvisionalCount} Pending Verification
              </span>
            </div>

            <div style={{ padding: '0 20px 14px', fontSize: '0.76rem', color: '#94A3B8' }}>
              Verify bank statement UTRs. Confirm to mark permanent or Instant Reject to auto-deduct credits from client wallet.
            </div>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="fixkar-table">
                <thead>
                  <tr>
                    <th>CLIENT</th>
                    <th>PROVISIONAL OTPs</th>
                    <th>PAYMENT DUE / UTR</th>
                    <th>ALLOCATED BY</th>
                    <th>TIME REMAINING</th>
                    <th style={{ textAlign: 'right' }}>SUPER ADMIN DECISION</th>
                  </tr>
                </thead>
                <tbody>
                  {provisionalRecharges.map((prov) => {
                    const isPending = prov.status === 'PENDING_SUPER_ADMIN';
                    return (
                      <tr key={prov.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{prov.clientName}</div>
                          <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>{prov.clientCode}</div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: '#4ADE80', fontFamily: 'monospace' }}>
                            +{prov.credits.toLocaleString()} OTPs
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>{prov.amount}</div>
                          <div style={{ fontSize: '0.7rem', color: '#CBD5E1', fontFamily: 'monospace' }}>UTR: {prov.utr}</div>
                        </td>
                        <td>
                          <div style={{ color: '#CBD5E1', fontSize: '0.76rem' }}>{prov.addedBy || 'Admin'}</div>
                          <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>{prov.createdTimestamp ? prov.createdTimestamp.split(',')[0] : ''}</div>
                        </td>
                        <td>
                          {isPending ? (
                            <span style={{ fontSize: '0.7rem', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                              ⏳ {prov.hoursLeft || 48}h left
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.7rem', color: prov.status === 'CONFIRMED_PERMANENT' ? '#4ADE80' : '#F43F5E', fontWeight: 700 }}>
                              ● {prov.status}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {isPending ? (
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => handleConfirmProvisional(prov.id)}
                                style={{
                                  background: '#16A34A',
                                  border: 'none',
                                  color: '#fff',
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                }}
                              >
                                ✓ Confirm (Bank Match)
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRejectProvisional(prov.id)}
                                style={{
                                  background: '#DC2626',
                                  border: 'none',
                                  color: '#fff',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                }}
                              >
                                ✕ Reject &amp; Deduct
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Verified by Super Admin</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {/* ═════════════════════════════════════════════════════════════════
            TAB: RENEWAL RADAR — ALL CLIENT DOMAINS & SERVERS
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'renewals' && (
          <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#FBBF24" />
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>Server &amp; Domain Renewals Radar</span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(56,189,248,0.15)', color: '#38BDF8', padding: '1px 8px', borderRadius: '10px', fontWeight: 700 }}>
                  {(renewals || []).length} Total
                </span>
                {(renewals || []).filter((r) => (r?.daysRemaining ?? 999) <= 30).length > 0 && (
                  <span style={{ fontSize: '0.7rem', background: 'rgba(239,68,68,0.2)', color: '#FDA4AF', padding: '1px 8px', borderRadius: '10px', fontWeight: 700 }}>
                    🚨 {(renewals || []).filter((r) => (r?.daysRemaining ?? 999) <= 30).length} Expiring Soon
                  </span>
                )}
              </div>
              {/* Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div className="fixkar-pill-bar">
                  {[
                    { id: 'All', label: `All (${(renewals || []).length})` },
                    { id: 'Next 30 Days', label: `🚨 30 Days (${(renewals || []).filter((r) => (r?.daysRemaining ?? 999) <= 30).length})` },
                    { id: 'Next 15 Days', label: `⚠️ 15 Days (${(renewals || []).filter((r) => (r?.daysRemaining ?? 999) <= 15).length})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setRenewalFilter(f.id)}
                      className={`fixkar-pill-btn ${renewalFilter === f.id ? 'active' : ''}`}
                      style={{ fontSize: '0.71rem', padding: '4px 10px' }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <div style={{ position: 'relative', minWidth: '180px' }}>
                  <Search size={12} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Search client, domain..."
                    value={renewalSearchQuery}
                    onChange={(e) => setRenewalSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '5px 10px 5px 28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ width: '24%', padding: '10px 12px', textAlign: 'left' }}>CLIENT</th>
                    <th style={{ width: '26%', padding: '10px 12px', textAlign: 'left' }}>SERVICE &amp; INFRASTRUCTURE</th>
                    <th style={{ width: '22%', padding: '10px 12px', textAlign: 'left' }}>EXPIRY &amp; COUNTDOWN</th>
                    <th style={{ width: '12%', padding: '10px 12px', textAlign: 'left' }}>PRICE</th>
                    <th style={{ width: '16%', padding: '10px 12px', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {(renewals || [])
                    .filter((r) => {
                      const days = r?.daysRemaining ?? 999;
                      if (renewalFilter === 'Next 30 Days') return days <= 30;
                      if (renewalFilter === 'Next 15 Days') return days <= 15;
                      return true;
                    })
                    .filter((r) => {
                      if (!renewalSearchQuery.trim()) return true;
                      const q = renewalSearchQuery.toLowerCase();
                      return (
                        (r.clientName || '').toLowerCase().includes(q) ||
                        (r.clientCode || '').toLowerCase().includes(q) ||
                        (r.domain || '').toLowerCase().includes(q) ||
                        (r.service || '').toLowerCase().includes(q) ||
                        (r.renewalDate || '').toLowerCase().includes(q)
                      );
                    })
                    .map((r) => (
                      <tr key={r.id || r.clientCode} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.clientName}</div>
                          <div style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', marginTop: '1px' }}>{r.clientCode}{r.domain ? ` • ${r.domain}` : ''}</div>
                        </td>
                        <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            {r.renewalType && (
                              <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '1px 6px', borderRadius: '4px', background: r.renewalType === 'Domain' ? 'rgba(56,189,248,0.15)' : 'rgba(168,85,247,0.15)', color: r.renewalType === 'Domain' ? '#38BDF8' : '#C084FC', border: `1px solid ${r.renewalType === 'Domain' ? 'rgba(56,189,248,0.3)' : 'rgba(168,85,247,0.3)'}` }}>
                                {r.renewalType}
                              </span>
                            )}
                            <span style={{ color: '#CBD5E1', fontSize: '0.74rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.service || 'Managed Cloud VPS & Domain'}</span>
                          </div>
                          {r.duration && <div style={{ fontSize: '0.64rem', color: '#64748B', marginTop: '2px' }}>Cycle: {r.duration}</div>}
                        </td>
                        <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className={`fixkar-status-chip ${(r?.daysRemaining ?? 99) <= 15 ? 'danger' : (r?.daysRemaining ?? 99) <= 30 ? 'warning' : 'success'}`} style={{ fontSize: '0.66rem', padding: '2px 7px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                              {(r?.daysRemaining ?? 99) <= 30 ? `🚨 ${r.daysRemaining}d left` : `● ${r.daysRemaining} days`}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{r.renewalDate}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.82rem' }}>{r.price || '₹2,499/yr'}</div>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => handleSendRenewalEmail(r)}
                              title={`Email renewal invoice to ${r.clientName}`}
                              style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', color: '#38BDF8', padding: '4px 7px', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <Mail size={11} />
                              <span>Email</span>
                            </button>
                            <a
                              href={`https://wa.me/${(r.phone || '919835012345').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${r.clientName}, your website hosting & domain (${r.domain || ''}) is expiring in ${r.daysRemaining} days. Renewal: ${r.price}. Pay via UPI: fixkar@upi`)}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ADE80', padding: '4px 7px', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              WA
                            </a>
                            <button
                              type="button"
                              onClick={() => handleMarkRenewalPaid(r)}
                              style={{ background: '#16A34A', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 800, cursor: 'pointer' }}
                            >
                              +1 Yr
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {(renewals || []).length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748B', fontSize: '0.82rem' }}>
                        ✓ No renewal records found. Sync to load client infrastructure data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB: CLIENT SUPPORT HELPDESK & TICKETS (ADMIN & SUPER ADMIN SHARED)
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'support' && (() => {
          const totalOpen = (supportTickets || []).filter((t) => t.status === 'Open').length;
          const totalInProgress = (supportTickets || []).filter((t) => t.status === 'In Progress').length;
          const totalResolved = (supportTickets || []).filter((t) => t.status === 'Resolved').length;

          const filteredTickets = (supportTickets || [])
            .filter((t) => {
              if (supportFilter === 'Open') return t.status === 'Open';
              if (supportFilter === 'In Progress') return t.status === 'In Progress';
              if (supportFilter === 'Resolved') return t.status === 'Resolved';
              return true;
            })
            .filter((t) => {
              if (!supportSearchQuery.trim()) return true;
              const q = supportSearchQuery.toLowerCase();
              return (
                (t.id || '').toLowerCase().includes(q) ||
                (t.client || '').toLowerCase().includes(q) ||
                (t.clientCode || '').toLowerCase().includes(q) ||
                (t.subject || '').toLowerCase().includes(q) ||
                (t.description || '').toLowerCase().includes(q) ||
                (t.domain || '').toLowerCase().includes(q)
              );
            });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* ─── 3 SUMMARY KPI CARDS ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FDA4AF', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTION REQUIRED (OPEN)</span>
                    <HelpCircle size={15} color="#F43F5E" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                    {totalOpen} Open
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Awaiting developer review &amp; fix</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IN PROGRESS</span>
                    <Zap size={15} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38BDF8', margin: '4px 0 2px' }}>
                    {totalInProgress} Tasks
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Active development / fixes</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#86EFAC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RESOLVED &amp; COMPLETED</span>
                    <CheckCircle2 size={15} color="#4ADE80" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ADE80', margin: '4px 0 2px' }}>
                    {totalResolved} Resolved
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Deployed &amp; verified live</div>
                </div>
              </div>

              {/* ─── MAIN TICKETS PANEL ─── */}
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Header & Filter Controls */}
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LifeBuoy size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>Support Helpdesk (Admin &amp; Super Admin)</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56,189,248,0.15)', color: '#38BDF8', padding: '1px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      {(supportTickets || []).length} Total
                    </span>
                    {totalOpen > 0 && (
                      <span style={{ fontSize: '0.7rem', background: 'rgba(239,68,68,0.2)', color: '#FDA4AF', padding: '1px 8px', borderRadius: '10px', fontWeight: 700 }}>
                        🚨 {totalOpen} Needs Action
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {/* Filter Pills */}
                    <div className="fixkar-pill-bar">
                      {[
                        { id: 'All', label: `All (${(supportTickets || []).length})` },
                        { id: 'Open', label: `🚨 Open (${totalOpen})` },
                        { id: 'In Progress', label: `⚡ In Progress (${totalInProgress})` },
                        { id: 'Resolved', label: `✅ Resolved (${totalResolved})` },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSupportFilter(f.id)}
                          className={`fixkar-pill-btn ${supportFilter === f.id ? 'active' : ''}`}
                          style={{ fontSize: '0.71rem', padding: '4px 10px' }}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div style={{ position: 'relative', minWidth: '170px' }}>
                      <Search size={12} style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                      <input
                        type="text"
                        placeholder="Search ticket, client..."
                        value={supportSearchQuery}
                        onChange={(e) => setSupportSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '5px 10px 5px 28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Create Ticket Button */}
                    <button
                      type="button"
                      onClick={() => setIsNewTicketModalOpen((prev) => !prev)}
                      style={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Plus size={13} />
                      <span>Create Ticket</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <table className="fixkar-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ width: '12%', padding: '10px 12px', textAlign: 'left' }}>TICKET ID</th>
                        <th style={{ width: '22%', padding: '10px 12px', textAlign: 'left' }}>CLIENT WEBSITE</th>
                        <th style={{ width: '32%', padding: '10px 12px', textAlign: 'left' }}>SUBJECT &amp; DETAILS</th>
                        <th style={{ width: '10%', padding: '10px 12px', textAlign: 'left' }}>PRIORITY</th>
                        <th style={{ width: '10%', padding: '10px 12px', textAlign: 'left' }}>STATUS</th>
                        <th style={{ width: '14%', padding: '10px 12px', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((t) => (
                        <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle', fontFamily: 'monospace', fontWeight: 800, color: '#38BDF8', whiteSpace: 'nowrap' }}>
                            {t.id}
                          </td>
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.82rem' }}>{t.client || 'General Client'}</div>
                            <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', marginTop: '1px' }}>
                              {t.clientCode || t.clientId ? `${t.clientCode || t.clientId} • ` : ''}{t.domain || t.email || ''}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: 600, color: '#F1F5F9', fontSize: '0.8rem' }}>{t.subject}</div>
                            {t.description && <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '350px' }}>{t.description}</div>}
                            {t.notes && <div style={{ fontSize: '0.7rem', color: '#38BDF8', marginTop: '2px' }}>💬 Dev Note: {t.notes}</div>}
                          </td>
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <span className={`fixkar-status-chip ${t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'info' : 'secondary'}`} style={{ fontSize: '0.68rem', padding: '2px 7px', fontWeight: 700 }}>
                              {t.priority || 'Medium'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                            <span className={`fixkar-status-chip ${t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'info' : 'danger'}`} style={{ fontSize: '0.68rem', padding: '2px 7px', fontWeight: 700 }}>
                              ● {t.status || 'Open'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                              {t.status !== 'Resolved' ? (
                                <button
                                  type="button"
                                  onClick={() => handleResolveTicket(t.id)}
                                  title="Mark this ticket as Resolved"
                                  style={{
                                    background: '#16A34A',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '4px 9px',
                                    borderRadius: '6px',
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                >
                                  <Check size={12} />
                                  <span>Resolve</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleUpdateTicket(t.id, { status: 'In Progress' })}
                                  title="Reopen ticket"
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    color: '#94A3B8',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  Reopen
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleOpenTicket(t)}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.12)',
                                  border: '1px solid rgba(56, 189, 248, 0.3)',
                                  color: '#38BDF8',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                Manage
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredTickets.length === 0 && (
                        <tr>
                          <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '0.82rem' }}>
                            ✓ No support tickets found matching current filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ─── MODAL: MANAGE TICKET (SUPER ADMIN & ADMIN RESOLVABLE) ─── */}
              {isTicketModalOpen && selectedTicket && (
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99999,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 24, 0.98) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '16px',
                      maxWidth: '560px',
                      maxHeight: '90vh',
                      overflowY: 'auto',
                      width: '100%',
                      padding: '24px',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#38BDF8', fontSize: '1rem' }}>
                            {selectedTicket.id}
                          </span>
                          <span className={`fixkar-status-chip ${selectedTicket.priority === 'High' ? 'danger' : selectedTicket.priority === 'Medium' ? 'info' : 'secondary'}`}>
                            {selectedTicket.priority} Priority
                          </span>
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                          {selectedTicket.client}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsTicketModalOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Subject & Details */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Subject / Request
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F1F5F9', marginTop: '2px' }}>
                        {selectedTicket.subject}
                      </div>
                      {selectedTicket.description && (
                        <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '8px', lineHeight: 1.5 }}>
                          {selectedTicket.description}
                        </div>
                      )}
                    </div>

                    {/* Status & Priority */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                          Status
                        </label>
                        <select
                          value={selectedTicket.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
                            handleUpdateTicket(selectedTicket.id, { status: newStatus });
                          }}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#0F172A',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                          }}
                        >
                          <option value="Open">🚨 Open</option>
                          <option value="In Progress">⚡ In Progress</option>
                          <option value="Resolved">✅ Resolved</option>
                          <option value="Closed">🔒 Closed</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                          Priority
                        </label>
                        <select
                          value={selectedTicket.priority}
                          onChange={(e) => {
                            const newPriority = e.target.value;
                            setSelectedTicket((prev) => ({ ...prev, priority: newPriority }));
                            handleUpdateTicket(selectedTicket.id, { priority: newPriority });
                          }}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#0F172A',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                          }}
                        >
                          <option value="High">🔴 High Priority</option>
                          <option value="Medium">🔵 Medium Priority</option>
                          <option value="Low">⚪ Low Priority</option>
                        </select>
                      </div>
                    </div>

                    {/* Developer Notes */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                        Super Admin / Developer Action Notes
                      </label>
                      <textarea
                        rows={3}
                        value={selectedTicket.notes || ''}
                        onChange={(e) => setSelectedTicket((prev) => ({ ...prev, notes: e.target.value }))}
                        placeholder="Add resolution notes, commit hashes, or client confirmation..."
                        style={{
                          width: '100%',
                          padding: '10px',
                          background: '#0B1120',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.8rem',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    {/* Modal Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteTicket(selectedTicket.id)}
                        style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#FDA4AF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Delete Ticket
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {selectedTicket.status !== 'Resolved' && (
                          <button
                            type="button"
                            onClick={async () => {
                              await handleUpdateTicket(selectedTicket.id, {
                                status: 'Resolved',
                                priority: selectedTicket.priority,
                                notes: selectedTicket.notes,
                              });
                              setIsTicketModalOpen(false);
                            }}
                            style={{ background: '#16A34A', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Check size={14} />
                            <span>Mark Resolved</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            handleUpdateTicket(selectedTicket.id, {
                              status: selectedTicket.status,
                              priority: selectedTicket.priority,
                              notes: selectedTicket.notes,
                            });
                            setIsTicketModalOpen(false);
                          }}
                          style={{ background: '#2563EB', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Save &amp; Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── MODAL: CREATE NEW TICKET ─── */}
              {isNewTicketModalOpen && (
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99999,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 24, 0.98) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '16px',
                      padding: '20px',
                      maxWidth: '520px',
                      width: '100%',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <form onSubmit={handleCreateTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Plus size={16} color="#38BDF8" />
                          <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Create Support Ticket</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsNewTicketModalOpen(false)}
                          style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Client Selector */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#38BDF8', marginBottom: '4px', fontWeight: 700 }}>
                          Select Client Website *
                        </label>
                        <select
                          required
                          value={newTicketForm.clientCode || ''}
                          onChange={(e) => {
                            const selCode = e.target.value;
                            const found = (clients || []).find((c) => c.clientCode === selCode || c.id === selCode);
                            if (found) {
                              setNewTicketForm((p) => ({
                                ...p,
                                clientId: found.id || '',
                                clientCode: found.clientCode || '',
                                client: found.businessName || found.contactPerson || '',
                                phone: found.phone || found.whatsapp || '',
                                email: found.email || '',
                                domain: found.domain || found.website || '',
                              }));
                            } else {
                              setNewTicketForm((p) => ({ ...p, clientCode: selCode }));
                            }
                          }}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#1E293B',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            outline: 'none',
                          }}
                        >
                          <option value="">-- Choose Client Website --</option>
                          {(clients || []).map((c) => (
                            <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                              {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.contactPerson})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subject */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#F1F5F9', marginBottom: '4px', fontWeight: 700 }}>
                          Subject / Task Summary *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTicketForm.subject}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, subject: e.target.value }))}
                          placeholder="e.g. Add UPI QR code on checkout page"
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#1E293B',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          Description &amp; Specifications
                        </label>
                        <textarea
                          rows={2}
                          value={newTicketForm.description}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, description: e.target.value }))}
                          placeholder="Provide detailed instructions or requirements..."
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#1E293B',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.78rem',
                            resize: 'vertical',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Priority */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          Priority
                        </label>
                        <select
                          value={newTicketForm.priority}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, priority: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: '#1E293B',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.8rem',
                          }}
                        >
                          <option value="High">🔴 High Priority</option>
                          <option value="Medium">🔵 Medium Priority</option>
                          <option value="Low">⚪ Low Priority</option>
                        </select>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setIsNewTicketModalOpen(false)}
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '6px', fontSize: '0.76rem', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                            border: 'none',
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Create Ticket
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 8: MASTER CREDENTIAL & PASSWORD GOVERNANCE
            ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'security-credentials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Banner */}
            <div
              className="fixkar-panel"
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    👑 Master Credential &amp; Access Governance
                  </h2>
                  <p style={{ fontSize: '0.78rem', color: '#FDE047', margin: '2px 0 0' }}>
                    Sovereign Security Rule: Super Admin possesses exclusive root sovereignty to change Admin and Super Admin credentials. Regular Admins cannot modify passwords.
                  </p>
                </div>
              </div>
            </div>

            {/* 2-Column Grid: Admin Password Management & Super Admin PIN Management */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
              {/* Card 1: Change Admin Master Password */}
              <div className="fixkar-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={18} color="#38BDF8" />
                    <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>
                      Update Admin Master Password
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.66rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                    OPERATIONS ADMIN
                  </span>
                </div>

                <p style={{ fontSize: '0.76rem', color: '#94A3B8', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Set a new master password for normal Operations Admins (e.g. <code>admin</code>). Once saved, regular admins will immediately use this new password to authenticate.
                </p>

                {adminPassMsg && (
                  <div
                    style={{
                      background: adminPassMsg.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: `1px solid ${adminPassMsg.type === 'success' ? '#4ADE80' : '#EF4444'}`,
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '0.78rem',
                      color: adminPassMsg.type === 'success' ? '#86EFAC' : '#FCA5A5',
                      marginBottom: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {adminPassMsg.text}
                  </div>
                )}

                <form onSubmit={handleUpdateAdminPassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#CBD5E1', marginBottom: '5px', fontWeight: 700 }}>
                      Target Admin Account
                    </label>
                    <input
                      type="text"
                      value={adminTargetUsername}
                      onChange={(e) => setAdminTargetUsername(e.target.value)}
                      placeholder="e.g. admin"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#CBD5E1',
                        fontSize: '0.82rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#CBD5E1', marginBottom: '5px', fontWeight: 700 }}>
                      New Admin Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.82rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#CBD5E1', marginBottom: '5px', fontWeight: 700 }}>
                      Confirm New Admin Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmAdminPassword}
                      onChange={(e) => setConfirmAdminPassword(e.target.value)}
                      placeholder="Re-type new password to confirm"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.82rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={adminPassSaving}
                    style={{
                      marginTop: '6px',
                      background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)',
                    }}
                  >
                    <Key size={14} />
                    <span>{adminPassSaving ? 'Saving Admin Password...' : 'Save & Publish New Admin Password'}</span>
                  </button>
                </form>
              </div>

              {/* Card 2: Change Super Admin Sovereign Master PIN */}
              <div
                className="fixkar-panel"
                style={{
                  padding: '24px',
                  background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, rgba(15, 23, 42, 0.4) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldAlert size={18} color="#F59E0B" />
                    <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#FDE047' }}>
                      Update Super Admin Master PIN
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.66rem', background: 'rgba(245, 158, 11, 0.2)', color: '#FDE047', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
                    👑 GOD-MODE ROOT
                  </span>
                </div>

                <p style={{ fontSize: '0.76rem', color: '#CBD5E1', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Change the sovereign Master Secret PIN used to unlock Super Admin mode, trigger emergency lockdown, and authorize live wholesale unit economics.
                </p>

                {superPinMsg && (
                  <div
                    style={{
                      background: superPinMsg.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: `1px solid ${superPinMsg.type === 'success' ? '#4ADE80' : '#EF4444'}`,
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '0.78rem',
                      color: superPinMsg.type === 'success' ? '#86EFAC' : '#FCA5A5',
                      marginBottom: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {superPinMsg.text}
                  </div>
                )}

                <form onSubmit={handleUpdateSuperPin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#FDE047', marginBottom: '5px', fontWeight: 700 }}>
                      Current Super User
                    </label>
                    <input
                      type="text"
                      disabled
                      value="fixkar_root (Lead System Architect & Founder)"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '8px',
                        color: '#94A3B8',
                        fontSize: '0.82rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#FDE047', marginBottom: '5px', fontWeight: 700 }}>
                      New Super Admin PIN / Secret Key *
                    </label>
                    <input
                      type="password"
                      required
                      value={newSuperPin}
                      onChange={(e) => setNewSuperPin(e.target.value)}
                      placeholder="Enter new Super PIN (min 4 chars)"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(245, 158, 11, 0.45)',
                        borderRadius: '8px',
                        color: '#FDE047',
                        fontSize: '0.85rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.1em',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#FDE047', marginBottom: '5px', fontWeight: 700 }}>
                      Confirm New Super Admin PIN *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmSuperPin}
                      onChange={(e) => setConfirmSuperPin(e.target.value)}
                      placeholder="Re-type Super PIN to confirm"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(245, 158, 11, 0.45)',
                        borderRadius: '8px',
                        color: '#FDE047',
                        fontSize: '0.85rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.1em',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={superPinSaving}
                    style={{
                      marginTop: '6px',
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(217, 119, 6, 0.45)',
                    }}
                  >
                    <ShieldCheck size={15} />
                    <span>{superPinSaving ? 'Updating Sovereign PIN...' : '👑 Set New Super Admin Sovereign PIN'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: CLIENT INBOUND EMAILS (support@fixkar.co.in) ────────── */}
        {activeTab === 'emails' && (() => {
          const filteredInbound = inboundEmails.filter((email) => {
            if (!emailSearchQuery) return true;
            const q = emailSearchQuery.toLowerCase();
            return (
              (email.from && String(email.from).toLowerCase().includes(q)) ||
              (email.subject && String(email.subject).toLowerCase().includes(q)) ||
              (email.text && String(email.text).toLowerCase().includes(q)) ||
              (email.to && String(email.to).toLowerCase().includes(q))
            );
          });

          const handleMarkInboundRead = async (email) => {
            setSelectedInboundEmailModal(email);
            if (email.status === 'UNREAD') {
              try {
                await fetch(`${API_BASE}/api/admin/emails/inbound/mark-read`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                  },
                  body: JSON.stringify({ id: email.id }),
                });
                setInboundEmails(prev => prev.map(e => e.id === email.id ? { ...e, status: 'READ' } : e));
              } catch (err) {
                console.error(err);
              }
            }
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Header Search & Actions Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ position: 'relative', flex: '1 1 320px', maxWidth: '480px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="text"
                    value={emailSearchQuery}
                    onChange={(e) => setEmailSearchQuery(e.target.value)}
                    placeholder="Search client sender, subject, or message content..."
                    style={{
                      width: '100%',
                      padding: '9px 14px 9px 34px',
                      background: 'rgba(17, 24, 39, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#94A3B8', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '6px 12px', borderRadius: '8px' }}>
                    <Mail size={13} color="#38BDF8" />
                    <span>Destination: <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>support@fixkar.co.in</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={fetchAllSuperData}
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38BDF8',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Refresh Feed</span>
                  </button>
                </div>
              </div>

              {/* Inbound Emails Table (Responsive, Fixed Layout, Zero Horizontal Overflow) */}
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
                <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th style={{ width: '28%', padding: '12px 14px', color: '#94A3B8', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CLIENT SENDER</th>
                      <th style={{ width: '44%', padding: '12px 14px', color: '#94A3B8', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SUBJECT &amp; MESSAGE</th>
                      <th style={{ width: '16%', padding: '12px 14px', color: '#94A3B8', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>RECEIVED (IST)</th>
                      <th style={{ width: '12%', padding: '12px 14px', color: '#94A3B8', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInbound.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '36px', textAlign: 'center', color: '#94A3B8' }}>
                          <Mail size={30} style={{ opacity: 0.3, margin: '0 auto 10px', display: 'block' }} />
                          No client emails in inbox yet. Incoming messages sent to <strong>support@fixkar.co.in</strong> will land here automatically.
                        </td>
                      </tr>
                    ) : (
                      filteredInbound.map((email, idx) => {
                        const rawFrom = email.from || 'Unknown Client';
                        const fromName = rawFrom.includes('<') ? rawFrom.split('<')[0].trim() : rawFrom;
                        const fromEmail = rawFrom.includes('<') ? rawFrom.match(/<([^>]+)>/)?.[1] || rawFrom : rawFrom;

                        return (
                          <tr
                            key={email.id || idx}
                            onClick={() => handleMarkInboundRead(email)}
                            style={{
                              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                              background: email.status === 'UNREAD' ? 'rgba(56, 189, 248, 0.05)' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = email.status === 'UNREAD' ? 'rgba(56, 189, 248, 0.05)' : 'transparent'; }}
                          >
                            <td style={{ padding: '12px 14px', overflow: 'hidden' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {email.status === 'UNREAD' && (
                                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#38BDF8', display: 'inline-block', flexShrink: 0 }} />
                                )}
                                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {fromName || fromEmail}
                                  </div>
                                  <div style={{ color: '#FDE047', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'monospace' }}>
                                    {fromEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px', overflow: 'hidden' }}>
                              <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email.subject || 'Client Inquiry'}
                              </div>
                              <div style={{ color: '#94A3B8', fontSize: '0.73rem', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email.text || email.html?.replace(/<[^>]*>?/gm, '') || 'No text snippet'}
                              </div>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#94A3B8', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {email.timestamp || (email.receivedAt ? new Date(email.receivedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent')}
                            </td>
                            <td style={{ padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleMarkInboundRead(email); }}
                                style={{
                                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
                                  border: '1px solid rgba(56, 189, 248, 0.4)',
                                  color: '#38BDF8',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <Eye size={12} />
                                <span>Read</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}
      </main>

      {/* ─── MODAL: READ INBOUND CLIENT EMAIL ─────────────────────────────── */}
      {selectedInboundEmailModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedInboundEmailModal(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '640px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 28, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', fontWeight: 800 }}>
                  📥 INBOUND CLIENT MESSAGE (support@fixkar.co.in)
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.05rem', color: '#fff', fontWeight: 800 }}>
                  {selectedInboundEmailModal.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInboundEmailModal(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ margin: '16px 0', fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>From Client:</strong> <span style={{ color: '#FDE047', fontWeight: 700 }}>{selectedInboundEmailModal.from}</span></div>
              <div><strong>To Address:</strong> <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{selectedInboundEmailModal.to || 'support@fixkar.co.in'}</span></div>
              <div><strong>Received Date:</strong> {selectedInboundEmailModal.timestamp || new Date(selectedInboundEmailModal.receivedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
            </div>

            <div style={{ background: '#0B0418', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px', color: '#E2E8F0', fontSize: '0.85rem', lineHeight: 1.6, minHeight: '120px' }}>
              {selectedInboundEmailModal.html ? (
                <div dangerouslySetInnerHTML={{ __html: selectedInboundEmailModal.html }} />
              ) : (
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedInboundEmailModal.text}</div>
              )}
            </div>

            {/* ─── SENT REPLIES CONVERSATION THREAD ────────────────────────── */}
            {(() => {
              const clientEmail = (selectedInboundEmailModal.from || '').toLowerCase();
              const modalId = selectedInboundEmailModal.id;
              const directReplies = selectedInboundEmailModal.replies || [];
              const logReplies = (emailLogs || []).filter((log) => {
                const logRecip = (log.recipient || '').toLowerCase();
                return (
                  (log.inReplyToId && log.inReplyToId === modalId) ||
                  (logRecip && clientEmail.includes(logRecip))
                );
              });
              const combined = [...directReplies, ...logReplies];
              const threadReplies = Array.from(new Map(combined.map(item => [item.id || item.timestamp, item])).values());

              if (threadReplies.length === 0) return null;

              return (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.5px' }}>
                    <CheckCircle2 size={13} color="#4ADE80" />
                    <span>OUR SENT REPLIES ({threadReplies.length})</span>
                  </div>

                  {threadReplies.map((reply, rIdx) => (
                    <div
                      key={reply.id || rIdx}
                      style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.35)',
                        borderLeft: '4px solid #38BDF8',
                        borderRadius: '10px',
                        padding: '12px 16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ fontSize: '0.78rem', color: '#93C5FD', fontWeight: 700 }}>
                          From Fixkar Desk: <span style={{ fontFamily: 'monospace', color: '#fff' }}>support@fixkar.co.in</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.68rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', color: '#4ADE80', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                            ✓ {reply.status || 'DELIVERED'}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                            {reply.formattedTime || (reply.timestamp ? new Date(reply.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Recently')}
                          </span>
                        </div>
                      </div>
                      <div style={{ color: '#F1F5F9', fontSize: '0.86rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                        {reply.message || reply.text}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* ─── IN-DASHBOARD DIRECT EMAIL REPLY COMPOSER ─────────────────── */}
            {showInboundReplyComposer ? (
              <div style={{ marginTop: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8' }}>✉️ Quick Reply from support@fixkar.co.in</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowInboundReplyComposer(false); setInboundReplyStatus(null); }}
                    style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '8px' }}>
                  Replying to: <strong style={{ color: '#FDE047' }}>{selectedInboundEmailModal.from}</strong> | Subject: <strong style={{ color: '#E2E8F0' }}>Re: {selectedInboundEmailModal.subject || 'Inquiry to Fixkar'}</strong>
                </div>

                <textarea
                  value={inboundReplyText}
                  onChange={(e) => setInboundReplyText(e.target.value)}
                  placeholder="Type your official response to the client here... (Fixkar header, signature and branding will be added automatically)"
                  rows={4}
                  style={{
                    width: '100%',
                    background: '#0B0418',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />

                {inboundReplyStatus && (
                  <div style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: inboundReplyStatus.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: inboundReplyStatus.type === 'success' ? '#4ADE80' : '#F87171',
                    border: `1px solid ${inboundReplyStatus.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                  }}>
                    {inboundReplyStatus.text}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleSendInboundReply}
                    disabled={isInboundReplying || !inboundReplyText.trim()}
                    style={{
                      background: isInboundReplying || !inboundReplyText.trim() ? 'rgba(2, 132, 199, 0.4)' : 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: isInboundReplying || !inboundReplyText.trim() ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Send size={14} />
                    <span>{isInboundReplying ? 'Sending...' : '🚀 Send Email to Client'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Received at support@fixkar.co.in
                </span>

                <button
                  type="button"
                  onClick={() => setShowInboundReplyComposer(true)}
                  style={{
                    background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Send size={13} />
                  <span>Reply to Client Directly</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL: INSPECT FULL OUTBOUND EMAIL COPY ───────────────────────── */}
      {selectedEmailForModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEmailForModal(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '620px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 28, 0.99) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#FDE047', fontFamily: 'monospace', fontWeight: 800 }}>
                  👑 VERIFIED OUTBOUND EMAIL RECORD
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1rem', color: '#fff', fontWeight: 800 }}>
                  {selectedEmailForModal.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEmailForModal(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ margin: '16px 0', fontSize: '0.78rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>To:</strong> <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{selectedEmailForModal.to}</span></div>
              <div><strong>Sender:</strong> <span style={{ fontFamily: 'monospace' }}>Fixkar Security &lt;no-reply@fixkar.co.in&gt;</span></div>
              <div><strong>Provider:</strong> <span style={{ color: '#A855F7' }}>{selectedEmailForModal.engine}</span></div>
              <div><strong>Delivery Status:</strong> <span style={{ color: '#4ADE80' }}>● {selectedEmailForModal.status}</span></div>
              <div><strong>Timestamp:</strong> {selectedEmailForModal.isoTimestamp ? new Date(selectedEmailForModal.isoTimestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'N/A'}</div>
            </div>

            <div style={{ background: '#0B0418', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '0.82rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#DDD6FE', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>
                Email Copy Details
              </div>
              <p style={{ margin: '0 0 10px', color: '#DDD6FE' }}>{selectedEmailForModal.subject}</p>
              {selectedEmailForModal.otp && (
                <div style={{ background: 'rgba(253, 224, 71, 0.1)', border: '1px dashed #FDE047', padding: '12px', borderRadius: '8px', textAlign: 'center', margin: '12px 0' }}>
                  <div style={{ fontSize: '0.72rem', color: '#DDD6FE', fontWeight: 800 }}>DISPATCHED 6-DIGIT OTP</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FDE047', fontFamily: 'monospace', letterSpacing: '0.2em' }}>
                    {selectedEmailForModal.otp}
                  </div>
                </div>
              )}
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '10px', lineHeight: 1.5 }}>
                ✅ Cryptographically verified and delivered to recipient inbox via Resend &amp; Firebase Cloud.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: GENERATE CLIENT API KEY ──────────────────────────────── */}
      {isGenerateApiKeyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsGenerateApiKeyModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '500px',
              background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(10, 15, 28, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Generate Unique Client API Key
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateApiKeyModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleGenerateClientApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Select Client (from Registered Directory) *
                </label>
                <select
                  required
                  value={newApiKeyForm.clientCode}
                  onChange={(e) => {
                    const selCode = e.target.value;
                    const found = clients.find((c) => c.clientCode === selCode || c.id === selCode);
                    if (found) {
                      setNewApiKeyForm({
                        clientCode: found.clientCode || selCode,
                        clientName: found.businessName || found.contactPerson || 'Client Website',
                        dltSenderId: found.dltSenderId || (found.clientCode ? found.clientCode.replace('FIX-', '').slice(0, 6) : 'FIXKAR').toUpperCase(),
                      });
                    } else {
                      setNewApiKeyForm({ ...newApiKeyForm, clientCode: selCode });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: '#0D1323',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                  }}
                >
                  <option value="">-- Choose Registered Client --</option>
                  {clients.map((c) => (
                    <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                      {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.contactPerson})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Client Business Name
                </label>
                <input
                  type="text"
                  required
                  value={newApiKeyForm.clientName}
                  onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, clientName: e.target.value })}
                  placeholder="e.g. R.K. Computer Classes"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.84rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  DLT Sender Header (6 Characters)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newApiKeyForm.dltSenderId}
                  onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, dltSenderId: e.target.value.toUpperCase() })}
                  placeholder="e.g. RKCCPT"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#93C5FD',
                    fontSize: '0.84rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                  }}
                />
              </div>

              {/* ─── SMS PACK SELECTION ────────────────────────────────────────── */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#FBBF24', display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 700 }}>
                    <span>Select Initial SMS Recharge Pack *</span>
                    <span style={{ color: '#86EFAC', fontFamily: 'monospace' }}>+{Number(newApiKeyForm.credits || 0).toLocaleString()} Credits</span>
                  </label>
                  <select
                    value={newApiKeyForm.packId}
                    onChange={(e) => {
                      const selId = e.target.value;
                      if (selId === 'otp_trial_100') {
                        setNewApiKeyForm({ ...newApiKeyForm, packId: selId, credits: 100, price: 0 });
                      } else if (selId === 'custom') {
                        setNewApiKeyForm({ ...newApiKeyForm, packId: 'custom' });
                      } else {
                        const foundPack = (otpPricing.packages || []).find((p) => p.id === selId);
                        if (foundPack) {
                          setNewApiKeyForm({
                            ...newApiKeyForm,
                            packId: selId,
                            credits: foundPack.credits,
                            price: foundPack.price,
                          });
                        }
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#0B1120',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    <option value="otp_trial_100">🎁 [Trial Starter] 100 Free Test Credits (₹0 Free)</option>
                    {(otpPricing.packages || []).map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        ⚡ [{pkg.name}] {pkg.credits.toLocaleString()} SMS — ₹{pkg.price} (@ ₹{pkg.ratePerSms}/SMS)
                      </option>
                    ))}
                    <option value="custom">⚙️ [Custom Quota] Enter Custom SMS Credits &amp; Amount</option>
                  </select>
                </div>

                {newApiKeyForm.packId === 'custom' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginBottom: '3px' }}>Credits (SMS)</label>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        value={newApiKeyForm.credits}
                        onChange={(e) => {
                          const cr = Number(e.target.value) || 0;
                          const pr = Math.round(cr * (Number(otpPricing.baseRetailRatePerSms) || 0.25));
                          setNewApiKeyForm({ ...newApiKeyForm, credits: cr, price: pr });
                        }}
                        style={{ width: '100%', padding: '6px 10px', background: '#070C18', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginBottom: '3px' }}>Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={newApiKeyForm.price}
                        onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, price: Number(e.target.value) || 0 })}
                        style={{ width: '100%', padding: '6px 10px', background: '#070C18', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700 }}
                      />
                    </div>
                  </div>
                )}

                {/* ─── ALLOCATION MODE TOGGLE ─────────────────────────────────── */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#CBD5E1', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                    Payment &amp; Funding Allocation Mode *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setNewApiKeyForm({ ...newApiKeyForm, allocationType: 'COMPLIMENTARY' })}
                      style={{
                        background: newApiKeyForm.allocationType === 'COMPLIMENTARY' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${newApiKeyForm.allocationType === 'COMPLIMENTARY' ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)'}`,
                        color: newApiKeyForm.allocationType === 'COMPLIMENTARY' ? '#38BDF8' : '#94A3B8',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>🎁 Complimentary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewApiKeyForm({ ...newApiKeyForm, allocationType: 'BANK_TRANSFER' })}
                      style={{
                        background: newApiKeyForm.allocationType === 'BANK_TRANSFER' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${newApiKeyForm.allocationType === 'BANK_TRANSFER' ? '#4ADE80' : 'rgba(255, 255, 255, 0.1)'}`,
                        color: newApiKeyForm.allocationType === 'BANK_TRANSFER' ? '#4ADE80' : '#94A3B8',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>🏦 Bank Transfer / UTR</span>
                    </button>
                  </div>
                </div>

                {/* ─── UTR NUMBER INPUT (IF BANK TRANSFER) ───────────────────── */}
                {newApiKeyForm.allocationType === 'BANK_TRANSFER' && (
                  <div style={{ background: 'rgba(74, 222, 128, 0.06)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#86EFAC', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                        Bank / UPI UTR Transaction Reference No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={newApiKeyForm.utrNumber}
                        onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, utrNumber: e.target.value })}
                        placeholder="e.g. 423891002931 or IMPS9835"
                        style={{
                          width: '100%',
                          padding: '7px 10px',
                          background: '#050B14',
                          border: '1px solid rgba(74, 222, 128, 0.4)',
                          borderRadius: '6px',
                          color: '#86EFAC',
                          fontSize: '0.82rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>
                      ● Auto-records verified recharge of <strong>₹{newApiKeyForm.price}</strong> into 48h Bank Radar &amp; Client Ledger.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={16} color="#38BDF8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.72rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                  <strong>Zero-Leak Security:</strong> This isolated key will only authorize OTP dispatches for <strong>{newApiKeyForm.clientCode || 'selected client'}</strong>. Balance will automatically deduct from their Fixkar virtual wallet.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsGenerateApiKeyModalOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94A3B8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                  }}
                >
                  <Sparkles size={14} />
                  <span>Generate Isolated API Key</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          MODAL: INSTANT TOP-UP SMS CREDITS (SAME API KEY GRANT)
          ═════════════════════════════════════════════════════════════════ */}
      {topupModalKey && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTopupModalKey(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(10, 15, 28, 0.99) 100%)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} color="#4ADE80" />
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Top-Up SMS Credits on Same API Key
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: '#93C5FD', fontFamily: 'monospace', marginTop: '2px' }}>
                    Client: {topupModalKey.clientName} ({topupModalKey.clientCode})
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTopupModalKey(null)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleTopUpClientWallet} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Existing API Key Token Banner */}
              <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '10px', padding: '10px 14px' }}>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                  Permanent Client API Key (Unchanged)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#FDE047', fontFamily: 'monospace', fontWeight: 700, marginTop: '3px' }}>
                  {topupModalKey.apiKey ? `${topupModalKey.apiKey.slice(0, 24)}••••••••` : 'Active Key'}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#86EFAC', marginTop: '4px' }}>
                  ● Current Balance: <strong>{(topupModalKey.availableCredits || 0).toLocaleString()} Credits</strong>
                </div>
              </div>

              {/* Select Recharge Pack */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 700 }}>
                  <span>Select Top-Up SMS Pack *</span>
                  <span style={{ color: '#86EFAC', fontFamily: 'monospace' }}>+{Number(topupForm.credits || 0).toLocaleString()} Credits</span>
                </label>
                <select
                  value={topupForm.packId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    if (selId === 'custom') {
                      setTopupForm({ ...topupForm, packId: 'custom' });
                    } else {
                      const foundPack = (otpPricing.packages || []).find((p) => p.id === selId);
                      if (foundPack) {
                        setTopupForm({
                          ...topupForm,
                          packId: selId,
                          credits: foundPack.credits,
                          price: foundPack.price,
                        });
                      }
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0B1120',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  {(otpPricing.packages || []).map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      ⚡ [{pkg.name}] {pkg.credits.toLocaleString()} SMS — ₹{pkg.price} (@ ₹{pkg.ratePerSms}/SMS)
                    </option>
                  ))}
                  <option value="custom">⚙️ [Custom Quota] Enter Custom SMS Credits &amp; Amount</option>
                </select>
              </div>

              {topupForm.packId === 'custom' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginBottom: '3px' }}>Credits (SMS)</label>
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={topupForm.credits}
                      onChange={(e) => {
                        const cr = Number(e.target.value) || 0;
                        const pr = Math.round(cr * (Number(otpPricing.baseRetailRatePerSms) || 0.25));
                        setTopupForm({ ...topupForm, credits: cr, price: pr });
                      }}
                      style={{ width: '100%', padding: '6px 10px', background: '#070C18', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginBottom: '3px' }}>Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={topupForm.price}
                      onChange={(e) => setTopupForm({ ...topupForm, price: Number(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '6px 10px', background: '#070C18', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700 }}
                    />
                  </div>
                </div>
              )}

              {/* Payment Mode Toggle */}
              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', display: 'block', marginBottom: '6px', fontWeight: 700 }}>
                  Funding &amp; Allocation Mode *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setTopupForm({ ...topupForm, allocationType: 'BANK_TRANSFER' })}
                    style={{
                      background: topupForm.allocationType === 'BANK_TRANSFER' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${topupForm.allocationType === 'BANK_TRANSFER' ? '#4ADE80' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: topupForm.allocationType === 'BANK_TRANSFER' ? '#4ADE80' : '#94A3B8',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>🏦 Bank Transfer / UTR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTopupForm({ ...topupForm, allocationType: 'COMPLIMENTARY' })}
                    style={{
                      background: topupForm.allocationType === 'COMPLIMENTARY' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${topupForm.allocationType === 'COMPLIMENTARY' ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: topupForm.allocationType === 'COMPLIMENTARY' ? '#38BDF8' : '#94A3B8',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>🎁 Complimentary Grant</span>
                  </button>
                </div>
              </div>

              {/* UTR Input */}
              {topupForm.allocationType === 'BANK_TRANSFER' && (
                <div style={{ background: 'rgba(74, 222, 128, 0.06)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#86EFAC', display: 'block', marginBottom: '3px', fontWeight: 700 }}>
                      Bank / UPI UTR Transaction Reference No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={topupForm.utrNumber}
                      onChange={(e) => setTopupForm({ ...topupForm, utrNumber: e.target.value })}
                      placeholder="e.g. 423891002931 or IMPS-9835"
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        background: '#050B14',
                        border: '1px solid rgba(74, 222, 128, 0.4)',
                        borderRadius: '6px',
                        color: '#86EFAC',
                        fontSize: '0.82rem',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>
                    ● Auto-records verified recharge of <strong>₹{topupForm.price}</strong> into 48h Bank Radar &amp; Client Ledger.
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setTopupModalKey(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94A3B8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)',
                  }}
                >
                  <Sparkles size={14} />
                  <span>Grant +{Number(topupForm.credits || 0).toLocaleString()} SMS Credits</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════
          MODAL: CREATE NEW TOP-UP PLAN (MANUAL PLAN BUILDER)
          ═════════════════════════════════════════════════════════════════ */}
      {isAddPlanModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.15s ease',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddPlanModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 17, 32, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.15)',
              borderRadius: '18px',
              padding: '24px',
              color: '#fff',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '8px', borderRadius: '10px', color: '#38BDF8' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                    Create New Top-Up Plan
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                    Manually specify custom SMS credits, price, rate, and description
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPlanModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitNewPlan} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* 1. Plan Name */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '5px', fontWeight: 700 }}>
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPlanForm.name}
                  onChange={(e) => handleNewPlanFormChange('name', e.target.value)}
                  placeholder="e.g. Agency Jumbo Pack, Coaching Starter Plus"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* 2. Credits & Rate row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '5px', fontWeight: 700 }}>
                    Total SMS Credits *
                  </label>
                  <input
                    type="number"
                    required
                    step="500"
                    min="100"
                    max="1000000"
                    value={newPlanForm.credits}
                    onChange={(e) => handleNewPlanFormChange('credits', e.target.value)}
                    placeholder="e.g. 15000"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: '#0B1120',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '8px',
                      color: '#38BDF8',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '5px', fontWeight: 700 }}>
                    Retail Rate / SMS (₹)
                  </label>
                  <input
                    type="number"
                    step="0.005"
                    min="0.01"
                    max="2.00"
                    value={newPlanForm.ratePerSms}
                    onChange={(e) => handleNewPlanFormChange('ratePerSms', e.target.value)}
                    placeholder="e.g. 0.20"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      background: '#0B1120',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '8px',
                      color: '#38BDF8',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* 3. Total Pack Price */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '5px', fontWeight: 700 }}>
                  Total Pack Price for Client (₹)
                </label>
                <input
                  type="number"
                  required
                  step="5"
                  min="10"
                  max="500000"
                  value={newPlanForm.price}
                  onChange={(e) => handleNewPlanFormChange('price', e.target.value)}
                  placeholder="e.g. 3000"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: '#0B1120',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    borderRadius: '8px',
                    color: '#4ADE80',
                    fontSize: '1.05rem',
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* 4. Live Margin Calculation Telemetry Bar */}
              <div style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Wholesale Cost: </span>
                  <strong style={{ color: '#CBD5E1', fontFamily: 'monospace' }}>
                    ₹{(Number(newPlanForm.credits || 0) * (Number(otpPricing.wholesaleCostPerSms) || 0.125)).toFixed(2)}
                  </strong>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Net Studio Profit: </span>
                  <strong style={{ color: '#4ADE80', fontFamily: 'monospace' }}>
                    +₹{(Number(newPlanForm.price || 0) - Number(newPlanForm.credits || 0) * (Number(otpPricing.wholesaleCostPerSms) || 0.125)).toFixed(2)}
                  </strong>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Margin: </span>
                  <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>
                    {newPlanForm.price > 0 ? (((newPlanForm.price - (newPlanForm.credits * (Number(otpPricing.wholesaleCostPerSms) || 0.125))) / newPlanForm.price) * 100).toFixed(1) : 0}%
                  </strong>
                </div>
              </div>

              {/* 5. Plan Description */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '5px', fontWeight: 700 }}>
                  Client Portal Description
                </label>
                <textarea
                  rows={2}
                  value={newPlanForm.desc}
                  onChange={(e) => handleNewPlanFormChange('desc', e.target.value)}
                  placeholder="e.g. Best value for high-volume admission alerts and parent notifications."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#CBD5E1',
                    fontSize: '0.78rem',
                    boxSizing: 'border-box',
                    resize: 'none',
                  }}
                />
              </div>

              {/* 6. Popular Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <input
                  type="checkbox"
                  id="newPlanPopular"
                  checked={newPlanForm.popular}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, popular: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="newPlanPopular" style={{ fontSize: '0.78rem', color: '#FDE047', fontWeight: 700, cursor: 'pointer' }}>
                  ⭐ Mark as "Most Popular" Plan on Client Portal
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddPlanModalOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94A3B8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '9px 22px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.45)',
                  }}
                >
                  <Plus size={15} />
                  <span>Add Plan to Matrix</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: DUAL-KEY EMERGENCY KILL-SWITCH & LOCKDOWN SAFEGUARD ─────── */}
      {showKillSwitchModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(5, 8, 16, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #180B10 0%, #0D0508 100%)',
              border: `1px solid ${isKillSwitchActive ? 'rgba(74, 222, 128, 0.5)' : 'rgba(239, 68, 68, 0.6)'}`,
              borderRadius: '20px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: isKillSwitchActive 
                ? '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 45px rgba(34, 197, 94, 0.35)' 
                : '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(239, 68, 68, 0.45)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                background: isKillSwitchActive 
                  ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)' 
                  : 'linear-gradient(90deg, rgba(220, 38, 38, 0.25) 0%, rgba(153, 27, 27, 0.15) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isKillSwitchActive 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: isKillSwitchActive ? '0 0 15px rgba(16, 185, 129, 0.5)' : '0 0 20px rgba(239, 68, 68, 0.6)',
                  }}
                >
                  <Power size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                    {isKillSwitchActive ? '🟢 Lift Emergency Lockdown' : '🚨 Global Emergency Kill-Switch'}
                  </h3>
                  <span style={{ fontSize: '0.68rem', color: isKillSwitchActive ? '#86EFAC' : '#FDA4AF', fontFamily: 'monospace' }}>
                    DUAL-KEY MASTER SECURITY PROTOCOL
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowKillSwitchModal(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleExecuteKillSwitch} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Alert Banner */}
              <div
                style={{
                  background: isKillSwitchActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${isKillSwitchActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.35)'}`,
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '0.78rem',
                  color: isKillSwitchActive ? '#A7F3D0' : '#FECDD3',
                  lineHeight: 1.5,
                }}
              >
                {isKillSwitchActive ? (
                  <div>
                    <strong>Quarantine Mode Currently Active:</strong> All outgoing client OTP API dispatches are paused. Authenticate below to lift lockdown and resume traffic.
                  </div>
                ) : (
                  <div>
                    <strong>⚠️ HIGH-SEVERITY ACTION:</strong> Activating this will <strong>immediately freeze all client OTP API dispatches</strong> across all client websites in real-time. Automated security dispatches will be delivered to Super Admin and Admin emails.
                  </div>
                )}
              </div>

              {killSwitchError && (
                <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', borderRadius: '8px', padding: '9px 12px', color: '#FCA5A5', fontSize: '0.78rem', fontWeight: 700 }}>
                  ⚠️ {killSwitchError}
                </div>
              )}

              {/* Key 1: Super Admin PIN */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#FDE047', fontWeight: 800, marginBottom: '6px' }}>
                  <span>👑 Key #1: Super Admin PIN (GOD-MODE) *</span>
                  <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontFamily: 'monospace' }}>Master Sovereign PIN</span>
                </label>
                <input
                  type="password"
                  required
                  value={killSwitchSuperPin}
                  onChange={(e) => setKillSwitchSuperPin(e.target.value)}
                  placeholder="Enter Super Admin PIN (e.g. 9835)"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '10px',
                    color: '#FDE047',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    letterSpacing: '0.1em',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Key 2: Admin Master Password */}
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#38BDF8', fontWeight: 800, marginBottom: '6px' }}>
                  <span>🛡️ Key #2: Operations Admin Password *</span>
                  <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontFamily: 'monospace' }}>Dual-Key Verification</span>
                </label>
                <input
                  type="password"
                  required
                  value={killSwitchAdminPass}
                  onChange={(e) => setKillSwitchAdminPass(e.target.value)}
                  placeholder="Enter Admin Master Password"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '10px',
                    color: '#93C5FD',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Reason / Incident Memo */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 700, marginBottom: '6px' }}>
                  Incident Memo / Reason (Dispatched in Security Email)
                </label>
                <textarea
                  rows={2}
                  value={killSwitchReason}
                  onChange={(e) => setKillSwitchReason(e.target.value)}
                  placeholder="e.g. Suspicious traffic spikes detected / Security audit drill"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#CBD5E1',
                    fontSize: '0.78rem',
                    boxSizing: 'border-box',
                    resize: 'none',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <button
                  type="button"
                  disabled={killSwitchSubmitting}
                  onClick={() => setShowKillSwitchModal(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94A3B8',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={killSwitchSubmitting}
                  style={{
                    background: isKillSwitchActive
                      ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)'
                      : 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isKillSwitchActive
                      ? '0 4px 20px rgba(22, 163, 74, 0.5)'
                      : '0 4px 25px rgba(220, 38, 38, 0.65)',
                  }}
                >
                  <Power size={15} />
                  <span>
                    {killSwitchSubmitting
                      ? 'Verifying Dual-Keys & Dispatching Alerts...'
                      : isKillSwitchActive
                      ? '🟢 VERIFY & LIFT LOCKDOWN'
                      : '🚨 VERIFY & EXECUTE KILL-SWITCH'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
            border: '1px solid #10B981',
            boxShadow: '0 12px 35px rgba(0,0,0,0.85), 0 0 25px rgba(16, 185, 129, 0.4)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '0.86rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <CheckCircle2 size={18} color="#4ADE80" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
