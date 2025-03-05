import React, { useState } from 'react';
import Button from './Button';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Funktionen är inte tillgänglig",
      description: "Kontaktformuläret är inte implementerat ännu. Vänligen använd e-postadressen till vänster istället.",
      variant: "destructive",
    });
  };

  return (
    <section id="contact" className="viewport-section py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 fade-in-element">Kontakta mig</h2>
            <p className="text-lg text-gray-300 mb-8 fade-in-element">
              Har du ett projekt i åtanke eller vill du veta mer om mina tjänster? Jag skulle älska att höra från dig.
            </p>
            
            <div className="space-y-6 fade-in-element">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Maila mig på</h4>
                  <p className="text-gray-400">nadia@nadianasser.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70982 3 9.09786 3.27543 9.22885 3.68377L10.7086 8.02123C10.857 8.47052 10.7294 8.9698 10.3915 9.29353L8.79996 10.8079C9.39362 12.0157 10.3601 13.0499 11.5335 13.6564L13.0586 12.0519C13.3805 11.7213 13.8747 11.5953 14.3219 11.7407L18.6383 13.1751C19.0538 13.3038 19.3333 13.6966 19.3333 14.1335V17.3333C19.3333 18.4379 18.4379 19.3333 17.3333 19.3333H16C8.63621 19.3333 2.66667 13.3638 2.66667 6V5C2.66667 3.89543 3.56209 3 4.66667 3H5C3.89543 3 3 3.89543 3 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Ring mig på</h4>
                  <p className="text-gray-400">+46 70 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Besök mig på</h4>
                  <p className="text-gray-400">Stockholm, Sverige</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scale-in-element">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="mb-6 p-4 rounded-md bg-amber-900/30 border border-amber-500/30 text-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Kontaktformuläret är inte aktivt ännu</h4>
                    <p className="text-sm">Denna funktion är under utveckling. Vänligen använd e-postadressen till vänster för att kontakta mig tills vidare.</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Ditt Namn</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 text-white"
                      placeholder="Ange ditt namn"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">E-postadress</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 text-white"
                      placeholder="Ange din e-post"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Ditt Meddelande</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 resize-none text-white"
                      placeholder="Berätta om ditt projekt"
                    ></textarea>
                  </div>
                  
                  {formStatus.type && (
                    <div className={`p-4 rounded-md ${
                      formStatus.type === 'success' 
                        ? 'bg-green-900/30 text-green-200 border border-green-500/30' 
                        : 'bg-red-900/30 text-red-200 border border-red-500/30'
                    }`}>
                      {formStatus.message}
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full">
                    Skicka Meddelande
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
