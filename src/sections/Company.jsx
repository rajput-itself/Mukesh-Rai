import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Globe, Building } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';

export default function Company() {
  return (
    <section id="company" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <SectionLabel number="05" label="Company & Institutional Mandate" />

      <div className="my-6 sm:my-8 md:my-12 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 block mb-2 sm:mb-3">
          Institutional Platform
        </span>
        <h2 className="statement-headline font-bold text-white uppercase tracking-tight">
          Building something bigger than myself.
        </h2>
      </div>

      <div className="bg-[#0f111a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/8] w-full overflow-hidden border-b border-white/10 bg-slate-900">
          <picture>
            <source srcSet="/company-hq.webp" type="image/webp" />
            <img
              src="/company-hq.jpg"
              alt="AAPRIN Technologies Executive Boardroom"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter contrast-105"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent opacity-85" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 md:left-12 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
            <div className="px-2.5 sm:px-3 py-1 rounded bg-blue-600/90 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
              Corporate Headquarters
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-slate-300">
              Pune • Maharashtra, India
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-8 md:p-14 space-y-8 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                  Incorporated Enterprise
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  AAPRIN Technologies & Solution LLP
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-medium">
                  Technology • Innovation • Solutions
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                AAPRIN Technologies is an enterprise engineering and digital technology consultancy that builds high-concurrency cloud software, intelligent industrial automation systems, and scalable digital architectures for modern enterprises.
              </p>

              <div className="p-4 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Executive Role & Leadership</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-white">
                  Mukesh Rai — Managing Director & CEO
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Directing long-term corporate vision, client engagements, enterprise software architecture, and the organization's technological roadmap.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5 sm:space-y-6 bg-[#141622] p-5 sm:p-8 rounded-xl border border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Core Institutional Capabilities
              </span>

              <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Enterprise Cloud Software Architecture & Microservices</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Industrial Computer Vision & Neural Edge Automation</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Legacy System Modernization & High-Volume Data Pipelines</span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Executive Technology Consulting & Digital Roadmaps</span>
                </li>
              </ul>

              <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="https://aaprin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-900/30 w-full sm:w-auto"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit aaprin.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-slate-400 px-2 py-1">
                  <Building className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Affiliate: MPA Solution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
