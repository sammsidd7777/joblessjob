import React, { useEffect, useState } from "react";
import { Search, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import { useGetAllcompanyQuery } from "../../RTK/CompanyService";
import Seo from "../../components/common/Seo";

import staticCompanies from "../../Data/companyData";
import CompanyCard from "../../components/company/CompanyCard";

const BrowseCompanies = () => {
  const [search, setSearch] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const {
    data: companiesData,
    isLoading,
    isError,
  } = useGetAllcompanyQuery();

  const apiCompanies = companiesData?.companies || [];

  const companies =
    !isError && apiCompanies.length > 0
      ? apiCompanies
      : staticCompanies;

  const filteredCompanies = companies.filter((company) => {
    const companyName = company.companyName || company.name || "";

    return companyName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Seo
        title="Browse companies"
        description="Explore companies hiring right now. Discover open roles, company profiles, and industries."
        path="/companies"
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden">
        {/* Background */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {/* Blue glow */}

          <div
            className="
              absolute
              -left-40
              -top-40
              h-[420px]
              w-[420px]
              rounded-full
              bg-blue-500/[0.10]
              blur-[120px]
            "
          />

          {/* Purple glow */}

          <div
            className="
              absolute
              -right-40
              top-20
              h-[420px]
              w-[420px]
              rounded-full
              bg-purple-500/[0.09]
              blur-[120px]
            "
          />

          {/* Bottom glow */}

          <div
            className="
              absolute
              bottom-[-180px]
              left-1/2
              h-[350px]
              w-[600px]
              -translate-x-1/2
              rounded-full
              bg-indigo-500/[0.06]
              blur-[120px]
            "
          />

          {/* Grid */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]
              [background-size:55px_55px]
              dark:opacity-[0.035]
              dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-4
            pb-16
            pt-16
            sm:px-6
            sm:pb-20
            lg:px-8
            lg:pt-20
          "
        >
          {/* =================================================
              HERO CONTENT
          ================================================== */}

          <div className="mx-auto max-w-4xl text-center">
            {/* Small badge */}

            <div
              className="
                hero-fade-in
                mx-auto
                mb-6
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white/80
                px-4
                py-2
                text-xs
                font-bold
                text-blue-600
                shadow-sm
                backdrop-blur-md
                dark:border-blue-500/20
                dark:bg-white/[0.04]
                dark:text-blue-400
              "
            >
              <Sparkles
                size={14}
                className="animate-pulse"
              />

              <span>Discover companies worth knowing</span>
            </div>

            {/* =================================================
                CRAZY ANIMATED LINE
            ================================================== */}

            <div className="overflow-hidden">
              <h1
                className="
                  hero-title
                  text-4xl
                  font-black
                  leading-[1.05]
                  tracking-[-0.055em]
                  text-slate-900
                  sm:text-5xl
                  lg:text-[64px]
                  dark:text-white
                "
              >
                The next company
                <br />

                <span
                  className="
                    relative
                    inline-block
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  you’ll love working for
                </span>

                <br />

                <span className="text-slate-900 dark:text-white">
                  might be here
                  <span
                    className={`
                      ml-1
                      inline-block
                      text-blue-600
                      transition-opacity
                      duration-150
                      dark:text-blue-400
                      ${showCursor ? "opacity-100" : "opacity-0"}
                    `}
                  >
                    |
                  </span>
                </span>
              </h1>
            </div>

            {/* Supporting text */}

            <p
              className="
                hero-fade-in-delay
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                dark:text-slate-400
              "
            >
              Explore companies, discover their open roles, and find
              a workplace that actually feels right for your next move.
            </p>
          </div>

          {/* =================================================
              SEARCH
          ================================================== */}

          <div
            className="
              hero-search
              mx-auto
              mt-10
              max-w-2xl
            "
          >
            <div
              className="
                group
                relative
                flex
                items-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                transition-all
                duration-300
                focus-within:border-blue-500
                focus-within:shadow-[0_20px_70px_rgba(37,99,235,0.12)]
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/20
              "
            >
              <Search
                size={22}
                className="
                  ml-4
                  shrink-0
                  text-slate-400
                  transition-colors
                  duration-300
                  group-focus-within:text-blue-600
                  dark:group-focus-within:text-blue-400
                "
              />

              <input
                type="text"
                placeholder="Search companies by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  px-4
                  py-4
                  text-sm
                  text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  dark:text-white
                "
              />

              <button
                type="button"
                className="
                  hidden
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  sm:block
                "
              >
                Search
              </button>
            </div>
          </div>

          {/* Tiny trust line */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-slate-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span>
              Companies hiring • Opportunities waiting
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMPANY CONTENT
      ====================================================== */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          pb-20
          sm:px-6
          lg:px-8
        "
      >
        {/* Section Header */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <Building2
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                Top Companies
              </h2>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {filteredCompanies.length} companies available
            </p>
          </div>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-blue-600
                transition-colors
                hover:text-blue-700
                dark:text-blue-400
              "
            >
              Clear search

              <ArrowUpRight size={16} />
            </button>
          )}
        </div>

        {/* =================================================
            LOADING
        ================================================== */}

        {isLoading && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-72
                  animate-pulse
                  rounded-3xl
                  bg-slate-200
                  dark:bg-slate-800
                "
              />
            ))}
          </div>
        )}

        {/* =================================================
            COMPANIES
        ================================================== */}

        {!isLoading && filteredCompanies.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company}
              />
            ))}
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {!isLoading && filteredCompanies.length === 0 && (
          <div
            className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-slate-300
              bg-white
              text-center
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <div
              className="
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                dark:bg-slate-800
              "
            >
              <Building2
                size={30}
                className="text-slate-400"
              />
            </div>

            <h3
              className="
                text-lg
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              No companies found
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Try searching with a different company name.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes heroTitleReveal {
          0% {
            opacity: 0;
            transform: translateY(35px);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroSearchReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hero-title {
          opacity: 0;
          animation:
            heroTitleReveal
            0.9s
            cubic-bezier(.22, 1, .36, 1)
            0.15s
            forwards;
        }

        .hero-fade-in {
          opacity: 0;
          animation:
            heroFadeIn
            0.6s
            ease-out
            forwards;
        }

        .hero-fade-in-delay {
          opacity: 0;
          animation:
            heroFadeIn
            0.7s
            ease-out
            0.45s
            forwards;
        }

        .hero-search {
          opacity: 0;
          animation:
            heroSearchReveal
            0.7s
            cubic-bezier(.22, 1, .36, 1)
            0.6s
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-title,
          .hero-fade-in,
          .hero-fade-in-delay,
          .hero-search {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </main>
  );
};

export default BrowseCompanies;