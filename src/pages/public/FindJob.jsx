import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  MapPin,
  SlidersHorizontal,
  BriefcaseBusiness,
  X,
  RotateCcw,
  ServerOff,
  ArrowDownUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import {
  useSavedJobMutation,
  useGetSavedJobsQuery,
} from "../../RTK/savedJobsApi";

import { useGetAllforJobsQuery } from "../../RTK/HrService";

import { staticJobs } from "../../Data/staticJobs";

import NotificationToasty from "../../components/common/NotificationToasty";
import ApplyJobForm from "../../components/forms/hr/ApplyJobForm";
import JobCard from "../../components/jobs/JobCard";
import Seo from "../../components/common/Seo";
import AdSlot from "../../components/common/AdSlot";

const JOB_CATEGORIES = [
  { value: "IT & Software", label: "IT & Software" },
  { value: "Sales & Business Development", label: "Sales & Business" },
  { value: "Marketing", label: "Marketing" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Finance & Accounting", label: "Finance & Accounting" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Operations", label: "Operations" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Design", label: "Design" },
  { value: "Content & Writing", label: "Content & Writing" },
  { value: "BPO", label: "BPO" },
  { value: "Legal", label: "Legal" },
  { value: "Engineering", label: "Engineering" },
  { value: "Others", label: "Others" },
];

const POPULAR_CATEGORIES = [
  "IT & Software",
  "Sales & Business Development",
  "Marketing",
  "Human Resources",
  "Customer Support",
];

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

const FindJob = () => {
  // =========================================================
  // SEARCH / FILTER STATE
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");

  // =========================================================
  // VIEW
  // =========================================================

  const [cardsPerRow, setCardsPerRow] = useState(3);
  const [sortBy, setSortBy] = useState("latest");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // =========================================================
  // MOBILE FILTER
  // =========================================================

  const [showFilters, setShowFilters] = useState(false);

  // =========================================================
  // APPLY
  // =========================================================

  const [isApply, setIsApply] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // =========================================================
  // TOAST
  // =========================================================

  const [message, setMessage] = useState("");

  // =========================================================
  // SAVING
  // =========================================================

  const [savingJobId, setSavingJobId] = useState(null);

  // =========================================================
  // URL SEARCH
  // =========================================================

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");
    const urlLocation = searchParams.get("location");

    if (urlSearch) {
      setSearchTerm(urlSearch);
    }

    if (urlCategory) {
      setCategory(urlCategory);
    }

    if (urlLocation) {
      setLocation(urlLocation);
    }
  }, [searchParams]);

  // =========================================================
  // SAVED JOB API
  // =========================================================

  const [savedJob] = useSavedJobMutation();

  const { data: savedData } = useGetSavedJobsQuery();

  // =========================================================
  // JOB API
  // =========================================================

  const {
    data: allJob,
    isLoading,
    isError,
  } = useGetAllforJobsQuery();

  // =========================================================
  // BACKEND JOBS
  // =========================================================

  const backendJobs = useMemo(() => {
    if (Array.isArray(allJob)) {
      return allJob;
    }

    if (Array.isArray(allJob?.jobs)) {
      return allJob.jobs;
    }

    if (Array.isArray(allJob?.data)) {
      return allJob.data;
    }

    return [];
  }, [allJob]);

  // =========================================================
  // SAVED IDS
  // =========================================================

  const savedJobIds = useMemo(() => {
    if (Array.isArray(savedData)) {
      return savedData
        .map((job) => job?._id)
        .filter(Boolean);
    }

    if (Array.isArray(savedData?.savedJobs)) {
      return savedData.savedJobs
        .map((job) => job?._id)
        .filter(Boolean);
    }

    if (Array.isArray(savedData?.data)) {
      return savedData.data
        .map((job) => job?._id)
        .filter(Boolean);
    }

    return [];
  }, [savedData]);

  // =========================================================
  // HELPERS
  // =========================================================

  const getCompanyName = (job) => {
    return (
      job?.company?.companyName ||
      job?.company?.name ||
      job?.companyName ||
      "Company"
    );
  };

  const getCategory = (job) => {
    return (
      job?.jobCategory ||
      job?.category ||
      ""
    );
  };

  const isRemoteJob = (job) => {
    const jobLocation =
      job?.location?.toLowerCase().trim() || "";

    return (
      jobLocation.includes("remote") ||
      jobLocation.includes("work from home") ||
      jobLocation.includes("wfh")
    );
  };

  const getSalaryValue = (job) => {
    const min = Number(job?.salaryRange?.min);
    const max = Number(job?.salaryRange?.max);

    if (!Number.isNaN(max) && max > 0) {
      return max;
    }

    if (!Number.isNaN(min) && min > 0) {
      return min;
    }

    return 0;
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filterJob = (job) => {
    const search = searchTerm.toLowerCase().trim();
    const selectedLocation = location.toLowerCase().trim();
    const selectedSkill = skills.toLowerCase().trim();
    const selectedCategory = category.toLowerCase().trim();

    const companyName = getCompanyName(job);

    const title =
      job?.title?.toLowerCase() || "";

    const description =
      job?.description?.toLowerCase() || "";

    const jobCategory =
      getCategory(job).toLowerCase();

    const company =
      companyName.toLowerCase();

    const matchesSearch =
      !search ||
      title.includes(search) ||
      description.includes(search) ||
      company.includes(search) ||
      jobCategory.includes(search) ||
      job?.skills?.some((skill) =>
        String(skill)
          .toLowerCase()
          .includes(search)
      );

    const matchesLocation =
      !selectedLocation ||
      job?.location
        ?.toLowerCase()
        .includes(selectedLocation);

    const matchesEmployment =
      !employmentType ||
      job?.employmentType === employmentType;

    const matchesSkill =
      !selectedSkill ||
      job?.skills?.some((skill) =>
        String(skill)
          .toLowerCase()
          .includes(selectedSkill)
      );

    const matchesRemote =
      !remoteOnly ||
      isRemoteJob(job);

    const matchesCategory =
      !selectedCategory ||
      jobCategory.includes(selectedCategory);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesEmployment &&
      matchesSkill &&
      matchesRemote &&
      matchesCategory
    );
  };

  // =========================================================
  // SORT
  // =========================================================

  const sortJobs = (jobs) => {
    return [...jobs].sort((a, b) => {
      if (sortBy === "salaryHigh") {
        return (
          getSalaryValue(b) -
          getSalaryValue(a)
        );
      }

      if (sortBy === "salaryLow") {
        return (
          getSalaryValue(a) -
          getSalaryValue(b)
        );
      }

      return (
        new Date(b?.createdAt || 0) -
        new Date(a?.createdAt || 0)
      );
    });
  };

  // =========================================================
  // BACKEND FILTERED
  // =========================================================

  const filteredBackendJobs = useMemo(() => {
    return sortJobs(
      backendJobs.filter(filterJob)
    );
  }, [
    backendJobs,
    searchTerm,
    location,
    employmentType,
    skills,
    category,
    remoteOnly,
    sortBy,
  ]);

  // =========================================================
  // STATIC FILTERED
  // =========================================================

  const filteredStaticJobs = useMemo(() => {
    return sortJobs(
      staticJobs.filter(filterJob)
    );
  }, [
    searchTerm,
    location,
    employmentType,
    skills,
    category,
    remoteOnly,
    sortBy,
  ]);

  // =========================================================
  // FINAL JOB DATA
  // =========================================================

  const jobsData = isError
    ? filteredStaticJobs
    : filteredBackendJobs;

  // =========================================================
  // ACTIVE FILTERS
  // =========================================================

  const activeFilters = useMemo(() => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push({
        key: "search",
        label: searchTerm.trim(),
      });
    }

    if (location.trim()) {
      filters.push({
        key: "location",
        label: location.trim(),
      });
    }

    if (category) {
      filters.push({
        key: "category",
        label: category,
      });
    }

    if (employmentType) {
      filters.push({
        key: "employment",
        label: employmentType,
      });
    }

    if (skills.trim()) {
      filters.push({
        key: "skills",
        label: skills.trim(),
      });
    }

    if (remoteOnly) {
      filters.push({
        key: "remote",
        label: "Remote only",
      });
    }

    return filters;
  }, [
    searchTerm,
    location,
    category,
    employmentType,
    skills,
    remoteOnly,
  ]);

  // =========================================================
  // REMOVE FILTER
  // =========================================================

  const removeFilter = (key) => {
    if (key === "search") {
      setSearchTerm("");
    }

    if (key === "location") {
      setLocation("");
    }

    if (key === "category") {
      setCategory("");
    }

    if (key === "employment") {
      setEmploymentType("");
    }

    if (key === "skills") {
      setSkills("");
    }

    if (key === "remote") {
      setRemoteOnly(false);
    }
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setCategory("");
    setEmploymentType("");
    setSkills("");
    setRemoteOnly(false);
    setSortBy("latest");
  };

  // =========================================================
  // SAVE JOB
  // =========================================================

  const handleSaveJob = async (id) => {
    if (!id) return;

    try {
      setSavingJobId(id);
      setMessage("Saving job...");

      await savedJob(id).unwrap();

      setMessage("Job saved successfully");
    } catch (error) {
      setMessage(
        error?.data?.message ||
          "Please login to save this job"
      );
    } finally {
      setSavingJobId(null);
    }
  };

  // =========================================================
  // TOAST
  // =========================================================

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [message]);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    document
      .getElementById("job-scroll-area")
      ?.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // POPULAR CATEGORY
  // =========================================================

  const handlePopularCategory = (value) => {
    if (value === "Remote") {
      setCategory("");
      setRemoteOnly(true);
    } else {
      setCategory(value);
      setRemoteOnly(false);
    }

    setShowFilters(false);

    setTimeout(() => {
      handleSearch();
    }, 0);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#050608]
        text-white
        selection:bg-blue-500/30
      "
    >
      <Seo
        title="Find Jobs"
        description="Find your next opportunity with JoblessJob. Search jobs by title, skill, location, category and employment type."
        path="/find-job"
      />

      {/* =====================================================
          TOAST
      ===================================================== */}

      {message && (
        <NotificationToasty message={message} />
      )}

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/[0.06]
          bg-[#050608]
        "
      >
        {/* GLOWS */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-180px]
            h-[420px]
            w-[720px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/[0.09]
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-120px]
            top-[120px]
            h-[280px]
            w-[280px]
            rounded-full
            bg-indigo-500/[0.06]
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[-120px]
            bottom-[-160px]
            h-[280px]
            w-[280px]
            rounded-full
            bg-purple-500/[0.04]
            blur-[110px]
          "
        />

        {/* GRID */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1200px]
            px-4
            pb-10
            pt-10
            sm:px-6
            sm:pb-12
            sm:pt-14
            lg:px-8
            lg:pb-14
            lg:pt-16
          "
        >
          {/* BADGE */}

          <div
            className="
              mb-5
              flex
              justify-center
              animate-[fadeUp_.5s_ease-out]
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/10
                bg-emerald-400/[0.05]
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-emerald-400
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,.8)]
                "
              />

              Fresh opportunities
            </div>
          </div>

          {/* HEADING */}

          <div
            className="
              mx-auto
              max-w-4xl
              text-center
              animate-[fadeUp_.6s_ease-out]
            "
          >
            <h1
              className="
                text-[2.4rem]
                font-bold
                leading-[1.03]
                tracking-[-0.055em]
                text-white
                sm:text-5xl
                lg:text-[4.25rem]
              "
            >
              Stop scrolling.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-indigo-400
                  to-purple-400
                  bg-clip-text
                  text-transparent
                "
              >
                Start finding.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                px-2
                text-sm
                leading-6
                text-slate-500
                sm:mt-5
                sm:text-base
                sm:leading-7
              "
            >
              Search jobs, discover companies and
              find an opportunity that actually fits
              what you're looking for.
            </p>
          </div>

          {/* =================================================
              SEARCH BOX
          ================================================= */}

          <div
            className="
              mx-auto
              mt-8
              max-w-5xl
              animate-[fadeUp_.7s_ease-out]
              sm:mt-9
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-white/[0.09]
                bg-[#0b0e13]
                p-1.5
                shadow-[0_25px_80px_rgba(0,0,0,.4)]
                transition-all
                duration-300
                focus-within:border-white/[0.14]
                focus-within:shadow-[0_25px_90px_rgba(37,99,235,.10)]
                sm:p-2
              "
            >
              {/* MAIN SEARCH */}

              <div
                className="
                  grid
                  gap-1.5
                  lg:grid-cols-[1.15fr_0.8fr]
                "
              >
                {/* JOB */}

                <div
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#07090d]
                    px-3.5
                    py-3.5
                    transition
                    focus-within:bg-[#090c12]
                    sm:px-4
                  "
                >
                  <Search
                    size={19}
                    className="
                      shrink-0
                      text-slate-600
                      transition
                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Job title, skill or company"
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                    "
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="
                        shrink-0
                        rounded-lg
                        p-1
                        text-slate-600
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* LOCATION */}

                <div
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#07090d]
                    px-3.5
                    py-3.5
                    transition
                    focus-within:bg-[#090c12]
                    sm:px-4
                  "
                >
                  <MapPin
                    size={18}
                    className="
                      shrink-0
                      text-slate-600
                      transition
                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Location or remote"
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-slate-600
                    "
                  />

                  {location && (
                    <button
                      type="button"
                      onClick={() => setLocation("")}
                      className="
                        shrink-0
                        rounded-lg
                        p-1
                        text-slate-600
                        hover:bg-white/[0.06]
                        hover:text-white
                      "
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* CATEGORY + SEARCH */}

              <div
                className="
                  mt-1.5
                  grid
                  gap-1.5
                  sm:grid-cols-[1fr_auto]
                "
              >
                {/* CATEGORY */}

                <div
                  className="
                    group
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#07090d]
                    px-3.5
                    py-3.5
                    sm:px-4
                  "
                >
                  <BriefcaseBusiness
                    size={18}
                    className="
                      shrink-0
                      text-slate-600
                      transition
                      group-focus-within:text-blue-400
                    "
                  />

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="
                      w-full
                      min-w-0
                      cursor-pointer
                      appearance-none
                      bg-transparent
                      text-sm
                      outline-none
                      text-slate-400
                    "
                  >
                    <option
                      value=""
                      className="bg-[#0b0e13]"
                    >
                      All job categories
                    </option>

                    {JOB_CATEGORIES.map((cat) => (
                      <option
                        key={cat.value}
                        value={cat.value}
                        className="bg-[#0b0e13]"
                      >
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="
                      shrink-0
                      text-slate-600
                    "
                  />
                </div>

                {/* SEARCH BUTTON */}

                <button
                  type="button"
                  onClick={handleSearch}
                  className="
                    group
                    inline-flex
                    min-h-[50px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-7
                    text-sm
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-slate-100
                    hover:shadow-[0_12px_35px_rgba(255,255,255,.12)]
                    active:scale-[.98]
                    sm:min-w-[135px]
                  "
                >
                  Search jobs

                  <Search
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              </div>

              {/* POPULAR */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  overflow-x-auto
                  px-1
                  pb-0.5
                  scrollbar-none
                "
              >
                <span
                  className="
                    shrink-0
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-700
                  "
                >
                  Popular
                </span>

                {POPULAR_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      handlePopularCategory(item)
                    }
                    className={`
                      shrink-0
                      rounded-lg
                      border
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-medium
                      transition

                      ${
                        category === item
                          ? "border-blue-500/20 bg-blue-500/[0.08] text-blue-400"
                          : "border-white/[0.06] bg-white/[0.02] text-slate-600 hover:border-blue-500/20 hover:bg-blue-500/[0.06] hover:text-blue-400"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TRUST */}

          <div
            className="
              mx-auto
              mt-7
              flex
              max-w-3xl
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
              text-[10px]
              text-slate-600
            "
          >
            <div className="flex items-center gap-1.5">
              <BriefcaseBusiness
                size={13}
                className="text-slate-700"
              />
              Fresh opportunities
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-slate-800 sm:block" />

            <div className="flex items-center gap-1.5">
              <MapPin
                size={13}
                className="text-slate-700"
              />
              Remote & on-site
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-slate-800 sm:block" />

            <div className="flex items-center gap-1.5">
              <Sparkles
                size={13}
                className="text-slate-700"
              />
              Multiple job categories
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOP AD
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <AdSlot
          slot="YOUR_AD_SLOT_ID"
          format="auto"
          className="my-5 min-h-[80px]"
        />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1400px]
          px-4
          pb-10
          sm:px-6
          lg:px-8
        "
      >
        {/* SERVER ERROR */}

        {isError && (
          <div
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-amber-500/15
              bg-amber-500/[0.06]
              px-4
              py-3
              text-amber-400
            "
          >
            <ServerOff
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                Server is currently unavailable
              </p>

              <p className="mt-0.5 text-xs text-amber-400/60">
                Showing sample opportunities for now.
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            MOBILE FILTER BUTTON
        ================================================= */}

        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() =>
              setShowFilters(!showFilters)
            }
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-[#0d1016]
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-300
              transition
              hover:border-white/[0.14]
              hover:text-white
            "
          >
            <SlidersHorizontal size={17} />

            Filters

            {activeFilters.length > 0 && (
              <span
                className="
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  px-1.5
                  text-[10px]
                  text-white
                "
              >
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            items-start
            gap-6
            lg:grid-cols-[250px_minmax(0,1fr)]
            xl:gap-7
          "
        >
          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <aside
            className={`
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0a0c10]
              shadow-[0_20px_60px_rgba(0,0,0,.18)]

              lg:sticky
              lg:top-5
              lg:self-start

              ${
                showFilters
                  ? "block"
                  : "hidden lg:block"
              }
            `}
          >
            {/* SIDEBAR HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.07]
                px-4
                py-4
                sm:px-5
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-blue-500/10
                    bg-blue-500/[0.08]
                    text-blue-400
                  "
                >
                  <SlidersHorizontal size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    Filters
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-600">
                    Refine your search
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    rounded-lg
                    px-2
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-slate-600
                    hover:bg-white/[0.04]
                    hover:text-white
                  "
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(false)
                  }
                  className="
                    rounded-lg
                    p-1.5
                    text-slate-600
                    hover:bg-white/[0.05]
                    hover:text-white
                    lg:hidden
                  "
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {/* ACTIVE COUNT */}

              {activeFilters.length > 0 && (
                <div
                  className="
                    mb-5
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-blue-500/10
                    bg-blue-500/[0.05]
                    px-3
                    py-2.5
                  "
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="
                        flex
                        h-5
                        min-w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-500
                        px-1.5
                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      {activeFilters.length}
                    </span>

                    <span className="text-[10px] font-semibold text-blue-400">
                      Active filters
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      text-[10px]
                      font-medium
                      text-blue-400/60
                      hover:text-blue-400
                    "
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* CATEGORY */}

              <FilterSection title="Category">
                <div className="relative">
                  <BriefcaseBusiness
                    size={14}
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-600
                    "
                  />

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-[#07090d]
                      px-9
                      py-2.5
                      pr-9
                      text-xs
                      text-slate-400
                      outline-none
                      focus:border-blue-500/30
                    "
                  >
                    <option
                      value=""
                      className="bg-[#07090d]"
                    >
                      All categories
                    </option>

                    {JOB_CATEGORIES.map((cat) => (
                      <option
                        key={cat.value}
                        value={cat.value}
                        className="bg-[#07090d]"
                      >
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={13}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-600
                    "
                  />
                </div>
              </FilterSection>

              {/* LOCATION */}

              <FilterSection title="Location">
                <div
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-[#07090d]
                    px-3
                    py-2.5
                    focus-within:border-blue-500/30
                  "
                >
                  <MapPin
                    size={14}
                    className="
                      shrink-0
                      text-slate-600
                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Delhi, Noida, Remote..."
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      text-xs
                      text-white
                      outline-none
                      placeholder:text-slate-700
                    "
                  />

                  {location && (
                    <button
                      type="button"
                      onClick={() => setLocation("")}
                      className="shrink-0 text-slate-600 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </FilterSection>

              {/* EMPLOYMENT */}

              <FilterSection title="Employment type">
                <div className="space-y-1.5">
                  {EMPLOYMENT_TYPES.map((type) => {
                    const active =
                      employmentType === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setEmploymentType(
                            active ? "" : type
                          )
                        }
                        className={`
                          group
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-xl
                          border
                          px-3
                          py-2.5
                          text-left
                          transition

                          ${
                            active
                              ? "border-blue-500/20 bg-blue-500/[0.08] text-blue-400"
                              : "border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.03] hover:text-slate-200"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2.5 text-xs font-medium">
                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full

                              ${
                                active
                                  ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,.7)]"
                                  : "bg-slate-700"
                              }
                            `}
                          />

                          {type}
                        </span>

                        <span
                          className={`
                            flex
                            h-4
                            w-4
                            items-center
                            justify-center
                            rounded-full
                            border

                            ${
                              active
                                ? "border-blue-400 bg-blue-500"
                                : "border-white/[0.12]"
                            }
                          `}
                        >
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              {/* REMOTE */}

              <div
                className="
                  mb-6
                  border-b
                  border-white/[0.07]
                  pb-6
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl

                        ${
                          remoteOnly
                            ? "bg-emerald-500/[0.10] text-emerald-400"
                            : "bg-white/[0.03] text-slate-600"
                        }
                      `}
                    >
                      <Sparkles size={15} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-slate-200">
                        Remote only
                      </h3>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        Work from anywhere
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={remoteOnly}
                    onClick={() =>
                      setRemoteOnly(!remoteOnly)
                    }
                    className={`
                      relative
                      h-6
                      w-11
                      shrink-0
                      rounded-full
                      transition-colors

                      ${
                        remoteOnly
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
                        shadow
                        transition-transform

                        ${
                          remoteOnly
                            ? "translate-x-6"
                            : "translate-x-1"
                        }
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* SKILLS */}

              <FilterSection title="Skills">
                <div
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-[#07090d]
                    px-3
                    py-2.5
                    focus-within:border-blue-500/30
                  "
                >
                  <Search
                    size={14}
                    className="
                      shrink-0
                      text-slate-600
                      group-focus-within:text-blue-400
                    "
                  />

                  <input
                    type="text"
                    value={skills}
                    onChange={(e) =>
                      setSkills(e.target.value)
                    }
                    placeholder="React, Node, MongoDB..."
                    className="
                      min-w-0
                      w-full
                      bg-transparent
                      text-xs
                      text-white
                      outline-none
                      placeholder:text-slate-700
                    "
                  />

                  {skills && (
                    <button
                      type="button"
                      onClick={() => setSkills("")}
                      className="shrink-0 text-slate-600 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    "React",
                    "Node.js",
                    "JavaScript",
                    "MERN",
                  ].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setSkills(skill)}
                      className="
                        rounded-lg
                        border
                        border-white/[0.06]
                        bg-white/[0.02]
                        px-2
                        py-1.5
                        text-[9px]
                        font-medium
                        text-slate-600
                        transition
                        hover:border-blue-500/20
                        hover:bg-blue-500/[0.06]
                        hover:text-blue-400
                      "
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="min-w-0">
            {/* RESULTS HEADER */}

            <div
              className="
                relative
                z-20
                mb-4
                bg-[#050608]
                py-2

                lg:sticky
                lg:top-0
                lg:bg-[#050608]/95
                lg:backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* COUNT */}

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      Opportunities
                    </span>
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      tracking-[-0.04em]
                    "
                  >
                    {jobsData.length}

                    <span className="ml-2 font-medium text-slate-600">
                      jobs found
                    </span>
                  </h2>
                </div>

                {/* CONTROLS */}

                <div className="flex flex-wrap items-center gap-2">
                  {/* VIEW */}

                  <div
                    className="
                      hidden
                      items-center
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#0b0d12]
                      p-1
                      lg:flex
                    "
                  >
                    <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                      View
                    </span>

                    {[2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setCardsPerRow(count)
                        }
                        className={`
                          min-w-9
                          rounded-lg
                          px-2.5
                          py-1.5
                          text-xs
                          font-bold

                          ${
                            cardsPerRow === count
                              ? "bg-white text-black shadow"
                              : "text-slate-600 hover:text-white"
                          }
                        `}
                      >
                        {count}
                      </button>
                    ))}
                  </div>

                  {/* SORT */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#0b0d12]
                      px-3
                      py-2
                    "
                  >
                    <ArrowDownUp
                      size={14}
                      className="text-slate-600"
                    />

                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value)
                      }
                      className="
                        cursor-pointer
                        appearance-none
                        bg-transparent
                        text-xs
                        font-semibold
                        text-slate-400
                        outline-none
                      "
                    >
                      <option
                        value="latest"
                        className="bg-[#0b0d12]"
                      >
                        Latest
                      </option>

                      <option
                        value="salaryHigh"
                        className="bg-[#0b0d12]"
                      >
                        Salary: High
                      </option>

                      <option
                        value="salaryLow"
                        className="bg-[#0b0d12]"
                      >
                        Salary: Low
                      </option>
                    </select>

                    <ChevronDown
                      size={13}
                      className="text-slate-600"
                    />
                  </div>

                  {/* RESET */}

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#0b0d12]
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-slate-500
                      hover:border-white/[0.14]
                      hover:text-white
                    "
                  >
                    <RotateCcw size={13} />

                    <span className="hidden sm:block">
                      Reset
                    </span>
                  </button>
                </div>
              </div>

              {/* ACTIVE FILTERS */}

              {activeFilters.length > 0 && (
                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  {activeFilters.map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() =>
                        removeFilter(filter.key)
                      }
                      className="
                        inline-flex
                        max-w-full
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-blue-500/15
                        bg-blue-500/[0.06]
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-blue-400
                      "
                    >
                      <span className="truncate">
                        {filter.label}
                      </span>

                      <X
                        size={11}
                        className="shrink-0"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                JOB AREA
            ================================================= */}

            <div
              id="job-scroll-area"
              className="
                lg:max-h-[calc(100vh-175px)]
                lg:overflow-y-auto
                lg:overscroll-contain
                lg:pr-3
              "
            >
              {/* LOADING */}

              {isLoading ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-[repeat(var(--job-columns),minmax(0,1fr))]
                  "
                  style={{
                    "--job-columns": cardsPerRow,
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map(
                    (item) => (
                      <div
                        key={item}
                        className="
                          h-[360px]
                          animate-pulse
                          rounded-2xl
                          border
                          border-white/[0.04]
                          bg-[#0b0d12]
                        "
                      />
                    )
                  )}
                </div>
              ) : jobsData.length === 0 ? (
                /* EMPTY */

                <div
                  className="
                    flex
                    min-h-[420px]
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-white/[0.09]
                    bg-[#0a0c10]
                    px-6
                    text-center
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-white/[0.03]
                    "
                  >
                    <BriefcaseBusiness
                      size={28}
                      className="text-slate-600"
                    />
                  </div>

                  <h3 className="text-xl font-bold">
                    No jobs found
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    We couldn't find jobs matching
                    your current filters. Try
                    broadening your search.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-5
                      py-2.5
                      text-sm
                      font-bold
                      text-black
                      hover:bg-slate-200
                    "
                  >
                    <RotateCcw size={15} />

                    Clear filters
                  </button>
                </div>
              ) : (
                /* JOB GRID */

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    pb-8
                    sm:gap-5
                    sm:grid-cols-2
                    lg:grid-cols-[repeat(var(--job-columns),minmax(0,1fr))]
                  "
                  style={{
                    "--job-columns": cardsPerRow,
                  }}
                >
                  {jobsData.map(
                    (job, index) => (
                      <React.Fragment
                        key={
                          job?._id ||
                          `${job?.title}-${index}`
                        }
                      >
                        {/* JOB CARD */}

                        <div
                          className="
                            min-w-0
                            animate-[jobCardIn_.45s_ease_both]
                          "
                          style={{
                            animationDelay: `${Math.min(
                              index * 45,
                              350
                            )}ms`,
                          }}
                        >
                          <JobCard
                            job={job}
                            isSaved={savedJobIds.includes(
                              job?._id
                            )}
                            onSave={handleSaveJob}
                            onApply={(selectedJob) => {
                              if (
                                selectedJob?.jobType ===
                                  "internal" ||
                                !selectedJob?.jobType
                              ) {
                                setSelectedJobId(
                                  selectedJob?._id
                                );

                                setIsApply(true);
                              }
                            }}
                            isSaving={
                              savingJobId ===
                              job?._id
                            }
                            jobType={job?.jobType}
                            companyLogo={
                              job?.companyLogo
                            }
                            uploadedByRole={
                              job?.uploadedByRole
                            }
                          />
                        </div>

                        {/* IN-FEED AD */}

                        {(index + 1) % 6 ===
                          0 && (
                          <div
                            className="
                              col-span-full
                              py-1
                            "
                          >
                            <AdSlot
                              slot="YOUR_AD_SLOT_ID"
                              format="auto"
                              className="min-h-[100px]"
                            />
                          </div>
                        )}
                      </React.Fragment>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPLY MODAL
      ===================================================== */}

      {isApply && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/75
            px-3
            py-4
            backdrop-blur-md
            sm:px-4
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-job-title"
        >
          <div
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-lg
              overflow-y-auto
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0d1016]
              p-4
              shadow-[0_30px_100px_rgba(0,0,0,.6)]
              sm:p-6
            "
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setIsApply(false)}
              aria-label="Close application form"
              className="
                absolute
                right-3
                top-3
                rounded-xl
                border
                border-white/[0.06]
                p-2
                text-slate-500
                hover:bg-white/[0.06]
                hover:text-white
                sm:right-4
                sm:top-4
              "
            >
              <X size={18} />
            </button>

            <div className="pr-10">
              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-500/15
                  bg-blue-500/[0.06]
                  px-3
                  py-1
                  text-[10px]
                  font-semibold
                  text-blue-400
                "
              >
                <Sparkles size={11} />
                Application
              </div>

              <h2
                id="apply-job-title"
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  sm:text-2xl
                "
              >
                Apply for this job
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete your application below.
              </p>
            </div>

            <div className="mt-5 sm:mt-6">
              <ApplyJobForm
                jobId={selectedJobId}
                setIsApply={setIsApply}
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(14px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes jobCardIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }

          #job-scroll-area::-webkit-scrollbar {
            width: 5px;
          }

          #job-scroll-area::-webkit-scrollbar-track {
            background: transparent;
          }

          #job-scroll-area::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.10);
            border-radius: 999px;
          }

          #job-scroll-area::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,.20);
          }

          @media (max-width: 639px) {
            #job-scroll-area {
              overflow-x: hidden;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: .01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: .01ms !important;
            }
          }
        `}
      </style>
    </main>
  );
};

/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({ title, children }) {
  return (
    <div
      className="
        mb-6
        border-b
        border-white/[0.07]
        pb-6
      "
    >
      <h3
        className="
          mb-3
          text-[11px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-slate-300
        "
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

export default FindJob;