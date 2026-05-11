import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef();

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    const addHover = () => {
      document.querySelectorAll("a,button,.btn,.service-card,.pricing-card,.showcase__card").forEach(el => {
        el.addEventListener("mouseenter", () => ringRef.current?.classList.add("cursor-ring--hover"));
        el.addEventListener("mouseleave", () => ringRef.current?.classList.remove("cursor-ring--hover"));
      });
    };
    setTimeout(addHover, 2500);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
