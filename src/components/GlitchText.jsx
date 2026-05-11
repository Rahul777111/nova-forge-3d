import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import "./GlitchText.css";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function GlitchText({ text, tag: Tag = "span", className = "", delay = 0 }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const el = ref.current;
    if (!el) return;
    const original = text;
    let frame = 0;
    let iter = 0;
    const totalFrames = original.length * 4;
    const id = setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent = original
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iter / 4) return original[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        iter++;
        if (iter > totalFrames) {
          clearInterval(interval);
          el.textContent = original;
        }
      }, 35);
    }, delay);
    return () => clearTimeout(id);
  }, [inView, text, delay]);

  return (
    <Tag ref={ref} className={`glitch-text ${className}`}>
      {text}
    </Tag>
  );
}
