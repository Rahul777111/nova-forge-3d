import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BlogTeaser.css";

const posts = [
  {
    tag: "AI Strategy",
    title: "Why Most Enterprise AI Projects Fail Before They Start",
    excerpt: "The problem is rarely the model. It is the absence of a coherent data strategy and a misaligned definition of success.",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=90&auto=format&fit=crop",
    body: "Most organizations invest heavily in AI tooling but underinvest in data governance, problem framing, and success metrics. Before a single model is trained, teams should define the business outcome they are optimizing for, audit data quality and accessibility, and establish a feedback loop between AI predictions and business decisions. Without this foundation, even the most sophisticated model will fail to generate real value.",
  },
  {
    tag: "Engineering",
    title: "The Architecture Behind Sub-10ms AI Inference at Scale",
    excerpt: "How we designed a distributed inference system that serves 50M predictions per day without breaking latency SLAs.",
    read: "9 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=90&auto=format&fit=crop",
    body: "Achieving sub-10ms inference requires co-designing the model architecture and the serving infrastructure. We use quantized ONNX models served via Triton Inference Server, with aggressive request batching, GPU memory pre-allocation, and a custom load balancer that routes requests based on real-time queue depth. Horizontal auto-scaling handles burst traffic, while a warm standby pool eliminates cold starts.",
  },
  {
    tag: "Design",
    title: "Designing Trust: UX Patterns for Explainable AI Products",
    excerpt: "Users will not adopt AI they cannot understand. Here is how we build confidence through interface design.",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&auto=format&fit=crop",
    body: "Trust in AI is built through transparency, consistency, and graceful handling of uncertainty. We apply three core patterns: confidence indicators that show the model certainty level, explanation surfaces that surface the top contributing factors for any prediction, and fallback affordances that let users override or escalate decisions. These patterns reduce anxiety and increase adoption across every user segment.",
  },
];

export default function BlogTeaser() {
  const [active, setActive] = useState(null);

  return (
    <section className="blog">
      <div className="blog__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Insights</span>
          <h2 className="section-title">From the<br /><span className="grad">Nova Forge Lab</span></h2>
          <p className="section-sub">Thinking on AI product development, engineering, and the future of intelligent systems.</p>
        </motion.div>

        <div className="blog__grid">
          {posts.map((p, i) => (
            <motion.article key={p.title} className="blog-card"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }} viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <div className="blog-card__thumb">
                <img
                  src={p.image}
                  alt={p.title}
                  className="blog-card__img"
                  loading="lazy"
                  decoding="async"
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div className="blog-card__img-overlay" />
                <span className="blog-card__tag-over">{p.tag}</span>
              </div>
              <div className="blog-card__body">
                <h3 className="blog-card__title">{p.title}</h3>
                <p className="blog-card__excerpt">{p.excerpt}</p>
                <div className="blog-card__footer">
                  <span className="blog-card__read">{p.read}</span>
                  <button className="blog-card__arrow" onClick={() => setActive(p)}>Read more &rarr;</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="blog-modal__overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}>
            <motion.div className="blog-modal"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              onClick={e => e.stopPropagation()}>
              <div className="blog-modal__thumb">
                <img src={active.image} alt={active.title} className="blog-modal__img" />
                <div className="blog-card__img-overlay" />
                <span className="blog-card__tag-over">{active.tag}</span>
              </div>
              <div className="blog-modal__body">
                <h2 className="blog-modal__title">{active.title}</h2>
                <p className="blog-modal__read">{active.read}</p>
                <p className="blog-modal__text">{active.body}</p>
                <button className="blog-modal__close" onClick={() => setActive(null)}>Close &times;</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
