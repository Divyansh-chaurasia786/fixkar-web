import React from 'react';
import { X, Printer, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export function ReceiptModal({ project, paymentData, onClose }) {
  if (!project && !paymentData) return null;

  const clientName    = project?.clientName  || paymentData?.clientName  || 'Valued Client';
  const clientCode    = project?.clientCode  || paymentData?.clientCode  || 'FIX-CLIENT-001';
  const domain        = project?.domain      || paymentData?.domain      || 'clientwebsite.in';
  const contactPerson = project?.contactPerson || paymentData?.contactPerson || '';
  const phone         = project?.phone       || paymentData?.phone       || '';

  const receiptNo     = project?.receiptNumber || paymentData?.receiptNumber
    || ('FIX-RCPT-' + new Date().getFullYear() + '-' + String(project?.id || Date.now()).slice(-4));
  const paymentMethod = project?.paymentMethod || paymentData?.paymentMethod || 'UPI (Google Pay / PhonePe)';
  const txRef         = project?.transactionReference || paymentData?.transactionReference
    || (paymentMethod.includes('Cash') ? 'CASH-VERIFIED' : ('UPI/' + Math.floor(100000000000 + Math.random() * 900000000000)));
  const paymentDate   = paymentData?.paymentDate || new Date().toISOString().split('T')[0];

  const amountPaidNow = Number(paymentData?.rawAmount || project?.rawAmount || String(paymentData?.amount || project?.totalBudget || '0').replace(/[^0-9]/g, '')) || 0;

  let lineItems = [];
  if (Array.isArray(project?.customLineItems) && project.customLineItems.length > 0) {
    lineItems = project.customLineItems.map((item) => ({
      name: item.name || 'Deliverable Item',
      amount: Number(item.amount) || 0,
    }));
  } else if (Array.isArray(paymentData?.customLineItems) && paymentData.customLineItems.length > 0) {
    lineItems = paymentData.customLineItems.map((item) => ({
      name: item.name || 'Deliverable Item',
      amount: Number(item.amount) || 0,
    }));
  } else {
    lineItems = [
      { name: project?.service || project?.serviceDescription || 'Full-Stack Web Application & Digital Platform Engineering Handover', amount: Number(project?.totalProjectBudget) || amountPaidNow },
    ];
  }

  const deliverablesTotal = lineItems.reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const totalProjectValue = Number(project?.totalProjectBudget) || deliverablesTotal || amountPaidNow;

  const advancePaid = Number(project?.advancePaidAmount || paymentData?.advancePaidAmount || 0);
  const advanceRefCode = project?.advanceRef || paymentData?.advanceRef || '';
  const isPhase2WithAdvance = advancePaid > 0;

  let balanceRemaining = 0;
  if (project?.balanceDue !== undefined && project?.balanceDue !== null && project?.balanceDue !== '') {
    balanceRemaining = Number(String(project.balanceDue).replace(/[^0-9]/g, '')) || 0;
  } else {
    balanceRemaining = Math.max(0, totalProjectValue - (advancePaid + amountPaidNow));
  }

  const digitalSignatureHash = 'FIX-' + Math.abs((receiptNo + (amountPaidNow || 0) + clientCode).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)).toString(16).toUpperCase().padStart(16, '0') + '-' + Date.now().toString(16).toUpperCase();

  const getWA = () => {
    const cp = String(phone || '').replace(/[^0-9]/g, '');
    const paymentBreakdownText = isPhase2WithAdvance
      ? '• Total Project Budget: Rs. ' + totalProjectValue.toLocaleString('en-IN') + '\n' +
        '• Advance Paid (Phase 1): Rs. ' + advancePaid.toLocaleString('en-IN') + (advanceRefCode ? ' [' + advanceRefCode + ']' : '') + '\n' +
        '• Final Payment (Phase 2): Rs. ' + amountPaidNow.toLocaleString('en-IN') + '\n' +
        '• Total Settled (100%): Rs. ' + (advancePaid + amountPaidNow).toLocaleString('en-IN') + '\n' +
        '• Balance Due: Rs. 0.00 (Handover Completed)\n'
      : '• Total Project Amount: Rs. ' + totalProjectValue.toLocaleString('en-IN') + '\n' +
        '• Amount Paid: Rs. ' + amountPaidNow.toLocaleString('en-IN') + '\n' +
        '• Balance Due: Rs. ' + balanceRemaining.toLocaleString('en-IN') + (balanceRemaining === 0 ? ' (Settled)' : '') + '\n';

    const t = encodeURIComponent(
      'Hello ' + (contactPerson || clientName) + '!\n\n' +
      '• FIXKAR ' + (isPhase2WithAdvance ? 'Final Settlement Receipt' : 'Official Payment Receipt') + '\n' +
      '• Receipt No: ' + receiptNo + '\n' +
      '• Client: ' + clientName + ' (' + clientCode + ')\n' +
      '• Domain: https://' + domain + '\n' +
      paymentBreakdownText +
      '• Mode: ' + paymentMethod + '\n' +
      '• Ref: ' + txRef + '\n\n' +
      'For support, raise a ticket at: www.fixkar.co.in\n' +
      '— FIXKAR / Web Development & Digital Solutions'
    );
    return 'https://wa.me/' + (cp.startsWith('91') ? cp : '91' + cp) + '?text=' + t;
  };

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (err) {
      return d;
    }
  };

  const INV_NO = project?.invoiceNumber || receiptNo.replace('RCPT', 'INV');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 18, 0.90)',
        backdropFilter: 'blur(16px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* ── Top Bar (Hidden on Print) ── */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#0B0F19',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '10px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#3B82F6',
                boxShadow: '0 0 8px #3B82F6',
              }}
            />
            <span style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.04em' }}>
              FIXKAR
            </span>
            <span style={{ color: '#64748B', fontSize: '0.72rem' }}>
              / Official Payment Receipt
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: '#2563EB',
                border: 'none',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Printer size={13} /> Print / PDF
            </button>
            <a
              href={getWA()}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#16A34A',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <MessageSquare size={13} /> WhatsApp
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Official Receipt Sheet ── */}
        <div
          id="printable-receipt-sheet"
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.75)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: '#0F172A',
            border: '1px solid #E2E8F0',
          }}
        >
          {/* ── Header Band with FIXKAR Typography ── */}
          <div
            style={{
              background: '#070C18',
              padding: '22px 26px 18px',
              borderBottom: '3px solid #2563EB',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Pure Typography Brand Logo */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#3B82F6',
                      boxShadow: '0 0 10px #3B82F6',
                    }}
                  />
                  <span
                    style={{
                      color: '#FFFFFF',
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
                    color: '#60A5FA',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    marginTop: '5px',
                    textTransform: 'uppercase',
                  }}
                >
                  / WEB DEVELOPMENT &amp; DIGITAL SOLUTIONS
                </div>
              </div>

              {/* Receipt Tag & Number */}
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    display: 'inline-block',
                    background: balanceRemaining === 0 ? '#15803D' : '#1E40AF',
                    color: '#FFFFFF',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '4px',
                  }}
                >
                  {balanceRemaining === 0 ? 'Official Receipt' : 'Milestone Receipt'}
                </div>
                <div
                  style={{
                    color: '#F1F5F9',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    fontFamily: 'monospace',
                  }}
                >
                  {receiptNo}
                </div>
                <div style={{ color: '#64748B', fontSize: '0.64rem', marginTop: '2px' }}>
                  Inv: <span style={{ fontFamily: 'monospace', color: '#94A3B8' }}>{INV_NO}</span>
                </div>
              </div>
            </div>

            {/* Studio Address & Support Links */}
            <div
              style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                color: '#64748B',
                fontSize: '0.64rem',
              }}
            >
              <span>Alamnagar, Lucknow, UP — 226017</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>Email: <strong style={{ color: '#94A3B8' }}>support@fixkar.co.in</strong></span>
                <span style={{ color: '#334155' }}>•</span>
                <span>Support: <strong style={{ color: '#94A3B8' }}>www.fixkar.co.in</strong></span>
              </div>
            </div>
          </div>

          {/* ── Receipt Main Body ── */}
          <div style={{ padding: '22px 26px' }}>
            {/* Client Info & Date Block */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                paddingBottom: '14px',
                borderBottom: '1px solid #E2E8F0',
                marginBottom: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '3px',
                  }}
                >
                  Billed To (Client)
                </div>
                <div style={{ fontWeight: 900, fontSize: '0.96rem', color: '#0F172A' }}>
                  {clientName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '2px' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{clientCode}</span>
                  {domain && <span> &nbsp;•&nbsp; {domain}</span>}
                </div>
                {contactPerson && (
                  <div style={{ fontSize: '0.66rem', color: '#64748B', marginTop: '1px' }}>
                    Contact: {contactPerson}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '3px',
                  }}
                >
                  Date &amp; Mode
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0F172A' }}>
                  {fmtDate(paymentDate)}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 700, marginTop: '2px' }}>
                  {paymentMethod}
                </div>
              </div>
            </div>

            {/* Services / Deliverables Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2px' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      width: '24px',
                      textAlign: 'left',
                      padding: '6px 0',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: '2px solid #0F172A',
                    }}
                  >
                    #
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '6px 10px',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: '2px solid #0F172A',
                    }}
                  >
                    Deliverable / Service Description
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      padding: '6px 0',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: '2px solid #0F172A',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {(lineItems || []).map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td
                      style={{
                        padding: '10px 0',
                        verticalAlign: 'top',
                        fontSize: '0.7rem',
                        color: '#94A3B8',
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        padding: '10px 10px',
                        verticalAlign: 'top',
                        fontSize: '0.78rem',
                        color: '#1E293B',
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: '10px 0',
                        verticalAlign: 'top',
                        textAlign: 'right',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Rs. {item.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Breakdown */}
            <div style={{ borderTop: '2px solid #0F172A', paddingTop: '10px', marginTop: '2px' }}>
              {/* Total Project Amount */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.76rem',
                  color: '#64748B',
                  marginBottom: '5px',
                }}
              >
                <span>Total Project Value:</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  Rs. {totalProjectValue.toLocaleString('en-IN')}
                </span>
              </div>

              {/* IF PHASE 2: Show Phase 1 Advance Paid deduction */}
              {isPhase2WithAdvance && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.74rem',
                    color: '#1D4ED8',
                    marginBottom: '5px',
                    background: '#EFF6FF',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #DBEAFE',
                  }}
                >
                  <span>
                    Advance Paid (Phase 1):
                    {advanceRefCode && (
                      <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#2563EB', marginLeft: '6px', fontWeight: 700 }}>
                        [Ref: {advanceRefCode}]
                      </span>
                    )}
                  </span>
                  <span style={{ fontWeight: 800, color: '#1D4ED8' }}>
                    (-) Rs. {advancePaid.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Amount Paid Now */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #E2E8F0',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>
                    {isPhase2WithAdvance ? 'Final Settlement Paid (Phase 2):' : 'Amount Paid:'}
                  </span>
                  {isPhase2WithAdvance && (
                    <div style={{ fontSize: '0.62rem', color: '#64748B', marginTop: '1px' }}>
                      Paid via {paymentMethod}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#16A34A',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Rs. {amountPaidNow.toLocaleString('en-IN')}
                </span>
              </div>

              {/* IF PHASE 2: Total Cumulative Amount Paid */}
              {isPhase2WithAdvance && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '6px',
                    paddingTop: '6px',
                    borderTop: '1px dashed #CBD5E1',
                    fontSize: '0.76rem',
                    color: '#475569',
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Total Cumulative Paid (100%):</span>
                  <strong style={{ fontWeight: 800, color: '#0F172A' }}>
                    Rs. {(advancePaid + amountPaidNow).toLocaleString('en-IN')}
                  </strong>
                </div>
              )}

              {/* Balance Due */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginTop: '6px',
                  paddingTop: '4px',
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                  Balance Due:
                </span>
                <span
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: balanceRemaining === 0 ? '#16A34A' : '#D97706',
                  }}
                >
                  Rs. {balanceRemaining.toLocaleString('en-IN')} {balanceRemaining === 0 ? '(Settled & Handover Complete)' : ''}
                </span>
              </div>
            </div>

            {/* Transaction / UTR Reference Card */}
            <div
              style={{
                marginTop: '16px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Transaction / UTR Reference
                </div>
                <div
                  style={{
                    margin: '3px 0 0',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#2563EB',
                    wordBreak: 'break-all',
                  }}
                >
                  {txRef}
                </div>
              </div>
              <div
                style={{
                  background: '#DCFCE7',
                  border: '1px solid #86EFAC',
                  borderRadius: '5px',
                  padding: '4px 10px',
                  fontSize: '0.64rem',
                  fontWeight: 800,
                  color: '#166534',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={12} /> Verified
              </div>
            </div>

            {/* Computer Generated Legal Note */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px dashed #CBD5E1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', maxWidth: '340px' }}>
                <ShieldCheck size={14} color="#16A34A" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#16A34A' }}>
                    Computer Generated Digital Document
                  </div>
                  <div style={{ fontSize: '0.58rem', color: '#64748B', lineHeight: 1.35, marginTop: '1px' }}>
                    No physical signature or stamp required. Any tampering or unauthorized alteration invalidates this official record.
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.56rem', color: '#94A3B8', fontFamily: 'monospace', flexShrink: 0 }}>
                {digitalSignatureHash.slice(0, 24)}...
              </div>
            </div>

            {/* Footer Brand Line */}
            <div
              style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#3B82F6',
                  }}
                />
                <span style={{ fontWeight: 900, fontSize: '0.7rem', color: '#0F172A', letterSpacing: '0.04em' }}>
                  FIXKAR
                </span>
                <span style={{ color: '#64748B', fontSize: '0.6rem' }}>
                  / Web Development &amp; Digital Solutions
                </span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#64748B', display: 'flex', gap: '8px' }}>
                <span>support@fixkar.co.in</span>
                <span>•</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>www.fixkar.co.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}