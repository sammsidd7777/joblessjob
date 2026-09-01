import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Search,
  MapPin,
  Zap,
} from "lucide-react";

const CTASection = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f7f3]
        py-20
        dark:bg-[#06070a]
        sm:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Glow */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-violet-500/[0.08]
            blur-[140px]
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
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-slate-200
            bg-slate-950
            px-6
            py-14
            shadow-[0_30px_100px_rgba(15,23,42,0.15)]
            dark:border-white/[0.08]
            dark:bg-[#0c0f16]
            sm:px-10
            sm:py-20
            lg:px-16
          "
        >

          {/* =================================================
              DECORATIVE ELEMENTS
          ================================================== */}

          {/* Big circle */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              border-[70px]
              border-violet-500/[0.08]
            "
          />

          {/* Small circle */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-20
              h-72
              w-72
              rounded-full
              border-[45px]
              border-cyan-400/[0.06]
            "
          />

          {/* Floating dot */}

          <div
            aria-hidden="true"
            className="
              absolute
              right-[25%]
              top-16
              h-3
              w-3
              animate-pulse
              rounded-full
              bg-violet-400
              shadow-[0_0_25px_rgba(139,92,246,0.8)]
            "
          />

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="relative z-10 mx-auto max-w-4xl text-center">

            {/* Eyebrow */}

            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.06]
                px-4
                py-2
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-violet-300
                backdrop-blur-md
              "
            >
              <Sparkles
                size={13}
                aria-hidden="true"
              />

              One last thing
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <h2
              className="
                text-5xl
                font-black
                leading-[0.9]
                tracking-[-0.07em]
                text-white
                sm:text-6xl
                lg:text-8xl
              "
            >
              Still jobless?

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-violet-400
                  via-blue-400
                  to-cyan-300
                  bg-clip-text
                  text-transparent
                "
              >
                Let's change that.
              </span>
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mx-auto
                mt-7
                max-w-xl
                text-sm
                font-medium
                leading-6
                text-slate-400
                sm:text-base
              "
            >
              Your next opportunity could be one search away.
            </p>

            {/* =================================================
                SEARCH PREVIEW
            ================================================== */}

            <div
              className="
                mx-auto
                mt-9
                max-w-2xl
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-2
                shadow-2xl
                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                "
              >
                {/* Search */}

                <div
                  className="
                    flex
                    min-h-12
                    flex-1
                    items-center
                    gap-3
                    rounded-xl
                    bg-white
                    px-4
                    text-left
                  "
                >
                  <Search
                    size={18}
                    className="shrink-0 text-slate-400"
                    aria-hidden="true"
                  />

                  <span
                    className="
                      truncate
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    Frontend Developer
                  </span>
                </div>

                {/* Location */}

                <div
                  className="
                    flex
                    min-h-12
                    items-center
                    gap-3
                    rounded-xl
                    bg-white
                    px-4
                    text-left
                    sm:w-44
                  "
                >
                  <MapPin
                    size={17}
                    className="shrink-0 text-slate-400"
                    aria-hidden="true"
                  />

                  <span
                    className="
                      truncate
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    Anywhere
                  </span>
                </div>

                {/* CTA */}

                <Link
                  to="/find-job"
                  className="
                    group
                    flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-violet-600
                    px-6
                    text-sm
                    font-black
                    text-white
                    transition-all
                    duration-300
                    hover:bg-violet-500
                    hover:shadow-lg
                    hover:shadow-violet-500/30
                  "
                >
                  Find jobs

                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>

            {/* =================================================
                MICRO TEXT
            ================================================== */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-slate-500
              "
            >
              <Zap
                size={12}
                className="text-violet-400"
                aria-hidden="true"
              />

              No excuses. Just opportunities.
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes ctaEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        section > div {
          animation: ctaEnter
            0.8s
            cubic-bezier(.22, 1, .36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          section > div {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;