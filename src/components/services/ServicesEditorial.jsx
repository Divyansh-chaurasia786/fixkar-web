import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export function ServicesEditorial({ onSelectService }) {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      num: t.services.s1.num,
      title: t.services.s1.title,
      desc: t.services.s1.desc,
      tech: t.services.s1.tech,
    },
    {
      num: t.services.s2.num,
      title: t.services.s2.title,
      desc: t.services.s2.desc,
      tech: t.services.s2.tech,
    },
    {
      num: t.services.s3.num,
      title: t.services.s3.title,
      desc: t.services.s3.desc,
      tech: t.services.s3.tech,
    },
    {
      num: t.services.s4.num,
      title: t.services.s4.title,
      desc: t.services.s4.desc,
      tech: t.services.s4.tech,
    },
  ];

  return (
    <section className="canvas-section" id="services">
      {/* Editorial Section Header */}
      <div className="section-header-editorial">
        <div>
          <div className="section-eyebrow">{t.services.eyebrow}</div>
          <h2 className="section-title-large">{t.services.title}</h2>
        </div>
        <p className="section-tagline">{t.services.tagline}</p>
      </div>

      {/* Editorial Numbered Rows (Direct Canvas Layout with Dividers) */}
      <div className="service-row-list">
        {services.map((srv, idx) => (
          <div
            key={srv.num}
            className="service-row"
            onMouseEnter={() => setActiveService(idx)}
            onMouseLeave={() => setActiveService(null)}
            onClick={() => onSelectService(srv.title)}
          >
            <span className="service-row-num">{srv.num}</span>

            <div>
              <h3 className="service-row-title">{srv.title}</h3>
              <div className="service-row-tech">
                {srv.tech.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="service-row-desc">{srv.desc}</p>

            <span className="service-row-arrow">
              <ArrowUpRight size={22} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
