// Common GSAP ScrollTrigger animation presets
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(el, delay = 0) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    }
  );
}

export function staggerChildren(parent, selector = '[data-animate]', delay = 0.1) {
  return gsap.fromTo(
    parent.querySelectorAll(selector),
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.6, stagger: delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: parent, start: 'top 80%' },
    }
  );
}
