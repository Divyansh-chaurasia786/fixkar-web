import React from 'react';
import { VehicleSilhouette } from '../common/VisualPrimitives';
import './VehicleRail.css';

export const VehicleRail = ({ selectedCategory, onSelectCategory }) => {
  const vehicles = [
    { id: 'bike', label: 'BIKE', subtitle: 'Motorcycles & Mopeds' },
    { id: 'scooter', label: 'SCOOTER', subtitle: 'Geared & Gearless' },
    { id: 'car', label: 'CAR', subtitle: 'Hatchbacks & Sedans' },
    { id: 'suv', label: 'SUV', subtitle: 'Compact & Full SUVs' },
    { id: 'ev', label: 'EV', subtitle: 'Electric 2W & 4W' },
    { id: 'auto', label: 'AUTO', subtitle: 'Auto & E-Rickshaws' },
    { id: 'taxi', label: 'TAXI', subtitle: 'Commercial Fleets' },
    { id: 'van', label: 'VAN', subtitle: 'Passenger & Cargo' },
    { id: 'pickup', label: 'PICKUP', subtitle: 'Light Trucks' },
    { id: 'truck', label: 'TRUCK', subtitle: 'Heavy Goods & Buses' }
  ];

  return (
    <section className="vehicle-rail-section" id="all-vehicles">
      <div className="container">
        {/* Rail Header / Operational Label */}
        <div className="vehicle-rail-header font-mono">
          <div className="rail-title-wrapper">
            <span className="rail-pulse-dot" />
            <h2 className="rail-title font-sans">ONE NETWORK. EVERY VEHICLE.</h2>
          </div>
          <span className="rail-subtitle font-mono">10 VEHICLE CATEGORIES COVERED 24/7 IN LUCKNOW</span>
        </div>

        {/* Scrollable / Interactive Horizontal Rail */}
        <div className="vehicle-rail-track">
          {vehicles.map((v) => {
            const isSelected = selectedCategory === v.id;
            return (
              <button
                key={v.id}
                className={`vehicle-rail-item ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory?.(v.id)}
              >
                <div className="item-icon-wrapper">
                  <VehicleSilhouette category={v.id} size={32} />
                </div>
                <div className="item-details">
                  <span className="item-label font-sans">{v.label}</span>
                  <span className="item-subtitle font-mono">{v.subtitle}</span>
                </div>
                {isSelected && <div className="item-active-bar" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
