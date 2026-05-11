import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PolicyModal from "./PolicyModal";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nf_cookie")) {
      const t = setTimeout(() => setVisible(true), 3500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { localStorage.setItem("nf_cookie", "1"); setVisible(false); };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div className="cookie"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.4 }}>
            <p className="cookie__text">
              We use cookies to improve your experience. By continuing, you agree to our{" "}
              <button className="cookie__link" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>.
            </p>
            <div className="cookie__actions">
              <button className="cookie__decline" onClick={() => setVisible(false)}>Decline</button>
              <button className="cookie__accept" onClick={accept}>Accept All</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showPrivacy && <PolicyModal type="privacy" onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
