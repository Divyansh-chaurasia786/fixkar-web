import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Code, Sparkles, Shield, FastForward } from 'lucide-react';

export function AboutStudio() {
  const { t } = useLanguage();

  return (
    <section className="canvas-section" id="about">
      {/* Section Header */}
      <div className="section-header-editorial">
        <div>
          <div className="section-eyebrow">{t.about.eyebrow}</div>
          <h2 className="section-title-large">{t.about.title}</h2>
        </div>
        <p className="section-tagline">{t.about.tagline}</p>
      </div>

      {/* About Grid: Philosophy & Principles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '16px' }}>
            {t.about.headline}
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '20px' }}>
            {t.about.story}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              borderTop: '1px solid var(--border-divider)',
              paddingTop: '20px',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--blue-primary)', marginBottom: '4px' }}>
                {t.about.zeroBloatTitle}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>
                {t.about.zeroBloatDesc}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--blue-primary)', marginBottom: '4px' }}>
                {t.about.directAccessTitle}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>
                {t.about.directAccessDesc}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Matrix Canvas */}
        <div
          style={{
            background: 'rgba(12, 17, 28, 0.75)',
            border: '1px solid var(--border-glass-nav)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CORE TECHNOLOGY MATRIX
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Shopify Storefront', 'Stripe / Razorpay', 'Docker', 'Vercel Edge', 'Cloudflare Workers'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--text-heading)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  padding: '5px 10px',
                  borderRadius: '6px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-divider)', paddingTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ✓ Verified 100/100 Core Web Vitals Standard
          </div>
        </div>
      </div>
    </section>
  );
}
