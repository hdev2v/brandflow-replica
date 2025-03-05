
import React from 'react';
import Button from './Button';

const CallToActionSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 fade-in-element">
          Känner du att ditt varumärke inte syns tillräckligt online?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 fade-in-element">
          Många företag har svårt att få engagemang och resultat på sociala medier utan att riktigt förstå varför. 
          Kanske har du lagt upp inlägg utan att se några konkreta resultat eller inte fått den uppmärksamheten 
          ditt varumärke förtjänar. Det är inte ditt fel – det är vanligt, och vi är här för att hjälpa dig att ändra på det.
        </p>
        
        <div className="fade-in-element">
          <Button size="lg" onClick={scrollToContact}>
            Boka gratis konsultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
