import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitTopRef = useRef<HTMLDivElement>(null);
  const splitBottomRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Total scroll distance for all phases
          pin: true,
          scrub: 1,
        },
      });

      // --- PHASE 1: The Split Reveal ---
      masterTl.to(
        splitTopRef.current,
        {
          yPercent: -100,
          ease: "power2.inOut",
          duration: 2,
        },
        0,
      );

      masterTl.to(
        splitBottomRef.current,
        {
          yPercent: 100,
          ease: "power2.inOut",
          duration: 2,
        },
        0,
      );

      // --- PHASE 2: Content Entrance ---
      // This happens as the split is occurring
      masterTl.fromTo(
        ".intro-center-text",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        0.5,
      );

      masterTl.fromTo(
        ".intro-img-left",
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5 },
        0.8,
      );

      masterTl.fromTo(
        ".intro-img-right",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5 },
        0.8,
      );

      // Reveal the counter after the split opens
      masterTl.to(
        ".intro-counter",
        {
          opacity: 1,
          duration: 1,
        },
        0.8,
      );
      const counterValue = { val: 0 };
      masterTl.to(
        counterValue,
        {
          val: 50,
          duration: 2,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText = Math.floor(
                counterValue.val,
              ).toString();
            }
          },
        },
        1,
      );

      // --- PHASE 3: The Feature Scroll ---
      // We transition from the intro content to the feature layout
      masterTl.to(
        introContentRef.current,
        {
          opacity: 0,
          y: -100,
          duration: 1,
          display: "none",
        },
        3,
      );

      masterTl.fromTo(
        featureSectionRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          display: "grid",
        },
        3.5,
      );

      // Feature Scroll Logic
      // Card 1 to Card 2 transition (Dashboard Image Change)
      masterTl.to(
        ".dashboard-img-1",
        { opacity: 0, scale: 0.8, duration: 1 },
        5,
      );
      masterTl.fromTo(
        ".dashboard-img-2",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1 },
        5,
      );

      // Card 2 to Card 3 transition
      masterTl.to(
        ".dashboard-img-2",
        { opacity: 0, scale: 0.8, duration: 1 },
        7,
      );
      masterTl.fromTo(
        ".dashboard-img-3",
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1 },
        7,
      );

      // Right column scrolling effect (the cards themselves)
      masterTl.to(
        ".feature-cards-track",
        {
          yPercent: -66.6, // Move up through the 3 cards
          ease: "none",
          duration: 5,
        },
        4.5,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg text-text-primary font-inter"
    >
      {/* PHASE 1 OVERLAY: The Split Text */}
      <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        {/* Top Half */}
        <div
          ref={splitTopRef}
          className="absolute inset-0 bg-text-primary flex items-center justify-center will-change-transform"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          <h1 className="text-[20vw] font-poppins font-black text-bg tracking-tighter leading-none select-none">
            REVIEWS
          </h1>
        </div>
        {/* Bottom Half */}
        <div
          ref={splitBottomRef}
          className="absolute inset-0 bg-text-primary flex items-center justify-center will-change-transform"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <h1 className="text-[20vw] font-poppins font-black text-bg tracking-tighter leading-none select-none">
            REVIEWS
          </h1>
        </div>
      </div>

      {/* PHASE 2: Intro Content (Revealed Underneath) */}
      <div
        ref={introContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center p-10 z-10"
      >
        <div className="intro-img-left absolute left-10 top-1/2 -translate-y-1/2 w-72 aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-0 bg-zinc-900">
          <img
            src="https://picsum.photos/seed/person1/600/600"
            alt="Testimonial 1"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="intro-img-right absolute right-10 top-20 w-80 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 opacity-0 bg-zinc-900">
          <img
            src="https://picsum.photos/seed/person2/800/600"
            alt="Testimonial 2"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="intro-center-text text-center z-20 opacity-0">
          <h2 className="text-6xl font-poppins font-black mb-4 uppercase tracking-tighter leading-none text-text-primary">
            COMMUNITY
          </h2>
          <p className="font-figtree text-xl text-text-primary/60 mb-8 max-w-md mx-auto leading-tight italic">
            Trusted by modern agencies & sales teams worldwide. The results
            speak for themselves.
          </p>
          <button className="px-8 py-3 bg-accent text-bg font-inter font-bold rounded-full transition-transform hover:scale-105 active:scale-95 text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(218,255,2,0.1)]">
            Read Stories →
          </button>
        </div>

        <div className="intro-counter mt-20 text-center opacity-0">
          <div className="flex items-center justify-center gap-2">
            <span
              ref={counterRef}
              className="text-[12vw] font-poppins font-black leading-none tracking-tighter text-text-primary"
            >
              0
            </span>
            <span className="text-[12vw] font-poppins font-black leading-none tracking-tighter text-accent">
              K+
            </span>
          </div>
          <p className="text-text-primary/40 font-figtree uppercase tracking-[0.5em] text-xs font-bold -mt-4">
            Users trusting AI Receptionist
          </p>
        </div>

        <div className="intro-img-right absolute right-12 bottom-10 w-96 aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="https://picsum.photos/seed/person3/800/450"
            alt="Testimonial 3"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* PHASE 3: Feature Scroll Animation */}
      <div
        ref={featureSectionRef}
        className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-[1.2fr_1fr] hidden z-10"
      >
        {/* Left Side: Immersive Car Background and Title */}
        <div className="relative flex-none h-[40vh] lg:h-full overflow-hidden">
          {/* Background Car Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2048&auto=format&fit=crop"
              alt="Team Success"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-bg/70 md:bg-bg/60" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 pt-28 lg:pt-0">
            <h2 className="text-[12vw] md:text-[9vw] lg:text-[7vw] font-poppins font-black italic uppercase leading-[0.9] lg:leading-[0.8] tracking-tighter mb-6 lg:mb-10 text-text-primary drop-shadow-2xl">
              WHAT <br className="hidden lg:block" />
              AGENCIES <br className="hidden lg:block" />
              ARE SEEING <br className="hidden lg:block" />
            </h2>
            <div className="w-[15vw] h-px bg-white/30 mb-6 lg:mb-8 hidden lg:block" />
            <p className="text-sm md:text-lg lg:text-xl text-text-primary/80 max-w-sm font-figtree font-medium italic mb-6 lg:mb-10 leading-relaxed">
              Discover how forward-thinking estate agencies transformed their
              operations with our AI-powered receptionists.
            </p>
            <button className="w-fit px-8 lg:px-10 py-3 bg-bg text-text-primary border border-white/20 font-inter font-bold rounded-full text-[10px] lg:text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-colors">
              Explore more →
            </button>
          </div>
        </div>

        {/* Right Side: Dashboard UI & Scrolling Text */}
        <div className="relative flex-1 lg:h-full bg-[#1A1A1A] flex flex-col items-center justify-center px-4 md:px-10 overflow-hidden pt-10 lg:pt-0 pb-10 lg:pb-0">
          {/* Sticky Dashboard Image */}
          <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)] z-0">
            <div className="absolute inset-0 dashboard-img-1">
              <img
                src="https://picsum.photos/seed/success1/1200/675"
                alt="Success 1"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 dashboard-img-2 opacity-0">
              <img
                src="https://picsum.photos/seed/success2/1200/675"
                alt="Success 2"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 dashboard-img-3 opacity-0">
              <img
                src="https://picsum.photos/seed/success3/1200/675"
                alt="Success 3"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Scrolling Feature Content OVER the UI */}
          <div className="absolute inset-0 z-10 pointer-events-none px-20">
            <div className="feature-cards-track flex flex-col gap-[30vh]">
              {/* Placeholder for spacing */}
              <div className="h-[20vh]" />

              {/* Feature Card 1 */}
              <div className="bg-bg/40 backdrop-blur-xl border border-white/5 p-10 rounded-[32px] pointer-events-auto">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl font-figtree font-black tracking-tighter uppercase">
                    THE STOW BROTHERS
                  </span>
                  <div className="flex text-accent">★★★★★</div>
                </div>
                <p className="text-xl text-text-primary/80 font-inter font-medium leading-relaxed italic">
                  "The new software is so smart and feels like we are so much
                  more advanced now."
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-bg/40 backdrop-blur-xl border border-white/5 p-10 rounded-[32px] pointer-events-auto">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl font-figtree font-black tracking-tighter uppercase">
                    GREY & CO
                  </span>
                  <div className="flex text-accent">★★★★★</div>
                </div>
                <p className="text-xl text-text-primary/80 font-inter font-medium leading-relaxed italic">
                  "Super innovative with the AI-integration & makes life a lot
                  easier when tracing back the details of previous calls."
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-bg/40 backdrop-blur-xl border border-white/5 p-10 rounded-[32px] pointer-events-auto">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl font-figtree font-black tracking-tighter uppercase">
                    HUNTERS
                  </span>
                  <div className="flex text-accent">★★★★★</div>
                </div>
                <p className="text-xl text-text-primary/80 font-inter font-medium leading-relaxed italic">
                  "Callers files & property history pop-up straight away. We've
                  reduced missed follow-ups & AI summaries make notes
                  effortless."
                </p>
              </div>

              <div className="h-[20vh]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
