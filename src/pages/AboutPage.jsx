import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AboutStudio } from '../components/about/AboutStudio';
import { ArrowRight, Code, Shield, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export function AboutPage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="page-view-container animate-fade-in">
      {/* Studio Profile */}
      <AboutStudio />

      {/* Real Track Record Section */}
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-divider)', paddingTop: '40px' }}>
        <div className="section-header-editorial">
          <div>
            <div className="section-eyebrow">{t.about.trackRecordEyebrow}</div>
            <h2 className="section-title-large">{t.about.trackRecordTitle}</h2>
          </div>
          <p className="section-tagline">
            {t.about.trackRecordTagline}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <div
            style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              cursor: 'pointer',
            }}
            onClick={() => onNavigate('work')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/logo-scaterers.png" alt="S Caterers" style={{ height: '28px' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <strong style={{ color: 'var(--text-heading)', fontSize: '1.05rem' }}>{t.work.scaterers.title}</strong>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              {t.work.scaterers.benefit}
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              cursor: 'pointer',
            }}
            onClick={() => onNavigate('work')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/logo-ecofone.png" alt="Ecofone" style={{ height: '26px' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <strong style={{ color: 'var(--text-heading)', fontSize: '1.05rem' }}>{t.work.ecofone.title}</strong>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              {t.work.ecofone.benefit}
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              cursor: 'pointer',
            }}
            onClick={() => onNavigate('work')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/logo-singhs-glamour.png" alt="Singh's Glamour" style={{ height: '26px' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <strong style={{ color: 'var(--text-heading)', fontSize: '1.05rem' }}>{t.work.singhs.title}</strong>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              {t.work.singhs.benefit}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <button className="btn-primary-cta" onClick={() => onNavigate('quote')}>
            <span>{t.about.calcQuoteBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
