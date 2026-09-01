import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  useGetApplyListQuery,
} from "../../RTK/AuthService";
import Seo from "../../components/common/Seo";


const statusColors = {
  Applied:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  Interviewing:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

  "Offer Received":
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",

  Rejected:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};


const statusOptions = [
  "All",
  "Applied",
  "Interviewing",
  "Offer Received",
  "Rejected",
];


const Applications = () => {

  const {
    data: applyList,
    isLoading,
    isError,
  } = useGetApplyListQuery();


  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;


  const applications = applyList || [];


  const filteredList =
    status === "All"
      ? applications
      : applications.filter(
          (application) =>
            application?.status === status
        );


  const totalPages = Math.ceil(
    filteredList.length / itemsPerPage
  );


  const startIndex =
    (currentPage - 1) * itemsPerPage;


  const paginatedList =
    filteredList.slice(
      startIndex,
      startIndex + itemsPerPage
    );


  useEffect(() => {
    setCurrentPage(1);
  }, [status]);


  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {

    return (

      <div className="flex min-h-[400px] items-center justify-center">

        <p className="text-slate-500 dark:text-slate-400">
          Loading applications...
        </p>

      </div>

    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (isError) {

    return (

      <div className="rounded-2xl bg-red-50 p-6 text-red-600 dark:bg-red-950/30 dark:text-red-400">

        Failed to load your applications.

      </div>

    );

  }


  return (

    <div className="w-full space-y-8">
      <Seo title="Applications" noindex />




      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            My Applications
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Track and manage your current job applications.
          </p>

        </div>


        <div className="rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-950/30">

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Applications
          </p>

          <p className="text-2xl font-bold text-blue-600">
            {applications.length}
          </p>

        </div>

      </div>


      {/* ================================= */}
      {/* FILTER */}
      {/* ================================= */}

      <div className="flex flex-wrap gap-2">

        {statusOptions.map((option) => (

          <button
            key={option}
            type="button"
            onClick={() => setStatus(option)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              status === option
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >

            {option}

          </button>

        ))}

      </div>


      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {filteredList.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl dark:bg-blue-950/40">
            📄
          </div>


          <h3 className="text-lg font-semibold">
            No applications found
          </h3>


          <p className="mt-2 text-sm text-slate-500">
            {status === "All"
              ? "You have not applied to any jobs yet."
              : `You don't have any "${status}" applications yet.`}
          </p>


          {status === "All" && (

            <Link
              to="/find-jobs"
              className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Find Jobs
            </Link>

          )}

        </div>

      ) : (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">


          {/* ================================= */}
          {/* DESKTOP TABLE */}
          {/* ================================= */}

          <div className="hidden overflow-x-auto md:block">

            <table className="min-w-full">

              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Job Role & Company
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date Applied
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {paginatedList.map((application) => {

                  const job =
                    application?.job;


                  return (

                    <tr
                      key={application._id}
                      className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
                    >

                      {/* JOB */}

                      <td className="px-6 py-5">

                        <p className="font-semibold">
                          {job?.title || "Unknown Job"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {job?.company || "Company"}
                        </p>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-5 text-sm text-slate-500">

                        {application?.appliedDate
                          ? new Date(
                              application.appliedDate
                            ).toLocaleDateString()
                          : "—"}

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            statusColors[
                              application.status
                            ] ||
                            statusColors.Applied
                          }`}
                        >

                          {application.status || "Applied"}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-6 py-5">

                        {job?._id ? (

                          <Link
                            to={`/jobs/${job._id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            View →
                          </Link>

                        ) : (

                          <span className="text-sm text-slate-400">
                            Not available
                          </span>

                        )}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>


          {/* ================================= */}
          {/* MOBILE CARDS */}
          {/* ================================= */}

          <div className="space-y-4 p-4 md:hidden">

            {paginatedList.map((application) => {

              const job =
                application?.job;


              return (

                <div
                  key={application._id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-semibold">
                        {job?.title || "Unknown Job"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {job?.company || "Company"}
                      </p>

                    </div>


                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        statusColors[
                          application.status
                        ] ||
                        statusColors.Applied
                      }`}
                    >

                      {application.status || "Applied"}

                    </span>

                  </div>


                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-xs text-slate-500">

                      Applied:{" "}

                      {application?.appliedDate
                        ? new Date(
                            application.appliedDate
                          ).toLocaleDateString()
                        : "—"}

                    </p>


                    {job?._id && (

                      <Link
                        to={`/jobs/${job._id}`}
                        className="text-sm font-medium text-blue-600"
                      >
                        View →
                      </Link>

                    )}

                  </div>

                </div>

              );

            })}

          </div>


          {/* ================================= */}
          {/* PAGINATION */}
          {/* ================================= */}

          {totalPages > 1 && (

            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">

              <p className="text-sm text-slate-500">
                Page {currentPage} of {totalPages}
              </p>


              <div className="flex gap-2">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
                >
                  Previous
                </button>


                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </div>

  );

};


export default Applications;