import { useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'div' | 'a';
  [key: string]: unknown;
}

const MagneticButton = ({
  children,
  className = '',
  as: Tag = 'button',
  ...props
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      const xMove = (x / width) * 30;
      const yMove = (y / height) * 30;

      button.style.transform = `translate(${xMove}px, ${yMove}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Tag
      ref={buttonRef as React.RefObject<never>}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
