import React, { useState, Suspense, lazy } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { executiveInsights } from '../data/insights';

const InsightModal = lazy(() => import('../components/InsightModal'));

export default function Insights() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  return (
    <section id="insights" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="08" label="Executive Perspectives" />
          <h2 className="section-headline text-white max-w-3xl">
            Thinking on architecture, leadership & scale.
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-normal max-w-sm">
          Essays and field observations from deploying systems, leading engineering teams, and solving enterprise bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {executiveInsights.map((insight) => (
          <article
            key={insight.id}
            onClick={() => setSelectedInsight(insight)}
            className="group p-5 sm:p-7 md:p-8 rounded-xl bg-[#0e1017] border border-white/[0.07] hover:border-blue-500/40 hover:bg-[#121420] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/[0.06]">
                <span className="text-blue-400 uppercase tracking-wider text-[11px] sm:text-xs">{insight.category}</span>
                <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {insight.readTime}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-3 sm:mb-4 group-hover:text-blue-200 transition-colors leading-snug">
                {insight.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-5 sm:mb-6 font-editorial italic">
                "{insight.excerpt}"
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-400 transition-colors">
              <span>Read Full Essay</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {selectedInsight && (
        <Suspense fallback={null}>
          <InsightModal
            insight={selectedInsight}
            isOpen={!!selectedInsight}
            onClose={() => setSelectedInsight(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
