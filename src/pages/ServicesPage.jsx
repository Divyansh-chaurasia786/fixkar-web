import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle2, Cpu, Globe, ShoppingBag, Code2 } from 'lucide-react';

export function ServicesPage({ onNavigate }) {
  const { t } = useLanguage();

  const servicesDetail = [
    {
      num: '01',
      title: t.services.s1.title,
      desc: t.services.s1.desc,
      icon: Globe,
      tech: ['Business Websites', 'Education Portals', 'Responsive Design', 'SEO Ready', 'Fast Load'],
      deliverables: [
        'Custom brand & responsive design',
        'Clear user journeys & enquiry flows',
        'Fast loading & mobile-optimized layout',
        'Search engine friendly structure',
        'Secure setup & production launch',
      ],
      timeline: '7–14 Days',
    },
    {
      num: '02',
      title: t.services.s2.title,
      desc: t.services.s2.desc,
      icon: Code2,
      tech: ['Admin Dashboards', 'Client Portals', 'Authentication', 'Role Management', 'Cloud Database'],
      deliverables: [
        'Role-based access & admin controls',
        'Secure user authentication & data handling',
        'Custom business workflow tools',
        'Database & API integrations',
        'Scalable, maintainable architecture',
      ],
      timeline: '14–28 Days',
    },
    {
      num: '03',
      title: t.services.s3.title,
      desc: t.services.s3.desc,
      icon: ShoppingBag,
      tech: ['Product Catalogs', 'Order Management', 'UPI & Card Payments', 'Customer Accounts'],
      deliverables: [
        'Product catalog & inventory management',
        'Secure checkout & UPI/payment integration',
        'Order tracking & customer accounts',
        'Mobile-first shopping experience',
        'Store administration controls',
      ],
      timeline: '14–21 Days',
    },
    {
      num: '04',
      title: t.services.s4.title,
      desc: t.services.s4.desc,
      icon: Cpu,
      tech: ['Website Maintenance', 'Hosting Management', 'Backups & Security', 'OTP Verification'],
      deliverables: [
        'Ongoing technical maintenance & updates',
        'Managed cloud hosting & backups',
        'Security monitoring & technical support',
        'OTP & mobile verification workflows',
        'Technical guidance & improvements',
      ],
      timeline: 'Continuous',
    },
  ];

  return (
    <div className="page-view-container animate-fade-in">
      {/* Page Header */}
      <div className="section-header-editorial">
        <div>
          <div className="section-eyebrow">{t.services.eyebrow}</div>
          <h1 className="section-title-large">{t.services.title}</h1>
        </div>
        <p className="section-tagline">{t.services.tagline}</p>
      </div>

      {/* Services Full Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '32px' }}>
        {servicesDetail.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.num}
              style={{
                borderBottom: '1px solid var(--border-divider)',
                paddingBottom: '40px',
                display: 'grid',
                gridTemplateColumns: '80px 1.4fr 1.6fr',
                gap: '28px',
              }}
              className="service-detail-block"
            >
              <div>
                <span className="service-row-num" style={{ fontSize: '1.4rem' }}>{srv.num}</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Icon size={20} color="var(--blue-primary)" />
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)' }}>{srv.title}</h2>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {srv.desc}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {srv.tech.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>

                <button
                  className="btn-primary-cta"
                  style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={() => onNavigate('quote')}
                >
                  <span>Configure Quote for {srv.title.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    KEY DELIVERABLES
                  </span>
                  <span className="tech-tag" style={{ color: 'var(--blue-highlight)' }}>
                    Sprint: {srv.timeline}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {srv.deliverables.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-body)' }}>
                      <CheckCircle2 size={14} color="var(--blue-primary)" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
