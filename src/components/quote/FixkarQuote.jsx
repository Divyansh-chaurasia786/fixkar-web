import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Check,
  Zap,
  Layers,
  Globe,
  ShoppingBag,
  Building,
  Server,
  Sparkles,
  Bot,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  CreditCard,
  FileText,
  ArrowRight,
  ArrowLeft,
  Clock,
  Search,
  X,
  PhoneCall,
  RotateCcw
} from 'lucide-react';

export function FixkarQuote({ onBookSprint, prefilledScope }) {
  const { t } = useLanguage();

  // Active Category Tab
  const [activeTab, setActiveTab] = useState('scope'); // 'scope' | 'hosting' | 'features' | 'ai'

  // Selected State
  const [siteType, setSiteType] = useState(() => prefilledScope?.siteType || 'business');
  const [pageCount, setPageCount] = useState(() => prefilledScope?.pageCount || 5);
  const [hostingPlan, setHostingPlan] = useState(() => prefilledScope?.hostingPlan || 'standard_cloud');
  const [domainOption, setDomainOption] = useState(() => prefilledScope?.domainOption || 'dot_in');
  const [aiOption, setAiOption] = useState(() => prefilledScope?.aiOption || 'none');
  const [seoNeeded, setSeoNeeded] = useState(() => prefilledScope?.seoNeeded !== undefined ? prefilledScope.seoNeeded : true);
  
  const [features, setFeatures] = useState(() => prefilledScope?.features || {
    whatsapp: true,
    contactForm: true,
    smsEmailGateway: false,
    businessEmail: false,
    bookingCalendar: false,
    priceCalculator: false,
    paymentGateway: false,
    gallery: true,
    multiLanguage: false,
    adminDashboard: false,
  });

  // Client Custom Features State
  const [customFeatures, setCustomFeatures] = useState([]);
  const [customFeatureInput, setCustomFeatureInput] = useState('');
  const customFeatureBasePrice = 1499;

  // Contact Details
  const [businessName, setBusinessName] = useState(prefilledScope?.businessName || '');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [formError, setFormError] = useState('');

  // Submission Success State
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic Quote Config from Backend
  const [dynamicConfig, setDynamicConfig] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5050/api/quote-config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.siteTypes) setDynamicConfig(data);
      })
      .catch((err) => console.warn('[FixkarQuote] Using defaults:', err));
  }, []);

  // Sync Prefilled Scope
  useEffect(() => {
    if (prefilledScope) {
      if (prefilledScope.siteType) setSiteType(prefilledScope.siteType);
      if (typeof prefilledScope.pageCount === 'number') setPageCount(prefilledScope.pageCount);
      if (prefilledScope.features) setFeatures((prev) => ({ ...prev, ...prefilledScope.features }));
      if (prefilledScope.aiOption) setAiOption(prefilledScope.aiOption);
      if (prefilledScope.hostingPlan) setHostingPlan(prefilledScope.hostingPlan);
      if (prefilledScope.domainOption) setDomainOption(prefilledScope.domainOption);
      if (prefilledScope.seoNeeded !== undefined) setSeoNeeded(Boolean(prefilledScope.seoNeeded));
      if (prefilledScope.businessName) setBusinessName(prefilledScope.businessName);
    }
  }, [prefilledScope]);

  // Packages list (Filtered to Live Only)
  const siteTypes = useMemo(() => {
    if (dynamicConfig?.siteTypes && dynamicConfig.siteTypes.length > 0) {
      const liveList = dynamicConfig.siteTypes.filter((pkg) => pkg.isLive !== false);
      if (liveList.length > 0) return liveList;
    }
    return [
      { id: 'landing', title: '1-Page Quick Landing', price: 3999, includedPages: 1, turnaround: '3–5 Days', simpleDesc: 'High-converting single scrollable page for freelancers, leads or single products.' },
      { id: 'business', title: 'Complete Business Website', price: 7999, includedPages: 5, turnaround: '7–14 Days', simpleDesc: 'Full multi-page site: Home, About, Services, Gallery & Contact.' },
      { id: 'ecommerce', title: 'Online Shop / E-Commerce', price: 14999, includedPages: 6, turnaround: '14–21 Days', simpleDesc: 'Product catalog, shopping cart, UPI & Card payments, order alerts.' },
      { id: 'custom_portal', title: 'Custom Portal / Web App', price: 18999, includedPages: 8, turnaround: '14–28 Days', simpleDesc: 'Interactive system with client login, custom database or booking flows.' },
    ];
  }, [dynamicConfig]);

  // If currently selected siteType is drafted/hidden, switch to first live package
  useEffect(() => {
    if (siteTypes.length > 0 && !siteTypes.some((s) => s.id === siteType)) {
      setSiteType(siteTypes[0].id);
    }
  }, [siteTypes, siteType]);

  const extraPageRate = dynamicConfig?.extraPageRate || 399;

  // Hosting Plans
  const hostingPlans = useMemo(() => {
    if (dynamicConfig?.hostingPlans && dynamicConfig.hostingPlans.length > 0) {
      return dynamicConfig.hostingPlans.map((hp) => ({
        id: hp.id,
        title: hp.title,
        price: hp.finalPrice ?? hp.price,
        specs: hp.specs || 'High-speed cloud server with 99.9% uptime SLA.',
      }));
    }
    return [
      { id: 'standard_cloud', title: 'Standard High-Speed Cloud Server', price: 1499, specs: '25k visits/mo • 0.25s load • Free SSL • NVMe SSD' },
      { id: 'business_vps', title: 'Business High-Speed Cloud VPS', price: 2499, specs: 'Dedicated IP • 100k visits/mo • Daily Backups' },
      { id: 'ecommerce_dedicated', title: 'Enterprise Dedicated Cloud VPS', price: 4999, specs: 'Unlimited traffic • 4 vCPU / 8GB RAM • Redis Cache' },
      { id: 'self_hosted', title: 'Deploy on My Own Server (₹0 Setup)', price: 0, specs: 'Direct deployment & DNS integration on your server.' },
    ];
  }, [dynamicConfig]);

  // Domain Options
  const domainOptions = useMemo(() => {
    if (dynamicConfig?.domainOptions && dynamicConfig.domainOptions.length > 0) {
      return dynamicConfig.domainOptions.map((dp) => ({
        id: dp.id,
        title: dp.title,
        price: dp.finalPrice ?? dp.price,
        specs: dp.specs || 'Official domain registry with DNS control & WHOIS privacy.',
      }));
    }
    return [
      { id: 'dot_in', title: '.in Domain Registration', price: 689, specs: '1-Year Official .in Registry • DNS Control' },
      { id: 'dot_com', title: '.com Domain Registration', price: 1160, specs: '1-Year Global .com Registry • Full DNS' },
      { id: 'dot_co_in', title: '.co.in Domain Registration', price: 806, specs: '1-Year .co.in Commercial Registry' },
      { id: 'own_domain', title: 'I Already Own a Domain (₹0)', price: 0, specs: 'Free DNS record mapping to your new server.' },
    ];
  }, [dynamicConfig]);

  // Feature Options List
  const featureList = useMemo(() => {
    if (dynamicConfig?.features && dynamicConfig.features.length > 0) return dynamicConfig.features;
    return [
      { id: 'whatsapp', title: '1-Click WhatsApp Button', price: 0, desc: 'Direct 1-tap mobile WhatsApp chat for instant customer inquiries.' },
      { id: 'contactForm', title: 'Smart Contact Form', price: 0, desc: 'Collects visitor details & sends instant email alerts.' },
      { id: 'smsEmailGateway', title: 'Fixkar SMS OTP & Transactional Email Engine', price: 1499, desc: 'Fixkar Sovereign Cloud Messaging Matrix for user OTP logins, order alerts & high-deliverability email receipts (+1,000 Credits included).' },
      { id: 'businessEmail', title: 'Professional Business Email (info@yourbrand.com)', price: 999, desc: 'Custom domain mailboxes with verified SPF, DKIM, and Cloudflare MX email routing.' },
      { id: 'bookingCalendar', title: 'Online Appointment Booking', price: 1799, desc: 'Clients choose date & time slots online automatically.' },
      { id: 'priceCalculator', title: 'Interactive Menu/Price Estimator', price: 2199, desc: 'Instant cost estimator for services, catering, or salons.' },
      { id: 'paymentGateway', title: 'UPI & Card Payment Gateway', price: 2499, desc: 'Accept advance payments via PhonePe, GPay, Paytm, Cards.' },
      { id: 'gallery', title: 'Photo & Video Gallery', price: 899, desc: 'High-res portfolio albums with category filters.' },
      { id: 'multiLanguage', title: 'Hindi + English Switcher', price: 1299, desc: 'Bilingual toggle so visitors can read in Hindi or English.' },
      { id: 'adminDashboard', title: 'Admin Login (Self-Edit Content)', price: 2999, desc: 'Password-protected panel to change text, photos & prices yourself.' },
    ];
  }, [dynamicConfig]);

  // AI Options
  const aiOptions = useMemo(() => {
    if (dynamicConfig?.aiOptions && dynamicConfig.aiOptions.length > 0) return dynamicConfig.aiOptions;
    return [
      { id: 'none', title: 'No AI Needed', price: 0, desc: 'Standard high-speed website without automated AI chatbots.' },
      { id: 'whatsapp_bot', title: 'AI WhatsApp Auto-Responder', price: 1999, desc: '24/7 AI answering customer FAQs on your WhatsApp with pricing & location.' },
      { id: 'website_copilot', title: 'Smart Website AI Copilot', price: 3499, desc: 'Embedded website AI assistant trained on your business to convert visitors.' },
    ];
  }, [dynamicConfig]);

  // Handle Adding Custom Feature (Price shown on button)
  const handleAddCustomFeature = (e) => {
    if (e) e.preventDefault();
    const text = customFeatureInput.trim();
    if (!text) return;
    setCustomFeatures((prev) => [...prev, { id: Date.now().toString(), title: text, price: customFeatureBasePrice }]);
    setCustomFeatureInput('');
  };

  const handleRemoveCustomFeature = (id) => {
    setCustomFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  // Real-Time Total Calculation
  const { totalInvestment, breakdownItems } = useMemo(() => {
    const selectedType = siteTypes.find((s) => s.id === siteType) || siteTypes[1];
    let total = selectedType.price;
    const items = [{ name: selectedType.title, price: selectedType.price }];

    const extraPages = Math.max(0, pageCount - selectedType.includedPages);
    if (extraPages > 0) {
      const pCost = extraPages * extraPageRate;
      total += pCost;
      items.push({ name: `${extraPages} Extra Pages (@₹${extraPageRate}/page)`, price: pCost });
    }

    Object.keys(features).forEach((key) => {
      if (features[key]) {
        const f = featureList.find((item) => item.id === key);
        if (f && f.price > 0) {
          total += f.price;
          items.push({ name: f.title, price: f.price });
        }
      }
    });

    // Custom features added by user
    customFeatures.forEach((cf) => {
      const p = Number(cf.price) || 0;
      total += p;
      items.push({ name: `✨ Custom: ${cf.title}`, price: p, isCustom: true });
    });

    const activeAi = aiOptions.find((a) => a.id === aiOption);
    if (activeAi && activeAi.price > 0) {
      total += activeAi.price;
      items.push({ name: activeAi.title, price: activeAi.price });
    }

    const activeHosting = hostingPlans.find((h) => h.id === hostingPlan) || hostingPlans[0];
    if (activeHosting.price > 0) {
      total += activeHosting.price;
      items.push({ name: activeHosting.title, price: activeHosting.price });
    }

    const activeDomain = domainOptions.find((d) => d.id === domainOption) || domainOptions[0];
    if (activeDomain.price > 0) {
      total += activeDomain.price;
      items.push({ name: activeDomain.title, price: activeDomain.price });
    }

    if (seoNeeded) {
      total += 1199;
      items.push({ name: 'Google Search & Maps Setup', price: 1199 });
    }

    return { totalInvestment: total, breakdownItems: items };
  }, [siteType, pageCount, features, customFeatures, aiOption, hostingPlan, domainOption, seoNeeded, siteTypes, featureList, aiOptions, hostingPlans, domainOptions, extraPageRate]);

  const toggleFeature = (id) => {
    setFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Strict Indian Mobile Number Validator (10 digits starting with 6, 7, 8, or 9)
  const validateIndianMobile = (phone) => {
    if (!phone || !phone.trim()) {
      return { isValid: false, message: 'Please enter your 10-digit Indian phone number.' };
    }
    const digits = phone.replace(/\D/g, '');
    let core10 = digits;
    if (digits.length === 12 && digits.startsWith('91')) {
      core10 = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      core10 = digits.slice(1);
    }

    if (core10.length !== 10) {
      return { isValid: false, message: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    if (!/^[6-9]/.test(core10)) {
      return { isValid: false, message: 'Indian mobile numbers must start with 6, 7, 8, or 9.' };
    }

    return { isValid: true, formatted: `+91 ${core10}`, core10 };
  };

  // Submit Handler (Single Button Action with Strict Indian Phone & Name Validation)
  const handleSubmitQuotation = (e) => {
    if (e) e.preventDefault();

    if (!businessName.trim()) {
      setFormError('Please enter your Name or Business Name.');
      return;
    }

    const phoneVal = validateIndianMobile(whatsappNumber);
    if (!phoneVal.isValid) {
      setFormError(phoneVal.message);
      return;
    }
    setFormError('');

    try {
      const selectedSite = siteTypes.find((s) => s.id === siteType) || siteTypes[0];
      const selectedHosting = hostingPlans.find((h) => h.id === hostingPlan);
      const selectedDomain = domainOptions.find((d) => d.id === domainOption);

      const selectedFeatureNames = Object.keys(features)
        .filter((k) => features[k])
        .map((k) => featureList.find((f) => f.id === k)?.title || k);

      const customFeatureNames = (customFeatures || []).map((c) => c.title || c.name || 'Custom Feature');

      const allFeaturesList = [
        ...selectedFeatureNames,
        ...customFeatureNames,
        selectedHosting ? `Hosting: ${selectedHosting.title}` : null,
        selectedDomain ? `Domain: ${selectedDomain.title}` : null,
        seoNeeded ? 'SEO Setup & Google Map Indexing' : null,
      ].filter(Boolean);

      const leadPayload = {
        source: 'Website Quotation Calculator',
        name: businessName.trim(),
        businessName: businessName.trim(),
        phone: phoneVal.formatted,
        serviceRequired: `${selectedSite.title} (${pageCount} Pages)`,
        estimatedQuote: `₹${totalInvestment.toLocaleString('en-IN')}`,
        pages: pageCount,
        features: allFeaturesList,
        status: 'New',
        notes: `Custom Quote of ₹${totalInvestment.toLocaleString('en-IN')} for ${pageCount} pages.`,
        createdAt: new Date().toISOString(),
      };

      // 1. Send to Backend API so it appears in Admin Console immediately
      const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5050' : '';
      fetch(`${apiBase}/api/submit-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      }).catch((err) => {
        console.warn('API lead submission fallback:', err);
      });

      // 2. Also save to localStorage as resilience
      try {
        const existingInquiries = JSON.parse(localStorage.getItem('fixkar_quotation_requests') || '[]');
        existingInquiries.unshift(leadPayload);
        localStorage.setItem('fixkar_quotation_requests', JSON.stringify(existingInquiries.slice(0, 50)));
      } catch (err) {
        console.warn('Local storage save skipped:', err);
      }
    } catch (err) {
      console.error('[handleSubmitQuotation error]', err);
    } finally {
      // Always show popup modal
      setIsSubmitted(true);
    }
  };

  return (
    <section className="canvas-section" id="quote" style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* ─── STUDIO HEADER ─────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#38BDF8" />
          <span>INSTANT WEBSITE PRICING STUDIO</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#fff', margin: '6px 0 4px', letterSpacing: '-0.02em' }}>
          Build Your Website Plan
        </h1>
        <p style={{ fontSize: '0.86rem', color: '#94A3B8', maxWidth: '580px', margin: '0 auto', lineHeight: 1.4 }}>
          Select what your business needs below or add custom features. 100% transparent pricing with guaranteed 7–14 day delivery.
        </p>
      </div>

      {/* ─── ULTRA-PREMIUM CLEAN QUOTATION CONFIRMATION POPUP MODAL ───────── */}
      {isSubmitted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 18, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInPage 0.2s ease',
          }}
          onClick={() => setIsSubmitted(false)}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.97) 0%, rgba(10, 14, 26, 0.99) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '22px',
              padding: '36px 30px 30px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(56, 189, 248, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94A3B8',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <X size={15} />
            </button>

            {/* Glowing Dual-Tone Badge Icon */}
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.18) 0%, rgba(56, 189, 248, 0.18) 100%)',
                border: '1.5px solid rgba(74, 222, 128, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4ADE80',
                boxShadow: '0 0 30px rgba(74, 222, 128, 0.25)',
              }}
            >
              <CheckCircle2 size={30} />
            </div>

            {/* Header Titles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                REQUEST LOGGED
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                Thank You for Your Interest!
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#4ADE80', fontWeight: 700, margin: '2px 0 0' }}>
                Our team will contact you soon.
              </p>
            </div>

            {/* Clean Message Inset Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '14px',
                padding: '14px 18px',
                fontSize: '0.84rem',
                color: '#CBD5E1',
                lineHeight: 1.55,
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              Dear <strong style={{ color: '#fff' }}>{businessName || 'Valued Client'}</strong>, we have received your quotation request. Our engineering team will review your requirements and connect with you on <strong style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{whatsappNumber}</strong> shortly to discuss your project.
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              style={{
                background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                border: 'none',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 18px rgba(56, 189, 248, 0.35)',
                width: '100%',
                maxWidth: '200px',
                transition: 'transform 0.15s ease',
              }}
            >
              <span>Got It</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ─── 2-PANEL PRICING STUDIO LAYOUT ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.85fr)', gap: '24px', alignItems: 'flex-start' }}>

          {/* ════════════ LEFT PANEL: CONFIGURATION STUDIO ════════════ */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.85) 0%, rgba(8, 12, 22, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {/* Navigation Category Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '6px',
                background: 'rgba(0, 0, 0, 0.35)',
                padding: '5px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {[
                { id: 'scope', label: '1. Scope', icon: Globe },
                { id: 'hosting', label: '2. Cloud & Domain', icon: Server },
                { id: 'features', label: '3. Features', icon: Layers },
                { id: 'ai', label: '4. AI & SEO', icon: Bot },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const TabIcon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: isActive ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
                      background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.3) 100%)' : 'transparent',
                      color: isActive ? '#38BDF8' : '#94A3B8',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TabIcon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ──────── TAB 1: WEBSITE SCOPE & PAGES ──────── */}
            {activeTab === 'scope' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                    Select Base Website Package:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {siteTypes.map((t) => {
                      const isSelected = siteType === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSiteType(t.id);
                            setPageCount(t.includedPages);
                          }}
                          style={{
                            background: isSelected ? 'linear-gradient(180deg, rgba(37, 99, 235, 0.18) 0%, rgba(14, 20, 36, 0.9) 100%)' : 'rgba(255, 255, 255, 0.02)',
                            border: isSelected ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '12px 14px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '8px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <strong style={{ fontSize: '0.86rem', color: isSelected ? '#fff' : '#E2E8F0' }}>
                                {t.title}
                              </strong>
                              {isSelected && <Check size={14} color="#38BDF8" strokeWidth={3} />}
                            </div>
                            <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: 0, lineHeight: 1.35 }}>
                              {t.simpleDesc}
                            </p>
                          </div>

                          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>
                              ₹{t.price.toLocaleString('en-IN')}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#4ADE80', fontWeight: 600 }}>
                              {t.turnaround}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Page Stepper */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: '#fff', display: 'block' }}>
                      Number of Pages Needed
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                      Selected plan includes {siteTypes.find((s) => s.id === siteType)?.includedPages || 5} pages (extra pages @ ₹{extraPageRate}/page).
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setPageCount((p) => Math.max(1, p - 1))}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace', minWidth: '60px', textAlign: 'center' }}>
                      {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPageCount((p) => Math.min(20, p + 1))}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('hosting')}
                    style={{
                      background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Next: Cloud &amp; Domain</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ──────── TAB 2: CLOUD SERVER & DOMAIN ──────── */}
            {activeTab === 'hosting' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Cloud Servers */}
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Server size={15} color="#38BDF8" />
                    <span>Choose Cloud Hosting Server:</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {hostingPlans.map((hp) => {
                      const isSelected = hostingPlan === hp.id;
                      return (
                        <div
                          key={hp.id}
                          onClick={() => setHostingPlan(hp.id)}
                          style={{
                            background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                            border: isSelected ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '6px',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '0.82rem', color: isSelected ? '#fff' : '#CBD5E1' }}>
                                {hp.title}
                              </strong>
                              {isSelected && <Check size={14} color="#38BDF8" strokeWidth={3} />}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.3 }}>
                              {hp.specs}
                            </div>
                          </div>

                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>
                            {hp.price === 0 ? '₹0 Setup' : `₹${hp.price.toLocaleString('en-IN')} / yr`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Domain Registration */}
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={15} color="#38BDF8" />
                    <span>Choose Domain Extension:</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {domainOptions.map((dp) => {
                      const isSelected = domainOption === dp.id;
                      return (
                        <div
                          key={dp.id}
                          onClick={() => setDomainOption(dp.id)}
                          style={{
                            background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                            border: isSelected ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '6px',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '0.82rem', color: isSelected ? '#fff' : '#CBD5E1' }}>
                                {dp.title}
                              </strong>
                              {isSelected && <Check size={14} color="#38BDF8" strokeWidth={3} />}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.3 }}>
                              {dp.specs}
                            </div>
                          </div>

                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FDE047', fontFamily: 'monospace' }}>
                            {dp.price === 0 ? '₹0' : `₹${dp.price.toLocaleString('en-IN')} / yr`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('scope')}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    ← Back to Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('features')}
                    style={{ background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>Next: Features</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ──────── TAB 3: FEATURES & ADD-ONS ──────── */}
            {activeTab === 'features' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>
                  Select Business Features (Click to Add/Remove):
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
                  {featureList.map((f) => {
                    const isChecked = features[f.id];
                    return (
                      <div
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        style={{
                          background: isChecked ? 'rgba(37, 99, 235, 0.18)' : 'rgba(255, 255, 255, 0.02)',
                          border: isChecked ? '1.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '6px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {(f.id === 'smsEmailGateway' || f.id === 'businessEmail') && (
                              <span style={{ fontSize: '0.6rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1px 6px', borderRadius: '4px', fontWeight: 800, width: 'fit-content', letterSpacing: '0.04em' }}>
                                ⚡ CLOUD MESSAGING &amp; EMAIL
                              </span>
                            )}
                            <strong style={{ fontSize: '0.82rem', color: isChecked ? '#fff' : '#CBD5E1' }}>
                              {f.title}
                            </strong>
                          </div>
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '5px',
                              border: isChecked ? '1.5px solid #38BDF8' : '1px solid #64748B',
                              background: isChecked ? '#38BDF8' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && <Check size={12} color="#000" strokeWidth={3} />}
                          </div>
                        </div>

                        <p style={{ fontSize: '0.7rem', color: '#94A3B8', margin: 0, lineHeight: 1.3 }}>
                          {f.desc || f.whatItDoes || 'Standard feature module.'}
                        </p>

                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: f.price === 0 ? '#4ADE80' : '#FDE047', fontFamily: 'monospace' }}>
                          {f.price === 0 ? 'FREE / Included' : `+₹${f.price.toLocaleString('en-IN')}`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ─── CUSTOM FEATURE ADDITION BOX WITH PRICE ON BUTTON ONLY ─── */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(37, 99, 235, 0.12) 100%)',
                    border: '1px dashed rgba(56, 189, 248, 0.4)',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={15} color="#38BDF8" />
                      <strong style={{ fontSize: '0.84rem', color: '#fff' }}>
                        Have a Custom Requirement or Unique Feature?
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.66rem', color: '#38BDF8', fontFamily: 'monospace', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      Custom Enquiry
                    </span>
                  </div>

                  <form onSubmit={handleAddCustomFeature} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Type your custom requirement (e.g. Live Gold Rate Ticker, Barcode Scanner, Student Results Portal...)"
                      value={customFeatureInput}
                      onChange={(e) => setCustomFeatureInput(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        color: '#fff',
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />

                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                        border: 'none',
                        color: '#fff',
                        padding: '9px 18px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.25)',
                      }}
                    >
                      <Plus size={14} />
                      <span>Add Custom Feature (+₹1,499)</span>
                    </button>
                  </form>

                  {/* Render Added Custom Feature Badges */}
                  {customFeatures.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                      {customFeatures.map((cf) => (
                        <div
                          key={cf.id}
                          style={{
                            background: 'rgba(56, 189, 248, 0.18)',
                            border: '1px solid rgba(56, 189, 248, 0.45)',
                            borderRadius: '8px',
                            padding: '4px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.74rem',
                            color: '#fff',
                          }}
                        >
                          <span style={{ color: '#38BDF8', fontWeight: 700 }}>✨ Custom:</span>
                          <span>{cf.title}</span>
                          <span style={{ color: '#FDE047', fontWeight: 800, fontFamily: 'monospace' }}>
                            (+₹{Number(cf.price || 0).toLocaleString('en-IN')})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomFeature(cf.id)}
                            style={{ background: 'none', border: 'none', color: '#FDA4AF', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', marginLeft: '4px' }}
                            title="Remove custom feature"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('hosting')}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    ← Back to Cloud
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ai')}
                    style={{ background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>Next: AI &amp; SEO</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ──────── TAB 4: AI & SEO ──────── */}
            {activeTab === 'ai' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Bot size={15} color="#38BDF8" />
                    <span>Choose AI Assistant Model:</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {aiOptions.map((opt) => {
                      const isSelected = aiOption === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setAiOption(opt.id)}
                          style={{
                            background: isSelected ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                            border: isSelected ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '6px',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '0.82rem', color: isSelected ? '#fff' : '#CBD5E1' }}>
                                {opt.title}
                              </strong>
                              {isSelected && <Check size={14} color="#38BDF8" strokeWidth={3} />}
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#94A3B8', margin: '3px 0 0', lineHeight: 1.3 }}>
                              {opt.desc}
                            </p>
                          </div>

                          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: opt.price === 0 ? '#4ADE80' : '#FDE047', fontFamily: 'monospace' }}>
                            {opt.price === 0 ? '₹0 (No AI)' : `+₹${opt.price.toLocaleString('en-IN')}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Google SEO Switch */}
                <div
                  onClick={() => setSeoNeeded(!seoNeeded)}
                  style={{
                    background: seoNeeded ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: seoNeeded ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '5px',
                        border: seoNeeded ? '1.5px solid #10B981' : '1px solid #64748B',
                        background: seoNeeded ? '#10B981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {seoNeeded && <Check size={12} color="#fff" strokeWidth={3} />}
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: '#fff' }}>
                        Google Search &amp; Google Maps Local Setup (+₹1,199)
                      </strong>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                        Indexing on Google &amp; verified map pin so local customers find you first.
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6EE7B7', fontFamily: 'monospace' }}>
                    +₹1,199
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('features')}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CBD5E1', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    ← Back to Features
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ════════════ RIGHT PANEL: LIVE STICKY INVOICE & SINGLE SUBMIT BUTTON ════════════ */}
          <div
            style={{
              position: 'sticky',
              top: '80px',
              background: 'linear-gradient(180deg, rgba(14, 20, 36, 0.95) 0%, rgba(8, 12, 22, 0.98) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(56, 189, 248, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="#38BDF8" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Live Proposal &amp; Estimate
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.12)', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>
                ⚡ 7–14 Day SLA
              </span>
            </div>

            {/* Big Total Price */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                Total All-Inclusive Investment
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#FDE047', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
                ₹{totalInvestment.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6EE7B7', marginTop: '2px' }}>
                ✓ 50% Advance to Start Sprint (₹{Math.round(totalInvestment / 2).toLocaleString('en-IN')}) • 50% on Handover
              </div>
            </div>

            {/* Itemized Line Items */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px', textTransform: 'uppercase' }}>
                Itemized Scope Breakdown ({breakdownItems.length}):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {breakdownItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem' }}>
                    <span style={{ color: item.isCustom ? '#38BDF8' : '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px', fontWeight: item.isCustom ? 700 : 400 }}>
                      • {item.name}
                    </span>
                    <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'monospace' }}>
                      {item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Inputs Form */}
            <form noValidate onSubmit={handleSubmitQuotation} style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block', marginBottom: '3px', fontWeight: 600 }}>
                  Your Name / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma, Singh Caterers"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (formError && formError.toLowerCase().includes('name')) setFormError('');
                  }}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: (formError && formError.toLowerCase().includes('name')) ? '1px solid #F43F5E' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#fff',
                    fontSize: '0.78rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', marginBottom: '3px', fontWeight: 600 }}>
                  <span>Indian Mobile / WhatsApp Number *</span>
                  <span style={{ color: '#38BDF8', fontSize: '0.66rem', fontFamily: 'monospace' }}>🇮🇳 +91 (10 Digits)</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: formError ? '1px solid #F43F5E' : '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.05)', color: '#CBD5E1', fontSize: '0.78rem', fontWeight: 700, borderRight: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    required
                    maxLength={10}
                    placeholder="98350 12345 (10 digits)"
                    value={whatsappNumber}
                    onKeyDown={(e) => {
                      // Allow navigation & editing keys
                      if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter', 'Home', 'End'].includes(e.key) || e.ctrlKey || e.metaKey) {
                        return;
                      }
                      // If already 10 digits, block any further input
                      if (whatsappNumber.length >= 10 && !window.getSelection()?.toString()) {
                        e.preventDefault();
                      }
                      // Block non-digits
                      if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 10);
                      setWhatsappNumber(pasted);
                      if (formError) setFormError('');
                    }}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setWhatsappNumber(val);
                      if (formError) setFormError('');
                    }}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      padding: '8px 10px',
                      color: '#fff',
                      fontSize: '0.82rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      outline: 'none',
                      letterSpacing: '0.04em',
                    }}
                  />
                </div>
                {formError && (
                  <span style={{ fontSize: '0.68rem', color: '#FDA4AF', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                    ⚠️ {formError}
                  </span>
                )}
              </div>

              {/* ─── SINGLE SUBMIT BUTTON ─── */}
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(56, 189, 248, 0.35)',
                  marginTop: '4px',
                  transition: 'transform 0.15s ease',
                }}
              >
                <span>Submit Quotation Request</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#64748B' }}>
                🔒 100% Free Consultation • No Spam Guaranteed
              </div>
            </form>
          </div>

        </div>
    </section>
  );
}
export default FixkarQuote;
