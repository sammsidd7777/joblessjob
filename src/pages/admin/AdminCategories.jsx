import React from "react";
import { Tags, Info } from "lucide-react";
import { ADMIN_CATEGORIES } from "./adminCategories";

export default function AdminCategories() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7">
        <p className="mb-2 text-xs text-blue-400">Taxonomy</p>
        <h2 className="text-3xl font-bold">Job Categories</h2>
        <p className="mt-2 text-sm text-slate-500">
          These controlled values prevent accidental category typos while posting jobs.
        </p>
      </div>

      <div className="mb-5 flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] p-4 text-sm text-slate-400">
        <Info size={18} className="mt-0.5 shrink-0 text-blue-400" />
        <p>
          Your current backend stores <code className="text-blue-300">jobCategory</code> as a string.
          This page therefore controls the admin input; it does not create a separate category collection.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ADMIN_CATEGORIES.map((category, index) => (
          <div
            key={category.value}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0c10] p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Tags size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">{category.label}</p>
              <p className="mt-1 text-[11px] text-slate-600">Category {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
