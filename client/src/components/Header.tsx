import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#audio", label: "Audio" },
    { href: "#visual", label: "Visual" },
    { href: "#technical", label: "Technical" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled && "bg-background/95 backdrop-blur-md shadow-lg"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="#" className="text-2xl font-playfair font-bold tracking-wider">
          <span className="text-primary">ARTIST</span>
          <span className="text-secondary">FOLIO</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-foreground focus:outline-none"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className="text-foreground hover:text-primary transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                const id = item.href.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                  const yOffset = -100;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({top: y, behavior: 'smooth'});
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-background/95 backdrop-blur-md w-full"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className="text-foreground hover:text-primary transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const id = item.href.replace('#', '');
                    const element = document.getElementById(id);
                    if (element) {
                      const yOffset = -100;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({top: y, behavior: 'smooth'});
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
