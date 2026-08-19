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
      // Smooth lerp for outer neon ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) ${
          isHovering ? 'scale(0.5)' : 'scale(1)'
        }`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) ${
          isHovering ? 'scale(1.8)' : 'scale(1)'
        }`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
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
        className={`fixed top-0 left-0 w-[34px] h-[34px] rounded-full pointer-events-none z-[100] transition-colors duration-200 will-change-transform ${
          isHovering
            ? 'border-2 border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_20px_rgba(0,240,255,0.6)]'
            : 'border border-[#00f0ff]/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
        }`}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] pointer-events-none z-[100] will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
