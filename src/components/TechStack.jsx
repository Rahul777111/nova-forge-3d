import React from "react";
import { motion } from "framer-motion";
import "./TechStack.css";

const techs = [
  { name: "PyTorch",     color: "#ee4c2c" },
  { name: "TensorFlow",  color: "#ff6f00" },
  { name: "Kubernetes",  color: "#326ce5" },
  { name: "OpenAI",      color: "#10a37f" },
  { name: "AWS",         color: "#ff9900" },
  { name: "FastAPI",     color: "#009688" },
  { name: "PostgreSQL",  color: "#336791" },
  { name: "ONNX",        color: "#a259ff" },
  { name: "Triton",      color: "#4f8ef7" },
  { name: "Ray",         color: "#028CF0" },
  { name: "dbt",         color: "#ff694a" },
  { name: "Grafana",     color: "#f46800" },
];

export default function TechStack() {
  return (
    <div className="techstack">
      <div className="techstack__inner">
        <p className="techstack__label">Built with the best-in-class stack</p>
        <div className="techstack__grid">
          {techs.map((t, i) => (
            <motion.div key={t.name} className="techstack__item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06 }}
            >
              <span className="techstack__dot" style={{ background: t.color }} />
              {t.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
