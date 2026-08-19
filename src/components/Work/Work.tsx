import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import { ArrowUpRight } from 'lucide-react';

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
      <div className="mb-24 flex items-center gap-3">
        <span className="text-[#00f0ff] font-display text-xl font-bold">02</span>
        <span className="w-8 h-px bg-[#00f0ff]/60" />
        <h2 className="font-display text-4xl text-text-primary tracking-tight font-bold">
          Selected Work
        </h2>
      </div>

      <div className="flex flex-col gap-36">
        {siteData.projects.map((project, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={project.number}
              ref={(el) => {
                projectRefs.current[i] = el;
              }}
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative pb-28 border-b border-white/[0.08] ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Preview Container with Neon Glass Effect */}
              <div className="w-full md:w-3/5 relative group">
                <div className="relative overflow-hidden bg-[#0b0d17] aspect-[4/3] rounded-3xl border border-white/[0.1] transition-all duration-500 group-hover:border-[#00f0ff]/60 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.25)]">
                  {/* Subtle neon hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070d]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Corner Accent Glass Badge */}
                  <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-[#06070d]/80 backdrop-blur-md border border-white/[0.15] text-xs font-mono text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    {project.category.split('•')[0].trim()}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-2/5 flex flex-col relative">
                <div
                  className="absolute -top-16 -left-6 font-display text-[#00f0ff]/10 pointer-events-none leading-none select-none font-bold"
                  style={{ fontSize: 'clamp(5rem, 9vw, 9rem)' }}
                >
                  {project.number}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-text-muted text-xs font-mono uppercase tracking-widest mb-4">
                    <span className="text-[#00f0ff] font-semibold">{project.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-text-primary font-bold mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary font-body leading-relaxed text-base md:text-lg mb-8">
                    {project.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-[#00f0ff]/10 border border-white/[0.1] hover:border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs font-medium tracking-wider group cursor-pointer transition-all duration-300 shadow-sm">
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
