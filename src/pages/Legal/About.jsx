import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Search,
  ShieldCheck,
  Target,
  Users,
  Sparkles,
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">

        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[120px]" />

          <div className="absolute right-[-120px] top-[30%] h-[350px] w-[350px] rounded-full bg-indigo-500/[0.07] blur-[110px]" />

          <div className="absolute bottom-[-150px] left-[-100px] h-[320px] w-[320px] rounded-full bg-cyan-500/[0.06] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full
                border border-blue-200
                bg-blue-50
                px-4 py-2
                text-xs font-semibold
                text-blue-600
                dark:border-blue-900/50
                dark:bg-blue-950/30
                dark:text-blue-400
              "
            >
              <Sparkles size={14} aria-hidden="true" />
              About JoblessJob
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl font-black tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
                dark:text-white
              "
            >
              Helping you find your
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-violet-600
                  bg-clip-text
                  text-transparent
                "
              >
                next opportunity.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto mt-6 max-w-2xl
                text-base leading-7
                text-slate-500
                sm:text-lg
                dark:text-slate-400
              "
            >
              JoblessJob is a job discovery platform built to make
              finding relevant career opportunities simpler, clearer,
              and more accessible.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Content */}
          <div>

            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Who We Are
            </p>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              A simpler way to discover career opportunities.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-400">

              <p>
                JoblessJob is designed to help job seekers discover
                employment opportunities from different companies and
                industries in one convenient place.
              </p>

              <p>
                Our goal is to reduce the time and effort people spend
                searching across different sources by providing a
                straightforward job discovery experience.
              </p>

              <p>
                We focus on making job information easy to browse,
                search, and understand while encouraging users to verify
                important details before applying.
              </p>

            </div>

          </div>

          {/* Visual Card */}
          <div className="relative">

            <div
              className="
                rounded-3xl
                border border-slate-200
                bg-white
                p-8
                shadow-[0_25px_70px_-30px_rgba(15,23,42,0.25)]
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-950/30">
                  <Search
                    className="text-blue-600 dark:text-blue-400"
                    size={28}
                  />

                  <p className="mt-4 text-sm font-bold">
                    Discover
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Explore available job opportunities.
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
                  <BriefcaseBusiness
                    className="text-indigo-600 dark:text-indigo-400"
                    size={28}
                  />

                  <p className="mt-4 text-sm font-bold">
                    Explore
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Find roles that match your interests.
                  </p>
                </div>

                <div className="rounded-2xl bg-violet-50 p-6 dark:bg-violet-950/30">
                  <Building2
                    className="text-violet-600 dark:text-violet-400"
                    size={28}
                  />

                  <p className="mt-4 text-sm font-bold">
                    Companies
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Learn more about companies and opportunities.
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-6 dark:bg-cyan-950/30">
                  <ShieldCheck
                    className="text-cyan-600 dark:text-cyan-400"
                    size={28}
                  />

                  <p className="mt-4 text-sm font-bold">
                    Stay Aware
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Verify important information before applying.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          OUR MISSION
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div
              className="
                mx-auto flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
                dark:bg-blue-950/40
                dark:text-blue-400
              "
            >
              <Target size={26} aria-hidden="true" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Make job discovery simpler.
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              We want to make it easier for people to discover useful
              career opportunities without making the job search process
              unnecessarily complicated. JoblessJob is being built with
              a focus on simplicity, accessibility, and useful information.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE OFFER
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Built around the job seeker.
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
            JoblessJob currently focuses on providing a straightforward
            public job discovery experience.
          </p>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* Card 1 */}
          <div
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-7
              transition
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Search size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              Job Discovery
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Search and explore available opportunities using
              relevant keywords and locations.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-7
              transition
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Building2 size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              Company Discovery
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Explore companies and discover opportunities associated
              with different organizations.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-7
              transition
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
              <Users size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              Future Community
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Candidate and employer features are currently being
              developed and will be introduced in future updates.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          TRANSPARENCY
      ====================================================== */}
      <section className="border-y border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/50">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Our Approach
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Useful information. Clear expectations.
              </h2>

              <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Job information can change quickly. We therefore
                encourage users to review and verify important details
                such as company information, job requirements, salary,
                location, and application instructions before applying.
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border border-slate-200
                bg-white
                p-8
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="space-y-6">

                <div className="flex gap-4">
                  <ShieldCheck
                    className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold">
                      Verify before applying
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Always review the employer and application details
                      before submitting personal information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <BriefcaseBusiness
                    className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                    size={22}
                  />

                  <div>
                    <h3 className="font-bold">
                      Explore opportunities
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Use JoblessJob as a convenient starting point for
                      discovering career opportunities.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FUTURE
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div
          className="
            overflow-hidden
            rounded-3xl
            bg-slate-950
            px-7 py-12
            text-center
            shadow-2xl
            sm:px-12
            lg:px-16
          "
        >

          <div className="mx-auto max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              What's Next
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              We're building more for your career journey.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Candidate profiles, saved jobs, application tracking,
              employer accounts, and other features are currently
              being developed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/find-job"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-6 py-3
                  text-sm font-bold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Explore Jobs
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-slate-700
                  px-6 py-3
                  text-sm font-bold
                  text-slate-200
                  transition
                  hover:border-slate-500
                  hover:bg-slate-900
                "
              >
                Contact Us
              </Link>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default About;