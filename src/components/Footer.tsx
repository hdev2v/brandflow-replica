
import React from 'react';
import { scrollToSection } from '@/lib/animation';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">
              Brand<span className="font-light">Flow</span>
            </h3>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/Brandflowse/61570380636166/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/brandflow.se" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/brand-flow-se/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-4 mt-4 border-t border-primary-foreground/20">
          <p className="text-primary-foreground/60 text-center">
            © {currentYear} BrandFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
