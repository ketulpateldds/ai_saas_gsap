import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="h-[60vh] flex flex-col items-center justify-center bg-bg relative px-6 text-center"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <h2 
        ref={titleRef}
        className="text-text-primary text-4xl md:text-7xl font-poppins font-black uppercase tracking-tighter mb-12 drop-shadow-2xl"
      >
        Ready To Transform <br className="hidden md:block" /> Your Estate Agency?
      </h2>

      <button 
        ref={buttonRef}
        className="group relative px-10 py-5 bg-accent text-bg rounded-full font-inter font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_50px_rgba(218,255,2,0.15)] transition-all hover:bg-white hover:scale-105 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10">Get A Tailored Quote</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
      </button>

      {/* Subtle bottom separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
