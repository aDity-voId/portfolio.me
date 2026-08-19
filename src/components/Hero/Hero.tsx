import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene';
import MagneticButton from '../UI/MagneticButton';
import { siteData } from '../../data/siteData';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
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

        if (badgeRef.current) {
          tl.from(badgeRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
          });
        }

        if (words) {
          tl.from(
            words,
            {
              y: 100,
              opacity: 0,
              duration: 1.1,
              stagger: 0.12,
            },
            '-=0.4'
          );
        }

        if (subtitleRef.current) {
          tl.from(
            subtitleRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.5'
          );
        }

        if (ctaRef.current) {
          tl.from(
            ctaRef.current.children,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
            },
            '-=0.4'
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#06070d]"
    >
      <HeroScene mousePosition={mousePosition} isMobile={isMobile} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 flex flex-col justify-center">
        <div className="w-full lg:w-2/3">
          {/* Identity & Status Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_8px_#00ff9d]" />
            <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-medium flex items-center gap-1.5">
              <span>{siteData.name}</span>
              <span className="text-white/30">•</span>
              <span className="text-text-secondary">Available for Projects</span>
            </span>
          </div>

          {/* Large Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-black uppercase leading-[0.9] mb-6 flex flex-col tracking-tight"
            style={{
              fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)',
            }}
          >
            {siteData.headline.map((line, index) => (
              <span
                key={index}
                className={`headline-word inline-block ${
                  index === siteData.headline.length - 1
                    ? 'neon-text-gradient'
                    : 'text-text-primary'
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body text-text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            {siteData.subtitle}
          </p>

          {/* Call to Actions */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <MagneticButton as="div" className="cursor-pointer">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-[#06070d] font-display font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_45px_rgba(0,240,255,0.6)] transition-all duration-300"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton as="div" className="cursor-pointer">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.03] border border-white/[0.12] hover:border-[#00f0ff]/60 text-text-primary hover:text-[#00f0ff] font-display font-medium text-sm tracking-wider uppercase rounded-full backdrop-blur-md transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                <span>Let's Talk</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-text-muted text-[10px] font-mono tracking-[0.3em] uppercase">
          Scroll Down
        </span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-[#00f0ff] to-[#a855f7] animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
