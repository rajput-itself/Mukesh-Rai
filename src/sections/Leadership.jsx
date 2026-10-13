import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { leadershipPrinciples } from '../data/leadership';

export default function Leadership() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <section id="leadership" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="02" label="Leadership Philosophy" />
          <h2 className="section-headline text-white max-w-3xl">
            Principles that govern execution.
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-normal max-w-sm">
          True engineering leadership is about establishing rigorous foundations, setting high standards, and empowering teams to build with clarity.
        </p>
      </div>

      <div className="border-t border-white/10 divide-y divide-white/10">
        {leadershipPrinciples.map((principle, idx) => {
          const isSelected = activePrinciple === idx;
          return (
            <div
              key={principle.number}
              onMouseEnter={() => setActivePrinciple(idx)}
              onClick={() => setActivePrinciple(idx)}
              className="group py-6 sm:py-8 md:py-12 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-baseline gap-4 sm:gap-6 md:gap-12">
                  <span className="text-xs sm:text-sm md:text-base font-mono text-slate-500 group-hover:text-blue-400 transition-colors shrink-0">
                    {principle.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white group-hover:text-blue-200 transition-all transform group-hover:translate-x-1 sm:group-hover:translate-x-2 duration-300">
                    {principle.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 self-end md:self-auto">
                  <span className="hidden md:inline-block text-xs font-mono uppercase tracking-widest text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore Principle
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-blue-400 group-hover:bg-blue-600/10 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSelected ? 'max-h-[600px] opacity-100 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/[0.06]' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pl-0 md:pl-16 lg:pl-20">
                  <div className="md:col-span-5 font-editorial text-base sm:text-lg md:text-xl text-slate-200 italic leading-snug">
                    "{principle.statement}"
                  </div>
                  <div className="md:col-span-7 text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed font-normal">
                    {principle.detail}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
