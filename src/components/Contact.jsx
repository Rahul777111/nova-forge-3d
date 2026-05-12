import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import Toast from './Toast';
import './Contact.css';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_cs1ej4v';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '9TGOfg-yo4r5dTlQs';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required';
  if (!fields.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!fields.message.trim()) {
    errors.message = 'Message is required';
  } else if (fields.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  }
  return errors;
}

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [fields, setFields] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setToast({ message: 'Message sent! We will be in touch within 24 hours.', type: 'success' });
      setFields({ name: '', email: '', company: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      setToast({ message: 'Could not send. Please email us at hello@novaforge.ai', type: 'error' });
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
        <motion.form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div className="contact__row">
            <div className={`contact__field${errors.name ? ' contact__field--error' : ''}`}>
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" placeholder="Your name"
                value={fields.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>
            <div className={`contact__field${errors.email ? ' contact__field--error' : ''}`}>
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" placeholder="you@company.com"
                value={fields.email} onChange={handleChange} onBlur={handleBlur} />
              {errors.email && <span className="contact__error">{errors.email}</span>}
            </div>
          </div>
          <div className="contact__field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" placeholder="Your company"
              value={fields.company} onChange={handleChange} />
          </div>
          <div className={`contact__field${errors.message ? ' contact__field--error' : ''}`}>
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" rows={5}
              placeholder="Tell us about your project, timeline, and goals..."
              value={fields.message} onChange={handleChange} onBlur={handleBlur} />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </div>
          <button type="submit" className="btn btn--primary contact__submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </section>
  );
}
