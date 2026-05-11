import React, { useEffect, useState } from "react";
import "./ScrollProgress.css";
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} aria-hidden />;
}
