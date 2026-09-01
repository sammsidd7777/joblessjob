import React from "react";
import {
  Zap,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Faster",
    text: "Find relevant jobs without endless scrolling.",
  },
  {
    icon: MousePointer2,
    title: "Easier",
    text: "Search and explore with less effort.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    text: "Clear details. Better decisions.",
  },
];

const WhyJoblessJob = () => {
  return (


<section className="relative overflow-hidden border-y border-white/[0.05] bg-[#05060a]">
  {/* Subtle background glow */}
  <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-600/[0.06] blur-[110px]" />
  <div className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[110px]" />

  <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
    
    {/* Heading */}
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Built for job seekers
          </span>
        </div>

        <h2 className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
          Built for your{' '}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            job search.
          </span>
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Less scrolling. More applying. Find opportunities that actually
          match what you're looking for.
        </p>
      </div>

      <div className="hidden text-right sm:block">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
          Simple by design
        </span>
      </div>
    </div>

    {/* Features */}
    <div className="grid gap-3 sm:grid-cols-3">

      {/* Faster */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.035]">
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/[0.08] text-violet-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
            </svg>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-700">
            01
          </span>
        </div>

        <h3 className="text-sm font-bold text-white">
          Faster
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Spend less time scrolling and more time applying to relevant jobs.
        </p>

        <div className="mt-4 h-px w-8 bg-violet-400/40 transition-all duration-300 group-hover:w-14" />
      </div>

      {/* Easier */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.035]">
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.08] text-blue-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-700">
            02
          </span>
        </div>

        <h3 className="text-sm font-bold text-white">
          Easier
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Search by role, skills or location and get straight to the good ones.
        </p>

        <div className="mt-4 h-px w-8 bg-blue-400/40 transition-all duration-300 group-hover:w-14" />
      </div>

      {/* Better */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.035]">
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-500/[0.08] text-cyan-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <path d="M12 3 14.5 9.5 21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
            </svg>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-700">
            03
          </span>
        </div>

        <h3 className="text-sm font-bold text-white">
          Better
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Clear job details help you make better decisions before applying.
        </p>

        <div className="mt-4 h-px w-8 bg-cyan-400/40 transition-all duration-300 group-hover:w-14" />
      </div>

    </div>

    {/* Bottom micro-line */}
    <div className="mt-7 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-white/[0.06]" />

      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-700">
        Find less. Apply more.
      </span>

      <span className="h-px w-8 bg-white/[0.06]" />
    </div>

  </div>
</section>
  );
};

export default WhyJoblessJob;