import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1, emoji: '🌌', title: 'Nova Forge 3D', category: 'React',
    desc: 'A cutting-edge 3D portfolio with ParticleMorph, GPU shaders, custom cursor, and full dark/light theming.',
    tags: ['React', 'Three.js', 'Vite', 'Zustand'],
    live: 'https://nova-forge-3d.vercel.app', code: 'https://github.com/Rahul777111/nova-forge-3d'
  },
  {
    id: 2, emoji: '⚡', title: 'AI Dashboard', category: 'React',
    desc: 'Real-time analytics dashboard with AI-powered insights, chart animations, and responsive dark UI.',
    tags: ['React', 'Chart.js', 'Node.js'],
    live: '#', code: '#'
  },
  {
    id: 3, emoji: '🎮', title: '3D Game Scene', category: 'Three.js',
    desc: 'Interactive 3D game environment built with Three.js featuring physics, lighting, and GSAP animations.',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    live: '#', code: '#'
  },
  {
    id: 4, emoji: '🛒', title: 'E-Commerce Store', category: 'Full Stack',
    desc: 'Full-stack e-commerce platform with cart, Stripe payments, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    live: '#', code: '#'
  },
  {
    id: 5, emoji: '🤖', title: 'Chatbot UI', category: 'React',
    desc: 'Sleek AI chatbot interface with streaming responses, markdown support, and voice input.',
    tags: ['React', 'OpenAI API', 'WebSockets'],
    live: '#', code: '#'
  },
  {
    id: 6, emoji: '🎨', title: 'Design System', category: 'Three.js',
    desc: 'Component library with 50+ accessible UI components, Storybook docs, and theme engine.',
    tags: ['React', 'Storybook', 'CSS Modules'],
    live: '#', code: '#'
  },
];

const FILTERS = ['All', 'React', 'Three.js', 'Full Stack'];

export default function Projects() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section className="projects" id="projects">
      <h2 className="projects__title">My Projects</h2>
      <p className="projects__sub">Things I have built — from 3D visuals to full-stack apps.</p>
      <div className="projects__filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`projects__filter-btn ${active === f ? 'projects__filter-btn--active' : ''}`}
            onClick={() => setActive(f)}
          >{f}</button>
        ))}
      </div>
      <div className="projects__grid">
        {filtered.map(p => (
          <div className="project-card" key={p.id}>
            <div className="project-card__img">{p.emoji}</div>
            <div className="project-card__body">
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__tags">
                {p.tags.map(t => <span key={t} className="project-card__tag">{t}</span>)}
              </div>
              <div className="project-card__links">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-card__link">Live</a>
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-card__link">Code</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}