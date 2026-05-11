import React, { useRef, useCallback } from "react";
import "./MagneticButton.css";

export default function MagneticButton({ children, className = "", onClick, strength = 0.4 }) {
  const btnRef = useRef();
  const frameRef = useRef();

  const onMouseMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    const el = btnRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "translate(0px, 0px)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  }, []);

  const onMouseEnter = useCallback(() => {
    const el = btnRef.current;
    if (el) el.style.transition = "transform 0.15s ease";
  }, []);

  return (
    <span className={`mag-wrap ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}>
      <button ref={btnRef} className="mag-btn" onClick={onClick}>
        {children}
        <span className="mag-btn__glow" />
      </button>
    </span>
  );
}
