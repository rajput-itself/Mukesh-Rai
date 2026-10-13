import React from 'react';
import SectionLabel from '../components/SectionLabel';

export default function Introduction() {
  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
      <SectionLabel number="01" label="Introduction & Positioning" />

      <div className="my-6 sm:my-8 md:my-12">
        <blockquote className="font-editorial text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-slate-100 font-light leading-tight max-w-5xl tracking-normal">
          “Technology is not simply about building systems. It is about building possibilities.”
        </blockquote>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-6 sm:pt-8 border-t border-white/[0.06]">
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            A technology executive focused on architecting platforms, organizations, and systems that solve meaningful problems.
          </h2>

          <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] max-w-md">
            <picture>
              <source srcSet="/portrait.webp" type="image/webp" />
              <img
                src="/portrait.jpg"
                alt="Mukesh Rai"
                loading="lazy"
                decoding="async"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-top border-2 border-blue-500/50 shadow-md shrink-0"
              />
            </picture>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Mukesh Rai
              </p>
              <p className="text-[11px] sm:text-xs text-blue-400 font-mono">
                Managing Director & CEO
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">
                AAPRIN Technologies & Solution LLP • MPA Solution
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
          <p>
            Operating at the intersection of engineering rigor and executive strategy, I lead cross-disciplinary technology initiatives from conceptual vision to production deployment. As Managing Director & CEO of AAPRIN Technologies & Solution LLP and MPA Solution in Pune, India, my mandate is singular: to create durable technological value that compounds over time.
          </p>
          <p>
            From high-throughput distributed cloud backends to edge computer vision and enterprise workflow modernization, my work bridges deep software fundamentals with commercial realities—delivering predictable outcomes in complex environments.
          </p>

          <div className="pt-3 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs font-mono uppercase text-slate-400">
            <div>
              <span className="block text-slate-600 mb-1">Discipline</span>
              <span className="text-white font-medium">Mechanical Systems & Software Architecture</span>
            </div>
            <div>
              <span className="block text-slate-600 mb-1">Focus</span>
              <span className="text-white font-medium">Autonomous Platforms & Enterprise Scale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
