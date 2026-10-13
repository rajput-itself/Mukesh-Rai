import React from 'react';
import SEO from './components/SEO';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Introduction from './sections/Introduction';
import Leadership from './sections/Leadership';
import Expertise from './sections/Expertise';
import SelectedWork from './sections/SelectedWork';
import Company from './sections/Company';
import Technology from './sections/Technology';
import Experience from './sections/Experience';
import Insights from './sections/Insights';
import Contact from './sections/Contact';

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-blue-600 selection:text-white overflow-x-hidden transition-colors duration-300">
        <SEO />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <Introduction />
          <Leadership />
          <Expertise />
          <SelectedWork />
          <Company />
          <Technology />
          <Experience />
          <Insights />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
