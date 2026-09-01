import { useForm } from "react-hook-form";
import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useApplyJobMutation } from "../../../RTK/CompanyService";

function ApplyJobForm({ jobId, setIsApply, isDemo = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [applyJob] = useApplyJobMutation();

  const closeForm = () => {
    setTimeout(() => {
      setIsApply(false);
    }, 2000);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      // ================= DEMO / STATIC JOB =================
      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSuccess(true);
        setMessage("Application submitted successfully!");
        reset();
        closeForm();

        return;
      }

      // ================= REAL API JOB =================
      await applyJob({
        jobId,
        data,
      }).unwrap();

      setSuccess(true);
      setMessage("Application submitted successfully!");
      reset();
      closeForm();
      setLoading(false);


    } catch (error) {
      setMessage(
        error?.data?.message ||
        error?.message ||
        "Something went wrong while applying"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS VIEW ================= */

  if (success) {
    return (
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-green-200 bg-white p-8 text-center shadow-2xl dark:border-green-900 dark:bg-gray-900">

        <button
          onClick={() => setIsApply(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2
            size={34}
            className="text-green-600 dark:text-green-400"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Application Sent!
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {message}
        </p>

        <p className="mt-4 text-sm text-gray-400">
          This window will close automatically...
        </p>
      </div>
    );
  }

  /* ================= FORM VIEW ================= */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:p-8"
    >

      {/* CLOSE BUTTON */}

      <button
        type="button"
        onClick={() => setIsApply(false)}
        className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
      >
        <X size={20} />
      </button>

      {/* HEADER */}

      <div className="mb-6 pr-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Send size={22} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Apply for this job
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tell the employer why you are a great fit for this opportunity.
        </p>
      </div>

      {/* ERROR MESSAGE */}

      {message && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* COVER LETTER */}

      <div className="mb-6">

        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Cover Letter
        </label>

        <textarea
          {...register("coverLetter", {
            required: "Cover letter is required",
            minLength: {
              value: 30,
              message: "Minimum 30 characters required",
            },
          })}
          rows={7}
          placeholder="Write a short message explaining why you are a good fit for this role..."
          className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        {errors.coverLetter && (
          <p className="mt-2 text-xs text-red-500">
            {errors.coverLetter.message}
          </p>
        )}

      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          "Submitting Application..."
        ) : (
          <>
            <Send size={18} />
            Submit Application
          </>
        )}
      </button>

    </form>
  );
}

export default ApplyJobForm;