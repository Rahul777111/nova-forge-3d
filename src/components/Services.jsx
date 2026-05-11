import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import GlitchText from "./GlitchText";
import "./Services.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const services = [
  { icon: "01", title: "AI Strategy & Architecture",  desc: "We audit your data landscape, define the AI opportunity map, and architect a production-ready intelligent system blueprint." },
  { icon: "02", title: "Model Design & Training",      desc: "Custom model development from foundation to fine-tuning. Optimized for your domain, data, and latency requirements." },
  { icon: "03", title: "Product Engineering",          desc: "End-to-end engineering of AI-native products - from interface to inference pipeline - built for real-world deployment." },
  { icon: "04", title: "MLOps & Infrastructure",       desc: "CI/CD for ML. Auto-scaling inference clusters, model versioning, drift detection, and observability dashboards." },
  { icon: "05", title: "AI Interface Design",          desc: "Human-centered design for AI products. Interaction patterns, explainability layers, and trust-building UX systems." },
  { icon: "06", title: "Integration & Scale",          desc: "Seamlessly plug intelligence into your existing stack. ERP, CRM, or custom systems - we bridge the gap to scale." },
];

export default function Services() {
  return (
    <section id="capabilities" className="services">
      <div className="services__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">
            <GlitchText text="Full-Stack AI" tag="span" /><br />
            <span className="grad"><GlitchText text="Delivered End-to-End" tag="span" delay={400} /></span>
          </h2>
          <p className="section-sub">From whiteboard to production - we own every layer of the intelligence stack.</p>
        </motion.div>
        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div key={s.title} className="service-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }} viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <MagneticButton onClick={() => scrollTo("#contact")} className="service-card__mag">
                Discuss this &rarr;
              </MagneticButton>
              <div className="service-card__corner" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
