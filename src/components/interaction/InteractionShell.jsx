import React, { useState } from 'react';
import { VehicleSilhouette } from '../common/VisualPrimitives';
import { 
  AlertTriangle, BatteryCharging, Flame, KeyRound, Fuel, Truck, 
  HelpCircle, ArrowRight, ShieldAlert, CheckCircle, Wrench, Clock, MapPin, ChevronRight
} from 'lucide-react';
import './InteractionShell.css';

export const InteractionShell = ({ defaultCategory = 'car', onDispatchSubmit }) => {
  const [activeIntent, setActiveIntent] = useState('FIX_NOW'); // FIX_NOW | VEHICLE_CARE
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedProblem, setSelectedProblem] = useState('start');
  const [locationInput, setLocationInput] = useState('Hazratganj, Lucknow');

  const vehicleTypes = [
    { id: 'bike', label: 'Two-Wheeler', sub: 'Motorcycles & Mopeds', iconCat: 'bike' },
    { id: 'car', label: 'Car / SUV', sub: 'Hatchbacks, Sedans & SUVs', iconCat: 'car' },
    { id: 'auto', label: 'Auto / E-Rickshaw', sub: '3-Wheelers & Tuktuks', iconCat: 'auto' },
    { id: 'taxi', label: 'Taxi / Fleet', sub: 'Commercial Passenger Fleets', iconCat: 'taxi' },
    { id: 'van', label: 'Van / Pickup', sub: 'Passenger Vans & Light Goods', iconCat: 'pickup' },
    { id: 'truck', label: 'Truck / Heavy', sub: 'Heavy Goods & Buses', iconCat: 'truck' },
    { id: 'ev', label: 'EV Electric', sub: '2W & 4W Electric Vehicles', iconCat: 'ev' }
  ];

  const emergencyProblems = [
    { 
      id: 'start', 
      label: "Won't Start", 
      icon: AlertTriangle, 
      eta: '6–10 mins', 
      insight: 'Could be battery, starter motor, or electrical ignition issue. FixKAR rapidly diagnoses on location.'
    },
    { 
      id: 'tyre', 
      label: 'Flat Tyre / Puncture', 
      icon: AlertTriangle, 
      eta: '8–12 mins', 
      insight: 'On-site puncture repair, tube replacement, or spare tyre fitting unit dispatched immediately.'
    },
    { 
      id: 'battery', 
      label: 'Dead Battery / Jumpstart', 
      icon: BatteryCharging, 
      eta: '6–10 mins', 
      insight: 'Portable booster pack jumpstart & battery terminal diagnostic test.'
    },
    { 
      id: 'breakdown', 
      label: 'Roadside Breakdown', 
      icon: AlertTriangle, 
      eta: '10–14 mins', 
      insight: 'Complete roadside breakdown assistance team equipped for immediate mechanical intervention.'
    },
    { 
      id: 'overheat', 
      label: 'Engine Overheating', 
      icon: Flame, 
      eta: '8–12 mins', 
      insight: 'Coolant refill, radiator leak test, and thermostatic fan inspection.'
    },
    { 
      id: 'towing', 
      label: 'Need Flatbed Towing', 
      icon: Truck, 
      eta: '12–18 mins', 
      insight: 'Hydraulic flatbed tow truck dispatched for safe zero-damage vehicle transport.'
    },
    { 
      id: 'fuel', 
      label: 'Out of Fuel / Wrong Fuel', 
      icon: Fuel, 
      eta: '8–12 mins', 
      insight: 'Emergency fuel delivery or tank drain service for accidental misfueling.'
    },
    { 
      id: 'lockout', 
      label: 'Key Lockout / Stuck', 
      icon: KeyRound, 
      eta: '10–15 mins', 
      insight: 'Damage-free door unlocking & key extraction technician on call.'
    },
    { 
      id: 'other', 
      label: 'Unknown Roadside Issue', 
      icon: HelpCircle, 
      eta: '8–12 mins', 
      insight: 'Tell our rescue operator what happened and we will route the optimal support unit.'
    }
  ];

  const vehicleCareServices = [
    { 
      id: 'service', 
      label: 'Full Periodic Servicing', 
      icon: Wrench, 
      time: 'Same Day',
      insight: 'Complete multi-point inspection, oil change, filter replacement, and fluid top-up.'
    },
    { 
      id: 'brakes', 
      label: 'Brake Inspection & Repair', 
      icon: Wrench, 
      time: '2–3 Hours',
      insight: 'Brake pad replacement, disc resurfacing, and hydraulic fluid bleed.'
    },
    { 
      id: 'ac', 
      label: 'AC Service & Gas Top-up', 
      icon: Wrench, 
      time: '2 Hours',
      insight: 'Compressor health check, cabin filter cleaning, and eco-friendly refrigerant gas refill.'
    },
    { 
      id: 'tyres', 
      label: 'Tyre Replacement & Alignment', 
      icon: Wrench, 
      time: '1–2 Hours',
      insight: 'Laser wheel alignment, 3D balancing, and premium brand tyre installation.'
    },
    { 
      id: 'diagnostics', 
      label: 'Computerized Engine Diagnostics', 
      icon: Wrench, 
      time: '1 Hour',
      insight: 'OBD-II scanner check for check-engine light codes and sensor diagnostics.'
    }
  ];

  const activeProblemList = activeIntent === 'FIX_NOW' ? emergencyProblems : vehicleCareServices;
  const currentProblemObj = activeProblemList.find(p => p.id === selectedProblem) || activeProblemList[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onDispatchSubmit?.({
      intent: activeIntent,
      vehicle: selectedCategory,
      problem: selectedProblem,
      location: locationInput
    });
  };

  return (
    <section className="interaction-section surface-concrete" id="emergency">
      <div className="container">
        {/* Header & Intent Selector */}
        <div className="interaction-header">
          <div className="operational-eyebrow">
            <span className="dot-indicator" />
            <span>INTERACTIVE ASSISTANCE SHELL</span>
          </div>

          <h2 className="interaction-title">
            Select your vehicle & problem for <span className="text-red">instant response.</span>
          </h2>

          {/* Intent Selector Tabs */}
          <div className="intent-tabs font-mono">
            <button
              className={`intent-tab ${activeIntent === 'FIX_NOW' ? 'active-fix' : ''}`}
              onClick={() => {
                setActiveIntent('FIX_NOW');
                setSelectedProblem('start');
              }}
            >
              <ShieldAlert size={16} />
              <span>EMERGENCY (FIX NOW)</span>
              <span className="tab-tag">24/7 FAST</span>
            </button>

            <button
              className={`intent-tab ${activeIntent === 'VEHICLE_CARE' ? 'active-care' : ''}`}
              onClick={() => {
                setActiveIntent('VEHICLE_CARE');
                setSelectedProblem('service');
              }}
            >
              <Wrench size={16} />
              <span>VEHICLE CARE & REPAIR</span>
              <span className="tab-tag-subtle">SCHEDULED</span>
            </button>
          </div>
        </div>

        {/* STEP 01: What are you driving? (Warm Concrete Technical Vehicle Rail) */}
        <div className="shell-step-block">
          <div className="step-label font-mono">
            <span className="step-num">01</span>
            <span>WHAT ARE YOU DRIVING?</span>
          </div>

          <div className="vehicle-technical-rail">
            {vehicleTypes.map((v) => {
              const isSelected = selectedCategory === v.id;
              return (
                <button
                  key={v.id}
                  className={`rail-vehicle-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(v.id)}
                >
                  <div className="item-top">
                    <VehicleSilhouette category={v.iconCat} size={28} />
                    {isSelected && <CheckCircle size={16} className="snap-check-icon" />}
                  </div>
                  <div className="item-bottom">
                    <span className="rail-v-label font-sans">{v.label}</span>
                    <span className="rail-v-sub font-mono">{v.sub}</span>
                  </div>
                  {isSelected && <div className="active-red-underline" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 02: What's stopping you? */}
        <div className="shell-step-block">
          <div className="step-label font-mono">
            <span className="step-num">02</span>
            <span>{activeIntent === 'FIX_NOW' ? "WHAT'S STOPPING YOU?" : "SELECT SERVICE NEEDED"}</span>
          </div>
          <p className="step-subtitle">
            You don't need to know the technical fault. Tell us what happened.
          </p>

          <div className="editorial-problem-list">
            {activeProblemList.map((p) => {
              const isSelected = selectedProblem === p.id;
              const IconComp = p.icon;
              return (
                <button
                  key={p.id}
                  className={`editorial-problem-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedProblem(p.id)}
                >
                  <div className="row-main">
                    <div className="prob-icon-box">
                      <IconComp size={18} />
                    </div>
                    <div className="prob-text">
                      <span className="prob-name font-sans">{p.label}</span>
                      <span className="prob-eta font-mono">
                        {p.eta ? `Est. Arrival: ${p.eta}` : `Est. Duration: ${p.time}`}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="selected-insight-callout font-mono">
                      <ChevronRight size={14} className="callout-arrow" />
                      <span>{p.insight}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 03: Action Bar & Dispatch Location */}
        <form className="concrete-action-bar" onSubmit={handleFormSubmit}>
          <div className="action-location-group font-mono">
            <MapPin size={18} className="pin-icon" />
            <div className="location-field-wrapper">
              <label htmlFor="user-location-input">PICKUP / SERVICE LOCATION:</label>
              <input
                id="user-location-input"
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter area, landmark or street in Lucknow"
                className="location-input-control"
              />
            </div>
          </div>

          <div className="action-meta font-mono">
            <div className="eta-badge">
              <Clock size={12} />
              <span>{currentProblemObj.eta ? `RESPONSE: ${currentProblemObj.eta}` : `TIME: ${currentProblemObj.time}`}</span>
            </div>
          </div>

          <button type="submit" className="action-dispatch-btn">
            <span>{activeIntent === 'FIX_NOW' ? 'REQUEST EMERGENCY DISPATCH' : 'CONFIRM SERVICE REQUEST'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};
