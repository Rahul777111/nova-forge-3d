import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Toast from "./Toast";
import "./Contact.css";

// Replace these with your real EmailJS keys when ready
const SERVICE_ID  = "service_novaforge";
const TEMPLATE_ID = "template_contact";
const PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [fields, setFields] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setToast({ message: "Message sent! We will be in touch within 24 hours.", type: "success" });
      setFields({ name: "", email: "", company: "", message: "" });
    } catch {
      setToast({ message: "Could not send. Please email us directly at hello@novaforge.ai", type: "error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <motion.div className="section-header"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Ready to Build<br /><span className="grad">Something Intelligent?</span></h2>
          <p className="section-sub">Tell us about your project. We respond within 24 hours.</p>
        </motion.div>
        <motion.form ref={formRef} className="contact__form" onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" required placeholder="Your name"
                value={fields.name} onChange={handleChange} />
            </div>
            <div className="contact__field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com"
                value={fields.email} onChange={handleChange} />
            </div>
          </div>
          <div className="contact__field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" placeholder="Your company"
              value={fields.company} onChange={handleChange} />
          </div>
          <div className="contact__field">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" rows={5} required
              placeholder="Tell us about your project, timeline, and goals..."
              value={fields.message} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn--primary contact__submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </section>
  );
}
