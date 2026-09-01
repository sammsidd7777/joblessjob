import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  BriefcaseBusiness,
  Building2,
  Send,
  MapPin,
  Link as LinkIcon,
  MessageCircle,
  Globe,
} from "lucide-react";

import {
  useCreateExternalJobMutation,
  useGetExternalJobByIdQuery,
  useUpdateExternalJobMutation,
} from "../../RTK/adminApi";

import { ADMIN_CATEGORIES } from "./adminCategories";

// =====================================================
// DEFAULT VALUES
// =====================================================

const defaultValues = {
  title: "",
  description: "",
  location: "",
  employmentType: "Full-time",

  salaryMin: "",
  salaryMax: "",

  skills: "",
  jobCategory: "",

  companyName: "",
  companyLogo: "",
  companyWebsite: "",
  companyLocation: "",
  industry: "",
  companyDescription: "",

  source: "",

  applyMethod: "website",
  externalApplyUrl: "",
  whatsappNumber: "",
};

// =====================================================
// MAIN
// =====================================================

export default function AdminJobForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editing = Boolean(id);

  // ===================================================
  // API
  // ===================================================

  const {
    data,
    isLoading: loadingJob,
  } = useGetExternalJobByIdQuery(id, {
    skip: !editing,
  });

  const [createJob, { isLoading: creating }] =
    useCreateExternalJobMutation();

  const [updateJob, { isLoading: updating }] =
    useUpdateExternalJobMutation();

  // ===================================================
  // FORM
  // ===================================================

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  const applyMethod = watch("applyMethod");

  // ===================================================
  // EDIT DATA
  // ===================================================

  useEffect(() => {
    if (!editing || !data?.job) return;

    const job = data.job;

    reset({
      title: job.title || "",
      description: job.description || "",
      location: job.location || "",
      employmentType: job.employmentType || "Full-time",

      salaryMin: job.salaryRange?.min ?? "",
      salaryMax: job.salaryRange?.max ?? "",

      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : "",

      jobCategory: job.jobCategory || "",

      companyName: job.company?.companyName || "",

      companyLogo:
        job.company?.companyLogo ||
        job.companyLogo ||
        "",

      companyWebsite:
        job.company?.website || "",

      companyLocation:
        job.company?.location || "",

      industry:
        job.company?.industry || "",

      companyDescription:
        job.company?.description || "",

      source: job.source || "",

      applyMethod:
        job.applyMethod || "website",

      externalApplyUrl:
        job.externalApplyUrl || "",

      whatsappNumber:
        job.whatsappNumber || "",
    });
  }, [editing, data, reset]);

  // ===================================================
  // SUBMIT
  // ===================================================

  const onSubmit = async (form) => {
    try {
      const payload = {
        title: form.title.trim(),

        description: form.description.trim(),

        location: form.location.trim(),

        employmentType:
          form.employmentType,

        salaryRange: {
          min:
            form.salaryMin === ""
              ? null
              : Number(form.salaryMin),

          max:
            form.salaryMax === ""
              ? null
              : Number(form.salaryMax),
        },

        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        jobCategory:
          form.jobCategory,

        companyName:
          form.companyName.trim(),

        companyLogo:
          form.companyLogo.trim(),

        companyWebsite:
          form.companyWebsite.trim(),

        companyLocation:
          form.companyLocation.trim(),

        industry:
          form.industry.trim(),

        companyDescription:
          form.companyDescription.trim(),

        source:
          form.source.trim() || null,

        applyMethod:
          form.applyMethod,

        externalApplyUrl:
          form.applyMethod === "website"
            ? form.externalApplyUrl.trim()
            : null,

        whatsappNumber:
          form.applyMethod === "whatsapp"
            ? form.whatsappNumber.trim()
            : null,
      };

      if (editing) {
        await updateJob({
          id,
          ...payload,
        }).unwrap();
      } else {
        await createJob(payload).unwrap();
      }

      navigate("/admin/jobs");
    } catch (error) {
      console.error(error);

      alert(
        error?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (editing && loadingJob) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />

          <p className="text-sm text-slate-500">
            Loading job...
          </p>
        </div>
      </div>
    );
  }

  const busy = creating || updating;

  // ===================================================
  // UI
  // ===================================================

  return (
    <div className="w-full">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="
              mb-3
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-medium
              text-slate-500
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={14} />

            Back to jobs
          </button>

          <div className="flex items-center gap-3">

            <div
              className="
                hidden
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-400
                sm:flex
              "
            >
              <BriefcaseBusiness size={19} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                Admin job manager
              </p>

              <h2 className="mt-0.5 text-2xl font-bold tracking-tight sm:text-3xl">
                {editing
                  ? "Edit job"
                  : "Add external job"}
              </h2>
            </div>

          </div>

        </div>

        {/* STATUS */}

        <div
          className="
            hidden
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.02]
            px-4
            py-2.5
            sm:block
          "
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Status
          </p>

          <p className="mt-0.5 text-xs font-semibold text-emerald-400">
            Ready to publish
          </p>
        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >

        {/* =================================================
            JOB INFORMATION
        ================================================= */}

        <Section
          icon={BriefcaseBusiness}
          title="Job information"
          description="Add the vacancy details candidates need."
        >

          <div className="grid gap-x-6 gap-y-5 lg:grid-cols-2">

            {/* TITLE */}

            <Field
              label="Job title"
              required
              error={errors.title?.message}
            >
              <Input
                placeholder="e.g. Full Stack Developer"
                {...register("title", {
                  required:
                    "Job title is required",
                })}
              />
            </Field>

            {/* CATEGORY */}

            <Field
              label="Job category"
              required
              error={errors.jobCategory?.message}
            >
              <Select
                {...register("jobCategory", {
                  required:
                    "Please select a job category",
                })}
              >
                <option value="">
                  Select job category
                </option>

                {ADMIN_CATEGORIES.map((cat) => (
                  <option
                    key={cat.value}
                    value={cat.value}
                  >
                    {cat.label}
                  </option>
                ))}
              </Select>
            </Field>

            {/* EMPLOYMENT */}

            <Field
              label="Employment type"
              required
            >
              <Select
                {...register(
                  "employmentType"
                )}
              >
                <option value="Full-time">
                  Full-time
                </option>

                <option value="Part-time">
                  Part-time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>
              </Select>
            </Field>

            {/* LOCATION */}

            <Field label="Location">

              <div className="relative">

                <MapPin
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-600
                  "
                />

                <Input
                  placeholder="Delhi / Noida / Remote"
                  className="pl-10"
                  {...register("location")}
                />

              </div>

            </Field>

            {/* SOURCE */}

            <Field label="Job source">

              <Input
                placeholder="LinkedIn / Naukri / Indeed"
                {...register("source")}
              />

            </Field>

            {/* SALARY MIN */}

            <Field label="Minimum salary">

              <Input
                type="number"
                min="0"
                placeholder="15000"
                {...register("salaryMin")}
              />

            </Field>

            {/* SALARY MAX */}

            <Field label="Maximum salary">

              <Input
                type="number"
                min="0"
                placeholder="30000"
                {...register("salaryMax")}
              />

            </Field>

            {/* SKILLS */}

            <Field
              label="Skills"
              className="lg:col-span-2"
            >

              <Input
                placeholder="React, Node.js, MongoDB, Express"
                {...register("skills")}
              />

              <p className="mt-1.5 text-[10px] text-slate-600">
                Separate skills using commas.
              </p>

            </Field>

            {/* DESCRIPTION */}

            <Field
              label="Job description"
              required
              error={errors.description?.message}
              className="lg:col-span-2"
            >

              <textarea
                rows={8}
                placeholder="Write complete job description..."
                className={textareaClass}
                {...register("description", {
                  required:
                    "Job description is required",
                })}
              />

            </Field>

          </div>

        </Section>

        {/* =================================================
            COMPANY
        ================================================= */}

        <Section
          icon={Building2}
          title="Company information"
          description="Information displayed with this vacancy."
        >

          <div className="grid gap-x-6 gap-y-5 lg:grid-cols-3">

            {/* COMPANY */}

            <Field
              label="Company name"
              required
              error={errors.companyName?.message}
            >
              <Input
                placeholder="Company name"
                {...register("companyName", {
                  required:
                    "Company name is required",
                })}
              />
            </Field>

            {/* INDUSTRY */}

            <Field label="Industry">

              <Input
                placeholder="Software / BPO / Healthcare"
                {...register("industry")}
              />

            </Field>

            {/* LOCATION */}

            <Field label="Company location">

              <Input
                placeholder="Noida, Uttar Pradesh"
                {...register(
                  "companyLocation"
                )}
              />

            </Field>

            {/* WEBSITE */}

            <Field label="Company website">

              <div className="relative">

                <Globe
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-600
                  "
                />

                <Input
                  type="url"
                  placeholder="https://company.com"
                  className="pl-10"
                  {...register(
                    "companyWebsite"
                  )}
                />

              </div>

            </Field>

            {/* LOGO */}

            <Field label="Company logo URL">

              <Input
                type="url"
                placeholder="https://..."
                {...register("companyLogo")}
              />

            </Field>

            {/* DESCRIPTION */}

            <Field
              label="Company description"
              className="lg:col-span-3"
            >

              <textarea
                rows={4}
                placeholder="Short description about the company..."
                className={textareaClass}
                {...register(
                  "companyDescription"
                )}
              />

            </Field>

          </div>

        </Section>

        {/* =================================================
            APPLY
        ================================================= */}

        <Section
          icon={Send}
          title="Application"
          description="Choose how candidates should apply."
        >

          {/* METHOD */}

          <div className="grid gap-3 sm:grid-cols-2">

            <ApplyCard
              active={
                applyMethod === "website"
              }
              icon={LinkIcon}
              title="Website"
              description="Candidate opens an external application page"
              onClick={() =>
                setValue(
                  "applyMethod",
                  "website",
                  {
                    shouldDirty: true,
                  }
                )
              }
            />

            <ApplyCard
              active={
                applyMethod === "whatsapp"
              }
              icon={MessageCircle}
              title="WhatsApp"
              description="Candidate contacts recruiter on WhatsApp"
              onClick={() =>
                setValue(
                  "applyMethod",
                  "whatsapp",
                  {
                    shouldDirty: true,
                  }
                )
              }
            />

          </div>

          <input
            type="hidden"
            {...register("applyMethod")}
          />

          {/* WEBSITE */}

          {applyMethod === "website" && (
            <Field
              label="External apply URL"
              required
              error={
                errors.externalApplyUrl?.message
              }
              className="mt-5"
            >

              <Input
                type="url"
                placeholder="https://company.com/careers/job..."
                {...register(
                  "externalApplyUrl",
                  {
                    required:
                      "External apply URL is required",
                  }
                )}
              />

            </Field>
          )}

          {/* WHATSAPP */}

          {applyMethod === "whatsapp" && (
            <Field
              label="WhatsApp number"
              required
              error={
                errors.whatsappNumber?.message
              }
              className="mt-5"
            >

              <Input
                placeholder="+919876543210"
                {...register(
                  "whatsappNumber",
                  {
                    required:
                      "WhatsApp number is required",
                  }
                )}
              />

              <p className="mt-1.5 text-[10px] text-slate-600">
                Include country code, for example +91.
              </p>

            </Field>
          )}

        </Section>

        {/* =================================================
            ACTION BAR
        ================================================= */}

        <div
          className="
            mt-6
            flex
            flex-col-reverse
            gap-3
            border-t
            border-white/[0.06]
            pt-5
            pb-8
            sm:flex-row
            sm:items-center
            sm:justify-end
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate("/admin/jobs")
            }
            className="
              rounded-xl
              border
              border-white/[0.08]
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-400
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={busy}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              px-6
              py-3
              text-sm
              font-bold
              text-black
              transition
              hover:bg-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {busy ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-black/20
                    border-t-black
                  "
                />

                Saving...
              </>
            ) : (
              <>
                <Save size={16} />

                {editing
                  ? "Update job"
                  : "Publish job"}
              </>
            )}

          </button>

        </div>

      </form>
    </div>
  );
}

