import React, { useEffect, useState } from "react";
import {
  Search,
  Building2,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

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
    const companyName =
      company.companyName || company.name || "";

    return companyName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  /* =========================
     CURSOR
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#F5F2EA]">

      <Seo
        title="Browse Companies"
        description="Explore companies hiring right now. Discover open roles, company profiles, and industries."
        path="/companies"
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-white/[0.07]">

        {/* BACKGROUND */}

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
              bg-blue-600/[0.08]
              blur-[120px]
            "
          />

          {/* Purple glow */}

          <div
            className="
              absolute
              -right-40
              top-10
              h-[420px]
              w-[420px]
              rounded-full
              bg-purple-600/[0.07]
              blur-[120px]
            "
          />

          {/* Bottom glow */}

          <div
            className="
              absolute
              bottom-[-180px]
              left-1/2
              h-[360px]
              w-[650px]
              -translate-x-1/2
              rounded-full
              bg-indigo-600/[0.05]
              blur-[120px]
            "
          />

          {/* GRID */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
              [background-size:56px_56px]
            "
          />
        </div>

        {/* HERO CONTAINER */}

       <div
  className="
    relative
    mx-auto
    max-w-[1200px]
    px-5
    pb-14
    pt-6
    sm:px-8
    sm:pb-16
    sm:pt-8
    lg:px-8
    lg:pb-20
    lg:pt-10
  "
>

         {/* STATUS */}
<div
  className="
    hero-fade-in
    mx-auto
    mb-7
    mt-12
    flex
    w-fit
    items-center
    gap-2
    rounded-full
    border
    border-white/[0.08]
    bg-white/[0.035]
    px-3
    py-2.5
    backdrop-blur-md
    sm:mt-14
    lg:mt-16
    sm:py-3
  "
>
  <span className="relative flex h-2 w-2">
    <span
      className="
        absolute
        inline-flex
        h-full
        w-full
        animate-ping
        rounded-full
        bg-emerald-400
        opacity-60
      "
    />

    <span
      className="
        relative
        inline-flex
        h-2
        w-2
        rounded-full
        bg-emerald-400
      "
    />
  </span>

  <span
    className="
      text-[9px]
      font-black
      uppercase
      tracking-[0.2em]
      text-[#8B8985]
    "
  >
    Companies hiring
  </span>
</div>
          {/* HERO CONTENT */}

          <div className="mx-auto max-w-4xl text-center">

            <div className="overflow-hidden">

              <h1
                className="
                  hero-title
                  text-4xl
                  font-black
                  leading-[1.04]
                  tracking-[-0.055em]
                  text-[#F5F2EA]
                  sm:text-5xl
                  lg:text-[64px]
                "
              >
                Find companies

                <br />

                <span
                  className="
                    inline-block
                    bg-gradient-to-r
                    from-blue-500
                    via-indigo-500
                    to-purple-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  worth working for
                </span>

                <br />

                <span>
                  and grow with them
                  <span
                    className={`
                      ml-1
                      inline-block
                      text-blue-400
                      transition-opacity
                      duration-150
                      ${
                        showCursor
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  >
                    |
                  </span>
                </span>
              </h1>

            </div>

            <p
              className="
                hero-fade-in-delay
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-[#8B8985]
                sm:text-base
              "
            >
              Explore companies, discover their open roles,
              and find the workplace that feels right for
              your next move.
            </p>

          </div>

          {/* SEARCH */}

          <div
            className="
              hero-search
              mx-auto
              mt-9
              max-w-[720px]
            "
          >

            <div
              className="
                group
                flex
                items-center
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.10]
                bg-[#111214]
                shadow-[0_20px_60px_rgba(0,0,0,.45)]
                transition-all
                duration-300
                focus-within:border-indigo-500/40
                focus-within:shadow-[0_20px_70px_rgba(79,70,229,.10)]
              "
            >

              <Search
                size={19}
                className="
                  ml-5
                  shrink-0
                  text-[#5C5A55]
                  transition-colors
                  group-focus-within:text-indigo-400
                "
              />

              <input
                type="text"
                placeholder="Search companies by name..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  min-w-0
                  bg-transparent
                  px-4
                  py-4
                  text-sm
                  text-[#F5F2EA]
                  outline-none
                  placeholder:text-[#5C5A55]
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    mr-2
                    rounded-lg
                    p-2
                    text-[#5C5A55]
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="button"
                onClick={() => {}}
                className="
                  hidden
                  items-center
                  gap-2
                  bg-indigo-400
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  text-[#0A0A0C]
                  transition
                  hover:bg-indigo-300
                  sm:flex
                "
              >
                Search
                <Search size={15} />
              </button>

            </div>

            {/* SEARCH META */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                px-1
                text-[10px]
                text-[#5C5A55]
              "
            >
              <span>
                {search
                  ? `${filteredCompanies.length} results found`
                  : `${companies.length} companies available`}
              </span>

              <span className="hidden sm:block">
                Search by company name
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          COMPANIES
      ====================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-[1200px]
          px-5
          pb-20
          pt-10
          sm:px-8
          sm:pt-12
          lg:px-8
          lg:pt-14
        "
      >

        {/* SECTION HEADER */}

        <div
          className="
            mb-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <div className="flex items-center gap-2.5">

              <Building2
                size={18}
                className="text-indigo-400"
              />

              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-[#F5F2EA]
                  sm:text-2xl
                "
              >
                Explore companies
              </h2>

            </div>

            <p
              className="
                mt-1.5
                text-xs
                text-[#6B6963]
                sm:text-sm
              "
            >
              {filteredCompanies.length}{" "}
              {filteredCompanies.length === 1
                ? "company"
                : "companies"}{" "}
              available
            </p>

          </div>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                flex
                w-fit
                items-center
                gap-2
                text-xs
                font-medium
                text-indigo-400
                transition
                hover:text-indigo-300
              "
            >
              Clear search
              <X size={14} />
            </button>
          )}

        </div>

        {/* LOADING */}

        {isLoading && (
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  h-64
                  animate-pulse
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#111214]
                "
              />
            ))}
          </div>
        )}

        {/* COMPANIES */}

        {!isLoading &&
          filteredCompanies.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                gap-4
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

        {/* EMPTY */}

        {!isLoading &&
          filteredCompanies.length === 0 && (
            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#111214]
                px-6
                text-center
              "
            >

              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                "
              >
                <Building2
                  size={24}
                  className="text-[#5C5A55]"
                />
              </div>

              <h3
                className="
                  text-base
                  font-semibold
                  text-[#F5F2EA]
                "
              >
                No companies found
              </h3>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-xs
                  leading-6
                  text-[#6B6963]
                "
              >
                We couldn't find any company matching
                "{search}". Try another company name.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  mt-5
                  rounded-xl
                  bg-indigo-400
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#0A0A0C]
                  transition
                  hover:bg-indigo-300
                "
              >
                View all companies
              </button>

            </div>
          )}

      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      {!isLoading &&
        filteredCompanies.length > 0 && (
          <section className="px-5 pb-16 sm:px-8">

            <div
              className="
                mx-auto
                flex
                max-w-[1200px]
                flex-col
                gap-5
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#111214]
                px-5
                py-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-7
              "
            >

              <div>

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={14}
                    className="text-indigo-400"
                  />

                  <span
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-indigo-400
                    "
                  >
                    Find your next move
                  </span>

                </div>

                <h3
                  className="
                    mt-1.5
                    text-sm
                    font-semibold
                    text-[#F5F2EA]
                  "
                >
                  Find a company where you belong.
                </h3>

              </div>

              <button
                type="button"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-[#B8B6B0]
                  transition
                  hover:border-indigo-500/25
                  hover:bg-indigo-500/[0.06]
                  hover:text-indigo-300
                "
              >
                Explore companies

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    group-hover:translate-x-0.5
                  "
                />
              </button>

            </div>

          </section>
        )}

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