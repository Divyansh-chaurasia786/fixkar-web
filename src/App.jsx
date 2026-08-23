import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { MainGlassShell } from './components/shell/MainGlassShell';
import { Navbar } from './components/shell/Navbar';
import { HomePage } from './pages/HomePage';
import { FloatingAIWidget } from './components/ai/FloatingAIWidget';
import { Footer } from './components/footer/Footer';
import { CheckCircle2, X, Zap, Sparkles } from 'lucide-react';
import './styles/glass-shell.css';
import './App.css';

// Lazy-loaded secondary pages (Zero weight on initial home load)
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const QuotePage = lazy(() => import('./pages/QuotePage').then(m => ({ default: m.QuotePage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const ClientPortalPage = lazy(() => import('./pages/ClientPortalPage').then(m => ({ default: m.ClientPortalPage })));

// Domain & Subdomain Routing Detector
function isAdminHostname() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  return (
    hostname.startsWith('admin.') ||
    hostname.includes('admin.fixkar.co.in') ||
    hostname.includes('admin.localhost') ||
    hostname.includes('fixkar.admin.')
  );
}

export function AppContent() {
  const { setLang } = useLanguage();
  const isAdminDomain = isAdminHostname();

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (isAdminHostname()) return 'admin';
      const hash = window.location.hash;
      if (hash === '#admin' || window.location.pathname.startsWith('/admin')) return 'admin';
      if (hash === '#client-portal' || hash === '#client-login' || window.location.pathname.startsWith('/client')) return 'client-portal';
    }
    return 'home';
  });
  const [bookedSprintData, setBookedSprintData] = useState(null);
  const [prefilledScope, setPrefilledScope] = useState(null);
  const [aiActionToast, setAiActionToast] = useState(null);

  // Global Hash Change Listener & Subdomain Lock
  useEffect(() => {
    if (isAdminDomain) {
      setCurrentPage('admin');
      return;
    }
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#client-portal' || hash === '#client-login') {
        setCurrentPage('client-portal');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminDomain]);

  // Global Scroll-Reveal Observer Engine
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const targets = document.querySelectorAll(
      '.editorial-service-card, .editorial-work-card, .metric-item, .price-card, .faq-item-card, .contact-card, .section-header-editorial, .step-process-card, .workstation-floating, .table-row-item, .fact-card, .services-editorial-card'
    );

    targets.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
      el.classList.add('scroll-reveal-init');
      observer.observe(el);
    });

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage]);

  const handleNavigate = (pageId) => {
    if (isAdminDomain) {
      if (pageId === 'home' || pageId === 'services' || pageId === 'work' || pageId === 'contact' || pageId === 'quote') {
        window.location.href = 'https://fixkar.co.in';
        return;
      }
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(pageId);
    if (pageId === 'admin') {
      window.location.hash = 'admin';
    } else if (pageId === 'client-portal' || pageId === 'client-login') {
      window.location.hash = 'client-portal';
    } else if (window.location.hash === '#admin' || window.location.hash === '#client-portal' || window.location.hash === '#client-login') {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrefillQuote = (scope) => {
    setPrefilledScope(scope);
    setCurrentPage('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSprint = (data) => {
    setBookedSprintData(data);
  };

  // Autonomous AI Website Controller Hook
  const handleExecuteAICommand = (cmd) => {
    if (!cmd) return;
    console.log('[App] Executing Autonomous AI Command:', cmd);

    if (cmd.message) {
      setAiActionToast({ message: cmd.message, timestamp: Date.now() });
      setTimeout(() => setAiActionToast(null), 5000);
    }

    if (cmd.type === 'navigate' && cmd.targetPage) {
      handleNavigate(cmd.targetPage);
    } else if (cmd.type === 'change_language' && cmd.language) {
      setLang(cmd.language);
    } else if (cmd.type === 'configure_quote') {
      if (cmd.scope) {
        handlePrefillQuote(cmd.scope);
      } else {
        handleNavigate('quote');
      }
    } else if (cmd.type === 'filter_work') {
      handleNavigate('work');
    }
  };

  const renderCurrentPage = () => {
    if (isAdminDomain) {
      return <AdminPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'work':
        return <WorkPage onNavigate={handleNavigate} onPrefillQuote={handlePrefillQuote} />;
      case 'how-it-works':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'quote':
        return <QuotePage onBookSprint={handleBookSprint} prefilledScope={prefilledScope} />;
      case 'admin':
      case 'super-admin':
        return <AdminPage onNavigate={handleNavigate} />;
      case 'client-portal':
      case 'client-login':
        return <ClientPortalPage onNavigateHome={() => handleNavigate('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminView = isAdminDomain || currentPage === 'admin' || currentPage === 'super-admin';
  const isClientView = currentPage === 'client-portal' || currentPage === 'client-login';
  const isStandaloneAppView = isAdminView || isClientView;

  return (
    <>
      <MainGlassShell isStandaloneAppView={isStandaloneAppView}>
        {/* Floating Frosted Glass Navbar (Hidden in Admin & Client Portal) */}
        {!isStandaloneAppView && <Navbar activeSection={currentPage} onNavigate={handleNavigate} />}

        {/* Autonomous AI Action HUD Toast Notification */}
        {aiActionToast && (
          <div
            style={{
              position: 'fixed',
              top: '76px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.95) 0%, rgba(14, 20, 36, 0.98) 100%)',
              border: '1px solid rgba(120, 170, 255, 0.6)',
              borderRadius: 'var(--radius-pill)',
              padding: '10px 24px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(37, 99, 235, 0.4)',
              animation: 'fadeInPage 0.3s ease',
              fontSize: '0.86rem',
            }}
          >
            <Sparkles size={16} color="#A3E635" />
            <strong style={{ color: '#A3E635', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', letterSpacing: '0.06em' }}>
              AI AUTONOMOUS CONTROL:
            </strong>
            <span>{aiActionToast.message}</span>
          </div>
        )}

        {/* Top Holographic Navigation Laser Beam */}
        <div key={`beam-${currentPage}`} className="fixkar-nav-laser-beam" />

        {/* Master Kinetic Morphing Page Scene */}
        <div key={currentPage} className="fixkar-page-scene" style={{ width: '100%' }}>
          <Suspense fallback={
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid rgba(56, 189, 248, 0.2)', borderTopColor: '#38BDF8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>⚡ Loading Fixkar Experience...</span>
              </div>
            </div>
          }>
            {renderCurrentPage()}
          </Suspense>
        </div>

        {/* Studio Footer (Hidden in Admin & Client Portal) */}
        {!isStandaloneAppView && <Footer onNavigate={handleNavigate} />}
      </MainGlassShell>

      {/* 24/7 Global Viewport Floating Fixkar AI Widget (Hidden on Admin and Client Portal) */}
      {!isStandaloneAppView && (
        <FloatingAIWidget
          onNavigate={handleNavigate}
          onPrefillQuote={handlePrefillQuote}
          onExecuteCommand={handleExecuteAICommand}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
