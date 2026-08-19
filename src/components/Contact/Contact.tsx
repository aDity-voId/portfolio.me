import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';


gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      },
    });

    if (text1Ref.current) {
      tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
    if (text2Ref.current) {
      tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8');
    }
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex flex-col justify-center items-center px-6 relative py-20">
      <div className="flex flex-col items-center text-center w-full max-w-5xl">
        <div 
          ref={text1Ref} 
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter text-text-muted font-medium mb-2"
        >
          HAVE AN IDEA?
        </div>
        <div 
          ref={text2Ref} 
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter text-text-primary font-medium mb-20"
        >
          LET'S MAKE IT REAL.
        </div>
        
        <div ref={ctaRef} className="mb-24">
          {/* Using a regular anchor element that acts as a button, wrapped in a potential MagneticButton component if valid */}
          <a 
            href={`mailto:${siteData.contact.email}`}
            className="inline-block px-12 py-6 rounded-full border border-border hover:border-accent text-text-primary hover:text-accent transition-colors duration-300 font-display text-xl tracking-wide"
          >
            {siteData.contact.email}
          </a>
        </div>
        
        <div className="flex items-center gap-8 text-text-muted font-body">
          <a href={siteData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <a href={siteData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
            LinkedIn
          </a>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-text-primary font-body text-sm uppercase tracking-widest transition-colors duration-300"
      >
        Back to top
      </button>
    </section>
  );
};

export default Contact;
