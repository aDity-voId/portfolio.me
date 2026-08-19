import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import { Sparkles, Code, Cpu } from 'lucide-react';

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
      <div className="mb-16 flex items-center gap-3">
        <span className="text-[#00f0ff] font-display text-xl font-bold">03</span>
        <span className="w-8 h-px bg-[#00f0ff]/60" />
        <h2 className="font-display text-4xl text-text-primary tracking-tight font-bold">About Me</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Profile Image Portrait Card */}
        <div ref={imageRef} className="lg:col-span-5 relative group">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0b0d17]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* Ambient Neon Backlight */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#00f0ff]/30 via-[#a855f7]/30 to-[#f43f5e]/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            <img
              src="/profile.jpg"
              alt={siteData.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/20 to-transparent opacity-80" />

            {/* Full Name Glass Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#06070d]/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-text-primary font-bold text-xl tracking-tight">
                    {siteData.name}
                  </h3>
                  <p className="text-[#00f0ff] text-xs font-mono mt-0.5">{siteData.title}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Design Philosophy</span>
          </div>

          <h3
            ref={quoteRef}
            className="font-display text-text-primary tracking-tight leading-tight mb-8 text-[clamp(2rem,3.8vw,3.2rem)] font-bold"
          >
            "{siteData.about.quote}"
          </h3>

          <p
            ref={bioRef}
            className="font-body text-text-secondary text-lg leading-relaxed mb-10"
          >
            {siteData.about.bio}
          </p>

          <div className="mb-12">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Core Stack & Expertise</span>
            </h4>
            <div ref={skillsRef} className="flex flex-wrap gap-2.5">
              {siteData.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-white/[0.08] hover:border-[#00f0ff]/60 text-text-secondary hover:text-[#00f0ff] bg-white/[0.02] hover:bg-[#00f0ff]/10 text-xs font-mono rounded-full tracking-wide transition-all duration-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Row with Neon Accents */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]"
          >
            {siteData.about.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span
                  className={`font-display text-4xl md:text-5xl font-black mb-1 ${
                    index === 0
                      ? 'text-[#00f0ff]'
                      : index === 1
                      ? 'text-[#a855f7]'
                      : 'text-[#00ff9d]'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs uppercase font-mono tracking-widest">
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
