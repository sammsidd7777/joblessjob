import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  FileText,
  ExternalLink,
  UserRound,
  CalendarDays,
  BriefcaseBusiness,
  Mail,
  Users,
  Clock3,
} from "lucide-react";

import {
  useGetApplicationsForJobQuery,
  useUpdateJobApplyStatusMutation,
} from "../../../RTK/HrService";

const statusStyle = {
  applied:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",

  shortlisted:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",

  interview:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",

  rejected:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",

  hired:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400",
};

const ApplicantsModal = ({ jobId, onClose }) => {
  const { data, isLoading, isError } =
    useGetApplicationsForJobQuery(jobId);

  const [
    updateJobApplyStatus,
    { isLoading: isUpdating },
  ] = useUpdateJobApplyStatusMutation();

  const [loadingId, setLoadingId] = useState(null);

  const applicants = data?.application || [];

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setLoadingId(applicationId);

      await updateJobApplyStatus({
        applicationId,
        status,
      }).unwrap();
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );
    } finally {
      setLoadingId(null);
    }
  };

  const getAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=random&color=fff`;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-slate-950/70
        p-2 sm:p-4 lg:p-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex
          h-[96vh] sm:h-[92vh]
          w-full max-w-[1400px]
          flex-col
          overflow-hidden
          rounded-2xl sm:rounded-3xl
          border border-slate-200
          bg-white
          shadow-2xl
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        {/* ================= HEADER ================= */}

        <header
          className="
            shrink-0
            border-b border-slate-200
            bg-white
            px-4 py-4
            dark:border-slate-800
            dark:bg-slate-900
            sm:px-6 sm:py-5
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {/* ICON */}

              <div
                className="
                  hidden sm:flex
                  h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <Users size={21} />
              </div>

              {/* TITLE */}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    className="
                      truncate
                      text-lg
                      font-bold
                      text-slate-900
                      dark:text-white
                      sm:text-xl
                    "
                  >
                    Applicant Management
                  </h2>

                  {!isLoading && !isError && (
                    <span
                      className="
                        rounded-full
                        bg-blue-50
                        px-2.5 py-1
                        text-xs font-bold
                        text-blue-600
                        dark:bg-blue-500/10
                        dark:text-blue-400
                      "
                    >
                      {applicants.length}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  Review and manage candidate applications
                </p>
              </div>
            </div>

            {/* CLOSE */}

            <button
              onClick={onClose}
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-xl
                border border-slate-200
                text-slate-500
                transition
                hover:border-slate-300
                hover:bg-slate-100
                hover:text-slate-900
                dark:border-slate-700
                dark:text-slate-400
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* LOADING */}

          {isLoading && (
            <div className="space-y-3 p-4 sm:p-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="
                    h-24
                    animate-pulse
                    rounded-2xl
                    bg-slate-100
                    dark:bg-slate-900
                  "
                />
              ))}
            </div>
          )}

          {/* ERROR */}

          {isError && (
            <div className="flex min-h-[400px] items-center justify-center p-6">
              <div className="text-center">
                <div
                  className="
                    mx-auto flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-red-50
                    text-red-500
                    dark:bg-red-500/10
                  "
                >
                  <X size={24} />
                </div>

                <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                  Failed to load applicants
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Please try again later.
                </p>
              </div>
            </div>
          )}

          {/* EMPTY */}

          {!isLoading &&
            !isError &&
            applicants.length === 0 && (
              <div className="flex min-h-[400px] items-center justify-center p-6">
                <div className="max-w-sm text-center">
                  <div
                    className="
                      mx-auto flex h-16 w-16
                      items-center justify-center
                      rounded-2xl
                      bg-slate-100
                      text-slate-400
                      dark:bg-slate-900
                    "
                  >
                    <Users size={28} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    No applicants yet
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Applications for this job will appear here
                    once candidates start applying.
                  </p>
                </div>
              </div>
            )}

          {/* ================= DESKTOP TABLE ================= */}

          {!isLoading &&
            !isError &&
            applicants.length > 0 && (
              <div className="hidden lg:block">
                <table className="w-full border-collapse">
                  <thead
                    className="
                      sticky top-0 z-20
                      border-b
                      border-slate-200
                      bg-slate-50/95
                      backdrop-blur
                      dark:border-slate-800
                      dark:bg-slate-900/95
                    "
                  >
                    <tr>
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Candidate
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Applied Role
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Experience
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Applied
                      </th>

                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {applicants.map((app) => {
                      const applicant = app?.applicant;

                      return (
                        <tr
                          key={app._id}
                          className="
                            group
                            transition
                            hover:bg-slate-50/80
                            dark:hover:bg-slate-900/60
                          "
                        >
                          {/* CANDIDATE */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <img
                                src={getAvatar(
                                  applicant?.name
                                )}
                                alt={
                                  applicant?.name ||
                                  "Candidate"
                                }
                                className="
                                  h-11 w-11
                                  shrink-0
                                  rounded-full
                                  ring-2
                                  ring-white
                                  dark:ring-slate-900
                                "
                              />

                              <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-900 dark:text-white">
                                  {applicant?.name ||
                                    "Unknown Candidate"}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                  <Mail size={12} />

                                  <span className="max-w-[180px] truncate">
                                    {applicant?.email ||
                                      "No email"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* ROLE */}

                          <td className="max-w-[220px] px-6 py-5">
                            <div className="flex items-center gap-2">
                              <BriefcaseBusiness
                                size={15}
                                className="shrink-0 text-slate-400"
                              />

                              <span className="truncate font-medium text-slate-700 dark:text-slate-300">
                                {app?.job?.title || "—"}
                              </span>
                            </div>
                          </td>

                          {/* EXPERIENCE */}

                          <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                            {app?.experience || "—"}
                          </td>

                          {/* DATE */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <CalendarDays
                                size={15}
                                className="text-slate-400"
                              />

                              {formatDate(app?.createdAt)}
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">
                            <select
                              value={app.status}
                              disabled={
                                loadingId === app._id ||
                                isUpdating
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  app._id,
                                  e.target.value
                                )
                              }
                              className={`
                                cursor-pointer
                                rounded-full
                                border
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                outline-none
                                transition
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                ${
                                  statusStyle[
                                    app.status
                                  ] ||
                                  "border-slate-200 bg-slate-100 text-slate-600"
                                }
                              `}
                            >
                              <option value="applied">
                                Applied
                              </option>

                              <option value="shortlisted">
                                Shortlisted
                              </option>

                              <option value="interview">
                                Interview
                              </option>

                              <option value="rejected">
                                Rejected
                              </option>

                              <option value="hired">
                                Hired
                              </option>
                            </select>
                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-2">
                              {app?.resumeUrl && (
                                <a
                                  href={`http://localhost:5000/${app.resumeUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-3
                                    py-2
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                    transition
                                    hover:border-blue-200
                                    hover:bg-blue-50
                                    hover:text-blue-600
                                    dark:border-slate-700
                                    dark:text-slate-300
                                    dark:hover:bg-blue-500/10
                                    dark:hover:text-blue-400
                                  "
                                >
                                  <FileText size={14} />
                                  Resume
                                </a>
                              )}

                              <Link
                                to={`/hr/candidates/${applicant?._id}/${app._id}`}
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-xl
                                  bg-blue-600
                                  px-3
                                  py-2
                                  text-xs
                                  font-semibold
                                  text-white
                                  shadow-sm
                                  shadow-blue-600/20
                                  transition
                                  hover:bg-blue-700
                                "
                              >
                                Profile
                                <ExternalLink
                                  size={14}
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

          {/* ================= MOBILE / TABLET ================= */}

          {!isLoading &&
            !isError &&
            applicants.length > 0 && (
              <div className="space-y-3 p-3 sm:p-5 lg:hidden">
                {applicants.map((app) => {
                  const applicant = app?.applicant;

                  return (
                    <article
                      key={app._id}
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition
                        hover:shadow-md
                        dark:border-slate-800
                        dark:bg-slate-900
                      "
                    >
                      {/* TOP */}

                      <div className="flex items-start gap-3">
                        <img
                          src={getAvatar(
                            applicant?.name
                          )}
                          alt={
                            applicant?.name ||
                            "Candidate"
                          }
                          className="h-12 w-12 shrink-0 rounded-full"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-slate-900 dark:text-white">
                                {applicant?.name ||
                                  "Unknown Candidate"}
                              </h3>

                              <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500">
                                <Mail size={12} />

                                {applicant?.email ||
                                  "No email"}
                              </p>
                            </div>

                            {/* STATUS */}

                            <select
                              value={app.status}
                              disabled={
                                loadingId === app._id ||
                                isUpdating
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  app._id,
                                  e.target.value
                                )
                              }
                              className={`
                                max-w-[120px]
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-[11px]
                                font-bold
                                outline-none
                                ${
                                  statusStyle[
                                    app.status
                                  ] ||
                                  "border-slate-200 bg-slate-100 text-slate-600"
                                }
                              `}
                            >
                              <option value="applied">
                                Applied
                              </option>

                              <option value="shortlisted">
                                Shortlisted
                              </option>

                              <option value="interview">
                                Interview
                              </option>

                              <option value="rejected">
                                Rejected
                              </option>

                              <option value="hired">
                                Hired
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* DETAILS */}

                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-2
                          gap-3
                          rounded-xl
                          bg-slate-50
                          p-3
                          dark:bg-slate-800/60
                        "
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Applied Role
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {app?.job?.title || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Experience
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {app?.experience || "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Applied Date
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            <CalendarDays
                              size={13}
                              className="text-slate-400"
                            />

                            {formatDate(app?.createdAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Application
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <Clock3 size={13} />
                            Active
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-3 flex gap-2">
                        {app?.resumeUrl && (
                          <a
                            href={`http://localhost:5000/${app.resumeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              flex-1
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              px-3
                              py-2.5
                              text-sm
                              font-semibold
                              text-slate-700
                              transition
                              hover:border-blue-200
                              hover:bg-blue-50
                              hover:text-blue-600
                              dark:border-slate-700
                              dark:bg-slate-800
                              dark:text-slate-200
                              dark:hover:bg-blue-500/10
                              dark:hover:text-blue-400
                            "
                          >
                            <FileText size={16} />
                            Resume
                          </a>
                        )}

                        <Link
                          to={`/hr/candidates/${applicant?._id}/${app._id}`}
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-blue-600
                            px-3
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            shadow-blue-600/20
                            transition
                            hover:bg-blue-700
                          "
                        >
                          <UserRound size={16} />
                          Profile
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsModal;