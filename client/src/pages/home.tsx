import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryNav from '@/components/CategoryNav';
import AudioSection from '@/components/AudioSection';
import VisualSection from '@/components/VisualSection';
import TechnicalSection from '@/components/TechnicalSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import AnimatedBackground from '@/components/ui/animated-background';

const Home = () => {
  return (
    <div className="bg-background text-foreground font-inter">
      {/* Abstract animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Portfolio Categories */}
        <CategoryNav />
        
        {/* Audio Section */}
        <AudioSection />
        
        {/* Visual Section */}
        <VisualSection />
        
        {/* Technical Section */}
        <TechnicalSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
