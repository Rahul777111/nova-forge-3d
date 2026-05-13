import React, { useState } from "react";
import PolicyModal from "./PolicyModal";
import ResumeModal from "./ResumeModal";
import "./Footer.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const [policy, setPolicy] = useState(null);
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <button className="footer__logo" onClick={() => scrollTo("#hero")}>NOVA FORGE</button>
              <p className="footer__tagline">Engineering the intelligence that shapes tomorrow.</p>
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <h4>Studio</h4>
                <button onClick={() => scrollTo("#capabilities")}>Capabilities</button>
                <button onClick={() => scrollTo("#work")}>Work</button>
                <button onClick={() => scrollTo("#process")}>Process</button>
                <button onClick={() => scrollTo("#pricing")}>Pricing</button>
              </div>
              <div className="footer__col">
                <h4>Products</h4>
                <button onClick={() => scrollTo("#work")}>Forge Core</button>
                <button onClick={() => scrollTo("#work")}>Nova Lens</button>
                <button onClick={() => scrollTo("#work")}>Echo Mind</button>
              </div>
              <div className="footer__col">
                <h4>Connect</h4>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                <button onClick={() => scrollTo("#contact")}>hello@novaforge.ai</button>
                <button onClick={() => setShowResume(true)}>Resume</button>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>&copy; 2026 Nova Forge. All rights reserved.</span>
            <div className="footer__legal">
              <button onClick={() => setPolicy("privacy")}>Privacy Policy</button>
              <button onClick={() => setPolicy("terms")}>Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>
      {policy && <PolicyModal type={policy} onClose={() => setPolicy(null)} />}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}