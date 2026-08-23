import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ExternalLink,
  Zap,
  Globe,
  Check,
  ArrowRight,
  Utensils,
  Smartphone,
  Sparkles,
  HeartPulse,
  Truck,
  Cake
} from 'lucide-react';

export function WorkPortfolio({ onSelectProject, onPrefillQuote }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const realProjects = [
    {
      id: 's-caterers',
      title: 'S. Caterers by Amit Agarwal',
      clientName: 'S. Caterers',
      category: 'catering',
      categoryLabel: 'Pure Veg Catering (Lucknow)',
      icon: Utensils,
      logo: '/logo-scaterers.png',
      liveUrl: 'scaterers.com',
      fullUrl: 'https://scaterers.com',
      speedScore: '100/100',
      turnaround: '6 Days Handover',
      accentColor: '#FACC15',
      basePackageId: 'business',
      keyPoints: [
        'Pure Veg Menu & Package Showcase',
        '1-Click Direct WhatsApp Lead Booking',
        'High-Resolution Food & Setup Gallery',
        'Ultra-Fast 0.28s Mobile Load Speed',
      ],
    },
    {
      id: 'ecofone',
      title: 'EcoFone | Re-Commerce Hub',
      clientName: 'EcoFone India',
      category: 'ecommerce',
      categoryLabel: 'Refurbished Phones & Franchise',
      icon: Smartphone,
      logo: '/logo-ecofone.png',
      liveUrl: 'ecofone.co.in',
      fullUrl: 'https://ecofone.co.in',
      speedScore: '99/100',
      turnaround: '10 Days Handover',
      accentColor: '#4ADE80',
      basePackageId: 'ecommerce',
      keyPoints: [
        'Instant Phone Price Valuation Engine',
        '6-Month Warranty & 3-Day Return Portal',
        'Franchise ROI Simulator (FICO / FIFO)',
        'Full E-Commerce Product Catalog & Cart',
      ],
    },
    {
      id: 'singhs-glamour',
      title: "Singh's Glamour Bridal Studio",
      clientName: "Singh's Glamour",
      category: 'salon',
      categoryLabel: 'Salon & Bridal Studio',
      icon: Sparkles,
      logo: '/logo-singhs-glamour.png',
      liveUrl: 'singhsglamour.com',
      fullUrl: 'https://singhsglamour.com',
      speedScore: '100/100',
      turnaround: '6 Days Handover',
      accentColor: '#F472B6',
      basePackageId: 'business',
      keyPoints: [
        '24/7 VIP Appointment Slot Booking',
        'Bridal Lookbook & Portfolio Gallery',
        'Automated WhatsApp & SMS Confirmation',
        'Online Advance Token Payment Gateway',
      ],
    },
    {
      id: 'verma-clinic',
      title: 'Dr. Verma Healthcare Clinic',
      clientName: 'Dr. Verma Clinic',
      category: 'healthcare',
      categoryLabel: 'Healthcare & Diagnostics',
      icon: HeartPulse,
      logo: '',
      liveUrl: 'vermaclinic.org',
      fullUrl: 'https://vermaclinic.org',
      speedScore: '100/100',
      turnaround: '8 Days Handover',
      accentColor: '#38BDF8',
      basePackageId: 'business',
      keyPoints: [
        'Doctor OPD Consultation Booking System',
        'Digital PDF Prescriptions & Test Reports',
        'Verified Google Maps Location & SEO',
        'Zero-Lag Mobile Booking Experience',
      ],
    },
    {
      id: 'nexus-logistics',
      title: 'Nexus Freight & Fleet Logistics',
      clientName: 'Nexus Logistics',
      category: 'logistics',
      categoryLabel: 'B2B & Fleet Portal',
      icon: Truck,
      logo: '',
      liveUrl: 'nexuslogistics.in',
      fullUrl: 'https://nexuslogistics.in',
      speedScore: '98/100',
      turnaround: '14 Days Handover',
      accentColor: '#C084FC',
      basePackageId: 'custom_portal',
      keyPoints: [
        'Instant B2B Freight Rate Matrix Calculator',
        'Real-Time GPS Shipment Tracking Portal',
        'Automated GST Invoice & E-Way Bill Engine',
        'Multi-Branch Logistics Client Dashboard',
      ],
    },
    {
      id: 'artisan-bakery',
      title: 'The Artisan Bakery & Café',
      clientName: 'The Artisan Bakery',
      category: 'catering',
      categoryLabel: 'Bakery & Gourmet Café',
      icon: Cake,
      logo: '',
      liveUrl: 'artisanbakery.co.in',
      fullUrl: 'https://artisanbakery.co.in',
      speedScore: '100/100',
      turnaround: '7 Days Handover',
      accentColor: '#FB923C',
      basePackageId: 'ecommerce',
      keyPoints: [
        'Custom Cake Flavour & Weight Customizer',
        'Doorstep Delivery Time-Slot Scheduler',
        'UPI & Card Instant Online Checkout',
        'Kitchen WhatsApp Order Alerts',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: realProjects.length },
    { id: 'catering', label: '🍽️ Food & Catering', count: realProjects.filter((p) => p.category === 'catering').length },
    { id: 'ecommerce', label: '📱 E-Commerce & Retail', count: realProjects.filter((p) => p.category === 'ecommerce').length },
    { id: 'salon', label: '💇 Salon & Beauty', count: realProjects.filter((p) => p.category === 'salon').length },
    { id: 'healthcare', label: '🏥 Healthcare & Clinic', count: realProjects.filter((p) => p.category === 'healthcare').length },
    { id: 'logistics', label: '🚚 B2B & Logistics', count: realProjects.filter((p) => p.category === 'logistics').length },
  ];

  const filteredProjects = activeCategory === 'all'
    ? realProjects
    : realProjects.filter((p) => p.category === activeCategory);

  const handleVisitWebsite = (url, e) => {
    if (e) e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="canvas-section" id="work" style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '12px 14px' }}>
      
      {/* ─── CATEGORY FILTER TABS ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap',
          marginBottom: '22px',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '10px',
                border: isActive ? '1.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.3) 100%)'
                  : 'rgba(15, 23, 42, 0.65)',
                color: isActive ? '#38BDF8' : '#94A3B8',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  background: isActive ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#000' : '#94A3B8',
                  fontSize: '0.64rem',
                  padding: '1px 5px',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontWeight: 800,
                }}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── 100% IDENTICAL FIXED WIDTH & HEIGHT GRID (NO STRETCHING IN ANY SECTION) ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '18px',
          width: '100%',
        }}
      >
        {filteredProjects.map((proj) => {
          const Icon = proj.icon;

          return (
            <div
              key={proj.id}
              style={{
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(8, 12, 22, 0.98) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
                transition: 'transform 0.15s ease, border-color 0.15s ease',
                height: '310px',
                boxSizing: 'border-box',
              }}
              className="real-project-card"
            >
              <div>
                {/* 1. Header Bar: Fixed 34px Height */}
                <a
                  href={proj.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleVisitWebsite(proj.fullUrl, e)}
                  title={`Visit live website ${proj.liveUrl}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    marginBottom: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    height: '34px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        color: '#38BDF8',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.liveUrl}</span>
                      <ExternalLink size={10} color="#38BDF8" style={{ flexShrink: 0 }} />
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.62rem',
                      color: '#4ADE80',
                      fontWeight: 700,
                      background: 'rgba(74, 222, 128, 0.12)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      marginLeft: '6px',
                    }}
                  >
                    ⚡ {proj.speedScore} Speed
                  </span>
                </a>

                {/* 2. Brand Info: Fixed 42px Height */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '42px', marginBottom: '8px', boxSizing: 'border-box' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: proj.accentColor,
                      flexShrink: 0,
                      overflow: 'hidden',
                      padding: '2px',
                    }}
                  >
                    {proj.logo ? (
                      <img
                        src={proj.logo}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>

                  <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                    <h3
                      style={{
                        fontSize: '0.92rem',
                        color: '#fff',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={proj.title}
                    >
                      {proj.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ fontSize: '0.64rem', color: '#94A3B8' }}>{proj.categoryLabel}</span>
                      <span style={{ fontSize: '0.62rem', color: '#4ADE80', fontWeight: 600 }}>• {proj.turnaround}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Key Points: Fixed 104px Height (4 x 24px) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '104px', overflow: 'hidden', boxSizing: 'border-box', marginTop: '6px' }}>
                  {proj.keyPoints.map((point, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.72rem',
                        color: '#CBD5E1',
                        lineHeight: 1.2,
                        height: '22px',
                        overflow: 'hidden',
                      }}
                    >
                      <Check size={12} color="#38BDF8" style={{ flexShrink: 0 }} strokeWidth={3} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Action Buttons: Fixed 38px Height */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px', height: '48px', boxSizing: 'border-box', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={(e) => handleVisitWebsite(proj.fullUrl, e)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#38BDF8',
                    padding: '7px 8px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    height: '34px',
                  }}
                >
                  <Globe size={12} />
                  <span>Visit Website</span>
                  <ExternalLink size={10} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onPrefillQuote) {
                      onPrefillQuote({
                        siteType: proj.basePackageId,
                        businessName: `Similar to ${proj.title}`,
                        notes: `Client requested architecture similar to ${proj.title}`,
                      });
                    } else if (onSelectProject) {
                      onSelectProject(proj);
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '7px 8px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 3px 10px rgba(56, 189, 248, 0.25)',
                    whiteSpace: 'nowrap',
                    height: '34px',
                  }}
                >
                  <span>Get Similar</span>
                  <ArrowRight size={12} />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
export default WorkPortfolio;
