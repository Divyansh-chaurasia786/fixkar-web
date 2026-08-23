import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ResourcesStudio } from '../components/resources/ResourcesStudio';
import { ArrowRight, BookOpen, Download, FileText, CheckCircle2, X } from 'lucide-react';

export function ResourcesPage({ onNavigate }) {
  const { t } = useLanguage();
  const [activeDoc, setActiveDoc] = useState(null);

  const guides = [
    {
      id: 'g1',
      title: 'The Sub-300ms Web Performance Checklist (2026 Edition)',
      category: 'Performance Engineering',
      content: `1. Critical CSS inlining for above-the-fold content
2. AVIF / WebP image responsive srcset optimization
3. Edge-rendered React Server Components with Zero Client JS
4. Preconnect to critical third-party payment and font origins
5. Aggressive route prefetching on link hover`,
    },
    {
      id: 'g2',
      title: 'Headless Shopify vs Traditional Theme: Architecture Blueprint',
      category: 'E-commerce Architecture',
      content: `• Headless Next.js Storefront consumes Shopify Storefront GraphQL API
• Cart state synchronized via lightweight client-side state
• Edge middleware handles regional routing and localized currency conversion
• Cart abandonment reduced by 35%+ through zero-redirect checkout flows`,
    },
    {
      id: 'g3',
      title: 'Embedding Conversational AI Copilots in Production',
      category: 'AI Engineering',
      content: `• Server-Sent Events (SSE) stream token responses directly to UI
• Client-side token hydration prevents layout shift during text streaming
• Structured JSON output validation prevents hallucinations in product recommendations`,
    },
  ];

  return (
    <div className="page-view-container animate-fade-in">
      {/* Resources Overview */}
      <ResourcesStudio />

      {/* Interactive Tech Blueprints Section */}
      <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-divider)', paddingTop: '40px' }}>
        <div className="section-header-editorial">
          <div>
            <div className="section-eyebrow">OPEN SOURCE & BLUEPRINTS</div>
            <h2 className="section-title-large">Interactive Studio Playbooks</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
          {guides.map((g) => (
            <div
              key={g.id}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <span className="tech-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>{g.category}</span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
                  {g.title}
                </h3>
              </div>

              <button
                className="btn-secondary-glass"
                style={{ width: '100%', fontSize: '0.82rem' }}
                onClick={() => setActiveDoc(g)}
              >
                <span>Read Blueprint</span>
                <BookOpen size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      {activeDoc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 3, 4, 0.88)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 15, 26, 0.96)',
              border: '1px solid rgba(120, 170, 255, 0.3)',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.95)',
            }}
          >
            <button
              onClick={() => setActiveDoc(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>

            <span className="tech-tag">{activeDoc.category}</span>

            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', margin: '12px 0 16px' }}>
              {activeDoc.title}
            </h2>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                color: 'var(--text-body)',
                whiteSpace: 'pre-line',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              {activeDoc.content}
            </div>

            <button
              className="btn-primary-cta"
              style={{ width: '100%' }}
              onClick={() => {
                setActiveDoc(null);
                onNavigate('quote');
              }}
            >
              <span>Build With This Architecture →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
