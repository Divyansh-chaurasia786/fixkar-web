import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Compass,
  Code2,
  Gauge,
  Rocket,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      phase: 'Day 1',
      title: 'Scope & Blueprint',
      desc: 'We finalize your pages, features, design direction, and lock a guaranteed delivery date.',
      icon: Compass,
      accent: '#38BDF8',
      tag: '✓ Fixed Timeline SLA',
    },
    {
      num: '02',
      phase: 'Days 2–5',
      title: 'Rapid Sprint Build',
      desc: 'Our developers code your responsive site using modern React / Next.js with WhatsApp webhooks.',
      icon: Code2,
      accent: '#4ADE80',
      tag: '✓ React & Next.js Code',
    },
    {
      num: '03',
      phase: 'Day 6',
      title: 'Speed & Quality QA',
      desc: 'Strict performance optimization to guarantee sub-0.3s load times and 100/100 mobile score.',
      icon: Gauge,
      accent: '#FACC15',
      tag: '✓ 100/100 Mobile Speed',
    },
    {
      num: '04',
      phase: 'Day 7',
      title: 'Handover & Live Launch',
      desc: 'We connect your official domain, SSL security, and hand over 100% source code ownership.',
      icon: Rocket,
      accent: '#C084FC',
      tag: '✓ 100% Code Ownership',
    },
  ];

  return (
    <section className="canvas-section" id="how-it-works" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '12px 14px' }}>
      
      {/* ─── SECTION HEADER ────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={13} color="#38BDF8" />
          <span>7–14 DAY SPRINT DELIVERY</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#fff', margin: '6px 0 6px', letterSpacing: '-0.02em' }}>
          How We Plan, Build &amp; Launch
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#94A3B8', maxWidth: '560px', margin: '0 auto', lineHeight: 1.5 }}>
          From initial handshake to live Google launch in 4 transparent horizontal stages.
        </p>
      </div>

      {/* ─── SEAMLESS HORIZONTAL PROCESS BAR & TIMELINE ────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(8, 12, 22, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '32px 24px 28px',
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.8)',
          position: 'relative',
        }}
      >
        {/* Desktop Connected Horizontal Track Line */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                }}
              >
                {/* Horizontal Node Header with Step Pill & Connecting Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Glowing Numbered Node */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `rgba(${s.accent === '#38BDF8' ? '56, 189, 248' : s.accent === '#4ADE80' ? '74, 222, 128' : s.accent === '#FACC15' ? '250, 204, 21' : '192, 132, 252'}, 0.15)`,
                        border: `1.5px solid ${s.accent}`,
                        color: s.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.84rem',
                        fontWeight: 900,
                        fontFamily: 'monospace',
                        boxShadow: `0 0 15px rgba(${s.accent === '#38BDF8' ? '56, 189, 248' : s.accent === '#4ADE80' ? '74, 222, 128' : s.accent === '#FACC15' ? '250, 204, 21' : '192, 132, 252'}, 0.25)`,
                        flexShrink: 0,
                      }}
                    >
                      {s.num}
                    </div>

                    {/* Timeline Day Badge */}
                    <span
                      style={{
                        fontSize: '0.66rem',
                        color: s.accent,
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.phase}
                    </span>
                  </div>

                  {/* Horizontal Arrow between steps (desktop only) */}
                  {!isLast && (
                    <div style={{ color: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>

                {/* Step Title */}
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: '2px 0 0', letterSpacing: '-0.01em' }}>
                  {s.title}
                </h3>

                {/* Short Description */}
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.45, margin: 0, minHeight: '44px' }}>
                  {s.desc}
                </p>

                {/* Feature Tag Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.7rem',
                    color: '#CBD5E1',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    marginTop: '2px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <Check size={11} color={s.accent} strokeWidth={3} />
                  <span>{s.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
