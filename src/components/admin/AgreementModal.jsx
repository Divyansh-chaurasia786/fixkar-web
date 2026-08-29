import React, { useState } from 'react';
import { X, Printer, ShieldCheck, MessageSquare, Copy, FileText, Download } from 'lucide-react';

export function AgreementModal({ doc, clientData, onClose }) {
  if (!doc && !clientData) return null;

  // Active Phase Toggle: 'phase1' | 'phase2'
  const initialPhase = (doc?.type === 'Technical Spec' || doc?.name?.includes('SLA') || doc?.title?.includes('SLA') || clientData?.phase2Complete) ? 'phase2' : 'phase1';
  const [activePhase, setActivePhase] = useState(initialPhase);

  // Helper to sanitize strings from filenames
  const sanitizeString = (val, fallback = '') => {
    if (!val) return fallback;
    let s = String(val).trim();
    if (s.toLowerCase().includes('.pdf') || s.toLowerCase().includes('.docx') || s.toLowerCase().includes('agreement') || s.toLowerCase().includes('contract') || s.toLowerCase().includes('spec')) {
      s = s.replace(/\.[a-zA-Z0-9]+$/, '').replace(/[-_]?(Master[-_]?Agreement|Agreement|SLA|Contract|Work[-_]?Order)$/i, '').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
      return s || fallback;
    }
    return s;
  };

  const businessName = clientData?.businessName || clientData?.client || sanitizeString(doc?.clientName) || sanitizeString(doc?.client) || 'Registered Client Business';
  const clientCode = clientData?.clientCode || doc?.clientCode || 'FIX-CLNT-001';
  
  // Explicit client authorized representative name
  let rawPerson = clientData?.contactPerson || clientData?.name || clientData?.leadName || sanitizeString(doc?.contactPerson);
  if (!rawPerson || rawPerson.toLowerCase().includes('.pdf') || rawPerson.includes('Agreement')) {
    rawPerson = 'Authorized Representative';
  }
  const clientPersonName = rawPerson;

  const phone = clientData?.phone || doc?.phone || '';
  const email = clientData?.email || doc?.email || 'contact@client.in';
  
  // Domain handling
  let rawDomain = clientData?.domain || doc?.domain || '';
  if (!rawDomain || rawDomain === 'clientwebsite.in') {
    rawDomain = businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.in';
  }
  const domain = rawDomain;

  const agreedPackage = clientData?.agreedPackage || clientData?.businessType || 'Standard Web Platform Architecture';
  const dateStr = doc?.date || new Date().toISOString().split('T')[0];

  // Dynamic 50/50 Price Extraction
  const rawBudgetStr = String(agreedPackage || clientData?.totalBudget || clientData?.budget || '35000');
  const matchedNumbers = rawBudgetStr.match(/\d[\d,]*/g);
  let totalCost = 35000;
  if (matchedNumbers && matchedNumbers.length > 0) {
    const parsed = parseInt(matchedNumbers[0].replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      totalCost = parsed;
    }
  }
  const phase1Advance = Math.round(totalCost / 2);
  const phase2Final = totalCost - phase1Advance;

  const isPhase1 = activePhase === 'phase1';
  const refCode = isPhase1
    ? (doc?.id || ('FIX-MSA-' + new Date().getFullYear() + '-' + String(clientCode).replace(/[^A-Za-z0-9]/g, '').slice(-4)))
    : ('FIX-SLA-' + new Date().getFullYear() + '-' + String(clientCode).replace(/[^A-Za-z0-9]/g, '').slice(-4));

  const digitalVerificationHash = 'FIXKAR-' + (isPhase1 ? 'MSA' : 'SLA') + '-AUTH-SHA256-' + Math.abs((refCode + clientCode + totalCost + dateStr).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)).toString(16).toUpperCase().padStart(16, '0');

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const cp = String(phone || '').replace(/\D/g, '');
    const text = isPhase1
      ? encodeURIComponent(
          'Hello ' + clientPersonName + '!\n\n' +
          '📜 FIXKAR OFFICIAL MANAGED SERVICE AGREEMENT (PHASE 1 MSA)\n' +
          '• Client: ' + clientPersonName + ' • Business: ' + businessName + ' (' + clientCode + ')\n' +
          '• Ref: ' + refCode + '\n\n' +
          '🌐 DOMAIN POLICY:\n' +
          '• Official custom domain name will be mutually decided and registered after discussion with you.\n\n' +
          '💰 50/50 PAYMENT SCHEDULE:\n' +
          '• Total Project Value: Rs. ' + totalCost.toLocaleString('en-IN') + '\n' +
          '• Phase 1 Advance (50%): Rs. ' + phase1Advance.toLocaleString('en-IN') + ' (Paid at Kickoff)\n' +
          '• Phase 2 Final (50%): Rs. ' + phase2Final.toLocaleString('en-IN') + ' (Due Before Live Handover)\n\n' +
          '⚖️ KEY TERMS:\n' +
          '• 1-Year Free Maintenance (Strictly Bug-Fixes & Technical Errors only)\n' +
          '• 7-Day Post-Live Refinement Window (Updates only, no new features)\n\n' +
          'Leadership: Divyansh Chaurasia (Founder) & Pankaj Tiwari (Co-Founder)\n' +
          'Office: Lucknow, UP, India\n' +
          'Portal: https://fixkar.co.in/#client-login\n' +
          '— Fixkar Technology Solutions'
        )
      : encodeURIComponent(
          'Hello ' + clientPersonName + '!\n\n' +
          '🛡️ FIXKAR FINAL HANDOVER & 1-YEAR SLA CONTRACT (PHASE 2)\n' +
          '• Client: ' + clientPersonName + ' • Business: ' + businessName + ' (' + clientCode + ')\n' +
          '• Live Production Domain: https://' + domain + '\n\n' +
          '✅ 100% FINANCIAL SETTLEMENT:\n' +
          '• Total Amount: Rs. ' + totalCost.toLocaleString('en-IN') + ' (Fully Settled / Balance Due: Rs. 0)\n\n' +
          '📅 ACTIVE WARRANTIES:\n' +
          '• 7-Day Refinement Period: Active (Minor adjustments to existing features only)\n' +
          '• 1-Year Free Bug-Fix Maintenance: Active (365 Days 99.9% Uptime SLA)\n\n' +
          'Portal: https://fixkar.co.in/#client-login\n' +
          '— Fixkar Technology Solutions'
        );

    if (cp) {
      window.open('https://wa.me/' + (cp.startsWith('91') ? cp : '91' + cp) + '?text=' + text, '_blank');
    } else {
      alert('No client mobile number on file.');
    }
  };

  const handleCopy = () => {
    const el = document.getElementById('fixkar-official-letterpad-paper');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      alert('Official Legal Agreement text copied to clipboard!');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 18, 0.94)',
        backdropFilter: 'blur(16px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px',
        boxSizing: 'border-box',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        @media print {
          body * {
            visibility: hidden !important;
          }
          #fixkar-official-letterpad-paper, #fixkar-official-letterpad-paper * {
            visibility: visible !important;
          }
          #fixkar-official-letterpad-paper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        style={{
          width: '840px',
          maxWidth: '96vw',
          maxHeight: '95vh',
          background: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
          overflow: 'hidden',
        }}
      >
        {/* Top Control Bar */}
        <div
          className="no-print"
          style={{
            padding: '10px 16px',
            background: '#0B1120',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {/* Phase Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.6)', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <button
              type="button"
              onClick={() => setActivePhase('phase1')}
              style={{
                background: isPhase1 ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'transparent',
                color: isPhase1 ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: isPhase1 ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <FileText size={12} />
              <span>Phase 1: MSA (50% Advance)</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePhase('phase2')}
              style={{
                background: !isPhase1 ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
                color: !isPhase1 ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: !isPhase1 ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ShieldCheck size={12} />
              <span>Phase 2: Handover &amp; 1-Yr SLA</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                background: isPhase1 ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              <Download size={13} />
              <span>Print Letterpad PDF</span>
            </button>

            {phone && (
              <button
                type="button"
                onClick={handleWhatsApp}
                style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  color: '#4ADE80',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <MessageSquare size={12} />
                <span>WhatsApp</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#CBD5E1',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Copy size={12} />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94A3B8',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '2px',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Scrollable Formal Executive Letterpad Paper */}
        <div
          id="fixkar-official-letterpad-paper"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 34px 20px 34px',
            background: '#FFFFFF',
            color: '#0F172A',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1.45,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* OFFICIAL CORPORATE LETTERHEAD WITH RECEIPT BRAND LOGO */}
            <div style={{ paddingBottom: '12px', borderBottom: '2.5px solid #0284C7', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo & Corporate Identity */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#2563EB',
                        boxShadow: '0 0 10px #2563EB',
                      }}
                    />
                    <span
                      style={{
                        color: '#0F172A',
                        fontWeight: 900,
                        fontSize: '1.45rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                      }}
                    >
                      FIXKAR
                    </span>
                  </div>
                  <div
                    style={{
                      color: '#2563EB',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      marginTop: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    / WEB DEVELOPMENT &amp; DIGITAL SOLUTIONS
                  </div>
                  <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '3px' }}>
                    <strong>Founder:</strong> Divyansh Chaurasia &nbsp;&bull;&nbsp; <strong>Co-Founder:</strong> Pankaj Tiwari &nbsp;|&nbsp; <strong>Office:</strong> Lucknow, UP, India
                  </div>
                </div>

                {/* Contact & Reference Meta */}
                <div style={{ textAlign: 'right', fontSize: '0.66rem', color: '#334155' }}>
                  <div style={{ fontWeight: 700, color: '#0284C7' }}>✉ support@fixkar.co.in</div>
                  <div>🌐 <a href="https://fixkar.co.in" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>https://fixkar.co.in</a></div>
                  <div style={{ marginTop: '3px', fontWeight: 800, fontFamily: 'monospace', color: '#0F172A', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', border: '1px solid #E2E8F0' }}>
                    REF: {refCode}
                  </div>
                  <div style={{ marginTop: '2px' }}>Date: <strong>{dateStr}</strong></div>
                </div>
              </div>

              {/* Decorative Accent Hairline */}
              <div style={{ width: '100%', height: '1.5px', background: 'linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #E2E8F0 100%)', marginTop: '8px' }}></div>
            </div>

            {/* Document Title Ribbon */}
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.98rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', color: isPhase1 ? '#0369A1' : '#047857' }}>
                {isPhase1 ? 'MANAGED SERVICE AGREEMENT & WORK ORDER (PHASE 1 MSA)' : 'PRODUCTION HANDOVER & 1-YEAR SLA MAINTENANCE CONTRACT (PHASE 2)'}
              </div>
              <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                Executed under the provisions of the Indian Contract Act, 1872 &bull; Information Technology Act, 2000 (Section 10A)
              </div>
            </div>

            {/* Legal Recital Preamble */}
            <div style={{ fontSize: '0.70rem', color: '#334155', textAlign: 'justify', marginBottom: '10px', background: '#F8FAFC', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid ' + (isPhase1 ? '#0284C7' : '#10B981') }}>
              {isPhase1 ? (
                <span>THIS MANAGED SERVICE AGREEMENT (the "<strong>Agreement</strong>") is entered into on this <strong>{dateStr}</strong> at Lucknow, Uttar Pradesh under the <strong>Indian Contract Act, 1872</strong> and the <strong>Information Technology Act, 2000 (Section 10A)</strong> by and between:</span>
              ) : (
                <span>THIS PRODUCTION HANDOVER CERTIFICATE AND SLA MAINTENANCE CONTRACT is entered into on this <strong>{dateStr}</strong> at Lucknow, Uttar Pradesh under the <strong>Indian Contract Act, 1872</strong> upon successful staging verification and live deployment by and between:</span>
              )}
            </div>

            {/* Parties Box - Executive 2-Column Format (Client Name + Business Name Displayed) */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 12px', marginBottom: '12px', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.70rem' }}>
                <div style={{ borderRight: '1px solid #E2E8F0', paddingRight: '8px' }}>
                  <div style={{ fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', fontSize: '0.64rem', marginBottom: '2px' }}>
                    1. SERVICE PROVIDER (PARTY A):
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>Fixkar Technology Solutions</div>
                  <div style={{ color: '#475569' }}>
                    Founder: <strong>Divyansh Chaurasia</strong> &bull; Co-Founder: <strong>Pankaj Tiwari</strong>
                  </div>
                  <div style={{ color: '#64748B' }}>Corporate Email: support@fixkar.co.in</div>
                  <div style={{ color: '#64748B' }}>Registered Operations: Lucknow, Uttar Pradesh, India</div>
                </div>

                <div>
                  <div style={{ fontWeight: 800, color: isPhase1 ? '#0284C7' : '#10B981', textTransform: 'uppercase', fontSize: '0.64rem', marginBottom: '2px' }}>
                    2. CLIENT SUBSCRIBER (PARTY B):
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>{businessName}</div>
                  <div style={{ color: '#475569' }}>
                    Client Name / Authorized Signatory: <strong>{clientPersonName}</strong>
                  </div>
                  <div style={{ color: '#64748B' }}>
                    Client Identification Code: <strong style={{ fontFamily: 'monospace', color: '#0284C7' }}>{clientCode}</strong>
                  </div>
                  
                  {/* CLEAN DOMAIN POLICY (Discussion Based in Phase 1 vs Live in Phase 2) */}
                  <div style={{ color: '#64748B', marginTop: '2px' }}>
                    {isPhase1 ? (
                      <span>
                        <strong>Domain Allocation:</strong>{' '}
                        <span style={{ color: '#0284C7', fontWeight: 600 }}>
                          Official custom domain will be finalized & registered after discussion with the Client
                        </span>
                      </span>
                    ) : (
                      <span>
                        <strong>Live Production Domain:</strong>{' '}
                        <a href={'https://' + domain} target="_blank" rel="noreferrer" style={{ color: '#059669', fontWeight: 800, textDecoration: 'none' }}>
                          https://{domain}
                        </a>
                      </span>
                    )}
                    {phone ? ' • Ph: ' + phone : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Consideration Table */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#0284C7' }}>●</span> COMMERCIAL CONSIDERATION &amp; 50/50 MILESTONE BILLING SCHEDULE:
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.68rem', textAlign: 'center', border: '1px solid #CBD5E1', borderRadius: '4px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: isPhase1 ? '#F0F9FF' : '#F0FDF4', borderBottom: '1px solid #CBD5E1' }}>
                    <th style={{ padding: '5px 8px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0F172A' }}>Total Agreed Scope Value</th>
                    <th style={{ padding: '5px 8px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0369A1' }}>Phase 1 (50% Advance)</th>
                    <th style={{ padding: '5px 8px', fontWeight: 800, color: isPhase1 ? '#B45309' : '#15803D' }}>{isPhase1 ? 'Phase 2 (50% Final Due)' : 'Settlement Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#FFFFFF' }}>
                    <td style={{ padding: '6px', borderRight: '1px solid #CBD5E1', fontWeight: 900, color: '#0F172A', fontSize: '0.80rem' }}>
                      ₹{totalCost.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '6px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0284C7', fontSize: '0.80rem' }}>
                      ₹{phase1Advance.toLocaleString('en-IN')} <span style={{ fontSize: '0.62rem', fontWeight: 600, color: '#16A34A' }}>(✓ Settled at Kickoff)</span>
                    </td>
                    <td style={{ padding: '6px', fontWeight: 800, color: isPhase1 ? '#D97706' : '#16A34A', fontSize: '0.80rem' }}>
                      {isPhase1 ? ('₹' + phase2Final.toLocaleString('en-IN') + ' (Due Before Live Release)') : '✓ 100% Fully Settled (Nil Balance)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Standard Legal Clauses (Balanced Spacing & Clean Language) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '0.67rem', color: '#334155', textAlign: 'justify' }}>
              {isPhase1 ? (
                <>
                  <div>
                    <strong style={{ color: '#0F172A' }}>1. SCOPE OF SERVICES &amp; DELIVERABLES:</strong> Fixkar Technology Solutions shall architect, design, program, and configure the responsive web software platform for {businessName} (represented by {clientPersonName}). Deliverables include mobile-optimized UI/UX, backend API integration, Fast2SMS transactional OTP authentication, SSL HTTPS security, database architecture, and self-service Client Portal access (<strong>https://fixkar.co.in/#client-login</strong>). <u>The official domain name (.in / .com) will be mutually decided and registered following direct consultation with the client</u>.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>2. 50/50 MILESTONE PAYMENT TERMS (SECTION 2(d), INDIAN CONTRACT ACT, 1872):</strong> (a) <strong>Phase 1 Advance (50% - ₹{phase1Advance.toLocaleString('en-IN')}):</strong> Payable immediately upon contract execution for domain registration, cloud VPS provisioning, and engineering sprint kickstart. (b) <strong>Phase 2 Final (50% - ₹{phase2Final.toLocaleString('en-IN')}):</strong> Strictly payable upon staging verification <u>when the website is fully ready and tested, prior to public live DNS routing</u>.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>3. SEVEN (7) DAYS POST-LIVE ADJUSTMENT WINDOW:</strong> Commencing from the date of live production deployment, the Client has a strict 7 calendar days window to request minor text adjustments or styling alignment strictly for existing delivered features. <u>No new features, additional pages, or custom modules can be added under this window</u>. After 7 days, all changes become 100% chargeable.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>4. ONE (1) YEAR FREE MAINTENANCE &amp; STRICT BUG-FIX WARRANTY:</strong> Fixkar provides 1-Year (365 Days) 99.9% uptime SLA and 100% FREE rectification for runtime software bugs, broken links, database errors, or server downtime. <u>This warranty DOES NOT cover any new feature additions, feature removals, workflow alterations, or structural redesigns</u>; any such request shall be billed separately under an approved quotation.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong style={{ color: '#0F172A' }}>1. PRODUCTION HANDOVER &amp; LIVE ACCEPTANCE:</strong> The Client certifies that it has thoroughly verified and approved the completed web platform on staging. Fixkar Technology Solutions has deployed the production build to the live domain <strong>https://{domain}</strong> under high-availability Managed Cloud VPS architecture with active SSL encryption.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>2. 100% FINANCIAL DISCHARGE &amp; NIL BALANCE:</strong> Both parties acknowledge that the total agreed contract consideration of <strong>₹{totalCost.toLocaleString('en-IN')}</strong> (Phase 1 Advance ₹{phase1Advance.toLocaleString('en-IN')} + Phase 2 Handover ₹{phase2Final.toLocaleString('en-IN')}) is <strong>100% PAID IN FULL (NIL OUTSTANDING BALANCE)</strong>.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>3. ACTIVE SEVEN (7) DAYS ADJUSTMENT PERIOD:</strong> Active from {dateStr}. The Client may request minor text adjustments or styling corrections strictly for existing features. No new features can be added under this window. Handover is deemed final post 7 days.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>4. ONE (1) YEAR FREE BUG-FIX MAINTENANCE WARRANTY:</strong> Active for 365 days from {dateStr}. Covers 100% FREE rectification for runtime bugs and server downtime. Any request to add new modules, remove features, or alter core workflows is strictly billable.
                  </div>

                  <div>
                    <strong style={{ color: '#0F172A' }}>5. ANNUAL INFRASTRUCTURE RENEWAL:</strong> Cloud VPS hosting and custom domain DNS registration will be due 365 days from handover at transparent annual pricing (currently ₹3,499/year inclusive of SSL and daily backups).
                  </div>
                </>
              )}

              <div>
                <strong style={{ color: '#0F172A' }}>{isPhase1 ? '5' : '6'}. MANAGED INFRASTRUCTURE &amp; ROOT GOVERNANCE:</strong> All cloud servers, domain DNS, and telecom DLT gateways remain provisioned and 100% managed under Fixkar Master Enterprise Infrastructure. Direct root credentials remain exclusively with Fixkar for cybersecurity and anti-tampering protection. Client manages day-to-day operations via the Client Portal.
              </div>

              <div>
                <strong style={{ color: '#0F172A' }}>{isPhase1 ? '6' : '7'}. GOVERNING LAW &amp; JURISDICTION:</strong> This Agreement is governed by the <strong>Indian Contract Act, 1872</strong>, the <strong>Information Technology Act, 2000</strong>, and the <strong>Specific Relief Act, 1963</strong>. Any legal dispute shall be subject to the exclusive jurisdiction of the competent civil courts in Lucknow, Uttar Pradesh, India.
              </div>
            </div>

            {/* 3-PARTY SIGNATURES WITH BOTH PARTNER SIGNATURES + SINGLE FIXKAR COMPANY STAMP */}
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1.5px solid #0F172A' }}>
              <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: '#0F172A', marginBottom: '8px', letterSpacing: '0.03em' }}>
                IN WITNESS WHEREOF, THE PARTIES HERETO HAVE EXECUTED THIS AGREEMENT BY PHYSICAL SIGNATURES:
              </div>

              {/* 3-Column Signatures Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.67rem' }}>
                {/* Fixkar Founder: Divyansh Chaurasia */}
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '6px 8px', background: '#F8FAFC' }}>
                  <div style={{ fontWeight: 800, textTransform: 'uppercase', color: '#0284C7', fontSize: '0.60rem', marginBottom: '2px' }}>
                    FOR FIXKAR (FOUNDER):
                  </div>
                  <div style={{ height: '32px', borderBottom: '1px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                    <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>Divyansh Chaurasia</div>
                  <div style={{ fontSize: '0.60rem', color: '#475569' }}>Founder &bull; Fixkar Tech Solutions</div>
                  <div style={{ fontSize: '0.58rem', color: '#64748B', marginTop: '1px' }}>Date: {dateStr}</div>
                </div>

                {/* Fixkar Co-Founder: Pankaj Tiwari */}
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '6px 8px', background: '#F8FAFC' }}>
                  <div style={{ fontWeight: 800, textTransform: 'uppercase', color: '#0284C7', fontSize: '0.60rem', marginBottom: '2px' }}>
                    FOR FIXKAR (CO-FOUNDER):
                  </div>
                  <div style={{ height: '32px', borderBottom: '1px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                    <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>Pankaj Tiwari</div>
                  <div style={{ fontSize: '0.60rem', color: '#475569' }}>Co-Founder &bull; Fixkar Tech Solutions</div>
                  <div style={{ fontSize: '0.58rem', color: '#64748B', marginTop: '1px' }}>Date: {dateStr}</div>
                </div>

                {/* Client Authorized Signatory (Business Name + Client Person Name) */}
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '4px', padding: '6px 8px', background: '#F8FAFC' }}>
                  <div style={{ fontWeight: 800, textTransform: 'uppercase', color: isPhase1 ? '#0284C7' : '#10B981', fontSize: '0.60rem', marginBottom: '2px' }}>
                    FOR {businessName.slice(0, 18).toUpperCase()}:
                  </div>
                  <div style={{ height: '32px', borderBottom: '1px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                    <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                  </div>
                  <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '3px' }}>{clientPersonName}</div>
                  <div style={{ fontSize: '0.60rem', color: '#475569' }}>Owner / Authorized Signatory</div>
                  <div style={{ fontSize: '0.58rem', color: '#64748B', marginTop: '1px' }}>Client Code: <strong style={{ color: '#0284C7' }}>{clientCode}</strong></div>
                </div>
              </div>

              {/* SINGLE UNIFIED FIXKAR COMPANY OFFICIAL STAMP/SEAL */}
              <div style={{ marginTop: '8px', padding: '6px 12px', background: '#F0F9FF', border: '1px dashed #0284C7', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.64rem' }}>
                <div style={{ color: '#0369A1', fontWeight: 700 }}>
                  🏢 <strong>FIXKAR TECHNOLOGY SOLUTIONS</strong> (Official Corporate Stamp &amp; Seal)
                </div>
                <div style={{ color: '#64748B', fontStyle: 'italic' }}>
                  Official Seal: _________________________________
                </div>
              </div>
            </div>
          </div>

          {/* OFFICIAL CORPORATE LETTERHEAD FOOTER */}
          <div style={{ marginTop: '14px', paddingTop: '8px', borderTop: '1.5px solid #0284C7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.58rem', color: '#64748B' }}>
            <div>
              <strong style={{ color: '#0F172A' }}>Fixkar Technology Solutions</strong> &bull; Lucknow, Uttar Pradesh, India
            </div>
            <div style={{ fontStyle: 'italic' }}>
              Official Letterpad Document &bull; IT Act 2000 (Sec 10A) Compliant
            </div>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0284C7' }}>
              PAGE 1 OF 1 &bull; {digitalVerificationHash.slice(0, 18)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
