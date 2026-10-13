import React from 'react';
import SectionLabel from '../components/SectionLabel';
import { experienceTimeline, executiveMilestones } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="07" label="Executive Career Path & Scale" />
          <h2 className="section-headline text-white max-w-3xl">
            A track record of engineering leadership.
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-normal max-w-sm">
          From a systems engineering foundation to executive leadership across high-growth technology organizations.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mb-10 sm:mb-14">
        {executiveMilestones.map((m) => (
          <div
            key={m.label}
            className="p-3.5 sm:p-5 md:p-6 rounded-xl bg-[#0e1017] border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#121522] transition-all group"
          >
            <span className="text-2xl sm:text-3xl md:text-5xl font-bold font-mono tracking-tight text-white group-hover:text-blue-400 transition-colors block mb-1.5 sm:mb-2">
              {m.metric}
            </span>
            <h4 className="text-xs md:text-sm font-semibold text-slate-200 mb-1">
              {m.label}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-relaxed">
              {m.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="divide-y divide-white/10 border-t border-white/10">
        {experienceTimeline.map((item) => (
          <div
            key={item.role + item.year}
            className="py-6 sm:py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start group hover:bg-white/[0.01] transition-colors"
          >
            <div className="md:col-span-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {item.year}
              </span>
              <span className="block text-[11px] sm:text-xs font-mono uppercase tracking-widest text-slate-500 mt-1">
                {item.location}
              </span>
            </div>

            <div className="md:col-span-4 space-y-1">
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">
                {item.role}
              </h3>
              <p className="text-sm font-semibold text-blue-400">
                {item.organization}
              </p>
              <p className="text-xs text-slate-400 font-normal pt-2 leading-relaxed">
                {item.highlight}
              </p>
            </div>

            <div className="md:col-span-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-2">
                Scope & Key Initiatives
              </span>
              <ul className="space-y-1.5 text-xs md:text-sm text-slate-300">
                {item.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
