import React from "react";
import { useForm } from "react-hook-form";
import { X, GraduationCap, CalendarDays } from "lucide-react";
import { useAddEducationMutation } from "../../../RTK/AuthService";

const AddEducation = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addEducation, { isLoading }] = useAddEducationMutation();

  const onSubmit = async (data) => {
    try {
      await addEducation(data).unwrap();

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add education");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <GraduationCap size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Add Education
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Add your academic background
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 p-6"
        >

          {/* DEGREE */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Degree
            </label>

            <input
              {...register("degree", {
                required: "Degree is required",
              })}
              placeholder="BCA, B.Tech, MBA..."
              className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-800 ${
                errors.degree
                  ? "border-red-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />

            {errors.degree && (
              <p className="mt-1 text-xs text-red-500">
                {errors.degree.message}
              </p>
            )}

          </div>


          {/* INSTITUTE */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Institute / University
            </label>

            <input
              {...register("institute", {
                required: "Institute is required",
              })}
              placeholder="IGNOU, Delhi University..."
              className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-800 ${
                errors.institute
                  ? "border-red-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />

            {errors.institute && (
              <p className="mt-1 text-xs text-red-500">
                {errors.institute.message}
              </p>
            )}

          </div>


          {/* YEAR */}
          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <CalendarDays size={16} />
              Completion Year
            </label>

            <input
              type="number"
              {...register("completeYear")}
              placeholder="2026"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800"
            />

          </div>


          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save Education"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddEducation;