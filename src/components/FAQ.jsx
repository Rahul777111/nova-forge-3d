import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.css";

const faqs = [
  { q: "How long does a typical AI project take?",
    a: "Most projects run in 6-16 weeks depending on scope. We use a phased approach: 2 weeks of discovery and architecture, followed by iterative 2-week engineering sprints, then a hardening and deployment phase. You have a working prototype within the first month." },
  { q: "Do we need to have our own data?",
    a: "Not always. For some use cases we can leverage foundation models with minimal fine-tuning. Where proprietary data is needed, we help you design the collection and labeling pipeline as part of the engagement." },
  { q: "How do you handle data privacy and security?",
    a: "All client data is processed under NDA. We support on-premise, private cloud, and VPC deployments. For regulated industries (health, finance) we follow HIPAA, SOC 2, and GDPR guidelines as required." },
  { q: "What does engagement with Nova Forge look like?",
    a: "We start with a paid 2-week discovery sprint to validate feasibility and scope. This de-risks the full engagement for both parties. After that, we move to a fixed-scope or retainer model depending on your needs." },
  { q: "Can you work with our existing engineering team?",
    a: "Yes - embedded collaboration is one of our most common engagement models. We can work alongside your team, transfer knowledge, and ensure internal capability-building so you are not dependent on us forever." },
  { q: "What industries do you specialize in?",
    a: "We have shipped AI systems in healthcare, logistics, fintech, retail, and SaaS. The common thread is data-rich operations where AI can automate decisions, surface insights, or personalize experiences at scale." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq">
      <div className="faq__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Common<br /><span className="grad">Questions</span></h2>
        </motion.div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <motion.div key={i} className={`faq__item${open === i ? " faq__item--open" : ""}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}>
              <button className="faq__q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className="faq__chevron">{open === i ? "-" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div className="faq__a"
                    key="a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
