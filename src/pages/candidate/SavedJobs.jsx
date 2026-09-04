import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  useDeleteSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";
import Seo from "../../components/common/Seo";

const SavedJobs = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetSavedJobsQuery();

  const [
    deleteSavedJob,
    { isLoading: deleting },
  ] = useDeleteSavedJobMutation();


  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <p className="text-slate-500 dark:text-slate-400">
          Loading saved jobs...
        </p>

      </div>
    );
  }


  // Error State
  if (isError) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950/30 dark:text-red-400">
        Failed to load saved jobs.
      </div>
    );
  }


  const savedJobs = data?.savedJobs || [];


  return (
    <div className="w-full">
      <Seo title="Saved jobs" noindex />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold tracking-tight">
          Saved Jobs
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You have {data?.count || 0} saved opportunities waiting for you.
        </p>

      </div>


      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {savedJobs.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl dark:bg-blue-950/40">
            🔖
          </div>

          <h2 className="text-lg font-semibold">
            No saved jobs yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Save jobs you are interested in and find them here later.
          </p>

          <Link
            to="/find-job"
            className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Find Jobs
          </Link>

        </div>

      ) : (

        /* ================================================= */
        /* JOB LIST */
        /* ================================================= */

        <div className="space-y-5">

          {savedJobs.map((job) => (

            <div
              key={job._id}
              className={`group flex flex-col justify-between gap-5 rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg sm:flex-row sm:items-center dark:bg-slate-900 ${
                job.status === "closed"
                  ? "border-slate-300 opacity-60 dark:border-slate-700"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >

              {/* ================================================= */}
              {/* JOB INFORMATION */}
              {/* ================================================= */}

              <div className="flex min-w-0 gap-4">

                {/* COMPANY AVATAR */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-lg font-bold text-white shadow-md">
                  {job.company?.[0]?.toUpperCase() || "C"}
                </div>


                {/* DETAILS */}

                <div className="min-w-0">

                  <h2
                    className={`text-lg font-semibold ${
                      job.status === "closed"
                        ? "line-through"
                        : ""
                    }`}
                  >
                    {job.title}
                  </h2>


                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {job.company || "Company"}{" "}
                    •{" "}
                    {job.location || "Location"}
                  </p>


                  {/* TAGS */}

                  <div className="mt-3 flex flex-wrap gap-2">

                    {job.jobType && (

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                        {job.jobType}
                      </span>

                    )}


                    {job.salary && (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-green-950/40 dark:text-green-400">
                        {job.salary}
                      </span>

                    )}

                  </div>


                  {/* DEADLINE */}

                  {job.deadline && (

                    <p className="mt-3 text-xs text-orange-600 dark:text-orange-400">
                      ⏰ Deadline: {job.deadline}
                    </p>

                  )}


                  {/* SAVED DATE */}

                  {job.createdAt && (

                    <p className="mt-2 text-xs text-slate-400">
                      Saved on{" "}
                      {new Date(
                        job.createdAt
                      ).toLocaleDateString()}
                    </p>

                  )}

                </div>

              </div>


              {/* ================================================= */}
              {/* ACTIONS */}
              {/* ================================================= */}

              <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">

                {job.status === "active" ? (

                  <Link
                    to={`/jobs/${job._id}`}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:scale-105 hover:shadow-lg"
                  >
                    View Job
                  </Link>

                ) : (

                  <button
                    disabled
                    className="cursor-not-allowed rounded-xl bg-slate-200 px-5 py-2.5 text-sm text-slate-400 dark:bg-slate-700"
                  >
                    Closed
                  </button>

                )}


                <button
                  type="button"
                  disabled={deleting}
                  onClick={() =>
                    deleteSavedJob(job._id)
                  }
                  className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30"
                  title="Remove saved job"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default SavedJobs;