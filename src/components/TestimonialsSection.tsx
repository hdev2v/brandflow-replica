
import React, { useState } from 'react';

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
  isActive: boolean;
}

const Testimonial = ({ content, author, position, company, image, isActive }: TestimonialProps) => {
  return (
    <div 
      className={`
        absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24 pointer-events-none'}
      `}
    >
      <div className="glass-card p-6 md:p-8 h-full flex flex-col">
        <blockquote className="text-base md:text-lg lg:text-xl mb-6 flex-grow overflow-y-auto">"{content}"</blockquote>
        <div className="flex items-center mt-auto">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden mr-3 md:mr-4 flex-shrink-0">
            <img 
              src={image} 
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm md:text-base">{author}</h4>
            <p className="text-xs md:text-sm text-muted-foreground">{position}, {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      content: "Att arbeta med BrandFlow förändrade vår digitala närvaro. Deras strategiska tillvägagångssätt och uppmärksamhet på detaljer resulterade i en webbplats som inte bara ser fantastisk ut utan också ger verkliga affärsresultat.",
      author: "Sarah Johnson",
      position: "Marknadsdirektör",
      company: "Innovate Tech",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      content: "Teamet på BrandFlow förstår verkligen hur man översätter affärsmål till vacker, funktionell design. De var samarbetsvilliga, lyhörda och levererade utöver våra förväntningar.",
      author: "Michael Chen",
      position: "VD",
      company: "Nexus Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      content: "BrandFlows process är grundlig och genomtänkt. De tog sig tid att förstå vårt varumärke och skapade en digital upplevelse som perfekt representerar vilka vi är och resonerar med vår målgrupp.",
      author: "Emma Rodriguez",
      position: "Varumärkeschef",
      company: "Elevate Retail",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="viewport-section py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-4 fade-in-element">Kundrecensioner</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto fade-in-element">
            Hör vad våra kunder säger om sin erfarenhet av att arbeta med oss.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[350px] md:h-[280px] lg:h-[250px]">
            {testimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                position={testimonial.position}
                company={testimonial.company}
                image={testimonial.image}
                isActive={index === activeIndex}
              />
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary w-4 md:w-6' : 'bg-primary/30'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Gå till recension ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-center space-x-3 md:space-x-4 mt-6 md:mt-8">
            <button
              className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={prevTestimonial}
              aria-label="Föregående recension"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={nextTestimonial}
              aria-label="Nästa recension"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-5 md:h-5">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
