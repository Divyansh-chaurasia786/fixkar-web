import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Printer,
  ExternalLink,
  ShieldCheck,
  Globe,
  Clock,
  LifeBuoy,
  LogOut,
  Send,
  Lock,
  Zap,
  DollarSign,
  FileText,
  User,
  Sparkles,
  Server,
  KeyRound,
  ChevronRight,
  Plus,
  Bot,
} from 'lucide-react';
import { ReceiptModal } from '../components/admin/ReceiptModal';

export function ClientPortalPage({ onNavigateHome }) {
  const API_BASE = 'http://localhost:5050';

  // Auth State
  const [token, setToken] = useState(() => localStorage.getItem('fixkar_client_token') || null);
  const [clientData, setClientData] = useState(null);
  const [loginIdentifier, setLoginIdentifier] = useState('FIX-RKCC-001');
  const [loginPassword, setLoginPassword] = useState('Fixkar@2026');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Portal State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'otp' | 'invoices' | 'renewals' | 'support'
  const [wallet, setWallet] = useState({ availableCredits: 1247, usedToday: 14, usedThisMonth: 382, lowBalanceState: 'Normal' });
  const [otpUsage, setOtpUsage] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Selected Receipt Modal & Razorpay State
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState(null);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState(null);

  // Mandatory First-Time Password Reset State (Forced Security Gate)
  const [firstTimeNewPassword, setFirstTimeNewPassword] = useState('');
  const [firstTimeConfirmPassword, setFirstTimeConfirmPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Forgot Password Recovery State (Firebase OTP Engine)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Request OTP, 2: Enter OTP & New Password
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState(null);
  const [forgotSuccessNotice, setForgotSuccessNotice] = useState(null);
  const [maskedEmail, setMaskedEmail] = useState('');

  // Logged-in Change Password Modal State
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [changeNewPassword, setChangeNewPassword] = useState('');
  const [changeConfirmPassword, setChangeConfirmPassword] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState(null);

  const handleRequestForgotOtp = async (e) => {
    e.preventDefault();
    setForgotError(null);
    if (!forgotIdentifier.trim()) {
      setForgotError('Please enter your Client ID or Registered Email.');
      return;
    }
    try {
      setForgotLoading(true);
      const res = await fetch(`${API_BASE}/api/client/forgot-password/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: forgotIdentifier.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMaskedEmail(data.maskedEmail);
        setForgotStep(2);
        setForgotSuccessNotice(data.message);
      } else {
        setForgotError(data.error || 'Failed to request password reset code.');
      }
    } catch (err) {
      setForgotError('Network error requesting reset code.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordWithOtp = async (e) => {
    e.preventDefault();
    setForgotError(null);
    if (forgotNewPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match. Please re-enter.');
      return;
    }
    try {
      setForgotLoading(true);
      const res = await fetch(`${API_BASE}/api/client/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: forgotIdentifier.trim(),
          otp: forgotOtp.trim(),
          newPassword: forgotNewPassword,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLoginIdentifier(data.clientCode || forgotIdentifier);
        setLoginPassword(forgotNewPassword);
        setIsForgotPasswordOpen(false);
        setForgotStep(1);
        setForgotOtp('');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
        setPaymentSuccessMsg('🎉 Password successfully reset via Firebase OTP! You can now log in with your new password.');
        setTimeout(() => setPaymentSuccessMsg(null), 7000);
      } else {
        setForgotError(data.error || 'Failed to reset password.');
      }
    } catch (err) {
      setForgotError('Network error resetting password.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleLoggedInPasswordChange = async (e) => {
    e.preventDefault();
    setChangePasswordError(null);
    if (changeNewPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (changeNewPassword !== changeConfirmPassword) {
      setChangePasswordError('Passwords do not match. Please re-enter.');
      return;
    }
    try {
      setChangePasswordLoading(true);
      const res = await fetch(`${API_BASE}/api/client/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: changeNewPassword,
          clientId: clientData.id,
          clientCode: clientData.clientCode,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsChangePasswordModalOpen(false);
        setChangeNewPassword('');
        setChangeConfirmPassword('');
        setPaymentSuccessMsg('🔒 Your password has been successfully updated and secured!');
        setTimeout(() => setPaymentSuccessMsg(null), 5000);
      } else {
        setChangePasswordError(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setChangePasswordError('Network error updating password.');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleFirstTimePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordChangeError(null);

    if (firstTimeNewPassword.length < 6) {
      setPasswordChangeError('Password must be at least 6 characters long.');
      return;
    }
    if (firstTimeNewPassword !== firstTimeConfirmPassword) {
      setPasswordChangeError('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setPasswordChangeLoading(true);
      const res = await fetch(`${API_BASE}/api/client/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: firstTimeNewPassword,
          clientId: clientData.id,
          clientCode: clientData.clientCode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClientData((prev) => ({
          ...prev,
          defaultPassword: firstTimeNewPassword,
          isPasswordChanged: true,
          mustChangePassword: false,
        }));
        setPaymentSuccessMsg('🎉 Security password successfully set! Your Fixkar Client Portal is now fully activated.');
        setTimeout(() => setPaymentSuccessMsg(null), 6000);
      } else {
        setPasswordChangeError(data.error || 'Failed to update password. Please try again.');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setPasswordChangeError('Network error while updating password.');
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  // Prototype Reviews & Revision Feedback State (2-Way Engineering Sync)
  const [clientReviews, setClientReviews] = useState([
    {
      id: 'rev_1',
      text: 'Verified prototype layout. Header CTA button needs to be blue and logo size on mobile increased.',
      category: 'UI / Design',
      status: 'Solved',
      createdAt: '2026-08-20, 11:30 AM',
    },
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewCategory, setNewReviewCategory] = useState('UI / Design');
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState(null);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const revId = `rev_${Date.now()}`;
    const newRev = {
      id: revId,
      text: newReviewText.trim(),
      category: newReviewCategory,
      status: 'In Review',
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };
    setClientReviews(prev => [newRev, ...prev]);
    setNewReviewText('');
    setReviewSubmittedMsg('🎉 Revision note submitted to Fixkar Engineering Hub! Super Admin & Admin are now reviewing it.');
    setTimeout(() => setReviewSubmittedMsg(null), 5000);
  };

  // Dynamic OTP Packages from Super Admin Pricing Engine
  const [otpPackages, setOtpPackages] = useState([
    { id: 'otp_500', name: 'Starter Micro Pack', credits: 500, price: 125, perOtp: '₹0.25 / OTP', popular: false, desc: 'Quick top-up for small portals & testing' },
    { id: 'otp_1000', name: 'Starter Pro Pack', credits: 1000, price: 250, perOtp: '₹0.25 / OTP', popular: false, desc: 'Ideal for coaching institute student logins and attendance alerts.' },
    { id: 'otp_2500', name: 'Growth Lite Pack', credits: 2500, price: 575, perOtp: '₹0.23 / OTP', popular: false, desc: 'Great for growing academy & clinic booking portals.' },
    { id: 'otp_5000', name: 'Growth Business Pack', credits: 5000, price: 1100, perOtp: '₹0.22 / OTP', popular: true, desc: 'Best value for high-volume exam portals and member booking notifications.' },
    { id: 'otp_10000', name: 'Enterprise Scale Pack', credits: 10000, price: 2000, perOtp: '₹0.20 / OTP', popular: false, desc: 'Maximum savings with dedicated high-throughput DLT SMS routing.' },
    { id: 'otp_25000', name: 'Mega Enterprise Pack', credits: 25000, price: 4500, perOtp: '₹0.18 / OTP', popular: false, desc: 'Ultra-low bulk volume rate for large institutions.' },
  ]);

  useEffect(() => {
    const fetchDynamicPricing = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/otp/pricing-config`);
        if (res.ok) {
          const data = await res.json();
          if (data.pricing?.packages && Array.isArray(data.pricing.packages)) {
            setOtpPackages(
              data.pricing.packages.map((pkg) => ({
                ...pkg,
                perOtp: `₹${(pkg.ratePerSms || (pkg.price / pkg.credits)).toFixed(2)} / OTP`,
              }))
            );
          }
        }
      } catch (err) {
        console.error('[ClientPortal OTP pricing fetch failed]', err);
      }
    };
    fetchDynamicPricing();
  }, []);

  // Fetch Logged-in Client Profile & Services
  const fetchClientProfile = async (currentToken) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/client/me`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setClientData(data.client);
        setWallet(data.wallet || { availableCredits: 1247, usedToday: 14, usedThisMonth: 382, lowBalanceState: 'Normal' });
        setOtpUsage(data.otpUsage || []);
        setInvoices(data.invoices || []);
        setPayments(data.payments || []);
        setRenewals(data.renewals || []);
        setTickets(data.tickets || []);
      } else {
        // Token invalid
        setToken(null);
        localStorage.removeItem('fixkar_client_token');
      }
    } catch (err) {
      console.error('[Client fetch error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchClientProfile(token);
    }
  }, [token]);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(`${API_BASE}/api/auth/client-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials. Please check your Registration ID and Password.');
      }

      setToken(data.token);
      setClientData(data.client);
      localStorage.setItem('fixkar_client_token', data.token);
      fetchClientProfile(data.token);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken(null);
    setClientData(null);
    localStorage.removeItem('fixkar_client_token');
  };

  // Handle Razorpay Checkout Simulation / Execution
  const handleInitiateRazorpay = (pkg) => {
    setSelectedPackage(pkg);
    setIsRazorpayModalOpen(true);
  };

  const handleConfirmRazorpayPayment = async () => {
    if (!selectedPackage) return;
    try {
      const simulatedPaymentId = `pay_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`;
      const simulatedOrderId = `order_${Date.now()}`;

      const res = await fetch(`${API_BASE}/api/payment/verify-signature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: simulatedPaymentId,
          razorpay_order_id: simulatedOrderId,
          packageId: selectedPackage.id,
          credits: selectedPackage.credits,
          amount: selectedPackage.price,
          clientId: clientData?.id || 'cli_rkcc',
          clientName: clientData?.businessName || 'R.K. Computer Classes',
          clientCode: clientData?.clientCode || 'FIX-RKCC-001',
          purpose: `${selectedPackage.name} (+${selectedPackage.credits.toLocaleString()} OTP Credits)`,
          paymentMethod: 'UPI (Razorpay Smart Checkout)',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsRazorpayModalOpen(false);
        setPaymentSuccessMsg(`Payment Successful! +${selectedPackage.credits.toLocaleString()} credits added to your wallet.`);
        // Refresh wallet
        fetchClientProfile(token);
        // Open Digitally Signed Receipt
        setSelectedReceiptPayment(data.payment);
        setTimeout(() => setPaymentSuccessMsg(null), 6000);
      }
    } catch (err) {
      console.error('[Razorpay verify error]', err);
    }
  };

  // Handle Submit Support Ticket
  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;

    const tktId = `TKT-${Math.floor(100 + Math.random() * 900)}`;
    const newTkt = {
      id: tktId,
      ticketNumber: tktId,
      clientId: clientData?.id || '',
      clientCode: clientData?.clientCode || '',
      client: clientData?.businessName || clientData?.contactPerson || 'Client',
      phone: clientData?.phone || '',
      email: clientData?.email || '',
      subject: newTicketSubject,
      description: newTicketDesc,
      category: newTicketCategory,
      priority: 'Medium',
      status: 'Open',
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      notes: '',
    };

    try {
      await fetch(`${API_BASE}/api/client/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTkt),
      });
    } catch (err) {
      console.error('Error submitting client ticket:', err);
    }

    setTickets((prev) => [newTkt, ...prev]);
    setNewTicketSubject('');
    setNewTicketDesc('');
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  // ─── VIEW 1: CLIENT LOGIN VIEW (WHEN NOT AUTHENTICATED) ───────────────────
  if (!token || !clientData) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '750px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 0',
          background: 'transparent',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(37, 99, 235, 0.15)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.25) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                color: '#38BDF8',
              }}
            >
              <Globe size={28} />
            </div>

            <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#38BDF8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              FIXKAR CLIENT ACCESS
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Client Self-Service Portal
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.5 }}>
              Log in to view live website infrastructure, manage OTP verification credits, and download official receipts.
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div style={{ padding: '10px 14px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', color: '#FDA4AF', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#CBD5E1', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Client Registration ID or Email
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. FIX-RKCC-001 or email"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '11px 14px 11px 42px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#CBD5E1', textTransform: 'uppercase' }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPasswordOpen(true);
                    setForgotIdentifier(loginIdentifier || '');
                    setForgotError(null);
                    setForgotStep(1);
                  }}
                  style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '11px 14px 11px 42px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            {/* ─── FORGOT PASSWORD RESET MODAL (FIREBASE OTP) ──────────────── */}
            {isForgotPasswordOpen && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(2, 4, 12, 0.92)',
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
                    width: '100%',
                    maxWidth: '440px',
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 25, 0.99) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '18px',
                    padding: '28px 24px',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <KeyRound size={20} color="#38BDF8" />
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        Reset Portal Password
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {forgotError && (
                    <div style={{ padding: '10px 14px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', color: '#FDA4AF', fontSize: '0.78rem', marginBottom: '14px' }}>
                      {forgotError}
                    </div>
                  )}

                  {forgotSuccessNotice && (
                    <div style={{ padding: '10px 14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '10px', color: '#86EFAC', fontSize: '0.78rem', marginBottom: '14px' }}>
                      ✓ {forgotSuccessNotice}
                    </div>
                  )}

                  {/* STEP 1: Enter ID/Email & Request OTP */}
                  {forgotStep === 1 && (
                    <form onSubmit={handleRequestForgotOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                        Enter your <strong>Client ID (e.g. FIX-APEX-008)</strong> or <strong>Registered Email</strong>. A 6-digit verification code will be sent to your registered email via Firebase.
                      </p>

                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                          Client ID or Registered Email
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. FIX-RKCC-001 or contact@company.in"
                          value={forgotIdentifier}
                          onChange={(e) => setForgotIdentifier(e.target.value)}
                          style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={forgotLoading}
                        style={{
                          background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                          border: 'none',
                          color: '#fff',
                          padding: '11px 18px',
                          borderRadius: '10px',
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        {forgotLoading ? <span>Dispatching OTP...</span> : <span>Send Reset Code via Email →</span>}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: Enter 6-digit OTP & New Password */}
                  {forgotStep === 2 && (
                    <form onSubmit={handleResetPasswordWithOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
                        Enter the 6-digit OTP sent to <strong style={{ color: '#38BDF8' }}>{maskedEmail}</strong> and your new password:
                      </p>

                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#FBBF24', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                          6-Digit Verification Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="e.g. 849201"
                          value={forgotOtp}
                          onChange={(e) => setForgotOtp(e.target.value)}
                          style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(251, 191, 36, 0.5)', borderRadius: '10px', padding: '10px 14px', color: '#FDE047', fontSize: '1.1rem', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.2em', textAlign: 'center', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                          New Password * (Min 6 chars)
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          placeholder="••••••••••••"
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
                          style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          placeholder="Re-enter new password..."
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => setForgotStep(1)}
                          style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '10px 14px', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={forgotLoading}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            border: 'none',
                            color: '#fff',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            fontSize: '0.86rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {forgotLoading ? <span>Updating...</span> : <span>Update &amp; Sign In →</span>}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Demo Credentials Helper */}
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px dashed rgba(56, 189, 248, 0.3)',
                borderRadius: '10px',
                fontSize: '0.76rem',
                color: '#94A3B8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                <strong style={{ color: '#38BDF8' }}>Demo Client ID:</strong>{' '}
                <code style={{ color: '#fff' }}>FIX-RKCC-001</code> / <code style={{ color: '#fff' }}>Fixkar@2026</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setLoginIdentifier('FIX-RKCC-001');
                  setLoginPassword('Fixkar@2026');
                }}
                style={{ background: 'none', border: 'none', color: '#38BDF8', fontWeight: 700, cursor: 'pointer', fontSize: '0.74rem' }}
              >
                Auto-Fill
              </button>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={{
                background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '4px',
              }}
            >
              {authLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Enter Client Portal →</span>
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
            <button
              onClick={onNavigateHome}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              ← Return to Fixkar Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── VIEW 2: LOGGED-IN CLIENT DASHBOARD ──────────────────────────────────
  return (
    <div
      style={{
        width: '100%',
        minHeight: '840px',
        background: 'transparent',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
        padding: 0,
      }}
    >
      {/* ─── MANDATORY FIRST-TIME SECURITY PASSWORD SETUP MODAL ───────────── */}
      {clientData && (clientData.mustChangePassword === true || clientData.isPasswordChanged === false) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 12, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 25, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '20px',
              padding: '32px 28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.2)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.25) 100%)',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#FBBF24',
                }}
              >
                <Lock size={26} />
              </div>
              <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#FBBF24', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                SECURITY STEP 1 OF 1 &bull; FIRST-TIME LOGIN
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: '6px 0 4px' }}>
                Set Your Custom Password
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                You are currently logged in with an initial system-generated password. Please create your private permanent password to continue.
              </p>
            </div>

            {passwordChangeError && (
              <div style={{ padding: '10px 14px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', color: '#FDA4AF', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                <span>{passwordChangeError}</span>
              </div>
            )}

            <form onSubmit={handleFirstTimePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                  Client ID (Permanent)
                </label>
                <input
                  type="text"
                  disabled
                  value={clientData.clientCode || clientData.registrationNo}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '10px 14px', color: '#38BDF8', fontSize: '0.86rem', fontFamily: 'monospace', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                  New Secure Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="At least 6 characters..."
                    value={firstTimeNewPassword}
                    onChange={(e) => setFirstTimeNewPassword(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '10px', padding: '10px 50px 10px 14px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#38BDF8', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600 }}
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                  Confirm New Password *
                </label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="Re-enter your new password..."
                  value={firstTimeConfirmPassword}
                  onChange={(e) => setFirstTimeConfirmPassword(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={passwordChangeLoading}
                style={{
                  background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '6px',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)',
                }}
              >
                {passwordChangeLoading ? (
                  <span>Securing Account...</span>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Save Password &amp; Unlock Dashboard →</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedReceiptPayment && (
        <ReceiptModal
          paymentData={selectedReceiptPayment}
          project={{
            clientName: clientData?.businessName,
            clientCode: clientData?.clientCode,
            domain: clientData?.domain,
            contactPerson: clientData?.contactPerson,
            phone: clientData?.phone,
            email: clientData?.email,
          }}
          onClose={() => setSelectedReceiptPayment(null)}
        />
      )}

      {/* ─── RAZORPAY SMART CHECKOUT POPUP MODAL ───────────────────────── */}
      {isRazorpayModalOpen && selectedPackage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 10, 0.85)',
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
              width: '460px',
              background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 60px rgba(37, 99, 235, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#38BDF8" />
                <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                  Razorpay Smart Payment
                </h3>
              </div>
              <button
                onClick={() => setIsRazorpayModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '14px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#38BDF8' }}>SELECTED PACKAGE</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', margin: '2px 0' }}>{selectedPackage.name}</div>
              <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>+{selectedPackage.credits.toLocaleString()} SMS OTP Verification Credits</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#4ADE80', marginTop: '6px' }}>
                ₹{selectedPackage.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 400 }}>(Inclusive of all taxes)</span>
              </div>
            </div>

            <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '16px', lineHeight: 1.5 }}>
              ⚡ Payment will be verified securely via <strong>Razorpay Enterprise Gateway</strong>. Credits will be allocated immediately and an official digitally signed receipt will be issued.
            </div>

            <button
              onClick={handleConfirmRazorpayPayment}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                border: 'none',
                color: '#fff',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)',
              }}
            >
              <Zap size={16} />
              <span>Complete Payment of ₹{selectedPackage.price} →</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── CLIENT PORTAL TOPBAR ────────────────────────────────────────── */}
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto 20px',
          background: 'linear-gradient(90deg, rgba(13, 19, 35, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {clientData.logoUrl ? (
            <img
              src={clientData.logoUrl}
              alt="Client Logo"
              style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(56, 189, 248, 0.4)' }}
            />
          ) : (
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              {clientData.businessName?.charAt(0) || 'C'}
            </div>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {clientData.businessName}
              </h1>
              <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                {clientData.clientCode}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>
              Welcome back, <strong>{clientData.contactPerson}</strong> • {clientData.domain}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {clientData.website && (
            <a
              href={clientData.website}
              target="_blank"
              rel="noreferrer"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#38BDF8', padding: '6px 12px', borderRadius: '8px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <span>Visit Live Website</span>
              <ExternalLink size={12} />
            </a>
          )}

          <button
            onClick={() => {
              setIsChangePasswordModalOpen(true);
              setChangePasswordError(null);
              setChangeNewPassword('');
              setChangeConfirmPassword('');
            }}
            style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '6px 12px', borderRadius: '8px', fontSize: '0.76rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
          >
            <KeyRound size={13} />
            <span>Change Password</span>
          </button>

          <button
            onClick={handleLogout}
            style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#FDA4AF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.76rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={12} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* ─── LOGGED-IN CHANGE PASSWORD MODAL ─────────────────────────────── */}
      {isChangePasswordModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 4, 12, 0.88)',
            backdropFilter: 'blur(14px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '430px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 25, 0.99) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '18px',
              padding: '28px 24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={20} color="#38BDF8" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Update Portal Password
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsChangePasswordModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {changePasswordError && (
              <div style={{ padding: '10px 14px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', color: '#FDA4AF', fontSize: '0.78rem', marginBottom: '14px' }}>
                {changePasswordError}
              </div>
            )}

            <form onSubmit={handleLoggedInPasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '4px' }}>
                  Account / Client ID
                </label>
                <div style={{ padding: '8px 12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', color: '#38BDF8', fontSize: '0.84rem', fontFamily: 'monospace', fontWeight: 700 }}>
                  {clientData.clientCode} ({clientData.businessName})
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                  New Secure Password * (Min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  value={changeNewPassword}
                  onChange={(e) => setChangeNewPassword(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '6px' }}>
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Re-enter new password..."
                  value={changeConfirmPassword}
                  onChange={(e) => setChangeConfirmPassword(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIsChangePasswordModalOpen(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '10px 14px', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changePasswordLoading}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  {changePasswordLoading ? <span>Updating...</span> : <span>Save New Password →</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Alert Banner */}
      {paymentSuccessMsg && (
        <div style={{ maxWidth: '1200px', margin: '0 auto 16px', padding: '12px 18px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '12px', color: '#86EFAC', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} />
          <span>{paymentSuccessMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {(() => {
          const isPhase2Done = clientData?.phase2Complete === true || clientData?.isPhase2Done === true;
          const isLive = (clientData?.sprintStatus === 'Live in Production' || clientData?.status === 'Live' || clientData?.isLive) && isPhase2Done;
          const isStaging = clientData?.sprintStatus === 'Quality & Staging Testing' || String(clientData?.sprintStatus).includes('Staging') || clientData?.previewActive;
          const progressPct = isLive ? 100 : isStaging ? 90 : isPhase2Done ? 60 : 25;
          const targetPreviewUrl = clientData?.domain ? (clientData.domain.startsWith('http') ? clientData.domain : `https://${clientData.domain}`) : 'https://fixkar.co.in';

          return (
            <>
              {/* Navigation Tabs Bar */}
              <div style={{ display: 'flex', gap: '6px', background: 'rgba(14, 21, 38, 0.9)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '6px', overflowX: 'auto' }}>
                {[
                  { id: 'overview', label: isLive ? 'Overview & Website' : '📋 Project Sprint & Progress', icon: Globe, locked: false },
                  { id: 'preview', label: '🌐 Live Prototype & Reviews', icon: ExternalLink, locked: !isStaging && !isLive, hidden: !isStaging && !isLive },
                  { id: 'otp', label: 'OTP Live Wallet & Recharge', icon: Smartphone, locked: !isLive, badge: isLive && wallet.lowBalanceState === 'Critical' ? 'Critical' : null },
                  { id: 'invoices', label: 'Invoices & Receipts', icon: FileText, locked: !isLive },
                  { id: 'renewals', label: 'Renewals Radar', icon: Clock, locked: !isLive },
                  { id: 'support', label: 'Support Helpdesk', icon: LifeBuoy, locked: false },
                ].filter(t => !t.hidden).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.locked) {
                          alert(`🔒 Security Gate Active:\n\nFull dashboard operational tools (OTP Recharge, Invoices, Renewals) unlock automatically when:\n1. Phase 2 Infrastructure (Domain & Server) is provisioned.\n2. Project reaches 100% Live in Production.\n\nCurrent Status:\n• Phase 2 Infrastructure: ${isPhase2Done ? '✅ Configured' : '⏳ Pending'}\n• Sprint Status: ${clientData?.sprintStatus || 'Stage 1 Onboarded'}`);
                          return;
                        }
                        setActiveTab(tab.id);
                      }}
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : tab.locked ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                        border: 'none',
                        color: tab.locked ? '#475569' : isActive ? '#fff' : '#94A3B8',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: tab.locked ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        whiteSpace: 'nowrap',
                        opacity: tab.locked ? 0.6 : 1,
                      }}
                      title={tab.locked ? 'Requires Phase 2 Setup + 100% Live Production Release' : ''}
                    >
                      {tab.locked ? <Lock size={13} color="#64748B" /> : <Icon size={14} color={isActive ? '#fff' : 'currentColor'} />}
                      <span>{tab.label}</span>
                      {tab.locked && <span style={{ fontSize: '0.6rem', background: 'rgba(255, 255, 255, 0.06)', color: '#94A3B8', padding: '1px 5px', borderRadius: '4px' }}>Locked</span>}
                      {tab.badge && (
                        <span style={{ fontSize: '0.62rem', background: '#F43F5E', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ─── PRE-LIVE / SPRINT TRACKING VIEW (WHEN NOT 100% LIVE) ─── */}
              {!isLive && activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Hero Sprint Progress Banner */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)',
                      border: `1px solid ${isStaging ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '0.72rem', background: isStaging ? 'rgba(56, 189, 248, 0.15)' : isPhase2Done ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)', color: isStaging ? '#38BDF8' : isPhase2Done ? '#4ADE80' : '#FBBF24', border: `1px solid ${isStaging ? 'rgba(56, 189, 248, 0.4)' : isPhase2Done ? 'rgba(74, 222, 128, 0.4)' : 'rgba(251, 191, 36, 0.4)'}`, padding: '3px 10px', borderRadius: '20px', fontWeight: 800 }}>
                            {isStaging ? '⚡ QA & Staging Preview Available' : isPhase2Done ? '🚀 Infrastructure Ready &bull; Dev Sprint Active' : '🛠️ Phase 1 Onboarded &bull; Infrastructure Provisioning'}
                          </span>
                          <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                            Target Delivery: <strong style={{ color: '#fff' }}>{clientData.deliveryDate || '2026-09-02'}</strong>
                          </span>
                        </div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: '8px 0 4px' }}>
                          {clientData.businessName} Web Platform Sprint
                        </h2>
                        <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                          {isStaging
                            ? '🎉 Your website interactive prototype is ready for review! Test the preview below and submit feedback.'
                            : isPhase2Done
                            ? `Domain (${clientData?.domain || 'Configured'}) and cloud server are provisioned. Engineering team is actively developing your web application.`
                            : 'Phase 1 identity registration complete. Fixkar is provisioning your custom domain registrar and cloud server infrastructure.'}
                        </p>
                      </div>

                      {isStaging && (
                        <a
                          href={targetPreviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                            border: '1px solid rgba(56, 189, 248, 0.5)',
                            color: '#fff',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.4)',
                          }}
                        >
                          <Globe size={16} color="#38BDF8" />
                          <span>Open Live Interactive Prototype ↗</span>
                        </a>
                      )}
                    </div>

                    {/* 4-Stage Visual Progress Bar */}
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 700, marginBottom: '8px', color: '#CBD5E1' }}>
                        <span>Sprint Progress ({progressPct}%)</span>
                        <span style={{ color: isStaging ? '#38BDF8' : isPhase2Done ? '#4ADE80' : '#FBBF24' }}>
                          {clientData.sprintStatus || 'Phase 1 Onboarded'}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPct}%`, height: '100%', background: isStaging ? 'linear-gradient(90deg, #38BDF8 0%, #2563EB 100%)' : isPhase2Done ? 'linear-gradient(90deg, #4ADE80 0%, #22C55E 100%)' : 'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)', transition: 'width 0.4s ease' }} />
                      </div>

                      {/* 4 Steps Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '12px' }}>
                        {[
                          { num: '1', title: 'Phase 1 Onboarding', subtitle: 'Identity & Credentials', pct: '25%', done: true },
                          { num: '2', title: 'Phase 2 Infrastructure', subtitle: isPhase2Done ? `Domain & VPS (${clientData?.domain || 'Ready'})` : 'Domain & VPS Provisioning', pct: '60%', done: isPhase2Done },
                          { num: '3', title: 'QA Staging Prototype', subtitle: 'Live Review & Revisions', pct: '90%', done: progressPct >= 90 },
                          { num: '4', title: '100% Live Handover', subtitle: 'Full Portal & Tools Unlock', pct: '100%', done: isLive },
                        ].map((s) => (
                          <div
                            key={s.num}
                            style={{
                              background: s.done ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                              border: `1px solid ${s.done ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                              borderRadius: '8px',
                              padding: '8px 10px',
                            }}
                          >
                            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: s.done ? '#38BDF8' : '#64748B' }}>STAGE {s.num} &bull; {s.pct}</div>
                            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: s.done ? '#fff' : '#94A3B8', marginTop: '2px' }}>{s.title}</div>
                            <div style={{ fontSize: '0.66rem', color: s.done ? '#86EFAC' : '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.subtitle}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 50/50 Milestones & Review Feedback Section */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                    {/* 50/50 Payment Status Card */}
                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
                      <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={16} color="#4ADE80" />
                        <span>50/50 Milestone Investment Status</span>
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Milestone 1 (50% Advance)</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4ADE80' }}>✓ Cleared on Kickoff</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Milestone 2 (50% Final Handover)</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FBBF24' }}>⏳ Due upon 100% Live Handover</span>
                        </div>
                      </div>
                    </div>

                    {/* Engineering Hub Contact Card */}
                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
                      <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LifeBuoy size={16} color="#38BDF8" />
                        <span>Dedicated Engineering Lead</span>
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                        Fixkar Web &amp; AI Studio Ops Desk<br />
                        <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Direct Line: +91 98350 12345 &bull; support@fixkar.co.in</span>
                      </div>
                      <div style={{ marginTop: '12px', fontSize: '0.72rem', color: '#64748B' }}>
                        🔒 OTP Recharging, API Keys, and Invoices unlock automatically when project is marked 100% Live.
                      </div>
                    </div>
                  </div>

                  {/* Prototype Review & Feedback Box (Available when in QA/Staging) */}
                  {isStaging && (
                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MessageSquare size={18} color="#38BDF8" />
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                            Live Prototype Review &amp; Revision Requests
                          </h3>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                          2-Way Real-Time Sync with Admin &amp; Super Admin
                        </span>
                      </div>

                      {reviewSubmittedMsg && (
                        <div style={{ marginBottom: '12px', padding: '10px 14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '8px', color: '#86EFAC', fontSize: '0.78rem' }}>
                          {reviewSubmittedMsg}
                        </div>
                      )}

                      {/* Submission Form */}
                      <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <select
                            value={newReviewCategory}
                            onChange={(e) => setNewReviewCategory(e.target.value)}
                            style={{ background: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.78rem', outline: 'none' }}
                          >
                            <option value="UI / Design">UI / Design Polish</option>
                            <option value="Bug / Error">Bug / Broken Link</option>
                            <option value="Content / Text">Content / Text Update</option>
                            <option value="Feature / API">Feature / API Tweak</option>
                          </select>

                          <input
                            type="text"
                            placeholder="Type revision notes, color adjustments, or mobile fixes..."
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            style={{ flex: 1, minWidth: '220px', background: '#1E293B', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                          />

                          <button
                            type="submit"
                            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <Send size={14} />
                            <span>Submit Feedback</span>
                          </button>
                        </div>
                      </form>

                      {/* Submitted Revisions List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {clientReviews.map((rev) => (
                          <div
                            key={rev.id}
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              borderRadius: '10px',
                              padding: '10px 14px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '8px',
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)', padding: '1px 6px', borderRadius: '4px' }}>
                                  {rev.category}
                                </span>
                                <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>{rev.text}</span>
                              </div>
                              <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '2px' }}>Submitted: {rev.createdAt}</div>
                            </div>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '12px',
                                background: rev.status === 'Solved' ? 'rgba(74, 222, 128, 0.15)' : rev.status === 'Working' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                                color: rev.status === 'Solved' ? '#4ADE80' : rev.status === 'Working' ? '#FBBF24' : '#38BDF8',
                                border: `1px solid ${rev.status === 'Solved' ? 'rgba(74, 222, 128, 0.3)' : rev.status === 'Working' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
                              }}
                            >
                              {rev.status === 'Solved' ? '✅ Solved & Updated' : rev.status === 'Working' ? '🔨 Working (Super Admin)' : '⏳ In Review'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 1: OVERVIEW & WEBSITE IDENTITY (WHEN 100% LIVE) ─── */}
              {isLive && activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Top 4 Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>AVAILABLE OTP CREDITS</span>
                        <Smartphone size={16} color="#38BDF8" />
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: wallet.availableCredits < 500 ? '#F43F5E' : '#4ADE80', margin: '6px 0 2px' }}>
                        {wallet.availableCredits.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                        Status: <strong style={{ color: wallet.lowBalanceState === 'Normal' ? '#4ADE80' : '#F43F5E' }}>{wallet.lowBalanceState}</strong>
                      </div>
                    </div>

                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>WEBSITE PRODUCTION STATUS</span>
                        <Globe size={16} color="#4ADE80" />
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4ADE80', margin: '8px 0 4px' }}>
                        🟢 Live in Production
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                        Uptime: <strong>99.98% Cloud Edge</strong>
                      </div>
                    </div>

                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>SERVER &amp; DOMAIN RENEWAL</span>
                        <Clock size={16} color="#FBBF24" />
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FDE047', margin: '8px 0 4px' }}>
                        {clientData.domainExpiryDate || 'Nov 2026'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                        Managed by Fixkar Enterprise
                      </div>
                    </div>

                    <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.9) 0%, rgba(9, 13, 25, 0.98) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>SUPPORT &amp; TICKETS</span>
                        <LifeBuoy size={16} color="#60A5FA" />
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '6px 0 2px' }}>
                        {tickets.filter((t) => t.status === 'Open').length} Open
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                        Priority Technical Helpdesk
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Details Card */}
                  <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                      Your Deployed Web Infrastructure
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontFamily: 'monospace' }}>DOMAIN NAME</div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{clientData.domain}</div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>Registrar: {clientData.domainProvider || 'Hostinger India'}</div>
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#4ADE80', fontFamily: 'monospace' }}>CLOUD SERVER TIER</div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{clientData.serverType || 'Managed VPS Edge'}</div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>Location: {clientData.serverProvider || 'DigitalOcean Cloud'}</div>
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#A78BFA', fontFamily: 'monospace' }}>DLT OTP HEADER</div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{clientData.dltSenderId || 'FIXKAR'}</div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>Gateway: {clientData.otpProvider || 'Fast2SMS Enterprise DLT'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })()}

        {/* ─── TAB 2: OTP LIVE WALLET & INSTANT RAZORPAY RECHARGE ─────────── */}
        {activeTab === 'otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Low Balance Alert Banner */}
            {wallet.availableCredits < 500 && (
              <div style={{ padding: '14px 18px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={20} color="#F43F5E" />
                  <div>
                    <div style={{ fontWeight: 700, color: '#FDA4AF', fontSize: '0.88rem' }}>
                      Low Balance Alert: {wallet.availableCredits} Credits Remaining
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '2px' }}>
                      Recharge your OTP credits now to prevent SMS verification failures for student / user logins.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleInitiateRazorpay(otpPackages[1])}
                  style={{ background: '#F43F5E', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Quick Recharge
                </button>
              </div>
            )}

            {/* Instant Razorpay Pricing Cards */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                Buy OTP Verification Credits (Instant Razorpay Activation)
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '16px' }}>
                Choose a package below to pay securely via Razorpay (UPI, GPay, PhonePe, Paytm, Cards, NetBanking). Credits will be credited instantly to your website.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {otpPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    style={{
                      background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.95) 0%, rgba(9, 13, 25, 0.98) 100%)',
                      border: pkg.popular ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      boxShadow: pkg.popular ? '0 15px 35px rgba(56, 189, 248, 0.2)' : 'none',
                    }}
                  >
                    {pkg.popular && (
                      <span style={{ position: 'absolute', top: '-10px', right: '18px', background: '#38BDF8', color: '#000', fontSize: '0.64rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                        MOST POPULAR
                      </span>
                    )}

                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>{pkg.name}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4ADE80', margin: '8px 0 2px' }}>
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#38BDF8', fontFamily: 'monospace' }}>
                        +{pkg.credits.toLocaleString()} Credits • {pkg.perOtp}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5, margin: '12px 0 18px' }}>
                        {pkg.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleInitiateRazorpay(pkg)}
                      style={{
                        background: pkg.popular ? 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)' : 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid',
                        borderColor: pkg.popular ? '#38BDF8' : 'rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <CreditCard size={14} />
                      <span>Pay via Razorpay →</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Masked OTP Logs Table */}
            <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontWeight: 700, color: '#fff' }}>
                Recent SMS OTP Verification Logs (Masked)
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.02)', color: '#64748B', fontFamily: 'monospace' }}>
                      <th style={{ padding: '10px 18px', textAlign: 'left' }}>PURPOSE</th>
                      <th style={{ padding: '10px 18px', textAlign: 'left' }}>MASKED MOBILE</th>
                      <th style={{ padding: '10px 18px', textAlign: 'left' }}>CREDITS</th>
                      <th style={{ padding: '10px 18px', textAlign: 'left' }}>STATUS</th>
                      <th style={{ padding: '10px 18px', textAlign: 'left' }}>TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otpUsage.map((log) => (
                      <tr key={log.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '12px 18px', color: '#fff' }}>{log.purpose}</td>
                        <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#38BDF8' }}>{log.maskedMobile}</td>
                        <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#F43F5E' }}>-{log.creditUsed}</td>
                        <td style={{ padding: '12px 18px', color: '#4ADE80' }}>{log.status}</td>
                        <td style={{ padding: '12px 18px', color: '#94A3B8', fontSize: '0.74rem' }}>{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: INVOICES & PRINTABLE PDF RECEIPTS ───────────────────── */}
        {activeTab === 'invoices' && (
          <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>Payment History &amp; Official Digitally Signed Receipts</span>
              <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Verified by Razorpay Gateway</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.02)', color: '#64748B', fontFamily: 'monospace' }}>
                    <th style={{ padding: '10px 18px', textAlign: 'left' }}>RECEIPT #</th>
                    <th style={{ padding: '10px 18px', textAlign: 'left' }}>PURPOSE &amp; SERVICE</th>
                    <th style={{ padding: '10px 18px', textAlign: 'left' }}>AMOUNT</th>
                    <th style={{ padding: '10px 18px', textAlign: 'left' }}>DATE</th>
                    <th style={{ padding: '10px 18px', textAlign: 'left' }}>STATUS</th>
                    <th style={{ padding: '10px 18px', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pay) => (
                    <tr key={pay.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#38BDF8', fontWeight: 700 }}>
                        {pay.receiptNumber || pay.invoiceNumber}
                      </td>
                      <td style={{ padding: '12px 18px', color: '#fff' }}>
                        <div>{pay.paymentMethod || 'Razorpay Gateway'}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>Ref: {pay.transactionReference}</div>
                      </td>
                      <td style={{ padding: '12px 18px', fontWeight: 700, color: '#4ADE80' }}>{pay.amount}</td>
                      <td style={{ padding: '12px 18px', color: '#94A3B8' }}>{pay.paymentDate}</td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ADE80', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          PAID IN FULL
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedReceiptPayment(pay)}
                          style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '5px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Printer size={12} />
                          <span>PDF Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB 4: RENEWALS RADAR ───────────────────────────────────────── */}
        {activeTab === 'renewals' && (
          <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Your Annual Server &amp; Domain Renewal Schedule
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '16px' }}>
              Fixkar manages automated zero-downtime maintenance and domain security renewals.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#38BDF8', fontFamily: 'monospace' }}>ANNUAL DOMAIN RENEWAL</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>{clientData.domain}</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Expiry: <strong>{clientData.domainExpiryDate || '2026-11-10'}</strong></div>
                <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#4ADE80', fontWeight: 700 }}>
                  ● Active &amp; Protected by Fixkar
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#4ADE80', fontFamily: 'monospace' }}>CLOUD VPS HOSTING &amp; SSL</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>{clientData.serverType || 'Cloud VPS Edge'}</div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Renewal: <strong>{clientData.hostingRenewalDate || '2026-11-10'}</strong></div>
                <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#4ADE80', fontWeight: 700 }}>
                  ● 99.98% High-Speed Edge Compute
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: SUPPORT HELPDESK ─────────────────────────────────────── */}
        {activeTab === 'support' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Strict Support Policy Notice Banner */}
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <LifeBuoy size={22} color="#38BDF8" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
                    🛠️ Official Fixkar Support Policy (100% Ticket &amp; Email Based)
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.4 }}>
                    To ensure documented SLA tracking and audit trails, Fixkar does <strong>not provide phone call support</strong>. Please raise a ticket below or email <a href="mailto:support@fixkar.co.in" style="color: #38BDF8; text-decoration: none; font-weight: 600;">support@fixkar.co.in</a>.
                  </div>
                </div>
              </div>
              <a
                href="mailto:support@fixkar.co.in"
                style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38BDF8', padding: '7px 14px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={13} />
                <span>support@fixkar.co.in</span>
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {/* Raise New Ticket */}
              <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                  Raise Priority Support Ticket
                </h3>

              {ticketSubmitted && (
                <div style={{ padding: '10px 14px', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.4)', borderRadius: '8px', color: '#86EFAC', fontSize: '0.8rem', marginBottom: '14px' }}>
                  ✓ Support ticket submitted. Fixkar engineering lead will assist you shortly.
                </div>
              )}

              <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                    style={{ width: '100%', background: '#0D1323', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '0.82rem' }}
                  >
                    <option value="Website Maintenance">Website Maintenance / Content Update</option>
                    <option value="OTP Verification Issue">OTP Verification &amp; SMS Gateway</option>
                    <option value="Billing & Invoicing">Billing, Payments &amp; Receipts</option>
                    <option value="Server / Hosting">Server Speed &amp; Hosting Issue</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of the request..."
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you need updated or checked..."
                    value={newTicketDesc}
                    onChange={(e) => setNewTicketDesc(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{ background: '#2563EB', border: 'none', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Send size={14} />
                  <span>Submit Ticket</span>
                </button>
              </form>
            </div>

            {/* Existing Tickets */}
            <div style={{ background: 'linear-gradient(180deg, rgba(14, 21, 38, 0.88) 0%, rgba(9, 13, 25, 0.96) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                Your Support Tickets
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tickets.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px' }}>
                    <div style={{ color: '#94A3B8', fontSize: '0.84rem', fontWeight: 600 }}>No Support Tickets Active</div>
                    <div style={{ color: '#64748B', fontSize: '0.72rem', marginTop: '2px' }}>Your web services and servers are 100% operational.</div>
                  </div>
                ) : (
                  tickets.map((tkt) => (
                    <div key={tkt.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'monospace', color: '#38BDF8', fontSize: '0.78rem', fontWeight: 800 }}>
                            {tkt.id || tkt.ticketNumber}
                          </span>
                          {tkt.priority && (
                            <span style={{ fontSize: '0.66rem', color: tkt.priority === 'High' ? '#FDA4AF' : '#93C5FD', background: tkt.priority === 'High' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              {tkt.priority} Priority
                            </span>
                          )}
                        </div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: tkt.status === 'Resolved' ? 'rgba(74, 222, 128, 0.15)' : tkt.status === 'In Progress' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(251, 191, 36, 0.15)',
                          color: tkt.status === 'Resolved' ? '#4ADE80' : tkt.status === 'In Progress' ? '#38BDF8' : '#FDE047',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}>
                          ● {tkt.status}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', margin: '8px 0 4px' }}>
                        {tkt.subject}
                      </div>

                      {tkt.description && (
                        <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '6px' }}>
                          {tkt.description}
                        </div>
                      )}

                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                        Logged: {tkt.createdAt || tkt.date || 'Recent'}
                      </div>

                      {/* Developer Progress Notes from Admin */}
                      {tkt.notes && (
                        <div style={{ marginTop: '10px', padding: '10px 12px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            Fixkar Engineering Lead Update
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#E2E8F0', marginTop: '3px', lineHeight: 1.5 }}>
                            {tkt.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>

      {/* ─── 24/7 GLOBAL VIEWPORT FLOATING CLIENT SUPPORT AI LAUNCHER BUTTON ──────── */}
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: 'max(20px, calc((100vw - 1240px) / 2 + 32px))',
          zIndex: 99990,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        <button
          onClick={() => setActiveTab('support')}
          aria-label="Fixkar Client Support AI"
          title="Instant Client Support Desk"
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
    </div>
  );
}
