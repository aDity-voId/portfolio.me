import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    projectRefs.current.forEach((project) => {
      if (!project) return;
      gsap.fromTo(
        project,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24 flex items-center gap-4">
        <span className="text-accent font-display text-xl">02</span>
        <h2 className="font-display text-4xl text-text-primary tracking-tight">
          Selected Work
        </h2>
      </div>

      <div className="flex flex-col gap-36">
        {siteData.projects.map((project, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={project.number}
              ref={(el) => { projectRefs.current[i] = el; }}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative pb-28 border-b border-border/80 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Preview Container */}
              <div className="w-full md:w-3/5 relative group">
                <div className="relative overflow-hidden bg-bg-secondary aspect-[4/3] rounded-2xl border border-border transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                  {/* Subtle hover gradient backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border border-border text-xs font-mono text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.category.split('•')[0].trim()}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-2/5 flex flex-col relative">
                <div
                  className="absolute -top-16 -left-6 font-display text-accent/10 pointer-events-none leading-none select-none"
                  style={{ fontSize: 'clamp(5rem, 9vw, 9rem)' }}
                >
                  {project.number}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-text-muted text-sm uppercase tracking-widest mb-4">
                    <span className="text-accent font-medium">{project.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-text-primary mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary font-body leading-relaxed text-base md:text-lg mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-display text-sm font-medium tracking-wide group cursor-pointer w-fit">
                    <span className="border-b border-accent/40 group-hover:border-accent transition-colors">Case Study / Details</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
