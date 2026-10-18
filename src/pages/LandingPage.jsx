import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VisualPipeline from '../components/VisualPipeline';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function LandingPage({ onNavigate }) {
  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="pt-32 pb-0">
        <HeroSection onNavigate={onNavigate} />
        <VisualPipeline />
        <CtaSection onNavigate={onNavigate} />
      </main>
      <Footer onNavigate={onNavigate} />
    </>
  );
}
