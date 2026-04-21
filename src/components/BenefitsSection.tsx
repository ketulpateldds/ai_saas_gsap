import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CalendarPlus,
  Target,
  TrendingUp,
  Clock,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "More Bookings Without More Calls",
    desc: "Capture more opportunities & convert inquiries, without increasing workload.",
    icon: CalendarPlus,
  },
  {
    title: "No Missed Opportunities",
    desc: "Every call answered, every inquiry captured, every follow-up clear.",
    icon: Target,
  },
  {
    title: "Stronger Performance Across Your team",
    desc: "Understand what good looks like & improve how every call is handled.",
    icon: TrendingUp,
  },
  {
    title: "Less Admin, More Time To Focus On Clients",
    desc: "Notes, summaries & updates handled automatically, with no manual work needed.",
    icon: Clock,
  },
  {
    title: "Decisions Backed By Real Insight",
    desc: "See what's working, fix what's not, & move your agency forward with confidence.",
    icon: Lightbulb,
  },
  {
    title: "More Professional, Consistent Client Experience",
    desc: "Every call is handled clearly & consistently, building trust, improving satisfaction & strengthening your brand.",
    icon: ShieldCheck,
  },
];

interface BenefitsCardProps {
  title: string;
  desc: string;
  icon: React.ElementType;
  refTrigger?: React.Ref<HTMLDivElement>;
}

const BenefitsCard: React.FC<BenefitsCardProps> = ({
  title,
  desc,
  icon: Icon,
  refTrigger,
}) => {
  return (
    <div
      ref={refTrigger}
      className="benefit-card w-[85vw] md:w-[32vw] lg:w-[28vw] flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-start shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-transform duration-300"
    >
      <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/20 border border-accent/30 rounded-2xl flex items-center justify-center mb-6 text-accent shrink-0">
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <h3 className="text-xl md:text-2xl font-poppins font-bold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base font-inter text-text-primary/70 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Only run horizontal scroll on desktop (md and up)
      const mm = gsap.matchMedia();

      // Background Heading Animation (Works for both mobile and desktop)
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray(".benefit-card");
        const container = cardsWrapperRef.current;

        if (!container || cards.length === 0) return;

        // Calculate scroll horizontally equivalent to exactly container bounds
        const getScrollAmount = () => container.scrollWidth - window.innerWidth;

        // Card entry from right stagger and pin
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

        // Move the container perfectly so its right edge touches the screen's right edge
        tl.to(container, {
          x: () => -getScrollAmount(),
          ease: "none",
          duration: 1,
        });

        // We add a specific scale trigger for each card as it approaches center
        cards.forEach((card: any) => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            backgroundColor: "rgba(255,255,255,0.1)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left center",
              end: "right center",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          });
        });

        return () => {
          // cleanup
        };
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile vertical animation
        const cards = gsap.utils.toArray(".benefit-card");

        cards.forEach((card: any) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-bg text-text-primary overflow-hidden flex flex-col justify-center py-20 px-4 md:px-0 z-20"
    >
      {/* Background embellishments */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Persistent Heading */}
      <div
        ref={headingRef}
        className="w-full text-center px-4 mb-12 md:mb-16 md:absolute md:top-24 md:left-0 md:z-10 bg-gradient-to-b from-bg via-bg to-transparent pb-10"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-poppins font-black uppercase tracking-tighter drop-shadow-lg text-white">
          The Advantage For
          <br className="hidden md:block" /> Your Estate Agency
        </h2>
      </div>

      {/* Cards Horizontal Wrapper (Desktop) / Vertical Stack (Mobile) */}
      <div className="w-full h-[380px] flex items-center md:items-stretch md:mt-10 z-20">
        <div
          ref={cardsWrapperRef}
          className="flex flex-col md:flex-row gap-6 md:gap-10 md:pl-[100vw] md:pr-[50vw] items-stretch w-full md:w-max mt-10 md:mt-20"
        >
          {benefits.map((benefit, idx) => (
            <BenefitsCard
              key={idx.toString()}
              title={benefit.title}
              desc={benefit.desc}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
