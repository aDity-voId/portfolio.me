import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    if (quoteRef.current) {
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );
    }

    if (bioRef.current) {
      tl.fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }

    if (skillsRef.current?.children) {
      tl.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (statsRef.current?.children) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-16 flex items-center gap-4">
        <span className="text-accent font-display text-xl">03</span>
        <h2 className="font-display text-4xl text-text-primary tracking-tight">About Me</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Profile Image Portrait */}
        <div ref={imageRef} className="lg:col-span-5 relative group">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-border bg-bg-secondary">
            {/* Ambient subtle glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-[#4fc3f7]/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />
            
            <img
              src="/profile.jpg"
              alt={siteData.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-60" />
            
            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-bg-primary/70 backdrop-blur-md border border-border">
              <p className="font-display text-text-primary font-medium text-lg">{siteData.name}</p>
              <p className="text-accent text-sm font-body">{siteData.title}</p>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col">
          <h3
            ref={quoteRef}
            className="font-display text-text-primary tracking-tight leading-tight mb-8 text-[clamp(2rem,4vw,3.2rem)]"
          >
            {siteData.about.quote}
          </h3>

          <p
            ref={bioRef}
            className="font-body text-text-secondary text-lg leading-relaxed mb-10"
          >
            {siteData.about.bio}
          </p>

          <div className="mb-12">
            <h4 className="font-display text-sm uppercase tracking-widest text-text-muted mb-4">
              Core Stack & Expertise
            </h4>
            <div ref={skillsRef} className="flex flex-wrap gap-2.5">
              {siteData.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-border text-text-secondary hover:text-accent hover:border-accent/40 bg-white/[0.02] text-sm rounded-full tracking-wide transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
          >
            {siteData.about.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-display text-4xl md:text-5xl text-accent mb-1 font-bold">
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs uppercase tracking-widest font-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
