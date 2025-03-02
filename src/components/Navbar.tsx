
import React, { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/animation';
import Button from './Button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'process', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Process', id: 'process' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        isScrolled 
          ? 'bg-background backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#home" className={cn(
            "text-2xl font-display font-bold tracking-tight",
            !isScrolled && "text-white"
          )}>
            Brand<span className="font-light">Flow</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={cn(
                'nav-item text-sm font-medium transition-colors duration-200',
                activeSection === item.id 
                  ? isScrolled ? 'text-primary active' : 'text-white active' 
                  : isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/80 hover:text-white'
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button variant="primary" size="md" className={cn(
            !isScrolled && "bg-white text-primary hover:bg-white/90"
          )}>
            Get Started
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className={cn(
            "block md:hidden p-2",
            isScrolled ? "text-primary" : "text-white"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          'md:hidden absolute left-0 right-0 px-6 py-4 bg-white shadow-md transition-all duration-300 ease-in-out',
          isMenuOpen ? 'top-full opacity-100' : '-top-96 opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
                setIsMenuOpen(false);
              }}
              className={cn(
                'py-2 text-sm font-medium transition-colors duration-200',
                activeSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              {item.name}
            </a>
          ))}
          <Button variant="primary" size="md" className="mt-2 w-full">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
