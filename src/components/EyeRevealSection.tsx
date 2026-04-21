import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './ParticleField';

gsap.registerPlugin(ScrollTrigger);

export default function EyeRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyePathRef = useRef<SVGPathElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  
  const mainTitleRef = useRef<HTMLDivElement>(null);
  const sectionBeforeRef = useRef<HTMLDivElement>(null);
  const sectionDuringRef = useRef<HTMLDivElement>(null);
  const sectionAfterRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);

  const beforeFeatures = [
    { title: "Smart Caller Pop-Up", desc: "Client details appear instantly as the phone rings, so every call starts with context." },
    { title: "One Click File Access", desc: "Open the full client record in a single click, without interrupting your flow." },
    { title: "Continuity Built In", desc: "See past interactions & property details, so conversations continue naturally." },
    { title: "Works With Your CRM", desc: "Client records & activity are pulled in automatically, keeping everything accurate & up to date.", highlight: true }
  ];

  const duringFeatures = [
    { title: "Call Recording", desc: "Every conversation is captured in full, exactly as it happens." },
    { title: "Live Transcription", desc: "Calls are transcribed in real time, so every word is documented and searchable." },
    { title: "Notes Taken Automatically", desc: "Key points are identified & recorded as you speak, with no need to take notes." }
  ];

  const afterFeatures = [
    { title: "AI Call Summaries & Next Steps", desc: "Every call is summarised with key points & follow-ups clearly identified." },
    { title: "Notes Synced To Your CRM", desc: "Client files are updated automatically, keeping everything accurate & up to date." },
    { title: "Recording & Full Transcription", desc: "Every call is recorded, transcribed, & stored, ready to review at any time." },
    { title: "Sentiment Analysis & Agent Scoring", desc: "Calls are analysed to highlight client sentiment & give visibility of agent performance.", highlight: true },
    { title: "Keyword Search", desc: "Find key details instantly across all calls, without replaying conversations." },
    { title: "Missed Call Tracking & Instant Alerts", desc: "Unanswered calls are flagged & easy to return, so nothing is missed." }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1400%', // Longer to ensure background visibility is enjoyed
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setProgress(Math.round(self.progress * 100));
          }
        },
      });

      tl.addLabel("start", 0);

      // --- PHASE 1: THE REVEAL (Morphing Path instead of scaling container) ---
      // Open the eye
      tl.to(eyePathRef.current, {
        attr: { d: 'M 0 0.5 Q 0.5 -0.1 1 0.5 Q 0.5 1.1 0 0.5 Z' },
        duration: 4,
        ease: 'power2.inOut',
      }, "start");

      // Expand mask to full screen Coverage (Maintaining curves to avoid the sudden 'square' snap)
      tl.to(eyePathRef.current, {
        attr: { d: 'M -5 0.5 Q 0.5 -8 6 0.5 Q 0.5 9 -5 0.5 Z' },
        duration: 8,
        ease: 'power3.in',
      }, "start+=4");

      // --- PHASE 2: GLOBAL TITLE APPEARS ---
      tl.to(mainTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'expo.out'
      }, "start+=2");

      tl.to(mainTitleRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 1.5,
        ease: 'power2.inOut'
      }, "start+=10");

      tl.addLabel("contentStart", 12);

      // --- PHASE 3: BEFORE THE CALL ---
      tl.fromTo(sectionBeforeRef.current, 
        { opacity: 0, y: 50, visibility: 'hidden' },
        { opacity: 1, y: 0, visibility: 'visible', duration: 2 },
        "contentStart"
      );
      tl.from(".card-before", {
        y: 30,
        opacity: 0,
        stagger: 0.8,
        duration: 2,
        ease: 'power2.out'
      }, "contentStart+=0.5");

      tl.to({}, { duration: 4 }); // Reading time

      tl.to(sectionBeforeRef.current, { opacity: 0, y: -30, duration: 1.5 });
      tl.set(sectionBeforeRef.current, { visibility: 'hidden' });

      // --- PHASE 4: DURING THE CALL ---
      tl.fromTo(sectionDuringRef.current, 
        { opacity: 0, y: 50, visibility: 'hidden' },
        { opacity: 1, y: 0, visibility: 'visible', duration: 2 }
      );
      tl.from(".card-during", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.8,
        duration: 2,
        ease: 'back.out(1.2)'
      }, "-=1.5");

      tl.to({}, { duration: 4 });

      tl.to(sectionDuringRef.current, { opacity: 0, y: -30, duration: 1.5 });
      tl.set(sectionDuringRef.current, { visibility: 'hidden' });

      // --- PHASE 5: AFTER THE CALL ---
      tl.fromTo(sectionAfterRef.current, 
        { opacity: 0, y: 50, visibility: 'hidden' },
        { opacity: 1, y: 0, visibility: 'visible', duration: 2 }
      );
      tl.from(".card-after", {
        y: 40,
        opacity: 0,
        stagger: 0.8,
        duration: 2,
        ease: 'power3.out'
      }, "-=1.5");

      tl.to({}, { duration: 4 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-bg"
    >
      {/* Background Atmosphere (Global) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(104,91,199,0.1)_0%,transparent_90%)] opacity-20 pointer-events-none z-0" />

      {/* PERSISTENT BACKGROUND (REVEALED BY MASK) */}
      <div
        ref={bgWrapperRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ clipPath: 'url(#eyeClipReveal)' }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]" />
        <div className="w-full h-full relative opacity-40">
           {/* ParticleField stays at 1:1, never scaled, always animating */}
           <ParticleField />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg opacity-60" />
      </div>

      {/* SVG Mask Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="eyeClipReveal" clipPathUnits="objectBoundingBox">
            <path ref={eyePathRef} d="M 0 0.5 Q 0.5 0.5 1 0.5 Q 0.5 0.5 0 0.5 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Progress Monitor */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col items-center gap-2">
         <span className="text-[10px] font-figtree text-accent font-bold rotate-90 mb-8 tracking-[0.2em]">{progress}%</span>
         <div className="w-px h-24 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-accent transition-all duration-300" style={{ height: `${progress}%` }} />
         </div>
      </div>

      {/* Central Title Overlay */}
      <div 
        ref={mainTitleRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 opacity-0 -translate-y-10 pointer-events-none"
      >
        <h2 className="text-text-primary text-4xl md:text-6xl font-poppins font-black uppercase tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] px-4 mx-auto max-w-5xl leading-[1.1]">
          The Advantage Before, During & After Every Call.
        </h2>
      </div>

      {/* CONTENT CORE */}
      <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-none px-4 md:px-20">
        
        {/* --- SECTION: BEFORE THE CALL --- */}
        <div ref={sectionBeforeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 invisible">
          <div className="max-w-6xl w-full">
            <div className="inline-block px-6 py-2 bg-bg/80 border border-accent/40 text-accent font-figtree text-xs md:text-sm font-bold tracking-[0.3em] uppercase rounded-full mb-6 backdrop-blur-md">
              Before The Call
            </div>
            <div className="mb-10">
              <h3 className="text-text-primary text-3xl md:text-4xl font-poppins font-black uppercase tracking-tighter mb-3">Know more before you answer.</h3>
              <p className="text-text-primary/50 font-inter text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                As the phone rings, a smart caller pop-up shows client details, property information, and past interactions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {beforeFeatures.map((f, i) => (
                <div key={i} className="card-before p-6 bg-white/5 border border-white/5 backdrop-blur-2xl rounded-xl text-left flex flex-col justify-between">
                  <div>
                    <h4 className="text-text-primary font-figtree text-base font-bold mb-3 uppercase tracking-wider">{f.title}</h4>
                    <p className={`font-inter text-sm leading-relaxed ${f.highlight ? 'text-accent font-medium' : 'text-text-primary/40'}`}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION: DURING THE CALL --- */}
        <div ref={sectionDuringRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 invisible">
          <div className="max-w-5xl w-full">
            <div className="inline-block px-6 py-2 bg-bg/80 border border-accent/40 text-accent font-figtree text-xs md:text-sm font-bold tracking-[0.3em] uppercase rounded-full mb-6 backdrop-blur-md">
              During The Call
            </div>
            <div className="mb-10">
              <h3 className="text-text-primary text-3xl md:text-4xl font-poppins font-black uppercase tracking-tighter mb-3">Captured & understood in real time</h3>
              <p className="text-text-primary/50 font-inter text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                Every conversation is recorded, transcribed, and analysed as it happens, with key points identified automatically.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {duringFeatures.map((f, i) => (
                <div key={i} className="card-during p-8 bg-white/5 border border-white/5 backdrop-blur-2xl rounded-xl text-left border-l-2 border-l-accent/40">
                  <h4 className="text-text-primary font-figtree text-lg md:text-xl font-bold mb-4">{f.title}</h4>
                  <p className="text-text-primary/40 font-inter text-sm md:text-base leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION: AFTER THE CALL --- */}
        <div ref={sectionAfterRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 invisible pt-12">
          <div className="max-w-7xl w-full">
            <div className="inline-block px-6 py-2 bg-bg/80 border border-accent/40 text-accent font-figtree text-xs md:text-sm font-bold tracking-[0.3em] uppercase rounded-full mb-6 backdrop-blur-md">
              After The Call
            </div>
            <div className="mb-8">
              <h3 className="text-text-primary text-3xl md:text-4xl font-poppins font-black uppercase tracking-tighter mb-3">Clear on what happens next</h3>
              <p className="text-text-primary/50 font-inter text-sm md:text-base max-w-3xl mx-auto">
                Summaries, notes, & next steps are created instantly and added directly to your CRM.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              {afterFeatures.map((f, i) => (
                <div key={i} className="card-after p-5 md:p-6 bg-white/5 border border-white/5 backdrop-blur-2xl rounded-xl text-left hover:border-accent/20 transition-colors">
                  <h4 className="text-text-primary font-figtree text-sm md:text-base font-bold mb-2 uppercase tracking-tight">{f.title}</h4>
                  <p className={`font-inter text-xs md:text-sm leading-relaxed ${f.highlight ? 'text-accent' : 'text-text-primary/30'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white opacity-20" />
        <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-white opacity-20" />
      </div>
    </section>
  );
}
