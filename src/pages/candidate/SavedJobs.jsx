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

const SavedJobs = () => {
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
    if (String(job?.status || "").toLowerCase() === "closed") {
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

    if (!companyName) {
      return "C";
    }

    return companyName
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  /* =========================================================
     JOB
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
      job?.salaryRange ??
      job?.salary ??
      job?.ctc ??
      job?.package ??
      null
    );
  };

  const formatSalary = (salary) => {
    if (
      salary === null ||
      salary === undefined ||
      salary === ""
    ) {
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

      const currency = salary?.currency || "₹";

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
    }

    return null;
  };

  /* =========================================================
     APPLY METHODS
  ========================================================= */

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

  const getApplyUrl = (job) => {
    return (
      job?.externalApplyUrl ||
      job?.applyUrl ||
      null
    );
  };

  const hasExternalApply = (job) => {
    return (
      !!getApplyUrl(job) ||
      getApplyMethods(job).some((method) => {
        const value = String(method).toLowerCase();

        return (
          value === "external" ||
          value === "url" ||
          value === "website"
        );
      })
    );
  };

  const getApplicationLabel = (job) => {
    if (hasWhatsappApply(job)) {
      return "WhatsApp";
    }

    if (hasEmailApply(job)) {
      return "Email";
    }

    if (hasExternalApply(job)) {
      return "External";
    }

    const methods = getApplyMethods(job);

    if (methods.length > 0) {
      return methods[0];
    }

    return "Job details";
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
          String(job?.title || "").toLowerCase();

        const company =
          String(getCompanyName(job) || "").toLowerCase();

        const location =
          String(job?.location || "").toLowerCase();

        const employmentType =
          String(job?.employmentType || "").toLowerCase();

        const jobType =
          String(job?.jobType || "").toLowerCase();

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
      jobs = jobs.filter(
        (job) => isClosedJob(job)
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
     REMOVE MODAL
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
      <div className="w-full">
        <Seo title="Saved Jobs" noindex />

        <div className="animate-pulse">
          <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="mt-3 h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>

          <div className="mt-8 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-[400px] rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return (
      <div className="w-full">
        <Seo title="Saved Jobs" noindex />

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-950/50 dark:text-red-400">
            <X size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Failed to load saved jobs
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Something went wrong while loading your
            saved jobs.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="w-full">
      <Seo title="Saved Jobs" noindex />

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <Bookmark
                size={12}
                fill="currentColor"
              />
              Saved jobs
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Your saved jobs
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Keep your favorite opportunities in one
              place and come back when you're ready to
              apply.
            </p>
          </div>

          <Link
            to="/find-job"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <Search size={16} />
            Find jobs
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* TOTAL */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Total saved
              </p>

              <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {savedJobs.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Jobs in your collection
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/10 dark:bg-blue-500/10 dark:text-blue-400">
              <Bookmark
                size={19}
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Active jobs
              </p>

              <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {activeJobs}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Open for applications
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        {/* CLOSED */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Closed
              </p>

              <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {closedJobs}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                No longer accepting applications
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800">
              <Clock3 size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search jobs, companies, locations..."
              className="h-11 w-full rounded-xl border border-transparent bg-transparent pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-200 focus:bg-slate-50 dark:text-white dark:focus:border-slate-700 dark:focus:bg-slate-800/50"
            />
          </div>

          <div className="relative sm:w-48">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="all">
                All saved jobs
              </option>

              <option value="active">
                Active jobs
              </option>

              <option value="closed">
                Closed jobs
              </option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}

      <div className="mb-5 mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Your collection
          </p>

          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Saved opportunities
          </h2>

          <p className="mt-1 text-xs text-slate-400">
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
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={13} />
            Reset
          </button>
        )}
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400">
            <Bookmark size={28} />
          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
            No saved jobs yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Save jobs you're interested in and they will
            appear here so you can easily find them later.
          </p>

          <Link
            to="/find-job"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Search size={16} />
            Find jobs
          </Link>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <Search size={24} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            No matching jobs
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another keyword or change your filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="mt-5 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* ===================================================
           JOB GRID
        =================================================== */

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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

            const salary =
              formatSalary(getSalary(job));

            const deadlineDate =
              formatDate(job?.deadline);

            const savedDate =
              formatDate(
                job?.savedAt ||
                  job?.createdAt
              );

            const applyMethods =
              getApplyMethods(job);

            const applicationLabel =
              getApplicationLabel(job);

            const applyUrl =
              getApplyUrl(job);

            return (
              <article
                key={job._id}
                className={`group relative flex min-h-[405px] flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 dark:bg-slate-900 ${
                  closed
                    ? "border-slate-200 opacity-65 dark:border-slate-800"
                    : "border-slate-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:hover:border-slate-700"
                }`}
              >
                {/* TOP LINE */}

                <div
                  className={`h-1 w-full ${
                    closed
                      ? "bg-slate-200 dark:bg-slate-800"
                      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                  }`}
                />

                <div className="flex flex-1 flex-col p-5">
                  {/* =================================================
                     HEADER
                  ================================================= */}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3.5">
                      {/* LOGO */}

                      {companyId ? (
                        <Link
                          to={`/companies/${companyId}`}
                          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800"
                        >
                          {companyLogo ? (
                            <img
                              src={companyLogo}
                              alt={`${companyName} logo`}
                              className={`h-full w-full object-cover ${
                                closed
                                  ? "grayscale"
                                  : ""
                              }`}
                            />
                          ) : (
                            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                              {companyInitial}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-blue-50 dark:border-slate-700 dark:bg-blue-950/30">
                          <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                            {companyInitial}
                          </span>
                        </div>
                      )}

                      {/* TITLE */}

                      <div className="min-w-0 pt-0.5">
                        <h3
                          className={`line-clamp-2 text-[15px] font-bold leading-5 tracking-tight ${
                            closed
                              ? "text-slate-500 line-through dark:text-slate-400"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {job?.title ||
                            "Untitled Job"}
                        </h3>

                        {companyId ? (
                          <Link
                            to={`/companies/${companyId}`}
                            className="mt-1.5 block truncate text-xs font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                          >
                            {companyName}
                          </Link>
                        ) : (
                          <p className="mt-1.5 truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
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
                      title="Remove saved job"
                      aria-label="Remove saved job"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 dark:hover:border-red-900/40 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    >
                      <Bookmark
                        size={15}
                        fill="currentColor"
                      />
                    </button>
                  </div>

                  {/* =================================================
                     STATUS
                  ================================================= */}

                  <div className="mt-5 flex items-center justify-between gap-2">
                    {closed ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        Closed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-600 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Actively hiring
                      </span>
                    )}

                    {job?.isFeatured &&
                      !closed && (
                        <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-purple-600 dark:border-purple-500/10 dark:bg-purple-500/10 dark:text-purple-400">
                          Featured
                        </span>
                      )}
                  </div>

                  {/* =================================================
                     JOB INFO
                  ================================================= */}

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {/* LOCATION */}

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={13}
                          className="text-blue-500"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                          Location
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {job?.location ||
                          "Not specified"}
                      </p>
                    </div>

                    {/* JOB TYPE */}

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness
                          size={13}
                          className="text-purple-500"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                          Job type
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {getJobType(job)}
                      </p>
                    </div>

                    {/* EMPLOYMENT */}

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={13}
                          className="text-orange-500"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                          Employment
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {getEmploymentType(job)}
                      </p>
                    </div>

                    {/* SALARY */}

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2">
                        <span className="flex h-[13px] w-[13px] items-center justify-center rounded bg-emerald-100 text-[8px] font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          ₹
                        </span>

                        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                          Salary
                        </span>
                      </div>

                      <p className="mt-1.5 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {salary ||
                          "Not disclosed"}
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                     APPLY METHODS
                  ================================================= */}

                  {applyMethods.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
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
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[9px] font-semibold capitalize text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                              >
                                <Icon
                                  size={11}
                                />
                                {method}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {/* DIVIDER */}

                  <div className="my-5 border-t border-slate-100 dark:border-slate-800" />

                  {/* =================================================
                     DATES
                  ================================================= */}

                  <div className="space-y-2">
                    {deadlineDate && (
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={13}
                          className={
                            closed
                              ? "text-slate-400"
                              : "text-orange-500"
                          }
                        />

                        <span
                          className={`text-[10px] ${
                            closed
                              ? "text-slate-400"
                              : "text-orange-600 dark:text-orange-400"
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
                      <div className="flex items-center gap-2 text-slate-400">
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

                {/* =================================================
                   FOOTER
                ================================================= */}

                <div className="border-t border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                  <div className="flex gap-2">
                    {/* VIEW */}

                    <Link
                      to={`/jobs/${job._id}`}
                      className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      View details
                    </Link>

                    {/* APPLY */}

                    {closed ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex h-10 flex-1 cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-3 text-xs font-bold text-slate-400 dark:bg-slate-800"
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
                        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Apply
                        <MessageCircle
                          size={12}
                        />
                      </a>
                    ) : hasEmailApply(
                        job
                      ) ? (
                      <Link
                        to={`/jobs/${job._id}`}
                        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Apply
                        <Mail size={12} />
                      </Link>
                    ) : applyUrl ? (
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Apply
                        <ExternalLink
                          size={12}
                        />
                      </a>
                    ) : (
                      <Link
                        to={`/jobs/${job._id}`}
                        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Apply
                        <ExternalLink
                          size={12}
                        />
                      </Link>
                    )}
                  </div>

                  {!closed && (
                    <p className="mt-2 text-center text-[9px] font-medium text-slate-400">
                      Application via{" "}
                      <span className="font-semibold capitalize">
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

      {/* =========================================================
          REMOVE MODAL
      ========================================================= */}

      {showRemoveModal &&
        selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
                    <Trash2 size={19} />
                  </div>

                  <button
                    type="button"
                    onClick={closeRemoveModal}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>

                <h2 className="mt-6 text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Remove saved job?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Are you sure you want to remove{" "}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedJob?.title ||
                      "this job"}
                  </span>{" "}
                  from your saved jobs?
                </p>

                {/* JOB PREVIEW */}

                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
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
                      <span className="font-black text-blue-600 dark:text-blue-400">
                        {getCompanyInitial(
                          selectedJob
                        )}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                      {selectedJob?.title ||
                        "Untitled Job"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {getCompanyName(
                        selectedJob
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={closeRemoveModal}
                    className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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

export default SavedJobs;