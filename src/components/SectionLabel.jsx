import React from 'react';

export default function SectionLabel({ number, label, light = false }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold">
      <span className={light ? "text-slate-400 font-mono" : "text-blue-500 font-mono"}>
        {number}
      </span>
      <span className="w-4 sm:w-6 h-[1px] bg-slate-700/60 shrink-0" />
      <span className={light ? "text-slate-300" : "text-slate-400"}>
        {label}
      </span>
    </div>
  );
}
