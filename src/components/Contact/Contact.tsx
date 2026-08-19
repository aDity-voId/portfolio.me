import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../../data/siteData';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUp,
  Sparkles,
  Clock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Clean Brand SVG Icons
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: 'Web Development', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto flex flex-col justify-between"
    >
      {/* Background Neon Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00f0ff]/10 via-[#a855f7]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div ref={headerRef} className="mb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-semibold">
            Let's Collaborate
          </span>
        </div>

        <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-none tracking-tight text-text-primary mb-4">
          HAVE A VISION?
        </h2>
        <h3 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-none tracking-tight neon-text-gradient mb-6">
          LET'S MAKE IT REAL.
        </h3>

        <p className="font-body text-text-secondary text-base md:text-lg max-w-xl">
          Whether you need an immersive 3D web application, Python backend system, or cinematic visual design, I'm ready to bring your ideas to life.
        </p>
      </div>

      {/* Extended Contact Grid */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
        {/* Left Column: Direct Info & Quick Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Direct Email Card */}
          <div className="glass-card-neon rounded-2xl p-8 border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 text-text-muted font-mono text-xs uppercase tracking-widest mb-3">
              <Mail className="w-4 h-4 text-[#00f0ff]" />
              <span>Direct Email</span>
            </div>

            <p className="font-display text-xl md:text-2xl text-text-primary font-bold mb-6 break-all">
              {siteData.contact.email}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#00f0ff]/20 border border-white/[0.1] hover:border-[#00f0ff]/50 text-text-primary hover:text-[#00f0ff] font-mono text-xs font-medium transition-all duration-300 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00ff9d]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
              </button>

              <a
                href={`mailto:${siteData.contact.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f0ff]/10 hover:bg-[#00f0ff] border border-[#00f0ff]/40 text-[#00f0ff] hover:text-[#06070d] font-mono text-xs font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Mail Client</span>
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={siteData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-neon rounded-2xl p-6 border border-white/[0.08] group flex flex-col justify-between h-36"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff] group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Connect on</p>
                <p className="font-display font-bold text-text-primary text-base group-hover:text-[#00f0ff] transition-colors">
                  LinkedIn ↗
                </p>
              </div>
            </a>

            <a
              href={siteData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-neon rounded-2xl p-6 border border-white/[0.08] group flex flex-col justify-between h-36"
            >
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7] group-hover:scale-110 transition-transform">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Code on</p>
                <p className="font-display font-bold text-text-primary text-base group-hover:text-[#a855f7] transition-colors">
                  GitHub ↗
                </p>
              </div>
            </a>
          </div>

          {/* Location & Speed Note */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center text-accent">
                <MapPin className="w-4 h-4 text-[#00f0ff]" />
              </div>
              <div>
                <p className="font-mono text-[11px] text-text-muted uppercase">Based In</p>
                <p className="font-body text-sm font-medium text-text-primary">Chandigarh / SVIET, India</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#00ff9d]">
              <Clock className="w-3.5 h-3.5" />
              <span>Fast Reply &lt; 24h</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Neon Glass Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card-neon rounded-3xl p-8 md:p-10 border border-white/[0.1] relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#00f0ff]" />
                <h4 className="font-display text-2xl text-text-primary font-bold">
                  Send a Direct Message
                </h4>
              </div>
              <span className="font-mono text-xs text-text-muted">Aditya Anand • Portfolio</span>
            </div>

            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#00ff9d]/20 border border-[#00ff9d]/40 flex items-center justify-center text-[#00ff9d] mb-4 shadow-[0_0_25px_rgba(0,255,157,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className="font-display text-2xl font-bold text-text-primary mb-2">Message Dispatched!</h5>
                <p className="font-body text-text-secondary text-sm max-w-sm">
                  Thanks for reaching out, Aditya will review your message and get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#06070d]/60 border border-white/[0.1] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-text-primary placeholder:text-text-muted/40 font-body text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-text-muted uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-[#06070d]/60 border border-white/[0.1] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-text-primary placeholder:text-text-muted/40 font-body text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Service of Interest */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Project Interest / Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#06070d]/60 border border-white/[0.1] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-text-primary font-body text-sm outline-none transition-all cursor-pointer"
                  >
                    <option value="Web Development" className="bg-[#0b0d17]">Web Development & Frontend</option>
                    <option value="Python Backend" className="bg-[#0b0d17]">Python & Backend Engineering</option>
                    <option value="C/C++ Systems" className="bg-[#0b0d17]">C / C++ & Algorithmic Logic</option>
                    <option value="Photoshop / Photo Editing" className="bg-[#0b0d17]">Photoshop & Photo Retouching</option>
                    <option value="Video Editing" className="bg-[#0b0d17]">Video Production & Motion</option>
                    <option value="3D Interactive" className="bg-[#0b0d17]">3D WebGL & Creative Tech</option>
                    <option value="General Inquiry" className="bg-[#0b0d17]">General Conversation / Other</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, timeline, or idea..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#06070d]/60 border border-white/[0.1] focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] text-text-primary placeholder:text-text-muted/40 font-body text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#f43f5e] text-[#06070d] font-display font-bold text-base tracking-wider uppercase hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#06070d] border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Floating Action */}
      <div className="flex items-center justify-center pb-6">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#00f0ff]/50 text-text-muted hover:text-[#00f0ff] font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <span>Back To Top</span>
          <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Contact;
