import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import VisualPipeline from '../components/VisualPipeline';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <HeroSection />
        <VisualPipeline />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
