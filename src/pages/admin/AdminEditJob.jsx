import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe,
  Loader2,
  MapPin,
  Save,
  Tag,
  Users,
  X,
  AlertCircle,
  Plus,
  MessageCircle,
  Link as LinkIcon,
  Power,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

// =====================================================
// API BASE URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://job-hunt-backend-sigma.vercel.app";

// =====================================================
// CONSTANTS
// =====================================================

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];

const JOB_TYPES = [
  "internal",
  "external",
];

const APPLY_METHODS = [
  "internal",
  "website",
  "whatsapp",
];

// =====================================================
// COMPONENT
// =====================================================

const AdminEditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ===================================================
  // STATE
  // ===================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [categories, setCategories] = useState([]);

  const [skillInput, setSkillInput] = useState("");

  // ===================================================
  // FORM
  // ===================================================

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "Full-time",

    salaryMin: "",
    salaryMax: "",

    skills: [],
    jobCategory: "",

    companyName: "",
    companyLogo: "",

    jobType: "external",
    uploadedByRole: "admin",

    source: "",

    applyMethod: "website",

    externalApplyUrl: "",

    whatsappNumber: "",
    whatsappMessage: "",

    isActive: true,

    expiresAt: "",
  });

  // ===================================================
  // INPUT HANDLER
  // ===================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===================================================
  // LOAD JOB
  // ===================================================

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/jobs/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load job"
          );
        }

        const job = data?.job || data?.data || data;

        setForm({
          title: job?.title || "",
          description: job?.description || "",
          location: job?.location || "",

          employmentType:
            job?.employmentType || "Full-time",

          salaryMin:
            job?.salaryRange?.min ?? "",

          salaryMax:
            job?.salaryRange?.max ?? "",

          skills: Array.isArray(job?.skills)
            ? job.skills
            : [],

          jobCategory:
            job?.jobCategory || "",

          companyName:
            job?.company?.companyName ||
            job?.company?.name ||
            job?.companyName ||
            "",

          companyLogo:
            job?.companyLogo || "",

          jobType:
            job?.jobType || "external",

          uploadedByRole:
            job?.uploadedByRole || "admin",

          source:
            job?.source || "",

          applyMethod:
            job?.applyMethod || "website",

          externalApplyUrl:
            job?.externalApplyUrl || "",

          whatsappNumber:
            job?.whatsappNumber || "",

          whatsappMessage:
            job?.whatsappMessage || "",

          isActive:
            job?.isActive !== false,

          expiresAt: job?.expiresAt
            ? new Date(job.expiresAt)
                .toISOString()
                .slice(0, 16)
            : "",
        });
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load job details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ===================================================
  // LOAD CATEGORIES
  // ===================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/jobs/categories`
        );

        const data = await response.json();

        const categoryList =
          data?.categories ||
          data?.data ||
          [];

        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
        }
      } catch (err) {
        console.error(
          "Category fetch error:",
          err
        );
      }
    };

    fetchCategories();
  }, []);

  // ===================================================
  // ADD SKILL
  // ===================================================

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const exists = form.skills.some(
      (item) =>
        item.toLowerCase() ===
        skill.toLowerCase()
    );

    if (exists) {
      setSkillInput("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        skill,
      ],
    }));

    setSkillInput("");
  };

  // ===================================================
  // REMOVE SKILL
  // ===================================================

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) =>
          skill !== skillToRemove
      ),
    }));
  };

  // ===================================================
  // SKILL ENTER
  // ===================================================

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // ===================================================
  // UPDATE JOB
  // ===================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------------

    if (!form.title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Job description is required.");
      return;
    }

    if (!form.jobCategory) {
      setError("Please select a job category.");
      return;
    }

    if (!form.location.trim()) {
      setError("Location is required.");
      return;
    }

    try {
      setSaving(true);

      // ---------------------------------------------
      // PAYLOAD
      // ---------------------------------------------

      const payload = {
        title: form.title.trim(),

        description:
          form.description.trim(),

        location:
          form.location.trim(),

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

        skills: form.skills,

        jobCategory:
          form.jobCategory,

        companyName:
          form.companyName.trim(),

        companyLogo:
          form.companyLogo.trim(),

        jobType:
          form.jobType,

        uploadedByRole:
          form.uploadedByRole,

        source:
          form.source.trim() || null,

        applyMethod:
          form.applyMethod,

        externalApplyUrl:
          form.externalApplyUrl.trim() ||
          null,

        whatsappNumber:
          form.whatsappNumber.trim() ||
          null,

        whatsappMessage:
          form.whatsappMessage.trim() ||
          null,

        isActive:
          form.isActive,

        expiresAt:
          form.expiresAt || null,
      };

      // ---------------------------------------------
      // API
      // ---------------------------------------------

      const response = await fetch(
        `${API_URL}/jobs/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update job"
        );
      }

      setSuccess(
        "Job updated successfully."
      );

      // ---------------------------------------------
      // REDIRECT
      // ---------------------------------------------

      setTimeout(() => {
        navigate("/admin/jobs");
      }, 900);
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong while updating the job."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-[#050608]
          text-white
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.03]
            "
          >
            <Loader2
              size={22}
              className="animate-spin text-blue-400"
            />
          </div>

          <p className="text-sm text-slate-500">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#050608]
        px-4
        py-6
        text-white
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-[1200px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <button
              type="button"
              onClick={() =>
                navigate("/admin/jobs")
              }
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-slate-500
                transition
                hover:text-white
              "
            >
              <ArrowLeft size={15} />
              Back to Jobs
            </button>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-500/15
                  bg-blue-500/[0.08]
                  text-blue-400
                "
              >
                <BriefcaseBusiness
                  size={20}
                />
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    sm:text-3xl
                  "
                >
                  Edit Job
                </h1>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Update vacancy information
                  and category.
                </p>
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div
            className={`
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              text-xs
              font-semibold

              ${
                form.isActive
                  ? "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400"
                  : "border-red-500/20 bg-red-500/[0.07] text-red-400"
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${
                  form.isActive
                    ? "bg-emerald-400"
                    : "bg-red-400"
                }
              `}
            />

            {form.isActive
              ? "Active"
              : "Inactive"}
          </div>
        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.06]
              p-4
              text-red-400
            "
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="text-sm font-semibold">
                Update failed
              </p>

              <p className="mt-1 text-xs text-red-400/70">
                {error}
              </p>
            </div>
          </div>
        )}

        {success && (
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-emerald-500/15
              bg-emerald-500/[0.06]
              p-4
              text-emerald-400
            "
          >
            <CheckCircle2 size={18} />

            <p className="text-sm font-semibold">
              {success}
            </p>
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6">
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={<BriefcaseBusiness size={17} />}
                  title="Basic Information"
                  description="Main information about this vacancy."
                />

                <div className="space-y-5">
                  {/* TITLE */}

                  <Input
                    label="Job Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                    required
                  />

                  {/* DESCRIPTION */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-300
                      "
                    >
                      Job Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Write complete job description..."
                      className="
                        w-full
                        resize-y
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-[#07090d]
                        px-4
                        py-3
                        text-sm
                        leading-6
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-700
                        focus:border-blue-500/30
                      "
                      required
                    />
                  </div>

                  {/* LOCATION */}

                  <Input
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Delhi / Noida / Remote"
                    icon={<MapPin size={15} />}
                    required
                  />

                  {/* EMPLOYMENT */}

                  <Select
                    label="Employment Type"
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    options={EMPLOYMENT_TYPES}
                  />
                </div>
              </section>

              {/* =================================================
                  CATEGORY + SKILLS
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={<Tag size={17} />}
                  title="Category & Skills"
                  description="Classify this job correctly so candidates can find it."
                />

                <div className="space-y-5">
                  {/* CATEGORY */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-300
                      "
                    >
                      Job Category
                      <span className="ml-1 text-red-400">
                        *
                      </span>
                    </label>

                    <select
                      name="jobCategory"
                      value={form.jobCategory}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-[#07090d]
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        focus:border-blue-500/30
                      "
                      required
                    >
                      <option
                        value=""
                        className="bg-[#07090d]"
                      >
                        Select job category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#07090d]"
                          >
                            {category}
                          </option>
                        )
                      )}
                    </select>

                    <p
                      className="
                        mt-2
                        text-[11px]
                        text-slate-600
                      "
                    >
                      Select the actual field of
                      the vacancy, not just the
                      job title.
                    </p>
                  </div>

                  {/* SKILLS */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-300
                      "
                    >
                      Skills
                    </label>

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >
                      <input
                        value={skillInput}
                        onChange={(e) =>
                          setSkillInput(
                            e.target.value
                          )
                        }
                        onKeyDown={
                          handleSkillKeyDown
                        }
                        placeholder="React, Node.js, MongoDB..."
                        className="
                          min-w-0
                          flex-1
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-[#07090d]
                          px-4
                          py-3
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-slate-700
                          focus:border-blue-500/30
                        "
                      />

                      <button
                        type="button"
                        onClick={addSkill}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-white/[0.04]
                          px-4
                          text-slate-300
                          transition
                          hover:bg-white/[0.08]
                          hover:text-white
                        "
                      >
                        <Plus size={17} />
                      </button>
                    </div>

                    {/* SKILL TAGS */}

                    {form.skills.length > 0 && (
                      <div
                        className="
                          mt-3
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {form.skills.map(
                          (skill) => (
                            <span
                              key={skill}
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-blue-500/15
                                bg-blue-500/[0.06]
                                px-3
                                py-1.5
                                text-[11px]
                                font-semibold
                                text-blue-400
                              "
                            >
                              {skill}

                              <button
                                type="button"
                                onClick={() =>
                                  removeSkill(
                                    skill
                                  )
                                }
                                className="
                                  text-blue-400/50
                                  transition
                                  hover:text-red-400
                                "
                              >
                                <X size={12} />
                              </button>
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* =================================================
                  SALARY
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={<Globe size={17} />}
                  title="Salary"
                  description="Set the salary range if available."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Minimum Salary"
                    name="salaryMin"
                    type="number"
                    value={form.salaryMin}
                    onChange={handleChange}
                    placeholder="15000"
                  />

                  <Input
                    label="Maximum Salary"
                    name="salaryMax"
                    type="number"
                    value={form.salaryMax}
                    onChange={handleChange}
                    placeholder="30000"
                  />
                </div>
              </section>

              {/* =================================================
                  APPLY DETAILS
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={<LinkIcon size={17} />}
                  title="Application Details"
                  description="Control where candidates should apply."
                />

                <div className="space-y-5">
                  {/* JOB TYPE */}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Job Type"
                      name="jobType"
                      value={form.jobType}
                      onChange={handleChange}
                      options={JOB_TYPES}
                    />

                    <Select
                      label="Apply Method"
                      name="applyMethod"
                      value={form.applyMethod}
                      onChange={handleChange}
                      options={APPLY_METHODS}
                    />
                  </div>

                  {/* EXTERNAL URL */}

                  {form.applyMethod ===
                    "website" && (
                    <Input
                      label="External Apply URL"
                      name="externalApplyUrl"
                      value={
                        form.externalApplyUrl
                      }
                      onChange={handleChange}
                      placeholder="https://company.com/careers/apply"
                      icon={
                        <LinkIcon size={15} />
                      }
                    />
                  )}

                  {/* WHATSAPP */}

                  {form.applyMethod ===
                    "whatsapp" && (
                    <div className="space-y-4">
                      <Input
                        label="WhatsApp Number"
                        name="whatsappNumber"
                        value={
                          form.whatsappNumber
                        }
                        onChange={handleChange}
                        placeholder="9876543210"
                        icon={
                          <MessageCircle
                            size={15}
                          />
                        }
                      />

                      <div>
                        <label
                          className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            text-slate-300
                          "
                        >
                          WhatsApp Message
                        </label>

                        <textarea
                          name="whatsappMessage"
                          value={
                            form.whatsappMessage
                          }
                          onChange={
                            handleChange
                          }
                          rows={4}
                          placeholder="Hi, I am interested in this position..."
                          className="
                            w-full
                            resize-y
                            rounded-xl
                            border
                            border-white/[0.07]
                            bg-[#07090d]
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-slate-700
                            focus:border-blue-500/30
                          "
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-6">
              {/* =================================================
                  COMPANY
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                "
              >
                <SectionHeader
                  icon={<Building2 size={17} />}
                  title="Company"
                  description="Company information."
                />

                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                  />

                  <Input
                    label="Company Logo URL"
                    name="companyLogo"
                    value={form.companyLogo}
                    onChange={handleChange}
                    placeholder="https://..."
                  />

                  <Input
                    label="Source"
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    placeholder="LinkedIn / Naukri / Indeed"
                  />
                </div>
              </section>

              {/* =================================================
                  STATUS
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                "
              >
                <SectionHeader
                  icon={<Power size={17} />}
                  title="Job Status"
                  description="Control job visibility."
                />

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      isActive:
                        !prev.isActive,
                    }))
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    p-4
                    transition

                    ${
                      form.isActive
                        ? "border-emerald-500/15 bg-emerald-500/[0.05]"
                        : "border-red-500/15 bg-red-500/[0.05]"
                    }
                  `}
                >
                  <div className="text-left">
                    <p
                      className={`
                        text-sm
                        font-semibold
                        ${
                          form.isActive
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      `}
                    >
                      {form.isActive
                        ? "Active"
                        : "Inactive"}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {form.isActive
                        ? "Visible to candidates"
                        : "Hidden from candidates"}
                    </p>
                  </div>

                  <span
                    className={`
                      relative
                      h-6
                      w-11
                      rounded-full
                      ${
                        form.isActive
                          ? "bg-emerald-500"
                          : "bg-white/[0.12]"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-1
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        transition
                        ${
                          form.isActive
                            ? "translate-x-6"
                            : "translate-x-1"
                        }
                      `}
                    />
                  </span>
                </button>
              </section>

              {/* =================================================
                  EXPIRY
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-[#0a0c10]
                  p-5
                "
              >
                <SectionHeader
                  icon={<Users size={17} />}
                  title="Expiry"
                  description="Set when this vacancy expires."
                />

                <Input
                  label="Expiry Date"
                  name="expiresAt"
                  type="datetime-local"
                  value={form.expiresAt}
                  onChange={handleChange}
                />
              </section>

              {/* =================================================
                  UPDATE BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={saving}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-black
                  shadow-[0_15px_40px_rgba(255,255,255,.06)]
                  transition
                  hover:bg-slate-200
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    Update Job
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/jobs")
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.02]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-500
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                Cancel
              </button>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
};

// =====================================================
// SECTION HEADER
// =====================================================

const SectionHeader = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        mb-6
        flex
        items-start
        gap-3
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-500/[0.08]
          text-blue-400
        "
      >
        {icon}
      </div>

      <div>
        <h2
          className="
            text-sm
            font-bold
            text-white
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-[11px]
            leading-5
            text-slate-600
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};

// =====================================================
// INPUT
// =====================================================

const Input = ({
  label,
  icon,
  required,
  ...props
}) => {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-xs
          font-semibold
          text-slate-300
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-600
            "
          >
            {icon}
          </span>
        )}

        <input
          {...props}
          required={required}
          className={`
            w-full
            rounded-xl
            border
            border-white/[0.07]
            bg-[#07090d]
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-slate-700
            focus:border-blue-500/30

            ${
              icon
                ? "pl-9"
                : ""
            }
          `}
        />
      </div>
    </div>
  );
};

// =====================================================
// SELECT
// =====================================================

const Select = ({
  label,
  options,
  ...props
}) => {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-xs
          font-semibold
          text-slate-300
        "
      >
        {label}
      </label>

      <select
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-white/[0.07]
          bg-[#07090d]
          px-4
          py-3
          text-sm
          text-white
          outline-none
          focus:border-blue-500/30
        "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#07090d]"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminEditJob;