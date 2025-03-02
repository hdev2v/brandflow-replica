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
            {/* Main profile image with rounded corners */}
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <img 
                src="/lovable-uploads/27bac0b0-9f6d-4194-8e1b-57dd4880699c.png"
                alt="Nadia - Social Media Expert" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Top floating element - collage of images */}
            <div className="absolute -top-4 right-0 lg:top-5 lg:right-0 z-10 w-1/2 lg:w-2/3 origin-top-right">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/lovable-uploads/fd2432ff-85d3-4bbe-9360-481a252360fa.png" 
                  alt="Social Media Gallery" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
            
            {/* Bottom floating element - Instagram stats */}
            <div className="absolute -bottom-4 right-0 lg:-bottom-10 lg:-right-5 z-10 w-3/5 lg:w-2/3 origin-bottom-right">
              <img 
                src="/lovable-uploads/ffad4bf2-ff2e-4fd9-bda9-f567e36c7250.png" 
                alt="Instagram Stats" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
