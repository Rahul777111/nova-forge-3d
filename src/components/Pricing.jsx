import React from "react";
import { motion } from "framer-motion";
import "./Pricing.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const tiers = [
  {
    name: "Launchpad", price: "$28K", period: "engagement", tag: null,
    desc: "For teams ready to validate an AI concept and ship a working prototype with production-ready foundations.",
    features: ["Discovery Sprint + Blueprint", "1 Model - design, train, evaluate", "API-ready inference endpoint", "Basic MLOps pipeline", "4-week delivery", "2 revision rounds"],
    cta: "Start Launchpad", accent: "#4f8ef7", highlight: false,
  },
  {
    name: "Ascent", price: "$75K", period: "engagement", tag: "Most Popular",
    desc: "Full-product AI engineering for companies ready to deploy intelligence at the core of their product experience.",
    features: ["Everything in Launchpad", "3 custom models or pipelines", "Full product UI + backend", "Auto-scaling infrastructure", "8-week delivery", "Dedicated engineering pod", "90-day post-launch support"],
    cta: "Start Ascent", accent: "#a259ff", highlight: true,
  },
  {
    name: "Apex", price: "Custom", period: "retainer", tag: "Enterprise",
    desc: "Long-term AI transformation for enterprises requiring embedded expertise, ongoing innovation, and executive partnership.",
    features: ["Dedicated AI team (4-8 specialists)", "Unlimited model development", "Enterprise MLOps + governance", "Board-level reporting & strategy", "SLA-backed uptime guarantee", "Quarterly innovation audits"],
    cta: "Talk to Us", accent: "#e8b86d", highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="pricing__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Engagement Models</span>
          <h2 className="section-title">Transparent Pricing.<br /><span className="grad">Extraordinary Output.</span></h2>
          <p className="section-sub">No retainer traps. No bloated agency teams. Just precise, high-output engagements scoped to your goal.</p>
        </motion.div>
        <div className="pricing__grid">
          {tiers.map((t, i) => (
            <motion.div key={t.name}
              className={`pricing-card${t.highlight ? " pricing-card--highlight" : ""}`}
              style={{ "--accent": t.accent }}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.8 }} viewport={{ once: true }}>
              {t.tag && <div className="pricing-card__badge">{t.tag}</div>}
              <div className="pricing-card__header">
                <div className="pricing-card__name">{t.name}</div>
                <div className="pricing-card__price">
                  {t.price}<span className="pricing-card__period"> / {t.period}</span>
                </div>
                <p className="pricing-card__desc">{t.desc}</p>
              </div>
              <ul className="pricing-card__features">
                {t.features.map(f => (
                  <li key={f}><span className="pricing-card__check">&#10003;</span>{f}</li>
                ))}
              </ul>
              <button className="pricing-card__cta" onClick={() => scrollTo("#contact")}>{t.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
