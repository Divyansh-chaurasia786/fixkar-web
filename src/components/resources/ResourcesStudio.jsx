import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, FileCode, Cpu, ArrowUpRight } from 'lucide-react';

export function ResourcesStudio() {
  const { t } = useLanguage();

  const resources = [
    {
      id: 'r1',
      type: 'TECHNICAL BLUEPRINT',
      title: 'Architecting Sub-300ms Ecommerce Checkout Flows',
      desc: 'How headless architectures and edge caching reduce cart abandonment by 38%.',
      readTime: '6 min read',
    },
    {
      id: 'r2',
      type: 'BENCHMARK REPORT',
      title: 'Next.js 15 vs Traditional CMS: Speed & Conversion Audit',
      desc: 'Real performance data analyzing 45 production storefronts across Core Web Vitals.',
      readTime: '8 min read',
    },
    {
      id: 'r3',
      type: 'AI PLAYBOOK',
      title: 'Embedding Conversational AI Copilots in Web Platforms',
      desc: 'Patterns for context hydration, streaming responses, and responsive client UX.',
      readTime: '5 min read',
    },
  ];

  return (
    <section className="canvas-section" id="resources">
      {/* Section Header */}
      <div className="section-header-editorial">
        <div>
          <div className="section-eyebrow">{t.resources.eyebrow}</div>
          <h2 className="section-title-large">{t.resources.title}</h2>
        </div>
        <p className="section-tagline">{t.resources.tagline}</p>
      </div>

      {/* Resources List (Editorial Rows) */}
      <div className="service-row-list">
        {resources.map((item) => (
          <div key={item.id} className="service-row" style={{ gridTemplateColumns: '160px 1.4fr 1.6fr 40px' }}>
            <span className="tech-tag" style={{ width: 'fit-content' }}>
              {item.type}
            </span>

            <div>
              <h3 className="service-row-title" style={{ fontSize: '1.1rem' }}>
                {item.title}
              </h3>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {item.readTime}
              </span>
            </div>

            <p className="service-row-desc">{item.desc}</p>

            <span className="service-row-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
