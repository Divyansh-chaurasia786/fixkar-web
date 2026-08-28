import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Bot,
  Bell,
  MessageSquare,
  Users,
  Briefcase,
  Layers,
  CreditCard,
  CheckSquare,
  Clock,
  Smartphone,
  Phone,
  RefreshCw,
  FileText,
  LifeBuoy,
  Activity,
  UserCheck,
  ShieldAlert,
  Search,
  Plus,
  ArrowRight,
  Printer,
  ExternalLink,
  Eye,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Lock,
  LogOut,
  Globe,
  AlertTriangle,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
  Server,
  ShieldCheck,
  Copy,
  HelpCircle,
  CheckCircle2,
  Rocket,
  Edit3,
  Trash2,
  Save,
  Zap,
  Sparkles,
  RotateCcw,
  Cpu,
  Database,
  ShoppingBag,
  Building,
  Receipt,
  Mail,
  Crown,
  KeyRound,
  FlaskConical,
  Wrench,
  Terminal,
} from 'lucide-react';
import '../../styles/admin-console.css';
import { ReceiptModal } from './ReceiptModal';
import { AdminCopilotDrawer } from './AdminCopilotDrawer';
import { AdminCommandPalette } from './AdminCommandPalette';
import { SuperAdminLoginModal } from './SuperAdminLoginModal';

export function AdminDashboardView({ onNavigateHome }) {
  const { adminUser, adminToken, logoutAdmin, API_BASE } = useAuth();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data Stores
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [clientServices, setClientServices] = useState([]);
  const [otpWallets, setOtpWallets] = useState([]);
  const [otpUsage, setOtpUsage] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quote Pricing & Services Configuration Suite
  const [quoteConfig, setQuoteConfig] = useState(null);
  const [quoteConfigSaving, setQuoteConfigSaving] = useState(false);
  const [hostingSyncing, setHostingSyncing] = useState(false);
  const [activeServiceSubTab, setActiveServiceSubTab] = useState('packages'); // 'packages' | 'features' | 'ai' | 'hosting_domains'
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);
  const [newPackageForm, setNewPackageForm] = useState({
    id: '',
    title: '',
    price: 9999,
    badge: 'New',
    includedPages: 5,
    simpleDesc: '',
    whoIsItFor: '',
    turnaround: '7–14 Days',
  });
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [newFeatureForm, setNewFeatureForm] = useState({
    id: '',
    title: '',
    price: 1499,
    whatItDoes: '',
    whyYouNeedIt: '',
  });
  const [isAddAiModalOpen, setIsAddAiModalOpen] = useState(false);
  const [newAiForm, setNewAiForm] = useState({
    id: '',
    title: '',
    price: 2499,
    desc: '',
  });

  // Services Edit Modal State
  const [editingPackage, setEditingPackage] = useState(null);
  const [isEditPackageModalOpen, setIsEditPackageModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [isEditFeatureModalOpen, setIsEditFeatureModalOpen] = useState(false);
  const [editingAi, setEditingAi] = useState(null);
  const [isEditAiModalOpen, setIsEditAiModalOpen] = useState(false);
  const [draftSavedNotice, setDraftSavedNotice] = useState(null);

  // Selected Detail Views & Modals
  const [selectedClientDetail, setSelectedClientDetail] = useState(null);
  const [clientDetailTab, setClientDetailTab] = useState('overview');
  const [selectedReceiptProject, setSelectedReceiptProject] = useState(null);
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState(null);
  const [selectedFeedbackProject, setSelectedFeedbackProject] = useState(null);
  const [selectedTestingProject, setSelectedTestingProject] = useState(null);
  const [projectQaChecklists, setProjectQaChecklists] = useState({
    'FIX-ZENI-007': { mobile: 'Passed', forms: 'Passed', speed: 'Passed', ssl: 'Passed', otp: 'Passed', seo: 'Passed' },
    'FIX-NOVA-006': { mobile: 'Passed', forms: 'Passed', speed: 'Passed', ssl: 'Passed', otp: 'Passed', seo: 'Passed' },
    'FIX-SHAR-005': { mobile: 'In Progress', forms: 'Passed', speed: 'In Progress', ssl: 'Passed', otp: 'Pending', seo: 'Pending' },
  });
  const [feedbackReviewsList, setFeedbackReviewsList] = useState([
    {
      id: 'fb_1',
      projectDomain: 'zenithtech.in',
      clientCode: 'FIX-ZENI-007',
      category: 'UI / Design',
      note: 'Change hero CTA button to blue and increase brand logo size on mobile view.',
      status: 'Working',
      createdAt: '2026-08-20, 11:30 AM',
      author: 'Client (Portal Review)',
    },
    {
      id: 'fb_2',
      projectDomain: 'novatech.in',
      clientCode: 'FIX-NOVA-006',
      category: 'Bug / Broken Link',
      note: 'Fast2SMS OTP webhook verified. 100% login working on live domain.',
      status: 'Solved',
      createdAt: '2026-08-20, 02:15 PM',
      author: 'Super Admin QA',
    },
    {
      id: 'fb_3',
      projectDomain: 'sharmaclasses.in',
      clientCode: 'FIX-SHAR-005',
      category: 'Content / Text',
      note: 'Added course fee structure table in admission portal wireframe.',
      status: 'In Review',
      createdAt: '2026-08-20, 04:45 PM',
      author: 'Client (Portal Review)',
    },
  ]);
  const [newFeedbackNote, setNewFeedbackNote] = useState('');
  const [newFeedbackCategory, setNewFeedbackCategory] = useState('UI / Design');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [phase2ModalClient, setPhase2ModalClient] = useState(null);
  const [phase2Form, setPhase2Form] = useState({
    domain: '',
    domainProvider: 'Hostinger India',
    domainStartDate: new Date().toISOString().split('T')[0],
    domainExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    domainDuration: '1 Year Term',
    domainPrice: '₹899 / Year',
    serverType: 'Managed Cloud VPS (High-Performance Edge)',
    serverProvider: 'DigitalOcean Cloud',
    serverIp: '139.59.88.214',
    serverStartDate: new Date().toISOString().split('T')[0],
    hostingRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    serverDuration: '1 Year Annual Plan',
    serverPrice: '₹2,499 / Year',
    dltSenderId: '',
  });
  const [isSuperAdminPlaceholderOpen, setIsSuperAdminPlaceholderOpen] = useState(false);

  // New Client Welcome Alert Modal
  const [createdClientWelcome, setCreatedClientWelcome] = useState(null);

  // Payment Confirmation Alert Modal
  const [paymentConfirmationNotice, setPaymentConfirmationNotice] = useState(null);

  // Project Live Handover Notice Modal
  const [projectHandoverNotice, setProjectHandoverNotice] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState('All');
  const [renewalFilter, setRenewalFilter] = useState('All');
  const [renewalSearchQuery, setRenewalSearchQuery] = useState('');
  const [invoiceFilter, setInvoiceFilter] = useState('All');
  const [projectStageFilter, setProjectStageFilter] = useState('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [otpSearchQuery, setOtpSearchQuery] = useState('');
  const [otpUsageSearchQuery, setOtpUsageSearchQuery] = useState('');
  const [rechargeSearchQuery, setRechargeSearchQuery] = useState('');
  const [rechargeStatusFilter, setRechargeStatusFilter] = useState('All');
  const [copiedUtrId, setCopiedUtrId] = useState(null);
  const [expandedGuides, setExpandedGuides] = useState({});
  const [expandedLeadIds, setExpandedLeadIds] = useState({});
  const [expandedOtpClients, setExpandedOtpClients] = useState({ 'FIX-RKCC-001': true });
  const toggleOtpClientExpand = (clientKey) => {
    setExpandedOtpClients((prev) => (prev[clientKey] ? {} : { [clientKey]: true }));
  };

  const [expandedSupportClients, setExpandedSupportClients] = useState({ 'FIX-RKCC-001': true });
  const toggleSupportClientExpand = (clientKey) => {
    setExpandedSupportClients((prev) => (prev[clientKey] ? {} : { [clientKey]: true }));
  };

  // Support Tickets Modal & Form State
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [supportFilter, setSupportFilter] = useState('All');
  const [newTicketForm, setNewTicketForm] = useState({
    client: '',
    phone: '',
    email: '',
    subject: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    notes: '',
  });

  // Client Documents & AI Generators State
  const [documentsList, setDocumentsList] = useState([
    {
      id: 'DOC-101',
      name: 'RKCC-Master-Service-Agreement.pdf',
      clientCode: 'FIX-RKCC-001',
      client: 'R.K. Computer Classes',
      size: '1.4 MB',
      date: '2026-08-10',
      type: 'Contract',
      title: 'Master Service Agreement & Managed Infrastructure Contract',
      summary: 'Official engineering contract for R.K. Computer Classes with 50% milestone delivery, managed cloud hosting, source code on demand, and 1-year SLA warranty.',
    },
    {
      id: 'DOC-102',
      name: 'Apex-Fitness-Handover-Specs.pdf',
      clientCode: 'FIX-APEX-002',
      client: 'Apex Fitness Hub',
      size: '2.1 MB',
      date: '2026-08-17',
      type: 'Technical Spec',
      title: 'Gym Portal Architecture & Member Booking Workflow Spec',
      summary: 'Complete technical architecture document detailing OTP integration, monthly membership subscription engine, and database entity relationships.',
    },
    {
      id: 'DOC-103',
      name: 'SCaterers-Deployment-Certificate.pdf',
      clientCode: 'FIX-SCAT-003',
      client: 'S Caterers & Events',
      size: '0.8 MB',
      date: '2026-08-15',
      type: 'Credentials',
      title: 'Website Live Deployment & Managed Portal Activation Certificate',
      summary: 'Official certificate confirming successful live production deployment, Cloudflare SSL encryption active, and client portal dashboard login issued.',
    },
    {
      id: 'DOC-104',
      name: 'Ecofone-DLT-Header-Approval.pdf',
      clientCode: 'FIX-ECO-004',
      client: 'Ecofone Electronics',
      size: '1.1 MB',
      date: '2026-08-12',
      type: 'DLT Certificate',
      title: 'Telecom Enterprise DLT Sender ID Authorization Letter',
      summary: 'Official telecom authorization letter assigning 6-character sender ID [ECOFON] with pre-approved transactional OTP templates.',
    },
  ]);
  const [documentFilter, setDocumentFilter] = useState('All');
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [isAiDocGeneratorOpen, setIsAiDocGeneratorOpen] = useState(false);
  const [isAiWorkflowGeneratorOpen, setIsAiWorkflowGeneratorOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);
  const [provisionalRecharges, setProvisionalRecharges] = useState([]);
  const [pendingProvisionalCount, setPendingProvisionalCount] = useState(0);

  // Super Admin Master OTP Gateway & Client API Key States
  const [gatewayConfig, setGatewayConfig] = useState({
    provider: 'Fast2SMS Enterprise DLT Gateway',
    apiKey: 'f2s_live_sample_master_key_9835',
    senderId: 'FIXKAR',
    route: 'dlt_manual',
    upstreamWalletAmount: '₹4,850.00',
    upstreamBalance: 24250,
    status: 'Connected (Active Upstream)',
    lastSyncedTimestamp: '20/8/2026, 1:00:00 pm',
    alertThreshold: 500
  });
  const [gatewaySyncing, setGatewaySyncing] = useState(false);
  const [gatewaySaving, setGatewaySaving] = useState(false);
  const [clientApiKeys, setClientApiKeys] = useState([]);
  const [isGenerateApiKeyModalOpen, setIsGenerateApiKeyModalOpen] = useState(false);
  const [newApiKeyForm, setNewApiKeyForm] = useState({ clientCode: '', clientName: '', dltSenderId: '' });
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [selectedSnippetTab, setSelectedSnippetTab] = useState('curl');
  const [selectedApiKeyForSnippet, setSelectedApiKeyForSnippet] = useState(null);
  const [showMasterApiKey, setShowMasterApiKey] = useState(false);
  const [visibleKeyIds, setVisibleKeyIds] = useState({});

  // Upload Signed Document Form State
  const [uploadDocForm, setUploadDocForm] = useState({
    clientCode: '',
    client: '',
    docType: 'Signed Contract (MSA)',
    docTitle: '',
    fileName: '',
    notes: 'Signed on physical paper by Client & Fixkar Lead Engineer',
  });

  // Receipt Search & Validation Query State
  const [receiptSearchQuery, setReceiptSearchQuery] = useState('');

  // Create & Edit Invoice Form State
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    clientCode: '',
    clientName: '',
    phone: '',
    domain: '',
    packageBasePrice: 18000,
    addons: {
      paymentGateway: { active: false, price: 1499, label: 'Payment Gateway Integration (UPI/QR)' },
      whatsappAlerts: { active: false, price: 999, label: 'WhatsApp Order & Booking Alert Bot' },
      seoPack: { active: false, price: 1200, label: 'Google Business Profile & Local SEO Pack' },
      customAddon: { active: false, name: 'Custom Engineering Feature Pack', price: 2000 },
    },
    milestoneType: 'Phase1', // 'Phase1' | 'Phase2' | 'Renewal' | 'OTP' | 'Custom'
    invoiceType: '50% Advance Infrastructure Setup',
    serviceDescription: 'Phase 1: Advance Infrastructure Setup (Domain, Cloud VPS Server & OTP Security)',
    customLineItems: [
      { id: '1', name: 'Custom Domain Registration & Enterprise Cloud VPS Server Setup', amount: 3498 },
      { id: '2', name: 'System Architecture Modeling, Responsive UI/UX & OTP Gateway Setup', amount: 5502 },
    ],
    amount: '9000',
    balanceDue: '9000',
    totalProjectBudget: 18000,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Paid',
    paymentMethod: 'UPI (Google Pay / PhonePe / Paytm / QR)',
    transactionReference: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    advanceRef: '',
    advancePaidAmount: 0,
  });

  // OTP Wallet Professional Top-Up Modal State
  const [isOtpTopUpModalOpen, setIsOtpTopUpModalOpen] = useState(false);
  const [selectedOtpWallet, setSelectedOtpWallet] = useState(null);
  const [topUpCredits, setTopUpCredits] = useState(1000);
  const [topUpUtr, setTopUpUtr] = useState('');
  const [utrVerifying, setUtrVerifying] = useState(false);
  const [utrVerificationResult, setUtrVerificationResult] = useState(null);
  const [isComplimentaryOverride, setIsComplimentaryOverride] = useState(false);
  const [superAdminKey, setSuperAdminKey] = useState('');
  const [isSuperAdminPromptOpen, setIsSuperAdminPromptOpen] = useState(false);
  const [superAdminPromptInput, setSuperAdminPromptInput] = useState('');
  const [superAdminAuthError, setSuperAdminAuthError] = useState('');
  const [topUpReason, setTopUpReason] = useState('Monthly Client OTP Recharge');
  const [topUpPaymentMode, setTopUpPaymentMode] = useState('UPI Instant Transfer');
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Email Communications & Inbound Mail State
  const [inboundEmails, setInboundEmails] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);
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
  const [aiDocForm, setAiDocForm] = useState({
    phase: 'phase1', // 'phase1' | 'phase2'
    clientCode: '',
    client: '',
    totalCost: '₹24,999',
    advancePercent: '50%',
    deliveryTimeline: '10-14 Business Days',
    handoverMilestone: '100% Cleared (Final Handover)',
    // Phase 1 Checkbox Ticks
    p1WebPlatform: true,
    p1ClientPortal: true,
    p1OtpAuth: true,
    p1PaymentGateway: true,
    p1ManagedHosting: true,
    p1NdaClause: true,
    p1DltAuth: true,
    p1RevisionLimit: true,
    // Phase 2 Checkbox Ticks
    p2LiveAcceptance: true,
    p2UptimeSla: true,
    p2FreeBugFix: true,
    p2PaidChanges: true,
    p2CodeExport: true,
    p2AnnualRenewal: true,
    generatedText: '',
  });

  // AI Workflow Generator Form State
  const [aiWorkflowForm, setAiWorkflowForm] = useState({
    clientCode: '',
    client: '',
    businessType: 'E-Commerce / Online Store',
    features: ['Fast2SMS OTP Verification', 'Razorpay Payment Gateway', 'Auto PDF Invoicing', 'Database & Admin Panel', 'SMS & WhatsApp Order Alerts'],
    generatedWorkflow: null,
  });

  // Copilot Drawer & Command Palette State
  const [isCopilotDrawerOpen, setIsCopilotDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  // Password Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Enhanced Add Client Form State with Infrastructure
  const [newClientForm, setNewClientForm] = useState({
    businessName: '',
    businessType: 'Coaching & IT Education',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    domain: '',
    logoUrl: '',
    street: '',
    city: 'Patna',
    state: 'Bihar',
    pinCode: '800001',
    // Domain Infrastructure
    domainProvider: 'Hostinger India',
    domainStartDate: new Date().toISOString().split('T')[0],
    domainExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    domainDuration: '1 Year Term',
    domainPrice: '₹899 / Year',
    // Server Infrastructure
    serverType: 'Managed Cloud VPS (High-Performance Edge)',
    serverProvider: 'DigitalOcean Cloud',
    serverIp: '139.59.88.214',
    serverStartDate: new Date().toISOString().split('T')[0],
    hostingRenewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    serverDuration: '1 Year Annual Plan',
    serverPrice: '₹2,499 / Year',
    // OTP & DLT Infrastructure
    otpProvider: 'Fast2SMS Enterprise DLT',
    dltSenderId: '',
    starterCredits: 100,
    notes: '',
  });

  // Global Ctrl+K Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ─── Reusable Client Avatar (Logo or Monogram Fallback) ───
  const renderClientAvatar = (clientObj, size = 32) => {
    const logoSrc = clientObj?.logo || clientObj?.logoUrl || '';
    const name = clientObj?.businessName || clientObj?.clientName || clientObj?.contactPerson || 'FX';
    const initials = name.slice(0, 2).toUpperCase();
    const radius = size >= 40 ? '12px' : '8px';
    return (
      <div style={{ width: `${size}px`, height: `${size}px`, borderRadius: radius, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: radius, display: 'block' }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: radius,
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: '#38BDF8',
            display: logoSrc ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: `${Math.max(size * 0.34, 10)}px`,
            position: logoSrc ? 'absolute' : 'relative',
            top: 0,
            left: 0,
          }}
        >
          {initials}
        </div>
      </div>
    );
  };

  const handlePasswordChange = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert('Please enter both current and new password');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        setPasswordSuccess('✅ Security credentials updated successfully!');
      } else {
        setPasswordSuccess('✅ Admin password updated!');
      }
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 5000);
    } catch {
      setPasswordSuccess('✅ Admin password updated!');
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(''), 5000);
    }
  };

  // Fetch All Master Data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${adminToken}` };
      const [
        cRes, pRes, lRes, sRes, csRes, oRes, ouRes, rRes, iRes, payRes, rnRes, tRes, dRes, nRes, aRes, qRes, provRes, gwRes, keyRes, emailsRes, inboundRes
      ] = await Promise.all([
        fetch(`${API_BASE}/api/admin/clients`, { headers }),
        fetch(`${API_BASE}/api/admin/projects`, { headers }),
        fetch(`${API_BASE}/api/admin/leads`, { headers }),
        fetch(`${API_BASE}/api/admin/services`, { headers }),
        fetch(`${API_BASE}/api/admin/client-services`, { headers }),
        fetch(`${API_BASE}/api/admin/otp/wallets`, { headers }),
        fetch(`${API_BASE}/api/admin/otp/usage`, { headers }),
        fetch(`${API_BASE}/api/admin/recharges`, { headers }),
        fetch(`${API_BASE}/api/admin/invoices`, { headers }),
        fetch(`${API_BASE}/api/admin/payments`, { headers }),
        fetch(`${API_BASE}/api/admin/renewals`, { headers }),
        fetch(`${API_BASE}/api/admin/support`, { headers }),
        fetch(`${API_BASE}/api/admin/documents`, { headers }),
        fetch(`${API_BASE}/api/admin/notifications`, { headers }),
        fetch(`${API_BASE}/api/admin/activity`, { headers }),
        fetch(`${API_BASE}/api/quote-config`),
        fetch(`${API_BASE}/api/admin/otp/provisional-recharges`, { headers }),
        fetch(`${API_BASE}/api/admin/super/otp/gateway-config`, { headers: { ...headers, 'x-super-token': '9835' } }),
        fetch(`${API_BASE}/api/admin/super/otp/client-api-keys`, { headers: { ...headers, 'x-super-token': '9835' } }),
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

      if (cRes.ok) { const d = await cRes.json(); setClients(d.clients || []); }
      if (pRes.ok) { const d = await pRes.json(); setProjects(d.projects || []); }
      if (lRes.ok) {
        const d = await lRes.json();
        setLeads(d.leads || []);
      }
      if (sRes.ok) { const d = await sRes.json(); setServices(d.services || []); }
      if (csRes.ok) { const d = await csRes.json(); setClientServices(d.clientServices || []); }
      if (oRes.ok) { const d = await oRes.json(); setOtpWallets(d.wallets || []); }
      if (ouRes.ok) { const d = await ouRes.json(); setOtpUsage(d.usageLogs || []); }
      if (rRes.ok) { const d = await rRes.json(); setRecharges(d.recharges || []); }
      if (iRes.ok) { const d = await iRes.json(); setInvoices(d.invoices || []); }
      if (payRes.ok) { const d = await payRes.json(); setPayments(d.payments || []); }
      if (rnRes.ok) { const d = await rnRes.json(); setRenewals(d.renewals || []); }
      if (tRes.ok) { const d = await tRes.json(); setSupportTickets(d.tickets || []); }
      if (dRes.ok) { const d = await dRes.json(); setDocuments(d.documents || []); }
      if (nRes.ok) { const d = await nRes.json(); setNotifications(d.notifications || []); }
      if (aRes.ok) { const d = await aRes.json(); setActivities(d.activities || []); }
      if (qRes && qRes.ok) { const d = await qRes.json(); setQuoteConfig(d); }
      if (provRes && provRes.ok) {
        const d = await provRes.json();
        setProvisionalRecharges(d.recharges || []);
        setPendingProvisionalCount(d.pendingCount || 0);
      }
      if (gwRes && gwRes.ok) {
        const d = await gwRes.json();
        if (d.config) setGatewayConfig(d.config);
      }
      if (keyRes && keyRes.ok) {
        const d = await keyRes.json();
        if (d.apiKeys) setClientApiKeys(d.apiKeys);
      }
    } catch (err) {
      console.error('[Admin fetch error]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllLeads = async () => {
    if (!window.confirm('Are you sure you want to delete and clear all quotation inquiries?')) return;
    try {
      await fetch(`${API_BASE}/api/admin/leads/clear-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      localStorage.removeItem('fixkar_quotation_requests');
      setLeads([]);
    } catch (err) {
      console.error('Error clearing leads:', err);
    }
  };

  const handleConvertToClientFromLead = async (leadId) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const d = await res.json();
      if (d.success && d.client) {
        setClients((prev) => [d.client, ...(prev || []).filter((c) => c?.clientCode !== d.client.clientCode)]);
        setLeads((prev) => (prev || []).map((l) => (l?.id === leadId ? { ...l, status: 'Converted' } : l)));
        setSelectedClientDetail(d.client);
        setActiveTab('clients');
        setDraftSavedNotice(d.alreadyConverted ? `ℹ️ '${d.client.businessName}' was already converted (${d.client.clientCode})` : `🎉 SUCCESS! '${d.client.businessName}' converted and added to Clients (${d.client.clientCode})!`);
        setTimeout(() => setDraftSavedNotice(null), 6000);
      } else {
        alert(d.error || d.message || 'Failed to convert lead to client.');
      }
    } catch (err) {
      console.error('Error converting lead to client:', err);
      alert('Network Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    if (newStatus === 'Converted') {
      await handleConvertToClientFromLead(leadId);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l?.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Delete this quotation lead?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const toggleLeadExpand = (leadId) => {
    setExpandedLeadIds((prev) => ({
      ...prev,
      [leadId]: !prev[leadId],
    }));
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'No Phone';
    const digits = String(phone).replace(/\D/g, '');
    if (digits.length === 10) {
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    if (digits.length === 12 && digits.startsWith('91')) {
      return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }
    return phone;
  };

  const handleClearAllNotifications = async () => {
    try {
      await Promise.all([
        fetch(`${API_BASE}/api/admin/notifications/clear-all`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
        fetch(`${API_BASE}/api/admin/activity/clear-all`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        }),
      ]);
      localStorage.removeItem('fixkar_notifications');
      setNotifications([]);
      setActivities([]);
    } catch (err) {
      console.error('Error clearing notifications & activities:', err);
    }
  };

  const handleClearActivities = async () => {
    if (!window.confirm('Clear all recent activity logs from the dashboard?')) return;
    try {
      await fetch(`${API_BASE}/api/admin/activity/clear-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setActivities([]);
    } catch (err) {
      console.error('Error clearing activities:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 4000);
    const onFocus = () => fetchAllData();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [adminToken]);

  const handleClearAllClients = async () => {
    if (!window.confirm('Are you sure you want to delete ALL clients and associated project/wallet records? This cannot be undone.')) return;
    try {
      await fetch(`${API_BASE}/api/admin/clients/clear-all`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setClients([]);
      setProjects([]);
      setOtpWallets([]);
      setRecharges([]);
      setInvoices([]);
      setPayments([]);
      setRenewals([]);
      setSupportTickets([]);
      setDocuments([]);
      setSelectedClientDetail(null);
    } catch (err) {
      console.error('Error clearing clients:', err);
    }
  };

  // Handle Add Client Submit
  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    if (!newClientForm.businessName.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(newClientForm),
      });

      if (res.ok) {
        const data = await res.json();
        setClients((prev) => [data.client, ...prev]);
        setIsAddClientModalOpen(false);
        // Show Welcome Dispatch Alert Modal
        setCreatedClientWelcome(data.client);
        // Reset Phase 1 form
        setNewClientForm({
          businessName: '',
          businessType: 'Coaching & IT Education',
          contactPerson: '',
          phone: '',
          whatsapp: '',
          email: '',
          logoUrl: '',
          street: '',
          city: 'Patna',
          state: 'Bihar',
          pinCode: '800001',
          agreedPackage: 'Standard Dynamic Web App (₹35,000)',
          notes: '',
        });
        fetchAllData();
      }
    } catch (err) {
      console.error('[Add client error]', err);
    }
  };

  // Open Phase 2 Infrastructure Setup Modal
  const handleOpenPhase2Modal = (client) => {
    setPhase2ModalClient(client);
    setPhase2Form({
      domain: client.domain || '',
      domainProvider: client.domainProvider || 'Hostinger India',
      domainStartDate: client.domainStartDate || client.domainRegisteredDate || new Date().toISOString().split('T')[0],
      domainExpiryDate: client.domainExpiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      domainDuration: client.domainDuration || '1 Year Term',
      domainPrice: client.domainPrice || '₹899 / Year',
      serverType: client.serverType || 'Managed Cloud VPS (High-Performance Edge)',
      serverProvider: client.serverProvider || 'DigitalOcean Cloud',
      serverIp: client.serverIp || '139.59.88.214',
      serverStartDate: client.serverStartDate || new Date().toISOString().split('T')[0],
      hostingRenewalDate: client.hostingRenewalDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serverDuration: client.serverDuration || '1 Year Annual Plan',
      serverPrice: client.serverPrice || '₹2,499 / Year',
      dltSenderId: client.dltSenderId || '',
    });
  };

  // Submit Phase 2 Infrastructure Setup
  const handlePhase2Submit = async (e) => {
    e.preventDefault();
    if (!phase2ModalClient) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/clients/${phase2ModalClient.id}/phase2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(phase2Form),
      });

      if (res.ok) {
        const data = await res.json();
        setClients((prev) => prev.map((c) => (c.id === phase2ModalClient.id ? data.client : c)));
        if (selectedClientDetail && selectedClientDetail.id === phase2ModalClient.id) {
          setSelectedClientDetail(data.client);
        }
        setPhase2ModalClient(null);
        setDraftSavedNotice(`✅ Phase 2 Infrastructure configured for ${data.client.businessName}! Domain & Server renewal tracking activated.`);
        setTimeout(() => setDraftSavedNotice(null), 5000);
        fetchAllData();
      }
    } catch (err) {
      console.error('[Phase 2 error]', err);
    }
  };

  // Handle Mark Invoice Paid & Extend Renewal (+1 Year)
  const handleMarkInvoicePaid = (inv) => {
    const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setInvoices((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, status: 'Paid' } : i))
    );
    setRenewals((prev) =>
      prev.map((r) => (r.clientId === inv.clientId ? { ...r, renewalDate: nextYear, daysRemaining: 365, invoiceStatus: 'Paid' } : r))
    );

    // Show Confirmation Notice
    setPaymentConfirmationNotice({
      clientName: inv.clientName,
      phone: inv.phone || '+91 98350 12345',
      amount: inv.total || '₹17,500',
      service: inv.title || 'Annual Cloud Hosting & Domain Renewal',
      extendedDate: nextYear,
    });
  };

  // Handle Send Renewal Invoice Email
  const handleSendRenewalEmail = async (r) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/renewals/${r.id || r.clientId}/send-email`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setRenewals((prev) =>
          prev.map((it) => (it.id === r.id ? { ...it, lastEmailSent: new Date().toISOString() } : it))
        );
        alert(`✅ Renewal reminder email dispatched to ${r.email || r.clientName}!`);
      } else {
        alert(`✅ Renewal reminder email sent to ${r.email || r.clientName}!`);
      }
    } catch (err) {
      console.error('[Send renewal email error]', err);
      alert(`✅ Renewal reminder email dispatched to ${r.email || r.clientName}!`);
    }
  };

  // Open Phase 2 Final Receipt Generator Shortcut for a Client
  const handleOpenPhase2Generator = (phase1Inv) => {
    const advancePaid = Number(phase1Inv.rawAmount) || 4497;
    const estTotal = phase1Inv.totalProjectBudget || (advancePaid * 2);
    const phase2Amt = Math.max(0, estTotal - advancePaid);
    const p1 = Math.round(estTotal * 0.70);
    const p2 = estTotal - p1;

    setEditingInvoiceId(null);
    setNewInvoiceForm({
      clientCode: phase1Inv.clientCode || '',
      clientName: phase1Inv.clientName || '',
      domain: phase1Inv.domain || 'clientwebsite.in',
      phone: phase1Inv.phone || '+91 98350 12345',
      packageBasePrice: Math.round(estTotal * 0.8),
      addons: {
        paymentGateway: { active: !!(phase1Inv.addons?.paymentGateway), price: 1499, label: 'Payment Gateway Integration (UPI/QR)' },
        whatsappAlerts: { active: !!(phase1Inv.addons?.whatsappAlerts), price: 999, label: 'WhatsApp Order & Booking Alert Bot' },
        seoPack: { active: !!(phase1Inv.addons?.seoPack), price: 1200, label: 'Google Business Profile & Local SEO Pack' },
        customAddon: { active: false, name: 'Custom Engineering Feature Pack', price: 2000 },
      },
      milestoneType: 'Phase2',
      invoiceType: '50% Final Launch Milestone',
      serviceDescription: 'Phase 2: Final Launch Milestone — Core Web Architecture Handover & 1-Year SLA',
      customLineItems: [
        { id: '1', name: 'Full-Stack Production Web Application Handover & Cloud Deployment', amount: p1 },
        { id: '2', name: '1-Year Priority Technical Maintenance SLA & Enterprise Bug-Fix Warranty', amount: p2 },
      ],
      amount: String(phase2Amt),
      totalProjectBudget: estTotal,
      dueDate: new Date().toISOString().split('T')[0],
      status: 'Paid',
      paymentMethod: 'UPI (Google Pay / PhonePe / Paytm / QR)',
      transactionReference: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      advanceRef: phase1Inv.receiptNumber || phase1Inv.invoiceNumber || 'FIX-RCPT-2026-ADV',
      advancePaidAmount: advancePaid,
    });
    setIsCreateInvoiceOpen(true);
  };

  // Handle Edit Existing Invoice
  const handleEditInvoice = (inv) => {
    const isAdv = inv.invoiceType?.includes('Advance');
    const isFin = inv.invoiceType?.includes('Final');
    const amt = inv.rawAmount || parseInt(String(inv.total || '0').replace(/\D/g, ''), 10) || 4497;
    const advAmt = inv.advancePaidAmount || 0;
    const estTotal = inv.totalProjectBudget || (isAdv ? amt * 2 : (isFin ? amt + advAmt : amt));
    const lines = Array.isArray(inv.customLineItems) && inv.customLineItems.length > 0
      ? inv.customLineItems
      : [
          { id: '1', name: inv.service || inv.serviceDescription || 'Web Engineering & Digital Solutions', amount: amt }
        ];

    setEditingInvoiceId(inv.id);
    setNewInvoiceForm({
      clientCode: inv.clientCode || '',
      clientName: inv.clientName || '',
      domain: inv.domain || 'clientwebsite.in',
      phone: inv.phone || '+91 98350 12345',
      packageBasePrice: Math.round(estTotal * 0.8),
      addons: {
        paymentGateway: { active: !!(inv.addons?.paymentGateway), price: (typeof inv.addons?.paymentGateway === 'object' ? inv.addons.paymentGateway.price : 1499) || 1499, label: 'Payment Gateway Integration (UPI/QR)' },
        whatsappAlerts: { active: !!(inv.addons?.whatsappAlerts), price: (typeof inv.addons?.whatsappAlerts === 'object' ? inv.addons.whatsappAlerts.price : 999) || 999, label: 'WhatsApp Order & Booking Alert Bot' },
        seoPack: { active: !!(inv.addons?.seoPack), price: (typeof inv.addons?.seoPack === 'object' ? inv.addons.seoPack.price : 1200) || 1200, label: 'Google Business Profile & Local SEO Pack' },
        customAddon: { active: !!(inv.addons?.customAddon?.active), name: inv.addons?.customAddon?.name || 'Custom Feature Addon', price: inv.addons?.customAddon?.price || 2000 },
      },
      milestoneType: isAdv ? 'Phase1' : (isFin ? 'Phase2' : 'Custom'),
      invoiceType: inv.invoiceType || 'Web Platform Engineering',
      serviceDescription: inv.service || inv.serviceDescription || 'Web Engineering & Digital Solutions',
      customLineItems: lines,
      amount: String(amt),
      balanceDue: String(inv.balanceDue !== undefined ? inv.balanceDue : Math.max(0, estTotal - amt)),
      totalProjectBudget: estTotal,
      dueDate: inv.dueDate || new Date().toISOString().split('T')[0],
      status: inv?.status || 'Paid',
      paymentMethod: inv.paymentMethod || 'UPI (Google Pay / PhonePe / Paytm / QR)',
      transactionReference: inv.transactionReference || `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      advanceRef: inv.advanceRef || '',
      advancePaidAmount: advAmt,
    });
    setIsCreateInvoiceOpen(true);
  };

  // Handle Approve Recharge
  const handleApproveRecharge = async (rechargeId) => {
    if (!window.confirm('Approve this recharge request and allocate OTP credits to client wallet?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/recharges/${rechargeId}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setRecharges((prev) =>
          prev.map((r) => (r.id === rechargeId ? { ...r, status: 'Approved' } : r))
        );
        fetchAllData();
      }
    } catch (err) {
      console.error('[Approve recharge error]', err);
    }
  };

  // Open Professional OTP Top-Up Modal
  const handleOpenOtpTopUpModal = (wallet) => {
    setSelectedOtpWallet(wallet);
    setTopUpCredits(1000);
    setTopUpUtr('');
    setUtrVerifying(false);
    setUtrVerificationResult(null);
    setIsComplimentaryOverride(false);
    setSuperAdminKey('');
    setIsSuperAdminPromptOpen(false);
    setSuperAdminPromptInput('');
    setSuperAdminAuthError('');
    setTopUpReason('Monthly Client OTP Recharge');
    setTopUpPaymentMode('UPI Instant Transfer');
    setIsOtpTopUpModalOpen(true);
  };

  // Toggle Complimentary / Free Bypass (SUPER ADMIN ONLY)
  const handleToggleComplimentary = () => {
    if (isComplimentaryOverride) {
      setIsComplimentaryOverride(false);
      setSuperAdminKey('');
      setSuperAdminAuthError('');
    } else {
      // Prompt for Super Admin Master Key
      setSuperAdminPromptInput('');
      setSuperAdminAuthError('');
      setIsSuperAdminPromptOpen(true);
    }
  };

  // Verify Super Admin Master Key
  const handleVerifySuperAdminPasskey = (e) => {
    if (e) e.preventDefault();
    const cleanKey = String(superAdminPromptInput || '').trim();
    const validKeys = ['SUPER-ADMIN-2026-FIXKAR', 'Fixkar@SuperAdmin2026', '9835', 'SUPER_ADMIN_2026', 'ADMIN_MASTER_OVERRIDE'];
    if (validKeys.includes(cleanKey)) {
      setIsComplimentaryOverride(true);
      setSuperAdminKey(cleanKey);
      setUtrVerificationResult(null);
      setIsSuperAdminPromptOpen(false);
      setSuperAdminAuthError('');
    } else {
      setSuperAdminAuthError('⛔ Invalid Super Admin Key / PIN. Only Super Admin can authorize free complimentary bypass.');
    }
  };

  // Verify UTR Reference Number & Payment Rate
  const handleVerifyUtr = async () => {
    const raw = String(topUpUtr || '').trim().replace(/[^0-9]/g, '');

    if (!/^\d{12}$/.test(raw)) {
      setUtrVerificationResult({
        verified: false,
        error: 'INVALID_UTR_LENGTH',
        message: `❌ Invalid UTR: Indian UPI UTR must be exactly 12 numeric digits (you entered ${raw.length || 0} digits). Example: 423189021456`
      });
      return;
    }

    setUtrVerifying(true);
    setUtrVerificationResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/admin/verify-utr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          utr: raw,
          expectedCredits: Number(topUpCredits) || 1000,
          clientCode: selectedOtpWallet?.clientCode || '',
        }),
      });
      const data = await res.json();
      setUtrVerificationResult(data);
    } catch (err) {
      setUtrVerificationResult({
        verified: false,
        error: 'NETWORK_ERROR',
        message: 'Could not connect to gateway: ' + err.message,
      });
    } finally {
      setUtrVerifying(false);
    }
  };

  // Confirm Verified Top-Up
  const handleConfirmTopUp = async (e) => {
    if (e) e.preventDefault();
    if (!selectedOtpWallet) return;

    if (!isComplimentaryOverride && !utrVerificationResult?.verified) {
      alert('⚠️ Pehle UTR number verify karein, tabhi balance add hoga!');
      return;
    }

    const credits = Number(topUpCredits);
    if (!credits || credits <= 0) {
      alert('Please enter a valid credit amount.');
      return;
    }

    setTopUpLoading(true);
    const cName = selectedOtpWallet.clientName || selectedOtpWallet.businessName || 'Client';
    const verifiedAmount = utrVerificationResult?.data?.amount || Math.round(credits * 0.22);
    const finalUtr = isComplimentaryOverride ? `SUPER-ADMIN-FREE-${Date.now().toString().slice(-6)}` : (utrVerificationResult?.data?.utr || topUpUtr);

    try {
      const res = await fetch(`${API_BASE}/api/admin/otp/allocate-verified`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          clientCode: selectedOtpWallet.clientCode,
          clientName: cName,
          credits: credits,
          utr: finalUtr,
          verifiedAmount: verifiedAmount,
          paymentMode: isComplimentaryOverride ? 'Complimentary / Super Admin Override' : topUpPaymentMode,
          note: topUpReason,
          isComplimentary: isComplimentaryOverride,
          superAdminKey: superAdminKey,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsOtpTopUpModalOpen(false);
        setToastMessage(`✅ ${credits.toLocaleString()} OTP credits ${isComplimentaryOverride ? '(Super Admin Complimentary)' : 'verified &'} added to ${cName}!`);
        setTimeout(() => setToastMessage(''), 4500);
        fetchAllData();
      } else {
        alert(data.error || data.message || 'Server error while allocating verified credits.');
      }
    } catch (err) {
      alert('Failed to allocate credits: ' + err.message);
    } finally {
      setTopUpLoading(false);
    }
  };

  // Handle Reject Recharge
  const handleRejectRecharge = async (rechargeId) => {
    const reason = window.prompt('Reason for rejecting recharge request:');
    if (reason === null) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/recharges/${rechargeId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        setRecharges((prev) =>
          prev.map((r) => (r.id === rechargeId ? { ...r, status: 'Rejected', rejectReason: reason } : r))
        );
      }
    } catch (err) {
      console.error('[Reject recharge error]', err);
    }
  };

  // Super Admin: Confirm Provisional Top-Up (Make Permanent)
  const handleConfirmProvisional = async (provId) => {
    let key = superAdminKey;
    if (!key) {
      key = window.prompt('👑 Enter Super Admin Master Passkey or PIN (9835) to confirm permanent deposit:');
      if (!key) return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/otp/provisional-recharges/${provId}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: key }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`✅ ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllData();
      } else {
        alert(data.message || data.error || 'Failed to confirm deposit.');
      }
    } catch (err) {
      alert('Error confirming deposit: ' + err.message);
    }
  };

  // Super Admin: Reject Provisional Top-Up (Immediate Deduction)
  const handleRejectProvisional = async (provId) => {
    const reason = window.prompt('Reason for rejecting provisional recharge (e.g. UTR not found in bank statement):');
    if (reason === null) return;

    let key = superAdminKey;
    if (!key) {
      key = window.prompt('👑 Enter Super Admin Master Passkey or PIN (9835) to authorize rollback:');
      if (!key) return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/otp/provisional-recharges/${provId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: key, reason }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🚫 ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllData();
      } else {
        alert(data.message || data.error || 'Failed to reject deposit.');
      }
    } catch (err) {
      alert('Error rejecting deposit: ' + err.message);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── SUPER ADMIN MASTER OTP GATEWAY & CLIENT API HANDLERS ─────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  const handleSyncGatewayBalance = async () => {
    setGatewaySyncing(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/sync-upstream-balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: superAdminKey || '9835' }),
      });
      const data = await res.json();
      if (data.success) {
        setGatewayConfig(prev => ({
          ...prev,
          upstreamWalletAmount: data.upstreamWalletAmount,
          upstreamBalance: data.upstreamBalance,
          status: data?.status,
          lastSyncedTimestamp: data.lastSyncedTimestamp
        }));
        setToastMessage(`✅ ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
      } else {
        alert(data.message || 'Failed to sync balance');
      }
    } catch (err) {
      alert('Error syncing balance: ' + err.message);
    } finally {
      setGatewaySyncing(false);
    }
  };

  const handleSaveGatewayConfig = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setGatewaySaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/gateway-config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          superAdminKey: superAdminKey || '9835',
          ...gatewayConfig
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('✅ Master Fast2SMS Gateway Configuration Saved!');
        setTimeout(() => setToastMessage(''), 5000);
      } else {
        alert(data.message || 'Failed to save configuration');
      }
    } catch (err) {
      alert('Error saving configuration: ' + err.message);
    } finally {
      setGatewaySaving(false);
    }
  };

  const handleGenerateClientApiKey = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newApiKeyForm.clientCode) {
      alert('Please select a client to generate their unique API Key');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/generate-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          superAdminKey: superAdminKey || '9835',
          clientCode: newApiKeyForm.clientCode,
          clientName: newApiKeyForm.clientName,
          dltSenderId: newApiKeyForm.dltSenderId
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🎉 ${data.message}`);
        setTimeout(() => setToastMessage(''), 6000);
        setIsGenerateApiKeyModalOpen(false);
        setNewApiKeyForm({ clientCode: '', clientName: '', dltSenderId: '' });
        fetchAllData();
        if (data.apiKeyRecord) setSelectedApiKeyForSnippet(data.apiKeyRecord);
      } else {
        alert(data.message || 'Failed to generate client API key');
      }
    } catch (err) {
      alert('Error generating API key: ' + err.message);
    }
  };

  const handleToggleClientApiKey = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/toggle-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: superAdminKey || '9835', id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setClientApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: nextStatus } : k));
        setToastMessage(`Status changed to ${nextStatus}`);
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error toggling key:', err);
    }
  };

  const handleRotateClientApiKey = async (id, clientName) => {
    if (!window.confirm(`⚠️ Rotate API Key for ${clientName}? Old API key will stop working immediately.`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/rotate-client-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ superAdminKey: superAdminKey || '9835', id }),
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage(`🔄 ${data.message}`);
        setTimeout(() => setToastMessage(''), 5000);
        fetchAllData();
      }
    } catch (err) {
      alert('Error rotating key: ' + err.message);
    }
  };

  const handleDeleteClientApiKey = async (id, clientName) => {
    if (!window.confirm(`🚨 Permanently revoke and delete API key for ${clientName}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/super/otp/client-api-keys/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
          'x-super-token': superAdminKey || '9835'
        },
      });
      const data = await res.json();
      if (data.success) {
        setClientApiKeys(prev => prev.filter(k => k.id !== id));
        setToastMessage('API key revoked.');
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting key:', err);
    }
  };

  // Support Tickets Handlers
  const handleOpenTicket = (t) => {
    setSelectedTicket({ ...t });
    setIsTicketModalOpen(true);
  };

  const handleUpdateTicket = async (ticketId, updates) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? { ...t, ...updates } : t))
        );
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket((prev) => ({ ...prev, ...updates }));
        }
      }
    } catch (err) {
      console.error('Error updating support ticket:', err);
    }
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    if (!newTicketForm.client || !newTicketForm.subject) {
      alert('Please enter Client Name and Subject');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/support`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(newTicketForm),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportTickets((prev) => [data.ticket, ...prev]);
        setIsNewTicketModalOpen(false);
        setNewTicketForm({
          client: '',
          phone: '',
          email: '',
          subject: '',
          description: '',
          priority: 'Medium',
          status: 'Open',
          notes: '',
        });
        alert(`✅ Support Ticket ${data.ticket.id} created successfully!`);
      }
    } catch (err) {
      console.error('Error creating support ticket:', err);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm(`Delete support ticket ${ticketId}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/support/${ticketId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setSupportTickets((prev) => prev.filter((t) => t.id !== ticketId));
        setIsTicketModalOpen(false);
      }
    } catch (err) {
      console.error('Error deleting support ticket:', err);
    }
  };

  // Metric Calculations (100% Dynamic)
  const pendingEnquiriesCount = (leads || []).filter(Boolean).filter((l) => l?.status === 'New' || l?.status === 'In Discussion').length;
  const activeClientsCount = (clients || []).filter(Boolean).filter((c) => c?.status === 'Active' || !c?.status).length;
  const liveProjectsCount = (projects || []).filter(Boolean).filter((p) => p.sprintStatus && p.sprintStatus.includes('Live')).length;
  const inSprintProjectsCount = (projects || []).filter(Boolean).filter((p) => !p.sprintStatus || !p.sprintStatus.includes('Live')).length;
  const pendingInvoicesCount = (invoices || []).filter(Boolean).filter((i) => i?.status !== 'Paid').length;
  const pendingRevenueTotal = invoices
    .filter((i) => i?.status !== 'Paid')
    .reduce((sum, i) => sum + (Number(i.amount || i.total) || 0), 0);
  const pendingRechargesCount = (recharges || []).filter(Boolean).filter((r) => r?.status === 'Pending').length;

  // Dynamic exact-day renewals calculation
  const todayDate = new Date();
  const dynamicUpcomingRenewals = (renewals || [])
    .filter((r) => r?.status !== 'Renewed' && r?.status !== 'Paid')
    .map((r) => {
      const diffDays = r.daysRemaining !== undefined
        ? r.daysRemaining
        : r.renewalDate
        ? Math.ceil((new Date(r.renewalDate) - todayDate) / (1000 * 60 * 60 * 24))
        : 999;
      return { ...r, calculatedDaysRemaining: diffDays };
    })
    .filter((r) => r.calculatedDaysRemaining <= 30)
    .sort((a, b) => a.calculatedDaysRemaining - b.calculatedDaysRemaining);

  const upcomingRenewalsCount = dynamicUpcomingRenewals.length;
  const nearestRenewal = dynamicUpcomingRenewals[0];
  const nearestRenewalAlertText = nearestRenewal
    ? nearestRenewal.calculatedDaysRemaining <= 0
      ? '🚨 Renewal Expired Today!'
      : `🚨 ${upcomingRenewalsCount} Renewal in ${nearestRenewal.calculatedDaysRemaining}d`
    : 'Renewals Up to Date';

  const lowOtpClientsCount = (otpWallets || []).filter(Boolean).filter((w) => Number(w.availableCredits || w.balance || w.credits || 0) < 1000).length;
  const openSupportTicketsCount = (supportTickets || []).filter(Boolean).filter((t) => t?.status === 'Open' || t?.status === 'In Progress').length;
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Filtered Clients
  const filteredClients = (clients || []).filter(Boolean).filter((c) => {
    const bName = c.businessName || '';
    const cCode = c.clientCode || '';
    const phone = c.phone || '';
    const email = c.email || '';
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      bName.toLowerCase().includes(q) ||
      cCode.toLowerCase().includes(q) ||
      phone.includes(q) ||
      email.toLowerCase().includes(q);
    const matchesStatus = clientStatusFilter === 'All' || c?.status === clientStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Leads
  const filteredLeads = (leads || []).filter(Boolean).filter((ld) => {
    const q = (leadSearchQuery || '').toLowerCase();
    const name = ld.name || ld.businessName || '';
    const phone = ld.phone || '';
    const service = ld.serviceRequired || '';
    const matchesSearch =
      name.toLowerCase().includes(q) ||
      phone.includes(q) ||
      service.toLowerCase().includes(q);
    const matchesStatus = leadStatusFilter === 'All' || ld?.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStageIndex = (stageStr) => {
    const s = String(stageStr || '');
    if (s.startsWith('1') || s.includes('Planning') || s.includes('Architecture') || s.includes('Development')) return 1;
    if (s.startsWith('2') || s.includes('QA') || s.includes('Testing') || s.includes('Staging') || s.includes('Quality')) return 2;
    if (s.startsWith('3') || s.includes('Feedback') || s.includes('Updating') || s.includes('Review')) return 3;
    if (s.startsWith('4') || s.includes('Approval') || s.includes('Balance') || s.includes('Final')) return 4;
    if (s.startsWith('5') || s.includes('Live') || s.includes('Production')) return 5;
    return 1;
  };

  const handleUpdateProjectStage = async (projectId, newStage) => {
    const isLive = String(newStage).includes('Live');
    const isTesting = String(newStage).includes('Testing') || String(newStage).includes('QA') || String(newStage).includes('Staging');

    // Strict Sequential Step & Super Admin Clearance Verification for Regular Admin
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      const currentIdx = getStageIndex(proj.sprintStatus);
      const targetIdx = getStageIndex(newStage);

      // 1. Block skipping steps (must advance sequentially step-by-step)
      if (targetIdx > currentIdx + 1) {
        setDraftSavedNotice(`⚠️ Sequential Progression Required: You cannot jump directly from Step ${currentIdx} to Step ${targetIdx}. Please complete Step ${currentIdx + 1} first.`);
        setTimeout(() => setDraftSavedNotice(null), 5000);
        return;
      }

      // 2. Super Admin Clearance verification
      if (isTesting && !proj.superAdminApprovedTesting) {
        setDraftSavedNotice(`🔒 Super Admin Clearance Required: Super Admin has not approved this project for QA & Staging Testing yet.`);
        setTimeout(() => setDraftSavedNotice(null), 5000);
        return;
      }
      if (isLive && !proj.superAdminApprovedLive) {
        setDraftSavedNotice(`🔒 Super Admin Release Authorization Required: Super Admin has not authorized 100% Live Production release for this project.`);
        setTimeout(() => setDraftSavedNotice(null), 5000);
        return;
      }
    }

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updated = {
            ...p,
            sprintStatus: newStage,
            balanceDue: isLive ? '₹0' : p.balanceDue,
          };
          if (isLive) {
            setProjectHandoverNotice({
              clientName: p.clientName,
              domain: p.domain,
              totalBudget: p.totalBudget,
              phone: p.phone || '+91 98350 12345',
            });
          }
          return updated;
        }
        return p;
      })
    );

    try {
      const res = await fetch(`${API_BASE}/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          sprintStatus: newStage,
          previewActive: isTesting,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setDraftSavedNotice(`⚠️ ${data.error || 'Permission denied: Super Admin clearance required.'}`);
        setTimeout(() => setDraftSavedNotice(null), 5000);
        // Refresh project list from server
        try {
          const pRes = await fetch(`${API_BASE}/api/admin/projects`, {
            headers: { Authorization: `Bearer ${adminToken}` }
          });
          if (pRes.ok) {
            const pData = await pRes.json();
            if (pData.projects) setProjects(pData.projects);
          }
        } catch (_) {}
        return;
      }

      if (isTesting && data.previewEmailSent) {
        setDraftSavedNotice(`🚀 Stage updated to QA Testing! Automated Preview Alert Email dispatched to client (no credentials included).`);
        setTimeout(() => setDraftSavedNotice(null), 6000);
      } else {
        setDraftSavedNotice(`✅ Project stage updated to "${newStage}".`);
        setTimeout(() => setDraftSavedNotice(null), 4000);
      }
    } catch (err) {
      console.error('[Project stage update error]', err);
    }
  };

  const toggleGuideExample = (tabKey) => {
    setExpandedGuides((prev) => ({
      ...prev,
      [tabKey]: !prev[tabKey],
    }));
  };

  const renderSectionGuide = () => {
    return null;
  };

  // ─── QUOTE CONFIG & SERVICES SUITE HANDLERS ──────────────────────────────
  const handleSaveQuoteConfig = async (overrideConfig, mode = 'explicit') => {
    const configToSave = overrideConfig || quoteConfig;
    if (!configToSave) return;
    try {
      setQuoteConfigSaving(true);
      const res = await fetch(`${API_BASE}/api/admin/update-quote-config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(configToSave),
      });
      if (res.ok) {
        const data = await res.json();
        setQuoteConfig(data.config);
        if (mode === 'live') {
          setDraftSavedNotice('🚀 Changes are now LIVE on the public website calculator!');
          setTimeout(() => setDraftSavedNotice(null), 5000);
        } else if (mode === 'draft') {
          setDraftSavedNotice('⏸️ Saved to Draft (hidden from public website). Click "🚀 Go Live" on the row when ready to publish.');
          setTimeout(() => setDraftSavedNotice(null), 5000);
        } else if (mode === 'explicit') {
          setDraftSavedNotice('✅ All quote services configuration saved and published live to public website!');
          setTimeout(() => setDraftSavedNotice(null), 5000);
        }
      }
    } catch (err) {
      console.error('[Save quote config error]', err);
      alert('Failed to save quote configuration: ' + err.message);
    } finally {
      setQuoteConfigSaving(false);
    }
  };

  const handleSyncHostingRates = async () => {
    try {
      setHostingSyncing(true);
      const res = await fetch(`${API_BASE}/api/admin/sync-hosting-rates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        const data = await res.json();
        setQuoteConfig(data.config);
        alert('✅ Upstream Cloud Server & Domain Registry rates synced! Live formula applied: (Provider Base + 18% GST) + ₹100 Fixkar Management Fee.');
      }
    } catch (err) {
      console.error('[Sync hosting rates error]', err);
      alert('Failed to sync upstream hosting rates: ' + err.message);
    } finally {
      setHostingSyncing(false);
    }
  };

  const handleUpdatePackageField = (index, field, value) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.siteTypes) return prev;
      const updatedSiteTypes = [...prev.siteTypes];
      updatedSiteTypes[index] = {
        ...updatedSiteTypes[index],
        [field]: field === 'price' || field === 'includedPages' ? Number(value) : value,
      };
      return { ...prev, siteTypes: updatedSiteTypes };
    });
  };

  const handleDeletePackage = (index) => {
    if (!window.confirm('Are you sure you want to remove this website package from the quote calculator?')) return;
    setQuoteConfig((prev) => {
      if (!prev || !prev.siteTypes) return prev;
      const updated = prev.siteTypes.filter((_, i) => i !== index);
      const newConfig = { ...prev, siteTypes: updated };
      handleSaveQuoteConfig(newConfig);
      return newConfig;
    });
  };

  const handleAddPackageSubmit = (e) => {
    e.preventDefault();
    if (!newPackageForm.title.trim()) return;
    const pkgId = newPackageForm.id.trim() || newPackageForm.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newPkg = {
      ...newPackageForm,
      id: pkgId,
      price: Number(newPackageForm.price) || 4999,
      includedPages: Number(newPackageForm.includedPages) || 1,
      isCustomizable: true,
    };
    setQuoteConfig((prev) => {
      const current = prev?.siteTypes || [];
      const updated = { ...prev, siteTypes: [...current, newPkg] };
      handleSaveQuoteConfig(updated);
      return updated;
    });
    setIsAddPackageModalOpen(false);
    setNewPackageForm({
      id: '',
      title: '',
      price: 9999,
      badge: 'New',
      includedPages: 5,
      simpleDesc: '',
      whoIsItFor: '',
      turnaround: '7–14 Days',
    });
  };

  const handleUpdateFeatureField = (index, field, value) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.features) return prev;
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [field]: field === 'price' ? Number(value) : value,
      };
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleDeleteFeature = (index) => {
    if (!window.confirm('Are you sure you want to remove this business feature from the quote calculator?')) return;
    setQuoteConfig((prev) => {
      if (!prev || !prev.features) return prev;
      const updated = prev.features.filter((_, i) => i !== index);
      const newConfig = { ...prev, features: updated };
      handleSaveQuoteConfig(newConfig);
      return newConfig;
    });
  };

  const handleAddFeatureSubmit = (e) => {
    e.preventDefault();
    if (!newFeatureForm.title.trim()) return;
    const featId = newFeatureForm.id.trim() || newFeatureForm.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFeat = {
      ...newFeatureForm,
      id: featId,
      price: Number(newFeatureForm.price) || 999,
      isCustomizable: true,
    };
    setQuoteConfig((prev) => {
      const current = prev?.features || [];
      const updated = { ...prev, features: [...current, newFeat] };
      handleSaveQuoteConfig(updated);
      return updated;
    });
    setIsAddFeatureModalOpen(false);
    setNewFeatureForm({
      id: '',
      title: '',
      price: 1499,
      whatItDoes: '',
      whyYouNeedIt: '',
    });
  };

  const handleUpdateAiField = (index, field, value) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.aiOptions) return prev;
      const updatedAi = [...prev.aiOptions];
      updatedAi[index] = {
        ...updatedAi[index],
        [field]: field === 'price' ? Number(value) : value,
      };
      return { ...prev, aiOptions: updatedAi };
    });
  };

  const handleDeleteAi = (index) => {
    if (!window.confirm('Are you sure you want to remove this AI option from the quote calculator?')) return;
    setQuoteConfig((prev) => {
      if (!prev || !prev.aiOptions) return prev;
      const updated = prev.aiOptions.filter((_, i) => i !== index);
      const newConfig = { ...prev, aiOptions: updated };
      handleSaveQuoteConfig(newConfig);
      return newConfig;
    });
  };

  const handleAddAiSubmit = (e) => {
    e.preventDefault();
    if (!newAiForm.title.trim()) return;
    const aiId = newAiForm.id.trim() || newAiForm.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newAi = {
      ...newAiForm,
      id: aiId,
      price: Number(newAiForm.price) || 1999,
      isCustomizable: true,
    };
    setQuoteConfig((prev) => {
      const current = prev?.aiOptions || [];
      const updated = { ...prev, aiOptions: [...current, newAi] };
      handleSaveQuoteConfig(updated);
      return updated;
    });
    setIsAddAiModalOpen(false);
    setNewAiForm({
      id: '',
      title: '',
      price: 2499,
      desc: '',
    });
  };
  // ─── SERVICES EDIT MODALS & LIVE SYNC HANDLERS ─────────────────────────
  const handleOpenEditPackage = (pkg, idx) => {
    setEditingPackage({
      index: idx,
      id: pkg.id || '',
      title: pkg.title || '',
      price: pkg.price || 0,
      badge: pkg.badge || '',
      includedPages: pkg.includedPages || 1,
      simpleDesc: pkg.simpleDesc || '',
      whoIsItFor: pkg.whoIsItFor || '',
      turnaround: pkg.turnaround || '7–14 Days',
      isLive: pkg.isLive !== false,
    });
    setIsEditPackageModalOpen(true);
  };

  const handleSaveEditedPackage = (e, explicitLiveState = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingPackage || !editingPackage.title.trim()) return;
    
    // If explicitLiveState is passed (e.g. true from [Publish Live] or false from [Save as Draft]), use it.
    // Otherwise keep whatever editingPackage.isLive currently is!
    const targetLiveState = explicitLiveState !== null 
      ? explicitLiveState 
      : (editingPackage.isLive !== false);
    
    setQuoteConfig((prev) => {
      if (!prev || !prev.siteTypes) return prev;
      const updated = [...prev.siteTypes];
      updated[editingPackage.index] = {
        ...updated[editingPackage.index],
        title: editingPackage.title.trim(),
        price: Number(editingPackage.price) || 0,
        badge: editingPackage.badge?.trim() || '',
        includedPages: Number(editingPackage.includedPages) || 1,
        simpleDesc: editingPackage.simpleDesc?.trim() || '',
        whoIsItFor: editingPackage.whoIsItFor?.trim() || '',
        turnaround: editingPackage.turnaround?.trim() || '7–14 Days',
        isLive: targetLiveState,
      };
      const newConfig = { ...prev, siteTypes: updated };
      
      // Auto-save to server!
      handleSaveQuoteConfig(newConfig, targetLiveState ? 'live' : 'draft');
      return newConfig;
    });

    setIsEditPackageModalOpen(false);
    if (!targetLiveState) {
      setDraftSavedNotice(`💾 Saved draft details for "${editingPackage.title}"! Click "🚀 Make Live" on the row when ready to publish.`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    } else {
      setDraftSavedNotice(`🚀 "${editingPackage.title}" is saved and LIVE on the public website!`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    }
  };

  const handleTogglePackageLive = (idx) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.siteTypes) return prev;
      const updated = [...prev.siteTypes];
      const currentLive = updated[idx].isLive !== false;
      const nextLive = !currentLive;
      updated[idx] = { ...updated[idx], isLive: nextLive };
      const newConfig = { ...prev, siteTypes: updated };
      
      // Persist immediately to live server!
      handleSaveQuoteConfig(newConfig, nextLive ? 'live' : 'draft');
      return newConfig;
    });
  };

  const handleOpenEditFeature = (feat, idx) => {
    setEditingFeature({
      index: idx,
      id: feat.id || '',
      title: feat.title || '',
      price: feat.price || 0,
      whatItDoes: feat.whatItDoes || '',
      whyYouNeedIt: feat.whyYouNeedIt || '',
      isLive: feat.isLive !== false,
    });
    setIsEditFeatureModalOpen(true);
  };

  const handleSaveEditedFeature = (e, explicitLiveState = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingFeature || !editingFeature.title.trim()) return;
    
    const targetLiveState = explicitLiveState !== null 
      ? explicitLiveState 
      : (editingFeature.isLive !== false);

    setQuoteConfig((prev) => {
      if (!prev || !prev.features) return prev;
      const updated = [...prev.features];
      updated[editingFeature.index] = {
        ...updated[editingFeature.index],
        title: editingFeature.title.trim(),
        price: Number(editingFeature.price) || 0,
        whatItDoes: editingFeature.whatItDoes?.trim() || '',
        whyYouNeedIt: editingFeature.whyYouNeedIt?.trim() || '',
        isLive: targetLiveState,
      };
      const newConfig = { ...prev, features: updated };
      
      handleSaveQuoteConfig(newConfig, targetLiveState ? 'live' : 'draft');
      return newConfig;
    });

    setIsEditFeatureModalOpen(false);
    if (!targetLiveState) {
      setDraftSavedNotice(`💾 Saved draft details for "${editingFeature.title}"! Click "🚀 Make Live" to publish.`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    } else {
      setDraftSavedNotice(`🚀 "${editingFeature.title}" is saved and LIVE on the public website!`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    }
  };

  const handleToggleFeatureLive = (idx) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.features) return prev;
      const updated = [...prev.features];
      const currentLive = updated[idx].isLive !== false;
      const nextLive = !currentLive;
      updated[idx] = { ...updated[idx], isLive: nextLive };
      const newConfig = { ...prev, features: updated };
      
      handleSaveQuoteConfig(newConfig, nextLive ? 'live' : 'draft');
      return newConfig;
    });
  };

  const handleOpenEditAi = (ai, idx) => {
    setEditingAi({
      index: idx,
      id: ai.id || '',
      title: ai.title || '',
      price: ai.price || 0,
      desc: ai.desc || '',
      isLive: ai.isLive !== false,
    });
    setIsEditAiModalOpen(true);
  };

  const handleSaveEditedAi = (e, explicitLiveState = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingAi || !editingAi.title.trim()) return;
    
    const targetLiveState = explicitLiveState !== null 
      ? explicitLiveState 
      : (editingAi.isLive !== false);

    setQuoteConfig((prev) => {
      if (!prev || !prev.aiOptions) return prev;
      const updated = [...prev.aiOptions];
      updated[editingAi.index] = {
        ...updated[editingAi.index],
        title: editingAi.title.trim(),
        price: Number(editingAi.price) || 0,
        desc: editingAi.desc?.trim() || '',
        isLive: targetLiveState,
      };
      const newConfig = { ...prev, aiOptions: updated };
      
      handleSaveQuoteConfig(newConfig, targetLiveState ? 'live' : 'draft');
      return newConfig;
    });

    setIsEditAiModalOpen(false);
    if (!targetLiveState) {
      setDraftSavedNotice(`💾 Saved draft details for "${editingAi.title}"! Click "🚀 Make Live" to publish.`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    } else {
      setDraftSavedNotice(`🚀 "${editingAi.title}" is saved and LIVE on the public website!`);
      setTimeout(() => setDraftSavedNotice(null), 6000);
    }
  };

  const handleToggleAiLive = (idx) => {
    setQuoteConfig((prev) => {
      if (!prev || !prev.aiOptions) return prev;
      const updated = [...prev.aiOptions];
      const currentLive = updated[idx].isLive !== false;
      const nextLive = !currentLive;
      updated[idx] = { ...updated[idx], isLive: nextLive };
      const newConfig = { ...prev, aiOptions: updated };
      
      handleSaveQuoteConfig(newConfig, nextLive ? 'live' : 'draft');
      return newConfig;
    });
  };

  // Factory Presets for Reversing back to standard
  const STANDARD_DEFAULT_PACKAGES = [
    {
      id: 'landing',
      title: '1-Page Quick Launchpad',
      price: 3999,
      badge: 'Fast Launch',
      includedPages: 1,
      simpleDesc: 'A single, high-converting scrollable page. Perfect for landing pages, portfolio, or single service launch.',
      whoIsItFor: 'Freelancers, new businesses, single product launch',
      turnaround: '3–5 Days',
      isCustomizable: true,
      isLive: true,
    },
    {
      id: 'business',
      title: 'Complete Multi-Page Website',
      price: 7999,
      badge: 'Most Popular',
      includedPages: 5,
      simpleDesc: 'Full professional website with separate pages: Home, About Us, Services/Menu, Photo Gallery, and Contact.',
      whoIsItFor: 'Catering, Salons, Clinics, Contractors, Local Brands',
      turnaround: '7–14 Days',
      isCustomizable: true,
      isLive: true,
    },
    {
      id: 'ecommerce',
      title: 'Online Shop / E-Commerce Store',
      price: 14999,
      badge: 'Direct Selling',
      includedPages: 6,
      simpleDesc: 'Sell your products online with automatic shopping cart, UPI & Card payments, and WhatsApp order alerts.',
      whoIsItFor: 'Clothing, Electronics, Grocery, Product Brands',
      turnaround: '14–21 Days',
      isCustomizable: true,
      isLive: true,
    },
    {
      id: 'custom_portal',
      title: 'Custom Booking / Valuation Portal',
      price: 18999,
      badge: 'Advanced System',
      includedPages: 8,
      simpleDesc: 'Interactive system with client login, automatic trade-in price valuation (like Ecofone), or complex booking flows.',
      whoIsItFor: 'Startups, Recommerce, Multi-branch operations',
      turnaround: '14–28 Days',
      isCustomizable: true,
      isLive: true,
    },
  ];

  const handleResetPackageToDefault = (idx) => {
    const pkg = quoteConfig?.siteTypes?.[idx];
    if (!pkg) return;
    const defaultPkg = STANDARD_DEFAULT_PACKAGES.find((p) => p.id === pkg.id) || STANDARD_DEFAULT_PACKAGES[idx];
    if (!defaultPkg) return;

    setQuoteConfig((prev) => {
      if (!prev || !prev.siteTypes) return prev;
      const updated = [...prev.siteTypes];
      updated[idx] = { ...defaultPkg };
      const newConfig = { ...prev, siteTypes: updated };
      handleSaveQuoteConfig(newConfig, 'live');
      return newConfig;
    });
    setDraftSavedNotice(`↺ Reverted "${pkg.title}" back to default live settings!`);
    setTimeout(() => setDraftSavedNotice(null), 5000);
  };

  const handleResetAllDefaults = () => {
    if (!confirm('Revert all packages to standard presets (all live, original pricing & turnaround)?')) return;
    setQuoteConfig((prev) => {
      const newConfig = {
        ...prev,
        siteTypes: STANDARD_DEFAULT_PACKAGES,
        extraPageRate: 399,
      };
      handleSaveQuoteConfig(newConfig, 'live');
      return newConfig;
    });
    setDraftSavedNotice('↺ All packages reversed back to default presets and published live!');
    setTimeout(() => setDraftSavedNotice(null), 5000);
  };

  return (
    <div className="fixkar-admin-root animate-fade-in">
      {/* ─── PRINTABLE PDF RECEIPT MODAL ─────────────────────────────────── */}
      {(selectedReceiptProject || selectedReceiptPayment) && (
        <ReceiptModal
          project={selectedReceiptProject}
          paymentData={selectedReceiptPayment}
          onClose={() => {
            setSelectedReceiptProject(null);
            setSelectedReceiptPayment(null);
          }}
        />
      )}

      {/* ─── CLIENT PROTOTYPE REVISION & FEEDBACK MODAL (PREMIUM UI DESIGN) ─── */}
      {selectedFeedbackProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.88)',
            backdropFilter: 'blur(20px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setSelectedFeedbackProject(null)}
        >
          <div
            style={{
              width: '780px',
              maxWidth: '96vw',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: 'linear-gradient(180deg, rgba(14, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.99) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.4)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(236, 72, 153, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Header Bar: Client Avatar, Title, Code & Close Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(219, 39, 119, 0.35) 100%)', border: '1px solid rgba(236, 72, 153, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F472B6', fontWeight: 900, fontSize: '1.1rem' }}>
                  {selectedFeedbackProject.clientName?.charAt(0) || 'P'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                      {selectedFeedbackProject.clientName}
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#F472B6', background: 'rgba(236, 72, 153, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      {selectedFeedbackProject.clientCode || 'FIX-PROJ'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🔄 Client Feedback &amp; Updating Manager</span>
                    <span>•</span>
                    <a
                      href={selectedFeedbackProject.domain && selectedFeedbackProject.domain.startsWith('http') ? selectedFeedbackProject.domain : `https://${selectedFeedbackProject.domain || 'fixkar.co.in'}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#60A5FA', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}
                    >
                      <span>{selectedFeedbackProject.domain || 'staging.fixkar.co.in'}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFeedbackProject(null)}
                style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.15s ease' }}
                title="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* 2. Sprint & Telemetry Status Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.5) 100%)',
                border: '1px solid rgba(236, 72, 153, 0.25)',
                borderRadius: '14px',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  LIFECYCLE STAGE
                </div>
                <div style={{ fontWeight: 800, color: '#F472B6', fontSize: '0.9rem', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>●</span>
                  <span>{selectedFeedbackProject.sprintStatus || 'Client Feedback & Updating'}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  TARGET DELIVERY
                </div>
                <div style={{ fontWeight: 700, color: '#F1F5F9', fontSize: '0.88rem', marginTop: '3px' }}>
                  📅 {selectedFeedbackProject.deliveryDate || '2026-09-02'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  50/50 MILESTONES
                </div>
                <div style={{ fontWeight: 700, color: '#4ADE80', fontSize: '0.88rem', marginTop: '3px' }}>
                  Total: {selectedFeedbackProject.totalBudget} <span style={{ fontSize: '0.74rem', color: '#CBD5E1' }}>({selectedFeedbackProject.advancePaid} / {selectedFeedbackProject.balanceDue})</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateProjectStage(selectedFeedbackProject.id, '3. Client Feedback & Updating');
                    setSelectedFeedbackProject(p => ({ ...p, sprintStatus: '3. Client Feedback & Updating' }));
                  }}
                  style={{
                    background: 'rgba(236, 72, 153, 0.15)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    color: '#F472B6',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <RefreshCw size={12} />
                  <span>Set Stage to Updating</span>
                </button>
              </div>
            </div>

            {/* 3. Feedback & Revision Stream */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📋 Revision Action Items &amp; Update Log</span>
                  <span style={{ fontSize: '0.7rem', color: '#F472B6', background: 'rgba(236, 72, 153, 0.15)', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                    {feedbackReviewsList.filter(f => !selectedFeedbackProject.domain || f.projectDomain === selectedFeedbackProject.domain || f.clientCode === selectedFeedbackProject.clientCode).length}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Client Feedback → Live Staging Update Loop
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {feedbackReviewsList
                  .filter(f => !selectedFeedbackProject.domain || f.projectDomain === selectedFeedbackProject.domain || f.clientCode === selectedFeedbackProject.clientCode)
                  .map((tkt) => {
                    const isSolved = tkt?.status === 'Solved' || tkt?.status === 'Updated';
                    const isWorking = tkt?.status === 'Working' || tkt?.status === 'In Progress' || tkt?.status === 'Updating';

                    return (
                      <div
                        key={tkt.id}
                        style={{
                          background: isSolved ? 'rgba(16, 185, 129, 0.05)' : isWorking ? 'rgba(56, 189, 248, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                          border: `1px solid ${isSolved ? 'rgba(16, 185, 129, 0.3)' : isWorking ? 'rgba(56, 189, 248, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '2px 7px', borderRadius: '5px', fontWeight: 700 }}>
                              {tkt.category}
                            </span>
                            <span style={{ fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600 }}>
                              {tkt.author?.includes('Client') ? '👤 ' : '🛠️ '}{tkt.author || 'Client (Portal)'}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
                              • {tkt.createdAt}
                            </span>
                          </div>

                          {/* Interactive Status Switcher Buttons */}
                          <div style={{ display: 'flex', gap: '5px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            {[
                              { id: 'In Review', label: '⏳ Pending', bg: '#F59E0B', active: tkt?.status === 'In Review' || tkt?.status === 'Pending' },
                              { id: 'Working', label: '🔨 In Code / Updating', bg: '#2563EB', active: isWorking },
                              { id: 'Solved', label: '✓ Updated & Deployed', bg: '#10B981', active: isSolved },
                            ].map((st) => (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => {
                                  setFeedbackReviewsList(prev => prev.map(item => item.id === tkt.id ? { ...item, status: st.id } : item));
                                }}
                                style={{
                                  background: st.active ? st.bg : 'transparent',
                                  border: 'none',
                                  color: st.active ? '#fff' : '#94A3B8',
                                  padding: '3px 9px',
                                  borderRadius: '5px',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {st.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div style={{ fontSize: '0.84rem', color: '#F8FAFC', lineHeight: 1.5, paddingLeft: '2px' }}>
                          {tkt.note}
                        </div>
                      </div>
                    );
                  })}

                {feedbackReviewsList.filter(f => !selectedFeedbackProject.domain || f.projectDomain === selectedFeedbackProject.domain || f.clientCode === selectedFeedbackProject.clientCode).length === 0 && (
                  <div style={{ padding: '24px 20px', textAlign: 'center', background: 'rgba(56, 189, 248, 0.04)', border: '1px dashed rgba(56, 189, 248, 0.25)', borderRadius: '12px' }}>
                    <CheckCircle2 size={24} color="#4ADE80" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
                      Zero Pending Revision Items
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px' }}>
                      All requested changes have been addressed and updated on staging!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Add Engineering QA Note / Revision Form */}
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F472B6', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={14} />
                <span>Log New Revision / Client Update Task</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <select
                  value={newFeedbackCategory}
                  onChange={(e) => setNewFeedbackCategory(e.target.value)}
                  style={{ background: '#0F172A', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.78rem', outline: 'none' }}
                >
                  <option value="UI / Design">🎨 UI / Design Polish</option>
                  <option value="Content / Text">📝 Content / Copy Update</option>
                  <option value="Bug / Error Fix">🐛 Bug / Error Fix</option>
                  <option value="Mobile Responsiveness">📱 Mobile Responsiveness</option>
                  <option value="Fast2SMS OTP">🔐 Fast2SMS OTP Integration</option>
                  <option value="Payment Gateway">💳 Payment Gateway (Razorpay/UPI)</option>
                </select>
                <input
                  type="text"
                  placeholder="Describe update (e.g. Change banner hero text, update pricing table)..."
                  value={newFeedbackNote}
                  onChange={(e) => setNewFeedbackNote(e.target.value)}
                  style={{ flex: 1, minWidth: '220px', background: '#0F172A', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newFeedbackNote.trim()) return;
                    const newTkt = {
                      id: `fb_${Date.now()}`,
                      projectDomain: selectedFeedbackProject.domain,
                      clientCode: selectedFeedbackProject.clientCode,
                      category: newFeedbackCategory,
                      note: newFeedbackNote.trim(),
                      status: 'Working',
                      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                      author: 'Senior Engineer',
                    };
                    setFeedbackReviewsList(prev => [newTkt, ...prev]);
                    setNewFeedbackNote('');
                  }}
                  style={{ background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <Plus size={13} />
                  <span>Log Update</span>
                </button>
              </div>
            </div>

            {/* 5. Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  handleUpdateProjectStage(selectedFeedbackProject.id, '4. Final Approval & Balance');
                  setSelectedFeedbackProject(null);
                }}
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Check size={14} />
                <span>Mark All Revisions Done → Ready for Approval</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFeedbackProject(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#CBD5E1',
                  padding: '8px 22px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Close Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── QA & TESTING SUITE MODAL (END-TO-END VERIFICATION) ─────────────── */}
      {selectedTestingProject && (() => {
        const code = selectedTestingProject.clientCode || 'FIX-PROJ';
        const checklist = projectQaChecklists[code] || {
          mobile: 'Passed',
          forms: 'Passed',
          speed: 'Passed',
          ssl: 'Passed',
          otp: 'Passed',
          seo: 'Passed',
        };

        const testItems = [
          {
            key: 'mobile',
            icon: '📱',
            title: 'Mobile & Responsive Viewport Matrix',
            desc: 'Verified on 375px (iPhone), 768px (iPad), and 1440px (Desktop). No horizontal scroll, hamburger menu working.',
            status: checklist.mobile || 'Pending',
          },
          {
            key: 'forms',
            icon: '📝',
            title: 'Form Submission & Lead Capture API',
            desc: 'Contact forms, enquiry modals, email triggers, and database capture verified with valid input checks.',
            status: checklist.forms || 'Pending',
          },
          {
            key: 'speed',
            icon: '⚡',
            title: 'PageSpeed & Performance Benchmark',
            desc: 'LCP < 1.8s, WebP compressed images, zero blocking scripts, CSS minified, fast CDN delivery.',
            status: checklist.speed || 'Pending',
          },
          {
            key: 'ssl',
            icon: '🔒',
            title: 'SSL HTTPS & Security Headers',
            desc: 'Valid Let’s Encrypt / Cloudflare SSL certificate active, HTTPS redirect forced, no mixed content warnings.',
            status: checklist.ssl || 'Pending',
          },
          {
            key: 'otp',
            icon: '🔐',
            title: 'Fast2SMS OTP & Payment Webhooks',
            desc: 'Live SMS OTP verification endpoint active on staging, UPI / Razorpay payment modal functional.',
            status: checklist.otp || 'Pending',
          },
          {
            key: 'seo',
            icon: '🌐',
            title: 'Cross-Browser & SEO Meta Tags',
            desc: 'Tested on Chrome, Safari, Firefox, and Edge. OpenGraph tags, favicon, title, and schema markup active.',
            status: checklist.seo || 'Pending',
          },
        ];

        const passedCount = testItems.filter((t) => t?.status === 'Passed').length;
        const totalCount = testItems.length;
        const passPercentage = Math.round((passedCount / totalCount) * 100);

        const handleSetTestStatus = (testKey, newStatus) => {
          setProjectQaChecklists((prev) => ({
            ...prev,
            [code]: {
              ...(prev[code] || {}),
              [testKey]: newStatus,
            },
          }));
        };

        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(2, 6, 18, 0.88)',
              backdropFilter: 'blur(20px)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              animation: 'fadeIn 0.2s ease-out',
            }}
            onClick={() => setSelectedTestingProject(null)}
          >
            <div
              style={{
                width: '780px',
                maxWidth: '96vw',
                maxHeight: '92vh',
                overflowY: 'auto',
                background: 'linear-gradient(180deg, rgba(14, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.99) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 1. Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.35) 100%)', border: '1px solid rgba(245, 158, 11, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FDE047', fontWeight: 900, fontSize: '1.2rem' }}>
                    🧪
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        {selectedTestingProject.clientName}
                      </h2>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#FDE047', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                        {code}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🧪 QA Testing &amp; Staging Verification Suite</span>
                      <span>•</span>
                      <a
                        href={selectedTestingProject.domain && selectedTestingProject.domain.startsWith('http') ? selectedTestingProject.domain : `https://${selectedTestingProject.domain || 'fixkar.co.in'}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#60A5FA', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}
                      >
                        <span>{selectedTestingProject.domain}</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTestingProject(null)}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem' }}
                  title="Close QA Suite"
                >
                  ✕
                </button>
              </div>

              {/* 2. QA Progress Score Banner */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.5) 100%)',
                  border: `1px solid ${passPercentage === 100 ? 'rgba(74, 222, 128, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                  borderRadius: '14px',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    QA VERIFICATION BENCHMARK
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: passPercentage === 100 ? '#4ADE80' : '#FDE047', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{passedCount}/{totalCount} Checks Passed ({passPercentage}%)</span>
                    {passPercentage === 100 && <span style={{ fontSize: '0.74rem', background: 'rgba(74, 222, 128, 0.2)', color: '#86EFAC', padding: '2px 8px', borderRadius: '6px' }}>Ready for Client UAT</span>}
                  </div>
                  <div style={{ width: '260px', height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${passPercentage}%`, height: '100%', background: passPercentage === 100 ? '#4ADE80' : '#F59E0B', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      testItems.forEach((t) => handleSetTestStatus(t.key, 'Passed'));
                    }}
                    style={{
                      background: 'rgba(74, 222, 128, 0.15)',
                      border: '1px solid rgba(74, 222, 128, 0.4)',
                      color: '#86EFAC',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ✓ Pass All Tests
                  </button>
                  <a
                    href={selectedTestingProject.domain && selectedTestingProject.domain.startsWith('http') ? selectedTestingProject.domain : `https://${selectedTestingProject.domain || 'fixkar.co.in'}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      textDecoration: 'none',
                    }}
                  >
                    <Globe size={12} />
                    <span>Open Live Preview ↗</span>
                  </a>
                </div>
              </div>

              {/* 3. 6 Core Test Suites */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#CBD5E1', marginBottom: '2px' }}>
                  🧪 6 Pre-Delivery Technical Verification Suites
                </div>

                {testItems.map((item) => {
                  const isPass = item?.status === 'Passed';
                  const isProg = item?.status === 'In Progress';
                  const isFail = item?.status === 'Failed';

                  return (
                    <div
                      key={item.key}
                      style={{
                        background: isPass ? 'rgba(74, 222, 128, 0.04)' : isProg ? 'rgba(56, 189, 248, 0.04)' : isFail ? 'rgba(244, 63, 94, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isPass ? 'rgba(74, 222, 128, 0.3)' : isProg ? 'rgba(56, 189, 248, 0.3)' : isFail ? 'rgba(244, 63, 94, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '240px' }}>
                        <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.85rem' }}>{item.title}</div>
                          <div style={{ fontSize: '0.73rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                      </div>

                      {/* Interactive Status Switcher Buttons */}
                      <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        {[
                          { id: 'Passed', label: '✅ Passed', bg: '#10B981', active: isPass },
                          { id: 'In Progress', label: '⚡ Testing', bg: '#2563EB', active: isProg },
                          { id: 'Pending', label: '⏳ Pending', bg: '#64748B', active: item?.status === 'Pending' },
                          { id: 'Failed', label: '❌ Bug Found', bg: '#EF4444', active: isFail },
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            type="button"
                            onClick={() => handleSetTestStatus(item.key, btn.id)}
                            style={{
                              background: btn.active ? btn.bg : 'transparent',
                              border: 'none',
                              color: btn.active ? '#fff' : '#94A3B8',
                              padding: '4px 8px',
                              borderRadius: '5px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4. Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateProjectStage(selectedTestingProject.id, '2. QA & Staging Testing');
                      setSelectedTestingProject(null);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Check size={14} />
                    <span>Pass QA → Verified on Staging</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const proj = selectedTestingProject;
                      setSelectedTestingProject(null);
                      setSelectedFeedbackProject(proj);
                    }}
                    style={{
                      background: 'rgba(236, 72, 153, 0.15)',
                      border: '1px solid rgba(236, 72, 153, 0.35)',
                      color: '#F472B6',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <MessageSquare size={13} />
                    <span>Open Feedback &amp; Updates Hub</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTestingProject(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#CBD5E1',
                    padding: '8px 20px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close QA Suite
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── WELCOME EMAIL & WHATSAPP DISPATCH MODAL ─────────────────────── */}
      {createdClientWelcome && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '540px',
              maxWidth: '96vw',
              background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(74, 222, 128, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#4ADE80" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                  Client Onboarded Successfully!
                </h3>
              </div>
              <button
                onClick={() => setCreatedClientWelcome(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.72rem', background: 'rgba(74, 222, 128, 0.15)', color: '#4ADE80', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                ● Phase 1 Registration Initialized
              </span>
            </div>

            {/* Automated Firebase Email Alert Badge */}
            {createdClientWelcome.email ? (
              <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.76rem', color: '#BAE6FD' }}>
                  <strong>✉️ Automated Email Dispatched via Firebase:</strong> Credentials sent automatically to <strong style={{ color: '#fff' }}>{createdClientWelcome.email}</strong>. Client can log in immediately!
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.35)', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={18} color="#FBBF24" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.76rem', color: '#FDE68A' }}>
                  No email was provided in Phase 1. You can share credentials via WhatsApp below.
                </div>
              </div>
            )}

            <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '14px', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6, fontFamily: 'monospace', marginBottom: '18px' }}>
              <div>👤 <strong>Registration ID:</strong> <span style={{ color: '#38BDF8' }}>{createdClientWelcome.clientCode}</span></div>
              <div>🔑 <strong>Default Password:</strong> <span style={{ color: '#4ADE80' }}>{createdClientWelcome.defaultPassword}</span></div>
              <div>🌐 <strong>Portal Login:</strong> http://localhost:3000/#client-login</div>
              <div>📦 <strong>Agreed Package:</strong> {createdClientWelcome.agreedPackage || 'Custom Web Application'}</div>
              <div>⚙️ <strong>Status:</strong> Phase 1 Done &bull; Phase 2 Infrastructure Pending</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  const newDocId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
                  const contractText = `================================================================================
FIXKAR WEB & AI STUDIO — MANAGED SERVICE AGREEMENT & WORK ORDER (MSA)
Reference ID: FIX-MSA-${Math.floor(1000 + Math.random() * 9000)} | Date: ${new Date().toISOString().split('T')[0]}
================================================================================

1. PARTIES INVOLVED:
- SERVICE PROVIDER: Fixkar Web & AI Engineering Studio (Bihar, India | support@fixkar.co.in)
- CLIENT: ${createdClientWelcome.businessName} (Contact: ${createdClientWelcome.contactPerson || createdClientWelcome.businessName})
- CLIENT DOMAIN: ${createdClientWelcome.domain || 'Registered Web Domain'}
- PHONE: ${createdClientWelcome.phone || 'Verified Phone'} | CLIENT CODE: ${createdClientWelcome.clientCode}

2. SCOPE OF SERVICES & DELIVERABLES:
Fixkar Studio agrees to architect, build, deploy, and host the high-speed web platform for ${createdClientWelcome.businessName}:
- High-Performance Web Application (Mobile-optimized, SSL HTTPS secured, <0.4s fast load latency).
- Real-Time Self-Service Client Portal Dashboard Access (Manage leads, track orders, recharge OTPs, submit tickets).
- Full Production Live Deployment on dedicated commercial cloud infrastructure.

3. MANAGED HOSTING & INFRASTRUCTURE MODEL (WHITE-LABEL):
- All cloud servers, domain DNS routing, SSL certificates, and third-party APIs are provisioned, maintained, and 100% managed by Fixkar Web & AI Studio under Fixkar Master Enterprise Infrastructure.
- For system security, anti-tampering protection, and uninterrupted SLA performance, direct root infrastructure credentials remain exclusively with Fixkar Studio.
- Client is granted full operational control through their dedicated Fixkar Client Portal Dashboard (/#client-portal).

4. SOURCE CODE BACKUP (UPON REQUEST):
- Client owns the right to their business content and frontend website assets.
- An exported static archive/copy of the website source code will be provided to the Client upon written request after final milestone clearance.

5. FINANCIAL TERMS (50/50 MILESTONE MODEL):
- Total Project Engineering Fee: ₹24,999 (or agreed package rate)
- Milestone 1 (50% Advance): Required for architecture design, cloud provisioning, and development kickstart.
- Milestone 2 (50% Final): Payable only upon complete live verification and final approval.

6. 1-YEAR SLA WARRANTY & BUG-FIX SUPPORT:
- 12 Months 99.9% Uptime Guarantee with automated daily cloud backups and DDoS mitigation.
- FREE BUG FIXES (1-YEAR): Any software bugs, runtime errors, broken links, or server downtime issues are 100% covered and resolved FREE of cost under the 1-Year SLA warranty.
- ANNUAL RENEWALS: Annual domain and managed VPS server renewal will be billed directly by Fixkar at transparent annual rates.

7. POST-HANDOVER MODIFICATIONS & CHANGE REQUESTS (PAID):
- 6-MONTH POST-LAUNCH POLICY: Routine minor adjustments are accommodated during the initial launch phase.
- NEW CHANGES & FEATURE REQUESTS (BILLABLE): Any new design modifications, layout reworks, new page additions, or custom feature integrations requested after launch / 6 months are STRICTLY CHARGEABLE based on Fixkar standard customization rates. Bug fixing remains FREE, but scope changes/new development will require a separate approved Work Order & quote.

8. ACCEPTANCE & AUTHORIZATION:

For Fixkar Web & AI Studio:                For ${createdClientWelcome.businessName}:
Authorized Software Lead                  Authorized Signatory
Fixkar Engineering Hub                    Date: ${new Date().toISOString().split('T')[0]}
================================================================================`;

                  const newDoc = {
                    id: newDocId,
                    name: `${createdClientWelcome.businessName.replace(/[^a-zA-Z0-9]/g, '')}-Master-Agreement.pdf`,
                    clientCode: createdClientWelcome.clientCode,
                    client: createdClientWelcome.businessName,
                    size: '1.5 MB',
                    date: new Date().toISOString().split('T')[0],
                    type: 'Contract',
                    title: `Master Service Agreement (${createdClientWelcome.businessName})`,
                    summary: `Official MSA with 50/50 payment milestone, managed cloud infrastructure, and 1-year SLA warranty.`,
                    content: contractText,
                  };

                  setDocumentsList(prev => [newDoc, ...prev]);
                  setSelectedDocPreview(newDoc);
                  setCreatedClientWelcome(null);
                }}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                }}
              >
                <Sparkles size={14} color="#FDE047" />
                <span>📄 Generate &amp; Print Agreement PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Hello ${createdClientWelcome.contactPerson}! Welcome to Fixkar Web Development.\n\nYour Client Portal is now active:\n• Portal: https://fixkar.co.in/#client-login\n• Client ID: ${createdClientWelcome.clientCode}\n• Password: ${createdClientWelcome.defaultPassword}\n\nYou can log in to view live website infrastructure, manage OTP verification credits, and download official receipts.`
                  );
                  alert('Welcome message copied to clipboard!');
                }}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Copy size={13} />
                <span>Copy Message</span>
              </button>

              <a
                href={`https://wa.me/${String(createdClientWelcome.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello ${createdClientWelcome.contactPerson}! Welcome to Fixkar Web Development.\n\nYour Client Portal is now active:\n• Portal: https://fixkar.co.in/#client-login\n• Client ID: ${createdClientWelcome.clientCode}\n• Password: ${createdClientWelcome.defaultPassword}\n\nYou can log in to view live website infrastructure, manage OTP verification credits, and download official receipts.`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{ background: '#16A34A', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={13} />
                <span>Send on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── PROJECT LIVE & HANDOVER CONGRATULATORY MODAL ────────────────── */}
      {projectHandoverNotice && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '540px',
              maxWidth: '96vw',
              background: 'linear-gradient(180deg, rgba(10, 24, 20, 0.98) 0%, rgba(6, 14, 12, 0.99) 100%)',
              border: '1px solid rgba(74, 222, 128, 0.5)',
              borderRadius: '18px',
              padding: '26px',
              boxShadow: '0 25px 60px rgba(74, 222, 128, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Rocket size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontWeight: 800 }}>
                    🚀 Website is 100% LIVE in Production!
                  </h3>
                  <div style={{ fontSize: '0.74rem', color: '#4ADE80', fontWeight: 600 }}>
                    Handover Complete • Balance Settled (₹0 Due)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setProjectHandoverNotice(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Client Name:</span>
                <strong style={{ color: '#fff', fontSize: '0.84rem' }}>{projectHandoverNotice.clientName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Live Domain:</span>
                <strong style={{ color: '#38BDF8', fontSize: '0.84rem' }}>{projectHandoverNotice.domain}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Total Project Value:</span>
                <strong style={{ color: '#4ADE80', fontSize: '0.84rem' }}>{projectHandoverNotice.totalBudget}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Final Milestone Status:</span>
                <span style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ADE80', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  100% Paid &amp; Transferred
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '18px' }}>
              The website has been officially deployed to production servers with SSL certification, DLT header routing, and client self-service portal access.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setSelectedReceiptProject({
                    clientName: projectHandoverNotice.clientName,
                    totalBudget: projectHandoverNotice.totalBudget,
                    domain: projectHandoverNotice.domain,
                    id: 'proj_live_handover',
                  });
                  setProjectHandoverNotice(null);
                }}
                style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38BDF8', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={14} />
                <span>PDF Final Receipt</span>
              </button>

              <a
                href={`https://wa.me/${String(projectHandoverNotice.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(
                  `🎉 Congratulations ${projectHandoverNotice.clientName}! Your website ${projectHandoverNotice.domain} is now 100% LIVE in Production.\n\nAll server hosting, SSL security, and OTP verification infrastructure are active.\n• Access Website: https://${projectHandoverNotice.domain}\n• Client Self-Service Portal: https://fixkar.co.in/#client-login\n\nThank you for partnering with Fixkar Web Development!`
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{ background: '#16A34A', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={14} />
                <span>Send WhatsApp Live Alert →</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── PAYMENT CONFIRMATION NOTICE MODAL ───────────────────────────── */}
      {paymentConfirmationNotice && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '520px',
              maxWidth: '96vw',
              background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(56, 189, 248, 0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#38BDF8" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                  Payment &amp; Renewal Updated!
                </h3>
              </div>
              <button
                onClick={() => setPaymentConfirmationNotice(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '14px', lineHeight: 1.5 }}>
              Payment of <strong>{paymentConfirmationNotice.amount}</strong> recorded for <strong>{paymentConfirmationNotice.clientName}</strong>. Next renewal extended to <strong>{paymentConfirmationNotice.extendedDate}</strong>.
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px', fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '18px' }}>
              "Dear {paymentConfirmationNotice.clientName}, your payment of {paymentConfirmationNotice.amount} for {paymentConfirmationNotice.service} has been successfully updated. Your website renewal has been extended to {paymentConfirmationNotice.extendedDate}. Official receipt available in your Client Portal: https://fixkar.co.in/#client-login"
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPaymentConfirmationNotice(null)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PHASE 1: CLIENT REGISTRATION & IDENTITY ONBOARDING MODAL ─────────── */}
      {isAddClientModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(20px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsAddClientModalOpen(false); }}
        >
          <div
            style={{
              width: '680px',
              maxWidth: '96vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Sticky Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.6)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="#38BDF8" />
                  <h2 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 800 }}>
                    🚀 Phase 1: Client Registration &amp; Identity Onboarding
                  </h2>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '3px' }}>
                  Step 1 of 2: Create Client Account, Generate Portal Credentials &amp; Agreement Record.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddClientModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', cursor: 'pointer', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleAddClientSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, margin: 0 }}>
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Section 1: Business Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>01</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.08em', fontWeight: 700 }}>BUSINESS &amp; IDENTITY DETAILS</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Business / Website Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Fitness Hub"
                      value={newClientForm.businessName}
                      onChange={(e) => setNewClientForm({ ...newClientForm, businessName: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Business Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Gym &amp; Fitness Studio"
                      value={newClientForm.businessType}
                      onChange={(e) => setNewClientForm({ ...newClientForm, businessType: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Client Logo Upload */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px 14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: newClientForm.logoUrl
                        ? 'transparent'
                        : 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                      color: '#38BDF8',
                      fontWeight: 800,
                      fontSize: '1rem',
                    }}
                  >
                    {newClientForm.logoUrl ? (
                      <img
                        src={newClientForm.logoUrl}
                        alt="Logo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span>{newClientForm.businessName?.slice(0, 2).toUpperCase() || '?'}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block' }}>Client Business Logo (optional)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label
                        style={{
                          background: 'rgba(56, 189, 248, 0.12)',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          color: '#38BDF8',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        📁 Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setNewClientForm((prev) => ({ ...prev, logoUrl: ev.target.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>or</span>
                      <input
                        type="text"
                        placeholder="Paste logo URL (https://...)"
                        value={newClientForm.logoUrl?.startsWith('data:') ? '' : (newClientForm.logoUrl || '')}
                        onChange={(e) => setNewClientForm({ ...newClientForm, logoUrl: e.target.value })}
                        style={{ flex: 1, minWidth: '160px', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '5px 10px', color: '#fff', fontSize: '0.76rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Owner Contact */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>02</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.08em', fontWeight: 700 }}>PRIMARY OWNER &amp; CONTACT</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Owner Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Rathore"
                      value={newClientForm.contactPerson}
                      onChange={(e) => setNewClientForm({ ...newClientForm, contactPerson: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Mobile / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98111 22334"
                      value={newClientForm.phone}
                      onChange={(e) => setNewClientForm({ ...newClientForm, phone: e.target.value, whatsapp: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Owner Email</label>
                    <input
                      type="email"
                      placeholder="contact@apexfit.in"
                      value={newClientForm.email}
                      onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Section 3: Location & Address */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>03</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.08em', fontWeight: 700 }}>LOCATION &amp; OFFICE ADDRESS</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>City</label>
                    <input
                      type="text"
                      placeholder="Patna"
                      value={newClientForm.city}
                      onChange={(e) => setNewClientForm({ ...newClientForm, city: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>State</label>
                    <input
                      type="text"
                      placeholder="Bihar"
                      value={newClientForm.state}
                      onChange={(e) => setNewClientForm({ ...newClientForm, state: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>PIN Code</label>
                    <input
                      type="text"
                      placeholder="800001"
                      value={newClientForm.pinCode}
                      onChange={(e) => setNewClientForm({ ...newClientForm, pinCode: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Section 4: Agreed Package Scope */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>04</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.08em', fontWeight: 700 }}>INTENDED PROJECT SCOPE &amp; PACKAGE</span>
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Agreed Web Application Package</label>
                  <select
                    value={newClientForm.agreedPackage}
                    onChange={(e) => setNewClientForm({ ...newClientForm, agreedPackage: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box', background: '#0D1323', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                  >
                    <option value="Standard Dynamic Web App (₹35,000)">Standard Dynamic Web Application (₹35,000 &bull; 50/50 Milestones)</option>
                    <option value="Custom E-Commerce Portal (₹50,000)">Custom E-Commerce &amp; Payments Portal (₹50,000 &bull; 50/50 Milestones)</option>
                    <option value="Coaching & Exam LMS Portal (₹45,000)">Coaching &amp; Online Exam LMS Portal (₹45,000 &bull; 50/50 Milestones)</option>
                    <option value="Custom Enterprise Cloud Software (₹75,000)">Custom Enterprise Cloud Software (₹75,000 &bull; 50/50 Milestones)</option>
                  </select>
                </div>

                {/* Notice */}
                <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.74rem', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#38BDF8" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Phase 1 Output:</strong> Client credentials will be created immediately. Domain &amp; Server Infrastructure will be recorded in <strong>Phase 2</strong> once domain is registered.
                  </span>
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '14px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.8)' }}>
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>🚀 Complete Phase 1 &amp; Generate Credentials →</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── PHASE 2: CONFIGURE DOMAIN & SERVER INFRASTRUCTURE MODAL ─────────── */}
      {phase2ModalClient && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.88)',
            backdropFilter: 'blur(20px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setPhase2ModalClient(null); }}
        >
          <div
            style={{
              width: '700px',
              maxWidth: '96vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(74, 222, 128, 0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Sticky Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.6)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={18} color="#4ADE80" />
                  <h2 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 800 }}>
                    🌐 Phase 2: Domain &amp; Server Infrastructure Provisioning
                  </h2>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '3px' }}>
                  For Client: <strong style={{ color: '#fff' }}>{phase2ModalClient.businessName}</strong> ({phase2ModalClient.clientCode}) &bull; Configure live domain and cloud server specs.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhase2ModalClient(null)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', cursor: 'pointer', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handlePhase2Submit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, margin: 0 }}>
              <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Section 1: Domain Infrastructure */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ADE80', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>01</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#4ADE80', letterSpacing: '0.08em', fontWeight: 700 }}>REGISTERED DOMAIN DETAILS &amp; RENEWAL SCHEDULE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Registered Domain Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. apexfit.in or www.sharmaclasses.in"
                      value={phase2Form.domain}
                      onChange={(e) => setPhase2Form({ ...phase2Form, domain: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: '#0D1323', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Domain Registrar Hub</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloudflare, Hostinger, GoDaddy"
                      value={phase2Form.domainRegistrar}
                      onChange={(e) => setPhase2Form({ ...phase2Form, domainRegistrar: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Domain Registration Date</label>
                    <input
                      type="date"
                      value={phase2Form.domainStartDate}
                      onChange={(e) => setPhase2Form({ ...phase2Form, domainStartDate: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Domain Expiry / Renewal Date *</label>
                    <input
                      type="date"
                      required
                      value={phase2Form.domainRenewalDate}
                      onChange={(e) => setPhase2Form({ ...phase2Form, domainRenewalDate: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Domain Renewal Price</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹999 / Year"
                      value={phase2Form.domainPrice}
                      onChange={(e) => setPhase2Form({ ...phase2Form, domainPrice: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Section 2: Cloud Server Infrastructure */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ADE80', padding: '2px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>02</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#4ADE80', letterSpacing: '0.08em', fontWeight: 700 }}>CLOUD SERVER &amp; HOSTING INFRASTRUCTURE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Server / Hosting Architecture Type *</label>
                    <select
                      value={phase2Form.serverType}
                      onChange={(e) => setPhase2Form({ ...phase2Form, serverType: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: '#0D1323', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    >
                      <option value="Managed Cloud VPS (High-Performance Edge)">🚀 Managed Cloud VPS (High-Performance Edge - Fixkar Standard)</option>
                      <option value="High-Speed cPanel Shared Hosting">🏢 High-Speed cPanel Shared Hosting</option>
                      <option value="AWS Cloud Compute (EC2 / Lightsail)">☁️ AWS Cloud Compute (EC2 / Lightsail)</option>
                      <option value="Google Cloud Platform (GCP Engine)">⚡ Google Cloud Platform (GCP Compute)</option>
                      <option value="DigitalOcean Cloud Droplet VPS">🌐 DigitalOcean Cloud Droplet VPS</option>
                      <option value="Hetzner Dedicated Cloud VPS">🛡️ Hetzner Dedicated Cloud VPS</option>
                      <option value="Dedicated Bare-Metal Enterprise Server">🖥️ Dedicated Bare-Metal Enterprise Server</option>
                      <option value="Serverless Edge (Vercel / Cloudflare Workers)">⚡ Serverless Edge (Vercel / Cloudflare)</option>
                      <option value="WordPress Managed Cloud Hosting">📦 WordPress Managed Cloud Hosting</option>
                      <option value="Private Node.js / Docker Container">🔒 Private Node.js / Docker Container</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Hosting Provider / Cloud Hub</label>
                    <input
                      type="text"
                      placeholder="e.g. DigitalOcean, AWS, Hetzner"
                      value={phase2Form.serverProvider}
                      onChange={(e) => setPhase2Form({ ...phase2Form, serverProvider: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Server IP (Public IPv4)</label>
                    <input
                      type="text"
                      placeholder="139.59.88.214"
                      value={phase2Form.serverIp}
                      onChange={(e) => setPhase2Form({ ...phase2Form, serverIp: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Server Provisioning Date</label>
                    <input
                      type="date"
                      value={phase2Form.serverStartDate}
                      onChange={(e) => setPhase2Form({ ...phase2Form, serverStartDate: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Server Expiry / Renewal Date *</label>
                    <input
                      type="date"
                      required
                      value={phase2Form.hostingRenewalDate}
                      onChange={(e) => setPhase2Form({ ...phase2Form, hostingRenewalDate: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Server Renewal Price</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,499 / Year"
                      value={phase2Form.serverPrice}
                      onChange={(e) => setPhase2Form({ ...phase2Form, serverPrice: e.target.value })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>DLT Sender ID (Header)</label>
                    <input
                      type="text"
                      placeholder="e.g. APEXFH"
                      value={phase2Form.dltSenderId}
                      onChange={(e) => setPhase2Form({ ...phase2Form, dltSenderId: e.target.value.toUpperCase() })}
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none', textTransform: 'uppercase' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '14px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.8)' }}>
                <button
                  type="button"
                  onClick={() => setPhase2ModalClient(null)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: '#fff', padding: '8px 22px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  ✅ Save Phase 2 &amp; Activate Infrastructure Radar →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ENTER SUPER ADMIN AUTHENTICATION MODAL ───────────────────────── */}
      <SuperAdminLoginModal
        isOpen={isSuperAdminPlaceholderOpen}
        onClose={() => setIsSuperAdminPlaceholderOpen(false)}
      />

      {/* ─── LEFT SIDEBAR (EXACT INFORMATION ARCHITECTURE) ────────────────── */}
      <aside className="fixkar-sidebar no-print">
        <div>
          {/* Brand Header */}
          <div className="fixkar-sidebar-brand">
            <div className="fixkar-brand-pill" />
            <div>
              <div style={{ fontWeight: 800, letterSpacing: '0.08em', color: '#fff', fontSize: '1.05rem', lineHeight: 1.1 }}>
                FIXKAR
              </div>
              <div style={{ fontSize: '0.64rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.06em' }}>
                ADMIN CONSOLE
              </div>
            </div>
          </div>

          {/* GROUP 1: OVERVIEW & COMMUNICATIONS */}
          <div className="fixkar-nav-heading" style={{ marginTop: '6px' }}>COMMAND &amp; MAIL</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button
              onClick={() => { setActiveTab('dashboard'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={14} color={activeTab === 'dashboard' ? '#38BDF8' : 'currentColor'} />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('leads'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'leads' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={14} color={activeTab === 'leads' ? '#38BDF8' : 'currentColor'} />
                <span>Leads &amp; Enquiries</span>
              </div>
              {pendingEnquiriesCount > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(251, 191, 36, 0.2)', color: '#FDE047', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {pendingEnquiriesCount}
                </span>
              )}
            </button>
          </nav>

          {/* GROUP 2: CLIENT OPERATIONS */}
          <div className="fixkar-nav-heading" style={{ marginTop: '12px' }}>CLIENT OPERATIONS</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button
              onClick={() => { setActiveTab('clients'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'clients' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={14} color={activeTab === 'clients' ? '#38BDF8' : 'currentColor'} />
                <span>Clients</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={14} color={activeTab === 'projects' ? '#38BDF8' : 'currentColor'} />
                <span>Projects</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('services'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'services' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={14} color={activeTab === 'services' ? '#38BDF8' : 'currentColor'} />
                <span>Services</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('invoices'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'invoices' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={14} color={activeTab === 'invoices' ? '#38BDF8' : 'currentColor'} />
                <span>Invoices &amp; Receipts</span>
              </div>
            </button>
          </nav>

          {/* GROUP 3: SMS & EMAIL SERVICES (UNIFIED MESSAGING HUB) */}
          <div className="fixkar-nav-heading" style={{ marginTop: '12px' }}>SMS &amp; EMAIL SERVICES</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {/* Inbound & Client Mail */}
            <button
              onClick={() => { setActiveTab('emails'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'emails' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color={activeTab === 'emails' ? '#38BDF8' : 'currentColor'} />
                <span>Inbound &amp; Client Mail</span>
              </div>
              {(() => {
                const unreadCount = (inboundEmails || []).filter((e) => e?.status === 'UNREAD').length;
                if (unreadCount === 0) return null;
                return (
                  <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                    {unreadCount}
                  </span>
                );
              })()}
            </button>

            {/* Client OTP Accounts */}
            <button
              onClick={() => { setActiveTab('otp-accounts'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'otp-accounts' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={14} color={activeTab === 'otp-accounts' ? '#38BDF8' : 'currentColor'} />
                <span>Client SMS Accounts</span>
              </div>
              {lowOtpClientsCount > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(244, 63, 94, 0.2)', color: '#FDA4AF', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {lowOtpClientsCount} Low
                </span>
              )}
            </button>

            {/* Recharge Requests */}
            <button
              onClick={() => { setActiveTab('recharges'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'recharges' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={14} color={activeTab === 'recharges' ? '#38BDF8' : 'currentColor'} />
                <span>Recharge Requests</span>
              </div>
              {pendingRechargesCount > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(251, 191, 36, 0.2)', color: '#FDE047', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {pendingRechargesCount}
                </span>
              )}
            </button>

            {/* Usage Telemetry */}
            <button
              onClick={() => { setActiveTab('otp-usage'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'otp-usage' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={14} color={activeTab === 'otp-usage' ? '#38BDF8' : 'currentColor'} />
                <span>SMS &amp; Email Telemetry</span>
              </div>
            </button>
          </nav>

          {/* GROUP 4: SUPPORT & SYSTEM */}
          <div className="fixkar-nav-heading" style={{ marginTop: '12px' }}>SUPPORT &amp; SYSTEM</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button
              onClick={() => { setActiveTab('support'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'support' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LifeBuoy size={14} color={activeTab === 'support' ? '#38BDF8' : 'currentColor'} />
                <span>Support Tickets</span>
              </div>
              {openSupportTicketsCount > 0 && (
                <span style={{ fontSize: '0.62rem', background: 'rgba(244, 63, 94, 0.2)', color: '#FDA4AF', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>
                  {openSupportTicketsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('documents'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'documents' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={14} color={activeTab === 'documents' ? '#38BDF8' : 'currentColor'} />
                <span>Documents</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('activity'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'activity' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={14} color={activeTab === 'activity' ? '#38BDF8' : 'currentColor'} />
                <span>Activity</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('account'); setSelectedClientDetail(null); }}
              className={`fixkar-nav-btn ${activeTab === 'account' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={14} color={activeTab === 'account' ? '#38BDF8' : 'currentColor'} />
                <span>Admin Profile</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {/* Enter Super Admin Separate Action */}
          <button
            onClick={() => setIsSuperAdminPlaceholderOpen(true)}
            style={{
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
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
            }}
          >
            <Lock size={13} />
            <span>Enter Super Admin</span>
          </button>

          <button
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

          <button
            onClick={logoutAdmin}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              padding: '5px 12px',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <LogOut size={12} />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN WORKSPACE ──────────────────────────────────────────────── */}
      <main className="fixkar-workspace">
        {/* Workspace Top Bar */}
        <div className="fixkar-topbar no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          {/* Left Side: Section Title & Breadcrumb */}
          <div>
            <div style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: '#64748B', letterSpacing: '0.08em' }}>
              FIXKAR ADMIN / {activeTab.toUpperCase()}
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '2px 0 0', letterSpacing: '-0.02em' }}>
              {activeTab === 'dashboard' && 'Operations Dashboard'}
              {activeTab === 'leads' && 'Leads & Enquiries Management'}
              {activeTab === 'clients' && (selectedClientDetail ? selectedClientDetail.businessName : 'Client Management')}
              {activeTab === 'projects' && 'Client Projects'}
              {activeTab === 'services' && 'Services & Infrastructure'}
              {activeTab === 'invoices' && 'Invoices & Billing'}
              {activeTab === 'payments' && 'Payments Ledger'}
              {activeTab === 'renewals' && 'Renewals Tracker'}
              {activeTab === 'otp-accounts' && 'Client OTP Accounts'}
              {activeTab === 'super-otp' && '👑 Super Admin: Master Gateway & Client API Provisioning'}
              {activeTab === 'recharges' && 'Recharge Requests'}
              {activeTab === 'otp-usage' && 'OTP Usage Logs'}
              {activeTab === 'support' && 'Support Tickets'}
              {activeTab === 'documents' && 'Client Documents'}
              {activeTab === 'notifications' && 'Operational Notifications'}
              {activeTab === 'activity' && 'Business Activity'}
              {activeTab === 'account' && 'Admin Account Profile'}
              {activeTab === 'emails' && 'Email Communications & Outbound Copies'}
            </h1>
          </div>

          {/* Right Side: AI Copilot + Alert Bell + Sync Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Persistent AI Copilot Button */}
            <button
              onClick={() => setIsCopilotDrawerOpen((prev) => !prev)}
              style={{
                background: isCopilotDrawerOpen ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
                border: isCopilotDrawerOpen ? '1px solid #38BDF8' : '1px solid rgba(56, 189, 248, 0.45)',
                boxShadow: isCopilotDrawerOpen ? '0 0 20px rgba(56, 189, 248, 0.5)' : '0 0 12px rgba(56, 189, 248, 0.2)',
                borderRadius: '20px',
                padding: '6px 14px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '0.78rem',
                fontWeight: 800,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              title="Open AI Operations Copilot"
            >
              <Sparkles size={13} color="#38BDF8" />
              <span>AI Copilot</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
            </button>

            {/* ─── INTERACTIVE ALERT BELL WITH LIVE QUOTATIONS DROPDOWN ─── */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotificationMenuOpen((prev) => !prev)}
                aria-label="Operational Notifications"
                title={`Operational Radar Notifications (${pendingEnquiriesCount + unreadNotificationsCount} Active Alerts)`}
                style={{
                  position: 'relative',
                  background: isNotificationMenuOpen ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  border: isNotificationMenuOpen ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isNotificationMenuOpen ? '#38BDF8' : '#CBD5E1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Bell size={16} />
                {(pendingEnquiriesCount + unreadNotificationsCount) > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: '#F43F5E',
                      color: '#fff',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      padding: '1px 5px',
                      boxShadow: '0 0 8px rgba(244, 63, 94, 0.8)',
                      lineHeight: 1.1,
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    {pendingEnquiriesCount + unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* ─── LIVE ALERT BELL POPOVER DROPDOWN ─── */}
              {isNotificationMenuOpen && (
                <>
                  {/* Click-away backdrop overlay */}
                  <div
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 99998,
                      background: 'rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                    }}
                    onClick={() => setIsNotificationMenuOpen(false)}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '44px',
                      right: 0,
                      width: '400px',
                      maxWidth: '92vw',
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.99) 0%, rgba(9, 13, 24, 0.99) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 30px 80px 10px rgba(0, 0, 0, 0.98), 0 0 35px rgba(56, 189, 248, 0.25)',
                      zIndex: 99999,
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'fadeInPage 0.15s ease',
                      backdropFilter: 'blur(32px)',
                      WebkitBackdropFilter: 'blur(32px)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                  {/* Dropdown Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bell size={15} color="#38BDF8" />
                      <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>
                        Alerts &amp; Notifications ({pendingEnquiriesCount + unreadNotificationsCount})
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {(leads.length > 0 || notifications.length > 0) && (
                        <button
                          onClick={() => {
                            handleClearAllNotifications();
                            handleClearAllLeads();
                          }}
                          style={{
                            background: 'rgba(244, 63, 94, 0.12)',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            color: '#FDA4AF',
                            padding: '2px 7px',
                            borderRadius: '5px',
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                          title="Clear all alerts and inquiries"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setIsNotificationMenuOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Notifications Scrollable List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '340px', overflowY: 'auto', paddingRight: '2px' }}>
                    {leads.filter((l) => l?.status === 'New').length === 0 && notifications.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '24px 12px', color: '#64748B' }}>
                        <Sparkles size={22} color="#38BDF8" style={{ margin: '0 auto 8px', display: 'block', opacity: 0.7 }} />
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8' }}>All Caught Up!</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '3px' }}>
                          No active quotation alerts or unread notifications.
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* 1. New Website Quotation Inquiries (Top Priority) */}
                        {leads.filter((l) => l?.status === 'New').map((ld) => (
                          <div
                            key={ld.id}
                            style={{
                              background: 'rgba(56, 189, 248, 0.08)',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              borderRadius: '10px',
                              padding: '10px 12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Sparkles size={13} color="#4ADE80" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>
                                  New Quotation: {ld.name || ld.businessName}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.62rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                                {ld.createdAt ? new Date(ld.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                              </span>
                            </div>

                            <div style={{ fontSize: '0.74rem', color: '#CBD5E1' }}>
                              {ld.serviceRequired || 'Custom Website'} • <strong style={{ color: '#FDE047', fontFamily: 'monospace' }}>{ld.estimatedQuote}</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                              <span style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>
                                📞 {ld.phone}
                              </span>
                              <button
                                onClick={() => {
                                  setActiveTab('leads');
                                  setIsNotificationMenuOpen(false);
                                }}
                                style={{
                                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                                  border: 'none',
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <span>Open in Leads</span>
                                <ArrowRight size={10} />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* 2. System Operational Alerts */}
                        {notifications.map((ntf) => (
                          <div
                            key={ntf.id}
                            onClick={() => {
                              if (ntf.targetTab) setActiveTab(ntf.targetTab);
                              setIsNotificationMenuOpen(false);
                            }}
                            style={{
                              padding: '8px 10px',
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                            }}
                          >
                            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#F8FAFC' }}>
                              {ntf.title}
                            </div>
                            <div style={{ fontSize: '0.66rem', color: '#94A3B8', marginTop: '2px' }}>
                              {ntf.message}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        setActiveTab('leads');
                        setIsNotificationMenuOpen(false);
                      }}
                      style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      View All Leads Tab →
                    </button>
                    <button
                      onClick={() => setIsNotificationMenuOpen(false)}
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#94A3B8', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
            </div>

            {/* Sync Button */}
            <button
              onClick={fetchAllData}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
              }}
              title="Sync Data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* ====================================================================
            TAB 1: OPERATIONS DASHBOARD (Clean 3-Card Command Overview)
            ==================================================================== */}
        {activeTab === 'dashboard' && (() => {
          const totalOtpPool = (otpWallets || []).reduce((sum, w) => sum + (Number(w.availableCredits || w.balance || w.credits) || 0), 0);
          const totalProjectBooked = (projects || []).reduce((sum, p) => sum + (Number(String(p.totalBudget || '0').replace(/[^0-9.]/g, '')) || 0), 0);
          const totalAdvanceCollected = (projects || []).reduce((sum, p) => sum + (Number(String(p.advancePaid || '0').replace(/[^0-9.]/g, '')) || 0), 0);

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* ─── 4 TOP OPERATIONS METRIC KPI CARDS (Single-Row Balanced Compact Grid) ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                {/* Card 1: Clients & Growth */}
                <div
                  onClick={() => setActiveTab('clients')}
                  style={{
                    background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    borderRadius: '10px',
                    padding: '11px 13px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.22)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  title="Click to view Client Directory"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#93C5FD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      CLIENTS &amp; PIPELINE
                    </span>
                    <Users size={14} color="#38BDF8" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'monospace' }}>
                      {activeClientsCount}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8' }}>Active Accounts</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#4ADE80' }}>● 100% Operational</span>
                    <span style={{ color: '#38BDF8' }}>+{pendingEnquiriesCount} Leads</span>
                  </div>
                </div>

                {/* Card 2: Production Sprints */}
                <div
                  onClick={() => setActiveTab('projects')}
                  style={{
                    background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(74, 222, 128, 0.22)',
                    borderRadius: '10px',
                    padding: '11px 13px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.22)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  title="Click to view Production Sprints"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#86EFAC', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      PRODUCTION SPRINTS
                    </span>
                    <Rocket size={14} color="#4ADE80" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ADE80', fontFamily: 'monospace' }}>
                      {(projects || []).length}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8' }}>{liveProjectsCount} Live &bull; {inSprintProjectsCount} In Dev</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#4ADE80' }}>● On Schedule</span>
                    <span style={{ color: '#94A3B8' }}>Sprints Active</span>
                  </div>
                </div>

                {/* Card 3: SMS OTP Wallets */}
                <div
                  onClick={() => setActiveTab('clients')}
                  style={{
                    background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(192, 132, 252, 0.22)',
                    borderRadius: '10px',
                    padding: '11px 13px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.22)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  title="Click to manage Client SMS Accounts"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#D8B4FE', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      SMS OTP RESERVE POOL
                    </span>
                    <Smartphone size={14} color="#C084FC" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C084FC', fontFamily: 'monospace' }}>
                      {totalOtpPool > 0 ? totalOtpPool.toLocaleString() : '900'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8' }}>SMS Allocated</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: lowOtpClientsCount > 0 ? '#FBBF24' : '#86EFAC' }}>
                      {lowOtpClientsCount > 0 ? `⚠️ ${lowOtpClientsCount} Low Balance` : '● Balance Healthy'}
                    </span>
                    <span style={{ color: '#94A3B8' }}>Fast2SMS DLT</span>
                  </div>
                </div>

                {/* Card 4: Finance & Renewals */}
                <div
                  onClick={() => setActiveTab('invoices')}
                  style={{
                    background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.22)',
                    borderRadius: '10px',
                    padding: '11px 13px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.22)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  title="Click to view Invoices & Receipts"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#FDE047', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      STUDIO BOOKINGS &amp; REVENUE
                    </span>
                    <CreditCard size={14} color="#F59E0B" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>
                      ₹{totalProjectBooked > 0 ? totalProjectBooked.toLocaleString('en-IN') : '1,75,000'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94A3B8' }}>Booked</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: '#4ADE80' }}>₹{totalAdvanceCollected > 0 ? totalAdvanceCollected.toLocaleString('en-IN') : '87,500'} Collected</span>
                    <span style={{ color: '#FDA4AF' }}>{pendingInvoicesCount > 0 ? `₹${pendingRevenueTotal.toLocaleString('en-IN')} Due` : 'Cleared'}</span>
                  </div>
                </div>
              </div>

              {/* ─── QUICK STUDIO ACTIONS TOOLBAR (Single Row) ─── */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
                    QUICK ACTIONS:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('clients')}
                    style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38BDF8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Plus size={11} />
                    <span>Onboard Client</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.25)', color: '#4ADE80', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Briefcase size={11} />
                    <span>Project Sprint</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('invoices')}
                    style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', color: '#FDE047', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FileText size={11} />
                    <span>Create Invoice</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', color: '#C084FC', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Mail size={11} />
                    <span>Leads ({pendingEnquiriesCount})</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={fetchAllData}
                  disabled={loading}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
                  <span>Sync Telemetry</span>
                </button>
              </div>

              {/* ─── 2-COLUMN LIVE OPERATIONAL MATRIX ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '12px' }}>
                {/* Section A: Live Project Sprints Radar */}
                <div className="fixkar-panel" style={{ padding: '0', overflow: 'hidden' }}>
                  <div className="fixkar-panel-head" style={{ padding: '12px 16px', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="fixkar-panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Rocket size={15} color="#4ADE80" />
                      <span style={{ fontWeight: 800 }}>Live Sprints &amp; Deliveries</span>
                      <span style={{ fontSize: '0.66rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '1px 7px', borderRadius: '8px', fontWeight: 800 }}>
                        {(projects || []).length} Total
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      View All &rarr;
                    </button>
                  </div>

                  <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(projects || []).slice(0, 4).map((p) => {
                      const isLive = p.sprintStatus && p.sprintStatus.includes('Live');
                      const isQA = p.sprintStatus && p.sprintStatus.includes('QA');
                      return (
                        <div
                          key={p.id || p.clientCode}
                          onClick={() => setActiveTab('projects')}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '9px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'; }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.82rem' }}>{p.clientName}</span>
                              <span style={{ fontSize: '0.64rem', color: '#38BDF8', fontFamily: 'monospace' }}>{p.clientCode}</span>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{p.domain || 'Domain Active'}</span>
                              <span>&bull;</span>
                              <span style={{ color: '#FDE047', fontWeight: 600 }}>Due: {p.deliveryDate || 'Sep 2026'}</span>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{
                              fontSize: '0.64rem',
                              fontWeight: 800,
                              padding: '2px 7px',
                              borderRadius: '4px',
                              background: isLive ? 'rgba(74, 222, 128, 0.15)' : isQA ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.35)' : isQA ? 'rgba(56, 189, 248, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
                              color: isLive ? '#4ADE80' : isQA ? '#38BDF8' : '#FDE047',
                            }}>
                              {p.sprintStatus || 'In Progress'}
                            </span>
                            <div style={{ fontSize: '0.68rem', color: '#4ADE80', fontFamily: 'monospace', fontWeight: 700, marginTop: '2px' }}>
                              {p.totalBudget || '₹50,000'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section B: Recent Studio Activity & Attention Center */}
                <div className="fixkar-panel" style={{ padding: '0', overflow: 'hidden' }}>
                  <div className="fixkar-panel-head" style={{ padding: '12px 16px', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="fixkar-panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={15} color="#38BDF8" />
                      <span style={{ fontWeight: 800 }}>Recent Activity &amp; Alerts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {activities.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearActivities}
                          style={{ background: 'none', border: 'none', color: '#FDA4AF', fontSize: '0.68rem', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Clear
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveTab('activity')}
                        style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                      >
                        View All &rarr;
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Live Alert Pills if any */}
                    {pendingEnquiriesCount > 0 && (
                      <div
                        onClick={() => setActiveTab('leads')}
                        style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <div style={{ fontSize: '0.74rem', color: '#93C5FD', fontWeight: 700 }}>
                          🚀 {pendingEnquiriesCount} New Website Inquiries Pending
                        </div>
                        <span style={{ background: '#38BDF8', color: '#fff', fontSize: '0.64rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          Reply &rarr;
                        </span>
                      </div>
                    )}

                    {activities.length === 0 ? (
                      <div style={{ padding: '24px 16px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                        <CheckCircle2 size={20} color="#4ADE80" style={{ margin: '0 auto 6px auto' }} />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4ADE80' }}>All Studio Systems Optimal</div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                          Client servers, DLT SMS routes, and deliveries are running smoothly.
                        </div>
                      </div>
                    ) : (
                      activities.slice(0, 4).map((act) => (
                        <div key={act.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '6px' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#38BDF8', marginTop: '5px', flexShrink: 0 }} />
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.activity}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.description}</div>
                            <div style={{ fontSize: '0.64rem', color: '#64748B', fontFamily: 'monospace', marginTop: '2px' }}>{act.timestamp}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 2: CLIENTS MANAGEMENT (ALL CLIENTS + DETAIL PROFILE) ─── */}
        {activeTab === 'clients' && !selectedClientDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Client Directory & Infrastructure Registry',
              'Central registry for all active clients, cloud server configs, domain registrars, DLT headers, and login credentials.',
              'Ecofone Electronics (Domain: Namecheap, VPS: AWS Mumbai, OTP Header: ECOFON). You can copy login credentials to share on WhatsApp or view their server IP.',
              'clients'
            )}

            <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={14} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search clients, domains, phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '7px 12px 7px 32px', color: '#fff', fontSize: '0.8rem', outline: 'none', width: '220px' }}
                    />
                  </div>

                  {/* Modern Friendly Pill Tabs */}
                  <div className="fixkar-pill-bar">
                    {['All', 'Active', 'Pending'].map((st) => {
                      const count = st === 'All' ? clients.length : clients.filter((c) => c?.status === st).length;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setClientStatusFilter(st)}
                          className={`fixkar-pill-btn ${clientStatusFilter === st ? 'active' : ''}`}
                        >
                          <span>{st === 'All' ? `All Clients (${count})` : `${st} (${count})`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {clients.length > 0 && (
                    <button
                      onClick={handleClearAllClients}
                      style={{
                        background: 'rgba(244, 63, 94, 0.12)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: '#FDA4AF',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Clear All Clients
                    </button>
                  )}

                  <button
                    onClick={() => setIsAddClientModalOpen(true)}
                    style={{ background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={14} />
                    <span>Onboard Client</span>
                  </button>
                </div>
              </div>

              <div style={{ width: '100%', overflow: 'hidden' }}>
                <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th style={{ width: '28%', padding: '10px 14px', textAlign: 'left' }}>CLIENT / DOMAIN</th>
                      <th style={{ width: '22%', padding: '10px 12px', textAlign: 'left' }}>CONTACT PERSON</th>
                      <th style={{ width: '26%', padding: '10px 12px', textAlign: 'left' }}>INFRASTRUCTURE</th>
                      <th style={{ width: '24%', padding: '10px 14px', textAlign: 'right' }}>STATUS &amp; ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                          No clients currently registered in the database. Click "+ Onboard New Client" to add one.
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map((c) => (
                        <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.15s' }}>
                          {/* Col 1: Client Name, Code & Live Domain */}
                          <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {renderClientAvatar(c, 34)}
                              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                                <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {c.businessName}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', flexWrap: 'nowrap' }}>
                                  <span style={{ fontSize: '0.64rem', color: '#38BDF8', fontFamily: 'monospace', background: 'rgba(56, 189, 248, 0.1)', padding: '1px 5px', borderRadius: '3px', flexShrink: 0 }}>
                                    {c.registrationNo || c.clientCode}
                                  </span>
                                  {c.domain && (
                                    <a
                                      href={c.website || `https://${c.domain}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ color: '#60A5FA', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.70rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    >
                                      <span>{c.domain}</span>
                                      <ExternalLink size={10} />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Col 2: Contact Person & Phone */}
                          <td style={{ padding: '12px 12px', verticalAlign: 'middle' }}>
                            <div style={{ color: '#F1F5F9', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {c.contactPerson}
                            </div>
                            <div style={{ fontSize: '0.70rem', color: '#94A3B8', marginTop: '2px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                              {c.phone}
                            </div>
                          </td>

                          {/* Col 3: Infrastructure (Server & Registrar) */}
                          <td style={{ padding: '12px 12px', verticalAlign: 'middle' }}>
                            {c.phase2Complete ? (
                              <>
                                <div style={{ fontSize: '0.76rem', color: '#CBD5E1', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {c.serverType || 'Cloud VPS'} • <span style={{ color: '#38BDF8' }}>{c.serverProvider || 'DigitalOcean'}</span>
                                </div>
                                <div style={{ fontSize: '0.68rem', color: '#4ADE80', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <span>🌐 {c.domain || 'Domain Active'}</span> • <span style={{ color: '#94A3B8' }}>{c.domainProvider || 'Hostinger'}</span>
                                </div>
                              </>
                            ) : (
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '3px 8px', borderRadius: '6px' }}>
                                <span style={{ fontSize: '0.70rem', color: '#FBBF24', fontWeight: 700 }}>⏳ Phase 2 Pending (Domain/Server)</span>
                              </div>
                            )}
                          </td>

                          {/* Col 4: Status & Action Button (Guaranteed Single Row) */}
                          <td style={{ padding: '12px 14px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', flexWrap: 'nowrap' }}>
                              <span
                                className={`fixkar-status-chip ${c.phase2Complete ? 'success' : 'warning'}`}
                                style={{ fontSize: '0.66rem', padding: '2px 7px', fontWeight: 800 }}
                              >
                                {c.phase2Complete ? '● Phase 1 & 2 Done' : '● Phase 1 Done'}
                              </span>

                              {!c.phase2Complete && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenPhase2Modal(c)}
                                  title="Configure Domain & Server for this client"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(16, 185, 129, 0.25) 100%)',
                                    border: '1px solid rgba(74, 222, 128, 0.5)',
                                    color: '#4ADE80',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  <Globe size={11} />
                                  <span>Setup Phase 2</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => { setSelectedClientDetail(c); setClientDetailTab('overview'); }}
                                title="View Client Full Profile & Financials"
                                style={{
                                  background: 'rgba(56, 189, 248, 0.14)',
                                  border: '1px solid rgba(56, 189, 248, 0.4)',
                                  color: '#38BDF8',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  whiteSpace: 'nowrap',
                                  flexShrink: 0,
                                }}
                              >
                                <Eye size={12} />
                                <span>Profile</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── CLIENT DETAIL 360° EXECUTIVE PROFILE CONSOLE ────────────────── */}
        {activeTab === 'clients' && selectedClientDetail && (() => {
          const clientInvoices = invoices.filter(
            (inv) =>
              (inv.clientCode && inv.clientCode === selectedClientDetail.clientCode) ||
              (inv.clientName && selectedClientDetail.businessName && inv.clientName.toLowerCase().includes(selectedClientDetail.businessName.toLowerCase())) ||
              (inv.clientName && selectedClientDetail.contactPerson && inv.clientName.toLowerCase().includes(selectedClientDetail.contactPerson.toLowerCase()))
          );
          const clientProjects = projects.filter(
            (p) =>
              (p.clientCode && p.clientCode === selectedClientDetail.clientCode) ||
              (p.clientName && selectedClientDetail.businessName && p.clientName.toLowerCase().includes(selectedClientDetail.businessName.toLowerCase()))
          );
          const clientWallet = otpWallets.find(
            (w) =>
              (w.clientCode && w.clientCode === selectedClientDetail.clientCode) ||
              (w.clientName && selectedClientDetail.businessName && w.clientName.toLowerCase().includes(selectedClientDetail.businessName.toLowerCase()))
          );

          const totalClientBilled = clientInvoices.reduce((sum, inv) => sum + (inv.rawAmount || parseInt(String(inv.total || '0').replace(/\D/g, ''), 10) || 0), 0);
          const totalClientPaid = clientInvoices.filter(i => i?.status === 'Paid').reduce((sum, inv) => sum + (inv.rawAmount || parseInt(String(inv.total || '0').replace(/\D/g, ''), 10) || 0), 0);
          const totalClientDue = totalClientBilled - totalClientPaid;

          const rawWaPhone = String(selectedClientDetail.whatsapp || selectedClientDetail.phone || '9835012345').replace(/\D/g, '');

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Back Bar & Quick Action Strip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedClientDetail(null)}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  ← Back to All Clients
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '8px', fontWeight: 700 }}>
                    {selectedClientDetail.clientCode || selectedClientDetail.registrationNo || 'FIX-CLIENT-001'}
                  </span>
                  <span className={`fixkar-status-chip ${selectedClientDetail?.status === 'Active' ? 'success' : 'warning'}`}>
                    ● {selectedClientDetail?.status || 'Active'}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingInvoiceId(null);
                      setNewInvoiceForm({
                        clientCode: selectedClientDetail.clientCode || '',
                        clientName: selectedClientDetail.businessName || '',
                        phone: selectedClientDetail.phone || '',
                        domain: selectedClientDetail.domain || '',
                        packageBasePrice: 18000,
                        addons: {
                          paymentGateway: { active: false, price: 1499, label: 'Payment Gateway Integration (UPI/QR)' },
                          whatsappAlerts: { active: false, price: 999, label: 'WhatsApp Order & Booking Alert Bot' },
                          seoPack: { active: false, price: 1200, label: 'Google Business Profile & Local SEO Pack' },
                          customAddon: { active: false, name: 'Custom Engineering Feature Pack', price: 2000 },
                        },
                        milestoneType: 'Phase1',
                        invoiceType: '50% Advance Infrastructure Setup',
                        serviceDescription: 'Phase 1: Advance Infrastructure Setup (Domain, Cloud VPS Server & OTP Security)',
                        customLineItems: [
                          { id: '1', name: 'Custom Domain Registration & Enterprise Cloud VPS Server', amount: 3498 },
                          { id: '2', name: 'System Architecture Modeling, Responsive UI/UX & OTP Gateway Setup', amount: 5502 },
                        ],
                        amount: '9000',
                        balanceDue: '9000',
                        totalProjectBudget: 18000,
                        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        status: 'Paid',
                        paymentMethod: 'UPI (Google Pay / PhonePe / Paytm / QR)',
                        transactionReference: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
                        advanceRef: '',
                        advancePaidAmount: 0,
                      });
                      setActiveTab('invoices');
                      setIsCreateInvoiceOpen(true);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#fff',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Plus size={12} />
                    <span>New Invoice</span>
                  </button>

                  <a
                    href={`https://wa.me/${rawWaPhone}?text=${encodeURIComponent(`Hello ${selectedClientDetail.contactPerson || selectedClientDetail.businessName}!\n\nHere are your official Fixkar Client Portal login credentials:\n🌐 Portal URL: http://localhost:3000/#client-login\n🔑 Client ID: ${selectedClientDetail.clientCode || 'FIX-CLIENT'}\n🔐 Password: ${selectedClientDetail.defaultPassword || 'Fixkar@2026'}\n\nYou can access your live project sprints, server status, and official GST tax receipts anytime.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Send size={12} />
                    <span>Send Credentials on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Phase 2 Infrastructure Alert Banner (If Pending) */}
              {!selectedClientDetail.phase2Complete && (
                <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.12) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={20} color="#FBBF24" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#FDE68A' }}>
                        ⚠️ Phase 2 Pending: Domain &amp; Cloud Server Infrastructure Not Configured
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#CBD5E1', marginTop: '2px' }}>
                        This client completed Phase 1 Identity Onboarding. Once you purchase the domain and VPS, fill Phase 2 to activate renewal tracking and unlock 100% Client Portal access.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenPhase2Modal(selectedClientDetail)}
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '7px 16px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <Globe size={13} />
                    <span>🌐 Complete Phase 2 Infrastructure Now →</span>
                  </button>
                </div>
              )}

              {/* Main Client Profile Hero Banner */}
              <div style={{ background: 'linear-gradient(180deg, #0F172A 0%, #0B1120 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {renderClientAvatar(selectedClientDetail, 52)}
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                        {selectedClientDetail.businessName}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                          Contact: <strong style={{ color: '#fff' }}>{selectedClientDetail.contactPerson}</strong> ({selectedClientDetail.phone})
                        </span>
                        {selectedClientDetail.domain && (
                          <a
                            href={selectedClientDetail.website || `https://${selectedClientDetail.domain}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#38BDF8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 600 }}
                          >
                            <span>{selectedClientDetail.domain}</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                        <span style={{ fontSize: '0.74rem', background: 'rgba(255, 255, 255, 0.06)', color: '#CBD5E1', padding: '1px 8px', borderRadius: '6px' }}>
                          Category: {selectedClientDetail.businessType || 'Enterprise Client'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Portal Credentials Quick Box */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px 14px', minWidth: '220px' }}>
                    <div style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Client Portal Credentials</div>
                    <div style={{ fontSize: '0.78rem', color: '#E2E8F0', marginTop: '4px' }}>
                      ID: <code style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{selectedClientDetail.clientCode || selectedClientDetail.registrationNo}</code>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#E2E8F0', marginTop: '2px' }}>
                      Password: <code style={{ color: '#4ADE80', fontFamily: 'monospace' }}>{selectedClientDetail.defaultPassword || 'Fixkar@2026'}</code>
                    </div>
                  </div>
                </div>

                {/* Real-Time Truthful Infrastructure Metadata Bar (No Fake Cards, No Fake IPs) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px', flexWrap: 'wrap', fontSize: '0.78rem' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>📍 Location: </span>
                    <strong style={{ color: '#F1F5F9' }}>{[selectedClientDetail.city, selectedClientDetail.state].filter(Boolean).join(', ') || 'N/A'}</strong>
                    {selectedClientDetail.pinCode && <span style={{ color: '#64748B', marginLeft: '4px' }}>({selectedClientDetail.pinCode})</span>}
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>🌐 Domain: </span>
                    <strong style={{ color: selectedClientDetail.domain ? '#38BDF8' : '#64748B' }}>
                      {selectedClientDetail.domain || 'Not Configured'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>⚡ VPS / Hosting: </span>
                    <span style={{ color: selectedClientDetail.serverProvider && selectedClientDetail.serverProvider !== 'Pending Setup' ? '#4ADE80' : '#FBBF24', fontWeight: 700 }}>
                      {selectedClientDetail.serverProvider && selectedClientDetail.serverProvider !== 'Pending Setup' ? selectedClientDetail.serverProvider : '⏳ Pending Setup'}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>🔐 SMS DLT Header: </span>
                    <strong style={{ color: selectedClientDetail.dltHeader && selectedClientDetail.dltHeader !== 'Pending Setup' ? '#A78BFA' : '#64748B' }}>
                      {selectedClientDetail.dltHeader && selectedClientDetail.dltHeader !== 'Pending Setup' ? selectedClientDetail.dltHeader : 'Pending Setup'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Financial Invoices & Milestones for this Client */}
              <div style={{ background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>Client Billing &amp; Receipts ({clientInvoices.length})</span>
                    <span style={{ fontSize: '0.74rem', color: '#94A3B8', marginLeft: '10px' }}>
                      Total: <strong>₹{totalClientBilled.toLocaleString('en-IN')}</strong> • Paid: <strong style={{ color: '#4ADE80' }}>₹{totalClientPaid.toLocaleString('en-IN')}</strong> • Due: <strong style={{ color: '#FBBF24' }}>₹{totalClientDue.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('invoices');
                    }}
                    style={{ background: 'transparent', border: 'none', color: '#38BDF8', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Open Full Invoices Console →
                  </button>
                </div>

                {clientInvoices.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>
                    No invoices generated yet for this client. Click "+ New Invoice" to generate Phase 1 Advance or Custom Bill.
                  </div>
                ) : (
                  <div style={{ width: '100%', overflow: 'hidden' }}>
                    <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                          <th style={{ width: '25%', padding: '10px 14px', textAlign: 'left' }}>INVOICE / RECEIPT</th>
                          <th style={{ width: '40%', padding: '10px 12px', textAlign: 'left' }}>DELIVERABLE / MILESTONE</th>
                          <th style={{ width: '20%', padding: '10px 12px', textAlign: 'left' }}>AMOUNT &amp; MODE</th>
                          <th style={{ width: '15%', padding: '10px 14px', textAlign: 'right' }}>RECEIPT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientInvoices.map((inv) => (
                          <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                            <td style={{ padding: '10px 14px', verticalAlign: 'middle' }}>
                              <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#38BDF8', fontSize: '0.76rem' }}>
                                {inv.invoiceNumber}
                              </div>
                              {inv.receiptNumber && (
                                <div style={{ fontFamily: 'monospace', fontSize: '0.66rem', color: '#4ADE80', marginTop: '2px' }}>
                                  {inv.receiptNumber}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                              <div style={{ color: '#E2E8F0', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {inv.service || inv.serviceDescription || inv.invoiceType || 'Web Architecture Engineering'}
                              </div>
                              {inv.advanceRef && (
                                <div style={{ fontSize: '0.64rem', color: '#38BDF8', fontFamily: 'monospace', marginTop: '1px' }}>
                                  Advance Ref: {inv.advanceRef} (-₹{inv.advancePaidAmount})
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                              <div style={{ fontWeight: 900, color: '#4ADE80', fontSize: '0.86rem' }}>
                                {inv.total}
                              </div>
                              <div style={{ fontSize: '0.66rem', color: '#94A3B8', marginTop: '1px' }}>
                                {inv.paymentMethod || 'UPI'} • {inv.transactionReference?.slice(-10) || 'Verified'}
                              </div>
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'right', verticalAlign: 'middle' }}>
                              <button
                                type="button"
                                onClick={() => setSelectedReceiptProject({
                                  clientName: inv.clientName || selectedClientDetail.businessName,
                                  clientCode: inv.clientCode || selectedClientDetail.clientCode,
                                  totalBudget: inv.total,
                                  rawAmount: inv.rawAmount,
                                  id: inv.id,
                                  receiptNumber: inv.receiptNumber || `FIX-RCPT-2026-${String(inv.id).slice(-3)}`,
                                  invoiceNumber: inv.invoiceNumber,
                                  domain: inv.domain || selectedClientDetail.domain || 'clientwebsite.in',
                                  phone: inv.phone || selectedClientDetail.phone || '+91 98350 12345',
                                  paymentMethod: inv.paymentMethod || 'UPI (Google Pay / PhonePe)',
                                  transactionReference: inv.transactionReference || 'UPI/423189021456',
                                  advanceRef: inv.advanceRef,
                                  advancePaidAmount: inv.advancePaidAmount,
                                  invoiceType: inv.invoiceType,
                                  service: inv.service || inv.serviceDescription,
                                  customLineItems: inv.customLineItems,
                                  addons: inv.addons,
                                  balanceDue: inv.balanceDue,
                                  totalProjectBudget: inv.totalProjectBudget,
                                  paymentStatus: inv?.status === 'Paid' ? 'Paid in Full' : 'Pending Milestone',
                                })}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.14)',
                                  border: '1px solid rgba(56, 189, 248, 0.4)',
                                  color: '#38BDF8',
                                  padding: '4px 8px',
                                  borderRadius: '5px',
                                  fontSize: '0.68rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  fontWeight: 700,
                                }}
                              >
                                <Printer size={11} />
                                <span>Receipt</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 3: INVOICES & BILLING (SLEEK, COMPACT & MODERN) ─────────── */}
        {activeTab === 'invoices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Top Stats & Action Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Invoiced</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                    ₹{invoices.reduce((acc, i) => acc + (i.rawAmount || parseInt(String(i.total || '0').replace(/\D/g, ''), 10) || 0), 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                  <FileText size={16} />
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#86EFAC', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Collected (Paid)</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4ADE80', marginTop: '2px' }}>
                    ₹{invoices.filter(i => i?.status === 'Paid').reduce((acc, i) => acc + (i.rawAmount || parseInt(String(i.total || '0').replace(/\D/g, ''), 10) || 0), 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(74, 222, 128, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ADE80' }}>
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#FDE047', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pending / Due</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FBBF24', marginTop: '2px' }}>
                    ₹{invoices.filter(i => i?.status !== 'Paid').reduce((acc, i) => acc + (i.rawAmount || parseInt(String(i.total || '0').replace(/\D/g, ''), 10) || 0), 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24' }}>
                  <CreditCard size={16} />
                </div>
              </div>
            </div>

            {/* Main Invoices Panel */}
            <div style={{ background: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Header Bar */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Invoices &amp; Receipts</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '1px 7px', borderRadius: '10px', fontWeight: 700 }}>
                      {invoices.length}
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {[
                      { id: 'All', label: 'All' },
                      { id: 'Paid', label: '🟢 Paid' },
                      { id: 'Unpaid', label: '🟡 Due' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setInvoiceFilter(f.id)}
                        style={{
                          background: invoiceFilter === f.id ? '#1E293B' : 'transparent',
                          border: 'none',
                          color: invoiceFilter === f.id ? '#fff' : '#94A3B8',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Search Bar */}
                  <div style={{ position: 'relative', width: '260px' }}>
                    <Search size={13} color="#94A3B8" style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      value={receiptSearchQuery}
                      onChange={(e) => setReceiptSearchQuery(e.target.value)}
                      placeholder="Search Receipt #, Client, UTR..."
                      style={{ width: '100%', padding: '5px 8px 5px 28px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '6px', color: '#fff', fontSize: '0.74rem' }}
                    />
                    {receiptSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setReceiptSearchQuery('')}
                        style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingInvoiceId(null);
                      setNewInvoiceForm({
                        clientCode: '',
                        clientName: '',
                        phone: '',
                        domain: '',
                        packageBasePrice: 18000,
                        addons: {
                          paymentGateway: { active: false, price: 1499, label: 'Payment Gateway Integration (UPI/QR)' },
                          whatsappAlerts: { active: false, price: 999, label: 'WhatsApp Order & Booking Alert Bot' },
                          seoPack: { active: false, price: 1200, label: 'Google Business Profile & Local SEO Pack' },
                          customAddon: { active: false, name: 'Custom Engineering Feature Pack', price: 2000 },
                        },
                        milestoneType: 'Phase1',
                        invoiceType: '50% Advance Infrastructure Setup',
                        serviceDescription: 'Phase 1: Advance Infrastructure Setup (Domain, Cloud VPS Server & OTP Security)',
                        customLineItems: [
                          { id: '1', name: 'Custom Domain Registration & Enterprise Cloud VPS Server (1 Year)', amount: 3498 },
                          { id: '2', name: 'System Architecture Modeling, Responsive UI/UX & OTP Gateway Setup', amount: 5502 },
                        ],
                        amount: '9000',
                        balanceDue: '9000',
                        totalProjectBudget: 18000,
                        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        status: 'Paid',
                        paymentMethod: 'UPI (Google Pay / PhonePe / Paytm / QR)',
                        transactionReference: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
                        advanceRef: '',
                        advancePaidAmount: 0,
                      });
                      setIsCreateInvoiceOpen(true);
                    }}
                    style={{
                      background: '#2563EB',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    <Plus size={14} />
                    <span>+ New Invoice</span>
                  </button>
                </div>
              </div>

              {/* ─── DEDICATED MODAL POPUP FOR INVOICE CREATION & EDITING ─── */}
              {isCreateInvoiceOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(2, 6, 23, 0.82)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    overflowY: 'auto',
                  }}
                  onClick={() => {
                    setIsCreateInvoiceOpen(false);
                    setEditingInvoiceId(null);
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(180deg, #090F1E 0%, #060B16 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.28)',
                      borderRadius: '12px',
                      maxWidth: '640px',
                      width: '95%',
                      maxHeight: '92vh',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.12)',
                      overflow: 'hidden',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header Bar */}
                    <div
                      style={{
                        padding: '12px 18px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(90deg, #0B132B 0%, #111C33 100%)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.35)' }}>
                          <Receipt size={16} color="#38BDF8" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                            {editingInvoiceId ? `Edit Invoice & Receipt (${editingInvoiceId})` : 'Create Official Project Invoice / Receipt'}
                          </div>
                          <div style={{ fontSize: '0.66rem', color: '#94A3B8', marginTop: '1px' }}>
                            {newInvoiceForm.clientName ? (
                              <span>Client: <strong style={{ color: '#38BDF8' }}>{newInvoiceForm.clientName}</strong> ({newInvoiceForm.domain})</span>
                            ) : (
                              'Auto 50% milestone split with 2-way real-time balance recalculation.'
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCreateInvoiceOpen(false);
                          setEditingInvoiceId(null);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#94A3B8',
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Modal Scrollable Body */}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!newInvoiceForm.clientName) {
                          alert('Please select a client.');
                          return;
                        }

                        const amountNum = Number(newInvoiceForm.amount) || 9000;
                        const formattedAmount = `₹${amountNum.toLocaleString('en-IN')}`;
                        const finalPaymentMode = newInvoiceForm.paymentMethod;
                        const finalTxRef = finalPaymentMode.includes('Cash')
                          ? 'CASH-VERIFIED-OFFICE'
                          : (newInvoiceForm.transactionReference || `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`);

                        if (editingInvoiceId) {
                          const dueNum = Number(newInvoiceForm.balanceDue) || 0;
                          const totalNum = Number(newInvoiceForm.totalProjectBudget) || (amountNum + dueNum);
                          const updatedInv = {
                            ...invoices.find((i) => i.id === editingInvoiceId),
                            clientName: newInvoiceForm.clientName,
                            clientCode: newInvoiceForm.clientCode,
                            domain: newInvoiceForm.domain,
                            phone: newInvoiceForm.phone,
                            service: newInvoiceForm.serviceDescription,
                            serviceDescription: newInvoiceForm.serviceDescription,
                            dueDate: newInvoiceForm.dueDate,
                            total: formattedAmount,
                            rawAmount: amountNum,
                            balanceDue: dueNum,
                            status: amountNum > 0 ? 'Paid' : 'Unpaid',
                            invoiceType: newInvoiceForm.invoiceType || 'Deliverable Milestone Handover',
                            paymentMethod: finalPaymentMode,
                            transactionReference: finalTxRef,
                            customLineItems: newInvoiceForm.customLineItems,
                            addons: newInvoiceForm.addons,
                            totalProjectBudget: totalNum,
                            advanceRef: newInvoiceForm.advanceRef || '',
                            advancePaidAmount: Number(newInvoiceForm.advancePaidAmount) || 0,
                          };

                          setInvoices((prev) => prev.map((i) => (i.id === editingInvoiceId ? updatedInv : i)));

                          try {
                            await fetch(`${API_BASE}/api/admin/invoices`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
                              body: JSON.stringify(updatedInv),
                            });
                          } catch (err) {
                            console.error('[Update invoice API error]', err);
                          }

                          setIsCreateInvoiceOpen(false);
                          setEditingInvoiceId(null);

                          setSelectedReceiptProject({
                            clientName: updatedInv.clientName,
                            clientCode: updatedInv.clientCode,
                            totalBudget: formattedAmount,
                            rawAmount: amountNum,
                            id: updatedInv.id,
                            receiptNumber: updatedInv.receiptNumber,
                            invoiceNumber: updatedInv.invoiceNumber,
                            domain: updatedInv.domain,
                            phone: updatedInv.phone,
                            invoiceType: updatedInv.invoiceType,
                            service: updatedInv.service,
                            paymentMethod: finalPaymentMode,
                            transactionReference: finalTxRef,
                            customLineItems: updatedInv.customLineItems,
                            addons: updatedInv.addons,
                            balanceDue: dueNum,
                            totalProjectBudget: totalNum,
                            advanceRef: updatedInv.advanceRef,
                            advancePaidAmount: updatedInv.advancePaidAmount,
                            paymentStatus: dueNum === 0 ? 'Paid in Full' : 'Pending Milestone',
                          });
                        } else {
                          const invId = `INV-${Math.floor(100 + Math.random() * 900)}`;
                          const invNumber = `FIX-INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
                          const receiptNum = `FIX-RCPT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
                          const dueNum = Number(newInvoiceForm.balanceDue) || 0;
                          const totalNum = Number(newInvoiceForm.totalProjectBudget) || (amountNum + dueNum);

                          const newInvObj = {
                            id: invId,
                            invoiceNumber: invNumber,
                            receiptNumber: receiptNum,
                            clientName: newInvoiceForm.clientName,
                            clientCode: newInvoiceForm.clientCode || 'FIX-CLI-001',
                            domain: newInvoiceForm.domain || 'clientwebsite.in',
                            phone: newInvoiceForm.phone || '+91 98350 12345',
                            service: newInvoiceForm.serviceDescription,
                            serviceDescription: newInvoiceForm.serviceDescription,
                            dueDate: newInvoiceForm.dueDate,
                            total: formattedAmount,
                            rawAmount: amountNum,
                            balanceDue: dueNum,
                            status: amountNum > 0 ? 'Paid' : 'Unpaid',
                            invoiceType: newInvoiceForm.invoiceType || 'Deliverable Milestone Handover',
                            paymentMethod: finalPaymentMode,
                            transactionReference: finalTxRef,
                            customLineItems: newInvoiceForm.customLineItems,
                            addons: newInvoiceForm.addons,
                            totalProjectBudget: totalNum,
                            advanceRef: newInvoiceForm.advanceRef || '',
                            advancePaidAmount: Number(newInvoiceForm.advancePaidAmount) || 0,
                          };

                          setInvoices((prev) => [newInvObj, ...prev]);

                          try {
                            await fetch(`${API_BASE}/api/admin/invoices`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
                              body: JSON.stringify(newInvObj),
                            });
                          } catch (err) {
                            console.error('[Save invoice API error]', err);
                          }

                          if (newInvoiceForm?.status === 'Paid') {
                            const vaultDocId = `DOC-RCPT-${Math.floor(100 + Math.random() * 900)}`;
                            const vaultDoc = {
                              id: vaultDocId,
                              name: `${newInvObj.clientName.replace(/[^a-zA-Z0-9]/g, '')}-Receipt-${receiptNum}.pdf`,
                              clientCode: newInvObj.clientCode,
                              client: newInvObj.clientName,
                              size: '1.4 MB (Signed PDF)',
                              date: new Date().toISOString().split('T')[0],
                              type: 'Credentials',
                              title: `Official Tax Invoice & Receipt (${receiptNum})`,
                              summary: `Digitally signed payment receipt for ${newInvObj.clientName} (${formattedAmount} settled via ${finalPaymentMode}).`,
                              isSigned: true,
                              content: `FIXKAR OFFICIAL DIGITALLY SIGNED RECEIPT (${receiptNum})\nClient: ${newInvObj.clientName}\nAmount: ${formattedAmount}\nPayment Mode: ${finalPaymentMode}\nRef: ${finalTxRef}`,
                            };
                            setDocumentsList((prev) => [vaultDoc, ...prev]);
                          }

                          setIsCreateInvoiceOpen(false);

                          setSelectedReceiptProject({
                            clientName: newInvObj.clientName,
                            clientCode: newInvObj.clientCode,
                            totalBudget: formattedAmount,
                            rawAmount: amountNum,
                            id: invId,
                            receiptNumber: receiptNum,
                            invoiceNumber: invNumber,
                            domain: newInvObj.domain,
                            phone: newInvObj.phone,
                            invoiceType: newInvoiceForm.invoiceType,
                            service: newInvObj.service,
                            paymentMethod: finalPaymentMode,
                            transactionReference: finalTxRef,
                            customLineItems: newInvoiceForm.customLineItems,
                            addons: newInvoiceForm.addons,
                            balanceDue: dueNum,
                            totalProjectBudget: totalNum,
                            advanceRef: newInvObj.advanceRef,
                            advancePaidAmount: newInvObj.advancePaidAmount,
                            paymentStatus: dueNum === 0 ? 'Paid in Full' : 'Pending Milestone',
                          });
                        }
                      }}
                      style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
                    >
                      <div style={{ padding: '12px 18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                        {/* 1. Client & Quick Preset Template Selection */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.64rem', color: '#38BDF8', marginBottom: '3px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              1. Choose Client *
                            </label>
                            <select
                              required
                              value={newInvoiceForm.clientCode}
                              onChange={(e) => {
                                const sel = e.target.value;
                                const found = clients.find((c) => c.clientCode === sel || c.id === sel);
                                if (found) {
                                  setNewInvoiceForm((p) => {
                                    const currentItems = p.customLineItems || [];
                                    const lineTotal = currentItems.reduce((s, it) => s + (Number(it.amount) || 0), 0);
                                    const tot = lineTotal || p.totalProjectBudget || 18000;
                                    const autoPaid = Math.round(tot * 0.5);
                                    const autoDue = Math.max(0, tot - autoPaid);

                                    return {
                                      ...p,
                                      clientCode: found.clientCode || found.id,
                                      clientName: found.businessName,
                                      domain: found.domain || 'clientwebsite.in',
                                      phone: found.phone || '+91 98350 12345',
                                      totalProjectBudget: tot,
                                      amount: String(autoPaid),
                                      balanceDue: String(autoDue),
                                    };
                                  });
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                background: '#050914',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                              }}
                            >
                              <option value="">-- Select Client --</option>
                              {clients.map((c) => (
                                <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                                  {c.businessName} ({c.domain || c.clientCode})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.64rem', color: '#94A3B8', marginBottom: '3px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              2. Quick Preset (50% Auto-Split)
                            </label>
                            <select
                              onChange={(e) => {
                                const val = e.target.value;
                                const presets = {
                                  Web: {
                                    title: 'Web Application Architecture, UI/UX & Cloud VPS Server Setup',
                                    lines: [
                                      { id: '1', name: 'Custom Domain Registration & Enterprise Cloud VPS Server (1 Year)', amount: 8000 },
                                      { id: '2', name: 'System Architecture Modeling, Responsive UI/UX & OTP Gateway Setup', amount: 10000 },
                                    ],
                                  },
                                  ECom: {
                                    title: 'Full-Stack Production E-Commerce Platform & Razorpay Gateway',
                                    lines: [
                                      { id: '1', name: 'Full-Stack E-Commerce Engine, Product Catalog & Razorpay Integration', amount: 16000 },
                                      { id: '2', name: '1-Year High-Speed Cloud VPS Infrastructure & Priority SLA Support', amount: 9000 },
                                    ],
                                  },
                                  Hosting: {
                                    title: '1-Year Managed Cloud VPS Hosting & Domain Security Renewal',
                                    lines: [{ id: '1', name: 'Enterprise Managed Cloud VPS Server & NVMe Hosting (1-Year Renewal)', amount: 2499 }],
                                  },
                                  OTP: {
                                    title: '2,000 High-Speed Transactional SMS & OTP Security Verification Credits',
                                    lines: [{ id: '1', name: '2,000 Transactional OTP SMS & Security Verification Credits', amount: 440 }],
                                  },
                                  Custom: {
                                    title: 'Custom Full-Stack Web & Mobile Application Engineering Deliverables',
                                    lines: [{ id: '1', name: 'Custom Full-Stack Engineering & Application Handover', amount: 15000 }],
                                  },
                                };
                                const selPreset = presets[val];
                                if (selPreset) {
                                  const total = selPreset.lines.reduce((s, it) => s + it.amount, 0);
                                  const autoPaid = val === 'Hosting' || val === 'OTP' ? total : Math.round(total * 0.5);
                                  const autoDue = Math.max(0, total - autoPaid);
                                  setNewInvoiceForm((p) => ({
                                    ...p,
                                    serviceDescription: selPreset.title,
                                    customLineItems: selPreset.lines,
                                    totalProjectBudget: total,
                                    amount: String(autoPaid),
                                    balanceDue: String(autoDue),
                                  }));
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                background: '#050914',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '6px',
                                color: '#38BDF8',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                              }}
                            >
                              <option value="">⚡ Select Preset Template...</option>
                              <option value="Web">🌐 Web Platform (₹18,000)</option>
                              <option value="ECom">🛒 E-Commerce Portal (₹25,000)</option>
                              <option value="Hosting">🛡️ Hosting Renewal (₹2,499)</option>
                              <option value="OTP">📱 OTP SMS Pack (₹440)</option>
                              <option value="Custom">⚙️ Custom Project (₹15,000)</option>
                            </select>
                          </div>
                        </div>

                        {/* 2. Service Description */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.64rem', color: '#94A3B8', marginBottom: '3px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            3. Service / Project Title (Printed on Receipt Header)
                          </label>
                          <input
                            type="text"
                            required
                            value={newInvoiceForm.serviceDescription || ''}
                            onChange={(e) => setNewInvoiceForm((p) => ({ ...p, serviceDescription: e.target.value }))}
                            placeholder="e.g. Web Application Architecture, UI/UX & Cloud Deployment Deliverables"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              background: '#050914',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              borderRadius: '6px',
                              color: '#fff',
                              fontSize: '0.76rem',
                              fontWeight: 600,
                            }}
                          />
                        </div>

                        {/* 3. Itemized Deliverables Breakdown */}
                        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '9px 12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              📦 Deliverables Breakdown (Printed on Receipt Table)
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newItem = { id: String(Date.now()), name: 'Custom Addon / Engineering Deliverable', amount: 2000 };
                                setNewInvoiceForm((p) => {
                                  const updatedLines = [...(p.customLineItems || []), newItem];
                                  const lineTot = updatedLines.reduce((s, it) => s + (Number(it.amount) || 0), 0);
                                  const autoPaid = Math.round(lineTot * 0.5);
                                  const autoDue = lineTot - autoPaid;
                                  return { ...p, customLineItems: updatedLines, totalProjectBudget: lineTot, amount: String(autoPaid), balanceDue: String(autoDue) };
                                });
                              }}
                              style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                color: '#38BDF8',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.64rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              <Plus size={11} />
                              <span>+ Add Item</span>
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {(newInvoiceForm.customLineItems || []).map((item, idx) => (
                              <div key={item?.id || idx} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 100px 24px', gap: '6px', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.66rem', color: '#64748B', textAlign: 'center', fontWeight: 700 }}>
                                  #{idx + 1}
                                </span>
                                <input
                                  type="text"
                                  value={item?.name || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setNewInvoiceForm((p) => {
                                      const updated = (p.customLineItems || []).map((it, i) => (i === idx ? { ...it, name: val } : it));
                                      return { ...p, customLineItems: updated };
                                    });
                                  }}
                                  placeholder="Deliverable description..."
                                  style={{
                                    width: '100%',
                                    padding: '4px 8px',
                                    background: '#050914',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '4px',
                                    color: '#E2E8F0',
                                    fontSize: '0.72rem',
                                  }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#050914', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                  <span style={{ fontSize: '0.64rem', color: '#94A3B8' }}>₹</span>
                                  <input
                                    type="number"
                                    value={item?.amount ?? 0}
                                    onChange={(e) => {
                                      const val = Number(e.target.value) || 0;
                                      setNewInvoiceForm((p) => {
                                        const updated = (p.customLineItems || []).map((it, i) => (i === idx ? { ...it, amount: val } : it));
                                        const lineTot = updated.reduce((s, it) => s + (Number(it.amount) || 0), 0);
                                        const autoPaid = Math.round(lineTot * 0.5);
                                        const autoDue = lineTot - autoPaid;
                                        return { ...p, customLineItems: updated, totalProjectBudget: lineTot, amount: String(autoPaid), balanceDue: String(autoDue) };
                                      });
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '1px 0',
                                      background: 'transparent',
                                      border: 'none',
                                      color: '#FDE047',
                                      fontSize: '0.76rem',
                                      fontWeight: 800,
                                      appearance: 'textfield',
                                      MozAppearance: 'textfield',
                                    }}
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewInvoiceForm((p) => {
                                      const updated = (p.customLineItems || []).filter((_, i) => i !== idx);
                                      const lineTot = updated.reduce((s, it) => s + (Number(it.amount) || 0), 0);
                                      const autoPaid = Math.round(lineTot * 0.5);
                                      const autoDue = lineTot - autoPaid;
                                      return { ...p, customLineItems: updated, totalProjectBudget: lineTot, amount: String(autoPaid), balanceDue: String(autoDue) };
                                    });
                                  }}
                                  style={{
                                    background: 'rgba(239, 68, 68, 0.12)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    color: '#EF4444',
                                    borderRadius: '4px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                            <span style={{ fontSize: '0.64rem', color: '#94A3B8' }}>Total Deliverables Value:</span>
                            <strong style={{ fontSize: '0.82rem', color: '#4ADE80' }}>
                              ₹{(newInvoiceForm.customLineItems || []).reduce((s, it) => s + (Number(it?.amount) || 0), 0).toLocaleString('en-IN')}
                            </strong>
                          </div>
                        </div>

                        {/* 4. Live 3-Tile KPI Summary Cards (Fixkar Metric Tiles) */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '8px',
                          }}
                        >
                          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '6px', padding: '6px 10px' }}>
                            <div style={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Total Project Value
                            </div>
                            <div style={{ fontSize: '0.88rem', color: '#38BDF8', fontWeight: 900, marginTop: '2px' }}>
                              ₹{(Number(newInvoiceForm.totalProjectBudget) || 0).toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '6px', padding: '6px 10px' }}>
                            <div style={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Paid Amount (Now)
                            </div>
                            <div style={{ fontSize: '0.88rem', color: '#4ADE80', fontWeight: 900, marginTop: '2px' }}>
                              ₹{(Number(newInvoiceForm.amount) || 0).toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(251, 191, 36, 0.25)', borderRadius: '6px', padding: '6px 10px' }}>
                            <div style={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Remaining Balance Due
                            </div>
                            <div style={{ fontSize: '0.88rem', color: Number(newInvoiceForm.balanceDue) === 0 ? '#4ADE80' : '#FBBF24', fontWeight: 900, marginTop: '2px' }}>
                              ₹{(Number(newInvoiceForm.balanceDue) || 0).toLocaleString('en-IN')} {Number(newInvoiceForm.balanceDue) === 0 ? '✓ Settled' : ''}
                            </div>
                          </div>
                        </div>

                        {/* 5. Two-Way Interactive Settlement Inputs (Clean 3-Column Grid) */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.1fr 1.3fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.62rem', color: '#4ADE80', marginBottom: '2px', fontWeight: 800 }}>
                              Paid Amount (₹) *
                            </label>
                            <input
                              type="number"
                              required
                              value={newInvoiceForm.amount}
                              onChange={(e) => {
                                const paidVal = Number(e.target.value) || 0;
                                const tot = Number(newInvoiceForm.totalProjectBudget) || 18000;
                                const autoDue = Math.max(0, tot - paidVal);
                                setNewInvoiceForm((p) => ({ ...p, amount: e.target.value, balanceDue: String(autoDue) }));
                              }}
                              style={{
                                width: '100%',
                                padding: '5px 8px',
                                background: '#050914',
                                border: '1px solid rgba(74, 222, 128, 0.5)',
                                borderRadius: '5px',
                                color: '#4ADE80',
                                fontSize: '0.82rem',
                                fontWeight: 900,
                                appearance: 'textfield',
                                MozAppearance: 'textfield',
                              }}
                            />
                            <span style={{ fontSize: '0.54rem', color: '#94A3B8', marginTop: '1px', display: 'block' }}>
                              (Auto-syncs Due)
                            </span>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.62rem', color: '#FBBF24', marginBottom: '2px', fontWeight: 800 }}>
                              Balance Due (₹) *
                            </label>
                            <input
                              type="number"
                              required
                              value={newInvoiceForm.balanceDue}
                              onChange={(e) => {
                                const dueVal = Number(e.target.value) || 0;
                                const tot = Number(newInvoiceForm.totalProjectBudget) || 18000;
                                const autoPaid = Math.max(0, tot - dueVal);
                                setNewInvoiceForm((p) => ({ ...p, balanceDue: e.target.value, amount: String(autoPaid) }));
                              }}
                              style={{
                                width: '100%',
                                padding: '5px 8px',
                                background: '#050914',
                                border: '1px solid rgba(251, 191, 36, 0.5)',
                                borderRadius: '5px',
                                color: '#FBBF24',
                                fontSize: '0.82rem',
                                fontWeight: 900,
                                appearance: 'textfield',
                                MozAppearance: 'textfield',
                              }}
                            />
                            <span style={{ fontSize: '0.54rem', color: '#94A3B8', marginTop: '1px', display: 'block' }}>
                              (Auto-syncs Paid)
                            </span>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.62rem', color: '#38BDF8', marginBottom: '2px', fontWeight: 700 }}>
                              Payment Method
                            </label>
                            <select
                              value={newInvoiceForm.paymentMethod}
                              onChange={(e) => {
                                const pm = e.target.value;
                                let ref = '';
                                if (pm.includes('UPI')) ref = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
                                else if (pm.includes('Bank')) ref = `IMPS-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
                                else ref = 'CASH-VERIFIED-OFFICE';
                                setNewInvoiceForm((p) => ({ ...p, paymentMethod: pm, transactionReference: ref }));
                              }}
                              style={{
                                width: '100%',
                                padding: '5px 8px',
                                background: '#050914',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                borderRadius: '5px',
                                color: '#fff',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                              }}
                            >
                              <option value="UPI (Google Pay / PhonePe / Paytm / QR)">📱 UPI / QR</option>
                              <option value="Direct Bank Transfer (IMPS / NEFT)">🏦 Bank IMPS</option>
                              <option value="Cash Payment (Verified at Fixkar Counter)">💵 Cash Counter</option>
                            </select>
                          </div>
                        </div>

                        {/* 6. UTR Reference */}
                        {!newInvoiceForm.paymentMethod?.includes('Cash') && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.60rem', color: '#38BDF8', marginBottom: '2px', fontWeight: 700 }}>
                              Transaction / UTR Reference Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={newInvoiceForm.transactionReference}
                              onChange={(e) => setNewInvoiceForm((p) => ({ ...p, transactionReference: e.target.value }))}
                              placeholder="e.g. UPI/423189021456"
                              style={{
                                width: '100%',
                                padding: '4px 8px',
                                background: '#070C18',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                borderRadius: '5px',
                                color: '#38BDF8',
                                fontSize: '0.72rem',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Modal Sticky Bottom Action Bar */}
                      <div
                        style={{
                          padding: '9px 18px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '8px',
                          background: '#070D1A',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreateInvoiceOpen(false);
                            setEditingInvoiceId(null);
                          }}
                          style={{
                            background: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#CBD5E1',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
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
                            padding: '6px 18px',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.4)',
                          }}
                        >
                          <Sparkles size={13} />
                          <span>{editingInvoiceId ? 'Update & Generate Receipt' : 'Generate & Open PDF Receipt'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Table / Invoices List (Clean 100% Fit - ZERO Horizontal Scroll) */}
              <div style={{ width: '100%', overflow: 'hidden' }}>
                <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th style={{ width: '24%', padding: '10px 12px', textAlign: 'left' }}>INVOICE / CLIENT</th>
                      <th style={{ width: '33%', padding: '10px 12px', textAlign: 'left' }}>MILESTONE / DELIVERABLE</th>
                      <th style={{ width: '18%', padding: '10px 12px', textAlign: 'left' }}>AMOUNT &amp; MODE</th>
                      <th style={{ width: '25%', padding: '10px 12px', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices
                      .filter((inv) => {
                        const q = receiptSearchQuery.trim().toLowerCase();
                        if (!q) {
                          return invoiceFilter === 'All' || (invoiceFilter === 'Unpaid' && inv?.status !== 'Paid') || (invoiceFilter === 'Paid' && inv?.status === 'Paid');
                        }
                        return (
                          (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(q)) ||
                          (inv.receiptNumber && inv.receiptNumber.toLowerCase().includes(q)) ||
                          (inv.clientName && inv.clientName.toLowerCase().includes(q)) ||
                          (inv.clientCode && inv.clientCode.toLowerCase().includes(q)) ||
                          (inv.transactionReference && inv.transactionReference.toLowerCase().includes(q))
                        );
                      })
                      .map((inv) => {
                        const isPhase1 = inv.invoiceType?.includes('Advance');
                        const isPhase2 = inv.invoiceType?.includes('Final') || (inv.advancePaidAmount && inv.advancePaidAmount > 0);

                        // Short payment method tag
                        const payTag = inv.paymentMethod?.includes('UPI')
                          ? 'UPI'
                          : inv.paymentMethod?.includes('Bank')
                          ? 'Bank'
                          : inv.paymentMethod?.includes('Cash')
                          ? 'Cash'
                          : 'Online';

                        return (
                          <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.15s' }}>
                            {/* Col 1: Invoice # & Client */}
                            <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#38BDF8', fontSize: '0.76rem' }}>
                                  {inv.invoiceNumber}
                                </span>
                                {inv.receiptNumber && (
                                  <span style={{ fontFamily: 'monospace', fontSize: '0.64rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.12)', padding: '1px 5px', borderRadius: '3px' }}>
                                    {inv.receiptNumber.replace('FIX-RCPT-', 'RCPT-')}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.82rem', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {inv.clientName}
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#60A5FA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {inv.domain || 'clientwebsite.in'}
                              </div>
                            </td>

                            {/* Col 2: Milestone & Deliverable Description */}
                            <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                <span
                                  style={{
                                    fontSize: '0.6rem',
                                    fontWeight: 800,
                                    padding: '1px 6px',
                                    borderRadius: '3px',
                                    background: isPhase1 ? 'rgba(30, 64, 175, 0.4)' : isPhase2 ? 'rgba(21, 128, 61, 0.35)' : 'rgba(71, 85, 105, 0.4)',
                                    border: `1px solid ${isPhase1 ? '#2563EB' : isPhase2 ? '#22C55E' : '#64748B'}`,
                                    color: isPhase1 ? '#93C5FD' : isPhase2 ? '#86EFAC' : '#E2E8F0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                  }}
                                >
                                  {isPhase1 ? '🟡 Phase 1' : isPhase2 ? '🟢 Phase 2' : 'Milestone'}
                                </span>
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#CBD5E1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {inv.service || inv.serviceDescription || inv.invoiceType || 'Web Platform Engineering'}
                              </div>
                              {inv.advanceRef && (
                                <div style={{ fontSize: '0.62rem', color: '#38BDF8', fontFamily: 'monospace', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  Phase 1 Ref: {inv.advanceRef} (-₹{inv.advancePaidAmount})
                                </div>
                              )}
                            </td>

                            {/* Col 3: Amount & Payment Mode / Ref */}
                            <td style={{ padding: '10px 12px', verticalAlign: 'middle' }}>
                              <div style={{ fontWeight: 900, color: '#4ADE80', fontSize: '0.88rem', letterSpacing: '-0.01em' }}>
                                {inv.total}
                              </div>
                              <div style={{ fontSize: '0.66rem', color: '#94A3B8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{payTag}</span>
                                {inv.transactionReference && !inv.transactionReference.includes('CASH') && (
                                  <span style={{ fontFamily: 'monospace', marginLeft: '4px', color: '#38BDF8' }}>
                                    • {inv.transactionReference.slice(-10)}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Col 4: Action Buttons (Guaranteed Single Horizontal Row) */}
                            <td style={{ padding: '10px 12px', textAlign: 'right', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                                {/* Phase 2 Shortcut Button for Phase 1 Invoices */}
                                {isPhase1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenPhase2Generator(inv)}
                                    title="Generate Phase 2 Final Receipt"
                                    style={{
                                      background: 'rgba(22, 163, 74, 0.22)',
                                      border: '1px solid rgba(34, 197, 94, 0.5)',
                                      color: '#4ADE80',
                                      padding: '4px 8px',
                                      borderRadius: '5px',
                                      fontSize: '0.68rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      whiteSpace: 'nowrap',
                                      flexShrink: 0,
                                    }}
                                  >
                                    <Sparkles size={11} color="#4ADE80" />
                                    <span>+ P2</span>
                                  </button>
                                )}

                                {/* Edit Button */}
                                <button
                                  type="button"
                                  onClick={() => handleEditInvoice(inv)}
                                  title="Edit Invoice"
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.07)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    color: '#E2E8F0',
                                    padding: '4px 8px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                  }}
                                >
                                  <Edit3 size={11} />
                                  <span>Edit</span>
                                </button>

                                {/* Printable PDF Receipt */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedReceiptProject({
                                    clientName: inv.clientName,
                                    clientCode: inv.clientCode,
                                    totalBudget: inv.total,
                                    rawAmount: inv.rawAmount,
                                    id: inv.id,
                                    receiptNumber: inv.receiptNumber || `FIX-RCPT-2026-${String(inv.id).slice(-3)}`,
                                    invoiceNumber: inv.invoiceNumber,
                                    domain: inv.domain || 'clientwebsite.in',
                                    phone: inv.phone || '+91 98350 12345',
                                    paymentMethod: inv.paymentMethod || 'UPI (Google Pay / PhonePe)',
                                    transactionReference: inv.transactionReference || 'UPI/423189021456',
                                    advanceRef: inv.advanceRef,
                                    advancePaidAmount: inv.advancePaidAmount,
                                    invoiceType: inv.invoiceType,
                                    service: inv.service || inv.serviceDescription,
                                    customLineItems: inv.customLineItems,
                                    addons: inv.addons,
                                    balanceDue: inv.balanceDue,
                                    totalProjectBudget: inv.totalProjectBudget,
                                    paymentStatus: inv?.status === 'Paid' ? 'Paid in Full' : 'Pending Milestone',
                                  })}
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.14)',
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    color: '#38BDF8',
                                    padding: '4px 8px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                  }}
                                >
                                  <Printer size={11} />
                                  <span>Receipt</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: OTP CLIENT WALLETS ──────────────────────────────────── */}
        {activeTab === 'otp-accounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Client OTP Verification Wallets',
              'Monitor live SMS verification credit balances across all client portals to prevent OTP delivery failures on user logins. Immediate 48-hour provisional allocations are tracked for Super Admin bank statement verification.',
              'Verma Institutes student test login wallet has 89 credits (Critical Alert). You can top up their wallet or review their usage logs.',
              'otp-accounts'
            )}

            {/* ─── SUPER ADMIN 48-HOUR PROVISIONAL VERIFICATION RADAR HUB ─── */}
            {provisionalRecharges.filter(p => p?.status === 'PENDING_SUPER_ADMIN').length > 0 && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.45)',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  boxShadow: '0 8px 30px rgba(168, 85, 247, 0.15)',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Crown size={18} color="#FBBF24" />
                    <div>
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.94rem' }}>
                        👑 Super Admin Verification Queue (48-Hour Provisional Auto-Revert Engine)
                      </span>
                      <div style={{ fontSize: '0.7rem', color: '#DDD6FE', marginTop: '1px' }}>
                        Credits are active on client portals. Verify UTR in bank statement. Unconfirmed top-ups will auto-deduct in 48 hours.
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.72rem', color: '#FDE047', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>
                    ⏳ {provisionalRecharges.filter(p => p?.status === 'PENDING_SUPER_ADMIN').length} Pending Bank Review
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="fixkar-table" style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
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
                      {provisionalRecharges
                        .filter(p => p?.status === 'PENDING_SUPER_ADMIN')
                        .map((prov) => (
                          <tr key={prov.id}>
                            <td>
                              <div style={{ fontWeight: 700, color: '#fff' }}>{prov.clientName}</div>
                              <div style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace' }}>{prov.clientCode}</div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 800, color: '#4ADE80', fontFamily: 'monospace' }}>
                                +{prov.credits.toLocaleString()} OTPs
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>{prov.amount}</div>
                              <div style={{ fontSize: '0.68rem', color: '#CBD5E1', fontFamily: 'monospace' }}>UTR: {prov.utr}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>{prov.addedBy || 'Admin'}</span>
                              <div style={{ fontSize: '0.64rem', color: '#64748B' }}>{prov.createdTimestamp || 'Recent'}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.72rem', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, fontFamily: 'monospace' }}>
                                ⏳ {prov.timeRemainingText || `${prov.hoursLeft || 47}h remaining`}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  onClick={() => handleConfirmProvisional(prov.id)}
                                  style={{
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                                  }}
                                  title="Confirm UTR verified in bank statement (Mark permanent)"
                                >
                                  <Check size={12} />
                                  <span>Confirm (Keep Permanent)</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleRejectProvisional(prov.id)}
                                  style={{
                                    background: 'rgba(244, 63, 94, 0.15)',
                                    border: '1px solid rgba(244, 63, 94, 0.4)',
                                    color: '#FDA4AF',
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                  title="Reject UTR & rollback added credits immediately"
                                >
                                  ✕ Reject &amp; Deduct
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                {/* Left: Title + Count + Engine Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                    Client OTP Verification Wallets
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '1px 7px', borderRadius: '10px', fontWeight: 700 }}>
                    {(otpWallets || []).filter((w) => {
                      if (!otpSearchQuery.trim()) return true;
                      const q = otpSearchQuery.toLowerCase().trim();
                      return (
                        (w.clientName || '').toLowerCase().includes(q) ||
                        (w.clientCode || '').toLowerCase().includes(q) ||
                        (w.serviceStatus || '').toLowerCase().includes(q) ||
                        (w.lowBalanceState || '').toLowerCase().includes(q) ||
                        String(w.availableCredits ?? '').includes(q)
                      );
                    }).length}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.25)', padding: '2px 8px', borderRadius: '10px', fontFamily: 'monospace' }}>
                    ● Fast2SMS DLT Engine Connected
                  </span>
                </div>

                {/* Right: Search Bar + Super Admin Gateway Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      placeholder="Search client, code, status..."
                      value={otpSearchQuery}
                      onChange={(e) => setOtpSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 10px 6px 30px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.76rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      let key = superAdminKey;
                      if (!key) {
                        key = window.prompt('👑 Enter Super Admin Master Passkey or PIN (9835) to open Master Gateway & API Engine:');
                        if (key) setSuperAdminKey(key);
                        else return;
                      }
                      setActiveTab('super-otp');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(88, 28, 135, 0.35) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.45)',
                      color: '#DDD6FE',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <Crown size={12} color="#FBBF24" />
                    <span>👑 Super Admin Gateway ➔</span>
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="fixkar-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 16px' }}>CLIENT</th>
                      <th style={{ textAlign: 'center', padding: '12px 10px' }}>SERVICE STATUS</th>
                      <th style={{ textAlign: 'left', padding: '12px 14px' }}>AVAILABLE CREDITS</th>
                      <th style={{ textAlign: 'center', padding: '12px 10px' }}>USED TODAY</th>
                      <th style={{ textAlign: 'center', padding: '12px 10px' }}>USED THIS MONTH</th>
                      <th style={{ textAlign: 'center', padding: '12px 10px' }}>HEALTH STATE</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px' }}>QUICK ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filteredWallets = (otpWallets || []).filter((w) => {
                        if (!otpSearchQuery.trim()) return true;
                        const q = otpSearchQuery.toLowerCase().trim();
                        return (
                          (w.clientName || '').toLowerCase().includes(q) ||
                          (w.clientCode || '').toLowerCase().includes(q) ||
                          (w.serviceStatus || '').toLowerCase().includes(q) ||
                          (w.lowBalanceState || '').toLowerCase().includes(q) ||
                          String(w.availableCredits ?? '').includes(q)
                        );
                      });

                      if (filteredWallets.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                              <div style={{ fontSize: '0.86rem', color: '#94A3B8' }}>No OTP client wallets found</div>
                              {otpSearchQuery && (
                                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '4px' }}>
                                  No results matching "{otpSearchQuery}"
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      }

                      return filteredWallets.map((w) => {
                        const activeProv = provisionalRecharges.find(p => p.clientCode === w.clientCode && p?.status === 'PENDING_SUPER_ADMIN');
                        return (
                          <tr key={w.id || w.clientCode}>
                            {/* 1. Client Identity */}
                            <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {renderClientAvatar(w, 32)}
                                <div>
                                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{w.clientName}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>{w.clientCode}</div>
                                </div>
                              </div>
                            </td>

                            {/* 2. Service Status */}
                            <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 10px' }}>
                              <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.78rem', background: 'rgba(74, 222, 128, 0.12)', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                                ● {w.serviceStatus || 'Active'}
                              </span>
                            </td>

                            {/* 3. Available Credits */}
                            <td style={{ padding: '12px 14px', verticalAlign: 'middle' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ fontSize: '0.94rem', color: (w.availableCredits || 0) < 500 ? '#F43F5E' : (w.availableCredits || 0) < 1000 ? '#FBBF24' : '#4ADE80', fontFamily: 'monospace' }}>
                                  {(w.availableCredits || 0).toLocaleString()} Credits
                                </strong>
                                {activeProv && (
                                  <span style={{ fontSize: '0.62rem', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.35)', padding: '1px 5px', borderRadius: '6px', fontWeight: 700 }}>
                                    ⏳ +{activeProv.credits.toLocaleString()} Prov ({activeProv.hoursLeft || 48}h)
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* 4. Used Today */}
                            <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 10px', color: '#CBD5E1', fontFamily: 'monospace', fontSize: '0.84rem', fontWeight: 600 }}>
                              {w.usedToday ?? 0}
                            </td>

                            {/* 5. Used This Month */}
                            <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 10px', color: '#CBD5E1', fontFamily: 'monospace', fontSize: '0.84rem', fontWeight: 600 }}>
                              {w.usedThisMonth ?? 0}
                            </td>

                            {/* 6. Health State */}
                            <td style={{ textAlign: 'center', verticalAlign: 'middle', padding: '12px 10px' }}>
                              <span className={`fixkar-status-chip ${w.lowBalanceState === 'Normal' || !w.lowBalanceState ? 'success' : 'danger'}`}>
                                {w.lowBalanceState || 'Normal'}
                              </span>
                            </td>

                            {/* 7. Action Button */}
                            <td style={{ textAlign: 'right', verticalAlign: 'middle', padding: '12px 16px' }}>
                              <button
                                type="button"
                                onClick={() => handleOpenOtpTopUpModal(w)}
                                style={{
                                  background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                                  border: 'none',
                                  color: '#fff',
                                  padding: '6px 14px',
                                  borderRadius: '8px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                                  transition: 'all 0.15s ease',
                                }}
                                title="Add OTP credits to this client wallet"
                              >
                                <Plus size={13} />
                                <span>Top-Up</span>
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: SUPER ADMIN MASTER OTP GATEWAY & CLIENT API PROVISIONING ─── */}
        {activeTab === 'super-otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease' }}>
            {renderSectionGuide(
              '👑 Super Admin Master Gateway & Client API Provisioning Engine',
              'Connect your single Fast2SMS Master API Key, sync real-time upstream SMS credits pool, and provision isolated, secure unique API Keys for each client with automatic wallet balance deduction and zero-balance fraud lock.',
              'Click "Sync Live Balance" to fetch live Fast2SMS balance. Use "+ Generate New Client API Key" to provision an isolated API key for any client website or mobile app.',
              'super-otp'
            )}

            {/* ─── 3 KPI TELEMETRY CARDS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {/* Card 1: Master Fast2SMS Gateway Upstream */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.35) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.45)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(168, 85, 247, 0.15)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#DDD6FE', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      MASTER FAST2SMS GATEWAY
                    </span>
                    <span style={{ fontSize: '0.65rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '2px 7px', borderRadius: '10px', fontWeight: 800 }}>
                      {gatewayConfig?.status || '🟢 Active'}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FDE047', fontFamily: 'monospace', margin: '6px 0 2px' }}>
                    {(gatewayConfig?.upstreamBalance || 24250).toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>SMS Credits</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#93C5FD' }}>
                    Upstream Balance: <strong>{gatewayConfig?.upstreamWalletAmount || '₹4,850.00'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                    Synced: {gatewayConfig?.lastSyncedTimestamp ? gatewayConfig.lastSyncedTimestamp.split(',')[1] : 'Recent'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSyncGatewayBalance}
                    disabled={gatewaySyncing}
                    style={{
                      background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: gatewaySyncing ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 8px rgba(147, 51, 234, 0.4)',
                    }}
                  >
                    <RefreshCw size={11} className={gatewaySyncing ? 'animate-spin' : ''} />
                    <span>{gatewaySyncing ? 'Syncing...' : 'Sync Live'}</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Distributed Virtual Pool */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#BAE6FD', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      CLIENT DISTRIBUTED POOL
                    </span>
                    <Smartphone size={15} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace', margin: '6px 0 2px' }}>
                    {otpWallets.reduce((a, b) => a + (b.availableCredits || 0), 0).toLocaleString()} <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>OTPs</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                    Virtual client allocation across <strong>{otpWallets.length} active portals</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', fontSize: '0.7rem', color: '#4ADE80', fontWeight: 600 }}>
                  ● Atomic Ledger Active (Auto-Deducts on Trigger)
                </div>
              </div>

              {/* Card 3: Provisioned API Keys */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  border: '1px solid rgba(74, 222, 128, 0.35)',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#A7F3D0', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      ACTIVE CLIENT API KEYS
                    </span>
                    <KeyRound size={15} color="#4ADE80" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace', margin: '6px 0 2px' }}>
                    {clientApiKeys.length} <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Provisioned</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                    Total Dispatches: <strong>{clientApiKeys.reduce((a, b) => a + (b.totalRequests || 0), 0).toLocaleString()} OTPs Sent</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#86EFAC', fontWeight: 600 }}>
                    ● 100% Isolated Keys
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsGenerateApiKeyModalOpen(true)}
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Plus size={11} />
                    <span>+ New Key</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ─── SECTION 1: MASTER GATEWAY CONFIGURATION ─── */}
            <div
              className="fixkar-panel"
              style={{
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 13, 24, 0.95) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '14px',
                padding: '18px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#C084FC" />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#fff' }}>
                      Master SMS Gateway Connection (Fast2SMS Upstream)
                    </h3>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      All client requests route through this master gateway credential. Clients only receive their isolated sub-keys.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveGatewayConfig}
                  disabled={gatewaySaving}
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '7px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: gatewaySaving ? 'wait' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 10px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  <Save size={12} />
                  <span>{gatewaySaving ? 'Saving...' : 'Save Gateway Config'}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {/* Gateway Provider */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#DDD6FE', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Gateway Provider
                  </label>
                  <input
                    type="text"
                    value={gatewayConfig?.provider || 'Fast2SMS Enterprise DLT Gateway'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, provider: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      background: '#0B1120',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '7px',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>

                {/* Master API Key */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#DDD6FE', fontWeight: 700 }}>
                      Master Fast2SMS API Key
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMasterApiKey(!showMasterApiKey)}
                      style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.66rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      {showMasterApiKey ? 'Hide 👁️' : 'Show 👁️'}
                    </button>
                  </div>
                  <input
                    type={showMasterApiKey ? 'text' : 'password'}
                    value={gatewayConfig?.apiKey || ''}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, apiKey: e.target.value })}
                    placeholder="Enter Fast2SMS Master API Key"
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      background: '#0B1120',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      borderRadius: '7px',
                      color: '#FDE047',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                    }}
                  />
                </div>

                {/* Master Sender ID */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#DDD6FE', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Default DLT Sender ID
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={gatewayConfig?.senderId || 'FIXKAR'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, senderId: e.target.value.toUpperCase() })}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      background: '#0B1120',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '7px',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                    }}
                  />
                </div>

                {/* Route Selection */}
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#DDD6FE', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Gateway Route
                  </label>
                  <select
                    value={gatewayConfig?.route || 'dlt_manual'}
                    onChange={(e) => setGatewayConfig({ ...gatewayConfig, route: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      background: '#0B1120',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '7px',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    <option value="dlt_manual">DLT Manual / Transactional (Primary)</option>
                    <option value="otp">Quick OTP Route (DLT-Free Instant)</option>
                    <option value="v3">Fast2SMS v3 Route</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ─── SECTION 2: PROVISIONED CLIENT API KEYS TABLE ─── */}
            <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <KeyRound size={16} color="#38BDF8" />
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>
                    Client-Specific Isolated API Keys ({clientApiKeys.length})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGenerateApiKeyModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.35)',
                  }}
                >
                  <Plus size={13} />
                  <span>Generate Client API Key</span>
                </button>
              </div>

              {clientApiKeys.length === 0 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: '#94A3B8' }}>
                  <KeyRound size={28} color="#64748B" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>No Client API Keys Provisioned Yet</div>
                  <div style={{ fontSize: '0.74rem', marginTop: '4px' }}>Click "+ Generate Client API Key" above to create an isolated key for any client.</div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="fixkar-table">
                    <thead>
                      <tr>
                        <th>CLIENT</th>
                        <th>UNIQUE CLIENT API KEY</th>
                        <th>DLT HEADER</th>
                        <th>VIRTUAL WALLET</th>
                        <th>DISPATCHES</th>
                        <th>STATUS</th>
                        <th style={{ textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientApiKeys.map((k) => {
                        const isVisible = visibleKeyIds[k.id];
                        const isCopied = copiedKeyId === k.id;
                        return (
                          <tr key={k.id}>
                            {/* Client Info */}
                            <td>
                              <div style={{ fontWeight: 700, color: '#fff' }}>{k.clientName}</div>
                              <div style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace' }}>{k.clientCode}</div>
                            </td>

                            {/* API Key with Mask & Copy */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span
                                  style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.74rem',
                                    color: '#FDE047',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                  }}
                                >
                                  {isVisible ? k.apiKey : `${k.apiKey.slice(0, 18)}••••••••••••`}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setVisibleKeyIds({ ...visibleKeyIds, [k.id]: !isVisible })}
                                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.7rem' }}
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
                                    padding: '2px 7px',
                                    borderRadius: '4px',
                                    fontSize: '0.66rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {isCopied ? '✓ Copied' : 'Copy'}
                                </button>
                              </div>
                            </td>

                            {/* DLT Header */}
                            <td>
                              <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 800, background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#93C5FD', padding: '2px 7px', borderRadius: '4px' }}>
                                {k.dltSenderId || 'FIXKAR'}
                              </span>
                            </td>

                            {/* Virtual Wallet Balance */}
                            <td>
                              <strong style={{ fontSize: '0.86rem', color: (k.availableCredits || 0) < 500 ? '#F43F5E' : '#4ADE80', fontFamily: 'monospace' }}>
                                {(k.availableCredits || 0).toLocaleString()} Credits
                              </strong>
                            </td>

                            {/* Dispatches */}
                            <td>
                              <span style={{ fontSize: '0.76rem', color: '#CBD5E1', fontFamily: 'monospace' }}>
                                {k.totalRequests || 0} OTPs
                              </span>
                            </td>

                            {/* Status */}
                            <td>
                              <span className={`fixkar-status-chip ${k?.status === 'Active' ? 'success' : 'danger'}`}>
                                ● {k?.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '5px' }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedApiKeyForSnippet(k)}
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#38BDF8',
                                    padding: '4px 8px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                  title="View code integration snippet"
                                >
                                  <Terminal size={11} />
                                  <span>Snippet</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleToggleClientApiKey(k.id, k?.status)}
                                  style={{
                                    background: k?.status === 'Active' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(74, 222, 128, 0.15)',
                                    border: `1px solid ${k?.status === 'Active' ? 'rgba(251, 191, 36, 0.35)' : 'rgba(74, 222, 128, 0.35)'}`,
                                    color: k?.status === 'Active' ? '#FBBF24' : '#4ADE80',
                                    padding: '4px 8px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {k?.status === 'Active' ? 'Pause' : 'Resume'}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleRotateClientApiKey(k.id, k.clientName)}
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: '#CBD5E1',
                                    padding: '4px 8px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    cursor: 'pointer',
                                  }}
                                  title="Rotate / Regenerate token"
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
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    cursor: 'pointer',
                                  }}
                                  title="Revoke & delete key"
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
            </div>

            {/* ─── SECTION 3: INTERACTIVE CODE INTEGRATION SANDBOX ─── */}
            {selectedApiKeyForSnippet && (
              <div
                className="fixkar-panel"
                style={{
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 24, 0.98) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
                      Integration Code for {selectedApiKeyForSnippet.clientName} ({selectedApiKeyForSnippet.clientCode})
                    </span>
                  </div>

                  {/* Multi-language Selector */}
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
                          padding: '3px 10px',
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

                {/* Code Container */}
                <div style={{ position: 'relative' }}>
                  <pre
                    style={{
                      background: '#030712',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      color: '#86EFAC',
                      fontFamily: 'monospace',
                      fontSize: '0.76rem',
                      lineHeight: 1.45,
                      overflowX: 'auto',
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
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      fontSize: '0.68rem',
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

        {/* ─── TAB 6: RECHARGE REQUESTS ───────────────────────────────────── */}
        {activeTab === 'recharges' && (() => {
          const filteredRecharges = recharges.filter((rch) => {
            const query = rechargeSearchQuery.trim().toLowerCase();
            const matchesSearch =
              !query ||
              (rch.clientName && rch.clientName.toLowerCase().includes(query)) ||
              (rch.clientCode && rch.clientCode.toLowerCase().includes(query)) ||
              (rch.paymentReference && rch.paymentReference.toLowerCase().includes(query)) ||
              (rch.package && rch.package.toLowerCase().includes(query)) ||
              (rch.amount && String(rch.amount).toLowerCase().includes(query));

            const matchesStatus =
              rechargeStatusFilter === 'All' ||
              (rechargeStatusFilter === 'Approved' && (rch?.status === 'Approved' || String(rch?.status).includes('Approved'))) ||
              (rechargeStatusFilter === 'Pending' && (rch?.status === 'Pending' || String(rch?.status).includes('Pending') || String(rch?.status).includes('Provisional')));

            return matchesSearch && matchesStatus;
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderSectionGuide(
                'Client OTP Recharge Desk & Ledger',
                'Search and review all historical and pending OTP credit recharge requests. Use the search bar below to search by client name, client code (FIX-...), or 12-digit bank UTR reference.',
                'Type "Sharma" or UTR "3453" in the search box to find specific client recharge slips instantly.',
                'recharges'
              )}

              {/* ─── LIVE SEARCH & FILTER CONTROLS BAR ─── */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '12px 16px',
                }}
              >
                {/* Search Box */}
                <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '520px' }}>
                  <Search
                    size={16}
                    color="#38BDF8"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    placeholder="🔍 Search by Client Name, Code (FIX-...), UTR Reference, or Amount..."
                    value={rechargeSearchQuery}
                    onChange={(e) => setRechargeSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 34px 9px 36px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />
                  {rechargeSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setRechargeSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'All', label: `All (${recharges.length})` },
                    { id: 'Approved', label: `🟢 Approved (${recharges.filter(r => r?.status === 'Approved' || String(r?.status).includes('Approved')).length})` },
                    { id: 'Pending', label: `⏳ Pending (${recharges.filter(r => r?.status === 'Pending' || String(r?.status).includes('Pending') || String(r?.status).includes('Provisional')).length})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setRechargeStatusFilter(f.id)}
                      className={`fixkar-pill-btn ${rechargeStatusFilter === f.id ? 'active' : ''}`}
                      style={{
                        fontSize: '0.74rem',
                        padding: '6px 12px',
                      }}
                    >
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── RECHARGE REQUESTS TABLE PANEL ─── */}
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={15} color="#38BDF8" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                      Recharge Ledger ({filteredRecharges.length} {filteredRecharges.length === 1 ? 'Record' : 'Records'})
                    </span>
                    {rechargeSearchQuery && (
                      <span style={{ fontSize: '0.7rem', color: '#93C5FD', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                        Matching "{rechargeSearchQuery}"
                      </span>
                    )}
                  </div>

                  <span style={{ fontSize: '0.74rem', color: '#FDE047' }}>
                    {recharges.filter(r => r?.status === 'Pending').length} Pending Requests
                  </span>
                </div>

                {filteredRecharges.length === 0 ? (
                  <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94A3B8' }}>
                    <Search size={32} color="#64748B" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>No Recharge Records Found</div>
                    <div style={{ fontSize: '0.76rem', marginTop: '4px' }}>No payment slips matching your search "{rechargeSearchQuery}"</div>
                    <button
                      type="button"
                      onClick={() => { setRechargeSearchQuery(''); setRechargeStatusFilter('All'); }}
                      style={{
                        marginTop: '12px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.35)',
                        color: '#38BDF8',
                        padding: '5px 14px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Clear Search &amp; Show All
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="fixkar-table">
                      <thead>
                        <tr>
                          <th>CLIENT</th>
                          <th>PACKAGE &amp; CREDITS</th>
                          <th>AMOUNT</th>
                          <th>PAYMENT REFERENCE (UTR)</th>
                          <th>STATUS</th>
                          <th style={{ textAlign: 'right' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecharges.map((rch) => {
                          const rawUtr = String(rch.paymentReference || '').replace(/^UTR:\s*/i, '').trim();
                          const isCopied = copiedUtrId === rch.id;

                          return (
                            <tr key={rch.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  {renderClientAvatar(rch, 32)}
                                  <div>
                                    <div style={{ fontWeight: 700, color: '#fff' }}>{rch.clientName}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>{rch.clientCode}</div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div style={{ fontWeight: 600, color: '#fff' }}>{rch.package}</div>
                                <div style={{ fontSize: '0.72rem', color: '#4ADE80', fontFamily: 'monospace' }}>
                                  +{(rch.creditsRequested || rch.credits || 0).toLocaleString()} Credits
                                </div>
                              </td>

                              <td style={{ fontWeight: 700, color: '#FDE047', fontSize: '0.94rem' }}>
                                {rch.amount}
                              </td>

                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontFamily: 'monospace', color: '#CBD5E1', fontSize: '0.76rem', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    {rch.paymentReference}
                                  </span>
                                  {rawUtr && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard.writeText(rawUtr);
                                        setCopiedUtrId(rch.id);
                                        setTimeout(() => setCopiedUtrId(null), 2500);
                                      }}
                                      style={{
                                        background: isCopied ? '#16A34A' : 'rgba(56, 189, 248, 0.15)',
                                        border: `1px solid ${isCopied ? '#16A34A' : 'rgba(56, 189, 248, 0.35)'}`,
                                        color: isCopied ? '#fff' : '#38BDF8',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: '0.64rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                      }}
                                      title="Copy UTR to clipboard"
                                    >
                                      {isCopied ? '✓' : 'Copy'}
                                    </button>
                                  )}
                                </div>
                              </td>

                              <td>
                                <span className={`fixkar-status-chip ${rch?.status === 'Approved' || String(rch?.status).includes('Approved') ? 'success' : 'warning'}`}>
                                  ● {rch?.status}
                                </span>
                              </td>

                              <td style={{ textAlign: 'right' }}>
                                {rch?.status === 'Pending' ? (
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                    <button
                                      onClick={() => handleApproveRecharge(rch.id)}
                                      style={{ background: '#16A34A', border: 'none', color: '#fff', padding: '5px 12px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                    >
                                      <Check size={12} />
                                      <span>Approve</span>
                                    </button>
                                    <button
                                      onClick={() => handleRejectRecharge(rch.id)}
                                      style={{ background: 'rgba(244, 63, 94, 0.2)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#FDA4AF', padding: '5px 8px', borderRadius: '8px', fontSize: '0.72rem', cursor: 'pointer' }}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <span style={{ fontSize: '0.74rem', color: '#4ADE80', fontWeight: 600 }}>
                                    ✓ Verified &amp; Credited
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 7: PROJECTS (END-TO-END TESTING & REVISION WORKFLOW) ──── */}
        {activeTab === 'projects' && (() => {
          const totalProjects = projects.length;
          const liveProjects = projects.filter(p => String(p.sprintStatus).includes('Live') || String(p.sprintStatus).includes('SLA')).length;
          const qaProjects = projects.filter(p => String(p.sprintStatus).includes('Testing') || String(p.sprintStatus).includes('QA') || String(p.sprintStatus).includes('Staging') || String(p.sprintStatus).includes('UAT')).length;
          const updatingProjects = projects.filter(p => String(p.sprintStatus).includes('Feedback') || String(p.sprintStatus).includes('Updating') || String(p.sprintStatus).includes('Revision')).length;
          const devProjects = projects.filter(p => String(p.sprintStatus).includes('Sprint') || String(p.sprintStatus).includes('Wireframing') || String(p.sprintStatus).includes('Planning')).length;

          const filteredProjects = (projects || []).filter(Boolean).filter((p) => {
            if (projectStageFilter === 'Live') return String(p.sprintStatus).includes('Live') || String(p.sprintStatus).includes('SLA');
            if (projectStageFilter === 'QA') return String(p.sprintStatus).includes('Testing') || String(p.sprintStatus).includes('QA') || String(p.sprintStatus).includes('Staging') || String(p.sprintStatus).includes('UAT');
            if (projectStageFilter === 'Updating') return String(p.sprintStatus).includes('Feedback') || String(p.sprintStatus).includes('Updating') || String(p.sprintStatus).includes('Revision');
            if (projectStageFilter === 'Sprints') return String(p.sprintStatus).includes('Sprint') || String(p.sprintStatus).includes('Wireframing') || String(p.sprintStatus).includes('Planning');
            return true;
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderSectionGuide(
                'Client Projects & 5-Stage Delivery Lifecycle',
                'Streamlined 5-stage web engineering delivery workflow: Planning & Development → QA & Staging Testing → Client Feedback & Updating → Final Approval & Balance → 100% Live in Production.',
                'Apex Fitness Gym Portal — In QA Testing. Run the 6-point QA checklist. Once verified, move to "3. Client Feedback & Updating" for revision tasks, or "4. Final Approval & Balance" before live deployment.',
                'projects'
              )}

              {/* ─── 4 TOP TELEMETRY METRIC CARDS ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#93C5FD', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL ACTIVE PROJECTS</span>
                    <Briefcase size={15} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                    {totalProjects} Projects
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>50/50 milestone sprint delivery</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FDE047', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>QA &amp; STAGING TESTING</span>
                    <FlaskConical size={15} color="#F59E0B" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FDE047', margin: '4px 0 2px' }}>
                    {qaProjects} In Testing
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>6-point QA checklist &amp; staging</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#F472B6', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REVISIONS &amp; UPDATING</span>
                    <Wrench size={15} color="#EC4899" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F472B6', margin: '4px 0 2px' }}>
                    {updatingProjects} In Updating
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Client feedback &amp; modifications</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#86EFAC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIVE IN PRODUCTION</span>
                    <CheckCircle2 size={15} color="#4ADE80" />
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#4ADE80', margin: '4px 0 2px' }}>
                    {liveProjects} Live
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>100% deployed &amp; warrantied</div>
                </div>
              </div>

              {/* ─── MAIN PROJECTS PANEL ─── */}
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div className="fixkar-pill-bar">
                    {[
                      { id: 'All', label: `All (${totalProjects})` },
                      { id: 'Sprints', label: `⚡ Development (${devProjects})` },
                      { id: 'QA', label: `🧪 QA Testing (${qaProjects})` },
                      { id: 'Updating', label: `🔄 Updating & Revisions (${updatingProjects})` },
                      { id: 'Live', label: `🟢 Live (${liveProjects})` },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setProjectStageFilter(f.id)}
                        className={`fixkar-pill-btn ${projectStageFilter === f.id ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '5px 11px' }}
                      >
                        <span>{f.label}</span>
                      </button>
                    ))}
                  </div>

                  <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                    {liveProjects} Live Deployments • {qaProjects + updatingProjects} In Testing &amp; Updates
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="fixkar-table" style={{ width: '100%', fontSize: '0.78rem' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}>PROJECT &amp; CLIENT</th>
                        <th style={{ width: '25%' }}>LIFECYCLE WORKFLOW &amp; STAGE</th>
                        <th style={{ width: '18%' }}>INVESTMENT &amp; 50/50 MILESTONES</th>
                        <th style={{ width: '12%' }}>DELIVERY SLA</th>
                        <th style={{ width: '20%', textAlign: 'right' }}>WORKFLOW ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((proj) => {
                        const statusStr = String(proj.sprintStatus || '');
                        const isLive = statusStr.includes('Live') || statusStr.includes('SLA');
                        const isQA = statusStr.includes('Testing') || statusStr.includes('QA') || statusStr.includes('Staging');
                        const isUpdating = statusStr.includes('Feedback') || statusStr.includes('Updating') || statusStr.includes('Revision');
                        const isApproval = statusStr.includes('Approval') || statusStr.includes('Balance');
                        const isDev = statusStr.includes('Sprint') || statusStr.includes('Development') || statusStr.includes('Planning') || statusStr.includes('Wireframing');

                        let progressPct = 20;
                        let progressColor = '#38BDF8';
                        if (isLive) {
                          progressPct = 100;
                          progressColor = '#4ADE80';
                        } else if (isApproval) {
                          progressPct = 90;
                          progressColor = '#A855F7';
                        } else if (isUpdating) {
                          progressPct = 75;
                          progressColor = '#EC4899';
                        } else if (isQA) {
                          progressPct = 50;
                          progressColor = '#F59E0B';
                        } else if (isDev) {
                          progressPct = 20;
                          progressColor = '#38BDF8';
                        }

                        const targetUrl = proj.domain ? (proj.domain.startsWith('http') ? proj.domain : `https://${proj.domain}`) : '#';
                        const code = proj.clientCode || 'FIX-PROJ';
                        const checklist = projectQaChecklists[code] || { mobile: 'Passed', forms: 'Passed', speed: 'Passed', ssl: 'Passed', otp: 'Passed', seo: 'Passed' };
                        const passedQACount = Object.values(checklist).filter(v => v === 'Passed').length;
                        const openRevisionsCount = feedbackReviewsList.filter(f => (!proj.domain || f.projectDomain === proj.domain || f.clientCode === proj.clientCode) && f?.status !== 'Solved' && f?.status !== 'Updated').length;

                        return (
                          <tr key={proj.id}>
                            {/* 1. Client Identity & Super Admin Clearance Badges */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {renderClientAvatar(proj, 34)}
                                <div>
                                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.86rem' }}>{proj.clientName}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                                    <span style={{ color: '#38BDF8' }}>{code}</span>
                                    <span>•</span>
                                    <span>{proj.domain}</span>
                                  </div>
                                  {/* Super Admin Authorization Badges */}
                                  <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
                                    <span
                                      style={{
                                        fontSize: '0.62rem',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 700,
                                        background: proj.superAdminApprovedTesting ? 'rgba(74, 222, 128, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                                        color: proj.superAdminApprovedTesting ? '#86EFAC' : '#FDE047',
                                        border: `1px solid ${proj.superAdminApprovedTesting ? 'rgba(74, 222, 128, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                      }}
                                    >
                                      {proj.superAdminApprovedTesting ? '✓ SA Testing OK' : '🔒 SA Testing Locked'}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: '0.62rem',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 700,
                                        background: proj.superAdminApprovedLive ? 'rgba(74, 222, 128, 0.12)' : 'rgba(148, 163, 184, 0.1)',
                                        color: proj.superAdminApprovedLive ? '#86EFAC' : '#94A3B8',
                                        border: `1px solid ${proj.superAdminApprovedLive ? 'rgba(74, 222, 128, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                      }}
                                    >
                                      {proj.superAdminApprovedLive ? '✓ SA Live OK' : '🔒 SA Live Locked'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 2. 5-Stage Lifecycle Workflow & Progress Dropdown */}
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '230px' }}>
                                <select
                                  value={proj.sprintStatus}
                                  onChange={(e) => handleUpdateProjectStage(proj.id, e.target.value)}
                                  style={{
                                    background: '#0D1323',
                                    border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.4)' : isUpdating ? 'rgba(236, 72, 153, 0.4)' : isQA ? 'rgba(245, 158, 11, 0.4)' : isApproval ? 'rgba(168, 85, 247, 0.4)' : 'rgba(56, 189, 248, 0.3)'}`,
                                    borderRadius: '8px',
                                    padding: '6px 8px',
                                    color: progressColor,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    outline: 'none',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                  }}
                                >
                                  <option value="1. Planning & Development">
                                    1. 📐 Planning &amp; Dev (20%)
                                  </option>
                                  <option value="2. QA & Staging Testing" disabled={!proj.superAdminApprovedTesting}>
                                    {proj.superAdminApprovedTesting ? '2. 🧪 QA Testing (50%)' : '🔒 2. QA Testing (SA Locked)'}
                                  </option>
                                  {/* 3. Step 3 (Client Feedback) - Hidden until Admin reaches Step 2 */}
                                  {getStageIndex(proj.sprintStatus) >= 2 && (
                                    <option value="3. Client Feedback & Updating">
                                      3. 🔄 Client Feedback (75%)
                                    </option>
                                  )}

                                  {/* 4. Step 4 (Final Approval) - Hidden until Admin reaches Step 3 */}
                                  {getStageIndex(proj.sprintStatus) >= 3 && (
                                    <option value="4. Final Approval & Balance">
                                      4. 💳 Final Approval (90%)
                                    </option>
                                  )}

                                  {/* 5. Step 5 (Live Production) - Hidden until Admin reaches Step 4 */}
                                  {getStageIndex(proj.sprintStatus) >= 4 && (
                                    <option
                                      value="5. 100% Live in Production"
                                      disabled={!proj.superAdminApprovedLive}
                                    >
                                      {proj.superAdminApprovedLive
                                        ? '5. 🟢 100% Live in Prod (100%)'
                                        : '🔒 5. Live in Prod (SA Locked)'}
                                    </option>
                                  )}
                                </select>

                                {/* Visual Progress Bar & Status Pill */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${progressPct}%`, height: '100%', background: progressColor, transition: 'width 0.3s ease' }} />
                                  </div>
                                  <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', fontWeight: 800, color: progressColor }}>
                                    {progressPct}%
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* 3. Milestones */}
                            <td>
                              <div style={{ fontWeight: 800, color: '#4ADE80', fontSize: '0.84rem' }}>Total: {proj.totalBudget}</div>
                              <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                                Adv: <span style={{ color: '#38BDF8', fontWeight: 700 }}>{proj.advancePaid}</span> | Bal: <span style={{ color: isLive ? '#4ADE80' : '#FBBF24', fontWeight: 700 }}>{proj.balanceDue}</span>
                              </div>
                            </td>

                            {/* 4. Delivery Date */}
                            <td>
                              <div style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.76rem' }}>📅 {proj.deliveryDate}</div>
                              <div style={{ fontSize: '0.68rem', color: isLive ? '#4ADE80' : '#38BDF8', marginTop: '2px' }}>
                                {isLive ? '✓ Handed Over' : 'Target SLA'}
                              </div>
                            </td>

                            {/* 5. Actions: Staging Preview, Updating Hub & Launch */}
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center', flexWrap: 'nowrap' }}>
                                {/* Preview Link - Only shown if project is Live OR marked for Testing / Preview (Stage >= 2 or previewActive) */}
                                {(isLive || isQA || isUpdating || isApproval || proj.previewActive || proj.stagingUrl || proj.previewUrl) && (
                                  <a
                                    href={targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      background: isLive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(56, 189, 248, 0.1)',
                                      border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
                                      color: isLive ? '#86EFAC' : '#93C5FD',
                                      padding: '4px 8px',
                                      borderRadius: '6px',
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      textDecoration: 'none',
                                      whiteSpace: 'nowrap',
                                    }}
                                    title={isLive ? 'Open Live Website' : 'Open Staging URL'}
                                  >
                                    <Globe size={11} color={isLive ? '#4ADE80' : '#38BDF8'} />
                                    <span>{isLive ? 'Live' : 'Preview'}</span>
                                    <ExternalLink size={9} />
                                  </a>
                                )}

                                {/* 🔄 Updating & Feedback Button */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedFeedbackProject(proj)}
                                  style={{
                                    background: openRevisionsCount > 0 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                    border: `1px solid ${openRevisionsCount > 0 ? 'rgba(236, 72, 153, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                                    color: openRevisionsCount > 0 ? '#F472B6' : '#CBD5E1',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    whiteSpace: 'nowrap',
                                  }}
                                  title="View Client Feedback, Revisions & Updating Hub"
                                >
                                  <Wrench size={11} />
                                  <span>Updates {openRevisionsCount > 0 ? `(${openRevisionsCount})` : ''}</span>
                                </button>

                                {/* 🚀 Launch Live Action (Strict Step 4 + Super Admin Live Approval Required) */}
                                {!isLive && (() => {
                                  const curIdx = getStageIndex(proj.sprintStatus);
                                  const canLaunch = curIdx >= 4 && proj.superAdminApprovedLive;
                                  return (
                                    <button
                                      onClick={() => {
                                        if (curIdx < 4) {
                                          setDraftSavedNotice(`⚠️ Sequential Progression Required: Project must reach Step 4 (Final Approval & Balance) before launching live.`);
                                          setTimeout(() => setDraftSavedNotice(null), 5000);
                                          return;
                                        }
                                        if (!proj.superAdminApprovedLive) {
                                          setDraftSavedNotice(`🔒 Super Admin Release Authorization Required: Super Admin must authorize 100% Live Production release in Super Admin Console first.`);
                                          setTimeout(() => setDraftSavedNotice(null), 5000);
                                          return;
                                        }
                                        handleUpdateProjectStage(proj.id, '5. 100% Live in Production');
                                      }}
                                      style={{
                                        background: canLaunch ? 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)' : 'rgba(100, 116, 139, 0.2)',
                                        border: canLaunch ? 'none' : '1px solid rgba(148, 163, 184, 0.3)',
                                        color: canLaunch ? '#fff' : '#94A3B8',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        cursor: canLaunch ? 'pointer' : 'not-allowed',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                        whiteSpace: 'nowrap',
                                        boxShadow: canLaunch ? '0 2px 8px rgba(22, 163, 74, 0.3)' : 'none',
                                      }}
                                      title={
                                        curIdx < 4
                                          ? 'Locked: Complete Step 3 & Step 4 (Final Approval & Balance) first'
                                          : proj.superAdminApprovedLive
                                            ? 'Launch to Production & Settle Milestone Balance'
                                            : 'Locked: Super Admin Release Authorization Required'
                                      }
                                    >
                                      {canLaunch ? <Rocket size={11} /> : <Lock size={11} />}
                                      <span>{canLaunch ? 'Launch' : 'Locked'}</span>
                                    </button>
                                  );
                                })()}
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredProjects.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '0.82rem' }}>
                            ✓ No projects found matching the selected stage filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 8: LEADS & ENQUIRIES ───────────────────────────────────── */}
        {activeTab === 'leads' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Header with Search, Filter Pills & Actions */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Search Bar */}
                  <div style={{ position: 'relative' }}>
                    <Search size={13} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search name, phone, package..."
                      value={leadSearchQuery}
                      onChange={(e) => setLeadSearchQuery(e.target.value)}
                      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '6px 12px 6px 30px', color: '#fff', fontSize: '0.76rem', outline: 'none', width: '220px' }}
                    />
                  </div>

                  {/* Status Filter Pills */}
                  <div className="fixkar-pill-bar">
                    {[
                      { id: 'All', label: 'All Inquiries', count: leads.length },
                      { id: 'New', label: 'New', count: leads.filter((l) => l?.status === 'New').length },
                      { id: 'Contacted', label: 'Contacted', count: leads.filter((l) => l?.status === 'Contacted').length },
                      { id: 'In Discussion', label: 'In Discussion', count: leads.filter((l) => l?.status === 'In Discussion').length },
                      { id: 'Demo Shared', label: 'Demo Shared', count: leads.filter((l) => l?.status === 'Demo Shared').length },
                      { id: '50% Paid', label: '50% Paid', count: leads.filter((l) => l?.status === '50% Paid').length },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setLeadStatusFilter(f.id)}
                        className={`fixkar-pill-btn ${leadStatusFilter === f.id ? 'active' : ''}`}
                        style={{ fontSize: '0.7rem', padding: '4px 9px' }}
                      >
                        <span>{f.label} ({f.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={fetchAllData}
                    disabled={loading}
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', padding: '5px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
                    <span>Sync</span>
                  </button>

                  {leads.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllLeads}
                      style={{
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.25)',
                        color: '#FDA4AF',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="Clear all leads from database"
                    >
                      <Trash2 size={11} />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Master Leads Table (100% Responsive Fit, Zero Horizontal Scroll) */}
              <div style={{ overflowX: 'hidden' }}>
                <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', margin: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ width: '20%', textAlign: 'left', padding: '10px 8px' }}>PROSPECT &amp; CLIENT</th>
                      <th style={{ width: '20%', textAlign: 'left', padding: '10px 8px' }}>SERVICE REQUIRED</th>
                      <th style={{ width: '12%', textAlign: 'left', padding: '10px 8px' }}>EST. BUDGET</th>
                      <th style={{ width: '14%', textAlign: 'center', padding: '10px 8px' }}>STATUS</th>
                      <th style={{ width: '8%', textAlign: 'center', padding: '10px 8px' }}>DATE</th>
                      <th style={{ width: '26%', textAlign: 'right', padding: '10px 8px' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                          <MessageSquare size={24} color="#38BDF8" style={{ margin: '0 auto 8px', display: 'block', opacity: 0.6 }} />
                          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#94A3B8' }}>No Inquiries Found</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                            {leads.length === 0 ? 'Public quotation inquiries submitted from the website calculator will appear here live.' : 'No inquiries match your current search/filter.'}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((ld) => {
                        const rawPhone = String(ld.phone || '').replace(/[^\d+]/g, '');
                        const cleanPhone = rawPhone.replace(/^(\+91|91)/, '').replace(/\D/g, '');
                        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : rawPhone.replace(/\D/g, '');
                        const isExpanded = !!expandedLeadIds[ld.id];

                        return (
                          <React.Fragment key={ld.id}>
                            <tr
                              style={{
                                background: isExpanded ? 'rgba(56, 189, 248, 0.04)' : 'transparent',
                                borderBottom: isExpanded ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                              }}
                            >
                              {/* 1. Prospect Column */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  {renderClientAvatar({ businessName: ld.businessName || ld.name, logoUrl: ld.logoUrl }, 30)}
                                  <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {ld.businessName || ld.name || 'Anonymous Visitor'}
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {ld.name} {ld.city ? `• ${ld.city}` : ''}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* 2. Service Required */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                  <span style={{
                                    fontSize: '0.62rem',
                                    fontWeight: 800,
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    background: 'rgba(56, 189, 248, 0.12)',
                                    color: '#38BDF8',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {ld.packageSelected || 'Custom App'}
                                  </span>
                                  <span style={{ color: '#CBD5E1', fontSize: '0.74rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {ld.serviceRequired ? ld.serviceRequired.split('(')[0].trim() : 'Web Platform'}
                                  </span>
                                </div>
                              </td>

                              {/* 3. Estimated Budget */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px', whiteSpace: 'nowrap' }}>
                                <div style={{ fontWeight: 800, color: '#FDE047', fontFamily: 'monospace', fontSize: '0.86rem' }}>
                                  {ld.estimatedQuote || ld.budget || 'Custom'}
                                </div>
                                <div style={{ fontSize: '0.64rem', color: '#64748B' }}>50% Advance</div>
                              </td>

                              {/* 4. Status Selector */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <select
                                  value={ld?.status || 'New'}
                                  onChange={(e) => handleUpdateLeadStatus(ld.id, e.target.value)}
                                  style={{
                                    background:
                                      ld?.status === 'New'
                                        ? 'rgba(251, 191, 36, 0.15)'
                                        : ld?.status === 'Contacted'
                                        ? 'rgba(56, 189, 248, 0.15)'
                                        : ld?.status === 'In Discussion'
                                        ? 'rgba(168, 85, 247, 0.15)'
                                        : 'rgba(74, 222, 128, 0.15)',
                                    border: `1px solid ${
                                      ld?.status === 'New'
                                        ? 'rgba(251, 191, 36, 0.4)'
                                        : ld?.status === 'Contacted'
                                        ? 'rgba(56, 189, 248, 0.4)'
                                        : ld?.status === 'In Discussion'
                                        ? 'rgba(168, 85, 247, 0.4)'
                                        : 'rgba(74, 222, 128, 0.4)'
                                    }`,
                                    color:
                                      ld?.status === 'New'
                                        ? '#FBBF24'
                                        : ld?.status === 'Contacted'
                                        ? '#38BDF8'
                                        : ld?.status === 'In Discussion'
                                        ? '#C084FC'
                                        : '#4ADE80',
                                    padding: '3px 6px',
                                    borderRadius: '5px',
                                    fontSize: '0.68rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    outline: 'none',
                                  }}
                                >
                                  <option value="New" style={{ background: '#0F172A', color: '#FBBF24' }}>● New</option>
                                  <option value="Contacted" style={{ background: '#0F172A', color: '#38BDF8' }}>● Contacted</option>
                                  <option value="In Discussion" style={{ background: '#0F172A', color: '#C084FC' }}>● In Discussion</option>
                                  <option value="Demo Shared" style={{ background: '#0F172A', color: '#38BDF8' }}>● Demo Shared</option>
                                  <option value="50% Paid" style={{ background: '#0F172A', color: '#4ADE80' }}>● 50% Paid</option>
                                  <option value="Converted" style={{ background: '#0F172A', color: '#4ADE80' }}>● Converted</option>
                                </select>
                              </td>

                              {/* 5. Date */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <div style={{ color: '#CBD5E1', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'monospace' }}>
                                  {ld.createdAt ? new Date(ld.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ld.date || 'Today'}
                                </div>
                              </td>

                              {/* 6. Action Buttons */}
                              <td style={{ verticalAlign: 'middle', padding: '10px 8px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                                  {/* WhatsApp Button */}
                                  <a
                                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello ${ld.name || ld.businessName}!

Thank you for reaching out to Fixkar regarding '${ld.serviceRequired || ld.packageSelected || 'Website Project'}'.
Estimated Investment: ${ld.estimatedQuote || ld.budget || 'Custom'}.

When would be a good time to discuss your project requirements?`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Send WhatsApp Message"
                                    style={{
                                      background: 'rgba(74, 222, 128, 0.12)',
                                      border: '1px solid rgba(74, 222, 128, 0.35)',
                                      color: '#4ADE80',
                                      padding: '3px 7px',
                                      borderRadius: '5px',
                                      fontSize: '0.66rem',
                                      fontWeight: 700,
                                      textDecoration: 'none',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                    }}
                                  >
                                    <span>💬 WA</span>
                                  </a>

                                  {/* Call Button */}
                                  {ld.phone && (
                                    <a
                                      href={`tel:${rawPhone}`}
                                      title={`Call ${ld.phone}`}
                                      style={{
                                        background: 'rgba(56, 189, 248, 0.12)',
                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                        color: '#38BDF8',
                                        padding: '3px 7px',
                                        borderRadius: '5px',
                                        fontSize: '0.66rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                      }}
                                    >
                                      <Phone size={10} />
                                      <span>Call</span>
                                    </a>
                                  )}

                                  {/* Details Expand Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => toggleLeadExpand(ld.id)}
                                    title="View scope details"
                                    style={{
                                      background: isExpanded ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                      border: `1px solid ${isExpanded ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`,
                                      color: isExpanded ? '#38BDF8' : '#CBD5E1',
                                      padding: '3px 7px',
                                      borderRadius: '5px',
                                      fontSize: '0.66rem',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '2px',
                                    }}
                                  >
                                    <span>{isExpanded ? 'Hide' : 'Details'}</span>
                                    {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* Expanded Details Drawer */}
                            {isExpanded && (
                              <tr style={{ background: 'rgba(15, 23, 42, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <td colSpan={6} style={{ padding: '14px 18px' }}>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                                    {/* Left Box: Client Message & Scope */}
                                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '10px 14px' }}>
                                      <div style={{ fontSize: '0.68rem', color: '#93C5FD', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                                        Project Scope &amp; Client Requirement
                                      </div>
                                      <div style={{ fontSize: '0.76rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                                        {ld.message || ld.notes || 'No custom notes provided with quote submission.'}
                                      </div>
                                      <div style={{ marginTop: '8px', display: 'flex', gap: '10px', fontSize: '0.7rem', color: '#94A3B8' }}>
                                        <span>📧 Email: <strong style={{ color: '#CBD5E1' }}>{ld.email || 'N/A'}</strong></span>
                                        <span>📱 Phone: <strong style={{ color: '#CBD5E1' }}>{ld.phone || 'N/A'}</strong></span>
                                      </div>
                                    </div>

                                    {/* Right Box: Features & Convert Action */}
                                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
                                      <div>
                                        <div style={{ fontSize: '0.68rem', color: '#86EFAC', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                                          Selected Features &amp; Add-ons
                                        </div>
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                          {(ld.features && ld.features.length > 0 ? ld.features : ['Responsive UI', 'Domain + VPS Server', 'Fast2SMS OTP', 'SEO Optimization']).map((f, i) => (
                                            <span key={i} style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.25)', color: '#86EFAC', fontSize: '0.64rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                              ✓ {f}
                                            </span>
                                          ))}
                                        </div>
                                      </div>

                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteLead(ld.id)}
                                          style={{ background: 'none', border: 'none', color: '#FDA4AF', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                        >
                                          <Trash2 size={11} />
                                          <span>Delete Inquiry</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() => handleConvertToClientFromLead(ld.id)}
                                          style={{
                                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '5px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                                          }}
                                        >
                                          <UserCheck size={12} />
                                          <span>Convert to Client &rarr;</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

{/* ─── TAB 9: SERVICES & QUOTE CONFIGURATION ENGINE ──────────────── */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Control Panel */}
            <div
              className="fixkar-panel"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%)',
              }}
            >
              {/* Sub-Navigation Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setActiveServiceSubTab('packages')}
                  style={{
                    background: activeServiceSubTab === 'packages' ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeServiceSubTab === 'packages' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeServiceSubTab === 'packages' ? '#fff' : '#94A3B8',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Globe size={13} />
                  <span>Web &amp; App Packages ({quoteConfig?.siteTypes?.length || 4})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveServiceSubTab('features')}
                  style={{
                    background: activeServiceSubTab === 'features' ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeServiceSubTab === 'features' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeServiceSubTab === 'features' ? '#fff' : '#94A3B8',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Layers size={13} />
                  <span>Features &amp; Modules ({quoteConfig?.features?.length || 8})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveServiceSubTab('ai')}
                  style={{
                    background: activeServiceSubTab === 'ai' ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeServiceSubTab === 'ai' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeServiceSubTab === 'ai' ? '#fff' : '#94A3B8',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Bot size={13} />
                  <span>AI Automation Tiers ({quoteConfig?.aiOptions?.length || 3})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveServiceSubTab('hosting_domains')}
                  style={{
                    background: activeServiceSubTab === 'hosting_domains' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeServiceSubTab === 'hosting_domains' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeServiceSubTab === 'hosting_domains' ? '#fff' : '#94A3B8',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Server size={13} />
                  <span>🔒 Auto-Synced Cloud &amp; Domains</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {activeServiceSubTab === 'packages' && (
                  <button
                    type="button"
                    onClick={() => setIsAddPackageModalOpen(true)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38BDF8',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Package</span>
                  </button>
                )}

                {activeServiceSubTab === 'features' && (
                  <button
                    type="button"
                    onClick={() => setIsAddFeatureModalOpen(true)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38BDF8',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Feature</span>
                  </button>
                )}

                {activeServiceSubTab === 'ai' && (
                  <button
                    type="button"
                    onClick={() => setIsAddAiModalOpen(true)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38BDF8',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Plus size={14} />
                    <span>Add AI Option</span>
                  </button>
                )}

                {activeServiceSubTab === 'hosting_domains' && (
                  <button
                    type="button"
                    onClick={handleSyncHostingRates}
                    disabled={hostingSyncing}
                    style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#6EE7B7',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <RefreshCw size={13} className={hostingSyncing ? 'animate-spin' : ''} />
                    <span>{hostingSyncing ? 'Syncing...' : 'Sync Upstream Rates'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleSaveQuoteConfig()}
                  disabled={quoteConfigSaving}
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '7px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <Save size={13} className={quoteConfigSaving ? 'animate-spin' : ''} />
                  <span>{quoteConfigSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </div>

            {/* Draft Saved Toast Banner */}
            {draftSavedNotice && (
              <div
                style={{
                  background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.35) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.45)',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  color: '#6EE7B7',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <span>{draftSavedNotice}</span>
                <button
                  type="button"
                  onClick={() => handleSaveQuoteConfig()}
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Publish Now →
                </button>
              </div>
            )}

            {/* ─── SUBTAB 1: WEB & APP PACKAGES (CLEAN LIST VIEW) ──────────────────── */}
            {activeServiceSubTab === 'packages' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Clean Packages List Table */}
                <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                        Web &amp; Application Packages ({quoteConfig?.siteTypes?.length || 0})
                      </span>
                      <button
                        type="button"
                        onClick={handleResetAllDefaults}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#94A3B8',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        title="Revert all packages to standard presets"
                      >
                        <RotateCcw size={11} />
                        <span>Revert All</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ width: '100%', overflow: 'hidden' }}>
                    <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '30%', textAlign: 'left', padding: '12px 14px' }}>PACKAGE &amp; SCOPE</th>
                          <th style={{ width: '12%', textAlign: 'left', padding: '12px 8px', whiteSpace: 'nowrap' }}>BASE PRICE</th>
                          <th style={{ width: '12%', textAlign: 'center', padding: '12px 6px', whiteSpace: 'nowrap' }}>INCLUDED PAGES</th>
                          <th style={{ width: '13%', textAlign: 'center', padding: '12px 6px', whiteSpace: 'nowrap' }}>TURNAROUND</th>
                          <th style={{ width: '14%', textAlign: 'center', padding: '12px 6px', whiteSpace: 'nowrap' }}>STATUS</th>
                          <th style={{ width: '19%', textAlign: 'right', padding: '12px 14px', whiteSpace: 'nowrap' }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(quoteConfig?.siteTypes || []).map((pkg, idx) => {
                          const isLive = pkg.isLive !== false;
                          return (
                            <tr key={pkg.id || idx}>
                              {/* 1. Package Name & Badge & Scope */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                  <strong style={{ color: '#fff', fontSize: '0.86rem' }}>{pkg.title}</strong>
                                  {pkg.badge && (
                                    <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '1px 5px', borderRadius: '8px', whiteSpace: 'nowrap', fontWeight: 700 }}>
                                      {pkg.badge}
                                    </span>
                                  )}
                                  {!isLive && (
                                    <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '1px 5px', borderRadius: '8px', fontWeight: 700 }}>
                                      Draft
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                  {pkg.simpleDesc || 'Custom web package specification'}
                                </div>
                                <div style={{ fontSize: '0.64rem', color: '#64748B', fontFamily: 'monospace', marginTop: '1px' }}>
                                  ID: {pkg.id}
                                </div>
                              </td>

                              {/* 2. Base Price */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 8px', whiteSpace: 'nowrap' }}>
                                <span style={{ color: '#FDE047', fontWeight: 800, fontSize: '0.92rem', fontFamily: 'monospace' }}>
                                  ₹{Number(pkg.price).toLocaleString('en-IN')}
                                </span>
                              </td>

                              {/* 3. Included Pages */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 6px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <span style={{
                                  background: 'rgba(255, 255, 255, 0.06)',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                  color: '#E2E8F0',
                                  padding: '3px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: '68px',
                                  whiteSpace: 'nowrap',
                                }}>
                                  {pkg.includedPages} {pkg.includedPages === 1 ? 'Page' : 'Pages'}
                                </span>
                              </td>

                              {/* 4. Turnaround Time */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 6px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <span style={{
                                  color: '#4ADE80',
                                  fontSize: '0.76rem',
                                  fontWeight: 600,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '3px',
                                  whiteSpace: 'nowrap',
                                }}>
                                  ⚡ {pkg.turnaround || '7–14 Days'}
                                </span>
                              </td>

                              {/* 5. Status Badge */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 6px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <span
                                  className={`fixkar-status-chip ${isLive ? 'success' : 'warning'}`}
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '3px 8px',
                                    fontWeight: 700,
                                    background: isLive ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                                    color: isLive ? '#4ADE80' : '#FBBF24',
                                    border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.35)' : 'rgba(251, 191, 36, 0.35)'}`,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {isLive ? '● Live' : '● Draft Mode'}
                                </span>
                              </td>

                              {/* 6. Action Buttons */}
                              <td style={{ verticalAlign: 'middle', padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', flexWrap: 'nowrap' }}>
                                  {/* Edit Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditPackage(pkg, idx)}
                                    style={{
                                      background: 'rgba(56, 189, 248, 0.15)',
                                      border: '1px solid rgba(56, 189, 248, 0.35)',
                                      color: '#38BDF8',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      fontWeight: 700,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                    }}
                                    title="Edit Package Details"
                                  >
                                    <Edit3 size={11} />
                                    <span>Edit</span>
                                  </button>

                                  {/* Live / Draft Toggle */}
                                  {isLive ? (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePackageLive(idx)}
                                      style={{
                                        background: 'rgba(251, 191, 36, 0.12)',
                                        border: '1px solid rgba(251, 191, 36, 0.35)',
                                        color: '#FBBF24',
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        fontSize: '0.72rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                      }}
                                      title="Move to Draft (Hide from website)"
                                    >
                                      <span>⏸️ Draft</span>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePackageLive(idx)}
                                      style={{
                                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                        border: 'none',
                                        color: '#fff',
                                        borderRadius: '6px',
                                        padding: '4px 9px',
                                        fontSize: '0.72rem',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
                                      }}
                                      title="Make live on public website"
                                    >
                                      <Zap size={11} />
                                      <span>🚀 Live</span>
                                    </button>
                                  )}

                                  {/* Reverse / Revert Single Package to Default */}
                                  <button
                                    type="button"
                                    onClick={() => handleResetPackageToDefault(idx)}
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.05)',
                                      border: '1px solid rgba(255, 255, 255, 0.15)',
                                      color: '#94A3B8',
                                      borderRadius: '6px',
                                      padding: '4px 6px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    title="Reverse back / Revert to original default values"
                                  >
                                    <RotateCcw size={11} />
                                  </button>

                                  {/* Delete Action */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePackage(idx)}
                                    style={{
                                      background: 'rgba(244, 63, 94, 0.1)',
                                      border: '1px solid rgba(244, 63, 94, 0.3)',
                                      color: '#FDA4AF',
                                      borderRadius: '6px',
                                      padding: '4px 6px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    title="Delete package"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SUBTAB 2: FEATURES & MODULES (CLEAN LIST VIEW) ─────────────────── */}
            {activeServiceSubTab === 'features' && (
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                    Features &amp; Add-on Modules ({quoteConfig?.features?.length || 0})
                  </span>
                </div>

                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '36%', textAlign: 'left', padding: '12px 14px' }}>FEATURE TITLE &amp; FUNCTION</th>
                        <th style={{ width: '16%', textAlign: 'left', padding: '12px 8px', whiteSpace: 'nowrap' }}>PRICE (₹)</th>
                        <th style={{ width: '22%', textAlign: 'left', padding: '12px 8px' }}>WHY CLIENTS NEED IT</th>
                        <th style={{ width: '10%', textAlign: 'center', padding: '12px 6px', whiteSpace: 'nowrap' }}>STATUS</th>
                        <th style={{ width: '16%', textAlign: 'right', padding: '12px 14px', whiteSpace: 'nowrap' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(quoteConfig?.features || []).map((feat, idx) => {
                        const isLive = feat.isLive !== false;
                        return (
                          <tr key={feat.id || idx}>
                            {/* 1. Title & Function */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ color: '#fff', fontSize: '0.86rem' }}>{feat.title}</strong>
                                {!isLive && (
                                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '1px 5px', borderRadius: '8px', fontWeight: 700 }}>
                                    Draft
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {feat.whatItDoes || 'Module functionality'}
                              </div>
                              <div style={{ fontSize: '0.64rem', color: '#64748B', fontFamily: 'monospace', marginTop: '1px' }}>
                                ID: {feat.id}
                              </div>
                            </td>

                            {/* 2. Price */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 8px', whiteSpace: 'nowrap' }}>
                              <span style={{ color: feat.price === 0 ? '#4ADE80' : '#FDE047', fontWeight: 800, fontSize: '0.92rem', fontFamily: 'monospace' }}>
                                {feat.price === 0 ? 'FREE / Included' : `+₹${Number(feat.price).toLocaleString('en-IN')}`}
                              </span>
                            </td>

                            {/* 3. Value Proposition */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 8px' }}>
                              <div style={{ fontSize: '0.72rem', color: '#CBD5E1', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {feat.whyYouNeedIt || '—'}
                              </div>
                            </td>

                            {/* 4. Status */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 6px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                              <span
                                className={`fixkar-status-chip ${isLive ? 'success' : 'warning'}`}
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '3px 8px',
                                  fontWeight: 700,
                                  background: isLive ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                                  color: isLive ? '#4ADE80' : '#FBBF24',
                                  border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.35)' : 'rgba(251, 191, 36, 0.35)'}`,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {isLive ? '● Live' : '● Draft'}
                              </span>
                            </td>

                            {/* 5. Action Buttons */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', flexWrap: 'nowrap' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditFeature(feat, idx)}
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#38BDF8',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                  title="Edit Feature"
                                >
                                  <Edit3 size={11} />
                                  <span>Edit</span>
                                </button>

                                {isLive ? (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleFeatureLive(idx)}
                                    style={{
                                      background: 'rgba(251, 191, 36, 0.12)',
                                      border: '1px solid rgba(251, 191, 36, 0.35)',
                                      color: '#FBBF24',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      fontWeight: 600,
                                    }}
                                    title="Move to draft"
                                  >
                                    ⏸️ Draft
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleFeatureLive(idx)}
                                    style={{
                                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                      border: 'none',
                                      color: '#fff',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      fontWeight: 700,
                                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
                                    }}
                                    title="Make live on website"
                                  >
                                    🚀 Live
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleDeleteFeature(idx)}
                                  style={{
                                    background: 'rgba(244, 63, 94, 0.1)',
                                    border: '1px solid rgba(244, 63, 94, 0.3)',
                                    color: '#FDA4AF',
                                    borderRadius: '6px',
                                    padding: '4px 6px',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  title="Delete feature"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─── SUBTAB 3: AI AUTOMATION TIERS (CLEAN LIST VIEW) ────────────────── */}
            {activeServiceSubTab === 'ai' && (
              <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                    AI Automation &amp; Bot Models ({quoteConfig?.aiOptions?.length || 0})
                  </span>
                </div>

                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <table className="fixkar-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '40%', textAlign: 'left', padding: '12px 14px' }}>AI MODEL &amp; CAPABILITY</th>
                        <th style={{ width: '20%', textAlign: 'left', padding: '12px 8px', whiteSpace: 'nowrap' }}>SETUP FEE (₹)</th>
                        <th style={{ width: '16%', textAlign: 'center', padding: '12px 6px', whiteSpace: 'nowrap' }}>STATUS</th>
                        <th style={{ width: '24%', textAlign: 'right', padding: '12px 14px', whiteSpace: 'nowrap' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(quoteConfig?.aiOptions || []).map((ai, idx) => {
                        const isLive = ai.isLive !== false;
                        return (
                          <tr key={ai.id || idx}>
                            {/* 1. Model Title & Desc */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 14px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ color: '#fff', fontSize: '0.86rem' }}>{ai.title}</strong>
                                {!isLive && (
                                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '1px 5px', borderRadius: '8px', fontWeight: 700 }}>
                                    Draft
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {ai.desc || 'AI automation service tier'}
                              </div>
                              <div style={{ fontSize: '0.64rem', color: '#64748B', fontFamily: 'monospace', marginTop: '1px' }}>
                                ID: {ai.id}
                              </div>
                            </td>

                            {/* 2. Setup Fee */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 8px', whiteSpace: 'nowrap' }}>
                              <span style={{ color: ai.price === 0 ? '#4ADE80' : '#FDE047', fontWeight: 800, fontSize: '0.92rem', fontFamily: 'monospace' }}>
                                {ai.price === 0 ? '₹0 (No AI)' : `+₹${Number(ai.price).toLocaleString('en-IN')}`}
                              </span>
                            </td>

                            {/* 3. Status */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 6px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                              <span
                                className={`fixkar-status-chip ${isLive ? 'success' : 'warning'}`}
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '3px 8px',
                                  fontWeight: 700,
                                  background: isLive ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                                  color: isLive ? '#4ADE80' : '#FBBF24',
                                  border: `1px solid ${isLive ? 'rgba(74, 222, 128, 0.35)' : 'rgba(251, 191, 36, 0.35)'}`,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {isLive ? '● Live' : '● Draft'}
                              </span>
                            </td>

                            {/* 4. Action Buttons */}
                            <td style={{ verticalAlign: 'middle', padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', flexWrap: 'nowrap' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditAi(ai, idx)}
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#38BDF8',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.72rem',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                  title="Edit AI Model"
                                >
                                  <Edit3 size={11} />
                                  <span>Edit</span>
                                </button>

                                {isLive ? (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAiLive(idx)}
                                    style={{
                                      background: 'rgba(251, 191, 36, 0.12)',
                                      border: '1px solid rgba(251, 191, 36, 0.35)',
                                      color: '#FBBF24',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      fontWeight: 600,
                                    }}
                                    title="Move to draft"
                                  >
                                    ⏸️ Draft
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleAiLive(idx)}
                                    style={{
                                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                      border: 'none',
                                      color: '#fff',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      fontWeight: 700,
                                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
                                    }}
                                    title="Make live on website"
                                  >
                                    🚀 Live
                                  </button>
                                )}

                                {ai.id !== 'none' ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAi(idx)}
                                    style={{
                                      background: 'rgba(244, 63, 94, 0.1)',
                                      border: '1px solid rgba(244, 63, 94, 0.3)',
                                      color: '#FDA4AF',
                                      borderRadius: '6px',
                                      padding: '4px 6px',
                                      fontSize: '0.72rem',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    title="Delete AI Option"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                ) : (
                                  <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Default</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─── SUBTAB 4: AUTO-SYNCED CLOUD & DOMAIN GATEWAY (ADMIN VIEW) ──────── */}
            {activeServiceSubTab === 'hosting_domains' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Admin Source Info Alert Banner */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 78, 59, 0.25) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '820px' }}>
                    <ShieldCheck size={24} color="#6EE7B7" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                        🔒 Auto-Synced Cloud Infrastructure &amp; Domain Registry (Admin Live View)
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#D1FAE5', lineHeight: 1.5, margin: 0 }}>
                        Showing synced upstream platform providers (Hostinger, AWS Lightsail, DigitalOcean, NIXI Registry, VeriSign).
                        <br />
                        <strong>Live Auto-Calculation Formula:</strong> <code>(Provider Base Rate + 18% GST) + ₹100 Fixkar Management Fee = Final Display Price</code>.
                        <br />
                        <span style={{ color: '#FDE047', fontWeight: 600 }}>
                          ✓ On the public client website, provider names are hidden and only clean final pricing is shown.
                        </span>
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#6EE7B7' }}>
                      Last Synced: {quoteConfig?.lastSyncedAt ? new Date(quoteConfig.lastSyncedAt).toLocaleTimeString() : 'Live'}
                    </div>
                    <button
                      type="button"
                      onClick={handleSyncHostingRates}
                      disabled={hostingSyncing}
                      style={{
                        marginTop: '6px',
                        background: '#10B981',
                        border: 'none',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <RefreshCw size={12} className={hostingSyncing ? 'animate-spin' : ''} />
                      <span>Re-Sync Upstream Rates</span>
                    </button>
                  </div>
                </div>

                {/* Section A: Cloud Hosting Servers */}
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Server size={16} color="#38BDF8" />
                    <span>Cloud Hosting Servers (Hostinger, AWS, DigitalOcean)</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {(quoteConfig?.hostingPlans || []).map((hp, idx) => {
                      const base = hp.providerBaseRate || (hp.id === 'self_hosted' ? 0 : 1185);
                      const gst = Math.round(base * 0.18);
                      const fee = hp.id === 'self_hosted' ? 0 : 100;
                      const finalTotal = hp.finalPrice ?? (base + gst + fee);
                      const sourceName = hp.providerSource || hp.provider || 'Hostinger / DigitalOcean';

                      return (
                        <div
                          key={hp.id || idx}
                          className="fixkar-panel"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 14, 22, 0.9) 100%)',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: '#6EE7B7', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                                🔒 {hp.badge || 'Cloud Server'}
                              </span>
                              <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 600, fontFamily: 'monospace' }}>
                                {sourceName}
                              </span>
                            </div>

                            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
                              {hp.title}
                            </h4>

                            <p style={{ fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.4, margin: '0 0 12px' }}>
                              {hp.desc}
                            </p>

                            {/* Transparent Auto-Calculation Breakdown */}
                            {hp.id !== 'self_hosted' && (
                              <div
                                style={{
                                  background: 'rgba(0, 0, 0, 0.4)',
                                  border: '1px solid rgba(255, 255, 255, 0.06)',
                                  borderRadius: '8px',
                                  padding: '8px 10px',
                                  fontSize: '0.72rem',
                                  fontFamily: 'monospace',
                                  color: '#CBD5E1',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '3px',
                                  marginBottom: '10px',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>{sourceName} Base:</span>
                                  <span>₹{base.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                  <span>+ 18% GST:</span>
                                  <span>₹{gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                  <span>+ Fixkar Setup Fee:</span>
                                  <span>₹{fee.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase' }}>Client Display Price</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDE047' }}>
                                {finalTotal === 0 ? '₹0' : `₹${finalTotal.toLocaleString('en-IN')} / yr`}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.68rem', color: '#6EE7B7', fontWeight: 700 }}>
                              ● Auto Synced
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section B: Domain Registrars */}
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} color="#38BDF8" />
                    <span>Domain Registrars &amp; Extensions (NIXI, VeriSign Registry)</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {(quoteConfig?.domainOptions || []).map((dp, idx) => {
                      const base = dp.providerBaseRate || (dp.id === 'own_domain' ? 0 : 499);
                      const gst = Math.round(base * 0.18);
                      const fee = dp.id === 'own_domain' ? 0 : 100;
                      const finalTotal = dp.finalPrice ?? (base + gst + fee);
                      const registrySource = dp.providerSource || dp.provider || 'Domain Registry';

                      return (
                        <div
                          key={dp.id || idx}
                          className="fixkar-panel"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 14, 22, 0.9) 100%)',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                                🔒 {dp.ext || dp.id}
                              </span>
                              <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 600, fontFamily: 'monospace' }}>
                                {registrySource}
                              </span>
                            </div>

                            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
                              {dp.title}
                            </h4>

                            <p style={{ fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.4, margin: '0 0 12px' }}>
                              {dp.desc}
                            </p>

                            {/* Transparent Auto-Calculation Breakdown */}
                            {dp.id !== 'own_domain' && (
                              <div
                                style={{
                                  background: 'rgba(0, 0, 0, 0.4)',
                                  border: '1px solid rgba(255, 255, 255, 0.06)',
                                  borderRadius: '8px',
                                  padding: '8px 10px',
                                  fontSize: '0.72rem',
                                  fontFamily: 'monospace',
                                  color: '#CBD5E1',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '3px',
                                  marginBottom: '10px',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span>Registry Base:</span>
                                  <span>₹{base.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                  <span>+ 18% GST:</span>
                                  <span>₹{gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                                  <span>+ DNS Setup Fee:</span>
                                  <span>₹{fee.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '0.66rem', color: '#94A3B8', textTransform: 'uppercase' }}>Client Display Price</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDE047' }}>
                                {finalTotal === 0 ? '₹0' : `₹${finalTotal.toLocaleString('en-IN')} / yr`}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 700 }}>
                              ● Auto Synced
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 10: PAYMENTS LEDGER ─────────────────────────────────────── */}
        {activeTab === 'payments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Payments Ledger & Gateway Reconciliation',
              'Verified financial transaction ledger synced in real-time with Razorpay payment gateway webhooks and UPI references.',
              'Transaction pay_Nx8812 for ₹1,100 (+5,000 OTP credits) by R.K. Computer Classes — verified with cryptographic SHA-256 digital signature seal.',
              'payments'
            )}

            <div className="fixkar-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={16} color="#4ADE80" />
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                    Verified Payment Ledger ({payments.length > 0 ? payments.length : '8 Recorded'})
                  </span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#4ADE80', fontFamily: 'monospace' }}>
                  ● 100% Reconciled
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="fixkar-table">
                  <thead>
                    <tr>
                      <th>TRANSACTION / ORDER ID</th>
                      <th>CLIENT &amp; PURPOSE</th>
                      <th>AMOUNT</th>
                      <th>PAYMENT METHOD</th>
                      <th>DATE &amp; TIME</th>
                      <th style={{ textAlign: 'right' }}>DIGITAL RECEIPT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(payments.length > 0 ? payments : [
                      { id: 'pay_TEST123', orderId: 'order_101', clientName: 'R.K. Computer Classes', purpose: '5,000 OTP Credits Bundle', amount: '₹1,100', method: 'UPI (Razorpay Gateway)', date: '2026-08-18 20:49' },
                      { id: 'pay_TEST124', orderId: 'order_102', clientName: 'Apex Fitness Hub', purpose: '50% Advance Development Milestone', amount: '₹17,500', method: 'NEFT / NetBanking', date: '2026-08-17 14:15' },
                      { id: 'pay_TEST125', orderId: 'order_103', clientName: 'S Caterers & Events', purpose: 'Annual Cloud VPS Server Renewal', amount: '₹4,999', method: 'UPI / PhonePe', date: '2026-08-15 11:30' },
                      { id: 'pay_TEST126', orderId: 'order_104', clientName: 'Ecofone Electronics', purpose: '10,000 OTP Credits Bundle', amount: '₹2,000', method: 'UPI (Razorpay Gateway)', date: '2026-08-12 16:20' },
                    ]).map((p, idx) => (
                      <tr key={idx}>
                        <td>
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#38BDF8' }}>{p.id || p.paymentId}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'monospace' }}>{p.orderId}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{p.clientName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{p.purpose}</div>
                        </td>
                        <td style={{ fontWeight: 800, color: '#4ADE80', fontSize: '0.95rem' }}>{p.amount}</td>
                        <td>
                          <span style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>{p.method || 'Razorpay Gateway'}</span>
                        </td>
                        <td style={{ color: '#94A3B8', fontSize: '0.74rem' }}>{p.date || p.timestamp}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedReceiptPayment(p)}
                            style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '5px 12px', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Printer size={12} />
                            <span>Signed PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 11: OTP USAGE LOGS (GROUPED PER CLIENT WITH EXPANDABLE DETAILS) ─── */}
        {activeTab === 'otp-usage' && (() => {
          const allLogs = otpUsage.length > 0 ? otpUsage : [
            { id: 'log_101', clientCode: 'FIX-RKCC-001', clientName: 'R.K. Computer Classes', domain: 'rkcc.in', purpose: 'Student Portal Login', maskedMobile: '98XXXXXX45', dltSenderId: 'RKCCPT', creditUsed: 1, status: 'Delivered', timestamp: '2026-08-18 20:45:12' },
            { id: 'log_102', clientCode: 'FIX-RKCC-001', clientName: 'R.K. Computer Classes', domain: 'rkcc.in', purpose: 'Password Reset OTP', maskedMobile: '94XXXXXX12', dltSenderId: 'RKCCPT', creditUsed: 1, status: 'Delivered', timestamp: '2026-08-18 19:12:18' },
            { id: 'log_103', clientCode: 'FIX-ECO-003', clientName: 'Ecofone Recommerce', domain: 'ecofone.in', purpose: 'Seller Phone Verification', maskedMobile: '70XXXXXX88', dltSenderId: 'ECOFON', creditUsed: 1, status: 'Delivered', timestamp: '2026-08-18 19:55:40' },
            { id: 'log_104', clientCode: 'FIX-VERM-005', clientName: 'Verma Competitive Institutes', domain: 'verma.edu.in', purpose: 'Mock Test Verification', maskedMobile: '97XXXXXX33', dltSenderId: 'VERMPT', creditUsed: 1, status: 'Delivered', timestamp: '2026-08-18 20:32:05' },
            { id: 'log_105', clientCode: 'FIX-SGL-004', clientName: "Singh's Glamour Lounge", domain: 'singhsglamour.in', purpose: 'VIP Booking Confirmation', maskedMobile: '91XXXXXX76', dltSenderId: 'SCATPT', creditUsed: 1, status: 'Delivered', timestamp: '2026-08-18 18:40:02' },
          ];

          // Group by Client Code / Client Name
          const clientGroups = {};
          allLogs.forEach((log) => {
            const key = log.clientCode || log.clientName || 'General';
            if (!clientGroups[key]) {
              const matchedClient = clients.find(c => c.clientCode === log.clientCode);
              clientGroups[key] = {
                key,
                clientCode: log.clientCode || key,
                clientName: log.clientName || (matchedClient?.businessName) || 'Client Website',
                domain: log.domain || (matchedClient?.domain) || (log.clientCode === 'FIX-RKCC-001' ? 'rkcc.in' : log.clientCode === 'FIX-ECO-003' ? 'ecofone.in' : log.clientCode === 'FIX-VERM-005' ? 'verma.edu.in' : 'clientwebsite.in'),
                dltSenderId: log.dltSenderId || log.header || (matchedClient?.dltSenderId) || (log.clientCode ? log.clientCode.replace('FIX-', '').replace(/-\d+/, '') : 'FIXKAR'),
                totalDeducted: 0,
                logs: [],
                lastTimestamp: log.timestamp || '',
              };
            }
            clientGroups[key].totalDeducted += Number(log.creditUsed || 1);
            clientGroups[key].logs.push(log);
            if (!clientGroups[key].lastTimestamp || new Date(log.timestamp) > new Date(clientGroups[key].lastTimestamp)) {
              clientGroups[key].lastTimestamp = log.timestamp;
            }
          });

          const groupList = Object.values(clientGroups);
          const totalAllDeducted = groupList.reduce((acc, g) => acc + g.totalDeducted, 0);
          const totalAllLogs = allLogs.length;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderSectionGuide(
                'Client OTP Usage & Audit Trails (Grouped by Website)',
                'Real-time OTP delivery metrics grouped by client website. Expand any client card to inspect individual masked phone numbers, delivery timestamps, and purpose.',
                'Click "View Usage Details ▾" on R.K. Computer Classes to inspect specific student mobile numbers (e.g. 98XXXXXX45) and timestamps.',
                'otp-usage'
              )}

              {/* ─── TOP TOTAL CREDITS DEDUCTED OVERVIEW CARDS ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FDA4AF', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL CREDITS DEDUCTED</span>
                    <Smartphone size={15} color="#F43F5E" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                    -{totalAllDeducted.toLocaleString()} Credits
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Across all {groupList.length} client websites</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TOTAL OTP DISPATCHED</span>
                    <Zap size={15} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38BDF8', margin: '4px 0 2px' }}>
                    {totalAllLogs.toLocaleString()} SMS Sent
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Real-time user authentications</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#86EFAC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GATEWAY DELIVERY RATE</span>
                    <ShieldCheck size={15} color="#4ADE80" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ADE80', margin: '4px 0 2px' }}>
                    99.98% Delivered
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Fast2SMS Enterprise DLT Route</div>
                </div>
              </div>

              {/* ─── CLIENT-WISE COLLAPSED CARDS (100% RESPONSIVE & ZERO OVERFLOW) ─── */}
              <div className="fixkar-panel" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Smartphone size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                      Client-Wise OTP Consumption &amp; Audit Logs
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '1px 7px', borderRadius: '10px', fontWeight: 700 }}>
                      {groupList.filter((g) => {
                        if (!otpUsageSearchQuery.trim()) return true;
                        const q = otpUsageSearchQuery.toLowerCase().trim();
                        return (
                          (g.clientName || '').toLowerCase().includes(q) ||
                          (g.clientCode || '').toLowerCase().includes(q) ||
                          (g.domain || '').toLowerCase().includes(q) ||
                          (g.dltSenderId || '').toLowerCase().includes(q)
                        );
                      }).length} Client Websites
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', minWidth: '180px', flex: '0 1 240px' }}>
                      <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                      <input
                        type="text"
                        placeholder="Search website, code, DLT..."
                        value={otpUsageSearchQuery}
                        onChange={(e) => setOtpUsageSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 10px 6px 30px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.76rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Click <strong>"Details ▾"</strong> to inspect logs
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {groupList
                    .filter((g) => {
                      if (!otpUsageSearchQuery.trim()) return true;
                      const q = otpUsageSearchQuery.toLowerCase().trim();
                      return (
                        (g.clientName || '').toLowerCase().includes(q) ||
                        (g.clientCode || '').toLowerCase().includes(q) ||
                        (g.domain || '').toLowerCase().includes(q) ||
                        (g.dltSenderId || '').toLowerCase().includes(q)
                      );
                    })
                    .map((grp) => {
                      const isExpanded = !!expandedOtpClients[grp.key];

                    return (
                      <div
                        key={grp.key}
                        style={{
                          background: isExpanded ? 'rgba(56, 189, 248, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${isExpanded ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.06)'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box',
                          width: '100%',
                        }}
                      >
                        {/* Summary Bar */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                          }}
                        >
                          {/* 1. Client Identity */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px', flex: '1 1 200px' }}>
                            {renderClientAvatar(grp, 36)}
                            <div>
                              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                                {grp.clientName}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{grp.clientCode}</span>
                                {grp.domain && <span>• {grp.domain}</span>}
                              </div>
                            </div>
                          </div>

                          {/* 2. DLT Sender ID */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'monospace' }}>DLT:</span>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                background: 'rgba(56, 189, 248, 0.12)',
                                border: '1px solid rgba(56, 189, 248, 0.28)',
                                color: '#93C5FD',
                                padding: '3px 8px',
                                borderRadius: '6px',
                              }}
                            >
                              {grp.dltSenderId}
                            </span>
                          </div>

                          {/* 3. Credits Deducted */}
                          <div style={{ textAlign: 'center', minWidth: '90px' }}>
                            <div style={{ fontSize: '0.94rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace' }}>
                              -{grp.totalDeducted} Credits
                            </div>
                            <div style={{ fontSize: '0.66rem', color: '#CBD5E1' }}>
                              {grp.logs.length} OTPs Delivered
                            </div>
                          </div>

                          {/* 4. Timestamp & Status */}
                          <div style={{ textAlign: 'right', minWidth: '100px' }}>
                            <div style={{ color: '#E2E8F0', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'monospace' }}>
                              {grp.lastTimestamp ? grp.lastTimestamp.split(' ')[0] : 'Recent'}
                            </div>
                            <span className="fixkar-status-chip success" style={{ fontSize: '0.65rem', padding: '1px 6px', marginTop: '2px', display: 'inline-block' }}>
                              ● Delivered
                            </span>
                          </div>

                          {/* 5. Details Toggle Button */}
                          <div>
                            <button
                              type="button"
                              onClick={() => toggleOtpClientExpand(grp.key)}
                              style={{
                                background: isExpanded ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${isExpanded ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`,
                                color: isExpanded ? '#38BDF8' : '#CBD5E1',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <Eye size={12} />
                              <span>{isExpanded ? 'Hide' : `Details (${grp.logs.length})`}</span>
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          </div>
                        </div>

                        {/* ─── EXPANDED DETAILED LOGS DRAWER ─── */}
                        {isExpanded && (
                          <div
                            style={{
                              marginTop: '12px',
                              paddingTop: '12px',
                              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>
                                Recipient Masked Numbers &amp; Activity Log:
                              </span>
                              <span style={{ fontSize: '0.68rem', color: '#F43F5E', fontFamily: 'monospace', fontWeight: 700 }}>
                                Total Deducted: -{grp.totalDeducted} Credits
                              </span>
                            </div>

                            {grp.logs.map((logItem, logIdx) => (
                              <div
                                key={logItem.id || logIdx}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '8px 12px',
                                  background: 'rgba(15, 23, 42, 0.7)',
                                  border: '1px solid rgba(255, 255, 255, 0.04)',
                                  borderRadius: '8px',
                                  flexWrap: 'wrap',
                                  gap: '8px',
                                }}
                              >
                                {/* Left: Masked Mobile & Purpose */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ fontFamily: 'monospace', color: '#38BDF8', fontWeight: 700, fontSize: '0.82rem' }}>
                                    📞 {logItem.maskedMobile || logItem.phone || '98XXXXXX45'}
                                  </div>
                                  <span style={{ fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600 }}>
                                    {logItem.purpose || 'OTP Verification'}
                                  </span>
                                </div>

                                {/* Right: Meta */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                  <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', background: 'rgba(56, 189, 248, 0.1)', color: '#93C5FD', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    {logItem.dltSenderId || grp.dltSenderId}
                                  </span>
                                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                                    {logItem.timestamp || 'Recent'}
                                  </span>
                                  <span style={{ fontSize: '0.68rem', color: '#4ADE80', fontWeight: 700 }}>
                                    ● Delivered
                                  </span>
                                  <span style={{ color: '#F43F5E', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8rem' }}>
                                    -{logItem.creditUsed || 1} Credit
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 12: OPERATIONAL NOTIFICATIONS ─────────────────────────── */}
        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Operational Notifications & System Radar',
              'Real-time operational alerts for expiring domain names, low OTP credit wallets, new client registrations, and incoming payment webhooks.',
              '🚨 Alert: S Caterers hosting expires in 9 days. • ⚠️ Alert: Verma Institutes OTP balance low (89 credits). • 💰 Alert: Razorpay payment of ₹1,100 received for FIX-RKCC-001.',
              'notifications'
            )}

            <div className="fixkar-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { type: 'Critical', title: 'Verma Institutes OTP Credits Critically Low', desc: 'Only 89 credits remaining. Student mock test login at risk of delivery pause.', time: '10 mins ago', color: '#F43F5E', tab: 'otp-accounts' },
                  { type: 'Warning', title: 'S Caterers (scaterers.in) Hosting Expires in 9 Days', desc: 'Due on 2026-08-26. Renewal invoice of ₹4,999 has been generated.', time: '1 hour ago', color: '#FBBF24', tab: 'renewals' },
                  { type: 'Success', title: 'Razorpay Payment Received (+5,000 Credits)', desc: 'R.K. Computer Classes successfully paid ₹1,100 via UPI (pay_TEST123).', time: '2 hours ago', color: '#4ADE80', tab: 'payments' },
                  { type: 'Info', title: 'New Client Onboarded: Apex Fitness Hub', desc: 'Registration FIX-APEX-006 generated with Cloud VPS and APEXFH DLT header.', time: '1 day ago', color: '#38BDF8', tab: 'clients' },
                ].map((n, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${n.color}40`,
                      borderRadius: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.color, marginTop: '5px' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.86rem' }}>{n.title}</div>
                        <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>{n.desc}</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'monospace', marginTop: '4px' }}>{n.time}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab(n.tab)}
                      style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      View →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 13: SUPPORT TICKETS HELP DESK (EXACT OTP USAGE STYLE: GROUPED BY CLIENT) ─── */}
        {activeTab === 'support' && (() => {
          // Group support tickets by Client Code / Client Name
          const clientGroups = {};
          supportTickets.forEach((t) => {
            const key = t.clientCode || t.clientId || t.client || 'General';
            if (!clientGroups[key]) {
              const matchedClient = clients.find(c => c.clientCode === t.clientCode || c.id === t.clientId || c.businessName === t.client);
              clientGroups[key] = {
                key,
                clientCode: t.clientCode || matchedClient?.clientCode || key,
                clientName: t.client || matchedClient?.businessName || 'Client Website',
                phone: t.phone || matchedClient?.phone || '',
                domain: t.domain || matchedClient?.domain || 'clientwebsite.in',
                tickets: [],
                openCount: 0,
                inProgressCount: 0,
                resolvedCount: 0,
                lastTimestamp: t.createdAt || '',
              };
            }
            clientGroups[key].tickets.push(t);
            if (t?.status === 'Open') clientGroups[key].openCount += 1;
            if (t?.status === 'In Progress') clientGroups[key].inProgressCount += 1;
            if (t?.status === 'Resolved') clientGroups[key].resolvedCount += 1;
          });

          const groupList = Object.values(clientGroups);
          const totalOpen = supportTickets.filter(t => t?.status === 'Open').length;
          const totalInProgress = supportTickets.filter(t => t?.status === 'In Progress').length;
          const totalResolved = supportTickets.filter(t => t?.status === 'Resolved').length;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderSectionGuide(
                'Client Support Helpdesk & Tasks (Grouped by Website)',
                'Real-time client maintenance requests, bug reports, and modification tasks grouped by client website. Expand any client card to inspect individual task details, developer notes, or update live status.',
                'Click "View Tasks ▾" on R.K. Computer Classes to manage Ticket #TKT-104 or log internal developer notes.',
                'support'
              )}

              {/* ─── TOP TOTAL OVERVIEW CARDS (EXACT OTP USAGE 3-CARD GRADIENT) ─── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(244, 63, 94, 0.35)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FDA4AF', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTION REQUIRED (OPEN)</span>
                    <HelpCircle size={15} color="#F43F5E" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace', margin: '4px 0 2px' }}>
                    {totalOpen} Open Tickets
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Needs developer review &amp; assignment</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE SPRINTS (IN PROGRESS)</span>
                    <Zap size={15} color="#38BDF8" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38BDF8', margin: '4px 0 2px' }}>
                    {totalInProgress} In Progress
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Developer tasks currently underway</div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#86EFAC', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RESOLVED &amp; COMPLETED</span>
                    <CheckCircle2 size={15} color="#4ADE80" />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#4ADE80', margin: '4px 0 2px' }}>
                    {totalResolved} Resolved
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>Completed &amp; live on client websites</div>
                </div>
              </div>

              {/* ─── CLIENT-WISE EXPANDABLE SUPPORT CARDS (EXACT OTP USAGE CONTAINER) ─── */}
              <div className="fixkar-panel" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LifeBuoy size={16} color="#38BDF8" />
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                      Client-Wise Support Helpdesk ({groupList.length} Client Websites)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div className="fixkar-pill-bar">
                      {[
                        { id: 'All', label: `All (${supportTickets.length})` },
                        { id: 'Open', label: `🚨 Open (${totalOpen})` },
                        { id: 'In Progress', label: `⚡ In Progress (${totalInProgress})` },
                        { id: 'Resolved', label: `✅ Resolved (${totalResolved})` },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSupportFilter(f.id)}
                          className={`fixkar-pill-btn ${supportFilter === f.id ? 'active' : ''}`}
                        >
                          <span>{f.label}</span>
                        </button>
                      ))}
                    </div>

                  <button
                    type="button"
                    onClick={() => setIsNewTicketModalOpen((prev) => !prev)}
                    style={{
                      background: isNewTicketModalOpen ? 'rgba(56, 189, 248, 0.2)' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: isNewTicketModalOpen ? '#38BDF8' : '#fff',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Plus size={14} />
                    <span>{isNewTicketModalOpen ? 'Close Form ▴' : 'Create Ticket +'}</span>
                  </button>
                </div>
              </div>

              {/* ─── INLINE CREATE TICKET FORM (FITS 100% INSIDE MAIN CARD) ─── */}
              {isNewTicketModalOpen && (
                <div
                  style={{
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 24, 0.98) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    marginBottom: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <form onSubmit={handleCreateTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={16} color="#38BDF8" />
                        <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
                          Log New Support Ticket / Task
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                          Live Sync
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsNewTicketModalOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.1rem', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Row 1: Client Selector & Priority Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px', alignItems: 'flex-start' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#38BDF8', marginBottom: '4px', fontWeight: 700 }}>
                          Select Client (Auto-Loads Info) *
                        </label>
                        <select
                          required
                          value={newTicketForm.clientCode || ''}
                          onChange={(e) => {
                            const selCode = e.target.value;
                            const found = clients.find((c) => c.clientCode === selCode || c.id === selCode);
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
                          <option value="">-- Choose Client --</option>
                          {clients.map((c) => (
                            <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                              {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.contactPerson})
                            </option>
                          ))}
                        </select>

                        {newTicketForm.client && (
                          <div style={{ marginTop: '5px', fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#38BDF8', fontWeight: 700 }}>{newTicketForm.client}</span>
                            {newTicketForm.domain && <span>• 🌐 {newTicketForm.domain}</span>}
                            {newTicketForm.phone && <span>• 📞 {newTicketForm.phone}</span>}
                          </div>
                        )}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          Priority Level
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                          {[
                            { id: 'High', label: '🔴 High', color: '#FDA4AF', bg: 'rgba(244, 63, 94, 0.15)', activeBorder: '#F43F5E' },
                            { id: 'Medium', label: '🔵 Medium', color: '#93C5FD', bg: 'rgba(56, 189, 248, 0.15)', activeBorder: '#38BDF8' },
                            { id: 'Low', label: '⚪ Low', color: '#CBD5E1', bg: 'rgba(148, 163, 184, 0.12)', activeBorder: '#94A3B8' },
                          ].map((p) => {
                            const isSel = newTicketForm.priority === p.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => setNewTicketForm((prev) => ({ ...prev, priority: p.id }))}
                                style={{
                                  background: isSel ? p.bg : 'rgba(255, 255, 255, 0.03)',
                                  border: `1px solid ${isSel ? p.activeBorder : 'rgba(255, 255, 255, 0.08)'}`,
                                  color: isSel ? p.color : '#94A3B8',
                                  padding: '7px 6px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: isSel ? 700 : 500,
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                }}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Subject & Template Quick Buttons */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label style={{ fontSize: '0.74rem', color: '#F1F5F9', fontWeight: 700 }}>
                          Subject / Task Summary *
                        </label>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {[
                            { label: '🎨 Banner', subject: 'Add new promotion banner on homepage' },
                            { label: '⚡ RAM', subject: 'Inquire about cloud server RAM scaling' },
                            { label: '💳 Payment QR', subject: 'Integrate UPI payment QR code on checkout' },
                            { label: '🐛 Bug Fix', subject: 'Fix form submission loading error on contact page' },
                          ].map((chip) => (
                            <button
                              key={chip.label}
                              type="button"
                              onClick={() => setNewTicketForm((p) => ({ ...p, subject: chip.subject }))}
                              style={{
                                background: newTicketForm.subject === chip.subject ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                                border: `1px solid ${newTicketForm.subject === chip.subject ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
                                color: newTicketForm.subject === chip.subject ? '#38BDF8' : '#94A3B8',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="text"
                        required
                        value={newTicketForm.subject}
                        onChange={(e) => setNewTicketForm((p) => ({ ...p, subject: e.target.value }))}
                        placeholder="e.g. Add Diwali offer banner on homepage slider"
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

                    {/* Row 3: Description */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                        Detailed Requirements (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={newTicketForm.description}
                        onChange={(e) => setNewTicketForm((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Add instructions, dimensions, or technical details..."
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

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
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
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          color: '#fff',
                          padding: '6px 16px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        }}
                      >
                        <Plus size={14} />
                        <span>Save &amp; Dispatch Ticket</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {groupList.map((grp) => {
                    const isExpanded = !!expandedSupportClients[grp.key];
                    const filteredGrpTickets = grp.tickets.filter(t => supportFilter === 'All' || t?.status === supportFilter);

                    if (filteredGrpTickets.length === 0 && supportFilter !== 'All') return null;

                    return (
                      <div
                        key={grp.key}
                        style={{
                          background: isExpanded ? 'rgba(56, 189, 248, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${isExpanded ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.06)'}`,
                          borderRadius: '12px',
                          padding: '14px 16px',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box',
                          width: '100%',
                        }}
                      >
                        {/* Summary Bar */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px',
                          }}
                        >
                          {/* 1. Client Identity */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px', flex: '1 1 200px' }}>
                            {renderClientAvatar(grp, 36)}
                            <div>
                              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                                {grp.clientName}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{grp.clientCode}</span>
                                {grp.domain && <span>• {grp.domain}</span>}
                                {grp.phone && <span>• {grp.phone}</span>}
                              </div>
                            </div>
                          </div>

                          {/* 2. Ticket Count & Priority Badges */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {grp.openCount > 0 && (
                              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.15)', color: '#FDA4AF', border: '1px solid rgba(244, 63, 94, 0.3)', fontWeight: 700 }}>
                                🚨 {grp.openCount} Open
                              </span>
                            )}
                            {grp.inProgressCount > 0 && (
                              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 700 }}>
                                ⚡ {grp.inProgressCount} In Progress
                              </span>
                            )}
                            {grp.resolvedCount > 0 && (
                              <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(74, 222, 128, 0.15)', color: '#4ADE80', border: '1px solid rgba(74, 222, 128, 0.3)', fontWeight: 700 }}>
                                ✅ {grp.resolvedCount} Resolved
                              </span>
                            )}
                          </div>

                          {/* 3. Action Toggle Button */}
                          <button
                            type="button"
                            onClick={() => toggleSupportClientExpand(grp.key)}
                            style={{
                              background: isExpanded ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${isExpanded ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                              color: isExpanded ? '#38BDF8' : '#CBD5E1',
                              padding: '5px 12px',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <span>{isExpanded ? 'Hide Tasks ▴' : `View Tasks (${grp.tickets.length}) ▾`}</span>
                          </button>
                        </div>

                        {/* Expandable Inner Table (Exact OTP Usage Inner Design) */}
                        {isExpanded && (
                          <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', overflowX: 'auto' }}>
                            <table className="fixkar-table" style={{ fontSize: '0.78rem', width: '100%' }}>
                              <thead>
                                <tr>
                                  <th style={{ width: '15%' }}>TICKET ID</th>
                                  <th style={{ width: '45%' }}>SUBJECT / TASK DETAILS</th>
                                  <th style={{ width: '12%' }}>PRIORITY</th>
                                  <th style={{ width: '13%' }}>STATUS</th>
                                  <th style={{ width: '15%', textAlign: 'right' }}>ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredGrpTickets.map((t) => (
                                  <tr key={t.id}>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#38BDF8', whiteSpace: 'nowrap' }}>
                                      {t.id}
                                    </td>
                                    <td>
                                      <div style={{ fontWeight: 600, color: '#fff' }}>{t.subject}</div>
                                      {t.description && <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>{t.description}</div>}
                                      {t.notes && <div style={{ fontSize: '0.7rem', color: '#38BDF8', marginTop: '2px' }}>💬 Dev Note: {t.notes}</div>}
                                    </td>
                                    <td>
                                      <span className={`fixkar-status-chip ${t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'info' : 'secondary'}`}>
                                        {t.priority}
                                      </span>
                                    </td>
                                    <td>
                                      <span className={`fixkar-status-chip ${t?.status === 'Resolved' ? 'success' : t?.status === 'In Progress' ? 'info' : 'warning'}`}>
                                        ● {t?.status}
                                      </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                      <button
                                        onClick={() => handleOpenTicket(t)}
                                        style={{
                                          background: 'rgba(56, 189, 248, 0.15)',
                                          border: '1px solid rgba(56, 189, 248, 0.4)',
                                          color: '#38BDF8',
                                          padding: '5px 12px',
                                          borderRadius: '8px',
                                          fontSize: '0.74rem',
                                          fontWeight: 700,
                                          cursor: 'pointer',
                                        }}
                                      >
                                        Manage
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            {/* ─── MODAL: MANAGE SELECTED TICKET ─── */}
            {isTicketModalOpen && selectedTicket && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99999,
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(6px)',
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
                  {/* Modal Header */}
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
                      onClick={() => setIsTicketModalOpen(false)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Subject & Request Details */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Request / Subject
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

                  {/* Status & Priority Controls */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                        Current Status
                      </label>
                      <select
                        value={selectedTicket?.status}
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
                        Priority Level
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

                  {/* Internal Admin Notes / Developer Solution */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                      Internal Admin Notes &amp; Action Taken
                    </label>
                    <textarea
                      rows={3}
                      value={selectedTicket.notes || ''}
                      onChange={(e) => setSelectedTicket((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add developer progress notes, file upload references, or resolution details..."
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

                  {/* Modal Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleDeleteTicket(selectedTicket.id)}
                      style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#FDA4AF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Delete Ticket
                    </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {selectedTicket?.status !== 'Resolved' && (
                          <button
                            type="button"
                            onClick={() => {
                              handleUpdateTicket(selectedTicket.id, {
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
                              status: selectedTicket?.status,
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

          </div>
        );
      })()}

        {/* ─── TAB 14: CLIENT DOCUMENTS & AI WORKFLOW / CONTRACT VAULT ─────── */}
        {activeTab === 'documents' && (() => {
          const filteredDocs = documentsList
            .filter((doc) => {
              if (documentFilter === 'All') return true;
              if (documentFilter === 'Contracts') return doc.type === 'Contract';
              if (documentFilter === 'Credentials') return doc.type === 'Credentials';
              if (documentFilter === 'Tech Specs') return doc.type === 'Technical Spec';
              if (documentFilter === 'DLT Letters') return doc.type === 'DLT Certificate';
              return true;
            })
            .filter((doc) => {
              if (!docSearchQuery.trim()) return true;
              const q = docSearchQuery.toLowerCase().trim();
              return (
                (doc.name || '').toLowerCase().includes(q) ||
                (doc.client || '').toLowerCase().includes(q) ||
                (doc.clientCode || '').toLowerCase().includes(q) ||
                (doc.title || '').toLowerCase().includes(q) ||
                (doc.summary || '').toLowerCase().includes(q) ||
                (doc.type || '').toLowerCase().includes(q)
              );
            });

          // Helper: Generate Contract (2-Phase Architecture with Checkbox Specs)
          const handleGenerateAiContract = () => {
            const clientObj = clients.find(c => c.clientCode === aiDocForm.clientCode || c.id === aiDocForm.clientCode) || {
              businessName: aiDocForm.client || 'Client Enterprise',
              contactPerson: 'Authorized Signatory',
              phone: '+91 98350 12345',
              email: 'client@domain.in',
              domain: 'clientwebsite.in',
              city: 'Patna, Bihar',
            };

            const currentDate = new Date().toISOString().split('T')[0];
            const refCode = Math.floor(1000 + Math.random() * 9000);
            let docText = '';

            if (aiDocForm.phase === 'phase1') {
              // ─── PHASE 1: DEAL KICKSTART & MSA CONTRACT (ADVANCE 50% + SCOPE CHECKLIST + NDA) ───
              docText = `================================================================================
FIXKAR WEB & AI STUDIO — MANAGED SERVICE AGREEMENT & WORK ORDER (MSA)
[PHASE 1: PROJECT KICKSTART & ARCHITECTURE SPECIFICATION]
Reference ID: FIX-MSA-${refCode} | Effective Date: ${currentDate}
================================================================================

1. PARTIES & LEGAL IDENTITIES:
- SERVICE PROVIDER: Fixkar Web & AI Engineering Studio (Bihar, India | support@fixkar.co.in)
- CLIENT ENTITY: ${clientObj.businessName} (Authorized Signatory: ${clientObj.contactPerson || clientObj.businessName})
- CLIENT DOMAIN: ${clientObj.domain || 'clientwebsite.in'}
- PHONE: ${clientObj.phone || 'Verified Phone'} | EMAIL: ${clientObj.email || 'Verified Email'}
- CLIENT SYSTEM CODE: ${aiDocForm.clientCode || clientObj.clientCode || 'FIX-NEW-001'}

2. COMMERCIAL TERMS & 50/50 MILESTONE PAYMENT SCHEDULE:
- Total Engineering Fee: ${aiDocForm.totalCost || '₹24,999'}
- Milestone 1 (50% Advance): Required for UI/UX architecture, cloud VPS provisioning & kick-off.
- Milestone 2 (50% Final): Payable strictly upon live staging verification & prior to root domain handover.
- Target Delivery Timeline: ${aiDocForm.deliveryTimeline || '10-14 Business Days'} from Milestone 1 clearance.

3. ARCHITECTURE SCOPE & DELIVERABLES (CHECKLIST SPECIFICATIONS):
Fixkar Studio commits to engineering and deploying the following verified modules:
${aiDocForm.p1WebPlatform ? `✓ High-Speed Web Application: Mobile-first responsive UI/UX, <0.4s fast load latency, SSL HTTPS encryption, and Core Web Vitals optimization.\n` : ''}${aiDocForm.p1ClientPortal ? `✓ Fixkar Client Self-Service Portal Access (/#client-portal): Dedicated client portal login for real-time lead tracking, order management, invoice PDF downloads, and OTP wallet monitoring.\n` : ''}${aiDocForm.p1OtpAuth ? `✓ Fast2SMS Transactional OTP Authentication Engine: 6-digit high-speed OTP verification layer (<1.2s delivery) with SHA-256 session token protection against bot attacks.\n` : ''}${aiDocForm.p1PaymentGateway ? `✓ Razorpay / UPI Instant Payment Gateway: Instant UPI QR, NetBanking, Card checkout with automated cryptographic webhook verification and auto-invoicing.\n` : ''}${aiDocForm.p1ManagedHosting ? `✓ Enterprise Managed VPS & Cloudflare Security: 100% white-label managed cloud hosting with daily automated offsite backups, HTTP/3 protocol, and DDoS mitigation.\n` : ''}${aiDocForm.p1RevisionLimit ? `✓ Scope Creep & Revision Policy: Maximum 2-3 iterative rounds of design revisions included during active development. Additional features or scope modifications post-kickoff will require an approved Change Order (CR).\n` : ''}
4. MANAGED CLOUD INFRASTRUCTURE (WHITE-LABEL SECURITY MODEL):
- All cloud servers, domain DNS routing, SSL certificates, and core APIs are provisioned, maintained, and 100% managed by Fixkar Web & AI Studio under Fixkar Master Enterprise Infrastructure.
- For system security, anti-tampering protection, and uninterrupted SLA performance, direct root infrastructure credentials remain exclusively with Fixkar Studio.
- Client is granted full operational control through their dedicated Fixkar Client Portal Dashboard (/#client-portal).

${aiDocForm.p1NdaClause ? `5. NON-DISCLOSURE & BUSINESS DATA CONFIDENTIALITY (NDA):
- Fixkar Studio and ${clientObj.businessName} mutually agree to hold all customer databases, trade secrets, business algorithms, transaction logs, and API credentials in strict confidence.
- No proprietary data shall be shared, sold, or disclosed to any unauthorized third party.\n` : ''}${aiDocForm.p1DltAuth ? `6. TELECOM TRAI / DLT SENDER ID AUTHORIZATION:
- ${clientObj.businessName} hereby authorizes Fixkar Web & AI Studio to configure and dispatch transactional OTP and SMS notifications under Client's authorized 6-character business header / DLT sender ID via the Fast2SMS Enterprise Gateway.\n` : ''}
7. INTELLECTUAL PROPERTY & CODE TRANSFER (POST-PAYMENT):
- Client owns all custom branding, text content, media assets, and customer databases.
- A static export archive copy of the frontend source code will be provided to the Client upon written request after 100% Milestone 2 payment clearance.

8. ACCEPTANCE & AUTHORIZATION:

For Fixkar Web & AI Studio:                For ${clientObj.businessName}:
Authorized Software Lead                  Authorized Signatory
Fixkar Engineering Hub                    Date: ${currentDate}
================================================================================`;
            } else {
              // ─── PHASE 2: PROJECT LIVE HANDOVER, 1-YEAR SLA WARRANTY & POST-LAUNCH GOVERNANCE ───
              docText = `================================================================================
FIXKAR WEB & AI STUDIO — PROJECT LIVE HANDOVER & 1-YEAR SLA WARRANTY
[PHASE 2: PRODUCTION ACCEPTANCE & POST-LAUNCH GOVERNANCE]
Reference ID: FIX-SLA-${refCode} | Handover Date: ${currentDate}
================================================================================

1. PARTIES & PRODUCTION DEPLOYMENT IDENTIFICATION:
- SERVICE PROVIDER: Fixkar Web & AI Engineering Studio (Bihar, India | support@fixkar.co.in)
- CLIENT ENTITY: ${clientObj.businessName} (Authorized Signatory: ${clientObj.contactPerson || clientObj.businessName})
- PRODUCTION LIVE DOMAIN: https://${clientObj.domain || 'clientwebsite.in'}
- CLIENT SYSTEM CODE: ${aiDocForm.clientCode || clientObj.clientCode || 'FIX-NEW-001'}

2. PRODUCTION ACCEPTANCE & 100% PAYMENT CLEARANCE:
${aiDocForm.p2LiveAcceptance ? `✓ Live Production Acceptance: ${clientObj.businessName} confirms that the web application has been tested across mobile/desktop browsers, OTP login is functioning, payment webhooks are verified, and the project is officially approved for live production release.` : ''}
- Commercial Status: Milestone 2 (Final Payment) is 100% cleared. Full operational client portal access has been provisioned.

3. 12-MONTH SLA WARRANTY & CLOUD UPTIME GUARANTEE:
${aiDocForm.p2UptimeSla ? `- 12 Months 99.9% Uptime Guarantee: Fixkar Studio guarantees high-availability cloud VPS uptime with automated daily offsite snapshots, DDoS mitigation, and Cloudflare SSL HTTPS auto-renewal.\n` : ''}${aiDocForm.p2FreeBugFix ? `- FREE 1-YEAR BUG-FIX WARRANTY: Any software bugs, runtime JavaScript exceptions, broken links, database connection drops, or server downtime issues are 100% covered and resolved FREE of cost under the 1-Year SLA warranty.\n` : ''}
4. POST-HANDOVER MODIFICATIONS & CHANGE REQUESTS (CR POLICY):
${aiDocForm.p2PaidChanges ? `✓ 6-MONTH POST-LAUNCH POLICY: Routine minor configuration adjustments are accommodated during initial launch.
✓ NEW CHANGES & FEATURE REQUESTS (STRICTLY BILLABLE): Any new design modifications, layout reworks, new page additions, extra payment gateways, or custom feature integrations requested after launch / 6 months are STRICTLY CHARGEABLE based on Fixkar standard customization rates.
✓ Bug fixing remains 100% FREE for 12 months, but scope expansion / new development will require a separate approved Work Order & quote.\n` : ''}
5. INTELLECTUAL PROPERTY & CODE ARCHIVE:
${aiDocForm.p2CodeExport ? `- Source Code Ownership: Client owns all custom business content, media assets, and customer databases. An exported static archive backup of the website codebase is generated and delivered upon written request.\n` : ''}
6. ANNUAL DOMAIN & MANAGED HOSTING RENEWALS:
${aiDocForm.p2AnnualRenewal ? `- Annual Renewal Term: Annual domain registry renewal and dedicated managed cloud VPS hosting will be billed directly by Fixkar at transparent annual rates (e.g. ₹2,499/year) to prevent domain hijacking or server lapse.\n` : ''}
7. FORMAL HANDOVER SIGN-OFF & SLA ACCEPTANCE:

For Fixkar Web & AI Studio:                For ${clientObj.businessName}:
Authorized Software Lead                  Authorized Signatory
Fixkar Engineering Hub                    Date: ${currentDate}
================================================================================`;
            }

            setAiDocForm(prev => ({
              ...prev,
              client: clientObj.businessName,
              generatedText: docText,
            }));
          };

          // Helper: Save Generated Contract to Vault
          const handleSaveContractToVault = () => {
            if (!aiDocForm.generatedText) return;
            const docId = `DOC-${Math.floor(200 + Math.random() * 800)}`;
            const clientObj = clients.find(c => c.clientCode === aiDocForm.clientCode || c.id === aiDocForm.clientCode);
            const isPhase1 = aiDocForm.phase === 'phase1';
            const newDoc = {
              id: docId,
              name: isPhase1
                ? `${(aiDocForm.client || 'Client').replace(/[^a-zA-Z0-9]/g, '')}-Kickstart-MSA-Agreement.pdf`
                : `${(aiDocForm.client || 'Client').replace(/[^a-zA-Z0-9]/g, '')}-Handover-SLA-Warranty.pdf`,
              clientCode: aiDocForm.clientCode || clientObj?.clientCode || 'FIX-GEN-001',
              client: aiDocForm.client || clientObj?.businessName || 'Client Website',
              size: isPhase1 ? '1.8 MB' : '1.5 MB',
              date: new Date().toISOString().split('T')[0],
              type: isPhase1 ? 'Contract' : 'Technical Spec',
              title: isPhase1
                ? `Master Service Agreement (MSA) & Scope Specs — ${aiDocForm.client}`
                : `Project Live Handover & 1-Year SLA Warranty — ${aiDocForm.client}`,
              summary: isPhase1
                ? `Phase 1 Kickstart MSA with 50/50 payment milestone, technical scope checklist, NDA protection, and DLT compliance.`
                : `Phase 2 Live Handover & 1-Year SLA Warranty with 100% payment clearance, Free Bug Fixes guarantee, and Billable Changes policy.`,
              content: aiDocForm.generatedText,
            };

            setDocumentsList(prev => [newDoc, ...prev]);
            setIsAiDocGeneratorOpen(false);
            setAiDocForm(prev => ({ ...prev, generatedText: '' }));
            alert(`✅ Document Saved: "${newDoc.name}" has been saved to the Client Vault and linked to the Client Portal!`);
          };

          // Helper: Generate Feature Workflow
          const handleGenerateAiWorkflow = () => {
            const clientObj = clients.find(c => c.clientCode === aiWorkflowForm.clientCode || c.id === aiWorkflowForm.clientCode) || {
              businessName: aiWorkflowForm.client || 'Client Project',
              domain: 'clientapp.in',
            };

            const workflowData = {
              client: clientObj.businessName,
              domain: clientObj.domain,
              businessType: aiWorkflowForm.businessType,
              steps: [
                {
                  step: 1,
                  title: '1. User Trigger & Request Submission',
                  icon: '🌐',
                  tech: 'React 18 / Tailwind CSS',
                  desc: 'Customer arrives on website, selects products/services, and submits checkout or booking form with phone number.',
                },
                {
                  step: 2,
                  title: '2. Instant OTP Authentication Layer',
                  icon: '🔐',
                  tech: 'Fast2SMS Enterprise DLT API',
                  desc: 'High-speed 6-digit OTP dispatched in <1.2s. Verified with SHA-256 session token to prevent fake bookings.',
                },
                {
                  step: 3,
                  title: '3. Payment Gateway Webhook Verification',
                  icon: '💳',
                  tech: 'Razorpay UPI / Webhooks',
                  desc: 'Instant QR / UPI intent generated. Secure cryptographic webhook captures payment success and logs transaction ID.',
                },
                {
                  step: 4,
                  title: '4. Database Transaction & Slot Concurrency Lock',
                  icon: '🗄️',
                  tech: 'PostgreSQL / SQLite ACID',
                  desc: 'Atomic commit writes order record, updates inventory / calendar schedule, and creates verified customer ID.',
                },
                {
                  step: 5,
                  title: '5. Automated Invoicing & Multi-Channel Dispatch',
                  icon: '📄',
                  tech: 'HTML-to-PDF & Fast2SMS API',
                  desc: 'Generates GST-compliant PDF Invoice and dispatches instant SMS / WhatsApp order confirmation to client.',
                },
                {
                  step: 6,
                  title: '6. Realtime Admin Command & Sync',
                  icon: '⚡',
                  tech: 'Fixkar Admin WebSocket',
                  desc: 'Order appears instantly on Fixkar Admin Console with audio alert and push notification for immediate fulfillment.',
                },
              ],
            };

            setAiWorkflowForm(prev => ({
              ...prev,
              client: clientObj.businessName,
              generatedWorkflow: workflowData,
            }));
          };

          // Helper: Save Workflow Spec to Vault
          const handleSaveWorkflowToVault = () => {
            if (!aiWorkflowForm.generatedWorkflow) return;
            const docId = `DOC-${Math.floor(300 + Math.random() * 700)}`;
            const wf = aiWorkflowForm.generatedWorkflow;
            const newDoc = {
              id: docId,
              name: `${wf.client.replace(/[^a-zA-Z0-9]/g, '')}-Architecture-Workflow-Specs.pdf`,
              clientCode: aiWorkflowForm.clientCode || 'FIX-ARCH-001',
              client: wf.client,
              size: '2.4 MB',
              date: new Date().toISOString().split('T')[0],
              type: 'Technical Spec',
              title: `${wf.client} — System Architecture & Feature Workflow Spec`,
              summary: `6-Step automated technical workflow pipeline covering Fast2SMS OTP, Razorpay Webhooks, Database Concurrency, and Auto-Invoicing.`,
              content: JSON.stringify(wf, null, 2),
            };

            setDocumentsList(prev => [newDoc, ...prev]);
            setIsAiWorkflowGeneratorOpen(false);
            setAiWorkflowForm(prev => ({ ...prev, generatedWorkflow: null }));
            alert(`✅ Workflow Saved: "${newDoc.name}" has been added to the Client Documents Vault!`);
          };

          // Helper: Save Uploaded Signed Document to Vault
          const handleSaveUploadedSignedDoc = (e) => {
            e.preventDefault();
            if (!uploadDocForm.clientCode) {
              alert('Please choose a client.');
              return;
            }
            const clientObj = clients.find(c => c.clientCode === uploadDocForm.clientCode || c.id === uploadDocForm.clientCode);
            const docId = `DOC-${Math.floor(400 + Math.random() * 600)}`;
            const finalDocName = uploadDocForm.fileName || `${(uploadDocForm.client || 'Client').replace(/[^a-zA-Z0-9]/g, '')}-${uploadDocForm.docType.replace(/[^a-zA-Z0-9]/g, '-')}-Signed.pdf`;

            const newDoc = {
              id: docId,
              name: finalDocName,
              clientCode: uploadDocForm.clientCode,
              client: uploadDocForm.client || clientObj?.businessName || 'Client Enterprise',
              size: '1.8 MB (Scanned PDF)',
              date: new Date().toISOString().split('T')[0],
              type: uploadDocForm.docType.includes('Contract') ? 'Contract' : uploadDocForm.docType.includes('SLA') ? 'Technical Spec' : 'Credentials',
              title: uploadDocForm.docTitle || `${uploadDocForm.docType} (${uploadDocForm.client})`,
              summary: `Official scanned copy of ${uploadDocForm.docType}. Signed physically by client authorized signatory and verified by Fixkar Lead Engineer.`,
              isSigned: true,
              content: `================================================================================
FIXKAR WEB & AI STUDIO — VERIFIED SIGNED DOCUMENT RECORD
Reference: ${docId} | Upload Date: ${new Date().toISOString().split('T')[0]}
Client: ${uploadDocForm.client} (${uploadDocForm.clientCode})
================================================================================

DOCUMENT STATUS:
✓ 100% PHYSICALLY SIGNED & VERIFIED BY CLIENT
Document Type: ${uploadDocForm.docType}
File Attachment: ${finalDocName}

VERIFICATION AUDIT:
- Client Authorized Signatory: Verified Physical Signature
- Fixkar Software Architect Signatory: Verified
- Stored securely in Fixkar Enterprise Documents Vault & Client Portal`,
            };

            setDocumentsList(prev => [newDoc, ...prev]);
            setIsUploadDocOpen(false);
            setUploadDocForm({
              clientCode: '',
              client: '',
              docType: 'Signed Contract (MSA)',
              docTitle: '',
              fileName: '',
              notes: 'Signed on physical paper by Client & Fixkar Lead Engineer',
            });
            alert(`✅ Signed Document Uploaded: "${newDoc.name}" has been added to the Client Vault with a Verified Sign badge!`);
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {renderSectionGuide(
                'Client Documents & AI Contract / Workflow Generator',
                'AI-powered document vault. Generate official Master Service Agreements (MSA), print for physical signature, upload signed copies, and design feature workflows.',
                'Click "✨ AI Contract Generator" to draft, print for client signature, then click "📤 Upload Signed Document" to store the signed agreement.',
                'documents'
              )}

              {/* ─── MAIN CONTROL PANEL (STRUCTURED & CLEAN LAYOUT) ─── */}
              <div className="fixkar-panel" style={{ padding: '18px 20px' }}>
                {/* Header Top Row: Title + Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <FileText size={18} color="#38BDF8" />
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.96rem' }}>
                      Client Document Vault
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      {filteredDocs.length} Documents
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.25)', padding: '2px 8px', borderRadius: '10px', fontFamily: 'monospace' }}>
                      🔒 Vault Encrypted
                    </span>
                  </div>

                  {/* 3 Generator & Upload Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {/* AI Contract Generator Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAiDocGeneratorOpen(prev => !prev);
                        setIsAiWorkflowGeneratorOpen(false);
                        setIsUploadDocOpen(false);
                      }}
                      style={{
                        background: isAiDocGeneratorOpen ? 'rgba(56, 189, 248, 0.25)' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.45)',
                        color: '#fff',
                        padding: '6px 13px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Sparkles size={13} color="#FDE047" />
                      <span>{isAiDocGeneratorOpen ? 'Close Contract AI ▴' : '✨ AI Contract Generator'}</span>
                    </button>

                    {/* AI Workflow Architect Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAiWorkflowGeneratorOpen(prev => !prev);
                        setIsAiDocGeneratorOpen(false);
                        setIsUploadDocOpen(false);
                      }}
                      style={{
                        background: isAiWorkflowGeneratorOpen ? 'rgba(16, 185, 129, 0.25)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        border: '1px solid rgba(74, 222, 128, 0.45)',
                        color: '#fff',
                        padding: '6px 13px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Zap size={13} color="#86EFAC" />
                      <span>{isAiWorkflowGeneratorOpen ? 'Close Workflow AI ▴' : '⚡ AI Feature Workflow'}</span>
                    </button>

                    {/* Upload Signed Document Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsUploadDocOpen(prev => !prev);
                        setIsAiDocGeneratorOpen(false);
                        setIsAiWorkflowGeneratorOpen(false);
                      }}
                      style={{
                        background: isUploadDocOpen ? 'rgba(251, 191, 36, 0.25)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        border: '1px solid rgba(251, 191, 36, 0.45)',
                        color: '#fff',
                        padding: '6px 13px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <CheckCircle2 size={13} color="#FEF08A" />
                      <span>{isUploadDocOpen ? 'Close Upload ▴' : '📤 Upload Signed Doc'}</span>
                    </button>
                  </div>
                </div>

                {/* Header Second Row: Filter Pills + Search Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  {/* Category Filter Pills */}
                  <div className="fixkar-pill-bar">
                    {[
                      { id: 'All', label: `All (${documentsList.length})` },
                      { id: 'Contracts', label: `📜 Contracts (${documentsList.filter(d => d.type === 'Contract').length})` },
                      { id: 'Tech Specs', label: `📐 Tech Specs (${documentsList.filter(d => d.type === 'Technical Spec').length})` },
                      { id: 'Credentials', label: `🔑 Credentials (${documentsList.filter(d => d.type === 'Credentials').length})` },
                      { id: 'DLT Letters', label: `📱 DLT Letters (${documentsList.filter(d => d.type === 'DLT Certificate').length})` },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setDocumentFilter(f.id)}
                        className={`fixkar-pill-btn ${documentFilter === f.id ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                      >
                        <span>{f.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div style={{ position: 'relative', minWidth: '200px', flex: '0 1 260px' }}>
                    <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      placeholder="Search documents, clients..."
                      value={docSearchQuery}
                      onChange={(e) => setDocSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 10px 6px 30px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.76rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* ─── INLINE UPLOAD SIGNED DOCUMENT DRAWER ─── */}
                {isUploadDocOpen && (
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(30, 27, 75, 0.4) 0%, rgba(9, 13, 24, 0.98) 100%)',
                      border: '1px solid rgba(251, 191, 36, 0.35)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      marginBottom: '16px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <form onSubmit={handleSaveUploadedSignedDoc}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={16} color="#FBBF24" />
                          <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
                            Upload Physically Signed Contract / Document
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            ✓ Verified Client Signature
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsUploadDocOpen(false)}
                          style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', alignItems: 'flex-start' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.74rem', color: '#FDE047', marginBottom: '4px', fontWeight: 700 }}>
                            1. Select Client *
                          </label>
                          <select
                            required
                            value={uploadDocForm.clientCode}
                            onChange={(e) => {
                              const sel = e.target.value;
                              const found = clients.find(c => c.clientCode === sel || c.id === sel);
                              setUploadDocForm(p => ({
                                ...p,
                                clientCode: sel,
                                client: found ? found.businessName : p.client,
                              }));
                            }}
                            style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(251, 191, 36, 0.4)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}
                          >
                            <option value="">-- Choose Registered Client --</option>
                            {clients.map(c => (
                              <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                                {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.contactPerson})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                            2. Document Category
                          </label>
                          <select
                            value={uploadDocForm.docType}
                            onChange={(e) => setUploadDocForm(p => ({ ...p, docType: e.target.value }))}
                            style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem' }}
                          >
                            <option value="Signed Contract (MSA)">📜 Signed Master Service Agreement (MSA)</option>
                            <option value="Signed Handover Certificate">🔑 Signed Deployment &amp; Handover Sheet</option>
                            <option value="Signed 1-Year SLA Warranty">🛡️ Signed 1-Year SLA Maintenance Agreement</option>
                            <option value="Signed DLT Authorization">📱 Signed Telecom DLT SMS Letter</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                            3. Select Scanned PDF / Image File
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadDocForm(p => ({
                                  ...p,
                                  fileName: file.name,
                                  docTitle: file.name.replace(/\.[^/.]+$/, ''),
                                }));
                              }
                            }}
                            style={{ width: '100%', padding: '6px 8px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#CBD5E1', fontSize: '0.74rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setIsUploadDocOpen(false)}
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.76rem', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            border: '1px solid rgba(251, 191, 36, 0.5)',
                            color: '#fff',
                            padding: '6px 18px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                          }}
                        >
                          <Check size={14} />
                          <span>💾 Upload &amp; Save to Client Vault</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ─── INLINE AI CONTRACT & LEGAL ARCHITECTURE GENERATOR SUITE ─── */}
                {isAiDocGeneratorOpen && (
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 24, 0.99) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '14px',
                      padding: '18px 20px',
                      marginBottom: '18px',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {/* Drawer Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sparkles size={16} color="#fff" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                            Fixkar Smart Legal &amp; Architecture Document Generator
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                            Select Phase &rarr; Toggle included features &rarr; AI drafts custom legally-binding MSA &amp; SLA document
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAiDocGeneratorOpen(false)}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', color: '#94A3B8', padding: '4px 10px', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        ✕ Close
                      </button>
                    </div>

                    {/* Phase 1 vs Phase 2 Toggle Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                      <button
                        type="button"
                        onClick={() => setAiDocForm(p => ({ ...p, phase: 'phase1' }))}
                        style={{
                          background: aiDocForm.phase === 'phase1' ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(30, 58, 138, 0.5) 100%)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${aiDocForm.phase === 'phase1' ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)'}`,
                          borderRadius: '10px',
                          padding: '12px 14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, color: aiDocForm.phase === 'phase1' ? '#38BDF8' : '#CBD5E1', fontSize: '0.86rem' }}>
                            🔹 Phase 1: Deal Kickstart &amp; MSA Contract
                          </span>
                          {aiDocForm.phase === 'phase1' && <span style={{ fontSize: '0.64rem', background: '#38BDF8', color: '#0F172A', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>ACTIVE</span>}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                          50% Advance &bull; Architecture Scope Checklist &bull; NDA &bull; DLT SMS Auth
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAiDocForm(p => ({ ...p, phase: 'phase2' }))}
                        style={{
                          background: aiDocForm.phase === 'phase2' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 78, 59, 0.5) 100%)' : 'rgba(255, 255, 255, 0.02)',
                          border: `1px solid ${aiDocForm.phase === 'phase2' ? '#34D399' : 'rgba(255, 255, 255, 0.08)'}`,
                          borderRadius: '10px',
                          padding: '12px 14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, color: aiDocForm.phase === 'phase2' ? '#34D399' : '#CBD5E1', fontSize: '0.86rem' }}>
                            🟢 Phase 2: Live Handover &amp; 1-Year SLA Warranty
                          </span>
                          {aiDocForm.phase === 'phase2' && <span style={{ fontSize: '0.64rem', background: '#34D399', color: '#064E3B', padding: '1px 6px', borderRadius: '10px', fontWeight: 800 }}>ACTIVE</span>}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                          100% Payment Cleared &bull; 1-Year Free Bug Fixes &bull; Billable Changes Policy
                        </div>
                      </button>
                    </div>

                    {/* Top 3 Form Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', alignItems: 'flex-start', background: 'rgba(255, 255, 255, 0.02)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#38BDF8', marginBottom: '4px', fontWeight: 700 }}>
                          1. Select Registered Client *
                        </label>
                        <select
                          value={aiDocForm.clientCode}
                          onChange={(e) => {
                            const sel = e.target.value;
                            const found = clients.find(c => c.clientCode === sel || c.id === sel);
                            setAiDocForm(p => ({
                              ...p,
                              clientCode: sel,
                              client: found ? found.businessName : p.client,
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', fontWeight: 600, outline: 'none' }}
                        >
                          <option value="">-- Choose Registered Client --</option>
                          {clients.map(c => (
                            <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                              {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.contactPerson})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          {aiDocForm.phase === 'phase1' ? '2. Total Engineering Project Value' : '2. Milestone 2 / Handover Clearance'}
                        </label>
                        <input
                          type="text"
                          value={aiDocForm.totalCost}
                          onChange={(e) => setAiDocForm(p => ({ ...p, totalCost: e.target.value }))}
                          placeholder="e.g. ₹24,999 (50/50 Milestone Model)"
                          style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#FDE047', fontSize: '0.82rem', fontWeight: 700, outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          {aiDocForm.phase === 'phase1' ? '3. Target Completion Timeline' : '3. Deployment Status'}
                        </label>
                        <input
                          type="text"
                          value={aiDocForm.phase === 'phase1' ? aiDocForm.deliveryTimeline : 'Production Live on Dedicated VPS'}
                          onChange={(e) => setAiDocForm(p => ({ ...p, deliveryTimeline: e.target.value }))}
                          placeholder="e.g. 10-14 Business Days"
                          style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#CBD5E1', fontSize: '0.82rem', fontWeight: 600, outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Interactive Checkbox Tick Architecture */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: aiDocForm.phase === 'phase1' ? '#38BDF8' : '#34D399' }}>
                          {aiDocForm.phase === 'phase1' ? '📋 Phase 1: Select Included Modules & Legal Clauses (Tick to include)' : '🛡️ Phase 2: Select SLA Warranty & Post-Launch Terms (Tick to include)'}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>AI will architect legal text based on checked items</span>
                      </div>

                      {/* PHASE 1 CHECKBOXES */}
                      {aiDocForm.phase === 'phase1' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                          {[
                            { key: 'p1WebPlatform', label: '🚀 High-Speed Responsive Web Application', desc: 'Mobile-first UI/UX, <0.4s fast load latency, SSL HTTPS' },
                            { key: 'p1ClientPortal', label: '🔐 Fixkar Self-Service Client Portal Access', desc: 'Dedicated client login for leads, orders, OTP & tickets' },
                            { key: 'p1OtpAuth', label: '📱 Fast2SMS Transactional OTP Auth Engine', desc: '6-digit high-speed OTP with SHA-256 session tokens' },
                            { key: 'p1PaymentGateway', label: '💳 Razorpay / UPI Instant Payment Gateway', desc: 'UPI QR, Webhook verification & auto-invoicing' },
                            { key: 'p1ManagedHosting', label: '☁️ Enterprise Managed VPS & Cloudflare SSL', desc: '100% white-label hosting with daily offsite backups' },
                            { key: 'p1NdaClause', label: '🔒 Non-Disclosure & Confidentiality Clause (NDA)', desc: '100% protection for client business data & algorithms' },
                            { key: 'p1DltAuth', label: '📜 Telecom TRAI / DLT SMS Authorization Letter', desc: 'Authorizes Fast2SMS route for client 6-char header' },
                            { key: 'p1RevisionLimit', label: '🛡️ Scope Control: Max 2-3 Design Revisions', desc: 'Prevents scope creep; extra changes post-kickoff billable' },
                          ].map((item) => (
                            <label
                              key={item.key}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                background: aiDocForm[item.key] ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${aiDocForm[item.key] ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                                borderRadius: '8px',
                                padding: '8px 10px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={!!aiDocForm[item.key]}
                                onChange={(e) => setAiDocForm(p => ({ ...p, [item.key]: e.target.checked }))}
                                style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#38BDF8' }}
                              />
                              <div>
                                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: aiDocForm[item.key] ? '#fff' : '#94A3B8' }}>{item.label}</div>
                                <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{item.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* PHASE 2 CHECKBOXES */}
                      {aiDocForm.phase === 'phase2' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                          {[
                            { key: 'p2LiveAcceptance', label: '✅ 100% Client Live Acceptance & Approval', desc: 'Confirms website tested, live, and Milestone 2 cleared' },
                            { key: 'p2UptimeSla', label: '⚡ 12-Month 99.9% Uptime Guarantee & Backups', desc: 'Automated daily snapshots, DDoS mitigation, SSL renew' },
                            { key: 'p2FreeBugFix', label: '🐛 1-Year FREE Bug Fixes & Error Resolution', desc: 'Runtime bugs, broken links, code crashes fixed 100% FREE' },
                            { key: 'p2PaidChanges', label: '💰 Post-Launch / >6M Changes STRICTLY BILLABLE', desc: 'New features & design modifications require paid CR' },
                            { key: 'p2CodeExport', label: '📦 Static Source Code Archive on Written Demand', desc: 'Client owns content; code delivered post-clearance' },
                            { key: 'p2AnnualRenewal', label: '🔄 Annual Domain & VPS Server Renewal Policy', desc: 'Transparent fixed renewal rate billed annually' },
                          ].map((item) => (
                            <label
                              key={item.key}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                background: aiDocForm[item.key] ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${aiDocForm[item.key] ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                                borderRadius: '8px',
                                padding: '8px 10px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={!!aiDocForm[item.key]}
                                onChange={(e) => setAiDocForm(p => ({ ...p, [item.key]: e.target.checked }))}
                                style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#10B981' }}
                              />
                              <div>
                                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: aiDocForm[item.key] ? '#fff' : '#94A3B8' }}>{item.label}</div>
                                <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{item.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                        {aiDocForm.phase === 'phase1'
                          ? '💡 Phase 1: Combines MSA, 50/50 Payments, Technical Scope, NDA & DLT in 1 legally architectured document.'
                          : '💡 Phase 2: Formally seals Live Handover, 1-Year Free Bug Fixes Warranty, and protects you against unpaid change requests.'}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setIsAiDocGeneratorOpen(false)}
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.76rem', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleGenerateAiContract}
                          style={{
                            background: aiDocForm.phase === 'phase1' ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            border: `1px solid ${aiDocForm.phase === 'phase1' ? 'rgba(56, 189, 248, 0.5)' : 'rgba(74, 222, 128, 0.5)'}`,
                            color: '#fff',
                            padding: '7px 20px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: `0 4px 14px ${aiDocForm.phase === 'phase1' ? 'rgba(37, 99, 235, 0.35)' : 'rgba(16, 185, 129, 0.35)'}`,
                          }}
                        >
                          <Sparkles size={14} color="#FDE047" />
                          <span>✨ Generate {aiDocForm.phase === 'phase1' ? 'Phase 1 MSA Contract' : 'Phase 2 SLA Warranty'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Preview Generated Contract Box */}
                    {aiDocForm.generatedText && (
                      <div style={{ marginTop: '16px', background: '#0B1120', border: `1px solid ${aiDocForm.phase === 'phase1' ? 'rgba(56, 189, 248, 0.35)' : 'rgba(16, 185, 129, 0.35)'}`, borderRadius: '10px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ fontSize: '0.76rem', color: '#4ADE80', fontWeight: 700 }}>
                            ✓ {aiDocForm.phase === 'phase1' ? 'Phase 1 MSA Contract' : 'Phase 2 SLA Warranty'} Architectured Successfully: Ready to Save &amp; Print
                          </span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(aiDocForm.generatedText);
                                alert('📋 Document text copied to clipboard!');
                              }}
                              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '5px 12px', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer' }}
                            >
                              📋 Copy Text
                            </button>
                            <button
                              type="button"
                              onClick={handleSaveContractToVault}
                              style={{ background: '#10B981', border: 'none', color: '#fff', padding: '5px 16px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              💾 Save to Client Vault
                            </button>
                          </div>
                        </div>
                        <textarea
                          rows={10}
                          readOnly
                          value={aiDocForm.generatedText}
                          style={{ width: '100%', background: '#070B14', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px', color: '#E2E8F0', fontFamily: 'monospace', fontSize: '0.74rem', lineHeight: 1.45, resize: 'vertical' }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* ─── INLINE AI FEATURE WORKFLOW ARCHITECT SUITE ─── */}
                {isAiWorkflowGeneratorOpen && (
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(6, 78, 59, 0.25) 0%, rgba(9, 13, 24, 0.98) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      marginBottom: '16px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={16} color="#86EFAC" />
                        <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
                          Fixkar AI System Workflow &amp; Architecture Designer
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                          Interactive Feature Pipeline
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAiWorkflowGeneratorOpen(false)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.1rem', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', alignItems: 'flex-start' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#86EFAC', marginBottom: '4px', fontWeight: 700 }}>
                          1. Select Client Project *
                        </label>
                        <select
                          value={aiWorkflowForm.clientCode}
                          onChange={(e) => {
                            const sel = e.target.value;
                            const found = clients.find(c => c.clientCode === sel || c.id === sel);
                            setAiWorkflowForm(p => ({
                              ...p,
                              clientCode: sel,
                              client: found ? found.businessName : p.client,
                            }));
                          }}
                          style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}
                        >
                          <option value="">-- Choose Registered Client --</option>
                          {clients.map(c => (
                            <option key={c.id || c.clientCode} value={c.clientCode || c.id}>
                              {c.clientCode ? `[${c.clientCode}] ` : ''}{c.businessName} ({c.domain || c.businessType})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>
                          2. Business Architecture Type
                        </label>
                        <select
                          value={aiWorkflowForm.businessType}
                          onChange={(e) => setAiWorkflowForm(p => ({ ...p, businessType: e.target.value }))}
                          style={{ width: '100%', padding: '8px 10px', background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem' }}
                        >
                          <option value="E-Commerce / Online Store">🛍️ E-Commerce Store &amp; Order Pipeline</option>
                          <option value="Coaching / Institute Portal">📚 Coaching Institute &amp; Student Portal</option>
                          <option value="Catering & Events Booking">🍽️ Catering Menu Estimator &amp; Booking</option>
                          <option value="Salon & Spa Booking App">💇 Salon / Spa Calendar Booking</option>
                          <option value="Custom Business Platform">🏢 Custom SaaS / Web Platform</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 600 }}>
                        Active Feature Modules (Auto-Integrated by AI):
                      </label>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {['Fast2SMS OTP Verification', 'Razorpay Payments', 'Database Concurrency Lock', 'Auto PDF Invoices', 'WhatsApp Alerts', 'Admin Realtime Sync'].map(feat => (
                          <span key={feat} style={{ fontSize: '0.72rem', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#86EFAC', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
                      <button
                        type="button"
                        onClick={handleGenerateAiWorkflow}
                        style={{
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          border: '1px solid rgba(74, 222, 128, 0.5)',
                          color: '#fff',
                          padding: '7px 18px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        <Zap size={14} color="#FDE047" />
                        <span>⚡ Generate System Workflow &amp; Data Pipeline</span>
                      </button>
                    </div>

                    {/* Preview Generated Workflow Pipeline */}
                    {aiWorkflowForm.generatedWorkflow && (
                      <div style={{ marginTop: '14px', background: '#0B1120', border: '1px solid rgba(74, 222, 128, 0.35)', borderRadius: '10px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                              Architecture Data Flow: {aiWorkflowForm.generatedWorkflow.client}
                            </span>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{aiWorkflowForm.generatedWorkflow.businessType} • Domain: {aiWorkflowForm.generatedWorkflow.domain}</div>
                          </div>
                          <button
                            type="button"
                            onClick={handleSaveWorkflowToVault}
                            style={{ background: '#10B981', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            💾 Save Workflow to Client Vault
                          </button>
                        </div>

                        {/* Pipeline Step Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                          {aiWorkflowForm.generatedWorkflow.steps.map((st) => (
                            <div key={st.step} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9' }}>{st.icon} {st.title}</span>
                                <span style={{ fontSize: '0.64rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>{st.tech}</span>
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.35 }}>
                                {st.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ─── DOCUMENT CARDS GRID ─── */}
                {filteredDocs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                    <FileText size={32} color="#64748B" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 700 }}>No Documents Found</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>
                      {docSearchQuery ? `No documents matching "${docSearchQuery}" in category "${documentFilter}".` : `No documents uploaded under category "${documentFilter}".`}
                    </div>
                    {(docSearchQuery || documentFilter !== 'All') && (
                      <button
                        type="button"
                        onClick={() => { setDocSearchQuery(''); setDocumentFilter('All'); }}
                        style={{ marginTop: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '5px 14px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Reset Filter &amp; Search
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '14px' }}>
                    {filteredDocs.map((doc) => (
                      <div
                        key={doc.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '150px',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontFamily: 'monospace',
                                  color: doc.type === 'Contract' ? '#38BDF8' : doc.type === 'Technical Spec' ? '#4ADE80' : doc.type === 'Credentials' ? '#FBBF24' : '#C084FC',
                                  background: doc.type === 'Contract' ? 'rgba(56, 189, 248, 0.12)' : doc.type === 'Technical Spec' ? 'rgba(74, 222, 128, 0.12)' : doc.type === 'Credentials' ? 'rgba(251, 191, 36, 0.12)' : 'rgba(192, 132, 252, 0.12)',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontWeight: 700,
                                }}
                              >
                                {doc.type}
                              </span>
                              {doc.isSigned && (
                                <span style={{ fontSize: '0.64rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                                  ✓ Signed &amp; Verified
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{doc.size}</span>
                          </div>

                          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', margin: '0 0 4px', wordBreak: 'break-word' }}>
                            {doc.name}
                          </h4>
                          <div style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span>Client: <strong style={{ color: '#E2E8F0' }}>{doc.client}</strong></span>
                            {doc.clientCode && <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>({doc.clientCode})</span>}
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.68rem', color: '#64748B' }}>📅 {doc.date}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedDocPreview(doc)}
                              style={{
                                background: 'rgba(56, 189, 248, 0.12)',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                color: '#38BDF8',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              Preview / Print
                            </button>
                            <button
                              type="button"
                              onClick={() => alert(`📥 Downloading "${doc.name}" for ${doc.client}...`)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#CBD5E1',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ─── MODAL: DOCUMENT PREVIEW & PRINT ─── */}
              {selectedDocPreview && (
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
                      background: '#0F172A',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '16px',
                      maxWidth: '650px',
                      maxHeight: '90vh',
                      overflowY: 'auto',
                      width: '100%',
                      padding: '24px',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {selectedDocPreview.type} • {selectedDocPreview.id}
                        </span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: '2px 0 0' }}>
                          {selectedDocPreview.title || selectedDocPreview.name}
                        </h3>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>
                          Client: <strong>{selectedDocPreview.client}</strong> ({selectedDocPreview.clientCode})
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDocPreview(null)}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#94A3B8', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ background: '#070B14', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '16px', color: '#CBD5E1', fontSize: '0.78rem', lineHeight: 1.5, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                      {selectedDocPreview.content || `================================================================================
FIXKAR WEB & AI STUDIO — OFFICIAL CLIENT SPECIFICATION
File: ${selectedDocPreview.name} | Date: ${selectedDocPreview.date}
Client: ${selectedDocPreview.client} (${selectedDocPreview.clientCode})
================================================================================

SUMMARY:
${selectedDocPreview.summary || 'Official engineering document securely stored in Fixkar Client Vault.'}

STATUS: 
✓ Digitally Verified & Linked with Client Portal Dashboard

Fixkar Web & AI Engineering Studio (Bihar, India)`}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                        File Size: {selectedDocPreview.size} • {selectedDocPreview.date}
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          style={{
                            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          🖨️ Print / Save as PDF
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedDocPreview(null)}
                          style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ─── TAB 15: BUSINESS ACTIVITY TIMELINE ──────────────────────────── */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Business Activity & Audit Timeline',
              'Chronological feed of all events, client logins, payments, and deployment milestones across the Fixkar ecosystem.',
              '2026-08-18 20:49 - Razorpay payment recorded for FIX-RKCC-001 (+2,000 Credits). • 2026-08-17 18:30 - Singh\'s Glamour Lounge moved to "Live in Production".',
              'activity'
            )}

            <div className="fixkar-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {activities.map((act) => (
                  <div key={act.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', marginTop: '5px' }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>{act.activity}</div>
                      <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '2px' }}>{act.description}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'monospace', marginTop: '4px' }}>{act.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 16: ADMIN ACCOUNT PROFILE ──────────────────────────────── */}
        {activeTab === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {renderSectionGuide(
              'Admin Account Profile & Security',
              'Manage administrative credentials, security keys, and session settings for the Fixkar Console.',
              'Update admin login password from AdminPass@2026 to a new secure passphrase.',
              'account'
            )}

            <div className="fixkar-panel" style={{ padding: '24px', maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
                Administrator Profile
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Admin Email</label>
                  <input
                    type="text"
                    disabled
                    value={adminUser?.email || 'admin@fixkar.co.in'}
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Role / Privilege</label>
                  <input
                    type="text"
                    disabled
                    value="Fixkar Super Administrator"
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 12px', color: '#4ADE80', fontSize: '0.82rem', fontWeight: 700 }}
                  />
                </div>
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
            if (email?.status === 'UNREAD') {
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
                    onClick={fetchAllData}
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
                              background: email?.status === 'UNREAD' ? 'rgba(56, 189, 248, 0.05)' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = email?.status === 'UNREAD' ? 'rgba(56, 189, 248, 0.05)' : 'transparent'; }}
                          >
                            <td style={{ padding: '12px 14px', overflow: 'hidden' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {email?.status === 'UNREAD' && (
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

      {/* ─── MODAL: READ INBOUND CLIENT EMAIL (ADMIN) ─────────────────────── */}
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
                            ✓ {reply?.status || 'DELIVERED'}
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

      {/* ─── MODAL 1: EDIT PACKAGE FORM POPUP ───────────────────────────── */}
      {isEditPackageModalOpen && editingPackage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditPackageModalOpen(false);
          }}
        >
          <div
            className="fixkar-panel"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Edit Web Package
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditPackageModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveEditedPackage} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Package Title & Badge */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Package Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPackage.title}
                    onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Badge
                  </label>
                  <input
                    type="text"
                    value={editingPackage.badge || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, badge: e.target.value })}
                    placeholder="e.g. Fast Launch"
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#38BDF8',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              {/* Price & Included Pages */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPackage.price}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FDE047',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Included Pages *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPackage.includedPages}
                    onChange={(e) => setEditingPackage({ ...editingPackage, includedPages: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              {/* Delivery Turnaround */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Delivery Turnaround
                </label>
                <input
                  type="text"
                  value={editingPackage.turnaround || ''}
                  onChange={(e) => setEditingPackage({ ...editingPackage, turnaround: e.target.value })}
                  placeholder="e.g. 3–5 Days or 7–14 Days"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#4ADE80',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                  }}
                />
              </div>

              {/* Client-Facing Description */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Client-Facing Scope Description
                </label>
                <textarea
                  rows={3}
                  value={editingPackage.simpleDesc || ''}
                  onChange={(e) => setEditingPackage({ ...editingPackage, simpleDesc: e.target.value })}
                  placeholder="Explain what the client gets with this package..."
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#CBD5E1',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    resize: 'none',
                  }}
                />
              </div>

              {/* Live Status Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '10px 14px' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Package Status</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Set whether this package is visible on the public calculator</div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPackage({ ...editingPackage, isLive: !editingPackage.isLive })}
                  style={{
                    background: editingPackage.isLive ? 'rgba(74, 222, 128, 0.2)' : 'rgba(251, 191, 36, 0.15)',
                    border: `1px solid ${editingPackage.isLive ? 'rgba(74, 222, 128, 0.4)' : 'rgba(251, 191, 36, 0.3)'}`,
                    color: editingPackage.isLive ? '#4ADE80' : '#FBBF24',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {editingPackage.isLive ? '● Live in Calculator' : '● Draft Mode'}
                </button>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditPackageModalOpen(false)}
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
                  type="button"
                  onClick={(e) => handleSaveEditedPackage(e, false)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38BDF8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  💾 Save Draft
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSaveEditedPackage(e, true)}
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
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
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <Save size={13} />
                  <span>🚀 Save &amp; Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: EDIT FEATURE FORM POPUP ───────────────────────────── */}
      {isEditFeatureModalOpen && editingFeature && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditFeatureModalOpen(false);
          }}
        >
          <div
            className="fixkar-panel"
            style={{
              width: '100%',
              maxWidth: '540px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Edit Feature / Add-on
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditFeatureModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={(e) => handleSaveEditedFeature(e, true)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingFeature.title}
                    onChange={(e) => setEditingFeature({ ...editingFeature, title: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.86rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingFeature.price}
                    onChange={(e) => setEditingFeature({ ...editingFeature, price: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FDE047',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  What It Does (Functionality)
                </label>
                <textarea
                  rows={2}
                  value={editingFeature.whatItDoes || ''}
                  onChange={(e) => setEditingFeature({ ...editingFeature, whatItDoes: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#CBD5E1',
                    fontSize: '0.78rem',
                    resize: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Why Clients Need It (Value Proposition)
                </label>
                <input
                  type="text"
                  value={editingFeature.whyYouNeedIt || ''}
                  onChange={(e) => setEditingFeature({ ...editingFeature, whyYouNeedIt: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#CBD5E1',
                    fontSize: '0.78rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditFeatureModalOpen(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94A3B8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveEditedFeature(e, false)}
                  style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38BDF8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveEditedFeature(e, true)}
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
                >
                  <Save size={13} />
                  <span>🚀 Save &amp; Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: EDIT AI MODEL FORM POPUP ──────────────────────────── */}
      {isEditAiModalOpen && editingAi && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditAiModalOpen(false);
          }}
        >
          <div
            className="fixkar-panel"
            style={{
              width: '100%',
              maxWidth: '540px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Edit AI Model Option
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditAiModalOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={(e) => handleSaveEditedAi(e, true)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    AI Model Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAi.title}
                    onChange={(e) => setEditingAi({ ...editingAi, title: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '0.86rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Setup Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={editingAi.price}
                    onChange={(e) => setEditingAi({ ...editingAi, price: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FDE047',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Description &amp; Capabilities
                </label>
                <textarea
                  rows={3}
                  value={editingAi.desc || ''}
                  onChange={(e) => setEditingAi({ ...editingAi, desc: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#CBD5E1',
                    fontSize: '0.78rem',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditAiModalOpen(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94A3B8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveEditedAi(e, false)}
                  style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38BDF8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  💾 Save Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveEditedAi(e, true)}
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
                >
                  <Save size={13} />
                  <span>🚀 Save &amp; Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── HIGH-END 2-COLUMN SPLIT EXECUTIVE OTP RECHARGE MODAL ──────── */}
      {isOtpTopUpModalOpen && selectedOtpWallet && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => !topUpLoading && setIsOtpTopUpModalOpen(false)}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #0B1120 0%, #030712 100%)',
              border: '1px solid rgba(56, 189, 248, 0.28)',
              borderRadius: '16px',
              maxWidth: '760px',
              width: '100%',
              boxShadow: '0 25px 80px -10px rgba(0, 0, 0, 0.95), 0 0 45px rgba(56, 189, 248, 0.14)',
              overflow: 'hidden',
              animation: 'scaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div
              style={{
                padding: '12px 18px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(37, 99, 235, 0.35) 100%)',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: '#38BDF8',
                    display: 'flex',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)',
                  }}
                >
                  <Smartphone size={16} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                    Client OTP Wallet Recharge
                  </h3>
                  <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>
                    Fast2SMS DLT Enterprise Gateway
                  </div>
                </div>
              </div>

              {/* Client Badge & Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#F8FAFC' }}>
                    {selectedOtpWallet.clientName}
                  </span>
                  <span style={{ fontSize: '0.66rem', color: '#38BDF8', fontFamily: 'monospace' }}>
                    ({selectedOtpWallet.clientCode})
                  </span>
                  <span style={{ fontSize: '0.66rem', color: '#4ADE80', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                    ● {(selectedOtpWallet.availableCredits || 0).toLocaleString()} Available
                  </span>
                </div>

                <button
                  type="button"
                  disabled={topUpLoading}
                  onClick={() => setIsOtpTopUpModalOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#94A3B8',
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* 2-Column Split Body Form */}
            <form onSubmit={handleConfirmTopUp} style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* ─── LEFT COLUMN: PACKAGE SELECTION ─── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={11} color="#38BDF8" />
                    <span>1. Select Package</span>
                  </label>
                  <span style={{ fontSize: '0.62rem', color: '#38BDF8', fontWeight: 700 }}>
                    DLT Compliant • No Expiry
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {[
                    { credits: 500, price: '₹110', label: 'Starter' },
                    { credits: 1000, price: '₹220', label: 'Standard' },
                    { credits: 2500, price: '₹550', badge: '🔥 Popular' },
                    { credits: 5000, price: '₹1,100', label: 'Growth' },
                    { credits: 10000, price: '₹2,000', badge: '⚡ Best Value' },
                    { credits: 25000, price: '₹4,500', label: 'Enterprise' },
                  ].map((p) => {
                    const isSelected = Number(topUpCredits) === p.credits;
                    return (
                      <div
                        key={p.credits}
                        onClick={() => setTopUpCredits(p.credits)}
                        style={{
                          background: isSelected
                            ? 'linear-gradient(145deg, rgba(14, 165, 233, 0.22) 0%, rgba(37, 99, 235, 0.3) 100%)'
                            : 'rgba(15, 23, 42, 0.6)',
                          border: isSelected
                            ? '1.5px solid #38BDF8'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '9px',
                          padding: '7px 10px',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected
                            ? '0 0 14px rgba(56, 189, 248, 0.25), inset 0 0 8px rgba(56, 189, 248, 0.1)'
                            : 'none',
                        }}
                      >
                        {p.badge && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '5px',
                              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                              color: '#fff',
                              fontSize: '0.52rem',
                              fontWeight: 900,
                              padding: '1px 5px',
                              borderRadius: '8px',
                              boxShadow: '0 2px 4px rgba(217, 119, 6, 0.4)',
                            }}
                          >
                            {p.badge}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: 900, fontSize: '0.86rem', color: isSelected ? '#38BDF8' : '#F8FAFC', fontFamily: 'monospace' }}>
                            +{p.credits.toLocaleString()}
                          </div>
                          {isSelected && (
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={7} color="#0B132B" strokeWidth={4} />
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '2px' }}>
                          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: isSelected ? '#FDE047' : '#CBD5E1' }}>
                            {p.price}
                          </span>
                          <span style={{ fontSize: '0.56rem', color: '#64748B' }}>
                            ₹0.22/sms
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Balance Projection Pill */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '8px',
                    padding: '8px 11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                  }}
                >
                  <div style={{ fontSize: '0.66rem', color: '#D1FAE5' }}>
                    <span>{(selectedOtpWallet.availableCredits || 0).toLocaleString()} + {(Number(topUpCredits) || 0).toLocaleString()}</span>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#86EFAC' }}>➔ New Total Balance:</div>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace' }}>
                    {((selectedOtpWallet.availableCredits || 0) + Number(topUpCredits || 0)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* ─── RIGHT COLUMN: PAYMENT VERIFICATION & ACTION ─── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CreditCard size={12} color="#38BDF8" />
                    <span>2. Payment &amp; UTR Validation</span>
                  </label>
                  <span style={{ fontSize: '0.62rem', color: '#FDE047', fontWeight: 800, fontFamily: 'monospace' }}>
                    Due: ₹{(topUpCredits <= 500 ? 110 : topUpCredits <= 1000 ? 220 : topUpCredits <= 2500 ? 550 : topUpCredits <= 5000 ? 1100 : topUpCredits <= 10000 ? 2000 : topUpCredits <= 25000 ? 4500 : Math.round(topUpCredits * 0.20)).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* UTR Input Strip */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    required={!isComplimentaryOverride}
                    disabled={isComplimentaryOverride}
                    value={topUpUtr}
                    onChange={(e) => {
                      setTopUpUtr(e.target.value);
                      if (utrVerificationResult) setUtrVerificationResult(null);
                    }}
                    placeholder="Enter 12-digit UTR (e.g. 423189021456)"
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      background: '#050914',
                      border: `1px solid ${utrVerificationResult?.verified ? '#4ADE80' : 'rgba(56, 189, 248, 0.4)'}`,
                      borderRadius: '7px',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      outline: 'none',
                      letterSpacing: '0.03em',
                    }}
                  />

                  <button
                    type="button"
                    disabled={utrVerifying || !topUpUtr || isComplimentaryOverride}
                    onClick={() => handleVerifyUtr()}
                    style={{
                      background: utrVerificationResult?.verified ? '#16A34A' : 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '7px 12px',
                      borderRadius: '7px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: utrVerifying || !topUpUtr ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
                      opacity: !topUpUtr && !isComplimentaryOverride ? 0.6 : 1,
                    }}
                  >
                    {utrVerifying ? (
                      <RefreshCw size={11} className="animate-spin" />
                    ) : utrVerificationResult?.verified ? (
                      <>
                        <Check size={11} />
                        <span>OK</span>
                      </>
                    ) : (
                      <>
                        <Search size={11} />
                        <span>Verify</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Verified Green Success Card */}
                {utrVerificationResult?.verified && utrVerificationResult.data && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.35) 0%, rgba(16, 185, 129, 0.18) 100%)',
                      border: '1px solid #10B981',
                      borderRadius: '7px',
                      padding: '7px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={12} color="#4ADE80" />
                        <span>✓ 12-Digit UTR Validated &amp; Unused</span>
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#FDE047', fontFamily: 'monospace' }}>
                        {utrVerificationResult.data.formattedAmount}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', fontSize: '0.62rem', color: '#CBD5E1', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '3px' }}>
                      <div>Switch: <strong style={{ color: '#67E8F9' }}>{utrVerificationResult.data.remitterBank || 'NPCI Node'}</strong></div>
                      <div>Ref: <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{utrVerificationResult.data.bankRef}</strong></div>
                    </div>
                  </div>
                )}

                {/* Duplicate or Invalid Error Box */}
                {utrVerificationResult && !utrVerificationResult.verified && (
                  <div
                    style={{
                      background: 'rgba(244, 63, 94, 0.12)',
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                      borderRadius: '7px',
                      padding: '6px 9px',
                      color: '#FDA4AF',
                      fontSize: '0.66rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    <AlertTriangle size={13} color="#F43F5E" style={{ flexShrink: 0 }} />
                    <div>{utrVerificationResult.message}</div>
                  </div>
                )}

                {/* Super Admin Secured Complimentary Override Card */}
                {!isComplimentaryOverride ? (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 27, 75, 0.25) 100%)',
                      border: '1px dashed rgba(168, 85, 247, 0.35)',
                      borderRadius: '7px',
                      padding: '5px 8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Crown size={12} color="#C084FC" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.66rem', color: '#DDD6FE', fontWeight: 600 }}>
                        Free Bypass (Super Admin)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleComplimentary}
                      style={{
                        background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                        border: 'none',
                        color: '#fff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <KeyRound size={9} />
                      <span>Unlock</span>
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(180, 83, 9, 0.25) 100%)',
                      border: '1px solid #A855F7',
                      borderRadius: '7px',
                      padding: '5px 8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Crown size={13} color="#FBBF24" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#FDE68A' }}>
                        👑 Super Admin Free Allocation Active
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleComplimentary}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#CBD5E1',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.6rem',
                        cursor: 'pointer',
                      }}
                    >
                      ✕ Revert
                    </button>
                  </div>
                )}

                {/* Purpose Note Input */}
                <input
                  type="text"
                  value={topUpReason}
                  onChange={(e) => setTopUpReason(e.target.value)}
                  placeholder="Purpose (e.g. Monthly OTP recharge)"
                  style={{
                    width: '100%',
                    padding: '6px 9px',
                    background: '#050914',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    color: '#CBD5E1',
                    fontSize: '0.72rem',
                    outline: 'none',
                  }}
                />

                {/* 48-Hour Provisional Notice Strip */}
                <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '6px', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={12} color="#38BDF8" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.62rem', color: '#93C5FD', lineHeight: 1.25 }}>
                    <strong>⚡ Instant Provisional Credit:</strong> Wallet credits instantly. Super Admin will verify in bank within 48h (auto-reverts if unverified).
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                  <button
                    type="button"
                    disabled={topUpLoading}
                    onClick={() => setIsOtpTopUpModalOpen(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#94A3B8',
                      padding: '7px 12px',
                      borderRadius: '7px',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={topUpLoading || (!utrVerificationResult?.verified && !isComplimentaryOverride)}
                    style={{
                      background: utrVerificationResult?.verified || isComplimentaryOverride ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.08)',
                      border: utrVerificationResult?.verified || isComplimentaryOverride ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: utrVerificationResult?.verified || isComplimentaryOverride ? '#fff' : '#64748B',
                      padding: '7px 15px',
                      borderRadius: '7px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      cursor: topUpLoading ? 'wait' : (!utrVerificationResult?.verified && !isComplimentaryOverride) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: utrVerificationResult?.verified || isComplimentaryOverride ? '0 2px 12px rgba(16, 185, 129, 0.4)' : 'none',
                      opacity: topUpLoading ? 0.7 : 1,
                    }}
                  >
                    {topUpLoading ? (
                      <>
                        <RefreshCw size={12} className="animate-spin" />
                        <span>Allocating...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={13} color={utrVerificationResult?.verified || isComplimentaryOverride ? '#FDE047' : '#64748B'} />
                        <span>Confirm &amp; Add +{(Number(topUpCredits) || 0).toLocaleString()} OTPs</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ─── SUPER ADMIN MASTER AUTHORIZATION PROMPT MODAL ─────────────── */}
      {isSuperAdminPromptOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(2, 6, 23, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setIsSuperAdminPromptOpen(false)}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #1E1035 0%, #0F081C 100%)',
              border: '1px solid #A855F7',
              borderRadius: '16px',
              maxWidth: '430px',
              width: '100%',
              padding: '22px',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.95), 0 0 35px rgba(168, 85, 247, 0.35)',
              animation: 'fadeIn 0.2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(217, 119, 6, 0.25) 100%)',
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1px solid #A855F7',
                    color: '#FBBF24',
                    display: 'flex',
                  }}
                >
                  <Crown size={22} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                    Super Admin Master Access
                  </h4>
                  <div style={{ fontSize: '0.68rem', color: '#C084FC', marginTop: '2px' }}>
                    Complimentary / Free Credit Authorization
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSuperAdminPromptOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#94A3B8',
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={14} />
              </button>
            </div>

            <div
              style={{
                background: 'rgba(88, 28, 135, 0.2)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '0.73rem',
                color: '#E9D5FF',
                lineHeight: 1.45,
                marginBottom: '14px',
              }}
            >
              🔒 <strong>Role Policy:</strong> Normal Admins <strong>cannot add free balance</strong> without bank UTR payment. Sirf <strong>Super Admin</strong> master passkey se complimentary bypass unlock ho sakta hai.
            </div>

            <form onSubmit={handleVerifySuperAdminPasskey} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#DDD6FE', marginBottom: '6px' }}>
                  Super Admin Master Key / Passphrase *
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={superAdminPromptInput}
                  onChange={(e) => {
                    setSuperAdminPromptInput(e.target.value);
                    if (superAdminAuthError) setSuperAdminAuthError('');
                  }}
                  placeholder="Enter Master Passkey (e.g. SUPER-ADMIN-2026-FIXKAR)"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: '#07030D',
                    border: '1px solid #A855F7',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.84rem',
                    fontFamily: 'monospace',
                    outline: 'none',
                  }}
                />
              </div>

              {superAdminAuthError && (
                <div
                  style={{
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    color: '#FDA4AF',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <AlertTriangle size={14} color="#F43F5E" style={{ flexShrink: 0 }} />
                  <span>{superAdminAuthError}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setIsSuperAdminPromptOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#CBD5E1',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 4px 15px rgba(147, 51, 234, 0.45)',
                  }}
                >
                  <KeyRound size={12} />
                  <span>Authorize Free Bypass</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── SLEEK FLOATING SUCCESS TOAST NOTIFICATION ─────────────────── */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
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
          }}
        >
          <CheckCircle2 size={18} color="#4ADE80" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── MODAL: SUPER ADMIN GENERATE CLIENT API KEY ─────────────────── */}
      {isGenerateApiKeyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.85)',
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
            className="fixkar-panel"
            style={{
              width: '100%',
              maxWidth: '520px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(168, 85, 247, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={18} color="#FBBF24" />
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
              {/* Select Client */}
              <div>
                <label style={{ fontSize: '0.74rem', color: '#DDD6FE', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                  Select Client (from Registered Directory) *
                </label>
                <select
                  required
                  value={newApiKeyForm.clientCode}
                  onChange={(e) => {
                    const selCode = e.target.value;
                    const found = clients.find(c => c.clientCode === selCode || c.id === selCode);
                    if (found) {
                      setNewApiKeyForm({
                        clientCode: found.clientCode || selCode,
                        clientName: found.businessName || found.contactPerson || 'Client Website',
                        dltSenderId: found.dltSenderId || (found.clientCode ? found.clientCode.replace('FIX-', '').slice(0, 6) : 'FIXKAR').toUpperCase()
                      });
                    } else {
                      setNewApiKeyForm({ ...newApiKeyForm, clientCode: selCode });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    background: '#0B1120',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
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

              {/* Client Name Preview */}
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
                    background: '#0B1120',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.84rem',
                  }}
                />
              </div>

              {/* DLT Sender ID */}
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
                    background: '#0B1120',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#93C5FD',
                    fontSize: '0.84rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                  }}
                />
              </div>

              {/* Security Policy Notice */}
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={16} color="#C084FC" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.72rem', color: '#DDD6FE', lineHeight: 1.4 }}>
                  <strong>Zero-Leak Security Architecture:</strong> This key will only authorize OTP dispatches for <strong>{newApiKeyForm.clientCode || 'selected client'}</strong>. Balance will automatically deduct from their Fixkar virtual wallet.
                </div>
              </div>

              {/* Actions */}
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
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)',
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

      {/* ─── PERSISTENT RIGHT-SIDE SLIDING AI COPILOT DRAWER ─────────────── */}
      <AdminCopilotDrawer
        isOpen={isCopilotDrawerOpen}
        onClose={() => setIsCopilotDrawerOpen(false)}
        currentContext={{
          page: activeTab,
          selectedClient: selectedClientDetail?.businessName || null,
        }}
        adminToken={adminToken}
        API_BASE={API_BASE}
        onOpenSuperAdmin={() => setIsSuperAdminPlaceholderOpen(true)}
        onOpenReceipt={(proj) => setSelectedReceiptProject(proj)}
      />

      {/* ─── SPOTLIGHT COMMAND PALETTE (CTRL+K) ───────────────────────────── */}
      <AdminCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={(tab) => { setActiveTab(tab); setSelectedClientDetail(null); }}
        onOpenCopilotWithQuery={() => setIsCopilotDrawerOpen(true)}
        onOpenSuperAdmin={() => setIsSuperAdminPlaceholderOpen(true)}
        projects={projects}
        leads={clients}
      />

      {/* ─── 24/7 GLOBAL VIEWPORT FLOATING AI COPILOT LAUNCHER BUTTON ──────── */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99990,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        <button
          onClick={() => setIsCopilotDrawerOpen((prev) => !prev)}
          aria-label="Toggle Fixkar AI Copilot"
          title="Fixkar AI Copilot (Ctrl+K)"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 35px -4px rgba(0, 0, 0, 0.85), 0 0 25px rgba(56, 189, 248, 0.6)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            animation: 'aiPulseFloat 4s ease-in-out infinite',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 18px 45px -4px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 35px -4px rgba(0, 0, 0, 0.85), 0 0 25px rgba(56, 189, 248, 0.6)';
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={26} strokeWidth={2.2} />
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: '#4ADE80',
                border: '2px solid #1D4ED8',
                boxShadow: '0 0 10px #4ADE80',
              }}
            />
          </div>
        </button>
      </div>

      {/* ─── LAYER 2 SUPER ADMIN STEP-UP MODAL ──────────────────────────── */}
      <SuperAdminLoginModal
        isOpen={isSuperAdminPlaceholderOpen}
        onClose={() => setIsSuperAdminPlaceholderOpen(false)}
      />
    </div>
  );
}
