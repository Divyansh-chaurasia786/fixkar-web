import React from 'react';

/**
 * FixKAR Visual Primitive: RoadLine
 * Represents movement / route progress
 */
export const RoadLine = ({ orientation = 'horizontal', active = false, className = '' }) => (
  <div className={`primitive-road-line ${orientation} ${active ? 'active' : ''} ${className}`}>
    <div className="road-line-base" />
    {active && <div className="road-line-trace" />}
  </div>
);

/**
 * FixKAR Visual Primitive: LocationNode
 * Represents user, technician, or service center coordinates
 */
export const LocationNode = ({ type = 'user', label, active = true, coordinates }) => (
  <div className={`primitive-node node-${type} ${active ? 'active' : ''}`}>
    <div className="node-outer-ring">
      <div className="node-inner-dot" />
    </div>
    {label && <span className="node-label font-mono">{label}</span>}
    {coordinates && <span className="node-coords font-mono">{coordinates}</span>}
  </div>
);

/**
 * FixKAR Visual Primitive: RadarPulse
 * Represents searching / network scanning
 */
export const RadarPulse = ({ active = true, size = 120 }) => (
  <div className={`primitive-radar ${active ? 'active' : ''}`} style={{ width: size, height: size }}>
    <div className="radar-sweep" />
    <div className="radar-ring ring-1" />
    <div className="radar-ring ring-2" />
    <div className="radar-center-dot" />
  </div>
);

/**
 * FixKAR Visual Primitive: RouteTrace
 * Represents live movement toward assistance
 */
export const RouteTracePath = ({ pathD, active = true }) => (
  <svg className="primitive-route-svg" width="100%" height="100%" preserveAspectRatio="none">
    <path d={pathD} className="route-background-path" />
    {active && <path d={pathD} className="route-active-path" />}
  </svg>
);

/**
 * FixKAR Visual Primitive: StatusStrip
 * Represents live operational metrics or readiness state
 */
export const StatusStrip = ({ status = 'ONLINE', label = 'SYSTEM READY', location = 'LUCKNOW REGION' }) => (
  <div className="primitive-status-strip font-mono">
    <div className="status-indicator">
      <span className="indicator-pulse" />
      <span className="status-text">{status}</span>
    </div>
    <div className="strip-divider" />
    <div className="status-info">{label}</div>
    <div className="strip-divider" />
    <div className="status-location">{location}</div>
  </div>
);

/**
 * FixKAR Visual Primitive: VehicleSilhouette
 * Custom line icons for 10 vehicle categories: Bike, Scooter, Car, SUV, EV, Auto, Taxi, Van, Pickup, Truck
 */
export const VehicleSilhouette = ({ category, className = '', size = 28 }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.75',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `vehicle-icon ${className}`
  };

  switch (category) {
    case 'bike':
      return (
        <svg {...iconProps}>
          {/* Motorcycle */}
          <circle cx="8" cy="22" r="5" />
          <circle cx="24" cy="22" r="5" />
          <path d="M8 22L13 14H19L24 22M13 14L10 10H7M16 14V22" />
          <path d="M19 14L22 17" />
        </svg>
      );

    case 'scooter':
      return (
        <svg {...iconProps}>
          {/* Scooter */}
          <circle cx="8" cy="23" r="4" />
          <circle cx="24" cy="23" r="4" />
          <path d="M8 23H18L21 14H16L14 11H9" />
          <path d="M21 14H25L24 23" />
        </svg>
      );

    case 'car':
      return (
        <svg {...iconProps}>
          {/* Sedan Car */}
          <circle cx="9" cy="23" r="3.5" />
          <circle cx="23" cy="23" r="3.5" />
          <path d="M3 17L6 11C6.5 10 7.5 9.5 8.5 9.5H23.5C24.5 9.5 25.5 10 26 11L29 17V23H26.5M5.5 23H12.5M19.5 23H3" />
          <path d="M6 16H26" />
        </svg>
      );

    case 'suv':
      return (
        <svg {...iconProps}>
          {/* SUV / Crossover */}
          <circle cx="9" cy="23" r="4" />
          <circle cx="23" cy="23" r="4" />
          <path d="M3 18L5 9C5.5 7.5 7 7 8.5 7H22C23.5 7 25 7.5 25.5 9L29 18V23H27M5 23H13M19 23H3" />
          <path d="M4 16H28" />
        </svg>
      );

    case 'ev':
      return (
        <svg {...iconProps}>
          {/* EV Vehicle with Lightning Accent */}
          <circle cx="9" cy="23" r="3.5" />
          <circle cx="23" cy="23" r="3.5" />
          <path d="M3 17L6 11H26L29 17V23H26.5M5.5 23H12.5M19.5 23H3" />
          <path d="M16 7L13 13H17L14 19" stroke="var(--fixkar-red)" strokeWidth="2" />
        </svg>
      );

    case 'auto':
      return (
        <svg {...iconProps}>
          {/* Auto / E-Rickshaw */}
          <circle cx="8" cy="23" r="3.5" />
          <circle cx="24" cy="23" r="3.5" />
          <path d="M5 23V15L9 8H21L25 15V23H20.5M11.5 23H5" />
          <path d="M9 15H21" />
          <path d="M15 8V15" />
        </svg>
      );

    case 'taxi':
      return (
        <svg {...iconProps}>
          {/* Commercial Taxi */}
          <circle cx="9" cy="23" r="3.5" />
          <circle cx="23" cy="23" r="3.5" />
          <path d="M3 17L6 11H26L29 17V23H26.5M5.5 23H12.5M19.5 23H3" />
          <path d="M13 7H19V11H13V7Z" fill="var(--fixkar-red)" stroke="none" />
        </svg>
      );

    case 'van':
      return (
        <svg {...iconProps}>
          {/* Van / Commercial Vehicle */}
          <circle cx="9" cy="23" r="4" />
          <circle cx="23" cy="23" r="4" />
          <path d="M3 23V9C3 7.5 4.5 6.5 6 6.5H21L28 14V23H27M5 23H13M19 23H3" />
          <path d="M21 6.5V14H28" />
        </svg>
      );

    case 'pickup':
      return (
        <svg {...iconProps}>
          {/* Pickup Truck */}
          <circle cx="9" cy="23" r="4" />
          <circle cx="23" cy="23" r="4" />
          <path d="M3 16V23H5M13 23H19M27 23H29V17L25 10H16V16H3" />
          <path d="M16 16H28" />
        </svg>
      );

    case 'truck':
    default:
      return (
        <svg {...iconProps}>
          {/* Heavy Commercial Truck */}
          <circle cx="8" cy="24" r="3.5" />
          <circle cx="15" cy="24" r="3.5" />
          <circle cx="25" cy="24" r="3.5" />
          <path d="M2 24V11H18V24H11.5M18.5 24H21.5" />
          <path d="M18 13H25L29 18V24H28.5" />
        </svg>
      );
  }
};
