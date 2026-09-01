import {
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Fresh jobs",
    description: "New opportunities added regularly.",
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    title: "IT focused",
    description: "Tech, design, marketing & data roles.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Direct apply",
    description: "Go straight to the application.",
    icon: ExternalLink,
  },
  {
    number: "04",
    title: "Made for you",
    description: "Simple tools. Less job-search chaos.",
    icon: Users,
  },
];

const StatsSection = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f7f3]
        py-20
        dark:bg-[#06070a]
        sm:py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Purple glow */}

        <div
          className="
            absolute
            -left-40
            top-0
            h-96
            w-96
            rounded-full
            bg-violet-500/[0.06]
            blur-[120px]
          "
        />

        {/* Cyan glow */}

        <div
          className="
            absolute
            -right-40
            bottom-0
            h-96
            w-96
            rounded-full
            bg-cyan-400/[0.05]
            blur-[120px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]
            [background-size:55px_55px]
            dark:opacity-[0.035]
            dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">

          {/* Eyebrow */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.2em]
              text-violet-600
              dark:text-violet-400
            "
          >
            <Sparkles
              size={14}
              aria-hidden="true"
            />

            Why JoblessJob
          </div>

          {/* Heading */}

          <h2
            className="
              text-4xl
              font-black
              leading-[0.95]
              tracking-[-0.06em]
              text-slate-950
              sm:text-5xl
              lg:text-[56px]
              dark:text-white
            "
          >
            Less searching.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-violet-600
                via-blue-600
                to-cyan-500
                bg-clip-text
                text-transparent
              "
            >
              More finding.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-lg
              text-sm
              font-medium
              leading-6
              text-slate-500
              sm:text-base
              dark:text-slate-400
            "
          >
            We keep the job hunt simple, focused and useful.
          </p>
        </div>

        {/* =====================================================
            FEATURE GRID
        ====================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="
                  feature-card-enter
                  group
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-violet-200
                  hover:shadow-[0_25px_60px_rgba(15,23,42,0.09)]
                  dark:border-white/[0.08]
                  dark:bg-[#0d1018]
                  dark:hover:border-violet-500/20
                "
              >
                {/* Large number */}

                <div
                  className="
                    absolute
                    right-5
                    top-3
                    text-5xl
                    font-black
                    tracking-[-0.08em]
                    text-slate-100
                    transition-all
                    duration-500
                    group-hover:text-violet-100
                    dark:text-white/[0.04]
                    dark:group-hover:text-violet-500/10
                  "
                >
                  {feature.number}
                </div>

                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    text-violet-600
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:-rotate-3
                    group-hover:border-violet-200
                    group-hover:bg-violet-600
                    group-hover:text-white
                    group-hover:shadow-lg
                    group-hover:shadow-violet-500/20
                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-violet-400
                    dark:group-hover:border-violet-500
                    dark:group-hover:bg-violet-500
                    dark:group-hover:text-white
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}

                <div className="relative mt-6">

                  <div className="flex items-center justify-between gap-3">

                    <h3
                      className="
                        text-lg
                        font-black
                        tracking-tight
                        text-slate-950
                        transition-colors
                        duration-300
                        group-hover:text-violet-600
                        dark:text-white
                        dark:group-hover:text-violet-400
                      "
                    >
                      {feature.title}
                    </h3>

                    <ArrowUpRight
                      size={16}
                      className="
                        shrink-0
                        text-slate-300
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-violet-500
                        dark:text-slate-700
                      "
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Bottom indicator */}

                <div
                  className="
                    mt-7
                    h-1
                    w-6
                    rounded-full
                    bg-slate-200
                    transition-all
                    duration-500
                    group-hover:w-12
                    group-hover:bg-violet-500
                    dark:bg-white/10
                  "
                />

                {/* Hover glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-16
                    -right-16
                    h-32
                    w-32
                    rounded-full
                    bg-violet-500/[0.10]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </div>
            );
          })}
        </div>

        {/* =====================================================
            BRAND STATEMENT
        ====================================================== */}

        <div
          className="
            mt-10
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-slate-950
            px-6
            py-7
            text-white
            dark:border-white/[0.08]
            dark:bg-[#10131c]
            sm:px-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-violet-400
                "
              >
                JoblessJob
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-black
                  tracking-tight
                  sm:text-2xl
                "
              >
                Stop scrolling. Start finding.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-slate-400
              "
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              Opportunities are waiting
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes featureCardEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card-enter {
          opacity: 0;
          animation: featureCardEnter
            0.65s
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .feature-card-enter {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;