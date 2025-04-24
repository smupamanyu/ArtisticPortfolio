import { Link } from "wouter";

const Footer = () => {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#audio", label: "Audio" },
    { href: "#visual", label: "Visual" },
    { href: "#technical", label: "Technical" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: "fab fa-instagram", href: "#", label: "Instagram" },
    { icon: "fab fa-twitter", href: "#", label: "Twitter" },
    { icon: "fab fa-linkedin-in", href: "#", label: "LinkedIn" },
    { icon: "fab fa-behance", href: "#", label: "Behance" }
  ];

  return (
    <footer className="bg-background/70 backdrop-blur-md py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link href="#" className="text-2xl font-playfair font-bold tracking-wider mb-4 md:mb-0">
            <span className="text-primary">ARTIST</span>
            <span className="text-secondary">FOLIO</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Artist Portfolio. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                aria-label={link.label}
                className="text-gray-400 hover:text-primary transition-colors duration-300"
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
