
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
            {/* Refined image composition with main portrait as the focal point */}
            <div className="relative h-[540px] w-full">
              {/* Main portrait - enlarged to be more prominent */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-[85%] md:w-[80%] lg:w-[85%] z-20 transition-all duration-700 hover:scale-[1.02]">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/lovable-uploads/27bac0b0-9f6d-4194-8e1b-57dd4880699c.png"
                    alt="Nadia - Social Media Expert" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Subtle background gradient for depth */}
              <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 w-[85%] h-[70%] rounded-[40px] bg-gradient-to-t from-pink-500/10 to-transparent blur-xl z-10"></div>
              
              {/* Social Media Gallery - reduced in size and repositioned */}
              <div className="absolute top-4 right-0 md:right-2 w-[50%] md:w-[45%] lg:w-[48%] z-30 transition-all duration-500 hover:translate-y-1 hover:rotate-1">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                  <img 
                    src="/lovable-uploads/fd2432ff-85d3-4bbe-9360-481a252360fa.png" 
                    alt="Social Media Gallery" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
              
              {/* Instagram Stats - reduced in size and repositioned */}
              <div className="absolute right-4 bottom-[25%] w-[40%] md:w-[35%] lg:w-[38%] z-40 transition-all duration-500 hover:-translate-y-1 hover:-rotate-1">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                  <img 
                    src="/lovable-uploads/ffad4bf2-ff2e-4fd9-bda9-f567e36c7250.png" 
                    alt="Instagram Stats" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Decorative element for added visual interest */}
              <div className="absolute left-[5%] top-[20%] w-[25%] h-[25%] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/10 blur-2xl z-5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
