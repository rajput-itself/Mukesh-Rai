import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Clock,
  Terminal,
  Activity
} from 'lucide-react';

const Subtle3DCanvas = React.lazy(() => import('../components/Subtle3DCanvas'));

const METRICS = [
  {
    value: '12+',
    label: 'Years of Leadership',
    detail: 'Executive Direction & Engineering Rigor'
  },
  {
    value: '99.99%',
    label: 'Core Reliability',
    detail: 'Mission-Critical Cloud Architecture'
  },
  {
    value: '2',
    label: 'Ventures Led',
    detail: 'AAPRIN Technologies & MPA Solution'
  },
  {
    value: '<100ms',
    label: 'Scale Latency',
    detail: 'Event-Driven Distributed Pipelines'
  }
];

const FOCUS_TAGS = [
  'Distributed Cloud Core',
  'Industrial Edge AI',
  'Autonomous Systems',
  'Executive Strategy'
];

export default function Hero() {
  const [puneTime, setPuneTime] = useState('');
  const cardRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setPuneTime(timeStr);
      } catch {
        setPuneTime('12:00:00 PM IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.connection) {
      if (navigator.connection.saveData || navigator.connection.effectiveType === '2g') {
        return;
      }
    }
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleHandle = window.requestIdleCallback(() => setShouldLoad3D(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(idleHandle);
    } else {
      const timer = setTimeout(() => setShouldLoad3D(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-7deg', '7deg']);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -60, duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div
        className="absolute top-12 left-1/4 -translate-x-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full pointer-events-none opacity-25 blur-[100px] sm:blur-[120px] hero-spotlight-primary"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px] sm:blur-[130px] hero-spotlight-secondary"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] hero-grid-pattern"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent pointer-events-none animate-scanline z-0" />

      <div className="hidden xl:flex absolute top-28 right-36 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e121e]/80 border border-blue-500/25 text-[10px] font-mono text-slate-300 pointer-events-none animate-float-slow backdrop-blur-md shadow-lg z-0">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        <span className="text-slate-400">NODE //</span>
        <span className="text-white font-semibold">DISTRIBUTED_CORE</span>
      </div>

      <div className="hidden xl:flex absolute top-1/2 left-8 items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e121e]/80 border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none animate-float-reverse backdrop-blur-md shadow-lg z-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-slate-400">EDGE_AI //</span>
        <span className="text-emerald-300 font-semibold">&lt; 42ms LATENCY</span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-slate-300 font-medium">
              Managing Director & CEO
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[10px] sm:text-[11px] font-mono text-blue-400 tracking-wider uppercase hidden xs:inline sm:inline">
              AAPRIN & MPA Solution
            </span>
          </motion.div>

          <div className="space-y-2.5 sm:space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] sm:leading-none">
                Mukesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Rai</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl lg:text-3xl font-medium tracking-tight text-slate-200"
            >
              <span>Architecting systems.</span>{' '}
              <span className="text-slate-400">Leading teams.</span>{' '}
              <span className="text-blue-400">Pioneering what comes next.</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal"
          >
            Engineering mission-critical distributed platforms, establishing a high-autonomy engineering culture, and turning complex systems and edge intelligence into durable commercial leverage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
          >
            {FOCUS_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono text-slate-300 bg-white/[0.03] border border-white/[0.08] hover:border-blue-400/40 hover:text-white transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('work')}
              className="group relative inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl font-medium text-xs sm:text-sm uppercase tracking-wider text-white overflow-hidden shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-600/30 hover:scale-[1.02] cursor-pointer w-full sm:w-auto hero-btn-primary"
            >
              <span className="relative z-10 font-semibold">Explore Enterprise Work</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-sky-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm uppercase tracking-wider text-slate-200 bg-white/[0.04] border border-white/15 hover:bg-white/[0.08] hover:border-white/30 hover:text-white transition-all backdrop-blur-sm cursor-pointer w-full sm:w-auto"
            >
              <span>Executive Advisory</span>
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </button>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 sm:py-3 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Pune, Maharashtra, India</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease: 'easeOut' }}
            className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4"
          >
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300 tracking-wide mt-0.5 truncate">
                  {metric.label}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono mt-1 line-clamp-1">
                  {metric.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0"
        >
          <div className="absolute -top-10 -right-10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full border border-blue-500/15 animate-pulse-ring pointer-events-none z-0" />
          <div
            className="absolute -top-20 -right-20 w-[380px] h-[380px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px] rounded-full border border-indigo-500/10 animate-pulse-ring pointer-events-none z-0 animation-delay-3000"
          />

          {shouldLoad3D && (
            <div className="absolute -top-16 -right-16 sm:-top-28 sm:-right-24 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] lg:w-[650px] lg:h-[650px] pointer-events-none opacity-70 z-0">
              <React.Suspense fallback={null}>
                <Subtle3DCanvas />
              </React.Suspense>
            </div>
          )}

          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-full max-w-[320px] sm:max-w-sm lg:max-w-md perspective-1200"
          >
            <motion.div
              style={{
                rotateX,
                rotateY
              }}
              className="relative rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-[#161a29]/90 to-[#0c0e17]/95 border border-white/15 backdrop-blur-2xl shadow-2xl group transition-shadow duration-500 hover:shadow-blue-500/10 overflow-hidden preserve-3d"
            >
              <motion.div
                className="absolute -inset-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hero-glare-overlay"
                style={{
                  left: glareX,
                  top: glareY
                }}
              />

              <div
                className="flex items-center justify-between px-3 py-2 mb-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300 translate-z-25"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="uppercase tracking-widest text-[10px] text-slate-400">
                    Executive Node
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px]">VERIFIED LEADERSHIP</span>
                </div>
              </div>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-inner">
                <picture>
                  <source srcSet="/portrait.webp" type="image/webp" />
                  <img
                    src="/portrait.jpg"
                    alt="Mukesh Rai — Managing Director & CEO"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/95 via-[#08090d]/30 to-transparent pointer-events-none" />

                <div
                  className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0b0d14]/85 border border-white/15 backdrop-blur-md shadow-lg translate-z-35"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm tracking-wide uppercase">
                          Mukesh Rai
                        </span>
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span className="text-[10px] font-mono uppercase text-blue-400 font-medium">
                          Pune, IN
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        Managing Director & Chief Executive Officer
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        AAPRIN Technologies & Solution LLP • MPA Solution
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 text-xs font-mono font-bold">
                      MR
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/[0.08] mt-6 sm:mt-8 text-center sm:text-left"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase text-slate-500">
          <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Executive Technology Dossier // 2026</span>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="group flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
          aria-label="Scroll to explore profile"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-500 uppercase tracking-wider text-[10px] sm:text-[11px]">Pune, IN:</span>
          <span className="text-slate-200 font-medium tabular-nums">{puneTime}</span>
        </div>
      </motion.div>
    </section>
  );
}
