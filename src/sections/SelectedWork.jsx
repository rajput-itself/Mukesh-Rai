import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { projects } from '../data/projects';

const CaseStudyModal = lazy(() => import('../components/CaseStudyModal'));

export default function SelectedWork() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  const currentProject = projects[activeProjectIdx];

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="04" label="Selected Enterprise Work" />
          <h2 className="section-headline text-white max-w-3xl">
            Selected systems & deployments.
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-normal max-w-sm">
          A curated record of scalable architectures, intelligent automation platforms, and enterprise digital operations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/10">
        <div
          data-lenis-prevent="true"
          className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none touch-pan-x"
        >
          {projects.map((proj, idx) => {
            const isSelected = activeProjectIdx === idx;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`group px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30 font-semibold'
                    : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-blue-400'}>
                  {proj.number}
                </span>
                <span className="hidden md:inline">{proj.title.split(' ')[0]} {proj.title.split(' ')[1]}</span>
                <span className="md:hidden">Project {proj.number}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-slate-400">
          <span className="tracking-widest">
            {activeProjectIdx + 1} / {projects.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevProject}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextProject}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={currentProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center bg-[#0d0f17] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              onClick={() => setModalProject(currentProject)}
              className="relative rounded-xl overflow-hidden border border-white/10 bg-[#12141c] aspect-[16/10] cursor-pointer shadow-xl transition-all duration-500 group"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/85 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between text-xs font-mono text-white">
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md font-semibold tracking-wider uppercase text-[10px] sm:text-[11px] flex items-center gap-1 sm:gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Case Study</span>
                </span>
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#08090d]/80 backdrop-blur-md border border-white/15 text-slate-300 group-hover:text-white flex items-center gap-1 sm:gap-1.5 transition-colors text-[10px] sm:text-xs">
                  <span className="hidden sm:inline">Explore Architecture</span>
                  <span className="sm:hidden">Explore</span>
                  <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                PROJECT {currentProject.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-slate-400">
                {currentProject.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
              {currentProject.title}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {currentProject.summary}
            </p>

            <div className="py-3 border-y border-white/[0.08] grid grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
              <div>
                <span className="block text-slate-500 uppercase mb-0.5 text-[10px] sm:text-xs">Role</span>
                <span className="text-slate-200 font-medium">{currentProject.role}</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase mb-0.5 text-[10px] sm:text-xs">Timeline</span>
                <span className="text-slate-200 font-medium">{currentProject.year}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProject.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setModalProject(currentProject)}
                className="group/btn inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-blue-600 border border-white/15 hover:border-blue-500 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer shadow-md w-full sm:w-auto"
              >
                <span>Read Interactive Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {modalProject && (
        <Suspense fallback={null}>
          <CaseStudyModal
            project={modalProject}
            isOpen={!!modalProject}
            onClose={() => setModalProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
