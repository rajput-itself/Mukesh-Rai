import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Company', href: '#company' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['work', 'about', 'leadership', 'expertise', 'company', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -60, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'py-3 sm:py-3.5 bg-[#08090d]/85 backdrop-blur-md border-b border-white/[0.08]'
            : 'py-4 sm:py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group tracking-tight"
            aria-label="Mukesh Rai Home"
          >
            <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs tracking-widest text-white group-hover:border-blue-500/50 transition-colors">
              MR
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-blue-400 transition-colors">
                Mukesh Rai
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                Director & CEO
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#08090d]/98 backdrop-blur-xl md:hidden pt-24 sm:pt-28 px-6 sm:px-8 flex flex-col justify-between pb-8 sm:pb-12 border-b border-white/10 overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500">
                Navigation
              </span>
              <nav className="flex flex-col space-y-5">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-2xl font-semibold tracking-tight text-slate-200 hover:text-white flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Theme Appearance
                </span>
                <ThemeToggle showLabel={true} />
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Executive Office
                </p>
                <p className="text-sm text-slate-300 font-medium">
                  AAPRIN Technologies & Solution LLP • MPA Solution • Pune, India
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
