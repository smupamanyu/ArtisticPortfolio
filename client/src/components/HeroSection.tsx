import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/use-parallax';

const HeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useParallax(contentRef, 0.2);
  useParallax(imageRef, -0.1);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            ref={contentRef}
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold leading-tight">
              <span className="block">Creative</span>
              <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Exploring the intersection of audio, visual, and technical artistry through immersive digital experiences.
            </p>
            <div className="flex space-x-4 pt-6">
              <a 
                href="#portfolio" 
                className="bg-primary hover:bg-primary/90 text-white font-montserrat px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border border-primary text-primary hover:bg-primary/10 font-montserrat px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            ref={imageRef}
            className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-80 rounded-full animate-spin-slow blur-xl"></div>
              <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Artist Portrait" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/3 right-10 w-32 h-32 border-2 border-primary/30 rounded-full animate-float"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-1/3 left-10 w-20 h-20 border-2 border-secondary/30 rounded-full animate-float-delay"
      ></motion.div>
    </section>
  );
};

export default HeroSection;
