import React from 'react';
import './SurfaceTransition.css';

export const SurfaceTransition = () => {
  return (
    <div className="surface-transition-block" aria-hidden="true">
      {/* Route Line Crossing the Dark Asphalt -> Warm Concrete Border */}
      <svg className="transition-route-svg" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path d="M 0 0 L 600 40 L 1200 80" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 400 0 C 500 30, 600 50, 700 80" stroke="var(--fixkar-red)" strokeWidth="2.5" />
      </svg>

      <div className="transition-divider-strip font-mono">
        <span className="strip-line" />
        <span className="strip-text">MOBILITY DISCOVERY & SELECTION ZONE</span>
        <span className="strip-line" />
      </div>
    </div>
  );
};
