import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafRef  = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    // Hide native cursor site-wide
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        hovering.current = true;
        dot.classList.add('cursor-dot--hover');
        ringEl.classList.add('cursor-ring--hover');
      }
    };
    const onLeave = () => {
      hovering.current = false;
      dot.classList.remove('cursor-dot--hover');
      ringEl.classList.remove('cursor-ring--hover');
    };

    const onDown  = () => { dot.classList.add('cursor-dot--click'); ringEl.classList.add('cursor-ring--click'); };
    const onUp    = () => { dot.classList.remove('cursor-dot--click'); ringEl.classList.remove('cursor-ring--click'); };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    // Smooth lagging ring
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
