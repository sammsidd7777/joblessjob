
import React, { useState } from "react";
import Seo from "../../common/Seo";
import {
  BriefcaseBusiness,
  Users,
  CalendarDays,
  UserCheck,
  Eye,
  Trash2,
  Power,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useUpdateJobActiveStatusMutation,
} from "../../../RTK/HrService";
import ApplicantsModal from "../applicants/Applicants";

// import ApplicantsModal from "./ApplicantsModal";

const HRDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    data: allJobs,
    isLoading,
    isError,
    refetch,
  } = useGetAllJobsQuery();

  const [deleteJob, { isLoading: isDeleting }] =
    useDeleteJobMutation();

  const [updateJobActiveStatus, { isLoading: isUpdating }] =
    useUpdateJobActiveStatusMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-xl bg-gray-200 dark:bg-gray-800" />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>

          <div className="h-96 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-gray-500">
            Something went wrong while loading your jobs.
          </p>

          <button
            onClick={refetch}
            className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const jobs = allJobs?.data?.jobs || [];

  const totalJobs =
    allJobs?.data?.jobsLength ||
    allJobs?.data?.jobsLenght ||
    jobs.length;

  const activeJobs = jobs.filter((job) => job?.isActive).length;

  const totalApplicants =
    allJobs?.data?.applicationNumber || 0;

  const interviewsScheduled = 0;

  const stats = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: BriefcaseBusiness,
      iconStyle:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      label: "Total Applicants",
      value: totalApplicants,
      icon: Users,
      iconStyle:
        "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    },
    {
      label: "Interviews",
      value: interviewsScheduled,
      icon: CalendarDays,
      iconStyle:
        "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      icon: UserCheck,
      iconStyle:
        "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    },
  ];

  const handleHiringOff = async (id) => {
    try {
      await updateJobActiveStatus(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update job status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await deleteJob({ id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 transition-colors dark:bg-gray-950 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="mb-1 text-sm font-medium text-purple-600 dark:text-purple-400">
            HR Workspace
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Manage your recruitment activity from one place.
          </p>
        </div>

        <button
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-purple-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-purple-600/20
            transition
            hover:bg-purple-700
            sm:w-auto
          "
        >
          <Plus size={18} />
          Post New Job
        </button>
      </div>

      {/* STATS */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
                dark:border-gray-800
                dark:bg-gray-900
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-2">

                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                    {item.label}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`rounded-xl p-2.5 sm:p-3 ${item.iconStyle}`}
                >
                  <Icon size={20} />
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-xs text-gray-400">
                <ArrowUpRight size={14} />
                Recruitment overview
              </div>
            </div>
          );
        })}

      </div>

      {/* JOBS SECTION */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

        {/* SECTION HEADER */}
        <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-gray-800">

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Recent Job Postings
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your listings and review applicants.
            </p>
          </div>

          <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
            {jobs.length} Jobs
          </span>

        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <BriefcaseBusiness
              className="mx-auto text-gray-400"
              size={42}
            />

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No jobs posted yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Start by creating your first job listing.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full text-sm">

                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Job Title
                    </th>

                    <th className="px-6 py-4 text-left">
                      Applicants
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold capitalize text-gray-900 dark:text-white">
                            {job.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {job.location || "Location not specified"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => setSelectedJob(job._id)}
                          className="inline-flex items-center gap-1 font-medium text-purple-600 transition hover:text-purple-800 dark:text-purple-400"
                        >
                          View Applicants
                          <Eye size={15} />
                        </button>
                      </td>

                      <td className="px-6 py-5">
                        {job.isActive ? (
                          <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400">
                            Closed
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              handleHiringOff(job._id)
                            }
                            disabled={isUpdating}
                            title="Toggle job status"
                            className="rounded-lg p-2 text-green-600 transition hover:bg-green-50 dark:hover:bg-green-500/10"
                          >
                            <Power size={17} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(job._id)
                            }
                            disabled={isDeleting}
                            title="Delete job"
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="space-y-3 p-4 md:hidden">

              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold capitalize text-gray-900 dark:text-white">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {job.location || "Location not specified"}
                      </p>
                    </div>

                    {job.isActive ? (
                      <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400">
                        Closed
                      </span>
                    )}

                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">

                    <button
                      onClick={() => setSelectedJob(job._id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400"
                    >
                      <Eye size={16} />
                      Applicants
                    </button>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleHiringOff(job._id)
                        }
                        disabled={isUpdating}
                        className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-500/10"
                      >
                        <Power size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(job._id)
                        }
                        disabled={isDeleting}
                        className="rounded-lg bg-red-50 p-2 text-red-600 dark:bg-red-500/10"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </section>

      {/* APPLICANTS MODAL */}
      {selectedJob && (
        <ApplicantsModal
          jobId={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

    </div>
  );
};

export default HRDashboard;

