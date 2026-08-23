import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Menu, X, Terminal, UserCheck } from 'lucide-react';

export function Navbar({ activeSection, onNavigate }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleItemClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixkar-navbar-wrapper">
      <nav className="fixkar-navbar">
        {/* Brand Lockup */}
        <div className="nav-brand" onClick={() => handleItemClick('home')} style={{ cursor: 'pointer' }}>
          <span className="brand-dot" />
          <span>FIXKAR</span>
          <span className="brand-tag">/{t.nav.brandTag}</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions & Language Switch */}
        <div className="nav-actions">
          {/* Client Portal Login Link (Desktop) */}
          <button
            className="nav-desktop-btn"
            onClick={() => handleItemClick('client-portal')}
            style={{
              background: activeSection === 'client-portal' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38BDF8',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <UserCheck size={14} />
            <span>Client Login</span>
          </button>

          {/* Language Switch */}
          <div className="lang-switch">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => setLang('hi')}
            >
              हिंदी
            </button>
          </div>

          {/* Primary CTA (Desktop) */}
          <button
            className="btn-primary-cta nav-desktop-cta"
            onClick={() => handleItemClick('quote')}
          >
            <span>{t.nav.getQuote}</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          style={{
            marginTop: '8px',
            background: 'rgba(10, 14, 22, 0.95)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(120, 170, 255, 0.2)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              style={{
                background: 'none',
                color: activeSection === item.id ? 'var(--blue-primary)' : 'var(--text-heading)',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '8px 4px',
              }}
              onClick={() => handleItemClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid #38BDF8',
              color: '#38BDF8',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onClick={() => handleItemClick('client-portal')}
          >
            <UserCheck size={16} />
            <span>Client Login Portal</span>
          </button>
          <button
            className="btn-primary-cta"
            style={{ width: '100%', marginTop: '6px' }}
            onClick={() => handleItemClick('quote')}
          >
            <span>{t.nav.getQuote}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </header>
  );
}
