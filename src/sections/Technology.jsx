import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { technologyEcosystem } from '../data/technology';

const ICONS = [Cpu, Server, Eye, ShieldCheck];

export default function Technology() {
  const [activeTab, setActiveTab] = useState(0);

  const currentCategory = technologyEcosystem[activeTab] || technologyEcosystem[0];
  const IconComponent = ICONS[activeTab] || Cpu;

  return (
    <section id="technology" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="06" label="Technology Ecosystem" />
          <h2 className="section-headline text-white max-w-3xl">
            Engineering stack & architecture layers.
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-normal max-w-sm">
          A disciplined, production-proven technology ecosystem built for stability, horizontal scale, and zero compromise.
        </p>
      </div>

      <div
        data-lenis-prevent="true"
        className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 border-b border-white/10 scrollbar-none touch-pan-x"
      >
        {technologyEcosystem.map((cat, idx) => {
          const isSelected = activeTab === idx;
          const TabIcon = ICONS[idx] || Cpu;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`group px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 sm:gap-2.5 border ${isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30 font-semibold'
                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white uppercase">
                  {currentCategory.category}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  {currentCategory.description}
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-blue-400 hidden sm:inline">
              Verified Production Stack
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {currentCategory.items.map((item) => (
              <div
                key={item.name}
                className="p-4 sm:p-6 rounded-xl bg-[#0e1017] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#121522] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-200 transition-colors">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400/80 group-hover:text-emerald-400 transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <span>Architecture Tier</span>
                  <span className="text-slate-400">Production</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