// =====================================================
// SECTION
// =====================================================

function Section({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section
      className="
        mb-5
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0a0c10]
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-white/[0.06]
          px-4
          py-4
          sm:px-6
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white/[0.04]
            text-slate-400
          "
        >
          <Icon size={17} />
        </div>

        <div className="min-w-0">

          <h3 className="text-sm font-bold text-white">
            {title}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-slate-600">
            {description}
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-4 sm:p-6">
        {children}
      </div>

    </section>
  );
}

// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  required,
  error,
  children,
  className = "",
}) {
  return (
    <label className={`block ${className}`}>

      <span
        className="
          mb-2
          block
          text-[11px]
          font-semibold
          text-slate-400
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </span>

      {children}

      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-red-400">
          {error}
        </p>
      )}

    </label>
  );
}

// =====================================================
// INPUT
// =====================================================

function Input({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={`${inputClass} ${className}`}
    />
  );
}

// =====================================================
// SELECT
// =====================================================

function Select({
  className = "",
  children,
  ...props
}) {
  return (
    <select
      {...props}
      className={`${inputClass} cursor-pointer ${className}`}
    >
      {children}
    </select>
  );
}

// =====================================================
// APPLY CARD
// =====================================================

function ApplyCard({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        border
        p-3.5
        text-left
        transition

        ${
          active
            ? "border-blue-500/30 bg-blue-500/[0.07]"
            : "border-white/[0.07] bg-[#07090d] hover:border-white/[0.12]"
        }
      `}
    >

      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            active
              ? "bg-blue-500/10 text-blue-400"
              : "bg-white/[0.04] text-slate-500"
          }
        `}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">

        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-slate-600">
          {description}
        </p>

      </div>

    </button>
  );
}

// =====================================================
// STYLES
// =====================================================

const inputClass = `
  h-11
  w-full
  rounded-xl
  border
  border-white/[0.08]
  bg-[#07090d]
  px-3.5
  text-sm
  text-white
  outline-none
  transition

  placeholder:text-slate-700

  focus:border-blue-500/40
  focus:bg-[#080b10]
  focus:ring-4
  focus:ring-blue-500/[0.06]
`;

const textareaClass = `
  w-full
  resize-y
  rounded-xl
  border
  border-white/[0.08]
  bg-[#07090d]
  px-3.5
  py-3
  text-sm
  leading-6
  text-white
  outline-none
  transition

  placeholder:text-slate-700

  focus:border-blue-500/40
  focus:bg-[#080b10]
  focus:ring-4
  focus:ring-blue-500/[0.06]
`;