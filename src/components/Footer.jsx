import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#07080b] border-t border-white/[0.08] text-slate-400 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/[0.06]">
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
              Mukesh Rai
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Managing Director & CEO • Technology Executive
            </p>
            <p className="text-xs text-slate-500 font-mono max-w-sm leading-relaxed">
              Leading AAPRIN Technologies & Solution LLP and MPA Solution. Architecting high-concurrency systems, applied AI, and organizational digital transformation.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1.5 sm:mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs tracking-wider font-medium">
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#leadership" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="#company" className="hover:text-white transition-colors">Company</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-1.5 sm:mb-2">
              Direct Channels
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-xs lowercase tracking-wider font-medium"
                >
                  LinkedIn →
                </a>
              </li>
              <li>
                <a
                  href="https://aaprin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-xs lowercase tracking-wider font-medium"
                >
                  aaprin.com →
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aaprin.com"
                  className="hover:text-white transition-colors text-xs lowercase tracking-wider font-medium"
                >
                  contact@aaprin.com →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-slate-500 text-center sm:text-left">
          <p>© 2026 Mukesh Rai. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Pune, Maharashtra, India</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-[11px] p-1.5 rounded"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
