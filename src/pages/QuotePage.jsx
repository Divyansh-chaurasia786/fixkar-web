import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FixkarQuote } from '../components/quote/FixkarQuote';
import { ShieldCheck, Zap, Award, HelpCircle, Sliders, CheckCircle2 } from 'lucide-react';

export function QuotePage({ onBookSprint, prefilledScope }) {
  const { t } = useLanguage();

  return (
    <div className="page-view-container animate-fade-in">
      {/* 0-to-100 Full Customization Calculator with AI Pre-Selection Support */}
      <FixkarQuote onBookSprint={onBookSprint} prefilledScope={prefilledScope} />

      {/* Quote Transparency Guarantees */}
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-divider)', paddingTop: '40px' }}>
        <div className="section-header-editorial">
          <div>
            <div className="section-eyebrow">TRANSPARENT VALUE PROMISE</div>
            <h2 className="section-title-large">Pay Only For What You Need</h2>
          </div>
          <p className="section-tagline">
            Traditional agencies give vague lumpsum quotes with hidden surprise costs. With Fixkar, every page, feature, and integration is transparently priced.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <Sliders size={20} color="var(--blue-primary)" style={{ marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '6px' }}>0 to 100 Customization</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Whether you need a lean 1-page launchpad or a 15-page e-commerce powerhouse with booking calendars, you control your exact scope.
            </p>
          </div>

          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <Zap size={20} color="var(--blue-primary)" style={{ marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '6px' }}>50/50 Milestone Model</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              Zero risk. You only pay 50% advance to start your sprint, and the remaining 50% once your website is fully tested and ready to launch.
            </p>
          </div>

          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
            <Award size={20} color="var(--blue-primary)" style={{ marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '6px' }}>100% Code Ownership</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
              You own all source code, design assets, and database credentials forever. Zero platform lock-ins or mandatory retainers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
