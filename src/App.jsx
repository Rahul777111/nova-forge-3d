import React, { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { useAppStore } from './store/appStore';
import SEO            from './components/SEO';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import LoadingScreen  from './components/LoadingScreen';
import CustomCursor   from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CookieBanner   from './components/CookieBanner';
import ShaderBackground from './components/ShaderBackground';
import ScrollJourney  from './components/ScrollJourney';
import BgBot          from './components/BgBot';
import CursorBot      from './components/CursorBot';
import SkeletonLoader from './components/SkeletonLoader';
// import RibbonCursor from './components/RibbonCursor'; // disabled - smoke cursor active
import './App.css';

const ScrollTicker    = lazy(() => import('./components/ScrollTicker'));
const StatsBar        = lazy(() => import('./components/StatsBar'));
const About           = lazy(() => import('./components/About'));
const Projects        = lazy(() => import('./components/Projects'));
const ProductShowcase = lazy(() => import('./components/ProductShowcase'));
const Services        = lazy(() => import('./components/Services'));
const TechStack       = lazy(() => import('./components/TechStack'));
const CaseStudies     = lazy(() => import('./components/CaseStudies'));
const Testimonials    = lazy(() => import('./components/Testimonials'));
const Process         = lazy(() => import('./components/Process'));
const Team            = lazy(() => import('./components/Team'));
const BlogTeaser      = lazy(() => import('./components/BlogTeaser'));
const FAQ             = lazy(() => import('./components/FAQ'));
const Pricing         = lazy(() => import('./components/Pricing'));
const Contact         = lazy(() => import('./components/Contact'));
const Footer          = lazy(() => import('./components/Footer'));
const ParticleGalaxy  = lazy(() => import('./components/ParticleGalaxy'));
const ParticleMorph   = lazy(() => import('./components/ParticleMorph'));

const SectionSkeleton = () => <SkeletonLoader height="300px" borderRadius="0" />;

function AppInner() {
  const { appLoaded, setAppLoaded } = useAppStore();

  useEffect(() => {
    if (document.readyState === 'complete') {
      const t = setTimeout(setAppLoaded, 400);
      return () => clearTimeout(t);
    }
    const handler = () => { setTimeout(setAppLoaded, 400); };
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [setAppLoaded]);

  return (
    <>
      <SEO />
      <ShaderBackground />
      <ScrollJourney />
      <ScrollProgress />
      <CustomCursor />
      {/* <RibbonCursor /> - disabled */}
      <CookieBanner />
      <BgBot />
      <CursorBot />
      {!appLoaded && <LoadingScreen />}
      <div className={`app ${appLoaded ? 'app--visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<SectionSkeleton />}>
            <StatsBar />
            <ScrollTicker />
            <About />
            <Projects />
            <ProductShowcase />
            <Services />
            <TechStack />
            <ParticleGalaxy />
            <ParticleMorph />
            <CaseStudies />
            <Testimonials />
            <Process />
            <Team />
            <BlogTeaser />
            <FAQ />
            <Pricing />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<SectionSkeleton />}><Footer /></Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </HelmetProvider>
  );
}
