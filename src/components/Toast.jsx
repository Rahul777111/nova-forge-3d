import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

export default function Toast({ message, type = 'success', onDone }) {
  const [progress, setProgress] = useState(100);
  const duration = 4000;

  useEffect(() => {
    const t = setTimeout(onDone, duration);
    const interval = setInterval(() => {
      setProgress(p => Math.max(0, p - (100 / (duration / 50))));
    }, 50);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, [onDone]);

  const icons = {
    success: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12l3 3 5-5"/>
      </svg>
    ),
    error: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
    ),
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`toast toast--${type}`}
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <div className="toast__icon-wrap">
            {icons[type]}
          </div>
          <div className="toast__body">
            <p className="toast__title">{type === 'success' ? 'Message Sent!' : 'Failed to Send'}</p>
            <p className="toast__msg">{message}</p>
          </div>
          <button className="toast__close" onClick={onDone}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <div className="toast__progress">
            <div className="toast__progress-bar" style={{ width: progress + '%' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
