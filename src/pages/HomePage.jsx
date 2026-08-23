import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Hero } from '../components/hero/Hero';
import { HowItWorks } from '../components/workflow/HowItWorks';
import { ArrowRight, ArrowUpRight, Zap, Shield, Sparkles, Terminal, CheckCircle2, Utensils, Smartphone } from 'lucide-react';

export function HomePage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="page-view-container animate-fade-in">
      {/* Hero Section */}
      <Hero
        onGetQuote={() => onNavigate('quote')}
        onViewWork={() => onNavigate('work')}
      />

      {/* Real Client Logo Trust Bar */}
      <div
        style={{
          marginTop: '40px',
          padding: '24px 32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--blue-primary)', letterSpacing: '0.08em' }}>
            {t.trust.label}
          </span>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 600, marginTop: '2px' }}>
            {t.trust.sub}
          </div>
        </div>

        {/* Client Logos Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {/* S Caterers Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => onNavigate('work')}
          >
            <img
              src="/logo-scaterers.png"
              alt="S Caterers & Events"
              style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)' }}>S Caterers</span>
          </div>

          {/* Ecofone Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => onNavigate('work')}
          >
            <img
              src="/logo-ecofone.png"
              alt="Ecofone"
              style={{ height: '32px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)' }}>Ecofone</span>
          </div>

          {/* Singh's Glamour */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => onNavigate('work')}
          >
            <img
              src="/logo-singhs-glamour.png"
              alt="Singh's Glamour"
              style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)' }}>Singh's Glamour</span>
          </div>
        </div>
      </div>

      {/* Simple & Techy: Why Modern Web Engineering Matters */}
      <div style={{ marginTop: '64px', borderTop: '1px solid var(--border-divider)', paddingTop: '48px' }}>
        <div className="section-header-editorial">
          <div>
            <div className="section-eyebrow">{t.homeFacts.eyebrow}</div>
            <h2 className="section-title-large">{t.homeFacts.title}</h2>
          </div>
          <p className="section-tagline">
            {t.homeFacts.tagline}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
          {/* Card 1 */}
          <div
            style={{
              padding: '28px 24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-primary)', marginBottom: '12px' }}>
              <Zap size={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>{t.homeFacts.c1Badge}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '10px' }}>
              {t.homeFacts.c1Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
              {t.homeFacts.c1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              padding: '28px 24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-primary)', marginBottom: '12px' }}>
              <Sparkles size={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>{t.homeFacts.c2Badge}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '10px' }}>
              {t.homeFacts.c2Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
              {t.homeFacts.c2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              padding: '28px 24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-primary)', marginBottom: '12px' }}>
              <Shield size={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>{t.homeFacts.c3Badge}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '10px' }}>
              {t.homeFacts.c3Title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
              {t.homeFacts.c3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage Sprint Process Workflow (Home Page Exclusive) */}
      <div style={{ marginTop: '64px', borderTop: '1px solid var(--border-divider)', paddingTop: '48px' }}>
        <HowItWorks />
      </div>

      {/* Featured Call to Action Bar */}
      <div
        style={{
          marginTop: '64px',
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.14) 0%, rgba(10, 14, 22, 0.7) 80%)',
          border: '1px solid rgba(120, 170, 255, 0.22)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <span className="hero-tag" style={{ marginBottom: '8px' }}>{t.homeFacts.ctaTag}</span>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)' }}>
            {t.homeFacts.ctaTitle}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '4px' }}>
            {t.homeFacts.ctaDesc}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-primary-cta" onClick={() => onNavigate('quote')}>
            <span>{t.homeFacts.ctaQuoteBtn}</span>
          </button>
          <button className="btn-secondary-glass" onClick={() => onNavigate('work')}>
            <span>{t.homeFacts.ctaWorkBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
