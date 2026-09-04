import { useParams, useNavigate } from "react-router-dom";

import JobDetail from "./JobDetail";
import { useGetJobByIdQuery } from "../../RTK/HrService";
import { useSavedJobMutation } from "../../RTK/savedJobsApi";

const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetJobByIdQuery(id, {
        skip: !id,
    });

    const [saveJob, { isLoading: isSaving }] =
        useSavedJobMutation();

    /*
     * Backend response can be:
     * { job: {...} }
     * OR directly {...}
     */
    const job = data?.job || data;

    const handleSave = async (jobId) => {
        try {
            await saveJob(jobId).unwrap();
        } catch (error) {
            console.error("Save job error:", error);
        }
    };

    const handleApply = (selectedJob) => {
       
        console.log("Apply:", selectedJob);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#f7f8fc] px-4 py-20 dark:bg-[#080b14]">
                <div className="mx-auto max-w-5xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 w-2/3 rounded-xl bg-slate-200 dark:bg-slate-800" />
                        <div className="h-5 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
                        <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
                        <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !job) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-4 dark:bg-[#080b14]">
                <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Job not found
                    </h1>

                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        {error?.data?.message ||
                            "This job no longer exists or has been removed."}
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                    >
                        Go Back
                    </button>
                </div>
            </main>
        );
    }

    return (
        <JobDetail
            job={job}
            isSaved={job?.isSavedByUser || false}
            isSaving={isSaving}
            onSave={handleSave}
            onApply={handleApply}
            onBack={() => navigate(-1)}
        />
    );
};

export default JobDetailPage;