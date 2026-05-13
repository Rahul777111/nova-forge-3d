import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const SEGMENTS = 24;       // chain points
const SEG_LEN  = 6;        // px per segment (~144px total ~ 5cm on screen)
const DAMPING  = 0.55;     // velocity retention (0=dead, 1=no friction)
const STIFFNESS = 0.38;    // how hard each segment pulls toward target

export default function RibbonCursor() {
  const canvasRef = useRef(null);
  const isMobile  = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Chain: each point has position + previous position (verlet)
    const pts = Array.from({ length: SEGMENTS }, () => ({
      x: window.innerWidth  / 2,
      y: window.innerHeight / 2,
      ox: window.innerWidth  / 2,
      oy: window.innerHeight / 2,
    }));

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let visible = true;

    const onMove  = e => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let rafId;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible) { rafId = requestAnimationFrame(tick); return; }

      // --- physics update ---
      // Head snaps to cursor
      pts[0].x = mx;
      pts[0].y = my;

      for (let i = 1; i < SEGMENTS; i++) {
        const p    = pts[i];
        const prev = pts[i - 1];

        // verlet velocity
        const vx = (p.x - p.ox) * DAMPING;
        const vy = (p.y - p.oy) * DAMPING;

        p.ox = p.x;
        p.oy = p.y;

        // spring toward previous point with fixed distance
        const dx   = prev.x - p.x;
        const dy   = prev.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        const diff = (dist - SEG_LEN) / dist;

        p.x += vx + dx * diff * STIFFNESS;
        p.y += vy + dy * diff * STIFFNESS;
      }

      // --- draw ribbon as tapered filled shape ---
      if (SEGMENTS < 2) { rafId = requestAnimationFrame(tick); return; }

      // Build left & right edges
      const left  = [];
      const right = [];

      for (let i = 0; i < SEGMENTS; i++) {
        const t     = i / (SEGMENTS - 1);           // 0 = head, 1 = tail
        const width = 4 * (1 - t) + 0.3;           // taper 4px -> 0.3px

        let nx, ny;
        if (i < SEGMENTS - 1) {
          nx = pts[i + 1].y - pts[i].y;
          ny = pts[i].x     - pts[i + 1].x;
        } else {
          nx = pts[i].y - pts[i - 1].y;
          ny = pts[i - 1].x - pts[i].x;
        }
        const len = Math.sqrt(nx * nx + ny * ny) || 1;
        nx /= len;
        ny /= len;

        left.push ({ x: pts[i].x + nx * width, y: pts[i].y + ny * width });
        right.push({ x: pts[i].x - nx * width, y: pts[i].y - ny * width });
      }

      // Gradient: head = bright blue-purple, tail = transparent
      const grad = ctx.createLinearGradient(
        pts[0].x, pts[0].y,
        pts[SEGMENTS - 1].x, pts[SEGMENTS - 1].y
      );
      grad.addColorStop(0,    'rgba(162, 89, 255, 0.92)');
      grad.addColorStop(0.35, 'rgba(79, 142, 247, 0.70)');
      grad.addColorStop(1,    'rgba(79, 142, 247, 0.00)');

      ctx.beginPath();
      ctx.moveTo(left[0].x, left[0].y);
      for (let i = 1; i < left.length; i++) {
        const cp = left[i - 1];
        ctx.quadraticCurveTo(cp.x, cp.y, (cp.x + left[i].x) / 2, (cp.y + left[i].y) / 2);
      }
      // right side reversed
      for (let i = right.length - 1; i >= 1; i--) {
        const cp = right[i];
        ctx.quadraticCurveTo(cp.x, cp.y, (cp.x + right[i - 1].x) / 2, (cp.y + right[i - 1].y) / 2);
      }
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(162, 89, 255, 0.5)';
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 99997,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
