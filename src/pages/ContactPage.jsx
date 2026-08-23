import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MessageSquare, Send, CheckCircle2, Bot, Sparkles, Clock, ShieldCheck, MapPin, Zap } from 'lucide-react';

export function ContactPage({ onNavigate }) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    businessName: '',
    projectType: 'business_website',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-view-container animate-fade-in" style={{ width: '100%' }}>
      {/* Editorial Header */}
      <div className="section-header-editorial">
        <div>
          <div className="section-eyebrow">{t.contact.eyebrow}</div>
          <h1 className="section-title-large">{t.contact.title}</h1>
        </div>
        <p className="section-tagline">
          {t.contact.tagline}
        </p>
      </div>

      {/* 2-Column Contact & AI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '36px',
          alignItems: 'flex-start',
          marginTop: '20px',
        }}
      >
        {/* Left Column: Direct Inquiry Form */}
        <div
          style={{
            background: 'rgba(12, 18, 30, 0.75)',
            border: '1px solid var(--border-glass-nav)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(163, 230, 53, 0.15)', border: '1px solid #A3E635', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#A3E635' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
                {t.contact.thankYouTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
                {t.contact.thankYouDesc}
              </p>
              <button
                className="btn-secondary-glass"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', emailOrPhone: '', businessName: '', projectType: 'business_website', message: '' });
                }}
              >
                {t.contact.sendAnotherBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: '4px' }}>
                  {t.contact.formTitle}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {t.contact.formSub}
                </p>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                    {t.contact.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.contactPlaceholder}
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                    {t.contact.businessLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.contact.businessPlaceholder}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  {t.contact.projectTypeLabel}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                >
                  <option value="business_website" style={{ background: '#0A0E1A' }}>Business Website (Multi-Page)</option>
                  <option value="ecommerce_store" style={{ background: '#0A0E1A' }}>Online Store / E-Commerce</option>
                  <option value="custom_portal" style={{ background: '#0A0E1A' }}>Custom Web Portal or Booking System</option>
                  <option value="website_redesign" style={{ background: '#0A0E1A' }}>Redesigning Old Website / Speed Boost</option>
                  <option value="general_query" style={{ background: '#0A0E1A' }}>General Inquiry / Partnership</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '6px' }}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary-cta"
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem', marginTop: '6px' }}
              >
                <Send size={16} />
                <span>{t.contact.sendBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: AI Assistant & Official Support Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card 1: 24/7 Fixkar AI Instant Assistant */}
          <div
            style={{
              background: 'radial-gradient(ellipse at top right, rgba(76, 141, 255, 0.12) 0%, rgba(10, 15, 26, 0.85) 100%)',
              border: '1px solid rgba(120, 170, 255, 0.3)',
              borderRadius: '20px',
              padding: '28px 24px',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--blue-primary)', marginBottom: '10px' }}>
              <Bot size={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', letterSpacing: '0.08em', fontWeight: 700 }}>
                24/7 INSTANT AI ASSISTANT
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              Have an Instant Question?
            </h3>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
              Calculate your exact website costs and hosting requirements in under 60 seconds with our interactive calculator.
            </p>

            <button
              className="btn-primary-cta"
              style={{ width: '100%', padding: '12px' }}
              onClick={() => onNavigate('quote')}
            >
              <Zap size={16} />
              <span>Calculate Project Quote Now →</span>
            </button>
          </div>

          {/* Card 2: Official Studio Email */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Mail size={18} color="var(--blue-primary)" />
              <strong style={{ color: 'var(--text-heading)', fontSize: '0.95rem' }}>Official Support Email</strong>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '12px' }}>
              For formal project proposals, RFP submissions, or partnerships:
            </p>

            <a
              href="mailto:support@fixkar.co.in"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.92rem',
                color: 'var(--blue-highlight)',
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              support@fixkar.co.in
            </a>
          </div>

          {/* Card 3: Response Guarantee */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A3E635' }}>
              <Clock size={15} />
              <span>Average Response Time: Under 4 Hours</span>
            </div>
            <div>• All client inquiries are kept 100% confidential.</div>
            <div>• Directly reviewed by senior web developers.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
