import { Link } from "react-router-dom";
import { jobPosts } from "../../Data/Data.js";
import { SlHeart } from "react-icons/sl";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";
import { useState } from "react";

const FeaturedJobs = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const toggleSave = (e, key) => {
    e.preventDefault();
    e.stopPropagation();

    setSavedJobs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f7f3] py-20 text-slate-950 dark:bg-[#06070a] dark:text-white">
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
            left-1/4
            top-0
            h-[28rem]
            w-[28rem]
            rounded-full
            bg-violet-500/[0.06]
            blur-[120px]
          "
        />

        {/* Cyan glow */}
        <div
          className="
            absolute
            right-[-10rem]
            top-1/3
            h-[25rem]
            w-[25rem]
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

        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

          <div className="max-w-3xl">

            {/* Small label */}

            <div
              className="
                mb-4
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
              <Sparkles size={14} aria-hidden="true" />

              Fresh opportunities
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
                lg:text-[58px]
                dark:text-white
              "
            >
              Don't stay{" "}

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
                jobless.
              </span>
            </h2>

            {/* Short description */}

            <p
              className="
                mt-4
                text-sm
                font-medium
                text-slate-500
                sm:text-base
                dark:text-slate-400
              "
            >
              A few jobs worth your time.
            </p>
          </div>

          {/* View all */}

          <Link
            to="/find-job"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-bold
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-violet-300
              hover:bg-violet-50
              hover:text-violet-600
              hover:shadow-lg
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-slate-200
              dark:hover:border-violet-500/30
              dark:hover:bg-violet-500/10
              dark:hover:text-violet-400
            "
          >
            Explore all jobs

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

        {/* =====================================================
            JOB GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {jobPosts.slice(0, 6).map((job, index) => {
            const imageKey = `${job.company}-${job.title}-${index}`;
            const isSaved = savedJobs[imageKey];

            return (
              <article
                key={imageKey}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
                className="
                  job-card-enter
                  group
                  relative
                  flex
                  min-h-[410px]
                  flex-col
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-violet-200
                  hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
                  dark:border-white/[0.08]
                  dark:bg-[#0d1018]
                  dark:hover:border-violet-500/20
                  dark:hover:shadow-black/30
                "
              >
                {/* Top accent */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-violet-500
                    via-blue-500
                    to-cyan-400
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                {/* =================================================
                    TOP ROW
                ================================================== */}

                <div className="flex items-start justify-between">

                  {/* Company logo */}

                  <div
                    className="
                      relative
                      flex
                      h-[62px]
                      w-[62px]
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      shadow-sm
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:rotate-1
                      dark:border-white/10
                      dark:bg-slate-800
                    "
                  >
                    {!loadedImages[imageKey] && (
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          animate-pulse
                          bg-slate-200
                          dark:bg-slate-700
                        "
                      />
                    )}

                    <img
                      src={job.logo || "/favicon.png"}
                      alt={`${job.company} logo`}
                      loading="lazy"
                      onLoad={() =>
                        handleImageLoad(imageKey)
                      }
                      onError={(e) => {
                        e.currentTarget.src =
                          "/favicon.png";

                        handleImageLoad(imageKey);
                      }}
                      className={`
                        h-10
                        w-10
                        object-contain
                        transition-all
                        duration-300
                        ${
                          loadedImages[imageKey]
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      `}
                    />
                  </div>

                  {/* Save */}

                  <button
                    type="button"
                    aria-label={
                      isSaved
                        ? `Remove ${job.title} from saved jobs`
                        : `Save ${job.title} at ${job.company}`
                    }
                    aria-pressed={isSaved}
                    onClick={(e) =>
                      toggleSave(e, imageKey)
                    }
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      ${
                        isSaved
                          ? "border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400"
                          : "border-slate-200 bg-white text-slate-400 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 dark:border-white/10 dark:bg-slate-800 dark:hover:border-violet-500/20 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
                      }
                    `}
                  >
                    <SlHeart
                      size={18}
                      strokeWidth={1.8}
                      className={
                        isSaved
                          ? "fill-current"
                          : ""
                      }
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* =================================================
                    COMPANY
                ================================================== */}

                <div className="mt-5 flex min-w-0 items-center gap-2">

                  <h3
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {job.company}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="
                      h-1
                      w-1
                      shrink-0
                      rounded-full
                      bg-violet-400
                    "
                  />

                  <span
                    className="
                      shrink-0
                      text-xs
                      font-medium
                      text-slate-400
                    "
                  >
                    {job.date || "Recently"}
                  </span>
                </div>

                {/* =================================================
                    JOB TITLE
                ================================================== */}

                <h4
                  className="
                    mt-2
                    line-clamp-2
                    min-h-[58px]
                    text-[22px]
                    font-bold
                    leading-7
                    tracking-[-0.03em]
                    text-slate-950
                    dark:text-white
                  "
                >
                  {job.title}
                </h4>

                {/* =================================================
                    TAGS
                ================================================== */}

                <div className="mt-4 flex min-h-[34px] flex-wrap gap-2">

                  {job.role
                    ?.slice(0, 3)
                    .map((role, roleIndex) => (
                      <span
                        key={`${role}-${roleIndex}`}
                        className="
                          rounded-lg
                          border
                          border-slate-200
                          bg-slate-50
                          px-3
                          py-1.5
                          text-[11px]
                          font-bold
                          text-slate-600
                          transition-all
                          duration-300
                          group-hover:border-violet-100
                          group-hover:bg-violet-50
                          group-hover:text-violet-600
                          dark:border-white/[0.07]
                          dark:bg-slate-800
                          dark:text-slate-300
                          dark:group-hover:border-violet-500/20
                          dark:group-hover:bg-violet-500/10
                          dark:group-hover:text-violet-400
                        "
                      >
                        {role}
                      </span>
                    ))}
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    mt-5
                    line-clamp-2
                    text-sm
                    leading-6
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {job.description ||
                    "Explore this opportunity and discover if it's right for you."}
                </p>

                {/* Spacer */}

                <div className="flex-1" />

                {/* Divider */}

                <div
                  aria-hidden="true"
                  className="
                    my-5
                    h-px
                    bg-slate-100
                    dark:bg-white/[0.07]
                  "
                />

                {/* =================================================
                    FOOTER
                ================================================== */}

                <div className="flex items-end justify-between gap-4">

                  {/* Salary + location */}

                  <div className="min-w-0">

                    <p
                      className="
                        text-lg
                        font-black
                        tracking-tight
                        text-slate-950
                        dark:text-white
                      "
                    >
                      ₹{job.salary}

                      <span
                        className="
                          ml-1
                          text-xs
                          font-medium
                          text-slate-400
                        "
                      >
                        /hr
                      </span>
                    </p>

                    <div
                      className="
                        mt-1.5
                        flex
                        min-w-0
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-slate-400
                      "
                    >
                      <MapPin
                        size={13}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      <span className="truncate">
                        {job.location || "Remote"}
                      </span>
                    </div>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-medium
                        text-slate-400
                      "
                    >
                      <Clock3
                        size={11}
                        aria-hidden="true"
                      />

                      <span>
                        {job.employmentType ||
                          "Full-time"}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}

                  <Link
                    to="/find-job"
                    className="
                      group/btn
                      flex
                      shrink-0
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-950
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-violet-600
                      hover:shadow-lg
                      dark:bg-white
                      dark:text-slate-950
                      dark:hover:bg-violet-500
                      dark:hover:text-white
                    "
                  >
                    View job

                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="
                        transition-transform
                        duration-300
                        group-hover/btn:translate-x-1
                      "
                    />
                  </Link>
                </div>

                {/* Hover glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -right-24
                    h-48
                    w-48
                    rounded-full
                    bg-violet-500/[0.08]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </article>
            );
          })}
        </div>

      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes jobCardEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .job-card-enter {
          opacity: 0;
          animation: jobCardEnter 0.65s
            cubic-bezier(.22,1,.36,1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card-enter {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedJobs;