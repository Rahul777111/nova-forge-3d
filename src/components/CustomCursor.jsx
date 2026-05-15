import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const PARTICLE_COUNT = 60;
const COLORS = [
  [120, 180, 255],
  [160, 100, 255],
  [80,  200, 255],
  [200, 120, 255],
  [100, 230, 255],
];

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -200, y: -200 });
  const particles = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // spawn 3 particles per move
      for (let i = 0; i < 3; i++) spawnParticle();
    };
    window.addEventListener('mousemove', onMove);

    function spawnParticle() {
      const col   = COLORS[Math.floor(Math.random() * COLORS.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.2;
      particles.current.push({
        x:     mouse.current.x + (Math.random() - 0.5) * 6,
        y:     mouse.current.y + (Math.random() - 0.5) * 6,
        vx:    Math.cos(angle) * speed * 0.4,
        vy:    Math.sin(angle) * speed * 0.4 - 0.6,
        life:  1.0,
        decay: Math.random() * 0.018 + 0.012,
        size:  Math.random() * 7 + 3,
        col,
      });
      if (particles.current.length > PARTICLE_COUNT) {
        particles.current.shift();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw glow dot at cursor
      const grd = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 14
      );
      grd.addColorStop(0,   'rgba(150,200,255,0.95)');
      grd.addColorStop(0.3, 'rgba(100,140,255,0.6)');
      grd.addColorStop(1,   'rgba(80,100,255,0)');
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vy   -= 0.015; // float upward
        p.vx   *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) { particles.current.splice(i, 1); continue; }

        const r   = p.size * p.life;
        const gp  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
        const [R, G, B] = p.col;
        gp.addColorStop(0,   `rgba(${R},${G},${B},${p.life * 0.85})`);
        gp.addColorStop(0.5, `rgba(${R},${G},${B},${p.life * 0.3})`);
        gp.addColorStop(1,   `rgba(${R},${G},${B},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = gp;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="smoke-cursor-canvas" />;
}
