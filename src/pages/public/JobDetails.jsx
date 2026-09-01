import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BriefcaseBusiness, X } from "lucide-react";

import { useGetJobByIdQuery } from "../../RTK/HrService";
import {
  useSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import JobDetail from "../../components/jobs/JobDetail";
import AdSlot from "../../components/common/AdSlot";
import NotificationToasty from "../../components/common/NotificationToasty";
import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import { useState } from "react";

const SITE_URL = "https://jobseek-one.vercel.app"; // production frontend domain
const SITE_NAME = "JoblessJob";

const JobDetailsSkeleton = () => (
  <div className="animate-pulse rounded-[20px] border border-slate-200/70 bg-white p-8 dark:border-white/[0.08] dark:bg-[#0B0D12] sm:p-10">
    <div className="flex items-start gap-4">
      <div className="h-16 w-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
      <div className="flex-1 space-y-3">
        <div className="h-6 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
    <div className="mt-8 h-24 rounded-2xl bg-slate-100 dark:bg-white/[0.04]" />
    <div className="mt-8 space-y-2">
      <div className="h-4 w-full rounded bg-slate-100 dark:bg-white/[0.04]" />
      <div className="h-4 w-full rounded bg-slate-100 dark:bg-white/[0.04]" />
      <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-white/[0.04]" />
    </div>
  </div>
);

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: job, isLoading, isError, error } = useGetJobByIdQuery(id, {
    skip: !id,
  });

  const [saveJob, { isLoading: saving }] = useSavedJobMutation();
  const { data: savedData } = useGetSavedJobsQuery();
  const savedJobIds = savedData?.savedJobs?.map((j) => j._id) || [];

  const [isApply, setIsApply] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (jobId) => {
    try {
      setMessage("Saving job...");
      await saveJob(jobId).unwrap();
      setMessage("Job saved successfully");
    } catch (err) {
      setMessage(err?.data?.message || "Please login to save this job");
    }
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const companyName =
    job?.companyName || job?.company?.companyName || job?.source || "A company";
  const companyLogoUrl = job?.companyLogo || job?.company?.companyLogo;
  const pageTitle = job ? `${job.title} at ${companyName} | ${SITE_NAME}` : `Job details | ${SITE_NAME}`;
  const pageDescription = job?.description
    ? job.description.slice(0, 155).trim() + (job.description.length > 155 ? "…" : "")
    : "View full job details, requirements, and apply directly.";
  const canonicalUrl = `${SITE_URL}/jobs/${id}`;

  // JobPosting structured data — lets Google surface this listing in
  // Google for Jobs search results, which drives real organic traffic
  // (the kind of substantive, content-rich page AdSense wants ads next to).
  const jobPostingSchema = job
    ? {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        datePosted: job.createdAt,
        validThrough: job.expiresAt,
        employmentType: job.employmentType?.toUpperCase().replace("-", "_"),
        hiringOrganization: {
          "@type": "Organization",
          name: companyName,
          ...(companyLogoUrl ? { logo: companyLogoUrl } : {}),
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location || "Remote",
            addressCountry: "IN",
          },
        },
        ...(job.salaryRange?.min || job.salaryRange?.max
          ? {
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: {
                  "@type": "QuantitativeValue",
                  minValue: job.salaryRange?.min,
                  maxValue: job.salaryRange?.max,
                  unitText: "YEAR",
                },
              },
            }
          : {}),
      }
    : null;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#080b14] dark:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / social preview */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {companyLogoUrl && <meta property="og:image" content={companyLogoUrl} />}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Don't index closed listings — thin/expired content hurts
            overall site quality signals */}
        {job?.isActive === false && <meta name="robots" content="noindex, follow" />}

        {jobPostingSchema && (
          <script type="application/ld+json">
            {JSON.stringify(jobPostingSchema)}
          </script>
        )}
      </Helmet>

      {message && <NotificationToasty message={message} />}

      {/* Top leaderboard ad — sits below the header, above content,
          a standard high-viewability placement that doesn't crowd the
          job info itself */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AdSlot slot="1111111111" className="min-h-[90px] w-full" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* MAIN COLUMN */}
          <div>
            {isLoading && <JobDetailsSkeleton />}

            {isError && (
              <div className="rounded-[20px] border border-slate-200/70 bg-white p-10 text-center dark:border-white/[0.08] dark:bg-[#0B0D12]">
                <BriefcaseBusiness size={36} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                <h1 className="font-serif text-xl font-medium text-slate-900 dark:text-white">
                  {error?.status === 404
                    ? "This job no longer exists"
                    : "Something went wrong"}
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {error?.status === 404
                    ? "It may have been removed or the link is incorrect."
                    : "Please try again in a moment."}
                </p>
                <Link
                  to="/find-job"
                  className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
                >
                  Browse other jobs
                </Link>
              </div>
            )}

            {job && (
              <JobDetail
                job={job}
                isSaved={savedJobIds.includes(job._id)}
                isSaving={saving}
                onSave={handleSave}
                onApply={() => setIsApply(true)}
                onBack={() => navigate(-1)}
              />
            )}

            {/* In-content native ad — placed after the reader has
                engaged with the job's actual content */}
            {job && (
              <div className="mt-8">
                <AdSlot slot="2222222222" format="fluid" layout="in-article" className="min-h-[280px] w-full" />
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:pt-0">
            <AdSlot slot="3333333333" className="min-h-[250px] w-full" />

            <div className="rounded-[20px] border border-slate-200/70 bg-white p-6 dark:border-white/[0.08] dark:bg-[#0B0D12]">
              <h2 className="font-serif text-base font-medium text-slate-900 dark:text-white">
                Keep exploring
              </h2>
              <p className="mt-2 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                Not the right fit? Browse more roles that match your skills.
              </p>
              <Link
                to="/find-job"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline dark:text-white"
              >
                Browse all jobs
              </Link>
            </div>

            <AdSlot slot="4444444444" className="min-h-[250px] w-full" />
          </aside>
        </div>
      </section>

      {/* APPLY MODAL */}
      {isApply && job && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <button
              onClick={() => setIsApply(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="pr-10">
              <h2 className="text-2xl font-bold">Apply for this job</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Complete your application below.
              </p>
            </div>
            <div className="mt-6">
              <ApplyJobForm jobId={job._id} setIsApply={setIsApply} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetails;
