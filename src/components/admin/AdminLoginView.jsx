import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, User, ArrowRight, AlertCircle, KeyRound, Sparkles } from 'lucide-react';

export function AdminLoginView({ onNavigateHome }) {
  const { loginAdmin, isLoading, error, setError } = useAuth();
  const [identifier, setIdentifier] = useState('admin@fixkar.co.in');
  const [password, setPassword] = useState('AdminPass@2026');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in both username/email and password.');
      return;
    }
    await loginAdmin(identifier, password);
  };

  return (
    <div className="page-view-container animate-fade-in" style={{ maxWidth: '520px', margin: '40px auto 80px' }}>
      {/* Frosted Security Chassis */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.92) 0%, rgba(8, 12, 22, 0.96) 100%)',
          border: '1px solid var(--border-glass-nav)',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(37, 99, 235, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Holographic Security Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(163, 230, 53, 0.15) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#60A5FA',
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)',
            }}
          >
            <Shield size={28} />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--blue-primary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            RESTRICTED ACCESS PORTAL
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
            Admin Authentication
          </h2>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.5 }}>
            Layer 1 privileged console for lead dispatch, client sprint tracking, and operational management.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#FCA5A5',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              animation: 'fadeInPage 0.2s ease',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-body)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.04em',
              }}
            >
              Admin Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="admin@fixkar.co.in"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (error) setError(null);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 42px',
                  color: 'var(--text-heading)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-body)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.04em',
              }}
            >
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 42px',
                  color: 'var(--text-heading)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          {/* Quick Demo Credentials Helper */}
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px dashed rgba(59, 130, 246, 0.3)',
              borderRadius: '10px',
              fontSize: '0.76rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              <strong style={{ color: 'var(--blue-highlight)' }}>Layer 1 Demo:</strong>{' '}
              <code style={{ color: '#fff' }}>admin@fixkar.co.in</code> / <code style={{ color: '#fff' }}>AdminPass@2026</code>
            </span>
            <button
              type="button"
              onClick={() => {
                setIdentifier('admin@fixkar.co.in');
                setPassword('AdminPass@2026');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--blue-primary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.74rem',
              }}
            >
              Fill
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary-cta"
            style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <KeyRound size={16} />
                <span>Enter Admin Console →</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid var(--border-divider)', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={onNavigateHome}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
