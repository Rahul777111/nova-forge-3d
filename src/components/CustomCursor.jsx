import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';
import { useIsMobile } from '../hooks/useIsMobile';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    let rafId;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const loop = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    document.querySelectorAll('a, button, .btn').forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.querySelectorAll('a, button, .btn').forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hidden ? 'cursor--hidden' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? 'cursor-ring--hover' : ''} ${hidden ? 'cursor--hidden' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
