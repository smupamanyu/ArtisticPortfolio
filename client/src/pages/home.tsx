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
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-playfair font-bold mb-4">Portfolio</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore my work across different creative domains</p>
            </motion.div>
          </div>
        </section>
        
        {/* Category Navigation */}
        <CategoryNav />
        
        {/* Audio Section */}
        <AudioSection />
        
        {/* Visual Section */}
        <VisualSection />
        
        {/* Technical Section */}
        <TechnicalSection />
        
        <div className="container mx-auto px-4">
          <div className="section-divider"></div>
        </div>
        
        {/* About Section */}
        <AboutSection />
        
        <div className="container mx-auto px-4">
          <div className="section-divider"></div>
        </div>
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
