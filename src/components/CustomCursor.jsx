import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';
import { useIsMobile } from '../hooks/useIsMobile';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    let rafId;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const loop = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hidden ? 'hidden' : ''}`} aria-hidden="true" />
      <div ref={dotRef} className={`custom-cursor-dot ${hidden ? 'hidden' : ''}`} aria-hidden="true" />
    </>
  );
}
