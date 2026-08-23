import React, { useState, useEffect, useRef } from 'react';
import './SplashScreen.css';

export const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Session check: skip full splash on internal reloads / repeat navigation
    const hasSeenSplash = sessionStorage.getItem('fixkar_splash_seen');
    if (hasSeenSplash) {
      onComplete?.();
      return;
    }

    // Target duration: ~3.5 seconds total for 001 -> 100 progress
    const totalDuration = 3500;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const normalizedTime = Math.min(1, elapsed / totalDuration);

      // Sophisticated non-linear progress pacing:
      // 001-012 quick launch, 012-065 steady cruising, 065-088 calm pacing, 088-097 tension, 097-100 completion
      let currentVal = 1;
      if (normalizedTime < 0.15) {
        currentVal = 1 + (normalizedTime / 0.15) * 11;
      } else if (normalizedTime < 0.65) {
        currentVal = 12 + ((normalizedTime - 0.15) / 0.50) * 53;
      } else if (normalizedTime < 0.88) {
        currentVal = 65 + ((normalizedTime - 0.65) / 0.23) * 23;
      } else if (normalizedTime < 0.97) {
        currentVal = 88 + ((normalizedTime - 0.88) / 0.09) * 9;
      } else {
        currentVal = 97 + ((normalizedTime - 0.97) / 0.03) * 3;
      }

      const p = Math.min(100, Math.max(1, Math.floor(currentVal)));
      setProgress(p);

      if (normalizedTime < 1.0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // 100% reached: 180ms lock moment then trigger differentiated material surface split reveal (850ms)
        setTimeout(() => {
          setIsSplitting(true);
          setTimeout(() => {
            sessionStorage.setItem('fixkar_splash_seen', 'true');
            setIsUnmounted(true);
            onComplete?.();
          }, 900);
        }, 180);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  if (isUnmounted) return null;

  // Format 3-digit tabular progress (001, 018, 047, 083, 100)
  const formattedProgress = progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100';

  return (
    <div 
      className={`split-surface-splash-overlay ${isSplitting ? 'surfaces-splitting-open' : ''}`} 
      aria-hidden="true"
    >
      {/* 1. ASPHALT MATERIAL PANEL (70% Width Desktop / 64% Height Mobile) */}
      <div className="surface-panel panel-asphalt">
        <div className="asphalt-grain-texture" />
        <div className="asphalt-material-edge" />
        
        {/* Architectural Grid-Aligned Editorial Typography */}
        <div className="asphalt-content-block">
          <span className="surface-eyebrow font-mono">01 &bull; EMERGENCY</span>
          <h1 className="asphalt-headline">
            ROADSIDE<br />ASSISTANCE
          </h1>
          <span className="surface-subtext font-mono">24/7 &bull; ALL VEHICLES</span>
        </div>
      </div>

      {/* 2. PRECISION FIXKAR SIGNAL RED SEAM & NATIVE PROGRESS INDICATOR */}
      <div className="signal-red-seam-container">
        {/* Base Muted 1px Seam Track */}
        <div className="seam-base-line" />
        
        {/* Active Signal Red Progress Fill */}
        <div 
          className="seam-progress-fill" 
          style={{ height: `${progress}%` }}
        >
          {/* Brighter 4px Terminal Edge Highlight */}
          <div className="seam-terminal-highlight" />
        </div>

        {/* Integrated 3-Digit Tabular Numerals (001 -> 100) Attached to Seam Edge */}
        <div 
          className="seam-progress-badge font-mono"
          style={{ top: `${progress}%` }}
        >
          <span className="badge-num">{formattedProgress}</span>
        </div>
      </div>

      {/* 3. WARM CONCRETE MATERIAL PANEL (30% Width Desktop / 36% Height Mobile) */}
      <div className="surface-panel panel-concrete">
        <div className="concrete-grain-texture" />
        <div className="concrete-material-edge" />

        {/* Architectural Grid-Aligned Editorial Typography */}
        <div className="concrete-content-block">
          <span className="surface-eyebrow font-mono">02 &bull; CARE</span>
          <h1 className="concrete-headline">
            VEHICLE<br />CARE
          </h1>
          <span className="surface-subtext font-mono">SERVICE &bull; REPAIR &bull; SUPPORT</span>
        </div>
      </div>

      {/* Keyboard Accessible Subtle Skip Control */}
      <button 
        className="split-splash-skip font-mono"
        onClick={() => {
          sessionStorage.setItem('fixkar_splash_seen', 'true');
          setIsSplitting(true);
          setTimeout(() => {
            setIsUnmounted(true);
            onComplete?.();
          }, 250);
        }}
        aria-label="Skip splash transition"
      >
        SKIP [ESC]
      </button>
    </div>
  );
};
