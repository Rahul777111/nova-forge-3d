import React from 'react';
import { motion } from 'framer-motion';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="notfound">
      <motion.div
        className="notfound__inner"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">Lost in the void.</h1>
        <p className="notfound__sub">This page doesn't exist in our dimension.</p>
        <a href="/" className="btn btn--primary">Back to Home</a>
      </motion.div>
    </section>
  );
}
