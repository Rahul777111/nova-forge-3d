import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('nf-theme') || 'dark'; }
    catch { return 'dark'; }
  });
  const [animating, setAnimating] = useState(false);
  const [curtainColor, setCurtainColor] = useState('#f0f4ff');
  const nextThemeRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('nf-theme', theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    nextThemeRef.current = next;
    setCurtainColor(next === 'light' ? '#f0f4ff' : '#020408');
    setAnimating(true);
  }, [theme]);

  // Called by curtain when halfway through — switch theme at peak
  const onCurtainPeak = useCallback(() => {
    setTheme(nextThemeRef.current);
  }, []);

  const onCurtainDone = useCallback(() => {
    setAnimating(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, animating, curtainColor, onCurtainPeak, onCurtainDone }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
