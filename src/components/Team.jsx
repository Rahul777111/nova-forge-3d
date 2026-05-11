import React from "react";
import { motion } from "framer-motion";
import "./Team.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const team = [
  { name: "Zara Voss",      role: "Founder & Chief AI Architect",  focus: "ML Systems, Strategy",     initial: "ZV", color: "#4f8ef7" },
  { name: "Marcus Lin",    role: "Head of Product Engineering",   focus: "Full-stack, DevOps",         initial: "ML", color: "#a259ff" },
  { name: "Asha Renner",   role: "Principal ML Engineer",         focus: "NLP, Vision Models",         initial: "AR", color: "#e8b86d" },
  { name: "Theo Nakamura", role: "Creative Director",             focus: "AI UX, Interaction Design",  initial: "TN", color: "#4fc7a0" },
];

export default function Team() {
  return (
    <section className="team">
      <div className="team__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">The People</span>
          <h2 className="section-title">Small Team.<br /><span className="grad">Outsized Impact.</span></h2>
          <p className="section-sub">A tight-knit squad of AI engineers, designers, and strategists who have shipped intelligence at scale.</p>
        </motion.div>
        <div className="team__grid">
          {team.map((m, i) => (
            <motion.div key={m.name} className="team-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }} viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}>
              <div className="team-card__avatar" style={{ "--color": m.color }}>
                {m.initial}
                <div className="team-card__glow" style={{ background: m.color }} />
              </div>
              <h3 className="team-card__name">{m.name}</h3>
              <div className="team-card__role">{m.role}</div>
              <div className="team-card__focus">{m.focus}</div>
              <button className="team-card__btn" onClick={() => scrollTo("#contact")}>Get in Touch</button>
            </motion.div>
          ))}
        </div>
        <motion.div className="team__cta"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <button className="btn btn--ghost" onClick={() => scrollTo("#contact")}>Work With Our Team</button>
        </motion.div>
      </div>
    </section>
  );
}
