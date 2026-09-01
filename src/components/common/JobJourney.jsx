import React from "react";
import {
  Search,
  Eye,
  Send,
  FileText,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const journeySteps = [
  {
    label: "Find a Job",
    icon: Search,
    description: "Discover opportunities",
  },
  {
    label: "Explore",
    icon: Eye,
    description: "Check the right fit",
  },
  {
    label: "Apply",
    icon: Send,
    description: "Send your application",
  },
  {
    label: "Application",
    icon: FileText,
    description: "Track your progress",
  },
  {
    label: "Get Hired",
    icon: BriefcaseBusiness,
    description: "Start your journey",
  },
];

const JobJourney = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#030408]">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[15%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[120px]" />

      <div className="pointer-events-none absolute right-[10%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-violet-500/60" />

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
                Your Journey
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              From searching to{" "}
              <span className="text-violet-400">getting hired.</span>
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Everything you need, from your first search to your next job.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-600 sm:flex">
            <Sparkles size={14} />
            <span>Simple. Focused. Job-ready.</span>
          </div>
        </div>

        {/* Journey */}
        <div className="relative">

          {/* Desktop connecting line */}
          <div className="pointer-events-none absolute left-[7%] right-[7%] top-[42px] hidden h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent lg:block" />

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-4 lg:overflow-visible">

            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <React.Fragment key={step.label}>

                  <div
                    className="
                      group
                      relative
                      min-w-[190px]
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      p-4
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-violet-500/25
                      hover:bg-white/[0.045]
                      lg:min-w-0
                    "
                  >

                    {/* Number */}
                    <div className="absolute right-3 top-3 text-[10px] font-bold text-slate-700">
                      0{index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="
                        mb-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-[#0c0e18]
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:border-violet-500/30
                        group-hover:bg-violet-500/10
                        group-hover:text-violet-400
                      "
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <h3 className="text-sm font-bold text-slate-200">
                      {step.label}
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      {step.description}
                    </p>

                  </div>

                  {/* Mobile arrow */}
                  {index !== journeySteps.length - 1 && (
                    <div className="flex shrink-0 items-center text-slate-700 lg:hidden">
                      <ArrowRight size={16} />
                    </div>
                  )}

                </React.Fragment>
              );
            })}

            {/* Final Brand Card */}
            <div
              className="
                group
                relative
                min-w-[190px]
                overflow-hidden
                rounded-2xl
                border
                border-violet-500/20
                bg-gradient-to-br
                from-violet-500/[0.12]
                via-violet-500/[0.04]
                to-transparent
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-violet-500/40
                lg:min-w-0
              "
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />

              <div className="relative">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                  <Sparkles
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-400">
                  Your next chapter
                </p>

                <h3 className="mt-1 text-base font-bold text-white">
                  JoblessJob
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Less scrolling. More applying.
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.05] pt-5 sm:flex-row sm:items-center sm:justify-between">
          
          <p className="text-xs text-slate-600">
            Your next opportunity could be one search away.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Fresh opportunities
          </div>

        </div>

      </div>
    </section>
  );
};

export default JobJourney;