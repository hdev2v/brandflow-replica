import React from 'react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ number, title, description, isLast = false }: ProcessStepProps) => {
  return (
    <div className="flex items-start group">
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium z-10 relative scale-in-element">
          {number}
        </div>
        {!isLast && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-full bg-secondary-foreground/20 group-hover:bg-primary transition-colors duration-300"></div>
        )}
      </div>
      <div className="ml-6 pb-12 reveal-right">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      title: "Discovery",
      description: "We begin by understanding your business, your goals, and your audience through in-depth research and strategic discussions."
    },
    {
      title: "Strategy",
      description: "Based on our findings, we develop a comprehensive strategy tailored to your unique needs and objectives."
    },
    {
      title: "Design",
      description: "Our creative team crafts beautiful, functional designs that bring your brand to life and resonate with your audience."
    },
    {
      title: "Development",
      description: "We transform designs into fully-functional digital experiences using the latest technologies and best practices."
    },
    {
      title: "Launch & Support",
      description: "We ensure a smooth launch and provide ongoing support to optimize performance and drive continuous improvement."
    }
  ];

  return (
    <section id="process" className="viewport-section py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 fade-in-element">Our Process</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md fade-in-element">
              A structured approach to ensure we deliver exceptional results that exceed expectations.
            </p>
            
            <div className="space-y-0">
              {steps.map((step, index) => (
                <ProcessStep 
                  key={index}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
          
          <div className="relative fade-in-element">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Our design process"
                className="w-full h-auto object-cover lazy-image"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
