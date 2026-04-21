import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const insightCards = [
  {
    id: "01",
    subtitle: "Main Intelligence Dashboard",
    title:
      "See your call performance clearly, with a complete view across your agency, all in one central dashboard.",
    color: "#685BC7", // Lavender
  },
  {
    id: "02",
    subtitle: "AI Analytics Dashboard",
    title:
      "Understand what your calls are telling you. AI turns conversations into insights, making trends, performance & missed opportunities immediately visible.",
    color: "#FE572A", // Vibes Orange
  },
  {
    id: "03",
    subtitle: "Leaderboards",
    title:
      "See the top performers across your agency. Compare teams, branches, & individuals to identify who's leading.",
    color: "#DAFF02", // Neon Green
  },
  {
    id: "04",
    subtitle: "Coaching Dashboard",
    title:
      "Improve how every call is handled. Understand what good looks like & where your team can improve.",
    color: "#685BC7", // Lavender
  },
];

export default function InsightsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(insightCards.length + 2) * 100}%`,
          pin: true,
          scrub: 1,
        },
      });

      // --- PHASE 1: Initial Title Reveal ---
      tl.to(
        ".title-main",
        {
          y: -150,
          scale: 0.7,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      );

      tl.to(
        ".title-sub",
        {
          y: -100,
          scale: 0.8,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0.1,
      );

      // --- PHASE 2: 3D Panel Entrance ---
      tl.fromTo(
        panelRef.current,
        {
          z: -1000,
          rotateX: -45,
          opacity: 0,
          scale: 0.5,
        },
        {
          z: 0,
          rotateX: 10, // Slight tilt facing the user
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 1.5,
        },
        0.5,
      );

      // --- PHASE 3: Content Card Rotation & Perspective Shifting ---
      insightCards.forEach((_, index) => {
        const isFirst = index === 0;

        if (!isFirst) {
          // Perspective shift of the WHOLE panel when moving between cards
          tl.to(
            panelRef.current,
            {
              rotateY: index % 2 === 0 ? 15 : -15,
              rotateX: index % 2 === 0 ? -8 : 8,
              z: -150,
              duration: 0.6,
              ease: "power2.inOut",
            },
            `card-${index}-start-=0.3`,
          );

          tl.to(
            panelRef.current,
            {
              rotateY: 0,
              rotateX: 0,
              z: 0,
              duration: 0.6,
              ease: "power2.inOut",
            },
            `card-${index}-start+=0.3`,
          );

          // Previous Card Exit (Starts slightly earlier than entrance to clear space)
          tl.to(
            cardRefs.current[index - 1],
            {
              opacity: 0,
              rotateX: 45,
              y: -50,
              z: -100,
              duration: 0.6,
              ease: "power2.in",
            },
            `card-${index}-start`,
          );

          // Card Entrance
          tl.fromTo(
            cardRefs.current[index],
            {
              opacity: 0,
              rotateX: -45,
              y: 50,
              z: -100,
            },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              z: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            `card-${index}-start+=0.2`,
          );
        } else {
          // First card initial state setup
          tl.set(
            cardRefs.current[0],
            { opacity: 1, rotateX: 0, y: 0, z: 0 },
            1.5,
          );
          tl.addLabel("card-1-start", 2); // Initial offset for first card display
        }

        // Add a gap between cards for user to read
        tl.to({}, { duration: 1.5 }); // Dummy tween for pause
        tl.addLabel(`card-${index + 1}-start`);
      });

      // --- PHASE 4: Final Scroll Out ---
      tl.to(
        panelRef.current,
        {
          scale: 0.8,
          rotateX: 20,
          y: -1000,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        "+=0.5",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg text-text-primary select-none group"
      style={{ perspective: "1200px" }}
    >
      {/* STAGE 1: Central Headings */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none pt-24 lg:pt-0">
        <div className="title-main text-center">
          <h1 className="text-[10vw] md:text-[8vw] font-poppins font-black leading-[0.9] tracking-tighter mb-4 uppercase">
            THE CORE
            <br />
            AI CAPABILITIES
          </h1>
        </div>
      </div>

      {/* STAGE 2: 3D Panel */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-24 lg:pt-0">
        <div
          ref={panelRef}
          className="relative w-[90vw] lg:w-[80vw] max-w-4xl aspect-square md:aspect-video bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[2rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Content Cards */}
          <div className="relative w-full h-full p-8 md:p-12 lg:p-20 overflow-hidden">
            {insightCards.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 lg:px-24 will-change-transform opacity-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-bg text-[25vw] md:text-[15vw] font-poppins font-black absolute right-4 md:right-10 top-1/2 -translate-y-1/2 opacity-40 z-0 pointer-events-none">
                  {card.id}
                </span>
                <h4
                  className="font-figtree text-[10px] md:text-xs lg:text-sm font-black uppercase tracking-[0.3em] mb-4 md:mb-6"
                  style={{ color: card.color }}
                >
                  {card.subtitle}
                </h4>
                <h5 className="text-2xl md:text-3xl lg:text-5xl font-poppins font-black text-text-primary leading-[1.1] max-w-2xl z-10">
                  {card.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
