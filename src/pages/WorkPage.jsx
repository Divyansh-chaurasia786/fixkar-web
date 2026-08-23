import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { WorkPortfolio } from '../components/work/WorkPortfolio';
import { ArrowRight, Zap, ExternalLink, Activity, ShieldCheck, Layers, X, CheckCircle2, Sparkles } from 'lucide-react';

export function WorkPage({ onNavigate, onPrefillQuote }) {
  const { t } = useLanguage();
  const [activeModalProject, setActiveModalProject] = useState(null);

  const handleBuildSimilar = (proj) => {
    setActiveModalProject(null);
    if (onPrefillQuote) {
      onPrefillQuote({
        siteType: proj.basePackageId || 'business',
        businessName: `Similar to ${proj.title}`,
        notes: `Customer requested architecture similar to ${proj.title} (${proj.headline})`,
      });
    } else if (onNavigate) {
      onNavigate('quote');
    }
  };

  return (
    <div className="page-view-container animate-fade-in">
      {/* Page Header */}
      <div className="section-header-editorial" style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#38BDF8" />
          <span>PROVEN CLIENT CASE STUDIES &amp; PRODUCTION LAUNCHES</span>
        </div>
        <h1 className="section-title-large" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: '#fff', margin: '6px 0' }}>
          Our Real-World Projects
        </h1>
        <p className="section-tagline" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.88rem', color: '#94A3B8' }}>
          High-performance websites engineered for sub-second speeds, smooth customer journeys, and automated lead capture.
        </p>
      </div>

      {/* Real Projects Portfolio Grid with Interactive Filters */}
      <WorkPortfolio
        onSelectProject={(proj) => setActiveModalProject(proj)}
        onPrefillQuote={(scope) => {
          if (onPrefillQuote) {
            onPrefillQuote(scope);
          } else if (onNavigate) {
            onNavigate('quote');
          }
        }}
      />

      {/* Interactive Project Deep-Dive Modal */}
      {activeModalProject && (
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
              background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
              border: `1px solid ${activeModalProject.borderColor || 'rgba(56, 189, 248, 0.35)'}`,
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(56, 189, 248, 0.15)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#CBD5E1',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                }}
              >
                {activeModalProject.logo ? (
                  <img
                    src={activeModalProject.logo}
                    alt={activeModalProject.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <Sparkles size={22} color="#38BDF8" />
                )}
              </div>

              <div>
                <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {activeModalProject.categoryLabel}
                </span>
                <h2 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, margin: '2px 0 0' }}>
                  {activeModalProject.title}
                </h2>
              </div>
            </div>

            {/* Headline Banner */}
            <div
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Zap size={16} color="#38BDF8" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.84rem', color: '#E2E8F0', fontWeight: 600 }}>
                {activeModalProject.headline}
              </span>
            </div>

            {/* Architecture Details */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                How It Works &amp; Client Impact
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 10px' }}>
                {activeModalProject.simpleBenefit}
              </p>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.45, margin: 0 }}>
                <strong style={{ color: '#38BDF8' }}>Engineering:</strong> {activeModalProject.techDetail}
              </p>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '14px',
                marginBottom: '18px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                textAlign: 'center',
              }}
            >
              {activeModalProject.stats && activeModalProject.stats.map((s, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '1.2rem', color: '#FDE047', fontWeight: 900, fontFamily: 'monospace' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {activeModalProject.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.7rem',
                    color: '#94A3B8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '10px' }}>
              <a
                href={activeModalProject.fullUrl || `https://${activeModalProject.liveUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38BDF8',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <ExternalLink size={14} />
                <span>Visit Live Website</span>
              </a>

              <button
                type="button"
                className="btn-primary-cta"
                style={{ width: '100%', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => handleBuildSimilar(activeModalProject)}
              >
                <span>Build Similar Solution</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default WorkPage;
