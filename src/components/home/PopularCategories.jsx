import { Link } from "react-router-dom";
import {
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  BriefcaseBusiness,
  UsersRound,
  PenLine,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Technology",
    shortName: "Technology",
    description: "Developer, IT Support, QA, DevOps & more.",
    icon: Code2,
    search: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Design & Creative",
    shortName: "Design & Creative",
    description: "UI/UX, Graphic Design, Video Editing & more.",
    icon: Palette,
    search: "Design Creative",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Marketing",
    shortName: "Marketing",
    description: "Digital Marketing, SEO, Social Media & more.",
    icon: Megaphone,
    search: "Marketing",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Data & Analytics",
    shortName: "Data & Analytics",
    description: "Data Analyst, MIS, Business Analyst & more.",
    icon: BarChart3,
    search: "Data Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sales & Business",
    shortName: "Sales & Business",
    description: "Sales, Business Development & Relationship roles.",
    icon: BriefcaseBusiness,
    search: "Sales Business",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "HR & Recruitment",
    shortName: "HR & Recruitment",
    description: "HR, Recruiter, Talent Acquisition & more.",
    icon: UsersRound,
    search: "HR Recruitment",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Content & Writing",
    shortName: "Content & Writing",
    description: "Content Writer, Copywriter, Editor & more.",
    icon: PenLine,
    search: "Content Writing",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
];

