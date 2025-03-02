
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add('animate-slide-down');
    }
    
    if (subtitleRef.current) {
      setTimeout(() => {
        subtitleRef.current?.classList.add('animate-slide-down');
      }, 200);
    }
    
    if (descriptionRef.current) {
      setTimeout(() => {
        descriptionRef.current?.classList.add('animate-slide-down');
      }, 300);
    }
    
    if (ctaRef.current) {
      setTimeout(() => {
        ctaRef.current?.classList.add('animate-slide-up');
      }, 400);
    }
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 md:pt-32 pb-24 px-4 md:px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 z-10">
            <h2 
              ref={titleRef}
              className="text-2xl md:text-3xl font-display font-semibold opacity-0 mb-3 text-pink-500"
            >
              Hej jag heter Nadia!
            </h2>
            
            <h1 
              ref={subtitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight opacity-0 mb-6"
            >
              Jag hjälper dig växa med sociala medier
            </h1>
            
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-300 mb-8 opacity-0 max-w-xl"
            >
              Upptäck hur sociala medier kan ge ditt varumärke riktiga resultat – även om du inte trott att det var möjligt tidigare.
            </p>
            
            <div 
              ref={ctaRef}
              className="opacity-0"
            >
              <Button size="lg" onClick={scrollToContact}>
                Boka gratis konsultation
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative mb-8 lg:mb-0">
            {/* Main profile image */}
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src="/lovable-uploads/27bac0b0-9f6d-4194-8e1b-57dd4880699c.png"
                alt="Nadia - Social Media Expert" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Top floating element - smaller on mobile */}
            <div className="absolute -right-4 top-4 lg:right-0 lg:top-10 scale-50 md:scale-75 lg:scale-100 origin-top-right z-10">
              <div className="grid grid-cols-3 grid-rows-2 gap-1 w-[300px]">
                <img 
                  src="/lovable-uploads/fd2432ff-85d3-4bbe-9360-481a252360fa.png" 
                  alt="Social Media Gallery" 
                  className="col-span-3 w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
            </div>
            
            {/* Bottom floating element - smaller on mobile */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-20 lg:-right-5 scale-50 md:scale-75 lg:scale-100 origin-bottom-right z-10">
              <img 
                src="/lovable-uploads/ffad4bf2-ff2e-4fd9-bda9-f567e36c7250.png" 
                alt="Instagram Stats" 
                className="w-[300px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
