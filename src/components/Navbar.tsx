import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navLinks = [
  'Home',
  'AI Phone System',
  'AI Receptionist',
  'Pricing',
  'Integrations',
  'Contact'
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  
  const navRef = useRef<HTMLElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll event for glassy navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial load animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate navbar sliding down
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Stagger animate desktop links
      if (linksWrapRef.current) {
        gsap.from(linksWrapRef.current.children, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return;
    
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          display: 'flex'
        });
        
        gsap.fromTo('.mobile-link', 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
          isScrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-1 z-[110]">
            <span className="text-2xl font-poppins font-black tracking-tighter text-text-primary">
              CORE<span className="text-accent">.</span>AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksWrapRef} className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveItem(link)}
                className={`relative font-figtree text-[13px] tracking-wide uppercase transition-colors duration-300 group ${
                  activeItem === link ? 'text-text-primary font-bold' : 'text-text-primary/60 hover:text-text-primary font-semibold'
                }`}
              >
                {link}
                <span 
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                    activeItem === link 
                      ? 'bg-accent opacity-100 scale-100' 
                      : 'bg-text-primary opacity-0 scale-0 group-hover:opacity-30 group-hover:scale-100'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block z-[110]">
            <button className="px-6 py-2.5 bg-text-primary text-bg rounded-full font-poppins font-semibold text-xs tracking-widest uppercase hover:bg-accent transition-colors duration-300">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-text-primary p-2 z-[110]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-bg/95 backdrop-blur-2xl z-[90] flex-col justify-center items-center gap-8"
        style={{ display: 'none', transform: 'translateY(-100%)', opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-6 w-full px-6">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActiveItem(link);
                setIsOpen(false);
              }}
              className={`mobile-link text-2xl font-poppins font-black uppercase tracking-widest ${
                activeItem === link ? 'text-accent' : 'text-text-primary/80'
              }`}
            >
              {link}
            </button>
          ))}
          
          <button className="mobile-link mt-8 px-8 py-4 w-full max-w-sm bg-text-primary text-bg rounded-full font-poppins font-bold text-sm tracking-widest uppercase hover:bg-accent transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
