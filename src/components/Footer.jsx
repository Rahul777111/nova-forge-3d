import React, { useState } from "react";
import ResumeModal from "./ResumeModal";
import "./Footer.css";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <button className="footer__logo" onClick={() => scrollTo("#hero")}>D L Narayana</button>
              <p className="footer__tagline">Building things for the web, one commit at a time.</p>
            </div>
            <div className="footer__links">
              <div className="footer__col">
                <h4>Navigate</h4>
                <button onClick={() => scrollTo("#about")}>About</button>
                <button onClick={() => scrollTo("#projects")}>Projects</button>
                <button onClick={() => scrollTo("#techstack")}>Tech Stack</button>
                <button onClick={() => scrollTo("#contact")}>Contact</button>
              </div>
              <div className="footer__col">
                <h4>Connect</h4>
                <a href="https://github.com/Rahul777111" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                <button onClick={() => setShowResume(true)}>Resume</button>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>&copy; 2026 D L Narayana. All rights reserved.</span>
          </div>
        </div>
      </footer>
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}
