import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonials.css";

const testimonials = [
  {
    quote: "Nova Forge did not just build us an AI product. They fundamentally changed how we think about intelligence in our platform. The team is exceptional.",
    name: "Sarah Okonkwo",
    role: "Chief Product Officer",
    company: "Meridian Health",
    initial: "S",
  },
  {
    quote: "In eight weeks, they delivered a routing intelligence engine that our internal team estimated would take two years. The ROI speaks for itself.",
    name: "Daniel Park",
    role: "VP Engineering",
    company: "Vantage Logistics",
    initial: "D",
  },
  {
    quote: "What sets Nova Forge apart is their ability to translate abstract AI capability into concrete product value. They think in outcomes, not features.",
    name: "Priya Nair",
    role: "Head of Innovation",
    company: "Oculon Finance",
    initial: "P",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Client Voice</span>
          <h2 className="section-title">Trusted by Teams<br /><span className="grad">Building the Future</span></h2>
        </motion.div>
        <div className="testimonials__card">
          <div className="testimonials__quotes">&#8220;</div>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="testimonials__quote"
            >
              {t.quote}
            </motion.blockquote>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-author"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="testimonials__author"
            >
              <div className="testimonials__avatar">{t.initial}</div>
              <div>
                <div className="testimonials__name">{t.name}</div>
                <div className="testimonials__role">{t.role}, {t.company}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot${i === active ? " testimonials__dot--active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
