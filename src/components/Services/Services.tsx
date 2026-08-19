import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import {
  Code2,
  Terminal,
  Globe,
  Image as ImageIcon,
  Video,
  Box,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getServiceIcon = (iconType: string) => {
  const iconProps = { className: 'w-6 h-6 text-accent' };
  switch (iconType) {
    case 'python':
      return <Terminal {...iconProps} />;
    case 'cpp':
      return <Code2 {...iconProps} />;
    case 'web':
      return <Globe {...iconProps} />;
    case 'photoshop':
      return <ImageIcon {...iconProps} />;
    case 'video':
      return <Video {...iconProps} />;
    case '3d':
      return <Box {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate Cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    // Animate Progress Loading Bars
    progressBarsRef.current.forEach((bar, index) => {
      if (!bar) return;
      const targetWidth = siteData.services[index]?.proficiency || 0;
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${targetWidth}%`,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/80 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-accent font-display text-xl font-semibold">04</span>
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-text-muted text-xs uppercase tracking-[0.25em] font-mono">Expertise & Services</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary tracking-tight font-bold">
            Services & Technical Proficiency
          </h2>
        </div>
        <p className="text-text-secondary text-base max-w-md font-body">
          Specialized skill sets spanning software engineering, computational logic, and high-impact digital art production.
        </p>
      </div>

      {/* Services Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteData.services.map((service, i) => (
          <div
            key={service.number}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative rounded-2xl bg-bg-secondary/70 border border-border p-8 md:p-10 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:bg-bg-secondary hover:shadow-[0_10px_40px_rgba(139,92,246,0.12)] flex flex-col justify-between"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">
                      {service.category}
                    </span>
                    <h3 className="font-display text-2xl text-text-primary font-bold group-hover:text-accent-light transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <span className="font-display text-2xl font-bold text-text-muted/40 group-hover:text-accent/40 transition-colors">
                  {service.number}
                </span>
              </div>

              {/* Tagline & Description */}
              <p className="text-accent-light/90 text-sm font-medium mb-3">
                {service.tagline}
              </p>
              <p className="text-text-secondary font-body leading-relaxed text-sm md:text-base mb-6">
                {service.description}
              </p>

              {/* Tool Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-bg-primary/80 border border-border text-text-muted group-hover:text-text-secondary group-hover:border-accent/20 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-accent/70" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Proficiency Loading Bar */}
            <div className="pt-6 border-t border-border/60">
              <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                <span className="text-text-muted uppercase tracking-wider">Proficiency Level</span>
                <span className="text-accent font-bold text-sm">{service.proficiency}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-bg-primary overflow-hidden border border-border/80 p-0.5">
                <div
                  ref={(el) => { progressBarsRef.current[i] = el; }}
                  className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-[#4fc3f7] relative transition-all"
                  style={{ width: `${service.proficiency}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
