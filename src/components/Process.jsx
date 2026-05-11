import React from "react";
import { motion } from "framer-motion";
import "./Process.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const steps = [
  { n: "01", title: "Discovery Sprint",       desc: "Week-long deep-dive into your business model, data architecture, and competitive landscape. We emerge with a precise problem statement and opportunity brief." },
  { n: "02", title: "Intelligence Blueprint",  desc: "We architect the full AI system: data pipelines, model selection, interface specs, and infrastructure design. Delivered as a production-ready technical specification." },
  { n: "03", title: "Build & Train",           desc: "Agile development sprints. Models trained, tested, and iterated in parallel with product engineering. You see progress every two weeks." },
  { n: "04", title: "Validate & Harden",       desc: "Rigorous evaluation across edge cases, bias audits, performance benchmarks, and security review. Nothing ships without passing our quality gate." },
  { n: "05", title: "Deploy & Scale",          desc: "Production deployment on your infrastructure or ours. Auto-scaling, monitoring, and rollback systems in place from day one." },
  { n: "06", title: "Evolve",                  desc: "Ongoing model performance monitoring, retraining schedules, and continuous improvement. Your AI gets smarter as your business grows." },
];

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="process__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Methodology</span>
          <h2 className="section-title">A Process Built<br /><span className="grad">for Zero Surprises</span></h2>
          <p className="section-sub">Six phases. Ruthless clarity. No scope creep. Every engagement runs on the Nova Forge operating system.</p>
        </motion.div>
        <div className="process__track">
          {steps.map((s, i) => (
            <motion.div key={s.n} className="process__step"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }} viewport={{ once: true }}>
              <div className="process__step-num">{s.n}</div>
              <div className="process__step-body">
                <h3 className="process__step-title">{s.title}</h3>
                <p className="process__step-desc">{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="process__connector" />}
            </motion.div>
          ))}
        </div>
        <motion.div className="process__cta"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }} viewport={{ once: true }}>
          <p>Ready to run the process on your challenge?</p>
          <button className="btn btn--primary" onClick={() => scrollTo("#contact")}>Start Your Project</button>
        </motion.div>
      </div>
    </section>
  );
}
