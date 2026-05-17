import React from "react";
import { motion } from "framer-motion";
import "./ScrollTicker.css";

const items = [
  "React", "Node.js", "TypeScript", "Three.js",
  "WebGL", "MongoDB", "Tailwind CSS", "Vite",
  "Python", "REST APIs", "GSAP", "Git",
];

export default function ScrollTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker__track">
        <motion.div
          className="ticker__inner"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="ticker__item">
              {item}
              <span className="ticker__sep">*</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
