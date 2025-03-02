
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
            {/* Image container with improved layout */}
            <div className="relative h-[550px] w-full">
              {/* Main profile image - centered as the focal point */}
              <div className="absolute left-0 lg:left-5 bottom-0 w-4/5 md:w-3/4 lg:w-4/5 z-10 transform lg:translate-x-[5%]">
                <div className="rounded-3xl overflow-hidden bg-gray-100">
                  <img 
                    src="/lovable-uploads/27bac0b0-9f6d-4194-8e1b-57dd4880699c.png"
                    alt="Nadia - Social Media Expert" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Social Media Gallery - positioned top right with overlap */}
              <div className="absolute top-6 right-0 w-3/5 md:w-1/2 lg:w-3/5 z-20">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/fd2432ff-85d3-4bbe-9360-481a252360fa.png" 
                    alt="Social Media Gallery" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
              
              {/* Instagram Stats - positioned bottom right with good visibility */}
              <div className="absolute right-0 bottom-12 lg:bottom-20 w-2/5 md:w-2/5 lg:w-2/5 z-30">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/ffad4bf2-ff2e-4fd9-bda9-f567e36c7250.png" 
                    alt="Instagram Stats" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
