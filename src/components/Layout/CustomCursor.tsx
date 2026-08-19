import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(undefined);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;
    
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const updateCursor = () => {
      // Lerp for the ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(0.5)' : 'scale(1)'}`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = 'auto';
    };
  }, [isHovering]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] rounded-full border-2 border-[var(--color-accent)] pointer-events-none z-[100] transition-transform duration-100 ease-out will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full bg-[var(--color-accent)] pointer-events-none z-[100] transition-transform duration-100 ease-out will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
