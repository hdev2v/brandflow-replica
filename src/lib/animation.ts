
export const setupAnimations = () => {
  // Intersection Observer for fade-in effects
  const fadeElements = document.querySelectorAll('.fade-in-element');
  const revealRightElements = document.querySelectorAll('.reveal-right');
  const revealLeftElements = document.querySelectorAll('.reveal-left');
  const scaleElements = document.querySelectorAll('.scale-in-element');
  
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  };
  
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(callback, options);
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  revealRightElements.forEach(element => {
    observer.observe(element);
  });
  
  revealLeftElements.forEach(element => {
    observer.observe(element);
  });
  
  scaleElements.forEach(element => {
    observer.observe(element);
  });
  
  // Lazy loading for images
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    
    if(img instanceof HTMLImageElement && img.complete) {
      img.classList.add('loaded');
    }
  });
  
  return observer;
};

// Smooth scroll to section
export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Account for header height
      behavior: 'smooth'
    });
  }
};
