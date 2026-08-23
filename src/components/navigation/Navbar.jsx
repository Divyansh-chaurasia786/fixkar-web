import React, { useState, useEffect } from 'react';
import { FixKarLogo } from '../brand/FixKarLogo';
import { MapPin, ChevronDown, User, PhoneCall, Menu, X, ShieldAlert } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ onEmergencyClick, onLocationChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Lucknow');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const supportedLocations = [
    { city: 'Lucknow', status: 'ACTIVE NETWORK', count: '14 Network Nodes' },
    { city: 'Kanpur', status: 'COMING SOON', count: 'Expansion Phase' },
    { city: 'Gorakhpur', status: 'COMING SOON', count: 'Expansion Phase' },
    { city: 'Varanasi', status: 'COMING SOON', count: 'Expansion Phase' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectLocation = (loc) => {
    setCurrentLocation(loc.city);
    setLocationDropdownOpen(false);
    onLocationChange?.(loc.city);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* LEFT: Compact FixKAR Logo */}
        <a href="#hero" className="navbar-logo-link" aria-label="FixKAR Home">
          <FixKarLogo variant="compact" />
        </a>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav className="navbar-center-links" aria-label="Main Navigation">
          <a href="#emergency" className="nav-item nav-emergency">
            <span className="nav-dot-pulse" />
            Emergency SOS
          </a>
          <a href="#services" className="nav-item">Services</a>
          <a href="#how-it-works" className="nav-item">How It Works</a>
          <a href="#track" className="nav-item">Track Request</a>
        </nav>

        {/* RIGHT: Location, Account & Emergency CTA */}
        <div className="navbar-right-controls">
          {/* Location Selector Dropdown */}
          <div className="location-selector-wrapper">
            <button 
              className="location-pill-btn font-mono"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              aria-expanded={locationDropdownOpen}
              aria-label="Select location"
            >
              <MapPin size={14} className="location-pin-icon" />
              <span className="location-city-text">{currentLocation}</span>
              <ChevronDown size={14} className={`chevron-icon ${locationDropdownOpen ? 'open' : ''}`} />
            </button>

            {locationDropdownOpen && (
              <div className="location-dropdown-panel font-mono">
                <div className="dropdown-header">
                  <span>SUPPORTED REGIONS</span>
                  <span className="region-badge">UP CENTRAL</span>
                </div>
                {supportedLocations.map((loc) => (
                  <button
                    key={loc.city}
                    className={`dropdown-item ${loc.city === currentLocation ? 'active' : ''}`}
                    onClick={() => handleSelectLocation(loc)}
                  >
                    <div className="item-city">{loc.city}</div>
                    <div className="item-meta">
                      <span className={`meta-status ${loc.status === 'ACTIVE NETWORK' ? 'active' : ''}`}>
                        {loc.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account Control */}
          <button className="navbar-account-btn" aria-label="Account login">
            <User size={16} />
            <span className="account-text font-mono">Account</span>
          </button>

          {/* Primary Action CTA */}
          <button 
            className="navbar-primary-cta"
            onClick={onEmergencyClick}
          >
            <ShieldAlert size={16} />
            <span>GET HELP NOW</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <div className="drawer-location-bar font-mono">
            <MapPin size={14} className="location-pin-icon" />
            <span>Active Region: <strong>{currentLocation}</strong> (Lucknow Network)</span>
          </div>

          <div className="drawer-links">
            <a 
              href="#emergency" 
              className="drawer-link drawer-emergency"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldAlert size={18} />
              Emergency SOS Help
            </a>
            <a 
              href="#services" 
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vehicle Care & Servicing
            </a>
            <a 
              href="#how-it-works" 
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              How FixKAR Works
            </a>
            <a 
              href="#track" 
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Active Request
            </a>
          </div>

          <div className="drawer-footer">
            <button 
              className="drawer-cta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onEmergencyClick?.();
              }}
            >
              <PhoneCall size={18} />
              GET HELP NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
