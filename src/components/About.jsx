import React from 'react';
import './About.css';

const SKILLS = ['React', 'Three.js', 'Node.js', 'JavaScript', 'TypeScript', 'Vite', 'GSAP', 'WebGL', 'MongoDB', 'Tailwind CSS', 'Git', 'Figma'];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__avatar-wrap">
          <div className="about__avatar">👨‍💻</div>
        </div>
        <div className="about__content">
          <h2 className="about__title">About <span>Me</span></h2>
          <p className="about__bio">
            Hey! I am Rahul, a passionate full-stack developer and 3D web enthusiast from India.
            I love building visually stunning, high-performance web experiences using React, Three.js, and modern web technologies.
            I thrive at the intersection of design and engineering — turning bold ideas into pixel-perfect, interactive realities.
          </p>
          <p className="about__skills-title">Tech I work with</p>
          <div className="about__skills">
            {SKILLS.map(s => <span key={s} className="about__skill">{s}</span>)}
          </div>
          <div className="about__actions">
            <a
              href="/resume.pdf"
              download="Rahul_Resume.pdf"
              className="about__btn about__btn--primary"
            >
              Download Resume
            </a>
            <a href="#contact" className="about__btn about__btn--outline">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}