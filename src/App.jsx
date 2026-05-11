import React, { useEffect, useState, lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import LoadingScreen   from "./components/LoadingScreen";
import CustomCursor    from "./components/CustomCursor";
import ScrollProgress  from "./components/ScrollProgress";
import CookieBanner    from "./components/CookieBanner";
import ShaderBackground from "./components/ShaderBackground";
import ScrollJourney   from "./components/ScrollJourney";
import BgBot           from "./components/BgBot";
import CursorBot       from "./components/CursorBot";
import "./App.css";

// Lazy-load everything below the fold
const ScrollTicker    = lazy(() => import("./components/ScrollTicker"));
const StatsBar        = lazy(() => import("./components/StatsBar"));
const ProductShowcase = lazy(() => import("./components/ProductShowcase"));
const Services        = lazy(() => import("./components/Services"));
const TechStack       = lazy(() => import("./components/TechStack"));
const CaseStudies     = lazy(() => import("./components/CaseStudies"));
const Testimonials    = lazy(() => import("./components/Testimonials"));
const Process         = lazy(() => import("./components/Process"));
const Team            = lazy(() => import("./components/Team"));
const BlogTeaser      = lazy(() => import("./components/BlogTeaser"));
const FAQ             = lazy(() => import("./components/FAQ"));
const Pricing         = lazy(() => import("./components/Pricing"));
const Contact         = lazy(() => import("./components/Contact"));
const Footer          = lazy(() => import("./components/Footer"));
const ParticleGalaxy  = lazy(() => import("./components/ParticleGalaxy"));
const ParticleMorph   = lazy(() => import("./components/ParticleMorph"));

function AppInner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <ShaderBackground />
      <ScrollJourney />
      <ScrollProgress />
      <CustomCursor />
      <CookieBanner />
      <BgBot />
      <CursorBot />
      {!loaded && <LoadingScreen />}
      <div className={`app ${loaded ? "app--visible" : ""}`}>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <StatsBar />
            <ScrollTicker />
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
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
