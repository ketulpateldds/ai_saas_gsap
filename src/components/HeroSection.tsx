import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      );

      tl.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.7"
      );

      tl.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      );

      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-bg overflow-hidden px-6 pt-20"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" style={{ animationDuration: '8s' }} />
        
        {/* Subtle moving lines/grid */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#FAF AF912_1px,transparent_1px),linear-gradient(to_bottom,#FAF AF912_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Badge / Indicator */}
        <div 
          ref={badgeRef}
          className="flex items-center gap-3 mb-10 opacity-0"
        >
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
          <span className="text-accent font-figtree text-[10px] uppercase tracking-[0.6em] font-black">
            The Future of Voice
          </span>
        </div>

        {/* Heading */}
        <h1 
          ref={headingRef}
          className="text-text-primary font-poppins text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10 opacity-0 uppercase"
        >
          AI Phone <br /> System
        </h1>

        {/* Subheading */}
        <p 
          ref={subRef}
          className="text-text-primary/60 font-inter text-base md:text-xl font-medium tracking-wide max-w-xl mb-16 opacity-0"
        >
          The call is just the beginning. Everything handled, captured & organised, so you’re always one step ahead.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6 opacity-0">
          <button className="px-12 py-5 bg-accent text-bg rounded-full font-inter font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105 hover:bg-white hover:text-black active:scale-95 shadow-[0_20px_50px_rgba(218,255,2,0.15)]">
            Get Started
          </button>
          
          <button className="px-12 py-5 border border-white/10 text-text-primary/40 rounded-full font-inter font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:border-white/30 hover:text-white">
            Watch Reality Reveal
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="font-figtree text-[8px] uppercase tracking-[0.4em] text-text-primary">Scroll Explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-text-primary to-transparent" />
      </div>
    </section>
  );
}
