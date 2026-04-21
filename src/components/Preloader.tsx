import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mic, PhoneCall, Building } from "lucide-react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Lock scrolling while preloader runs
      document.body.style.overflow = "hidden";

      // Status text update array logic to explain the product during load
      const statuses = [
        "Connecting Estate Agency CRM...",
        "Training AI Voice Models...",
        "Configuring 24/7 Receptionist...",
        "System Ready: Awaiting Calls.",
      ];

      const tl = gsap.timeline({
        onComplete: () => {
          // Unlock scrolling and hide container completely when done
          document.body.style.overflow = "";
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          // Force scrolltrigger to recalculate its positions after the curtain lifts
          window.dispatchEvent(new Event("resize"));
        },
      });

      // Initial setup
      gsap.set(textWrapperRef.current, { y: 30, opacity: 0 });

      // 1. AI Voice Waveform Infinite Animation
      const bars = gsap.utils.toArray(".wave-bar");
      gsap.to(bars, {
        scaleY: 0.2,
        transformOrigin: "center center",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.1,
          from: "center",
        },
        duration: 0.4,
        ease: "sine.inOut",
      });

      // 2. Text and UI fade-in
      tl.to(textWrapperRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      // 3. Count up to 100 & cycle through Estate Agency AI statuses
      let statusObj = { val: 0 };
      tl.to(
        statusObj,
        {
          val: statuses.length - 1,
          duration: 2.2,
          snap: { val: 1 },
          onUpdate: () => {
            if (statusRef.current) {
              statusRef.current.innerText = statuses[statusObj.val];
            }
          },
        },
        "-=0.5",
      );

      tl.to(
        counterRef.current,
        {
          innerHTML: 100,
          duration: 2.2,
          snap: { innerHTML: 1 },
          ease: "power3.inOut",
        },
        "<",
      );

      // 4. Staggered exit
      tl.to(
        textWrapperRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power3.in",
        },
        "+=0.3",
      );

      // 5. The primary curtain lifts away cleanly
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none"
    >
      {/* The Solid Black Curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-bg flex items-center justify-center flex-col overflow-hidden will-change-transform"
      >
        {/* Ambient Site-Themed Accent Glow */}
        <div className="absolute w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        <div
          ref={textWrapperRef}
          className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg px-6"
        >
          {/* Animated AI Voice Waveform representing the Phone Agent */}
          <div className="relative flex items-center justify-center mb-4">
            {/* Central Icon */}
            <div className="absolute z-20 flex items-center justify-center bg-bg rounded-full p-4 border border-accent/20 shadow-[0_0_30px_rgba(218,255,2,0.15)]">
              <Mic className="w-8 h-8 text-accent animate-pulse" />
            </div>

            {/* SVG Waveform Bars circling the mic */}
            <svg
              viewBox="0 0 200 100"
              className="w-48 h-24 text-accent drop-shadow-[0_0_10px_rgba(218,255,2,0.4)]"
              fill="currentColor"
            >
              <g className="origin-center">
                <rect
                  className="wave-bar"
                  x="20"
                  y="20"
                  width="6"
                  height="60"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="40"
                  y="10"
                  width="6"
                  height="80"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="60"
                  y="25"
                  width="6"
                  height="50"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="80"
                  y="5"
                  width="6"
                  height="90"
                  rx="3"
                />

                {/* Skip middle for the icon */}

                <rect
                  className="wave-bar"
                  x="114"
                  y="5"
                  width="6"
                  height="90"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="134"
                  y="25"
                  width="6"
                  height="50"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="154"
                  y="10"
                  width="6"
                  height="80"
                  rx="3"
                />
                <rect
                  className="wave-bar"
                  x="174"
                  y="20"
                  width="6"
                  height="60"
                  rx="3"
                />
              </g>
            </svg>
          </div>

          {/* AI Estate Agency Context Elements */}
          <div className="flex items-center gap-4 text-white/50 mb-2">
            <Building className="w-5 h-5 text-accent/70" />
            <span className="font-mono text-[10px] tracking-widest uppercase">
              AI Estate Agency Voice Protocol
            </span>
            <PhoneCall className="w-5 h-5 text-accent/70" />
          </div>

          {/* Dynamic Status Text */}
          <div
            ref={statusRef}
            className="font-inter text-accent text-sm md:text-base font-semibold tracking-wide text-center h-6"
          >
            Booting AI Phone System...
          </div>

          {/* Loading Numbers */}
          <div className="font-poppins font-black text-white text-6xl md:text-8xl flex items-end tracking-tighter mt-4">
            <span ref={counterRef} className="w-[3ch] text-right">
              0
            </span>
            <span className="text-3xl md:text-5xl text-accent mb-2 ml-2">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
