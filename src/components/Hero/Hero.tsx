import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene';
import MagneticButton from '../UI/MagneticButton';
import { siteData } from '../../data/siteData';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const words = headlineRef.current?.querySelectorAll('.headline-word');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (words) {
          tl.from(words, {
            y: 120,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
          });
        }

        tl.from(subtitleRef.current!, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5');

        tl.from(ctaRef.current?.children ?? [], {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        }, '-=0.4');
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <HeroScene mousePosition={mousePosition} isMobile={isMobile} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="w-full md:w-3/5">
          <h1
            ref={headlineRef}
            className="font-display font-bold uppercase leading-[0.9] mb-6 flex flex-col"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {siteData.headline.map((line, index) => (
              <span
                key={index}
                className={`headline-word inline-block ${
                  index === siteData.headline.length - 1
                    ? 'text-gradient'
                    : 'text-text-primary'
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-text-secondary text-lg md:text-xl max-w-lg mb-10"
          >
            {siteData.subtitle}
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <MagneticButton as="div" className="cursor-pointer">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-full hover:opacity-90 transition-all duration-300"
              >
                View Selected Work
              </a>
            </MagneticButton>

            <MagneticButton as="div" className="cursor-pointer">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-text-primary font-medium rounded-full hover:border-text-secondary transition-all duration-300"
              >
                Let's Talk
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-text-muted text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
