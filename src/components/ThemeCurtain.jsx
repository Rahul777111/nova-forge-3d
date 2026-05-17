import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeCurtain.css';

export default function ThemeCurtain() {
  const { animating, curtainColor, onCurtainPeak, onCurtainDone } = useTheme();
  const peakFired = useRef(false);

  useEffect(() => {
    if (!animating) {
      peakFired.current = false;
      return;
    }
    // Fire peak at halfway (300ms into 600ms animation)
    const peakTimer = setTimeout(() => {
      if (!peakFired.current) {
        peakFired.current = true;
        onCurtainPeak();
      }
    }, 300);
    // Fire done after full animation (600ms down + 600ms up = 1200ms)
    const doneTimer = setTimeout(() => {
      onCurtainDone();
    }, 1200);
    return () => {
      clearTimeout(peakTimer);
      clearTimeout(doneTimer);
    };
  }, [animating, onCurtainPeak, onCurtainDone]);

  if (!animating) return null;

  return (
    <div
      className="theme-curtain"
      style={{ background: curtainColor }}
    />
  );
}
