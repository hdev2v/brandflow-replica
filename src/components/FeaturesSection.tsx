import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({
  title,
  description,
  icon
}: FeatureCardProps) => {
  return <div className="glass-card p-8 fade-in-element">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>;
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Art Director",
      description: "Skapar visuella koncept som fångar din målgrupps uppmärksamhet och förmedlar ditt varumärkes värderingar.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
    },
    {
      title: "Content Skapande",
      description: "Producerar engagerande och relevant innehåll som resonerar med din publik och driver konvertering.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
            <path d="M9 21L9 9" stroke="currentColor" strokeWidth="2" />
          </svg>
    },
    {
      title: "Annonsering",
      description: "Skapar och hanterar målinriktade annonskampanjer som maximerar din avkastning på investering.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
    },
    {
      title: "Strategisk Rådgivning",
      description: "Erbjuder expertråd och vägledning för att hjälpa dig navigera det digitala landskapet och nå dina affärsmål.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 7L12 3L8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
    },
    {
      title: "Sociala Medier Hantering",
      description: "Hanterar och optimerar din närvaro på sociala medier för att öka engagemang och bygga en lojal följarskara.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
    }
  ];

  return <section id="features" className="viewport-section py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 reveal-right">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal-left">En kanal räcker inte längre. Man måste skapa sig en helhetsbild som man kan följa genom alla kanaler. Jag hjälper dig att nå dina kunder på rätt sätt, med rätt budskap och möta dina förväntningar.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 scale-in-element transform transition-all duration-1000 opacity-0 translate-x-[-50px]">
            <img 
              src="/lovable-uploads/9221e27b-dba9-4577-83fe-76fafe0a012a.png" 
              alt="Social Media Icons" 
              className="w-full max-w-md mx-auto rounded-lg animate-float" 
            />
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>;
};

export default FeaturesSection;
