import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import Toast from './Toast';
import './Contact.css';

const SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID   || 'service_cs1ej4v';
const TEMPLATE_ID  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID  || 'template_ikk3l4o';
const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY   || '9TGOfg-yo4r5dTlQs';
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY  || '6LeAKeYsAAAAAOdTrYKq__m5M8I21R0gDWLd655p';

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
  const captchaRef = useRef();
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

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
    setTouched({ name: true, email: true, message: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (!captchaToken) {
      setToast({ message: 'Please complete the reCAPTCHA.', type: 'error' });
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: fields.name,
          message: fields.message,
          time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          reply_to: fields.email,
          'g-recaptcha-response': captchaToken,
        },
        PUBLIC_KEY
      );
      setToast({ message: 'I will get back to you soon.', type: 'success' });
      setFields({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setToast({ message: err?.text || 'Could not send. Please try again later.', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Let's Build Something <span className="grad">Amazing</span></h2>
          <p className="section-sub">Fill the form below and I'll get back to you ASAP.</p>
        </div>
        <form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__row">
            <div className={`contact__field${errors.name ? ' contact__field--error' : ''}`}>
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" placeholder="Your name"
                value={fields.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>
            <div className={`contact__field${errors.email ? ' contact__field--error' : ''}`}>
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" placeholder="you@email.com"
                value={fields.email} onChange={handleChange} onBlur={handleBlur} />
              {errors.email && <span className="contact__error">{errors.email}</span>}
            </div>
          </div>
          <div className={`contact__field${errors.message ? ' contact__field--error' : ''}`}>
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" rows={5}
              placeholder="Tell me about your project..."
              value={fields.message} onChange={handleChange} onBlur={handleBlur} />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </div>
          <div className="contact__captcha">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={RECAPTCHA_KEY}
              theme="dark"
              onChange={token => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>
          <button type="submit" className="btn btn--primary contact__submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </section>
  );
}
