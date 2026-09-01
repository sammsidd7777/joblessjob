import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  BriefcaseBusiness,
  Mail,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Clock3,
  LockKeyhole,
  Info,
} from "lucide-react";

import { useGetCompanyByIdQuery } from "../../RTK/CompanyService";
import Seo from "../../components/common/Seo";
import AdSlot from "../../components/common/AdSlot";
import getPostedTime from "../../components/jobs/getPostedTime";

/* =========================================================
   SKELETON
========================================================= */

const CompanyDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="h-32 bg-slate-200 dark:bg-slate-800 sm:h-40" />

      <div className="px-5 pb-7 sm:px-8">
        <div className="-mt-12">
          <div className="h-24 w-24 rounded-2xl border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800" />
        </div>

        <div className="mt-5 space-y-3">
          <div className="h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="mt-7">
          <div className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>

    <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
  </div>
);

/* =========================================================
   SAFE SALARY FORMATTER
========================================================= */

const formatSalary = (salary) => {
  if (!salary) return "Not disclosed";

  // If backend returns simple string
  if (typeof salary === "string") {
    return salary.trim() || "Not disclosed";
  }

  // If backend returns number
  if (typeof salary === "number") {
    return `₹${salary.toLocaleString("en-IN")}`;
  }

  // If backend returns object { min, max }
  if (typeof salary === "object") {
    const min = Number(salary?.min);
    const max = Number(salary?.max);

    const hasMin = Number.isFinite(min) && min > 0;
    const hasMax = Number.isFinite(max) && max > 0;

    if (hasMin && hasMax) {
      if (min === max) {
        return `₹${min.toLocaleString("en-IN")}`;
      }

      return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString(
        "en-IN"
      )}`;
    }

    if (hasMin) {
      return `₹${min.toLocaleString("en-IN")}+`;
    }

    if (hasMax) {
      return `Up to ₹${max.toLocaleString("en-IN")}`;
    }
  }

  return "Not disclosed";
};

/* =========================================================
   INFO ITEM
========================================================= */

const InfoItem = ({
  icon: Icon,
  label,
  value,
  href,
  privateValue = false,
}) => {
  const content = (
    <div
      className={`
        flex items-start gap-3 rounded-2xl border
        border-slate-200/80 bg-slate-50/70 p-4
        dark:border-white/[0.07] dark:bg-white/[0.03]
        ${
          href
            ? "transition hover:border-blue-300 dark:hover:border-blue-500/30"
            : ""
        }
      `}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-300">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        {privateValue ? (
          <div className="mt-1 flex items-center gap-1.5">
            <LockKeyhole size={13} className="text-slate-400" />

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Not disclosed
            </p>
          </div>
        ) : (
          <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
            {value}
          </p>
        )}
      </div>
    </div>
  );

  if (!href || privateValue) {
    return content;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </a>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCompanyByIdQuery(id, {
    skip: !id,
  });

  const company = data?.company;

  const activeJobs = Array.isArray(company?.jobs)
    ? company.jobs
    : [];

  /* =========================================================
     COMPANY DATA
  ========================================================= */

  const companyName =
    company?.companyName ||
    company?.name ||
    "Company Profile";

  const companyLogo =
    company?.companyLogo ||
    company?.logo ||
    null;

  const description =
    company?.description ||
    "No company description has been provided yet.";

  const industry =
    company?.industry ||
    company?.category ||
    null;

  const location =
    company?.location ||
    company?.address ||
    company?.city ||
    null;

  /* =========================================================
     CONTACT DATA
  ========================================================= */

  const companyEmail =
    company?.email ||
    company?.companyEmail ||
    company?.contactEmail ||
    null;

  const companyPhone =
    company?.phone ||
    company?.companyPhone ||
    company?.contactPhone ||
    null;

  const website =
    company?.website ||
    company?.companyWebsite ||
    null;

  const linkedin =
    company?.linkedin ||
    company?.linkedinUrl ||
    null;

  /* =========================================================
     RECRUITER
  ========================================================= */

  const recruiter =
    company?.hr ||
    company?.recruiter ||
    company?.recruiterDetails ||
    company?.contactPerson ||
    null;

  const recruiterName =
    recruiter?.name ||
    recruiter?.fullName ||
    null;

  const recruiterEmail =
    recruiter?.email ||
    null;

  const recruiterPhone =
    recruiter?.phone ||
    null;

  /* =========================================================
     URL NORMALIZER
  ========================================================= */

  const normalizeUrl = (url) => {
    if (!url || typeof url !== "string") {
      return null;
    }

    const cleanUrl = url.trim();

    if (!cleanUrl) {
      return null;
    }

    if (
      cleanUrl.startsWith("http://") ||
      cleanUrl.startsWith("https://")
    ) {
      return cleanUrl;
    }

    return `https://${cleanUrl}`;
  };

  const websiteUrl = normalizeUrl(website);
  const linkedinUrl = normalizeUrl(linkedin);

  /* =========================================================
     SEO
  ========================================================= */

  const pageDescription = company?.description
    ? company.description
        .replace(/\s+/g, " ")
        .slice(0, 155)
        .trim() +
      (company.description.length > 155 ? "…" : "")
    : `Explore ${companyName}, open jobs, career opportunities and company information on JoblessJob.`;

  /* =========================================================
     ORGANIZATION SCHEMA
  ========================================================= */

  const organizationSchema = company
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyName,

        ...(companyLogo
          ? {
              logo: companyLogo,
            }
          : {}),

        ...(company?.description
          ? {
              description: company.description,
            }
          : {}),

        ...(industry
          ? {
              industry,
            }
          : {}),

        ...(location
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: location,
              },
            }
          : {}),

        ...(websiteUrl
          ? {
              url: websiteUrl,
            }
          : {}),
      }
    : null;

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] px-4 py-8 dark:bg-[#080b14] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CompanyDetailsSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-[#080b14] dark:text-white">

      {/* =====================================================
          SEO
      ===================================================== */}

      <Seo
        title={`${companyName} - Company Profile & Jobs`}
        description={pageDescription}
        path={`/company/${id}`}
        image={companyLogo}
      />

      {organizationSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </Helmet>
      )}

      {/* =====================================================
          TOP AD
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <AdSlot
          slot="5555555555"
          className="min-h-[90px] w-full"
        />
      </div>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* BACK */}

        <button
          onClick={() => navigate(-1)}
          className="
            mb-6 inline-flex items-center gap-2
            rounded-xl px-3 py-2
            text-sm font-medium
            text-slate-500
            transition
            hover:bg-white
            hover:text-blue-600
            dark:text-slate-400
            dark:hover:bg-slate-900
            dark:hover:text-blue-400
          "
        >
          <ArrowLeft size={16} />
          Back to companies
        </button>

        {/* ===================================================
            ERROR
        =================================================== */}

        {isError && (
          <div className="rounded-3xl border border-red-200 bg-white p-10 text-center dark:border-red-900/40 dark:bg-slate-900">

            <Building2
              size={42}
              className="mx-auto mb-4 text-slate-300"
            />

            <h1 className="text-xl font-bold">
              {error?.status === 404
                ? "Company not found"
                : "Unable to load company"}
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The company may have been removed or the link may be incorrect.
            </p>

            <Link
              to="/companies"
              className="
                mt-6 inline-flex
                rounded-xl
                bg-slate-900
                px-5 py-3
                text-sm font-semibold
                text-white
                dark:bg-white
                dark:text-slate-900
              "
            >
              Browse Companies
            </Link>
          </div>
        )}

        {/* ===================================================
            CONTENT
        =================================================== */}

        {company && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="min-w-0 space-y-6">

              {/* =================================================
                  COMPANY HEADER
              ================================================= */}

              <article
                className="
                  overflow-hidden
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  shadow-sm
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                "
              >

                {/* HEADER */}

                <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:h-40" />

                <div className="px-5 pb-7 sm:px-8">

                  {/* LOGO */}

                  <div className="-mt-12 sm:-mt-14">

                    <div
                      className="
                        flex h-24 w-24
                        items-center justify-center
                        overflow-hidden
                        rounded-2xl
                        border-4
                        border-white
                        bg-white
                        shadow-xl
                        dark:border-[#0B0D12]
                        dark:bg-slate-900
                      "
                    >

                      {companyLogo ? (
                        <img
                          src={companyLogo}
                          alt={`${companyName} logo`}
                          className="h-full w-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/meta.png";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-800">
                          <Building2
                            size={38}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                    </div>

                  </div>

                  {/* TITLE */}

                  <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h1
                          className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            dark:text-white
                            sm:text-3xl
                          "
                        >
                          {companyName}
                        </h1>

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-emerald-200
                            bg-emerald-50
                            px-2.5 py-1
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-emerald-700
                            dark:border-emerald-500/20
                            dark:bg-emerald-500/10
                            dark:text-emerald-400
                          "
                        >
                          <ShieldCheck size={13} />
                          Company
                        </span>

                      </div>

                      {industry && (
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {industry}
                        </p>
                      )}

                      {location && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin size={15} />
                          {location}
                        </div>
                      )}

                    </div>

                    {websiteUrl && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          h-fit
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4 py-2.5
                          text-sm
                          font-semibold
                          text-slate-700
                          transition
                          hover:border-blue-300
                          hover:text-blue-600
                          dark:border-white/10
                          dark:bg-white/[0.03]
                          dark:text-slate-300
                        "
                      >
                        <Globe size={16} />
                        Website
                        <ExternalLink size={14} />
                      </a>
                    )}

                  </div>

                  {/* ONLY OPEN JOBS */}

                  <div className="mt-7">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-emerald-200
                        bg-emerald-50
                        px-5 py-4
                        dark:border-emerald-500/20
                        dark:bg-emerald-500/10
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            bg-white
                            text-emerald-600
                            shadow-sm
                            dark:bg-slate-900
                            dark:text-emerald-400
                          "
                        >
                          <BriefcaseBusiness size={19} />
                        </div>

                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Open Jobs
                          </p>

                          <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
                            {activeJobs.length}
                          </p>
                        </div>

                      </div>

                      <BriefcaseBusiness
                        size={28}
                        className="text-emerald-500/50"
                      />

                    </div>

                  </div>

                </div>

              </article>

              {/* =================================================
                  ABOUT
              ================================================= */}

              <section
                className="
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  p-6
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                  sm:p-8
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-8 w-1 rounded-full bg-blue-600" />

                  <div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      About {companyName}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Company overview
                    </p>

                  </div>

                </div>

                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-7
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {description}
                </p>

              </section>

              {/* =================================================
                  COMPANY INFORMATION
              ================================================= */}

              <section
                className="
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  p-6
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                  sm:p-8
                "
              >

                <div className="mb-6">

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Company Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Available company information
                  </p>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <InfoItem
                    icon={Mail}
                    label="Company Email"
                    value={companyEmail}
                    href={
                      companyEmail
                        ? `mailto:${companyEmail}`
                        : null
                    }
                    privateValue={!companyEmail}
                  />

                  <InfoItem
                    icon={Phone}
                    label="Company Phone"
                    value={companyPhone}
                    href={
                      companyPhone
                        ? `tel:${companyPhone}`
                        : null
                    }
                    privateValue={!companyPhone}
                  />

                  <InfoItem
                    icon={Globe}
                    label="Website"
                    value={website || null}
                    href={websiteUrl}
                    privateValue={!website}
                  />

                  <InfoItem
                    icon={ExternalLink}
                    label="LinkedIn"
                    value={
                      linkedin
                        ? "View company profile"
                        : null
                    }
                    href={linkedinUrl}
                    privateValue={!linkedin}
                  />

                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={location}
                    privateValue={!location}
                  />

                  <InfoItem
                    icon={BriefcaseBusiness}
                    label="Industry"
                    value={industry}
                    privateValue={!industry}
                  />

                </div>

              </section>

              {/* =================================================
                  HR CONTACT
              ================================================= */}

              <section
                className="
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  p-6
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                  sm:p-8
                "
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Recruiter / HR Contact
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Contact details shared by the company
                    </p>

                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-blue-50
                      p-3
                      text-blue-600
                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <BriefcaseBusiness size={20} />
                  </div>

                </div>

                <div className="mt-6">

                  {recruiterName ? (
                    <div
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50/70
                        p-5
                        dark:border-white/[0.07]
                        dark:bg-white/[0.03]
                      "
                    >

                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {recruiterName}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        HR / Recruiter
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <InfoItem
                          icon={Mail}
                          label="Email"
                          value={recruiterEmail}
                          href={
                            recruiterEmail
                              ? `mailto:${recruiterEmail}`
                              : null
                          }
                          privateValue={!recruiterEmail}
                        />

                        <InfoItem
                          icon={Phone}
                          label="Phone"
                          value={recruiterPhone}
                          href={
                            recruiterPhone
                              ? `tel:${recruiterPhone}`
                              : null
                          }
                          privateValue={!recruiterPhone}
                        />

                      </div>

                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50/70
                        p-5
                        dark:border-white/[0.07]
                        dark:bg-white/[0.03]
                      "
                    >

                      <div
                        className="
                          rounded-xl
                          bg-slate-200
                          p-2.5
                          text-slate-500
                          dark:bg-slate-800
                          dark:text-slate-400
                        "
                      >
                        <LockKeyhole size={18} />
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          HR contact information is private
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                          This company has not provided public recruiter contact details.
                        </p>

                      </div>

                    </div>
                  )}

                </div>

              </section>

              {/* =================================================
                  OPEN JOBS
              ================================================= */}

              <section
                id="open-jobs"
                className="
                  scroll-mt-24
                  rounded-3xl
                  border border-slate-200
                  bg-white
                  p-6
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                  sm:p-8
                "
              >

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                  <div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Open Jobs at {companyName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Current opportunities available from this company
                    </p>

                  </div>

                  <span
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-1.5
                      rounded-full
                      bg-blue-50
                      px-3 py-1.5
                      text-xs
                      font-semibold
                      text-blue-600
                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <BriefcaseBusiness size={13} />
                    {activeJobs.length} Jobs
                  </span>

                </div>

                {activeJobs.length > 0 ? (
                  <div className="mt-6 space-y-3">

                    {activeJobs.map((job) => {

                      const salary = formatSalary(
                        job?.salaryRange ??
                          job?.salary ??
                          job?.salaryDetails
                      );

                      return (
                        <Link
                          key={job._id}
                          to={`/jobs/${job._id}`}
                          className="
                            group
                            block
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50/50
                            p-4
                            transition
                            hover:border-blue-300
                            hover:bg-blue-50/30
                            dark:border-white/[0.07]
                            dark:bg-white/[0.02]
                            dark:hover:border-blue-500/30
                            dark:hover:bg-blue-500/[0.04]
                          "
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <h3
                                className="
                                  truncate
                                  text-sm
                                  font-bold
                                  text-slate-900
                                  group-hover:text-blue-600
                                  dark:text-white
                                  dark:group-hover:text-blue-400
                                "
                              >
                                {job?.title || "Job opportunity"}
                              </h3>

                              <div
                                className="
                                  mt-2
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-x-3
                                  gap-y-2
                                  text-xs
                                  text-slate-500
                                  dark:text-slate-400
                                "
                              >

                                <span className="inline-flex items-center gap-1">
                                  <MapPin size={12} />
                                  {job?.location || "Remote"}
                                </span>

                                <span>•</span>

                                <span>
                                  {job?.employmentType || "Full-time"}
                                </span>

                                <span>•</span>

                                <span
                                  className="
                                    font-semibold
                                    text-slate-700
                                    dark:text-slate-300
                                  "
                                >
                                  {salary}
                                </span>

                                {job?.createdAt && (
                                  <>
                                    <span>•</span>

                                    <span className="inline-flex items-center gap-1">
                                      <Clock3 size={12} />
                                      {getPostedTime(job.createdAt)}
                                    </span>
                                  </>
                                )}

                              </div>

                            </div>

                            <ArrowUpRight
                              size={18}
                              className="
                                mt-0.5
                                shrink-0
                                text-slate-400
                                transition
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                                group-hover:text-blue-600
                              "
                            />

                          </div>

                        </Link>
                      );
                    })}

                  </div>
                ) : (
                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border
                      border-dashed
                      border-slate-300
                      p-8
                      text-center
                      dark:border-slate-700
                    "
                  >

                    <BriefcaseBusiness
                      size={34}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <h3 className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
                      No open jobs
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      This company currently has no active job listings.
                    </p>

                  </div>
                )}

              </section>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-6">

              {/* =================================================
                  SIDEBAR AD
              ================================================= */}

              <div className="w-full">

                <AdSlot
                  slot="6666666666"
                  className="
                    min-h-[250px]
                    w-full
                    overflow-hidden
                    rounded-2xl
                  "
                />

              </div>

              {/* =================================================
                  QUICK INFORMATION
              ================================================= */}

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  dark:border-white/[0.07]
                  dark:bg-[#0B0D12]
                "
              >

                <div className="flex items-center gap-2">

                  <Info
                    size={17}
                    className="text-blue-600"
                  />

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Quick Information
                  </h3>

                </div>

                <div className="mt-5 space-y-4">

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Company
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {companyName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Industry
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {industry || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {location || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Open positions
                    </p>

                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {activeJobs.length}
                    </p>
                  </div>

                </div>

              </div>

              {/* =================================================
                  CAREER CTA
              ================================================= */}

              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  bg-gradient-to-br
                  from-blue-600
                  via-indigo-600
                  to-purple-600
                  p-6
                  text-white
                  shadow-xl
                  shadow-blue-600/10
                "
              >

                <div
                  className="
                    mb-4
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <BriefcaseBusiness size={21} />
                </div>

                <h3 className="text-lg font-bold">
                  Interested in working here?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Explore current openings and find a role that matches your skills.
                </p>

                {activeJobs.length > 0 && (
                  <a
                    href="#open-jobs"
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-4 py-2.5
                      text-sm
                      font-bold
                      text-blue-600
                      transition
                      hover:bg-slate-100
                    "
                  >
                    View Open Jobs
                    <ArrowUpRight size={15} />
                  </a>
                )}

              </div>

            </aside>

          </div>
        )}

      </section>
    </main>
  );
};

export default CompanyDetails;