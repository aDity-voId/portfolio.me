import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const TextReveal = ({
  children,
  className = '',
  as: Tag = 'div',
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '100%' },
        {
          y: '0%',
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  const wordList = children.split(' ');

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {wordList.map((word, index) => (
        <span
          key={index}
          className="inline-flex overflow-hidden mr-[0.25em] align-top"
          aria-hidden="true"
        >
          <span className="word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </Tag>
  );
};

export default TextReveal;
