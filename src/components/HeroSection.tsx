
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
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
    
    if (ctaRef.current) {
      setTimeout(() => {
        ctaRef.current?.classList.add('animate-slide-up');
      }, 400);
    }
  }, []);

  return (
    <section id="home" className="pt-32 pb-24 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight opacity-0 mb-6"
          >
            Transform your brand with premium design
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0"
          >
            We create impactful digital experiences that elevate your brand and connect with your audience through thoughtful design and seamless interactions.
          </p>
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          >
            <Button size="lg">
              See our work
            </Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 relative">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Premium digital design workspace" 
              className="w-full h-auto object-cover lazy-image"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full -z-10"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