const PopularCategories = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f7f3]
        py-20
        text-slate-950
        dark:bg-[#06070a]
        dark:text-white
      "
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute -left-32 top-10
            h-96 w-96
            rounded-full
            bg-violet-500/[0.07]
            blur-[120px]
          "
        />

        <div
          className="
            absolute -right-32 bottom-0
            h-96 w-96
            rounded-full
            bg-cyan-400/[0.06]
            blur-[120px]
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]
            [background-size:55px_55px]
            dark:opacity-[0.035]
            dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div
          className="
            mb-12
            flex flex-col gap-6
            md:flex-row md:items-end md:justify-between
          "
        >
          <div className="max-w-2xl">

            <div
              className="
                mb-4
                inline-flex items-center gap-2
                text-[10px] font-black uppercase
                tracking-[0.2em]
                text-violet-600
                dark:text-violet-400
              "
            >
              <Sparkles size={14} />
              Explore opportunities
            </div>

            <h2
              className="
                text-4xl font-black
                leading-[0.95]
                tracking-[-0.06em]
                text-slate-950
                sm:text-5xl
                lg:text-[56px]
                dark:text-white
              "
            >
              Find your
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
                kind of work.
              </span>
            </h2>

            <p
              className="
                mt-4
                text-sm font-medium
                text-slate-500
                sm:text-base
                dark:text-slate-400
              "
            >
              Explore jobs across different fields and find what fits you.
            </p>
          </div>

          <Link
            to="/find-job"
            className="
              group inline-flex w-fit items-center gap-2
              rounded-xl
              border border-slate-200
              bg-white
              px-5 py-3
              text-sm font-bold text-slate-800
              shadow-sm
              transition-all duration-300
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
            View all jobs

            <ArrowUpRight
              size={16}
              className="
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/find-job?search=${encodeURIComponent(
                  category.search
                )}`}
                style={{
                  animationDelay: `${index * 70}ms`,
                }}
                className="
                  category-card-enter
                  group relative overflow-hidden
                  rounded-[26px]
                  border border-slate-200
                  bg-white
                  shadow-sm
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-violet-200
                  hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
                  dark:border-white/[0.08]
                  dark:bg-[#0d1018]
                  dark:hover:border-violet-500/20
                "
              >

                {/* IMAGE */}
                <div className="relative h-40 overflow-hidden">

                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="
                      h-full w-full object-cover
                      transition-transform duration-700 ease-out
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                    "
                  />

                  <span
                    className="
                      absolute right-4 top-4
                      text-[10px] font-black
                      tracking-[0.15em]
                      text-white/60
                    "
                  >
                    0{index + 1}
                  </span>

                  <div
                    className="
                      absolute bottom-4 left-4
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-white/20
                      bg-white/90
                      text-violet-600
                      shadow-xl
                      backdrop-blur-md
                      transition-all duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                      dark:bg-[#0d1018]/90
                      dark:text-violet-400
                    "
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-center justify-between gap-3">

                    <h3
                      className="
                        text-lg font-black
                        tracking-tight
                        text-slate-950
                        transition-colors duration-300
                        group-hover:text-violet-600
                        dark:text-white
                        dark:group-hover:text-violet-400
                      "
                    >
                      {category.shortName}
                    </h3>

                    <span
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-400
                        transition-all duration-300
                        group-hover:bg-violet-600
                        group-hover:text-white
                        dark:bg-white/[0.06]
                        dark:text-slate-500
                        dark:group-hover:bg-violet-500
                        dark:group-hover:text-white
                      "
                    >
                      <ArrowUpRight
                        size={15}
                        className="
                          transition-transform duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </span>
                  </div>

                  <p
                    className="
                      mt-2 min-h-[42px]
                      text-sm leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {category.description}
                  </p>

                  <div
                    className="
                      mt-4 flex items-center justify-between
                      border-t border-slate-100
                      pt-4
                      dark:border-white/[0.07]
                    "
                  >
                    <span
                      className="
                        text-[11px] font-black
                        uppercase tracking-[0.12em]
                        text-slate-400
                        transition-colors duration-300
                        group-hover:text-violet-600
                        dark:group-hover:text-violet-400
                      "
                    >
                      Browse jobs
                    </span>

                    <span
                      className="
                        h-1.5 w-1.5
                        rounded-full
                        bg-slate-300
                        transition-all duration-300
                        group-hover:w-5
                        group-hover:bg-violet-500
                      "
                    />
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute -bottom-20 -right-20
                    h-40 w-40
                    rounded-full
                    bg-violet-500/[0.10]
                    opacity-0
                    blur-3xl
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />
              </Link>
            );
          })}

          {/* =================================================
              8TH CARD — VIEW MORE CATEGORIES
          ================================================= */}

          <Link
            to="/find-job"
            className="
              category-card-enter
              group relative
              flex min-h-[286px]
              flex-col items-center justify-center
              overflow-hidden
              rounded-[26px]
              border border-dashed
              border-slate-300
              bg-transparent
              text-center
              transition-all duration-500
              hover:-translate-y-2
              hover:border-violet-400
              hover:bg-violet-50/60
              dark:border-white/10
              dark:hover:border-violet-500/40
              dark:hover:bg-violet-500/[0.05]
            "
            style={{
              animationDelay: `${categories.length * 70}ms`,
            }}
          >
            {/* Decorative circle */}
            <div
              className="
                absolute -right-10 -top-10
                h-28 w-28 rounded-full
                border border-violet-500/10
                transition-transform duration-700
                group-hover:scale-150
              "
            />

            <div
              className="
                relative mb-5
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                border border-slate-200
                bg-white
                text-violet-600
                shadow-sm
                transition-all duration-500
                group-hover:scale-110
                group-hover:rotate-3
                group-hover:border-violet-300
                group-hover:shadow-lg
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-violet-400
              "
            >
              <ArrowUpRight
                size={24}
                className="
                  transition-transform duration-500
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </div>

            <h3
              className="
                text-lg font-black
                tracking-tight
                text-slate-900
                transition-colors duration-300
                group-hover:text-violet-600
                dark:text-white
                dark:group-hover:text-violet-400
              "
            >
              See all categories
            </h3>

            <p
              className="
                mt-2 max-w-[220px]
                text-sm leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Can't find your field?
              <br />
              Explore more job categories.
            </p>

            <span
              className="
                mt-5
                text-[10px] font-black
                uppercase tracking-[0.16em]
                text-violet-600
                dark:text-violet-400
              "
            >
              Click here →
            </span>
          </Link>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes categoryCardEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .category-card-enter {
          opacity: 0;
          animation: categoryCardEnter
            0.65s
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-card-enter {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularCategories;