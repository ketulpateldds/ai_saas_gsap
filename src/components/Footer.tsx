import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Twitter, Linkedin, Instagram, ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  product: [
    { label: 'AI Phone System', href: '#' },
    { label: 'AI Receptionist', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  company: [
    { label: 'Home', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  legal: [
    { label: 'Data Protection Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ]
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const columns = gsap.utils.toArray('.footer-col');
    
    gsap.fromTo(columns, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-bg pt-24 pb-8 border-t border-white/10 overflow-hidden">
      
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[100px] bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter (Spans 2 columns) */}
          <div className="footer-col lg:col-span-2 flex flex-col">
            <a href="#" className="font-poppins font-black text-2xl tracking-tighter text-white mb-4">
              CORE<span className="text-accent">.</span>AI
            </a>
            <p className="text-white/60 font-inter text-sm leading-relaxed mb-8 max-w-xs">
              Next-generation AI communications engineered to transform your estate agency's workflows.
            </p>

            {/* Newsletter */}
            <div className="mt-auto">
              <h4 className="text-white font-poppins font-semibold text-sm mb-4">Stay updated</h4>
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <Mail className="absolute left-4 w-4 h-4 text-white/40" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-12 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-white/30"
                />
                <button type="submit" className="absolute right-2 w-8 h-8 flex items-center justify-center bg-accent text-bg rounded-full hover:bg-white transition-colors">
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-sm mb-6 uppercase tracking-wider">Product</h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group relative text-white/60 hover:text-white text-sm font-inter transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-sm mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group relative text-white/60 hover:text-white text-sm font-inter transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-sm mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group relative text-white/60 hover:text-white text-sm font-inter transition-colors inline-block">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-col lg:col-span-1">
            <h4 className="text-white font-poppins font-semibold text-sm mb-6 uppercase tracking-wider">Socials</h4>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs font-inter mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CORE.AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-xs font-inter transition-colors">Privacy</a>
            <a href="#" className="text-white/40 hover:text-white text-xs font-inter transition-colors">Terms</a>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-white/40 hover:text-white text-xs font-inter transition-colors ml-4"
            >
              Back to top
              <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-colors">
                <ArrowUp className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
