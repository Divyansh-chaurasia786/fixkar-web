import React from 'react';
import './FixKarLogo.css';

/**
 * FixKAR Official Exact Logo Component
 * @param {Object} props
 * @param {'compact' | 'full' | 'hero'} props.variant - Scale mode
 * @param {string} props.className - Extra CSS classes
 */
export const FixKarLogo = ({ variant = 'compact', className = '' }) => {
  return (
    <div className={`fixkar-brand-logo-wrapper logo-variant-${variant} ${className}`}>
      <img 
        src="/fixkar-logo.png" 
        alt="FixKAR Emergency Mobility Network" 
        className="fixkar-official-logo-img"
        loading="eager"
      />
    </div>
  );
};
