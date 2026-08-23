import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Lock,
  User,
  Smartphone,
  X,
  AlertTriangle,
  CheckCircle2,
  Crown,
  KeyRound,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

export function SuperAdminLoginModal({ isOpen, onClose }) {
  const { loginSuperAdmin, isLoading, error, setError, adminToken, API_BASE } = useAuth();

  // Primary 2FA Login State
  const [username, setUsername] = useState('fixkar_root');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTotpSetupHelp, setShowTotpSetupHelp] = useState(false);

  // Recovery / Forgot Password State
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryType, setRecoveryType] = useState('email_otp'); // 'email_otp' | 'recovery_key'
  const [emailOtp, setEmailOtp] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [recoverySuccessMsg, setRecoverySuccessMsg] = useState('');
  const [recoveryErrorMsg, setRecoveryErrorMsg] = useState('');

  if (!isOpen) return null;

  // 1. Submit Primary 2FA Elevation Login
  const handle2FASubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter Super Admin username and password.');
      return;
    }
    if (!totpCode.trim() || totpCode.trim().length < 4) {
      setError('Please enter your 6-digit Authenticator TOTP code.');
      return;
    }

    const res = await loginSuperAdmin(username.trim(), password.trim(), totpCode.trim());
    if (res.success) {
      onClose();
    }
  };

  // 2. Request Emergency Email OTP
  const handleRequestRecoveryOtp = async () => {
    setIsSendingOtp(true);
    setRecoveryErrorMsg('');
    setRecoverySuccessMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/super-admin/forgot-password/request-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || 'adm_session_token_2026'}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRecoverySuccessMsg(data.message || '✅ Emergency OTP dispatched to chaurasiadivyansh86@gmail.com');
      } else {
        setRecoveryErrorMsg(data.error || data.message || 'Failed to dispatch recovery OTP.');
      }
    } catch (err) {
      setRecoveryErrorMsg('Network Error: ' + err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 3. Verify Recovery Code & Reset Credentials
  const handleExecuteRecoveryReset = async (e) => {
    e.preventDefault();
    if (recoveryType === 'email_otp' && !emailOtp.trim()) {
      setRecoveryErrorMsg('Please enter the 6-digit Email OTP.');
      return;
    }
    if (recoveryType === 'recovery_key' && !recoveryKey.trim()) {
      setRecoveryErrorMsg('Please enter your Sovereign Recovery Key.');
      return;
    }
    if (!newPassword.trim() || newPassword.trim().length < 6) {
      setRecoveryErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    setIsResetting(true);
    setRecoveryErrorMsg('');
    setRecoverySuccessMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/super-admin/forgot-password/verify-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken || 'adm_session_token_2026'}`,
        },
        body: JSON.stringify({
          emailOtp: recoveryType === 'email_otp' ? emailOtp.trim() : undefined,
          recoveryKey: recoveryType === 'recovery_key' ? recoveryKey.trim() : undefined,
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRecoverySuccessMsg(data.message || '✅ Credentials restored! You can now log in.');
        setPassword(newPassword.trim());
        setTimeout(() => {
          setIsRecoveryMode(false);
          setRecoverySuccessMsg('');
        }, 2200);
      } else {
        setRecoveryErrorMsg(data.message || data.error || 'Recovery verification failed.');
      }
    } catch (err) {
      setRecoveryErrorMsg('Network Error: ' + err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 7, 18, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'linear-gradient(180deg, #150A26 0%, #090312 100%)',
          border: '1px solid rgba(168, 85, 247, 0.45)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(168, 85, 247, 0.25)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={16} />
        </button>

        {/* ─── VIEW 1: 2FA STEP-UP AUTHENTICATION (DEFAULT) ────────────────── */}
        {!isRecoveryMode ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(168, 85, 247, 0.35) 100%)',
                  border: '1px solid #FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#FBBF24',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.35)',
                }}
              >
                <Crown size={28} />
              </div>

              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#FDE047',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  marginBottom: '4px',
                }}
              >
                LAYER 2 ROOT SOVEREIGNTY
              </div>

              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                Super Admin 2FA Step-Up
              </h2>

              <p style={{ fontSize: '0.78rem', color: '#DDD6FE', marginTop: '6px', lineHeight: 1.45 }}>
                Enter your Super Admin credentials and 6-digit Authenticator TOTP token to elevate permissions.
              </p>
            </div>

            {/* Error Alert Box */}
            {error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: '#FCA5A5',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}
              >
                <AlertTriangle size={15} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* 2FA Form */}
            <form onSubmit={handle2FASubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Username */}
              <div>
                <label style={{ fontSize: '0.72rem', color: '#DDD6FE', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                  Super Admin Identity
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="fixkar_root"
                    style={{
                      width: '100%',
                      background: '#0B0418',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '9px 12px 9px 36px',
                      color: '#fff',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <label style={{ fontSize: '0.72rem', color: '#DDD6FE', textTransform: 'uppercase', fontWeight: 700 }}>
                    Master Super Admin Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecoveryMode(true);
                      setError(null);
                    }}
                    style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                  >
                    Forgot Password / 2FA?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter Super Admin master password"
                    style={{
                      width: '100%',
                      background: '#0B0418',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '9px 38px 9px 36px',
                      color: '#fff',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* 6-Digit Authenticator TOTP Code */}
              <div>
                <label style={{ fontSize: '0.72rem', color: '#FDE047', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '5px' }}>
                  📱 6-Digit Authenticator Code (2FA) *
                </label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={15} color="#FBBF24" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="000000"
                    value={totpCode}
                    onChange={(e) => {
                      setTotpCode(e.target.value.replace(/\D/g, ''));
                      if (error) setError(null);
                    }}
                    style={{
                      width: '100%',
                      background: '#0B0418',
                      border: '1px solid rgba(168, 85, 247, 0.55)',
                      borderRadius: '8px',
                      padding: '10px 12px 10px 38px',
                      color: '#FDE047',
                      fontFamily: 'monospace',
                      letterSpacing: '0.25em',
                      fontSize: '1.1rem',
                      fontWeight: 900,
                      boxSizing: 'border-box',
                      outline: 'none',
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Generated live by Google / Microsoft Authenticator</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94A3B8',
                    padding: '10px',
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
                  disabled={isLoading}
                  style={{
                    flex: 1.6,
                    background: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 900,
                    cursor: isLoading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 20px rgba(147, 51, 234, 0.5)',
                  }}
                >
                  <Crown size={15} color="#FDE047" />
                  <span>{isLoading ? 'Verifying 2FA...' : 'Verify 2FA & Unlock →'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ─── VIEW 2: FORGOT PASSWORD & EMERGENCY 2FA RECOVERY ────────────── */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsRecoveryMode(false);
                  setRecoveryErrorMsg('');
                  setRecoverySuccessMsg('');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#CBD5E1',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={13} />
                <span>Back to 2FA Login</span>
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid #38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                  color: '#38BDF8',
                }}
              >
                <KeyRound size={22} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Super Admin Sovereign Recovery
              </h3>
              <p style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '4px', lineHeight: 1.45 }}>
                Verify identity via registered Founder Email OTP or Master Sovereign Recovery Key.
              </p>
            </div>

            {/* Recovery Mode Selector Tabs */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={() => {
                  setRecoveryType('email_otp');
                  setRecoveryErrorMsg('');
                }}
                style={{
                  flex: 1,
                  background: recoveryType === 'email_otp' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  border: recoveryType === 'email_otp' ? '1px solid #38BDF8' : 'none',
                  color: recoveryType === 'email_otp' ? '#38BDF8' : '#94A3B8',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <Mail size={13} />
                <span>Founder Email OTP</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRecoveryType('recovery_key');
                  setRecoveryErrorMsg('');
                }}
                style={{
                  flex: 1,
                  background: recoveryType === 'recovery_key' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                  border: recoveryType === 'recovery_key' ? '1px solid #F59E0B' : 'none',
                  color: recoveryType === 'recovery_key' ? '#FDE047' : '#94A3B8',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <KeyRound size={13} />
                <span>Recovery Key</span>
              </button>
            </div>

            {/* Status Messages */}
            {recoveryErrorMsg && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', borderRadius: '8px', padding: '8px 12px', color: '#FCA5A5', fontSize: '0.76rem', marginBottom: '12px' }}>
                ⚠️ {recoveryErrorMsg}
              </div>
            )}
            {recoverySuccessMsg && (
              <div style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid #4ADE80', borderRadius: '8px', padding: '8px 12px', color: '#86EFAC', fontSize: '0.76rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} />
                <span>{recoverySuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleExecuteRecoveryReset} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recoveryType === 'email_otp' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700 }}>
                      6-Digit Email OTP (chaurasiadivyansh86@gmail.com) *
                    </label>
                    <button
                      type="button"
                      disabled={isSendingOtp}
                      onClick={handleRequestRecoveryOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#38BDF8',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0,
                      }}
                    >
                      <RefreshCw size={11} className={isSendingOtp ? 'animate-spin' : ''} />
                      <span>{isSendingOtp ? 'Sending...' : 'Send OTP to Email'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    style={{
                      width: '100%',
                      background: '#0B0418',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      color: '#38BDF8',
                      fontFamily: 'monospace',
                      letterSpacing: '0.2em',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                    Master Emergency Recovery Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={recoveryKey}
                    onChange={(e) => setRecoveryKey(e.target.value)}
                    placeholder="e.g. REC-FIXKAR-9835-ROOT"
                    style={{
                      width: '100%',
                      background: '#0B0418',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      color: '#FDE047',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 700, display: 'block', marginBottom: '5px' }}>
                  Set New Super Admin Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  style={{
                    width: '100%',
                    background: '#0B0418',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#fff',
                    fontSize: '0.84rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isResetting}
                style={{
                  marginTop: '4px',
                  background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: isResetting ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)',
                }}
              >
                <KeyRound size={14} />
                <span>{isResetting ? 'Verifying & Restoring...' : 'Verify & Reset Super Admin Password'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
