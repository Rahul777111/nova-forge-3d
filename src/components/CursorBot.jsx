import React, { useEffect, useRef, useState } from "react";
import "./CursorBot.css";

// AI tooltip that follows cursor and shows context-aware hints
// Activates on hover of data-hint elements
export default function CursorBot() {
  const ref = useRef();
  const [hint, setHint]       = useState("");
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef();

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      // Check for data-hint attribute on hovered element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hintEl = el?.closest("[data-hint]");
      if (hintEl) {
        setHint(hintEl.dataset.hint);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (ref.current) {
        ref.current.style.transform =
          `translate(${cur.current.x + 16}px, ${cur.current.y + 16}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!hint && !visible) return null;

  return (
    <div
      ref={ref}
      className={`cursor-bot${visible && hint ? " cursor-bot--visible" : ""}`}
      aria-hidden="true"
    >
      <span className="cursor-bot__dot" />
      <span className="cursor-bot__text">{hint}</span>
    </div>
  );
}
