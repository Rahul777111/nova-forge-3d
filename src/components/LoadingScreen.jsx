import React from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loading__orb" />
      <motion.div
        className="loading__logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        NOVA FORGE
      </motion.div>
      <div className="loading__bar">
        <motion.div
          className="loading__bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
