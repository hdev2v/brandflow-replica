
import React from 'react';
import { cn } from '@/lib/utils';

interface PartnerLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const PartnerLogo = ({ src, alt, className }: PartnerLogoProps) => {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <img 
        src={src} 
        alt={alt} 
        className="max-h-16 w-auto object-contain"
        loading="lazy"
      />
    </div>
  );
};

const PartnersSection = () => {
  return (
    <section id="partners" className="viewport-section py-24 px-6 relative overflow-hidden bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          {/* Quote Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="mb-6 fade-in-element">
              <img 
                src="/lovable-uploads/003ca0f3-7a6c-4b5b-a96a-10a85323ee57.png" 
                alt="Quotation mark" 
                className="h-16 mx-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-8 leading-relaxed text-gray-800 fade-in-element">
              ...Vi uppskattar att du tog dig tid att förstå vårt varumärke...
            </h2>
            <div className="flex flex-col items-center mt-8">
              <img 
                src="/lovable-uploads/6bcd3716-4032-48ca-9e74-84bf09c2a39b.png" 
                alt="Tuesday Morning logo" 
                className="h-12 mb-3 reveal-right"
              />
              <p className="text-gray-600 reveal-right">Tuesday Morning</p>
            </div>
          </div>
          
          {/* Partners heading and description */}
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 fade-in-element">Partners</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl fade-in-element">
            Vi har haft nöjet att arbeta med flera framstående företag som har sett verkliga resultat från våra sociala mediestrategier.
          </p>
          
          {/* Partner Logos - Shifted positions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full scale-in-element">
            <PartnerLogo 
              src="/lovable-uploads/6bcd3716-4032-48ca-9e74-84bf09c2a39b.png" 
              alt="Tuesday Morning" 
            />
            <PartnerLogo 
              src="/lovable-uploads/30a148d9-cf65-4fba-9420-1e00eb58e85f.png" 
              alt="Happy Hydrate" 
            />
            <PartnerLogo 
              src="/lovable-uploads/941f22de-8392-472a-9603-a239e0262fa9.png" 
              alt="Bodybuilding.com" 
            />
            <PartnerLogo 
              src="/lovable-uploads/93e04113-3be0-44c1-bf10-735d0f5af256.png" 
              alt="MyFundraise" 
            />
            <PartnerLogo 
              src="/lovable-uploads/9b5da530-235d-4de4-a355-22b6c5c4e80c.png" 
              alt="Miss Marry of Sweden" 
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements with lighter colors */}
      <div className="absolute -left-32 top-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-32 bottom-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default PartnersSection;
