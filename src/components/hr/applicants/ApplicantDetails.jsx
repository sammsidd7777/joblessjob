import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Seo from "../../common/Seo";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  Briefcase,
  FileText,
  ArrowLeft,
  UserRound,
  Sparkles,
} from "lucide-react";

import {
  useUpdateJobApplyStatusMutation,
  useViewCandidateDetailQuery,
} from "../../../RTK/HrService";

const ApplicantDetails = () => {
  const { candidateId, applicationId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useViewCandidateDetailQuery(candidateId);

  const [
    updateJobApplyStatus,
    { isLoading: isUpdating },
  ] = useUpdateJobApplyStatusMutation();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500" />

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading candidate profile...
          </p>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <XCircle size={30} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Failed to load candidate
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Something went wrong while loading this application.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const candidate = data?.candidate;

  /* ================= STATUS ================= */

  const handleStatusChange = async (status) => {
    if (!applicationId) return;

    try {
      await updateJobApplyStatus({
        id: applicationId,
        status,
      }).unwrap();

      await refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  /* ================= PROFILE IMAGE ================= */

  const profileImage = candidate?.profilePic
    ? `http://localhost:5000${candidate.profilePic}`
    : "/default-avatar.png";

  /* ================= RESUME ================= */

  const resumeUrl = candidate?.resume
    ? `http://localhost:5000/${candidate.resume}`
    : null;

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 text-slate-900 dark:bg-[#080b14] dark:text-white sm:px-6 lg:px-8">
      <Seo title="Applicant details" noindex />

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <div className="mx-auto mb-7 max-w-7xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={17} />
          Back to applicants
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <UserRound size={14} />
              Candidate Application
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              {candidate?.name || "Candidate Profile"}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review candidate information and application details
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Application Profile
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <aside className="space-y-6 lg:col-span-4">

          {/* PROFILE CARD */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            {/* COVER */}

            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">

              <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

            </div>

            {/* PROFILE */}

            <div className="px-6 pb-6">

              {/* IMAGE */}

              <div className="relative -mt-14">

                <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-xl dark:border-slate-900 dark:bg-slate-800">

                  <img
                    src="data:image/png;base64,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"
                    alt={candidate?.name || "Candidate"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />

                </div>

                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />

              </div>

              {/* NAME */}

              <div className="mt-5">

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {candidate?.name || "Unknown Candidate"}
                </h2>

                {candidate?.role && (
                  <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {candidate.role}
                  </p>
                )}

                {candidate?.location && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={15} />
                    {candidate.location}
                  </div>
                )}

              </div>

              {/* ACTIONS */}

              {applicationId && (
                <div className="mt-6 space-y-3">

                  <button
                    disabled={isUpdating}
                    onClick={() =>
                      handleStatusChange("interview")
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Calendar size={17} />

                    {isUpdating
                      ? "Updating..."
                      : "Schedule Interview"}
                  </button>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusChange("shortlisted")
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                      <CheckCircle size={16} />
                      Shortlist
                    </button>

                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusChange("rejected")
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>

                  </div>

                </div>
              )}

              {/* CONTACT */}

              {(candidate?.email ||
                candidate?.phone ||
                candidate?.linkedin) && (
                <div className="mt-7 border-t border-slate-100 pt-6 dark:border-slate-800">

                  <h3 className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                    Contact Information
                  </h3>

                  <div className="space-y-4">

                    {candidate?.email && (
                      <div className="flex items-start gap-3">

                        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800">
                          <Mail size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Email
                          </p>

                          <p className="mt-1 break-all text-sm text-slate-700 dark:text-slate-300">
                            {candidate.email}
                          </p>
                        </div>

                      </div>
                    )}

                    {candidate?.phone && (
                      <div className="flex items-start gap-3">

                        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800">
                          <Phone size={16} />
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Phone
                          </p>

                          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                            {candidate.phone}
                          </p>
                        </div>

                      </div>
                    )}

                    {candidate?.linkedin && (
                      <a
                        href={candidate.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
                      >
                        <div className="rounded-xl bg-blue-50 p-2.5 dark:bg-blue-500/10">
                          <ExternalLink size={16} />
                        </div>

                        <span className="text-sm font-semibold">
                          View LinkedIn Profile
                        </span>
                      </a>
                    )}

                  </div>
                </div>
              )}

            </div>
          </div>

          {/* SKILLS */}

          {candidate?.skills?.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Briefcase size={18} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Skills & Expertise
                  </h3>

                  <p className="text-xs text-slate-400">
                    Candidate skills
                  </p>
                </div>

              </div>

              <div className="flex flex-wrap gap-2">

                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>
          )}

        </aside>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <main className="space-y-6 lg:col-span-8">

          {/* RESUME */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FileText size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Resume / CV
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Candidate's uploaded resume
                  </p>
                </div>

              </div>

              {resumeUrl && (
                <div className="flex gap-2">

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    <Eye size={16} />
                    Preview
                  </a>

                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Download size={16} />
                    Download
                  </a>

                </div>
              )}

            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">

              {resumeUrl ? (
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-900">
                    <FileText size={25} className="text-red-500" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Resume uploaded
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Preview or download the candidate's resume.
                    </p>
                  </div>

                </div>
              ) : (
                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-400 dark:bg-slate-800">
                    <FileText size={22} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      No resume uploaded
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      The candidate hasn't provided a resume.
                    </p>
                  </div>

                </div>
              )}

            </div>

          </section>

          {/* ABOUT */}

          {candidate?.bio && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    About Candidate
                  </h3>

                  <p className="text-xs text-slate-400">
                    Candidate introduction
                  </p>
                </div>

              </div>

              <p className="text-sm leading-8 text-slate-600 dark:text-slate-400">
                {candidate.bio}
              </p>

            </section>
          )}

          {/* INFORMATION */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {candidate?.location && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {candidate.location}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {candidate?.skills?.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Briefcase size={18} />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Skills
                    </p>

                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {candidate.skills.length} Skills
                    </p>
                  </div>

                </div>

              </div>
            )}

            {candidate?.resume && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Resume
                    </p>

                    <p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      Available
                    </p>
                  </div>

                </div>

              </div>
            )}

            {candidate?.email && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 truncate font-semibold text-slate-900 dark:text-white">
                      {candidate.email}
                    </p>
                  </div>

                </div>

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  );
};

export default ApplicantDetails;