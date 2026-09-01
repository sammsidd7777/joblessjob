import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Power,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";

import {
  useGetExternalJobsQuery,
  useDeleteExternalJobMutation,
  useToggleExternalJobStatusMutation,
} from "../../RTK/adminApi";

const JOBS_PER_PAGE = 10;

export default function AdminJobs() {
  const { data, isLoading } = useGetExternalJobsQuery();

  const [deleteJob, { isLoading: deleting }] =
    useDeleteExternalJobMutation();

  const [toggleStatus] =
    useToggleExternalJobStatusMutation();

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // FILTER JOBS
  // =====================================================

  const filteredJobs = useMemo(() => {
    const list = data?.jobs || [];

    const q = query.trim().toLowerCase();

    if (!q) return list;

    return list.filter((job) =>
      [
        job.title,
        job.jobCategory,
        job.location,
        job.company?.companyName,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(q)
        )
    );
  }, [data, query]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
  );

  const paginatedJobs = useMemo(() => {
    const start =
      (currentPage - 1) * JOBS_PER_PAGE;

    return filteredJobs.slice(
      start,
      start + JOBS_PER_PAGE
    );
  }, [filteredJobs, currentPage]);

  // =====================================================
  // RESET PAGE WHEN SEARCH CHANGES
  // =====================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // =====================================================
  // KEEP PAGE VALID
  // =====================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this job permanently?"
      )
    ) {
      return;
    }

    try {
      await deleteJob(id).unwrap();
    } catch (error) {
      window.alert(
        error?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggle = async (id) => {
    try {
      await toggleStatus(id).unwrap();
    } catch (error) {
      window.alert(
        error?.data?.message ||
          "Failed to change job status"
      );
    }
  };

  // =====================================================
  // PAGINATION RANGE
  // =====================================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const firstItem =
    filteredJobs.length === 0
      ? 0
      : (currentPage - 1) * JOBS_PER_PAGE + 1;

  const lastItem = Math.min(
    currentPage * JOBS_PER_PAGE,
    filteredJobs.length
  );

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          sm:mb-7
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div className="min-w-0">

          <p
            className="
              mb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-blue-400
            "
          >
            Management
          </p>

          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            External Jobs
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-5
              text-slate-500
            "
          >
            Add, edit, activate and remove
            admin-posted vacancies.
          </p>

        </div>

        <Link
          to="/admin/jobs/new"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-3
            text-sm
            font-bold
            text-black
            transition
            hover:bg-slate-200
            sm:w-auto
          "
        >
          <Plus size={16} />
          Add job
        </Link>

      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/[0.07]
          bg-[#0a0c10]
          px-4
          py-3
        "
      >

        <Search
          size={17}
          className="shrink-0 text-slate-600"
        />

        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="
            Search title, company, location or category...
          "
          className="
            min-w-0
            w-full
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-slate-700
          "
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="
              shrink-0
              text-xs
              font-medium
              text-slate-600
              hover:text-white
            "
          >
            Clear
          </button>
        )}

      </div>

      {/* =====================================================
          RESULT INFO
      ===================================================== */}

      {!isLoading &&
        filteredJobs.length > 0 && (
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              px-1
            "
          >

            <p className="text-xs text-slate-600">
              Showing{" "}
              <span className="text-slate-400">
                {firstItem}–{lastItem}
              </span>{" "}
              of{" "}
              <span className="text-slate-400">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>

            <p className="text-xs text-slate-700">
              Page {currentPage} of {totalPages}
            </p>

          </div>
        )}

      {/* =====================================================
          JOB CONTAINER
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.07]
          bg-[#0a0c10]
        "
      >

        {/* ===================================================
            DESKTOP HEADER
        =================================================== */}

        <div
          className="
            hidden
            border-b
            border-white/[0.07]
            px-5
            py-3
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-slate-600
            md:grid
            md:grid-cols-[2fr_1.2fr_1fr_110px_125px]
            md:gap-4
          "
        >
          <span>Job</span>
          <span>Category</span>
          <span>Location</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* ===================================================
            LOADING
        =================================================== */}

        {isLoading && (
          <div className="p-10 text-center">

            <div
              className="
                mx-auto
                h-6
                w-6
                animate-spin
                rounded-full
                border-2
                border-white/10
                border-t-white
              "
            />

            <p className="mt-3 text-sm text-slate-600">
              Loading jobs...
            </p>

          </div>
        )}

        {/* ===================================================
            EMPTY
        =================================================== */}

        {!isLoading &&
          filteredJobs.length === 0 && (
            <div
              className="
                flex
                min-h-[280px]
                flex-col
                items-center
                justify-center
                px-5
                text-center
              "
            >

              <div
                className="
                  mb-4
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.03]
                  text-slate-600
                "
              >
                <BriefcaseBusiness size={20} />
              </div>

              <p className="text-sm font-semibold text-slate-400">
                {query
                  ? "No matching jobs"
                  : "No jobs found"}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                {query
                  ? "Try a different search."
                  : "Start by adding your first job."}
              </p>

              {!query && (
                <Link
                  to="/admin/jobs/new"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-black
                    hover:bg-slate-200
                  "
                >
                  <Plus size={14} />
                  Add job
                </Link>
              )}

            </div>
          )}

        {/* ===================================================
            JOBS
        =================================================== */}

        {!isLoading &&
          paginatedJobs.map((job) => (

            <div
              key={job._id}
              className="
                border-b
                border-white/[0.06]
                px-4
                py-4
                last:border-b-0
                md:grid
                md:grid-cols-[2fr_1.2fr_1fr_110px_125px]
                md:items-center
                md:gap-4
                md:px-5
              "
            >

              {/* =============================================
                  JOB
              ============================================= */}

              <div className="min-w-0">

                <div className="flex items-start gap-3">

                  <div
                    className="
                      hidden
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/[0.06]
                      bg-white/[0.03]
                      text-slate-500
                      sm:flex
                    "
                  >
                    <BriefcaseBusiness size={16} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {job.title}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-slate-600
                      "
                    >
                      {job.company?.companyName ||
                        "Company"}
                    </p>

                  </div>

                </div>

                {/* Mobile extra information */}

                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                    md:hidden
                  "
                >

                  <span
                    className="
                      rounded-lg
                      bg-white/[0.03]
                      px-2
                      py-1
                      text-[10px]
                      text-slate-500
                    "
                  >
                    {job.jobCategory ||
                      "Uncategorized"}
                  </span>

                  <span
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-1
                      rounded-lg
                      bg-white/[0.03]
                      px-2
                      py-1
                      text-[10px]
                      text-slate-500
                    "
                  >
                    <MapPin size={11} />

                    <span className="truncate">
                      {job.location ||
                        "Not specified"}
                    </span>
                  </span>

                </div>

              </div>

              {/* =============================================
                  CATEGORY
              ============================================= */}

              <div
                className="
                  hidden
                  truncate
                  text-xs
                  text-slate-500
                  md:block
                "
              >
                {job.jobCategory ||
                  "Uncategorized"}
              </div>

              {/* =============================================
                  LOCATION
              ============================================= */}

              <div
                className="
                  hidden
                  items-center
                  gap-1.5
                  text-xs
                  text-slate-500
                  md:flex
                "
              >

                <MapPin size={13} />

                <span className="truncate">
                  {job.location ||
                    "Not specified"}
                </span>

              </div>

              {/* =============================================
                  STATUS
              ============================================= */}

              <div className="mt-3 md:mt-0">

                <button
                  onClick={() =>
                    handleToggle(job._id)
                  }
                  className={`
                    rounded-full
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    transition

                    ${
                      job.isActive
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
                        : "bg-slate-500/10 text-slate-500 hover:bg-slate-500/15"
                    }
                  `}
                >
                  {job.isActive
                    ? "Active"
                    : "Inactive"}
                </button>

              </div>

              {/* =============================================
                  ACTIONS
              ============================================= */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-1
                  md:mt-0
                "
              >

                <Link
                  to={`/admin/jobs/${job._id}/edit`}
                  className="
                    rounded-lg
                    p-2
                    text-slate-500
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>

                <button
                  onClick={() =>
                    handleToggle(job._id)
                  }
                  className="
                    rounded-lg
                    p-2
                    text-slate-500
                    transition
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                  title={
                    job.isActive
                      ? "Deactivate"
                      : "Activate"
                  }
                >
                  <Power size={15} />
                </button>

                {job.applyMethod === "website" &&
                  job.externalApplyUrl && (
                    <a
                      href={job.externalApplyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        rounded-lg
                        p-2
                        text-slate-500
                        transition
                        hover:bg-white/[0.05]
                        hover:text-white
                      "
                      title="Open apply link"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}

                <button
                  disabled={deleting}
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  className="
                    rounded-lg
                    p-2
                    text-red-400/60
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>

              </div>

            </div>

          ))}

      </div>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!isLoading &&
        filteredJobs.length > JOBS_PER_PAGE && (

          <div
            className="
              mt-5
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* Result count */}

            <p
              className="
                text-center
                text-xs
                text-slate-600
                sm:text-left
              "
            >
              {firstItem}–{lastItem} of{" "}
              {filteredJobs.length} jobs
            </p>

            {/* Pagination */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-1.5
              "
            >

              {/* Previous */}

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  text-slate-500
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Pages */}

              <div className="flex items-center gap-1">

                {getPageNumbers().map(
                  (page, index) => {

                    if (page === "...") {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="
                            flex
                            h-9
                            w-7
                            items-center
                            justify-center
                            text-xs
                            text-slate-700
                          "
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`
                          flex
                          h-9
                          min-w-9
                          items-center
                          justify-center
                          rounded-lg
                          border
                          px-2
                          text-xs
                          font-semibold
                          transition

                          ${
                            currentPage === page
                              ? "border-white bg-white text-black"
                              : "border-white/[0.07] bg-[#0a0c10] text-slate-500 hover:bg-white/[0.05] hover:text-white"
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  }
                )}

              </div>

              {/* Next */}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  text-slate-500
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>
        )}

    </div>
  );
}