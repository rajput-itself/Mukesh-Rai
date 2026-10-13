import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Cpu, Layers, TrendingUp, Lightbulb, ArrowUp } from 'lucide-react';

export default function CaseStudyModal({ project, isOpen, onClose }) {
  const modalScrollRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const { caseStudy } = project;

  const scrollToModalTop = () => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 overscroll-contain"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06070a]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-[#0e1017] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl z-10 flex flex-col text-slate-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="shrink-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0e1017] border-b border-white/10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-blue-400">
                CASE STUDY {project.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={modalScrollRef}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-12 space-y-8 sm:space-y-12"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
            }}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-4 sm:mb-6">
                {project.tagline}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-5 border-y border-white/10 text-xs">
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider font-mono mb-1 text-[10px] sm:text-xs">Role</span>
                  <span className="text-slate-200 font-medium">{project.role}</span>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider font-mono mb-1 text-[10px] sm:text-xs">Organization</span>
                  <span className="text-slate-200 font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider font-mono mb-1 text-[10px] sm:text-xs">Timeline</span>
                  <span className="text-slate-200 font-medium">{project.year}</span>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase tracking-wider font-mono mb-1 text-[10px] sm:text-xs">Core Tech</span>
                  <span className="text-slate-200 font-medium">{project.tags.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-slate-900 aspect-[16/9]">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 sm:space-y-10">
              <div className="border-l-2 border-red-500/60 pl-4 sm:pl-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">What problem existed?</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                  {caseStudy.challenge}
                </p>
              </div>

              <div className="border-l-2 border-blue-500/60 pl-4 sm:pl-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400">
                  <Layers className="w-4 h-4" />
                  <span>The Approach</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">How was it solved?</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                  {caseStudy.approach}
                </p>
              </div>

              <div className="border-l-2 border-emerald-500/60 pl-4 sm:pl-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                  <Cpu className="w-4 h-4" />
                  <span>The Technology</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">What was built?</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                  {caseStudy.technology}
                </p>
              </div>

              <div className="border-l-2 border-amber-500/60 pl-4 sm:pl-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Impact</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">What changed?</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                  {caseStudy.impact}
                </p>
              </div>

              <div className="border-l-2 border-purple-500/60 pl-4 sm:pl-6 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>The Lesson</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">What was learned?</h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal italic">
                  "{caseStudy.lesson}"
                </p>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] sm:text-xs text-slate-500 font-mono text-center sm:text-left">
                ARCHITECTURAL DIRECTIVE • VERIFIED OUTCOMES
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={scrollToModalTop}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Top</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer shadow-lg shadow-blue-900/30"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
