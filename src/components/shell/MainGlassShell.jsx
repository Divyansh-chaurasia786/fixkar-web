import React from 'react';

export function MainGlassShell({ children, isStandaloneAppView }) {
  return (
    <div className={`fixkar-root-container ${isStandaloneAppView ? 'fixkar-standalone-app-root' : ''}`}>
      {/* Clean Monolithic Floating Smoked-Glass Shell */}
      <main className={`fixkar-glass-shell ${isStandaloneAppView ? 'fixkar-standalone-app-shell' : ''}`}>
        {children}
      </main>
    </div>
  );
}
