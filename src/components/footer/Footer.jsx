import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, MessageSquare, Bot, MapPin, Send, Zap } from 'lucide-react';

export function Footer({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <footer className="fixkar-footer">
      <div className="footer-top-grid">
        {/* Col 1: Studio Brand & Vision */}
        <div>
          <div className="nav-brand" style={{ marginBottom: '12px' }}>
            <span className="brand-dot" />
            <span>FIXKAR</span>
            <span className="brand-tag">/{t.nav.brandTag}</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: 1.6 }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <div className="footer-col-title">{t.footer.companyTitle}</div>
          <ul className="footer-links-list">
            <li><button className="footer-link" onClick={() => onNavigate('home')}>{t.nav.home}</button></li>
            <li><button className="footer-link" onClick={() => onNavigate('work')}>{t.nav.work}</button></li>
            <li><button className="footer-link" onClick={() => onNavigate('about')}>{t.nav.about}</button></li>
          </ul>
        </div>

        {/* Col 3: Studio Systems */}
        <div>
          <div className="footer-col-title">{t.footer.servicesTitle}</div>
          <ul className="footer-links-list">
            <li><button className="footer-link" onClick={() => onNavigate('quote')}>{t.nav.getQuote}</button></li>
            <li><button className="footer-link" onClick={() => onNavigate('about')}>{t.nav.about}</button></li>
            <li><button className="footer-link" onClick={() => onNavigate('contact')}>{t.nav.contact}</button></li>
            <li><button className="footer-link" onClick={() => onNavigate('admin')} style={{ color: '#64748B', fontSize: '0.74rem' }}>Admin Console 🔒</button></li>
          </ul>
        </div>

        {/* Col 4: Direct Inquiries (Strictly Private & Direct) */}
        <div>
          <div className="footer-col-title">{t.footer.directDevTitle}</div>
          <ul className="footer-links-list">
            <li>
              <a href="mailto:support@fixkar.co.in" className="footer-link" style={{ color: 'var(--blue-highlight)', fontWeight: 600 }}>
                <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
                support@fixkar.co.in
              </a>
            </li>
            <li>
              <button onClick={() => onNavigate('quote')} className="footer-link" style={{ color: 'var(--blue-primary)' }}>
                <Zap size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Instant Quote
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="footer-link" style={{ color: '#A3E635' }}>
                <Send size={13} style={{ display: 'inline', marginRight: '6px' }} />
                {t.contact.sendBtn}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div>
          {t.footer.copyright}
        </div>

        <div className="system-status-indicator">
          <span className="status-dot" />
          <span>{t.footer.ownershipNotice}</span>
        </div>
      </div>
    </footer>
  );
}
