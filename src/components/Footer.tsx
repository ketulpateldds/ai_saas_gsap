import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUp,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  product: [
    { label: "AI Phone System", href: "#" },
    { label: "AI Receptionist", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  company: [
    { label: "Home", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  legal: [
    { label: "Data Protection Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const hoverTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // 1. Column stagger with clipPath (smooth reveal)
      const columns = gsap.utils.toArray(".footer-col");

      gsap.fromTo(
        columns,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        },
      );

      // 2. Huge parallax watermark text scrub
      gsap.fromTo(
        scrollTextRef.current,
        { y: -100, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1, // Wrapper becomes fully visible
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
        },
      );

      // 3. Magnetic Hover & Letter Spacing Effect
      const el = hoverTextRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        xTo(x * 0.15); // Control magnetic strength
        yTo(y * 0.15);
      };

      const handleEnter = () => {
        gsap.to(el, {
          letterSpacing: "0.08em",
          scale: 1.02,
          rotation: 1.5,
          color: "rgba(218, 255, 2, 0.4)", // Premium accent glow
          textShadow: "0px 0px 80px rgba(218, 255, 2, 0.4)",
          duration: 0.6,
          ease: "expo.out",
        });
      };

      const handleLeave = () => {
        gsap.to(el, {
          letterSpacing: "0em",
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          color: "rgba(255, 255, 255, 0.03)", // Back to default subtle watermark
          textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
          duration: 0.8,
          ease: "power3.out",
        });
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: footerRef },
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#080808] pt-24 pb-8 overflow-hidden rounded-t-[40px] z-20 border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-xl h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20 relative z-20">
          {/* Brand & Newsletter (Spans 2 columns) */}
          <div className="footer-col lg:col-span-2 flex flex-col">
            <a
              href="#"
              className="font-poppins font-black text-3xl tracking-tighter text-white mb-4 flex items-center gap-1"
            >
              CORE<span className="text-accent">.</span>AI
            </a>
            <p className="text-white/60 font-inter text-sm leading-relaxed mb-8 max-w-xs">
              Next-generation AI communications engineered to transform your
              estate agency's workflows and redefine client interactions.
            </p>

            {/* Premium Newsletter Input */}
            <div className="mt-auto">
              <h4 className="text-white font-poppins font-semibold text-sm mb-4 tracking-wide uppercase">
                Join the vanguard
              </h4>
              <form
                className="relative flex items-center group"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur duration-500" />
                <div className="relative w-full flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-white/40 group-focus-within:text-accent transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#111111] border border-white/10 rounded-full py-3.5 pl-11 pr-14 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-white/30 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 flex items-center justify-center bg-accent text-bg rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(218,255,2,0.3)]"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-col lg:col-span-1 lg:ml-8">
            <h4 className="text-white font-poppins font-semibold text-xs mb-6 uppercase tracking-[0.2em] opacity-40">
              Platform
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group relative text-white/70 hover:text-white text-sm font-inter transition-colors inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-xs mb-6 uppercase tracking-[0.2em] opacity-40">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group relative text-white/70 hover:text-white text-sm font-inter transition-colors inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-xs mb-6 uppercase tracking-[0.2em] opacity-40">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group relative text-white/70 hover:text-white text-sm font-inter transition-colors inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-xs mb-6 uppercase tracking-[0.2em] opacity-40">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center text-white/60 hover:text-bg hover:border-accent hover:bg-accent transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center text-white/60 hover:text-bg hover:border-accent hover:bg-accent transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4 fill-current" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center text-white/60 hover:text-bg hover:border-accent hover:bg-accent transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* The Massive Watermark Brand Element */}
        <div
          ref={scrollTextRef}
          className="relative w-full flex justify-center items-center mt-10 mb-6 overflow-visible pointer-events-auto"
        >
          <h1
            ref={hoverTextRef}
            className="text-[18vw] leading-[0.8] font-poppins font-black text-white/[0.03] text-center whitespace-nowrap select-none cursor-pointer will-change-transform"
          >
            CORE.AI
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="footer-col relative z-20 flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs font-inter mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CORE.AI. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-white text-xs font-inter transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-xs font-inter transition-colors"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-white/40 hover:text-accent text-xs font-inter transition-colors ml-2 md:ml-6"
            >
              <span className="uppercase tracking-widest font-semibold text-[10px]">
                Back to top
              </span>
              <span className="w-8 h-8 rounded-full bg-[#111111] border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg group-hover:border-accent transition-all">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
