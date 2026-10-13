import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Cpu, Box, TrendingUp, ArrowRight, CheckCircle2, ShieldCheck, Grid } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import { expertiseAreas } from '../data/expertise';

const QUADRANTS = [
  {
    id: 'strategy',
    label: 'STRATEGY',
    icon: Layers,
    title: 'Architectural Blueprint & Alignment',
    summary: 'Every technology decision is tied directly to macro-level enterprise goals, avoiding technical debt before it manifests.',
    deliverables: ['P&L Tech Alignment', 'Cloud ROI & FinOps', 'Architecture Roadmaps']
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    icon: Cpu,
    title: 'Distributed Foundations & Scale',
    summary: 'Building fault-tolerant systems using decoupled microservices, idempotent message streams, and zero-trust security postures.',
    deliverables: ['High-Concurrency Backends', 'Event-Driven Pipelines', 'Edge Inference Hardware']
  },
  {
    id: 'product',
    label: 'PRODUCT',
    icon: Box,
    title: 'Precision Delivery & Usability',
    summary: 'Translating complex distributed software capabilities into intuitive interfaces that reduce cognitive friction for operators.',
    deliverables: ['Telemetry Dashboards', 'Subsecond UX Latency', 'Continuous Release Cycles']
  },
  {
    id: 'impact',
    label: 'IMPACT',
    icon: TrendingUp,
    title: 'Compounding Commercial Leverage',
    summary: 'The ultimate objective: measurable operational gains, 99.99% availability, and verified enterprise trust.',
    deliverables: ['High Operational Uptime', 'Overhead Reduction', 'Audit-Verified Data']
  }
];

export default function Expertise() {
  const [activeTab, setActiveTab] = useState('practices');
  const [activeStep, setActiveStep] = useState(0);

  const currentQuad = QUADRANTS[activeStep];
  const QuadIcon = currentQuad.icon;

  return (
    <section id="expertise" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <SectionLabel number="03" label="Executive Capabilities & Architecture" />
          <h2 className="display-headline text-white max-w-4xl">
            Where vision meets<br className="hidden sm:inline" /> technical mastery.
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 self-start md:self-end">
          <button
            onClick={() => setActiveTab('practices')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg nav-toggle transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'practices'
                ? 'bg-blue-600 text-white font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </button>
          <button
            onClick={() => setActiveTab('framework')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg nav-toggle transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'framework'
                ? 'bg-blue-600 text-white font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Execution Quad</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'practices' ? (
          <motion.div
            key="practices"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {expertiseAreas.map((area) => (
              <div
                key={area.number}
                className="group p-6 sm:p-7 rounded-xl bg-[#0f1118]/80 border border-white/[0.08] hover:border-blue-500/40 hover:bg-[#121522] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                    <span className="meta-number text-blue-400">
                      {area.number}
                    </span>
                    <span className="meta-label text-slate-400">
                      Executive Domain
                    </span>
                  </div>

                  <h3 className="card-title text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {area.title}
                  </h3>
                  <p className="category-subtitle text-blue-400 mb-3.5">
                    {area.subtitle}
                  </p>
                  <p className="card-body text-slate-300/90 mb-6">
                    {area.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill px-2.5 py-1 rounded bg-white/[0.04] text-slate-300/80 border border-white/[0.06] hover:text-white hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="framework"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-[#0d0f16] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-5 space-y-2.5 z-10">
              <span className="category-subtitle text-slate-400 block mb-3">
                Execution Quad Cycle
              </span>
              {QUADRANTS.map((quad, idx) => {
                const isCurrent = activeStep === idx;
                return (
                  <button
                    key={quad.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600/15 border-blue-500/60 text-white'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`meta-number text-xs ${isCurrent ? 'text-blue-400 font-semibold' : 'text-slate-600'}`}>
                        0{idx + 1}
                      </span>
                      <span className="nav-toggle tracking-wide text-xs sm:text-sm">
                        {quad.label}
                      </span>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isCurrent ? 'text-blue-400 translate-x-1' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] z-10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <QuadIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="meta-label text-blue-400 block mb-1">
                    Execution Phase 0{activeStep + 1}
                  </span>
                  <h3 className="card-title text-white">
                    {currentQuad.title}
                  </h3>
                </div>
              </div>

              <p className="card-body text-slate-300/90">
                {currentQuad.summary}
              </p>

              <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                <span className="category-subtitle text-slate-400 block mb-2">
                  Key Enterprise Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentQuad.deliverables.map((deliv) => (
                    <div
                      key={deliv}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] tag-pill text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
