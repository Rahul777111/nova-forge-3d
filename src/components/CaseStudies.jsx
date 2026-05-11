import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./CaseStudies.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CountUp({ target, suffix = "" }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { label: "Products Shipped",   value: 47,  suffix: "+" },
  { label: "Enterprise Clients", value: 28,  suffix: "" },
  { label: "Avg. ROI Delivered", value: 340, suffix: "%" },
  { label: "Team Specialists",   value: 62,  suffix: "" },
];

const cases = [
  {
    client: "Meridian Health", category: "Healthcare AI",
    headline: "Reduced diagnostic turnaround by 78% with AI-assisted imaging analysis",
    metrics: ["78% faster diagnosis", "$4.2M annual savings", "ISO 13485 certified"],
    accent: "#4f8ef7",
  },
  {
    client: "Vantage Logistics", category: "Supply Chain Intelligence",
    headline: "Deployed predictive routing engine that cut fleet costs by $12M annually",
    metrics: ["34% fuel reduction", "99.1% on-time rate", "Deployed in 6 weeks"],
    accent: "#a259ff",
  },
  {
    client: "Oculon Finance", category: "Risk & Compliance AI",
    headline: "Real-time fraud detection system processing 2.4M transactions per second",
    metrics: ["0.003% false positive", "2.4M TPS throughput", "SOC 2 Type II"],
    accent: "#e8b86d",
  },
];

export default function CaseStudies() {
  return (
    <section id="casestudies" className="casestudies">
      <div className="casestudies__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Proven Impact</span>
          <h2 className="section-title">Results That<br /><span className="grad">Speak for Themselves</span></h2>
        </motion.div>
        <div className="casestudies__stats">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-block"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}>
              <div className="stat-block__num"><CountUp target={s.value} suffix={s.suffix} /></div>
              <div className="stat-block__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="casestudies__list">
          {cases.map((c, i) => (
            <motion.article key={c.client} className="case-card" style={{ "--accent": c.accent }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }} viewport={{ once: true }}>
              <div className="case-card__left">
                <span className="case-card__category">{c.category}</span>
                <h3 className="case-card__client">{c.client}</h3>
                <p className="case-card__headline">{c.headline}</p>
                <button className="case-card__btn" onClick={() => scrollTo("#contact")}>
                  Discuss a Similar Project &rarr;
                </button>
              </div>
              <div className="case-card__metrics">
                {c.metrics.map(m => (
                  <div key={m} className="case-card__metric">
                    <span className="case-card__metric-dot" />{m}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
