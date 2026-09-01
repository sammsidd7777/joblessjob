import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useGetExternalJobsQuery } from "../../RTK/adminApi";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useGetExternalJobsQuery();

  const jobs = useMemo(() => data?.jobs || [], [data]);

  const stats = useMemo(() => ({
    total: jobs.length,
    active: jobs.filter((j) => j.isActive).length,
    inactive: jobs.filter((j) => !j.isActive).length,
  }), [jobs]);

  const recent = jobs.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs text-blue-400">Overview</p>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage the external vacancies published by admin.
          </p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black hover:bg-slate-200"
        >
          <Plus size={16} />
          Add job
        </Link>
      </div>

      {isError && (
        <div className="mb-5 rounded-xl border border-red-500/15 bg-red-500/[0.05] p-4 text-sm text-red-400">
          Unable to load admin jobs. Make sure you are logged in with an admin account.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat title="Total external jobs" value={isLoading ? "—" : stats.total} icon={BriefcaseBusiness} />
        <Stat title="Active jobs" value={isLoading ? "—" : stats.active} icon={CheckCircle2} />
        <Stat title="Inactive jobs" value={isLoading ? "—" : stats.inactive} icon={XCircle} />
      </div>

      <section className="mt-7 rounded-2xl border border-white/[0.07] bg-[#0a0c10]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div>
            <h3 className="text-sm font-bold">Recent jobs</h3>
            <p className="mt-1 text-xs text-slate-600">Latest admin-posted vacancies</p>
          </div>
          <Link to="/admin/jobs" className="text-xs font-semibold text-blue-400 hover:text-blue-300">
            View all
          </Link>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {recent.map((job) => (
            <div key={job._id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{job.title}</p>
                <p className="mt-1 truncate text-xs text-slate-600">
                  {job.company?.companyName || "Company"} · {job.location || "Location not specified"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  job.isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-slate-500/10 text-slate-500"
                }`}>
                  {job.isActive ? "Active" : "Inactive"}
                </span>
                <Link to={`/admin/jobs/${job._id}/edit`} className="text-slate-500 hover:text-white">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          ))}

          {!isLoading && recent.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-slate-600">
              No external jobs yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0a0c10] p-5">
      <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
        <Icon size={18} />
      </div>
      <p className="text-xs text-slate-600">{title}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
