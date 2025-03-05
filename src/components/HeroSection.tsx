
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply animation classes without initially setting elements to opacity-0
    const animateElement = (element: HTMLElement | null, delay: number) => {
      if (element) {
        setTimeout(() => {
          element.classList.add('animate-fade-in');
        }, delay);
      }
    };
    
    animateElement(titleRef.current, 100);
    animateElement(subtitleRef.current, 200);
    animateElement(descriptionRef.current, 300);
    animateElement(ctaRef.current, 400);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="viewport-section pt-20 md:pt-32 pb-24 px-4 md:px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 z-10">
            <h2 
              ref={titleRef}
              className="text-2xl md:text-3xl font-display font-semibold mb-3 text-pink-500"
            >
              Hej jag heter Nadia!
            </h2>
            
            <h1 
              ref={subtitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
            >
              Jag hjälper dig växa med sociala medier
            </h1>
            
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
            >
              Upptäck hur sociala medier kan ge ditt varumärke riktiga resultat – även om du inte trott att det var möjligt tidigare.
            </p>
            
            <div 
              ref={ctaRef}
            >
              <Button size="lg" onClick={scrollToContact}>
                Boka gratis konsultation
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative mb-8 lg:mb-0">
            <div className="relative h-[540px] w-full">
              {/* Collage image positioned behind the main portrait */}
              <div className="absolute right-0 top-0 w-[45%] h-[40%] z-10 transform translate-x-6 -translate-y-6">
                <div className="rounded-xl overflow-hidden shadow-lg h-full">
                  <img 
                    src="/lovable-uploads/2c1feb13-1205-4fcc-8e1d-371a4ec9929f.png"
                    alt="Services Collage" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Social media screenshot positioned at bottom right behind the main portrait */}
              <div className="absolute right-0 bottom-0 w-[45%] h-[40%] z-10 transform translate-x-6 translate-y-6">
                <div className="rounded-xl overflow-hidden shadow-lg h-full">
                  <img 
                    src="/lovable-uploads/5489e3ba-6f97-4712-9cc6-b0075c0b0340.png"
                    alt="Social Media Performance" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Single main portrait image */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] h-full z-20">
                <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                  <img 
                    src="/lovable-uploads/c660c0d9-e040-49d3-82fa-3d876387af15.png"
                    alt="Nadia - Social Media Expert" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Subtle background gradient for depth */}
              <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 w-[95%] h-[80%] rounded-[40px] bg-gradient-to-t from-pink-500/10 to-transparent blur-xl z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
