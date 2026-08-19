import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#06070d]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center max-w-7xl">
        {/* Full Name Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl text-text-primary tracking-wider z-50 relative flex items-center gap-2 group"
        >
          <span className="text-[#00f0ff] font-mono text-lg transition-transform duration-300 group-hover:-translate-x-1">&lt;</span>
          <span className="tracking-tight text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f0ff] group-hover:to-[#a855f7] transition-all duration-300">
            Aditya Anand
          </span>
          <span className="text-[#a855f7] font-mono text-lg transition-transform duration-300 group-hover:translate-x-1">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-text-secondary hover:text-[#00f0ff] font-medium text-sm tracking-wide transition-colors duration-300 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_#00f0ff]"></span>
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="px-5 py-2 rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#06070d] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] font-mono text-xs font-semibold tracking-wider transition-all duration-300"
          >
            LET'S TALK
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden z-50 relative flex flex-col justify-center items-center w-9 h-9 p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#00f0ff] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 my-1 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-[#a855f7] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>

        {/* Mobile Menu Overlay - Strictly visible on mobile and completely hidden on desktop */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#06070d]/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center animate-in fade-in duration-300">
            <nav className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-3xl font-bold text-text-primary hover:text-[#00f0ff] transition-colors duration-300 uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-[#06070d] font-display font-bold text-base tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                Get In Touch
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
