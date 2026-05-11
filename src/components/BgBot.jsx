import React, { useRef, useEffect } from "react";
import "./BgBot.css";

// Ambient floating AI orb that drifts in the bottom-right corner
// Uses pure canvas - no Three.js overhead
export default function BgBot() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const SIZE = 120;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    // Orb particles
    const particles = Array.from({ length: 28 }, (_, i) => ({
      angle: (i / 28) * Math.PI * 2,
      r: 18 + Math.random() * 16,
      speed: 0.008 + Math.random() * 0.012,
      size:  1.2 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, SIZE, SIZE);

      const cx = SIZE / 2;
      const cy = SIZE / 2;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 4, cx, cy, 46);
      outerGlow.addColorStop(0,   "rgba(79,142,247,0.18)");
      outerGlow.addColorStop(0.5, "rgba(162,89,255,0.10)");
      outerGlow.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 46, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Core orb
      const coreGrad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, 22);
      coreGrad.addColorStop(0,   "rgba(180,140,255,0.95)");
      coreGrad.addColorStop(0.45, "rgba(79,142,247,0.85)");
      coreGrad.addColorStop(1,   "rgba(30,10,80,0.6)");
      ctx.beginPath();
      ctx.arc(cx + Math.sin(t * 0.7) * 2, cy + Math.cos(t * 0.5) * 2, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Inner shimmer ring
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(162,89,255,${0.25 + 0.15 * Math.sin(t * 1.8)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbiting particles
      particles.forEach(p => {
        p.angle += p.speed;
        const wobble = Math.sin(t * 1.2 + p.phase) * 4;
        const px = cx + Math.cos(p.angle) * (p.r + wobble);
        const py = cy + Math.sin(p.angle) * (p.r + wobble) * 0.6;
        const alpha = 0.5 + 0.45 * Math.sin(t * 2 + p.phase);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.angle % 1 > 0.5 ? "79,142,247" : "162,89,255"},${alpha})`;
        ctx.fill();
      });

      // Neural pulse lines from center
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + t * 0.3;
        const len = 14 + 8 * Math.sin(t * 1.5 + i);
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(120,180,255,${0.18 + 0.12 * Math.sin(t * 2 + i)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="bgbot" aria-hidden="true">
      <canvas ref={canvasRef} className="bgbot__canvas" />
      <span className="bgbot__label">AI ACTIVE</span>
    </div>
  );
}
