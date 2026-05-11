import React from "react";
import { motion } from "framer-motion";
import "./ScrollTicker.css";

const items = [
  "AI Strategy", "Model Engineering", "MLOps", "Computer Vision",
  "NLP Systems", "Product Design", "Inference Pipelines", "Data Architecture",
  "LLM Fine-tuning", "Edge AI", "Real-time Analytics", "AI Security",
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
