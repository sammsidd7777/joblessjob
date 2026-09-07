import React, { useMemo, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  useDeleteSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import Seo from "../../components/common/Seo";

const SavedJobsHome = () => {
  const { data, isLoading, isError } = useGetSavedJobsQuery();

  const [deleteSavedJob, { isLoading: deleting }] =
    useDeleteSavedJobMutation();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const savedJobs = data?.savedJobs || [];

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isClosedJob = (job) => {
    if (job?.status === "closed") {
      return true;
    }

    if (job?.deadline) {
      const deadline = new Date(job.deadline);

      if (
        !Number.isNaN(deadline.getTime()) &&
        deadline < new Date()
      ) {
        return true;
      }
    }

    return false;
  };

  /* =========================================================
     COMPANY
  ========================================================= */

  const getCompanyName = (job) => {
    if (typeof job?.company === "object") {
      return (
        job.company?.name ||
        job.company?.companyName ||
        "Company"
      );
    }

    return job?.company || "Company";
  };

  const getCompanyId = (job) => {
    if (typeof job?.company === "object") {
      return job.company?._id || null;
    }

    return job?.companyId || null;
  };

  const getCompanyLogo = (job) => {
    if (typeof job?.company === "object") {
      return (
        job.company?.logo ||
        job.company?.companyLogo ||
        job.company?.image ||
        null
      );
    }

    return job?.companyLogo || null;
  };

  const getCompanyInitial = (job) => {
    const companyName = getCompanyName(job);

    return (
      companyName
        ?.trim()
        ?.charAt(0)
        ?.toUpperCase() || "C"
    );
  };

  /* =========================================================
     JOB DATA
  ========================================================= */

  const getJobType = (job) => {
    return (
      job?.jobType ||
      job?.employmentType ||
      job?.type ||
      "Full Time"
    );
  };

  const getEmploymentType = (job) => {
    return (
      job?.employmentType ||
      job?.jobType ||
      "Full Time"
    );
  };

  const getSalary = (job) => {
    return (
      job?.salaryRange ||
      job?.salary ||
      job?.ctc ||
      job?.package ||
      null
    );
  };

  const formatSalary = (salary) => {
    if (!salary) {
      return null;
    }

    if (typeof salary === "string") {
      return salary;
    }

    if (typeof salary === "number") {
      return `₹${salary.toLocaleString("en-IN")}`;
    }

    if (typeof salary === "object") {
      const min =
        salary?.min ??
        salary?.minimum ??
        null;

      const max =
        salary?.max ??
        salary?.maximum ??
        null;

      const currency =
        salary?.currency || "₹";

      if (min !== null && max !== null) {
        return `${currency}${Number(min).toLocaleString(
          "en-IN"
        )} - ${currency}${Number(max).toLocaleString(
          "en-IN"
        )}`;
      }

      if (min !== null) {
        return `${currency}${Number(min).toLocaleString(
          "en-IN"
        )}+`;
      }

      if (max !== null) {
        return `Up to ${currency}${Number(max).toLocaleString(
          "en-IN"
        )}`;
      }

      return null;
    }

    return null;
  };

  /* =========================================================
     APPLICATION
  ========================================================= */

  const getApplyUrl = (job) => {
    return (
      job?.externalApplyUrl ||
      job?.applyUrl ||
      null
    );
  };

  const getApplyMethods = (job) => {
    if (!Array.isArray(job?.applyMethod)) {
      return [];
    }

    return job.applyMethod;
  };

  const hasEmailApply = (job) => {
    return getApplyMethods(job).some(
      (method) =>
        String(method).toLowerCase() === "email"
    );
  };

  const hasWhatsappApply = (job) => {
    return getApplyMethods(job).some(
      (method) =>
        String(method).toLowerCase() === "whatsapp"
    );
  };

  const hasExternalApply = (job) => {
    return (
      !!getApplyUrl(job) ||
      getApplyMethods(job).some((method) => {
        const normalized =
          String(method).toLowerCase();

        return (
          normalized === "external" ||
          normalized === "url" ||
          normalized === "website"
        );
      })
    );
  };

  const getApplicationLabel = (job) => {
    const methods = getApplyMethods(job);

    if (hasWhatsappApply(job)) {
      return "WhatsApp";
    }

    if (hasEmailApply(job)) {
      return "Email";
    }

    if (hasExternalApply(job)) {
      return "External";
    }

    if (methods.length > 0) {
      return methods[0];
    }

    return "Apply";
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredJobs = useMemo(() => {
    let jobs = [...savedJobs];

    const query = search.trim().toLowerCase();

    if (query) {
      jobs = jobs.filter((job) => {
        const title =
          job?.title?.toLowerCase() || "";

        const company =
          getCompanyName(job)?.toLowerCase() || "";

        const location =
          job?.location?.toLowerCase() || "";

        const employmentType =
          job?.employmentType?.toLowerCase() || "";

        const jobType =
          job?.jobType?.toLowerCase() || "";

        return (
          title.includes(query) ||
          company.includes(query) ||
          location.includes(query) ||
          employmentType.includes(query) ||
          jobType.includes(query)
        );
      });
    }

    if (filter === "active") {
      jobs = jobs.filter(
        (job) => !isClosedJob(job)
      );
    }

    if (filter === "closed") {
      jobs = jobs.filter((job) =>
        isClosedJob(job)
      );
    }

    return jobs;
  }, [savedJobs, search, filter]);

  const activeJobs = savedJobs.filter(
    (job) => !isClosedJob(job)
  ).length;

  const closedJobs = savedJobs.filter(
    (job) => isClosedJob(job)
  ).length;

  /* =========================================================
     REMOVE
  ========================================================= */

  const openRemoveModal = (job) => {
    setSelectedJob(job);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setSelectedJob(null);
    setShowRemoveModal(false);
  };

  const confirmRemove = async () => {
    if (!selectedJob?._id) {
      return;
    }

    try {
      await deleteSavedJob(
        selectedJob._id
      ).unwrap();

      closeRemoveModal();
    } catch (error) {
      console.error(
        "Failed to remove saved job:",
        error
      );
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#08090b] text-white">
        <Seo title="Saved Jobs" noindex />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "58px 58px",
          }}
        />

        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-[140px]" />

        <main className="relative mx-auto max-w-[1408px] px-5 pb-20 pt-20 sm:px-7 lg:px-10">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded bg-white/10" />

            <div className="mt-6 h-16 w-[500px] max-w-full rounded-xl bg-white/10" />

            <div className="mt-5 h-5 w-[600px] max-w-full rounded bg-white/[0.07]" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-3xl border border-white/[0.07] bg-white/[0.025]"
              />
            ))}
          </div>

          <div className="mt-7 h-16 animate-pulse rounded-2xl border border-white/[0.07] bg-[#0d0f13]" />

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="min-h-[390px] animate-pulse rounded-3xl border border-white/[0.07] bg-[#0e1014] p-5"
                >
                  <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.07]" />

                    <div className="flex-1">
                      <div className="h-4 w-3/4 rounded bg-white/[0.07]" />

                      <div className="mt-3 h-3 w-1/2 rounded bg-white/[0.07]" />
                    </div>
                  </div>

                  <div className="mt-9 space-y-4">
                    <div className="h-3 rounded bg-white/[0.07]" />
                    <div className="h-3 w-4/5 rounded bg-white/[0.07]" />
                    <div className="h-3 w-3/5 rounded bg-white/[0.07]" />
                  </div>

                  <div className="mt-12 h-10 rounded-xl bg-white/[0.07]" />
                </div>
              )
            )}
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090b] px-5 py-16 text-white">
        <Seo title="Saved Jobs" noindex />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "58px 58px",
          }}
        />

        <div className="relative w-full max-w-lg">
          <div className="rounded-[28px] border border-red-500/20 bg-[#0e1014] p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/10 text-red-400">
              <X size={25} />
            </div>

            <h1 className="mt-5 text-xl font-bold">
              Failed to load saved jobs
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/45">
              Something went wrong while loading
              your saved jobs. Please try again.
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-black transition hover:bg-white/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090b] text-white">
      <Seo title="Saved Jobs" noindex />

      {/* BACKGROUND */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "58px 58px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[620px] w-[850px] -translate-x-1/2 rounded-full bg-indigo-600/[0.075] blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[500px] h-[420px] w-[420px] rounded-full bg-purple-600/[0.04] blur-[130px]" />

      {/* =====================================================
          IMPORTANT:
          HEADER IS NOT TOUCHED.
          CONTENT STARTS BELOW HEADER.
      ===================================================== */}

      <main className="relative mx-auto max-w-[1408px] px-5 pb-24 pt-24 sm:px-7 lg:px-10">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] via-white/[0.018] to-transparent px-6 py-7 sm:px-8 sm:py-8 lg:px-11 lg:py-9">
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-500/[0.08] blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              {/* EYEBROW */}

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5">
                <Bookmark
                  size={12}
                  fill="currentColor"
                  className="text-blue-400"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Saved jobs
                </span>
              </div>

              {/* HEADING */}

              <h1 className="text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-[62px] lg:leading-[1.02]">
                Your saved
                <br />

                <span className="bg-gradient-to-r from-[#4f7cff] via-[#705cff] to-[#b52cff] bg-clip-text text-transparent">
                  opportunities.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 sm:text-base">
                Keep track of the jobs you want to
                come back to. Review the details,
                compare opportunities and apply when
                you're ready.
              </p>
            </div>

            {/* EXPLORE */}

            <Link
              to="/find-job"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.045] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.07]"
            >
              <BriefcaseBusiness
                size={16}
                className="text-white/60"
              />

              Explore jobs

              <ExternalLink
                size={14}
                className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </section>

        {/* ===================================================
            STATS
        =================================================== */}

        <section className="mt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* TOTAL */}

            <div className="group rounded-3xl border border-white/[0.07] bg-[#0d0f13] p-5 transition hover:-translate-y-0.5 hover:border-white/[0.13]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Total saved
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight">
                    {savedJobs.length}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Opportunities in your list
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-500/[0.08] text-blue-400 transition group-hover:bg-blue-500/[0.12]">
                  <Bookmark
                    size={19}
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            {/* ACTIVE */}

            <div className="group rounded-3xl border border-white/[0.07] bg-[#0d0f13] p-5 transition hover:-translate-y-0.5 hover:border-white/[0.13]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Active opportunities
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight">
                    {activeJobs}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Still open for applications
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.08] text-emerald-400 transition group-hover:bg-emerald-500/[0.12]">
                  <CheckCircle2 size={19} />
                </div>
              </div>
            </div>

            {/* CLOSED */}

            <div className="group rounded-3xl border border-white/[0.07] bg-[#0d0f13] p-5 transition hover:-translate-y-0.5 hover:border-white/[0.13]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Closed
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight">
                    {closedJobs}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    No longer accepting applications
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-white/35 transition group-hover:bg-white/[0.055]">
                  <Clock3 size={19} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <section className="mt-8">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d0f13] p-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search jobs, companies, locations..."
                  className="h-12 w-full rounded-2xl border border-transparent bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-white/[0.08] focus:bg-white/[0.025]"
                />
              </div>

              <div className="relative md:w-52">
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                  className="h-12 w-full appearance-none rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-white/[0.14]"
                >
                  <option
                    value="all"
                    className="bg-[#111318]"
                  >
                    All saved jobs
                  </option>

                  <option
                    value="active"
                    className="bg-[#111318]"
                  >
                    Active jobs
                  </option>

                  <option
                    value="closed"
                    className="bg-[#111318]"
                  >
                    Closed jobs
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            RESULTS HEADER
        =================================================== */}

        <div className="mb-5 mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400/70">
              Your collection
            </p>

            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white">
              Saved opportunities
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1
                ? "opportunity"
                : "opportunities"}{" "}
              found
            </p>
          </div>

          {(search || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white/40 transition hover:bg-white/[0.04] hover:text-white"
            >
              <X size={13} />
              Reset
            </button>
          )}
        </div>

        {/* ===================================================
            EMPTY
        =================================================== */}

        {savedJobs.length === 0 ? (
          <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[32px] border border-dashed border-white/[0.1] bg-white/[0.015] px-6 text-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[90px]" />

            <div className="relative max-w-md">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.08] bg-white/[0.035] text-white/30 shadow-2xl">
                <Bookmark size={30} />
              </div>

              <h2 className="mt-7 text-2xl font-black tracking-tight">
                No saved jobs yet
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Found something interesting? Save
                the job and it will appear here so
                you can come back to it anytime.
              </p>

              <Link
                to="/find-job"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                <Search size={16} />
                Find jobs
              </Link>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.015] px-6 py-24 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-white/30">
              <Search size={25} />
            </div>

            <h2 className="mt-6 text-xl font-bold">
              No matching jobs
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Try another keyword or change your
              filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-6 text-xs font-bold text-blue-400 transition hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* =================================================
             JOB GRID
          ================================================= */

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredJobs.map((job) => {
              const closed = isClosedJob(job);

              const companyName =
                getCompanyName(job);

              const companyId =
                getCompanyId(job);

              const companyLogo =
                getCompanyLogo(job);

              const companyInitial =
                getCompanyInitial(job);

              const salary = formatSalary(
                getSalary(job)
              );

              const savedDate = formatDate(
                job?.savedAt ||
                  job?.createdAt
              );

              const deadlineDate =
                formatDate(job?.deadline);

              const applicationLabel =
                getApplicationLabel(job);

              const applyUrl =
                getApplyUrl(job);

              const applyMethods =
                getApplyMethods(job);

              return (
                <article
                  key={job._id}
                  className={`group relative flex min-h-[410px] flex-col overflow-hidden rounded-[28px] border bg-[#0d0f13] transition-all duration-300 ${
                    closed
                      ? "border-white/[0.06]"
                      : "border-white/[0.08] hover:-translate-y-1.5 hover:border-white/[0.15] hover:bg-[#0f1116] hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  {/* TOP GRADIENT */}

                  <div
                    className={`h-[2px] w-full ${
                      closed
                        ? "bg-white/[0.06]"
                        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    }`}
                  />

                  <div className="flex flex-1 flex-col p-5">
                    {/* CARD HEADER */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3.5">
                        {/* COMPANY LOGO */}

                        {companyId ? (
                          <Link
                            to={`/companies/${companyId}`}
                            className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border transition ${
                              closed
                                ? "border-white/[0.07] bg-white/[0.025]"
                                : "border-white/[0.08] bg-white/[0.04] hover:border-blue-400/30"
                            }`}
                          >
                            {companyLogo ? (
                              <img
                                src={companyLogo}
                                alt={`${companyName} logo`}
                                className={`h-full w-full object-cover ${
                                  closed
                                    ? "opacity-40 grayscale"
                                    : ""
                                }`}
                              />
                            ) : (
                              <span
                                className={`text-lg font-black ${
                                  closed
                                    ? "text-white/25"
                                    : "bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                }`}
                              >
                                {companyInitial}
                              </span>
                            )}
                          </Link>
                        ) : (
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${
                              closed
                                ? "border-white/[0.07] bg-white/[0.025] text-white/25"
                                : "border-white/[0.08] bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-300"
                            }`}
                          >
                            <span className="text-lg font-black">
                              {companyInitial}
                            </span>
                          </div>
                        )}

                        {/* TITLE + COMPANY */}

                        <div className="min-w-0 pt-0.5">
                          <h3
                            className={`line-clamp-2 text-[15px] font-bold leading-5 tracking-tight ${
                              closed
                                ? "text-white/40"
                                : "text-white"
                            }`}
                          >
                            {job?.title ||
                              "Untitled Job"}
                          </h3>

                          {companyId ? (
                            <Link
                              to={`/companies/${companyId}`}
                              className="mt-1.5 block truncate text-xs font-semibold text-white/40 transition hover:text-blue-400"
                            >
                              {companyName}
                            </Link>
                          ) : (
                            <p className="mt-1.5 truncate text-xs font-semibold text-white/40">
                              {companyName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* UNSAVE */}

                      <button
                        type="button"
                        disabled={deleting}
                        onClick={() =>
                          openRemoveModal(job)
                        }
                        title="Remove from saved jobs"
                        aria-label="Remove from saved jobs"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/[0.07] text-blue-400 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Bookmark
                          size={15}
                          fill="currentColor"
                        />
                      </button>
                    </div>

                    {/* STATUS */}

                    <div className="mt-5 flex items-center justify-between gap-2">
                      {closed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-white/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                          Closed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />
                          Actively hiring
                        </span>
                      )}

                      {job?.isFeatured &&
                        !closed && (
                          <span className="rounded-full border border-purple-400/10 bg-purple-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-purple-300">
                            Featured
                          </span>
                        )}
                    </div>

                    {/* JOB INFO */}

                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {/* LOCATION */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={13}
                            className="shrink-0 text-blue-400/60"
                          />

                          <span className="text-[9px] font-bold uppercase tracking-wide text-white/25">
                            Location
                          </span>
                        </div>

                        <p className="mt-1.5 truncate text-xs font-semibold text-white/60">
                          {job?.location ||
                            "Not specified"}
                        </p>
                      </div>

                      {/* JOB TYPE */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="flex items-center gap-2">
                          <BriefcaseBusiness
                            size={13}
                            className="shrink-0 text-purple-400/60"
                          />

                          <span className="text-[9px] font-bold uppercase tracking-wide text-white/25">
                            Job type
                          </span>
                        </div>

                        <p className="mt-1.5 truncate text-xs font-semibold text-white/60">
                          {getJobType(job)}
                        </p>
                      </div>

                      {/* EMPLOYMENT */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="flex items-center gap-2">
                          <Clock3
                            size={13}
                            className="shrink-0 text-orange-400/60"
                          />

                          <span className="text-[9px] font-bold uppercase tracking-wide text-white/25">
                            Employment
                          </span>
                        </div>

                        <p className="mt-1.5 truncate text-xs font-semibold text-white/60">
                          {getEmploymentType(job)}
                        </p>
                      </div>

                      {/* SALARY */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-[13px] w-[13px] items-center justify-center rounded bg-emerald-500/10 text-[8px] font-black text-emerald-400">
                            ₹
                          </span>

                          <span className="text-[9px] font-bold uppercase tracking-wide text-white/25">
                            Salary
                          </span>
                        </div>

                        <p className="mt-1.5 truncate text-xs font-semibold text-white/60">
                          {salary ||
                            "Not disclosed"}
                        </p>
                      </div>
                    </div>

                    {/* APPLY METHODS */}

                    {applyMethods.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/25">
                          Application method
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {applyMethods.map(
                            (method, index) => {
                              const normalized =
                                String(
                                  method
                                ).toLowerCase();

                              let Icon =
                                ExternalLink;

                              if (
                                normalized ===
                                "email"
                              ) {
                                Icon = Mail;
                              }

                              if (
                                normalized ===
                                "whatsapp"
                              ) {
                                Icon =
                                  MessageCircle;
                              }

                              return (
                                <span
                                  key={`${method}-${index}`}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[9px] font-semibold capitalize text-white/40"
                                >
                                  <Icon size={11} />
                                  {method}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {/* DIVIDER */}

                    <div className="my-5 border-t border-white/[0.06]" />

                    {/* DATES */}

                    <div className="space-y-2">
                      {deadlineDate && (
                        <div className="flex items-center gap-2">
                          <Clock3
                            size={13}
                            className={
                              closed
                                ? "text-white/20"
                                : "text-orange-400/70"
                            }
                          />

                          <span
                            className={`text-[10px] ${
                              closed
                                ? "text-white/25"
                                : "text-orange-400/70"
                            }`}
                          >
                            Deadline{" "}
                            <span className="font-semibold">
                              {deadlineDate}
                            </span>
                          </span>
                        </div>
                      )}

                      {savedDate && (
                        <div className="flex items-center gap-2 text-white/25">
                          <CalendarDays size={13} />

                          <span className="text-[10px]">
                            Saved{" "}
                            <span className="font-semibold">
                              {savedDate}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1" />
                  </div>

                  {/* FOOTER */}

                  <div className="border-t border-white/[0.06] bg-white/[0.018] p-4">
                    <div className="flex gap-2">
                      {/* VIEW DETAILS */}

                      <Link
                        to={`/jobs/${job._id}`}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 text-xs font-bold text-white/55 transition hover:border-white/[0.16] hover:bg-white/[0.055] hover:text-white"
                      >
                        View details
                      </Link>

                      {/* APPLY */}

                      {closed ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex h-10 flex-1 cursor-not-allowed items-center justify-center rounded-xl bg-white/[0.045] px-3 text-xs font-bold text-white/20"
                        >
                          Job closed
                        </button>
                      ) : hasWhatsappApply(
                          job
                        ) &&
                        job?.whatsappNumber ? (
                        <a
                          href={`https://wa.me/${String(
                            job.whatsappNumber
                          ).replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4f6fff] to-[#7448ff] px-3 text-xs font-bold text-white shadow-[0_8px_25px_rgba(79,111,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,111,255,0.25)]"
                        >
                          Apply
                          <MessageCircle size={12} />
                        </a>
                      ) : hasEmailApply(
                          job
                        ) ? (
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4f6fff] to-[#7448ff] px-3 text-xs font-bold text-white shadow-[0_8px_25px_rgba(79,111,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,111,255,0.25)]"
                        >
                          Apply
                          <Mail size={12} />
                        </Link>
                      ) : applyUrl ? (
                        <a
                          href={applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4f6fff] to-[#7448ff] px-3 text-xs font-bold text-white shadow-[0_8px_25px_rgba(79,111,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,111,255,0.25)]"
                        >
                          Apply
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4f6fff] to-[#7448ff] px-3 text-xs font-bold text-white shadow-[0_8px_25px_rgba(79,111,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(79,111,255,0.25)]"
                        >
                          Apply
                          <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>

                    {!closed && (
                      <p className="mt-2 text-center text-[9px] font-medium text-white/20">
                        Application via{" "}
                        <span className="capitalize">
                          {applicationLabel}
                        </span>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* =========================================================
          REMOVE MODAL
      ========================================================= */}

      {showRemoveModal && selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#111318] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/[0.08] text-red-400">
                  <Trash2 size={19} />
                </div>

                <button
                  type="button"
                  onClick={closeRemoveModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/30 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              <h2 className="mt-6 text-xl font-black tracking-tight text-white">
                Remove saved job?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Are you sure you want to remove{" "}
                <span className="font-bold text-white/70">
                  {selectedJob?.title ||
                    "this job"}
                </span>{" "}
                from your saved jobs?
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.04]">
                  {getCompanyLogo(
                    selectedJob
                  ) ? (
                    <img
                      src={getCompanyLogo(
                        selectedJob
                      )}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-black text-blue-300">
                      {getCompanyInitial(
                        selectedJob
                      )}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white/80">
                    {selectedJob?.title ||
                      "Untitled Job"}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-white/35">
                    {getCompanyName(
                      selectedJob
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeRemoveModal}
                  className="h-11 flex-1 rounded-xl border border-white/[0.09] bg-white/[0.025] text-sm font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Keep saved
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={confirmRemove}
                  className="h-11 flex-1 rounded-xl bg-red-500 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting
                    ? "Removing..."
                    : "Remove job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobsHome;