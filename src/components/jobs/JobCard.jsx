import { Link } from "react-router-dom";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Clock3,
} from "lucide-react";
import getPostedTime from "./getPostedTime";

const JobCard = ({
  job,
  isSaved = false,
  onSave,
  onApply,
  isSaving = false,
  jobType,
  companyLogo,
  uploadedByRole,
  featured = false,
}) => {
  // =====================================================
  // JOB TYPE
  // =====================================================

  const isExternal =
    jobType === "external" || job?.jobType === "external";

  // =====================================================
  // COMPANY
  // =====================================================

  const companyName = isExternal
    ? job?.company?.companyName || "Company"
    : job?.company?.companyName ||
      job?.companyName ||
      "Company";

  const resolvedLogo =
    companyLogo ||
    job?.companyLogo ||
    job?.company?.companyLogo ||
    "";

  // =====================================================
  // APPLY METHOD
  // =====================================================

  const applyMethod = job?.applyMethod;

  // =====================================================
  // WHATSAPP APPLY
  // =====================================================

  const handleWhatsAppApply = () => {
    if (!job?.whatsappNumber) return;

    const number = String(job.whatsappNumber).replace(
      /\D/g,
      ""
    );

    if (!number) return;

    const message =
      job?.whatsappMessage ||
      `Hi, I am interested in the ${
        job?.title || "job"
      } position at ${companyName}.`;

    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(
      message
    )}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // WEBSITE APPLY
  // =====================================================

  const handleWebsiteApply = () => {
    if (!job?.externalApplyUrl) return;

    window.open(
      job.externalApplyUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // INTERNAL APPLY
  // =====================================================

  const handleInternalApply = () => {
    if (!job?._id) return;

    onApply?.(job);
  };

  // =====================================================
  // APPLY BUTTON
  // =====================================================

  const renderApplyButton = () => {
    // WHATSAPP
    if (
      applyMethod === "whatsapp" &&
      job?.whatsappNumber
    ) {
      return (
        <button
          type="button"
          onClick={handleWhatsAppApply}
          className="
            group/apply
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#25D366]
            px-4
            py-2.5
            text-xs
            font-bold
            text-black
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_8px_25px_rgba(37,211,102,0.20)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#25D366]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#090b10]
          "
        >
          Apply via WhatsApp

          <MessageCircle
            size={14}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover/apply:rotate-6"
          />
        </button>
      );
    }

    // WEBSITE
    if (
      applyMethod === "website" &&
      job?.externalApplyUrl
    ) {
      return (
        <button
          type="button"
          onClick={handleWebsiteApply}
          className="
            group/apply
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-2.5
            text-xs
            font-bold
            text-[#080a0f]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-slate-100
            hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#090b10]
          "
        >
          Apply now

          <ArrowUpRight
            size={14}
            strokeWidth={2.4}
            className="
              transition-transform
              duration-300
              group-hover/apply:translate-x-0.5
              group-hover/apply:-translate-y-0.5
            "
          />
        </button>
      );
    }

      // email
   if (
  job?.applyMethod === "email" &&
  job?.applicationEmail
) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `mailto:${job.applicationEmail}`;
      }}
      className="
        group/apply
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-white
        px-4
        py-2.5
        text-xs
        font-bold
        text-[#080a0f]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-slate-100
        hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#090b10]
      "
    >
      Apply via Email

      <ArrowUpRight
        size={14}
        strokeWidth={2.4}
        className="
          transition-transform
          duration-300
          group-hover/apply:translate-x-0.5
          group-hover/apply:-translate-y-0.5
        "
      />
    </button>
  );
}

    // EXTERNAL FALLBACK
    if (
      isExternal &&
      job?.externalApplyUrl
    ) {
      return (
        <button
          type="button"
          onClick={handleWebsiteApply}
          className="
            group/apply
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-2.5
            text-xs
            font-bold
            text-[#080a0f]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-slate-100
            hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#090b10]
          "
        >
          Apply now

          <ArrowUpRight
            size={14}
            strokeWidth={2.4}
            className="
              transition-transform
              duration-300
              group-hover/apply:translate-x-0.5
              group-hover/apply:-translate-y-0.5
            "
          />
        </button>
      );
    }

    // INTERNAL
    if (
      !isExternal &&
      (applyMethod === "internal" || !applyMethod)
    ) {
      return (
        <button
          type="button"
          onClick={handleInternalApply}
          className="
            group/apply
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-2.5
            text-xs
            font-bold
            text-[#080a0f]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-slate-100
            hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#090b10]
          "
        >
          Apply now

          <ArrowUpRight
            size={14}
            strokeWidth={2.4}
            className="
              transition-transform
              duration-300
              group-hover/apply:translate-x-0.5
              group-hover/apply:-translate-y-0.5
            "
          />
        </button>
      );
    }

    

    // UNAVAILABLE
    return (
      <button
        type="button"
        disabled
        className="
          inline-flex
          cursor-not-allowed
          items-center
          justify-center
          rounded-xl
          bg-white/[0.04]
          px-4
          py-2.5
          text-xs
          font-semibold
          text-slate-600
        "
      >
        Apply unavailable
      </button>
    );
  };

  // =====================================================
  // LOCATION
  // =====================================================

  const location = job?.location || "Remote";

  // =====================================================
  // REMOTE
  // =====================================================

  const locationLower = location
    .toLowerCase()
    .trim();

  const isRemote =
    locationLower.includes("remote") ||
    locationLower.includes("work from home") ||
    locationLower.includes("wfh");

  // =====================================================
  // SALARY
  // =====================================================

  const salaryMin = job?.salaryRange?.min;
  const salaryMax = job?.salaryRange?.max;

  const hasSalary =
    salaryMin !== null &&
    salaryMin !== undefined &&
    salaryMin !== "";

  const hasSalaryMax =
    salaryMax !== null &&
    salaryMax !== undefined &&
    salaryMax !== "";

  const formatSalary = (value) => {
    if (!value) return "";

    return new Intl.NumberFormat("en-IN").format(
      Number(value)
    );
  };

  // =====================================================
  // POSTED TIME
  // =====================================================

  const postedTime = job?.createdAt
    ? getPostedTime(job.createdAt)
    : "Recently";

  // =====================================================
  // CATEGORY
  // =====================================================

  const category =
    job?.jobCategory ||
    job?.category ||
    "";

  // =====================================================
  // EXPERIENCE
  // =====================================================

  const experience =
    job?.experienceLevel ||
    job?.experience ||
    "";

  // =====================================================
  // CARD
  // =====================================================

  return (
    <article
      className={`
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        p-5
        transition-all
        duration-300
        ease-out

        bg-[#0d0f15]

        ${
          featured
            ? `
              border-purple-500/30
              shadow-[0_0_0_1px_rgba(168,85,247,0.04)]
              hover:-translate-y-1
              hover:border-purple-500/50
              hover:shadow-[0_20px_60px_-30px_rgba(168,85,247,0.35)]
            `
            : `
              border-white/[0.08]
              shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-1
              hover:border-white/[0.16]
              hover:bg-[#101219]
              hover:shadow-[0_20px_55px_-25px_rgba(0,0,0,0.55)]
            `
        }
      `}
    >
      {/* =================================================
          SUBTLE HOVER GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-purple-500/[0.06]
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* =================================================
          FEATURED
      ================================================= */}

      {featured && (
        <div
          className="
            absolute
            right-5
            top-5
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-purple-500/20
            bg-purple-500/10
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-purple-300
          "
        >
          <Sparkles size={11} />
          Featured
        </div>
      )}

      {/* =================================================
          TOP ROW
      ================================================= */}

      <div className="relative flex items-start justify-between gap-3">
        {/* LOGO */}

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-[15px]
            border
            border-white/[0.09]
            bg-white/[0.035]
            text-sm
            font-bold
            text-slate-400
            transition-all
            duration-300
            group-hover:border-white/[0.14]
            group-hover:bg-white/[0.05]
          "
        >
          {resolvedLogo ? (
            <img
              src={resolvedLogo}
              alt={`${companyName} logo`}
              className="
                h-full
                w-full
                object-contain
                p-2
              "
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <span className="text-base">
              {companyName
                ?.charAt(0)
                ?.toUpperCase() || "J"}
            </span>
          )}
        </div>

        {/* SAVE */}

        <button
          type="button"
          onClick={() => onSave?.(job?._id)}
          disabled={isSaving || !job?._id}
          aria-label={
            isSaved
              ? `Remove ${
                  job?.title || "job"
                } from saved jobs`
              : `Save ${
                  job?.title || "job"
                }`
          }
          aria-pressed={isSaved}
          className={`
            group/save
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            border
            px-2.5
            py-2
            text-xs
            font-semibold
            transition-all
            duration-200

            disabled:cursor-not-allowed
            disabled:opacity-50

            ${
              isSaved
                ? `
                  border-blue-500/20
                  bg-blue-500/10
                  text-blue-400
                `
                : `
                  border-white/[0.09]
                  bg-white/[0.025]
                  text-slate-400
                  hover:border-white/[0.16]
                  hover:bg-white/[0.06]
                  hover:text-white
                `
            }
          `}
        >
          {isSaved ? (
            <BookmarkCheck
              size={14}
              strokeWidth={2.2}
            />
          ) : (
            <Bookmark
              size={14}
              strokeWidth={1.9}
              className="
                transition-transform
                duration-200
                group-hover/save:-translate-y-0.5
              "
            />
          )}

          <span className="hidden sm:inline">
            {isSaved ? "Saved" : "Save"}
          </span>
        </button>
      </div>

      {/* =================================================
          COMPANY / TIME
      ================================================= */}

      <div
        className="
          mt-5
          flex
          min-w-0
          items-center
          gap-2
        "
      >
        <span
          className="
            max-w-[65%]
            truncate
            text-[13px]
            font-semibold
            text-slate-200
          "
        >
          {companyName}sidd
        </span>

        <span className="text-slate-600">
          ·
        </span>

        <span
          className="
            flex
            shrink-0
            items-center
            gap-1
            text-[11px]
            font-medium
            text-slate-500
          "
        >
          <Clock3 size={11} />
          {postedTime}
        </span>
      </div>

      {/* =================================================
          TITLE
      ================================================= */}

      <Link
        to={`/jobs/${job?._id}`}
        className="
          mt-2
          block
          rounded-lg
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#0d0f15]
        "
      >
        <h3
          className="
            line-clamp-2
            min-h-[3.35rem]
            text-[1.3rem]
            font-bold
            leading-[1.28]
            tracking-[-0.025em]
            text-white
            transition-colors
            duration-200
            group-hover:text-slate-200
          "
        >
          {job?.title || "Job Opportunity"}
        </h3>
      </Link>

      {/* =================================================
          TAGS
      ================================================= */}

      <div
        className="
          mt-4
          flex
          min-h-[30px]
          flex-wrap
          gap-2
        "
      >
        {/* EMPLOYMENT */}

        {job?.employmentType && (
          <span
            className="
              inline-flex
              items-center
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.06]
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              text-slate-300
            "
          >
            {job.employmentType}
          </span>
        )}

        {/* REMOTE */}

        {isRemote && (
          <span
            className="
              inline-flex
              items-center
              rounded-lg
              border
              border-blue-500/15
              bg-blue-500/10
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              text-blue-400
            "
          >
            Remote
          </span>
        )}

        {/* CATEGORY */}

        {!isRemote && category && (
          <span
            className="
              inline-flex
              max-w-[140px]
              items-center
              truncate
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.06]
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              text-slate-300
            "
          >
            {category}
          </span>
        )}

        {/* EXPERIENCE */}

        {experience && (
          <span
            className="
              inline-flex
              max-w-[130px]
              items-center
              truncate
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.06]
              px-2.5
              py-1.5
              text-[10px]
              font-semibold
              text-slate-300
            "
          >
            {experience}
          </span>
        )}
      </div>

      {/* =================================================
          TRUST
      ================================================= */}

      <div className="mt-4 min-h-[18px]">
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            text-[10px]
            font-semibold
            ${
              uploadedByRole === "admin"
                ? "text-blue-400"
                : "text-emerald-400"
            }
          `}
        >
          <ShieldCheck
            size={12}
            strokeWidth={2.3}
          />

          {uploadedByRole === "admin"
            ? "Verified listing"
            : "Trusted listing"}
        </span>
      </div>

      {/* =================================================
          SPACER
      ================================================= */}

      <div className="flex-1" />

      {/* =================================================
          DIVIDER
      ================================================= */}

      <div
        className="
          mt-5
          border-t
          border-white/[0.07]
        "
      />

      {/* =================================================
          BOTTOM
      ================================================= */}

      <div
        className="
          mt-4
          flex
          items-end
          justify-between
          gap-3
        "
      >
        {/* SALARY + LOCATION */}

        <div className="min-w-0">
          {/* SALARY */}

          <div className="flex items-baseline gap-1.5">
            <span
              className="
                text-[15px]
                font-bold
                tracking-tight
                text-white
              "
            >
              {hasSalary
                ? `₹${formatSalary(
                    salaryMin
                  )}`
                : "Negotiable"}
            </span>

            {hasSalaryMax && (
              <span
                className="
                  text-[12px]
                  font-medium
                  text-slate-500
                "
              >
                – ₹
                {formatSalary(salaryMax)}
              </span>
            )}
          </div>

          {/* LOCATION */}

          <div
            className="
              mt-1.5
              flex
              max-w-[170px]
              items-center
              gap-1.5
              truncate
              text-[11px]
              font-medium
              text-slate-500
            "
            title={location}
          >
            <MapPin
              size={12}
              strokeWidth={1.9}
              className="shrink-0"
            />

            <span className="truncate">
              {location}
            </span>
          </div>
        </div>

        {/* APPLY */}

        <div className="shrink-0">
          {renderApplyButton()}
        </div>
      </div>
    </article>
  );
};

export default JobCard;