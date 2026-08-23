import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HowItWorks } from '../components/workflow/HowItWorks';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Lock, Terminal } from 'lucide-react';

export function HowItWorksPage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="page-view-container animate-fade-in">
      {/* 4-Stage Sprint Overview */}
      <HowItWorks />

      {/* Deep-Dive Sprint Policies & Quality Standards */}
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-divider)', paddingTop: '40px' }}>
        <div className="section-header-editorial">
          <div>
            <div className="section-eyebrow">STANDARDS & OWNERSHIP</div>
            <h2 className="section-title-large">The Fixkar Development Principles</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--blue-primary)' }}>
              <Zap size={18} />
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>Modern & Responsive Architecture</strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Experiences designed intentionally for desktop, tablet, and mobile with clean, maintainable code structured for long-term growth.
            </p>
          </div>

          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--blue-primary)' }}>
              <Lock size={18} />
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>100% Code & Asset Ownership</strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Complete ownership of your source code, website assets, and setup is handed over to you upon project delivery.
            </p>
          </div>

          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--blue-primary)' }}>
              <ShieldCheck size={18} />
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-heading)' }}>Security Conscious & Reliable Support</strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Authentication, data handling, and access controls are built with security in mind, backed by reliable ongoing support.
            </p>
          </div>
        </div>

        {/* CTA to Quote */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <button className="btn-primary-cta" onClick={() => onNavigate('contact')}>
            <span>Start Your Project →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
