import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Bookmark,
  Eye,
  FileText,
  UserRound,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Search,
} from "lucide-react";

import { useGetUserDashboardQuery } from "../../RTK/AuthService";
import Seo from "../../components/common/Seo";

const Dashboard = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserDashboardQuery();

  const dashboardData = userData?.data;

  const similarJobs = dashboardData?.similarJobs || [];
  const thingsToUpdate = dashboardData?.thingsToUpdate || [];

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <p className="font-semibold">
            Unable to load your dashboard
          </p>

          <p className="mt-1">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      label: "Interviews",
      value: dashboardData?.totalInterview || 0,
      icon: Clock3,
      description: "Upcoming interviews",
    },
    {
      label: "Profile Views",
      value: dashboardData?.totalProfileView || 0,
      icon: Eye,
      description: "Recruiter views",
    },
    {
      label: "Saved Jobs",
      value: dashboardData?.totalSavedJob || 0,
      icon: Bookmark,
      description: "Jobs saved",
    },
    {
      label: "Applications",
      value: dashboardData?.totalApplication || 0,
      icon: BriefcaseBusiness,
      description: "Applications sent",
    },
  ];

  // =====================================================
  // PROFILE SCORE
  // =====================================================

  const profileScore = Math.min(
    Math.max(Number(dashboardData?.profileScore) || 0, 0),
    100
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
      <Seo title="Dashboard" noindex />

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <section
        className="
          relative overflow-hidden
          rounded-3xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-7
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Background decoration */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-40
            w-40
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Welcome */}

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <UserRound size={18} />
              </span>

              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Candidate Dashboard
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Welcome back,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {dashboardData?.userName || "User"}
              </span>{" "}
              👋
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Here are your latest job recommendations and career updates.
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Link
              to="/candidate/profile"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-300
                hover:bg-blue-50
                hover:text-blue-600
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
              "
            >
              <UserRound size={16} />

              <span>Edit Profile</span>
            </Link>

            <Link
              to="/candidate/resume"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-blue-700
                hover:shadow-xl
                sm:px-5
              "
            >
              <FileText size={16} />

              <span>Update Resume</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
                sm:p-5
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white
                    dark:bg-blue-950/40
                    dark:text-blue-400
                  "
                >
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
                {item.label}
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {item.value}
              </h2>

              <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
        {/* =====================================================
            RECOMMENDED JOBS
        ====================================================== */}

        <section className="min-w-0 space-y-5 xl:col-span-2">
          {/* Section Header */}

          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                  Recommended Jobs
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Jobs matching your profile and preferences.
              </p>
            </div>

            <Link
              to="/find-job"
              className="
                group
                flex
                shrink-0
                items-center
                gap-1
                text-xs
                font-semibold
                text-blue-600
                transition
                hover:text-blue-700
                sm:text-sm
              "
            >
              View All

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* =====================================================
              NO JOBS
          ====================================================== */}

          {similarJobs.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                p-8
                text-center
                sm:p-10
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                No recommended jobs yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Complete your profile to help us find better job
                recommendations for you.
              </p>

              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/candidate/profile"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Complete Profile
                </Link>

                <Link
                  to="/find-job"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-100
                    dark:border-slate-700
                    dark:text-slate-200
                    dark:hover:bg-slate-800
                  "
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          ) : (
            /* =====================================================
               JOB LIST
            ====================================================== */

            <div className="space-y-4">
              {similarJobs.map((job) => (
                <article
                  key={job._id}
                  className="
                    group
                    flex
                    flex-col
                    gap-5
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-blue-200
                    hover:shadow-lg
                    sm:p-5
                    md:flex-row
                    md:items-center
                    md:justify-between
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:hover:border-slate-700
                  "
                >
                  {/* JOB INFO */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      {/* Company Logo */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-xl
                          bg-slate-100
                          text-sm
                          font-bold
                          text-slate-500
                          dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        {job.company?.logo ? (
                          <img
                            src={job.company.logo}
                            alt={job.company?.name || "Company"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          job.company?.name?.charAt(0)?.toUpperCase() || "C"
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                          {job.title || "Job Opportunity"}
                        </h3>

                        <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                          {job.company?.name || "Company"}
                        </p>
                      </div>
                    </div>

                    {/* TAGS */}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.employmentType && (
                        <span
                          className="
                            rounded-lg
                            bg-slate-100
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-600
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >
                          {job.employmentType}
                        </span>
                      )}

                      {(job.salaryRange?.min ||
                        job.salaryRange?.max) && (
                        <span
                          className="
                            rounded-lg
                            bg-blue-50
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-blue-600
                            dark:bg-blue-950/40
                            dark:text-blue-400
                          "
                        >
                          ₹{job.salaryRange?.min || 0}
                          {" - "}
                          ₹{job.salaryRange?.max || 0}
                        </span>
                      )}

                      {job.location && (
                        <span
                          className="
                            rounded-lg
                            bg-slate-100
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-600
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >
                          {job.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* VIEW JOB */}

                  <Link
                    to={`/jobs/${job._id}`}
                    className="
                      group/button
                      inline-flex
                      w-full
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-blue-700
                      md:w-auto
                    "
                  >
                    <span>View Job</span>

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/button:translate-x-0.5"
                    />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            RIGHT SIDEBAR
        ====================================================== */}

        <aside className="space-y-6">
          {/* =====================================================
              PROFILE COMPLETION
          ====================================================== */}

          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-blue-600
              p-5
              text-white
              shadow-lg
              shadow-blue-600/20
              sm:p-6
            "
          >
            {/* Decorative circle */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-white/10
              "
            />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold">
                    Complete Profile
                  </h3>

                  <p className="mt-1 text-xs text-blue-100">
                    Improve your job matches
                  </p>
                </div>

                <span className="text-lg font-black">
                  {profileScore}%
                </span>
              </div>

              {/* PROGRESS */}

              <div className="mb-5 h-2 overflow-hidden rounded-full bg-blue-400/60">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{
                    width: `${profileScore}%`,
                  }}
                />
              </div>

              {/* THINGS TO UPDATE */}

              {thingsToUpdate.length > 0 ? (
                <div className="space-y-2.5">
                  {thingsToUpdate.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-xs text-blue-100"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle2 size={17} />

                  <span>
                    Your profile is complete 🎉
                  </span>
                </div>
              )}

              <Link
                to="/candidate/profile"
                className="
                  mt-5
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-blue-600
                  transition
                  hover:bg-blue-50
                "
              >
                Update Profile

                <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              dark:border-slate-800
              dark:bg-slate-900
              sm:p-6
            "
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Quick Actions
            </h3>

            <div className="mt-4 space-y-2">
              <Link
                to="/find-job"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-slate-50
                  px-3
                  py-3
                  transition
                  hover:bg-blue-50
                  dark:bg-slate-800
                  dark:hover:bg-slate-700
                "
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <Search size={17} />
                  </span>

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Find Jobs
                  </span>
                </span>

                <ArrowRight
                  size={16}
                  className="text-slate-400 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/candidate/saved-jobs"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-slate-50
                  px-3
                  py-3
                  transition
                  hover:bg-blue-50
                  dark:bg-slate-800
                  dark:hover:bg-slate-700
                "
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
                    <Bookmark size={17} />
                  </span>

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Saved Jobs
                  </span>
                </span>

                <ArrowRight
                  size={16}
                  className="text-slate-400 transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/candidate/applications"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-slate-50
                  px-3
                  py-3
                  transition
                  hover:bg-blue-50
                  dark:bg-slate-800
                  dark:hover:bg-slate-700
                "
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                    <BriefcaseBusiness size={17} />
                  </span>

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    My Applications
                  </span>
                </span>

                <ArrowRight
                  size={16}
                  className="text-slate-400 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>

          {/* =====================================================
              RECENT ACTIVITY
          ====================================================== */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              dark:border-slate-800
              dark:bg-slate-900
              sm:p-6
            "
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Recent Activity
              </h3>

              <Clock3
                size={17}
                className="text-slate-400"
              />
            </div>

            {/* No fake activity */}

            <div className="mt-5 rounded-xl bg-slate-50 p-5 text-center dark:bg-slate-800">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm dark:bg-slate-900">
                <Clock3 size={18} />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                No recent activity
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your applications, saved jobs and other activity will appear
                here.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;