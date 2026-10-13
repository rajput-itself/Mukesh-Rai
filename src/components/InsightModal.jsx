import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowUp } from 'lucide-react';

export default function InsightModal({ insight, isOpen, onClose }) {
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

  if (!isOpen || !insight) return null;

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
          className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-[#0e1017] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl z-10 flex flex-col text-slate-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="shrink-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0e1017] border-b border-white/10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-blue-400">
                EXECUTIVE ESSAY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
                {insight.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close Essay"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={modalScrollRef}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
            }}
          >
            <div>
              <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 font-mono mb-3 sm:mb-4">
                <span>{insight.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {insight.readTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
                {insight.title}
              </h2>
              <div className="p-3.5 sm:p-4 rounded-lg bg-blue-950/20 border-l-2 border-blue-500 text-slate-300 font-editorial text-base sm:text-lg italic leading-relaxed">
                "{insight.excerpt}"
              </div>
            </div>

            <div className="thin-rule-subtle" />

            <div className="prose prose-invert max-w-none text-slate-300 space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed font-normal whitespace-pre-line">
              {insight.fullText}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Mukesh Rai</p>
                <p className="text-xs text-slate-400">Managing Director & CEO • AAPRIN Technologies</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={scrollToModalTop}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Top</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-5 py-2 text-xs font-medium uppercase tracking-wider bg-white/10 hover:bg-white/15 rounded-lg transition-colors text-center cursor-pointer text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
