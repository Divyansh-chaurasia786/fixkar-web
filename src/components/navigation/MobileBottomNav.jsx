import React from 'react';
import { Home, Wrench, ShieldAlert, Search, User } from 'lucide-react';
import './MobileBottomNav.css';

export const MobileBottomNav = ({ activeTab = 'home', onTabChange, onSosClick }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'sos', label: 'SOS', icon: ShieldAlert, isEmergency: true },
    { id: 'track', label: 'Track', icon: Search },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav font-mono" aria-label="Mobile Navigation">
      <div className="mobile-nav-container">
        {tabs.map((t) => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;

          if (t.isEmergency) {
            return (
              <button
                key={t.id}
                className="mobile-nav-sos-btn"
                onClick={onSosClick}
                aria-label="Emergency SOS dispatch"
              >
                <div className="sos-outer-pulse" />
                <div className="sos-icon-circle">
                  <IconComp size={22} />
                </div>
                <span className="sos-label font-sans">SOS</span>
              </button>
            );
          }

          return (
            <button
              key={t.id}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange?.(t.id)}
            >
              <IconComp size={18} />
              <span className="item-text">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
