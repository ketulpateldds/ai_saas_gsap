import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "1",
    title: "We handle the setup",
    desc: "We take care of everything, from system configuration & CRM integration to number porting. No technical work required from your side.",
  },
  {
    number: "2",
    title: "Go live in days",
    desc: "Once configured & tested, your system goes live quickly. Your team is guided through everything, so they're confident from day one.",
  },
  {
    number: "3",
    title: "Start seeing the difference",
    desc: "Calls are handled, captured & tracked seamlessly, with more opportunities converted & less time spent on admin.",
  },
];

export const SetupSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reveal the Heading when section top hits 60% of viewport
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Reveal the description slightly later when section top hits 50%
      gsap.from(descRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });

      mm.add("(min-width: 768px)", () => {
        const cardsWrapper = cardsWrapperRef.current;
        if (!cardsWrapper) return;

        const getScrollAmount = () =>
          cardsWrapper.scrollWidth - window.innerWidth + 200;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Fade out the container holding the heading as cards slide in (resolving conflicts)
        tl.to(
          textContainerRef.current,
          {
            opacity: 0,
            x: -100,
            ease: "power2.inOut",
            duration: 0.4,
          },
          0,
        );

        // Move wrapper horizontally past the left section completely
        tl.to(
          cardsWrapper,
          {
            x: () => -getScrollAmount(),
            ease: "none",
            duration: 1,
          },
          0,
        );

        // Cards appear diagonally from bottom-right (y & x offset interpolation)
        const cards = gsap.utils.toArray(".setup-card");
        tl.from(
          cards,
          {
            x: 300,
            y: 350,
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
            ease: "sine.out",
            duration: 0.6,
          },
          0,
        );

        return () => {};
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray(".setup-card");
        cards.forEach((card: any, idx) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
            y: 60,
            x: 40,
            opacity: 0,
            duration: 0.8,
            delay: idx * 0.15,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen md:h-screen bg-bg text-text-primary flex flex-col md:flex-row overflow-visible md:overflow-hidden relative z-20"
    >
      {/* Left Side: Pinned content, absolutely positioned to allow overlay naturally without clashing */}
      <div
        ref={textContainerRef}
        className="w-full md:absolute md:top-0 md:left-0 md:w-[45%] h-[35vh] md:h-full flex flex-col justify-center px-8 md:px-12 lg:px-20 z-10 pointer-events-none"
      >
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-7xl font-poppins font-bold tracking-tighter mb-4 md:mb-8 mt-10 md:mt-0 text-white leading-tight"
        >
          Set up around <br className="hidden md:block" /> your agency
        </h2>
        <p
          ref={descRef}
          className="text-white/70 text-sm md:text-base lg:text-xl font-inter leading-relaxed max-w-md"
        >
          Configured around your workflows, call handling & systems, so you can
          get started quickly without changing how you work.
        </p>
      </div>

      {/* Right Side: Horizontal Scrolling Track - completely blending with the dark theme */}
      <div
        ref={rightContainerRef}
        className="w-full md:w-full flex-1 md:h-full flex items-start md:items-center bg-transparent overflow-visible relative z-20 md:ml-auto"
      >
        <div
          ref={cardsWrapperRef}
          className="flex flex-col md:flex-row items-stretch gap-12 md:gap-20 px-6 md:pl-[50vw] md:pr-[20vw] w-full md:w-max h-auto py-10 md:py-0"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              // Removed box backgrounds! Just beautifully formatted text floating with precision spacing.
              className="setup-card w-full md:w-[35vw] lg:w-[30vw] xl:w-[26vw] flex flex-col items-start justify-start text-left shrink-0"
            >
              <div className="text-5xl md:text-7xl font-black font-poppins mb-6 text-accent/50 tracking-tighter select-none">
                {step.number}
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold mb-4 md:mb-6 text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-white/60 font-inter text-base md:text-lg leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
