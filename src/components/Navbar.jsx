import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAppStore } from '../store/appStore';
import './Navbar.css';

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work',         href: '#work' },
  { label: 'Process',      href: '#process' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { activeSection, setActiveSection } = useAppStore();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''));
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [setActiveSection]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!e.target.closest('.navbar')) setOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''} navbar--dark`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.3, duration: 0.8, ease: 'easeOut' }}
    >
      <a href="#hero" className="navbar__logo" onClick={e => handleNav(e, '#hero')}>NOVA FORGE</a>

      <nav className={`navbar__nav${open ? ' navbar__nav--open' : ''}`} aria-label="Main navigation">
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            className={`navbar__link${activeSection === l.href.replace('#','') ? ' navbar__link--active' : ''}`}
            onClick={e => handleNav(e, l.href)}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="navbar__cta" onClick={e => handleNav(e, '#contact')}>Start Project</a>
        <ThemeToggle />
      </nav>

      <div className="navbar__right">
        <ThemeToggle />
        <button
          className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </motion.header>
  );
}
