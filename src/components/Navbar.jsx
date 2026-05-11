import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

const links = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work",         href: "#work" },
  { label: "Process",      href: "#process" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      className={`navbar${scrolled ? " navbar--scrolled" : ""} navbar--dark`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
    >
      <a href="#hero" className="navbar__logo" onClick={e => handleNav(e, "#hero")}>NOVA FORGE</a>
      <nav className={`navbar__nav${open ? " navbar__nav--open" : ""}`} aria-label="Main navigation">
        {links.map(l => (
          <a key={l.label} href={l.href} className="navbar__link"
            onClick={e => handleNav(e, l.href)}>{l.label}</a>
        ))}
        <a href="#contact" className="navbar__cta" onClick={e => handleNav(e, "#contact")}>Start Project</a>
      </nav>
      <div className="navbar__right">
        <button className="navbar__burger" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </motion.header>
  );
}
