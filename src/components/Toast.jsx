import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Toast.css";
export default function Toast({ message, type = "success", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`toast toast--${type}`}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
        >
          <span className="toast__icon">{type === "success" ? "OK" : "!"}</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
