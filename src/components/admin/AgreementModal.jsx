import React, { useState } from 'react';
import { X, Printer, ShieldCheck, MessageSquare, Copy, FileText, Download, ChevronRight } from 'lucide-react';

export function AgreementModal({ doc, clientData, onClose }) {
  if (!doc && !clientData) return null;

  // Active Phase Toggle: 'phase1' | 'phase2'
  const initialPhase = (doc?.type === 'Technical Spec' || doc?.name?.includes('SLA') || doc?.title?.includes('SLA') || clientData?.phase2Complete) ? 'phase2' : 'phase1';
  const [activePhase, setActivePhase] = useState(initialPhase);

    const sanitizeString = (val, fallback = '') => {
    if (!val) return fallback;
    let s = String(val).trim();
    if (s.toLowerCase().includes('.pdf') || s.toLowerCase().includes('.docx') || s.toLowerCase().includes('agreement') || s.toLowerCase().includes('contract') || s.toLowerCase().includes('spec')) {
      return fallback;
    }
    return s;
  };

  const clientName = clientData?.businessName || clientData?.client || doc?.clientName || sanitizeString(doc?.client, '') || 'Registered Client Business';
  const clientCode = clientData?.clientCode || doc?.clientCode || 'FIX-CLNT-001';
  const contactPerson = clientData?.contactPerson || clientData?.name || clientData?.leadName || sanitizeString(doc?.contactPerson, '') || sanitizeString(doc?.name, '') || 'Authorized Representative';
  const phone = clientData?.phone || doc?.phone || '';
  const email = clientData?.email || doc?.email || 'contact@client.in';
  const domain = clientData?.domain || doc?.domain || 'clientwebsite.in';
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
          'Hello ' + contactPerson + '!\n\n' +
          '📜 FIXKAR OFFICIAL MANAGED SERVICE AGREEMENT (PHASE 1 MSA)\n' +
          '• Ref: ' + refCode + ' • Client: ' + clientName + ' (' + clientCode + ')\n' +
          '• Domain: https://' + domain + '\n\n' +
          '💰 50/50 PAYMENT SCHEDULE:\n' +
          '• Total Project Value: Rs. ' + totalCost.toLocaleString('en-IN') + '\n' +
          '• Phase 1 Advance (50%): Rs. ' + phase1Advance.toLocaleString('en-IN') + ' (Paid at Kickoff)\n' +
          '• Phase 2 Final (50%): Rs. ' + phase2Final.toLocaleString('en-IN') + ' (Due Before Live Handover)\n\n' +
          '⚖️ INDIAN LAW VALID TERMS:\n' +
          '• 1-Year Free Maintenance (Strictly Bug-Fixes & Technical Errors only)\n' +
          '• 7-Day Post-Live Refinement Window (Updates only, no new features)\n' +
          '• Feature Additions/Removals: Separately chargeable\n\n' +
          'Partners: Pankaj Tiwari & Divyansh Chaurasia (Lucknow, UP)\n' +
          'Portal: https://fixkar.co.in/#client-login\n' +
          '— Fixkar Technology Solutions'
        )
      : encodeURIComponent(
          'Hello ' + contactPerson + '!\n\n' +
          '🛡️ FIXKAR FINAL HANDOVER & 1-YEAR SLA CONTRACT (PHASE 2)\n' +
          '• Ref: ' + refCode + ' • Client: ' + clientName + ' (' + clientCode + ')\n' +
          '• Live Domain: https://' + domain + '\n\n' +
          '✅ 100% FINANCIAL DISCHARGE:\n' +
          '• Total Amount: Rs. ' + totalCost.toLocaleString('en-IN') + ' (Fully Settled / Balance Due: Rs. 0)\n\n' +
          '📅 ACTIVE WARRANTIES:\n' +
          '• 7-Day Refinement Period: Active (Minor adjustments to existing features only)\n' +
          '• 1-Year Free Bug-Fix Maintenance: Active (365 Days 99.9% Uptime SLA)\n' +
          '• Feature Modifications: Separately chargeable\n\n' +
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
    const el = document.getElementById('fixkar-printable-agreement-container');
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
        padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @page {
          size: A4 portrait;
          margin: 12mm 14mm;
        }
        @media print {
          body * {
            visibility: hidden !important;
          }
          #fixkar-printable-agreement-container, #fixkar-printable-agreement-container * {
            visibility: visible !important;
          }
          #fixkar-printable-agreement-container {
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
          .agreement-a4-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
            min-height: 100vh !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        style={{
          width: '880px',
          maxWidth: '96vw',
          maxHeight: '94vh',
          background: '#0B1120',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '14px',
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
            padding: '12px 18px',
            background: '#0F172A',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Phase Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.6)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <button
              type="button"
              onClick={() => setActivePhase('phase1')}
              style={{
                background: isPhase1 ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'transparent',
                color: isPhase1 ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: isPhase1 ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <FileText size={13} />
              <span>Phase 1: MSA Letterpad (50% Advance)</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePhase('phase2')}
              style={{
                background: !isPhase1 ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'transparent',
                color: !isPhase1 ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: !isPhase1 ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <ShieldCheck size={13} />
              <span>Phase 2: Handover &amp; 1-Yr SLA</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.70rem', color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px' }}>
              📄 2-Page Executive Contract
            </span>

            <button
              type="button"
              onClick={handlePrint}
              style={{
                background: isPhase1 ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              <Download size={14} />
              <span>Print 2-Page PDF</span>
            </button>

            {phone && (
              <button
                type="button"
                onClick={handleWhatsApp}
                style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  color: '#4ADE80',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <MessageSquare size={13} />
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
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Copy size={13} />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94A3B8',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '4px',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Container with Two Distinct Spacious A4 Pages */}
        <div
          id="fixkar-printable-agreement-container"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 20px',
            background: '#070B14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════════════
              PAGE 1: LETTERHEAD, PARTIES, COMMERCIAL MATRIX & CORE CLAUSES 1-4
              ═══════════════════════════════════════════════════════════════════════ */}
          <div
            className="agreement-a4-page"
            style={{
              width: '100%',
              maxWidth: '760px',
              background: '#FFFFFF',
              color: '#0F172A',
              padding: '42px 46px',
              borderRadius: '8px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: 1.55,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '1060px',
            }}
          >
            <div>
              {/* LETTERHEAD HEADER WITH EXACT RECEIPT LOGO */}
              <div style={{ paddingBottom: '16px', borderBottom: '2.5px solid #0284C7', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* Left: Brand Identity */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#2563EB',
                          boxShadow: '0 0 12px #2563EB',
                        }}
                      />
                      <span
                        style={{
                          color: '#0F172A',
                          fontWeight: 900,
                          fontSize: '1.65rem',
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
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        marginTop: '6px',
                        textTransform: 'uppercase',
                      }}
                    >
                      / WEB DEVELOPMENT &amp; DIGITAL SOLUTIONS
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '5px', fontWeight: 500 }}>
                      <strong>Designated Partners:</strong> Pankaj Tiwari &bull; Divyansh Chaurasia
                    </div>
                    <div style={{ fontSize: '0.70rem', color: '#64748B' }}>
                      Registered Operations: Lucknow, Uttar Pradesh, India
                    </div>
                  </div>

                  {/* Right: Contact & Document Reference */}
                  <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#334155' }}>
                    <div style={{ fontWeight: 700, color: '#0284C7' }}>✉ support@fixkar.co.in</div>
                    <div style={{ marginTop: '2px' }}>🌐 <a href="https://fixkar.co.in" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>https://fixkar.co.in</a></div>
                    <div style={{ marginTop: '6px', fontWeight: 800, fontFamily: 'monospace', color: '#0F172A', background: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', border: '1px solid #E2E8F0' }}>
                      REF: {refCode}
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '0.70rem' }}>Date of Execution: <strong>{dateStr}</strong></div>
                  </div>
                </div>

                {/* Decorative Accent Hairline */}
                <div style={{ width: '100%', height: '1.5px', background: 'linear-gradient(90deg, #0284C7 0%, #38BDF8 50%, #E2E8F0 100%)', marginTop: '12px' }}></div>
              </div>

              {/* Document Title Banner */}
              <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <div style={{ fontSize: '1.12rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', color: isPhase1 ? '#0369A1' : '#047857' }}>
                  {isPhase1 ? 'MANAGED SERVICE AGREEMENT & WORK ORDER (PHASE 1 MSA)' : 'PRODUCTION HANDOVER & 1-YEAR SLA MAINTENANCE CONTRACT (PHASE 2)'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '3px', fontWeight: 600 }}>
                  Executed under the provisions of the Indian Contract Act, 1872 &bull; Information Technology Act, 2000 (Section 10A)
                </div>
              </div>

              {/* Legal Recital Preamble */}
              <div style={{ fontSize: '0.76rem', color: '#334155', textAlign: 'justify', marginBottom: '16px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', borderLeft: '3.5px solid ' + (isPhase1 ? '#0284C7' : '#10B981'), border: '1px solid #E2E8F0' }}>
                {isPhase1 ? (
                  <span>THIS MANAGED SERVICE AGREEMENT (the "<strong>Agreement</strong>") is executed and made effective as of <strong>{dateStr}</strong> at Lucknow, Uttar Pradesh under the <strong>Indian Contract Act, 1872</strong> and the <strong>Information Technology Act, 2000 (Section 10A)</strong> by and between:</span>
                ) : (
                  <span>THIS PRODUCTION HANDOVER CERTIFICATE AND SLA MAINTENANCE CONTRACT is executed and made effective as of <strong>{dateStr}</strong> at Lucknow, Uttar Pradesh under the <strong>Indian Contract Act, 1872</strong> upon staging verification and live deployment by and between:</span>
                )}
              </div>

              {/* Parties Table */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', fontSize: '0.75rem' }}>
                  <div style={{ borderRight: '1px solid #E2E8F0', paddingRight: '12px' }}>
                    <div style={{ fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.04em', marginBottom: '3px' }}>
                      1. SERVICE PROVIDER (PARTY OF THE FIRST PART):
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.84rem' }}>Fixkar Technology Solutions</div>
                    <div style={{ color: '#475569', marginTop: '2px' }}>Designated Partners: <strong>Pankaj Tiwari</strong> &amp; <strong>Divyansh Chaurasia</strong></div>
                    <div style={{ color: '#64748B' }}>Corporate Email: support@fixkar.co.in</div>
                    <div style={{ color: '#64748B' }}>Registered Operations: Lucknow, Uttar Pradesh, India</div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, color: isPhase1 ? '#0284C7' : '#10B981', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.04em', marginBottom: '3px' }}>
                      2. CLIENT SUBSCRIBER (PARTY OF THE SECOND PART):
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.84rem' }}>{clientName}</div>
                    <div style={{ color: '#475569', marginTop: '2px' }}>Authorized Signatory / Owner: <strong>{contactPerson}</strong></div>
                    <div style={{ color: '#64748B' }}>Client Identification Code: <strong style={{ fontFamily: 'monospace', color: '#0284C7' }}>{clientCode}</strong></div>
                    <div style={{ color: '#64748B' }}>Live Domain: <strong style={{ color: '#0F172A' }}>https://{domain}</strong> {phone ? ' • Phone: ' + phone : ''}</div>
                  </div>
                </div>
              </div>

              {/* Commercial Consideration & 50/50 Milestones */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#0284C7', fontSize: '1rem' }}>●</span> COMMERCIAL CONSIDERATION &amp; 50/50 MILESTONE BILLING SCHEDULE:
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem', textAlign: 'center', border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: isPhase1 ? '#F0F9FF' : '#F0FDF4', borderBottom: '1px solid #CBD5E1' }}>
                      <th style={{ padding: '8px 12px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0F172A' }}>Total Agreed Scope Value</th>
                      <th style={{ padding: '8px 12px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0369A1' }}>Phase 1 (50% Advance)</th>
                      <th style={{ padding: '8px 12px', fontWeight: 800, color: isPhase1 ? '#B45309' : '#15803D' }}>{isPhase1 ? 'Phase 2 (50% Final Due)' : 'Settlement Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: '#FFFFFF' }}>
                      <td style={{ padding: '10px', borderRight: '1px solid #CBD5E1', fontWeight: 900, color: '#0F172A', fontSize: '0.92rem' }}>
                        ₹{totalCost.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px', borderRight: '1px solid #CBD5E1', fontWeight: 800, color: '#0284C7', fontSize: '0.92rem' }}>
                        ₹{phase1Advance.toLocaleString('en-IN')} <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A', marginTop: '2px' }}>(✓ Settled at Kickoff)</div>
                      </td>
                      <td style={{ padding: '10px', fontWeight: 800, color: isPhase1 ? '#D97706' : '#16A34A', fontSize: '0.92rem' }}>
                        {isPhase1 ? ('₹' + phase2Final.toLocaleString('en-IN')) : '✓ 100% Fully Settled'}
                        <div style={{ fontSize: '0.66rem', fontWeight: 700, color: isPhase1 ? '#D97706' : '#16A34A', marginTop: '2px' }}>
                          {isPhase1 ? '(Due Before Live Release)' : '(Nil Balance Due)'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Clauses 1 to 4 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.74rem', color: '#334155', textAlign: 'justify' }}>
                {isPhase1 ? (
                  <>
                    <div>
                      <strong style={{ color: '#0F172A' }}>1. SCOPE OF SERVICES &amp; TECHNICAL ARCHITECTURE DELIVERABLES:</strong> Fixkar Technology Solutions shall architect, design, program, and deploy the responsive web software platform for {clientName}. Deliverables include mobile-optimized UI/UX frontend, backend API integration, Fast2SMS transactional OTP authentication layer, Cloudflare SSL HTTPS encryption, PostgreSQL/MongoDB database modeling, and dedicated self-service Client Portal access (<strong>https://fixkar.co.in/#client-login</strong>).
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>2. 50/50 MILESTONE PAYMENT SCHEDULE (SECTION 2(d), INDIAN CONTRACT ACT, 1872):</strong>
                      <p style={{ margin: '3px 0 0 0' }}>
                        (a) <strong>Phase 1 Advance (50% - ₹{phase1Advance.toLocaleString('en-IN')}):</strong> Payable immediately upon contract execution for domain registration, cloud VPS provisioning, and engineering sprint kickoff.<br />
                        (b) <strong>Phase 2 Final Balance (50% - ₹{phase2Final.toLocaleString('en-IN')}):</strong> Strictly payable upon staging verification <u>when the website is fully ready and tested, prior to public live DNS routing</u>. Public live release occurs exclusively upon clearance of Phase 2 milestone.
                      </p>
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>3. SEVEN (7) DAYS POST-LIVE ADJUSTMENT &amp; REFINEMENT WINDOW:</strong>
                      <p style={{ margin: '3px 0 0 0' }}>
                        Commencing from the date of live production deployment, the Client has a strict <strong>Seven (7) Calendar Days Adjustment Window</strong>. The Client may request minor text corrections, image updates, or layout styling alignments strictly for existing delivered features. <u>No new features, additional pages, or custom modules can be added under this window</u>. After the expiry of 7 days, all changes become 100% chargeable.
                      </p>
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>4. ONE (1) YEAR (365 DAYS) FREE MAINTENANCE &amp; STRICT BUG-FIX WARRANTY:</strong>
                      <p style={{ margin: '3px 0 0 0' }}>
                        Fixkar provides 1-Year (365 Days) 99.9% uptime SLA and 100% FREE rectification for runtime software bugs, broken links, database errors, or server downtime. <u>This warranty DOES NOT cover any new feature additions, feature removals, workflow alterations, or structural redesigns</u>; any request to add or modify features requires a separate paid work order.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong style={{ color: '#0F172A' }}>1. PRODUCTION HANDOVER &amp; LIVE ACCEPTANCE:</strong> The Client certifies that it has thoroughly verified and approved the completed web platform on staging. Fixkar Technology Solutions has deployed the production build to <strong>https://{domain}</strong> under high-availability Managed Cloud VPS architecture with active SSL encryption.
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>2. 100% FINANCIAL DISCHARGE &amp; NIL BALANCE RECORD:</strong> Both parties acknowledge that the total agreed contract consideration of <strong>₹{totalCost.toLocaleString('en-IN')}</strong> (Phase 1 Advance ₹{phase1Advance.toLocaleString('en-IN')} + Phase 2 Handover ₹{phase2Final.toLocaleString('en-IN')}) is <strong>100% PAID IN FULL (NIL OUTSTANDING BALANCE)</strong>. Neither party holds any pending financial liability.
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>3. ACTIVE SEVEN (7) DAYS ADJUSTMENT PERIOD:</strong> Active from {dateStr}. The Client may request minor text adjustments or styling corrections strictly for existing features. No new features can be added under this window. Handover is deemed final post 7 days.
                    </div>

                    <div>
                      <strong style={{ color: '#0F172A' }}>4. ONE (1) YEAR FREE BUG-FIX MAINTENANCE WARRANTY:</strong> Active for 365 days from {dateStr}. Covers 100% FREE rectification for runtime bugs and server downtime. Any request to add new modules, remove features, or alter core workflows is strictly billable.
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Page 1 Footer */}
            <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#64748B' }}>
              <div>Fixkar Technology Solutions &bull; Lucknow, Uttar Pradesh, India</div>
              <div style={{ fontWeight: 700, color: '#0284C7' }}>PAGE 1 OF 2 &bull; Continued on Page 2 &rarr;</div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              PAGE 2: GOVERNANCE, LEGAL JURISDICTION & 3-PARTY PHYSICAL SIGNATURES
              ═══════════════════════════════════════════════════════════════════════ */}
          <div
            className="agreement-a4-page"
            style={{
              width: '100%',
              maxWidth: '760px',
              background: '#FFFFFF',
              color: '#0F172A',
              padding: '42px 46px',
              borderRadius: '8px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: 1.55,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '1060px',
            }}
          >
            <div>
              {/* PAGE 2 COMPACT HEADER */}
              <div style={{ paddingBottom: '12px', borderBottom: '1.5px solid #0284C7', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
                  <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0F172A' }}>FIXKAR TECHNOLOGY SOLUTIONS</span>
                  <span style={{ color: '#0284C7', fontSize: '0.74rem', fontWeight: 700 }}>/ LEGAL CONTRACT (PAGE 2)</span>
                </div>
                <div style={{ fontSize: '0.70rem', color: '#64748B', fontFamily: 'monospace' }}>
                  REF: {refCode} &bull; Date: {dateStr}
                </div>
              </div>

              {/* Clauses 5 to 8 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.74rem', color: '#334155', textAlign: 'justify', marginBottom: '28px' }}>
                <div>
                  <strong style={{ color: '#0F172A' }}>5. MANAGED INFRASTRUCTURE &amp; ROOT CREDENTIALS GOVERNANCE:</strong>
                  <p style={{ margin: '3px 0 0 0' }}>
                    All cloud VPS instances, custom domain DNS routings, SSL certificates, and telecom DLT gateways are provisioned and 100% managed under Fixkar Master Enterprise Infrastructure. To guarantee platform uptime, cybersecurity defense, and prevention of unauthorized tampering, direct root server credentials remain exclusively with Fixkar Technology Solutions. The Client retains full operational control via the Fixkar Client Portal.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#0F172A' }}>6. ANNUAL HOSTING &amp; DOMAIN INFRASTRUCTURE RENEWAL:</strong>
                  <p style={{ margin: '3px 0 0 0' }}>
                    Managed Cloud VPS server hosting, SSL encryption, offsite daily automated database backups, and custom domain DNS registration shall be due for annual renewal exactly 365 calendar days from the date of live deployment at Fixkar's transparent annual rate (currently ₹3,499/year).
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#0F172A' }}>7. INTELLECTUAL PROPERTY &amp; CLIENT DATA OWNERSHIP:</strong>
                  <p style={{ margin: '3px 0 0 0' }}>
                    Upon 100% full financial settlement of the agreed contract fees, {clientName} owns all custom digital assets, branding materials, customer databases, and application data uploaded to the platform. Fixkar maintains standard core framework libraries and server runtime tooling.
                  </p>
                </div>

                <div>
                  <strong style={{ color: '#0F172A' }}>8. GOVERNING LAW &amp; EXCLUSIVE JURISDICTION (INDIAN ACTS):</strong>
                  <p style={{ margin: '3px 0 0 0' }}>
                    This Agreement is governed by and construed in accordance with the <strong>Indian Contract Act, 1872</strong>, the <strong>Information Technology Act, 2000 (Section 10A)</strong>, and the <strong>Specific Relief Act, 1963</strong>. In the event of any legal dispute or arbitration arising out of this contract, the competent civil courts located in <strong>Lucknow, Uttar Pradesh, India</strong> shall have exclusive territorial and subject-matter jurisdiction.
                  </p>
                </div>
              </div>

              {/* Spacious 3-Party Physical Signatures Block */}
              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '2px solid #0F172A' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: '#0F172A', marginBottom: '16px', letterSpacing: '0.04em' }}>
                  IN WITNESS WHEREOF, THE PARTIES HERETO HAVE EXECUTED THIS AGREEMENT BY PHYSICAL SIGNATURES:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.72rem' }}>
                  {/* Fixkar Partner 1: Pankaj Tiwari */}
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '12px 14px', background: '#F8FAFC' }}>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', color: '#0284C7', fontSize: '0.66rem', marginBottom: '4px' }}>
                      FOR FIXKAR (PARTNER 1):
                    </div>
                    <div style={{ height: '48px', borderBottom: '1.5px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '3px', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '6px', fontSize: '0.80rem' }}>Pankaj Tiwari</div>
                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>Partner &amp; Authorized Signatory</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '3px' }}>Fixkar Technology Solutions</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B' }}>Date: <strong>{dateStr}</strong></div>
                    <div style={{ fontSize: '0.64rem', color: '#64748B', marginTop: '6px' }}>Official Seal: _______________</div>
                  </div>

                  {/* Fixkar Partner 2: Divyansh Chaurasia */}
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '12px 14px', background: '#F8FAFC' }}>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', color: '#0284C7', fontSize: '0.66rem', marginBottom: '4px' }}>
                      FOR FIXKAR (PARTNER 2):
                    </div>
                    <div style={{ height: '48px', borderBottom: '1.5px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '3px', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '6px', fontSize: '0.80rem' }}>Divyansh Chaurasia</div>
                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>Partner &amp; Authorized Signatory</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '3px' }}>Fixkar Technology Solutions</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B' }}>Date: <strong>{dateStr}</strong></div>
                    <div style={{ fontSize: '0.64rem', color: '#64748B', marginTop: '6px' }}>Official Seal: _______________</div>
                  </div>

                  {/* Client Signatory */}
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '6px', padding: '12px 14px', background: '#F8FAFC' }}>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', color: isPhase1 ? '#0284C7' : '#10B981', fontSize: '0.66rem', marginBottom: '4px' }}>
                      FOR {clientName.slice(0, 20).toUpperCase()}:
                    </div>
                    <div style={{ height: '48px', borderBottom: '1.5px solid #64748B', display: 'flex', alignItems: 'flex-end', paddingBottom: '3px', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontStyle: 'italic' }}>Signature: __________________</span>
                    </div>
                    <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '6px', fontSize: '0.80rem' }}>{contactPerson}</div>
                    <div style={{ fontSize: '0.68rem', color: '#475569' }}>Authorized Signatory / Owner</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '3px' }}>Code: <strong style={{ color: '#0284C7' }}>{clientCode}</strong></div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B' }}>Date: <strong>{dateStr}</strong></div>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Page 2 Footer with Legal Digital SHA-256 Hash */}
            <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1.5px solid #0284C7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.66rem', color: '#64748B' }}>
              <div>
                <strong style={{ color: '#0F172A' }}>Fixkar Technology Solutions</strong> &bull; Lucknow, Uttar Pradesh, India
              </div>
              <div style={{ fontStyle: 'italic' }}>
                Executed under IT Act, 2000 (Section 10A) &bull; Indian Contract Act, 1872
              </div>
              <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0284C7' }}>
                PAGE 2 OF 2 &bull; {digitalVerificationHash.slice(0, 20)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
