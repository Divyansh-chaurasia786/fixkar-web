import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Sparkles, Bot, Terminal, Code2, Cpu } from 'lucide-react';
import heroWorkstationImg from '../../assets/hero-workstation.webp';

export function Hero({ onGetQuote, onViewWork, onOpenAI }) {
  const { t } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="hero-grid" id="home">
      {/* Left Column: Direct Typography & CTAs */}
      <div className="hero-content-col">
        <div className="hero-tag">
          <span className="hero-tag-pulse" />
          <span>{t.hero.tag}</span>
        </div>

        <h1 className="hero-headline">
          {t.hero.headlinePre}{' '}
          <span className="blue-accent">{t.hero.headlineAccent}</span>
        </h1>

        <p className="hero-description">
          {t.hero.description}
        </p>

        <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <button className="btn-primary-cta" onClick={onGetQuote}>
            <span>{t.hero.ctaPrimary || 'Get Instant Project Quote'}</span>
            <ArrowRight size={16} />
          </button>

          <button className="btn-secondary-glass" onClick={onViewWork}>
            <span>{t.hero.ctaSecondary}</span>
          </button>
        </div>

        {/* Technical Baseline Metrics */}
        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-num">{t.hero.metricUptime}</span>
            <span className="metric-label">{t.hero.metricUptimeLabel}</span>
          </div>
          <div className="metric-item">
            <span className="metric-num">{t.hero.metricSpeed}</span>
            <span className="metric-label">{t.hero.metricSpeedLabel}</span>
          </div>
          <div className="metric-item">
            <span className="metric-num">{t.hero.metricDelivery}</span>
            <span className="metric-label">{t.hero.metricDeliveryLabel}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Weightless Floating Developer Workstation with Vibrant Backlight Aura */}
      <div className="hero-visual-wrapper">
        {/* Multi-Layer Ambient Backlights behind image */}
        <div className="workstation-backlight-glow" />
        <div className="workstation-backlight-glow-secondary" />

        {/* Floating Workstation Image Chassis */}
        <div className="workstation-frame workstation-floating">
          {!imgFailed ? (
            <img
              src={heroWorkstationImg || '/hero-workstation.webp'}
              alt="Fixkar Developer Workstation"
              className="workstation-img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '380px',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
                textAlign: 'center',
                color: '#38BDF8',
              }}
            >
              <Cpu size={48} style={{ marginBottom: '16px', filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px', fontWeight: 600 }}>
                Fixkar Developer Workstation
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', maxWidth: '320px', lineHeight: 1.5 }}>
                Custom Portals, Dashboards & High-Performance Web Systems Built to Scale.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
