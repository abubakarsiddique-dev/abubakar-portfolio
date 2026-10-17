import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import Journey from './components/Journey';
import GithubSection from './components/GithubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="portfolio-app">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <ErrorBoundary>
        <main id="main-content" tabIndex="-1" aria-label="Portfolio content">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Skills />
        <Journey />
        <GithubSection />
        <Contact />
      </main>
      </ErrorBoundary>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

