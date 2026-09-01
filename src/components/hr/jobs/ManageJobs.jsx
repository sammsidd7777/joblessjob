import React, { useState } from "react";
import Seo from "../../common/Seo";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Eye,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useUpdateJobActiveStatusMutation,
} from "../../../RTK/HrService";

const ManageJobs = () => {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const {
    data: allJobs,
    isLoading,
    isError,
    refetch,
  } = useGetAllJobsQuery();

  const [deleteJob, { isLoading: deleting }] =
    useDeleteJobMutation();

  const [updateJobActiveStatus] =
    useUpdateJobActiveStatusMutation();

  const jobs = allJobs?.data?.jobs || [];

  const filteredJobs = jobs.filter((job) =>
    job?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (id) => {
    try {
      await updateJobActiveStatus(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob({ id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading jobs...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-red-500">
          Failed to load jobs
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Seo title="Manage jobs" noindex />

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Manage Jobs
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, manage and track your job postings.
          </p>
        </div>

        <Link
          to="/hr/add-job"
          className="
            flex w-fit items-center gap-2
            rounded-xl
            bg-gradient-to-r
            from-purple-600
            to-indigo-600
            px-5 py-3
            font-medium
            text-white
            shadow-lg
            shadow-purple-500/20
            transition
            hover:scale-[1.02]
          "
        >
          <Plus size={19} />
          Add New Job
        </Link>

      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Jobs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {jobs.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Jobs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {jobs.filter((job) => job.isActive).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Closed Jobs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {jobs.filter((job) => !job.isActive).length}
          </h2>
        </div>

      </div>

      {/* JOB LIST CARD */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* TOOLBAR */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Job Postings
            </h2>

            <p className="text-sm text-gray-500">
              Manage your posted jobs
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full rounded-xl
                border border-gray-200
                bg-gray-50
                py-3 pl-10 pr-4
                text-sm
                outline-none
                transition
                focus:border-purple-500
                focus:bg-white
                focus:ring-4
                focus:ring-purple-500/10
              "
            />

          </div>

        </div>

        {/* EMPTY STATE */}
        {filteredJobs.length === 0 ? (

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="mb-4 rounded-full bg-purple-50 p-5">
              <BriefcaseBusiness
                size={35}
                className="text-purple-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No jobs found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first job posting to start hiring.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-sm">

              <thead className="bg-gray-50">

                <tr className="text-left text-xs uppercase text-gray-500">

                  <th className="px-6 py-4">
                    Job
                  </th>

                  <th className="px-6 py-4">
                    Location
                  </th>

                  <th className="px-6 py-4">
                    Employment
                  </th>

                  <th className="px-6 py-4">
                    Applicants
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredJobs.map((job) => (

                  <tr
                    key={job._id}
                    className="border-t border-gray-100 transition hover:bg-purple-50/30"
                  >

                    {/* JOB */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                          <BriefcaseBusiness size={20} />
                        </div>

                        <div>
                          <h3 className="font-semibold capitalize text-gray-800">
                            {job.title}
                          </h3>

                          <p className="text-xs text-gray-500">
                            Posted recently
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-5 text-gray-600">
                      {job.location || "Remote"}
                    </td>

                    {/* TYPE */}
                    <td className="px-6 py-5 text-gray-600">
                      {job.employmentType || "N/A"}
                    </td>

                    {/* APPLICANTS */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-gray-600">

                        <Users size={16} />

                        <span>
                          {job.applicationCount || 0}
                        </span>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          handleToggleStatus(job._id)
                        }
                        className={`
                          rounded-full
                          px-3 py-1
                          text-xs
                          font-semibold
                          ${
                            job.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }
                        `}
                      >
                        {job.isActive
                          ? "Active"
                          : "Closed"}
                      </button>

                    </td>

                    {/* ACTIONS */}
                    <td className="relative px-6 py-5 text-right">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === job._id
                              ? null
                              : job._id
                          )
                        }
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenu === job._id && (

                        <div className="absolute right-6 top-14 z-10 w-40 rounded-xl border border-gray-100 bg-white p-2 text-left shadow-xl">

                          <Link
                            to={`/hr/edit-job/${job._id}`}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                          >
                            <Edit size={15} />
                            Edit Job
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(job._id)
                            }
                            disabled={deleting}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                            Delete Job
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ManageJobs;