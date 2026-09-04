import React, { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

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
  ArrowRight,
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

/* =========================================================
   CATEGORIES
========================================================= */

const JOB_CATEGORIES = [
  {
    value: "IT & Software",
    label: "IT & Software",
  },
  {
    value: "Sales & Business Development",
    label: "Sales & Business",
  },
  {
    value: "Marketing",
    label: "Marketing",
  },
  {
    value: "Human Resources",
    label: "Human Resources",
  },
  {
    value: "Finance & Accounting",
    label: "Finance & Accounting",
  },
  {
    value: "Customer Support",
    label: "Customer Support",
  },
  {
    value: "Operations",
    label: "Operations",
  },
  {
    value: "Healthcare",
    label: "Healthcare",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Design",
    label: "Design",
  },
  {
    value: "Content & Writing",
    label: "Content & Writing",
  },
  {
    value: "BPO",
    label: "BPO",
  },
  {
    value: "Legal",
    label: "Legal",
  },
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "Others",
    label: "Others",
  },
];

/* =========================================================
   POPULAR
========================================================= */

const POPULAR_CATEGORIES = [
  "IT & Software",
  "Sales & Business Development",
  "Marketing",
  "Human Resources",
  "Customer Support",
];

/* =========================================================
   EMPLOYMENT
========================================================= */

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

/* =========================================================
   SLUGIFY
========================================================= */

const slugify = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* =========================================================
   UNSLUGIFY
========================================================= */

const unslugify = (value = "") => {
  return String(value)
    .replace(/-/g, " ")
    .trim();
};

/* =========================================================
   FIND JOB
========================================================= */

const FindJob = () => {
  const navigate = useNavigate();

  const {
    searchTerm: pathSearchTerm,
    location: pathLocation,
  } = useParams();

  const [searchParams, setSearchParams] =
    useSearchParams();

  /* =======================================================
     SEARCH / FILTER STATE
  ======================================================= */

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] =
    useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("");

  const [workMode, setWorkMode] = useState("");
  const [experience, setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [datePosted, setDatePosted] = useState("");

  const [openFilter, setOpenFilter] = useState("");

  /* =======================================================
     VIEW
  ======================================================= */

  const [cardsPerRow, setCardsPerRow] = useState(3);
  const [sortBy, setSortBy] = useState("latest");
  const [remoteOnly, setRemoteOnly] =
    useState(false);

  /* =======================================================
     MOBILE FILTER
  ======================================================= */

  const [showFilters, setShowFilters] =
    useState(false);

  /* =======================================================
     APPLY
  ======================================================= */

  const [isApply, setIsApply] = useState(false);
  const [selectedJobId, setSelectedJobId] =
    useState(null);

  /* =======================================================
     TOAST
  ======================================================= */

  const [message, setMessage] = useState("");
  const [showCursor, setShowCursor] =
    useState(true);

  /* =======================================================
     SAVING
  ======================================================= */

  const [savingJobId, setSavingJobId] =
    useState(null);

  /* =======================================================
     READ URL
  ======================================================= */

  useEffect(() => {
    const urlSearch =
      searchParams.get("search") || "";

    const urlLocation =
      searchParams.get("location") || "";

    const urlCategory =
      searchParams.get("category") || "";

    const urlEmployment =
      searchParams.get("employmentType") || "";

    const urlSkill =
      searchParams.get("skill") || "";

    const urlRemote =
      searchParams.get("remote") === "true";

    /*
      Priority:

      /find-job/react/noida
                    ↓
      pathSearchTerm = react
      pathLocation   = noida

      Query params override only when supplied.
    */

    setSearchTerm(
      urlSearch ||
      (pathSearchTerm
        ? unslugify(pathSearchTerm)
        : "")
    );

    setLocation(
      urlLocation ||
      (pathLocation
        ? unslugify(pathLocation)
        : "")
    );

    setCategory(urlCategory);

    setEmploymentType(urlEmployment);

    setSkills(urlSkill);

    setRemoteOnly(urlRemote);
  }, [
    searchParams,
    pathSearchTerm,
    pathLocation,
  ]);

  /* =======================================================
     SAVED JOB API
  ======================================================= */

  const [savedJob] = useSavedJobMutation();

  const { data: savedData } =
    useGetSavedJobsQuery();

  /* =======================================================
     JOB API QUERY PARAMS
  ======================================================= */

  const jobQueryParams = useMemo(() => {
    const params = {};

    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    if (category.trim()) {
      params.category = category.trim();
    }

    if (employmentType) {
      params.employmentType =
        employmentType;
    }

    if (skills.trim()) {
      params.skill = skills.trim();
    }

    if (remoteOnly) {
      params.remote = "true";
    }

    /*
      Active jobs only
    */

    params.isActive = "true";

    return params;
  }, [
    searchTerm,
    location,
    category,
    employmentType,
    skills,
    remoteOnly,
  ]);

  /* =======================================================
     GET JOBS
  ======================================================= */

  const {
    data: allJob,
    isLoading,
    isError,
  } = useGetAllforJobsQuery(
    jobQueryParams
  );

  /* =======================================================
     BACKEND JOBS
  ======================================================= */

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

  /* =======================================================
     HELPERS
  ======================================================= */

  const getCompanyName = (job) => {
    console.log(job,"job")
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
      job?.location
        ?.toLowerCase()
        .trim() || "";

    return (
      jobLocation.includes("remote") ||
      jobLocation.includes("work from home") ||
      jobLocation.includes("wfh")
    );
  };

  const getSalaryValue = (job) => {
    const min = Number(
      job?.salaryRange?.min
    );

    const max = Number(
      job?.salaryRange?.max
    );

    if (!Number.isNaN(max) && max > 0) {
      return max;
    }

    if (!Number.isNaN(min) && min > 0) {
      return min;
    }

    return 0;
  };

  /* =======================================================
     SORT
  ======================================================= */

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

  /* =======================================================
     FINAL JOB DATA
  ======================================================= */

  const jobsData = useMemo(() => {
    /*
      Backend failed:
      use static jobs and filter locally.
    */

    if (isError) {
      return sortJobs(
        staticJobs.filter((job) => {
          const search =
            searchTerm
              .toLowerCase()
              .trim();

          const selectedLocation =
            location
              .toLowerCase()
              .trim();

          const selectedSkill =
            skills
              .toLowerCase()
              .trim();

          const selectedCategory =
            category
              .toLowerCase()
              .trim();

          const companyName =
            getCompanyName(job);

          const title =
            job?.title
              ?.toLowerCase() || "";

          const description =
            job?.description
              ?.toLowerCase() || "";

          const jobCategory =
            getCategory(job)
              .toLowerCase();

          const company =
            companyName
              .toLowerCase();

          const matchesSearch =
            !search ||
            title.includes(search) ||
            description.includes(search) ||
            company.includes(search) ||
            jobCategory.includes(search) ||
            job?.skills?.some(
              (skill) =>
                String(skill)
                  .toLowerCase()
                  .includes(search)
            );

          const matchesLocation =
            !selectedLocation ||
            job?.location
              ?.toLowerCase()
              .includes(
                selectedLocation
              );

          const matchesEmployment =
            !employmentType ||
            job?.employmentType ===
            employmentType;

          const matchesSkill =
            !selectedSkill ||
            job?.skills?.some(
              (skill) =>
                String(skill)
                  .toLowerCase()
                  .includes(
                    selectedSkill
                  )
            );

          const matchesRemote =
            !remoteOnly ||
            isRemoteJob(job);

          const matchesCategory =
            !selectedCategory ||
            jobCategory.includes(
              selectedCategory
            );

          return (
            matchesSearch &&
            matchesLocation &&
            matchesEmployment &&
            matchesSkill &&
            matchesRemote &&
            matchesCategory
          );
        })
      );
    }

    /*
      Backend already filtered the data.
    */

    return sortJobs(backendJobs);
  }, [
    backendJobs,
    isError,
    searchTerm,
    location,
    employmentType,
    skills,
    category,
    remoteOnly,
    sortBy,
  ]);

  /* =======================================================
     SAVED IDS
  ======================================================= */

  const savedJobIds = useMemo(() => {
    if (Array.isArray(savedData)) {
      return savedData
        .map((job) => job?._id)
        .filter(Boolean);
    }

    if (
      Array.isArray(
        savedData?.savedJobs
      )
    ) {
      return savedData.savedJobs
        .map((job) => job?._id)
        .filter(Boolean);
    }

    if (
      Array.isArray(savedData?.data)
    ) {
      return savedData.data
        .map((job) => job?._id)
        .filter(Boolean);
    }

    return [];
  }, [savedData]);

  /* =======================================================
     ACTIVE FILTERS
  ======================================================= */

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

  /* =======================================================
     REMOVE FILTER
  ======================================================= */

  const removeFilter = (key) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    if (key === "search") {
      setSearchTerm("");
      nextParams.delete("search");
    }

    if (key === "location") {
      setLocation("");
      nextParams.delete("location");
    }

    if (key === "category") {
      setCategory("");
      nextParams.delete("category");
    }

    if (key === "employment") {
      setEmploymentType("");
      nextParams.delete(
        "employmentType"
      );
    }

    if (key === "skills") {
      setSkills("");
      nextParams.delete("skill");
    }

    if (key === "remote") {
      setRemoteOnly(false);
      nextParams.delete("remote");
    }

    /*
      If search/location came from SEO path,
      move back to /find-job when removed.
    */

    const nextSearch =
      key === "search"
        ? ""
        : searchTerm;

    const nextLocation =
      key === "location"
        ? ""
        : location;

    const titleSlug =
      slugify(nextSearch);

    const locationSlug =
      slugify(nextLocation);

    let pathname = "/find-job";

    if (titleSlug) {
      pathname += `/${titleSlug}`;
    }

    if (locationSlug) {
      pathname += `/${locationSlug}`;
    }

    const query =
      nextParams.toString();

    navigate(
      query
        ? `${pathname}?${query}`
        : pathname
    );
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setCategory("");
    setEmploymentType("");
    setSkills("");
    setRemoteOnly(false);
    setSortBy("latest");
    setShowFilters(false);

    navigate("/find-job");
  };

  /* =======================================================
     SAVE JOB
  ======================================================= */

  const handleSaveJob = async (id) => {
    if (!id) return;

    try {
      setSavingJobId(id);
      setMessage("Saving job...");

      await savedJob(id).unwrap();

      setMessage(
        "Job saved successfully"
      );
    } catch (error) {
      setMessage(
        error?.data?.message ||
        "Please login to save this job"
      );
    } finally {
      setSavingJobId(null);
    }
  };

  /* =======================================================
     CURSOR
  ======================================================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(
        (prev) => !prev
      );
    }, 550);

    return () =>
      clearInterval(interval);
  }, []);

  /* =======================================================
     TOAST
  ======================================================= */

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2500);

    return () =>
      clearTimeout(timer);
  }, [message]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {
    document
      .getElementById(
        "job-scroll-area"
      )
      ?.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    /*
      SEO URL:

      /find-job

      /find-job/react

      /find-job/noida

      /find-job/react/noida
    */

    const titleSlug =
      slugify(searchTerm);

    const locationSlug =
      slugify(location);

    let pathname = "/find-job";

    if (titleSlug) {
      pathname += `/${titleSlug}`;
    }

    if (locationSlug) {
      pathname += `/${locationSlug}`;
    }

    /*
      Non-SEO filters remain query params.
    */

    const params =
      new URLSearchParams();

    if (category.trim()) {
      params.set(
        "category",
        category.trim()
      );
    }

    if (employmentType) {
      params.set(
        "employmentType",
        employmentType
      );
    }

    if (skills.trim()) {
      params.set(
        "skill",
        skills.trim()
      );
    }

    if (remoteOnly) {
      params.set(
        "remote",
        "true"
      );
    }

    const queryString =
      params.toString();

    navigate(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );

    setShowFilters(false);
  };

  /* =======================================================
     POPULAR CATEGORY
  ======================================================= */

  const handlePopularCategory = (
    value
  ) => {
    setCategory(value);
    setRemoteOnly(false);

    setShowFilters(false);

    /*
      Directly navigate after setting
      category so state timing doesn't
      cause old category to be used.
    */

    const params =
      new URLSearchParams();

    params.set(
      "category",
      value
    );

    let pathname = "/find-job";

    if (searchTerm.trim()) {
      pathname += `/${slugify(
        searchTerm
      )}`;
    }

    if (location.trim()) {
      pathname += `/${slugify(
        location
      )}`;
    }

    navigate(
      `${pathname}?${params.toString()}`
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0C] text-[#EDEAE3] selection:bg-indigo-500/30">

      <Seo
        title={
          searchTerm || location
            ? `${searchTerm || "Jobs"}${location
              ? ` in ${location}`
              : ""
            }`
            : "Find Jobs"
        }
        description="Find your next opportunity with JoblessJob. Search jobs by title, skill, location, category and employment type."
        path="/find-job"
      />

      {/* TOAST */}

      {message && (
        <NotificationToasty
          message={message}
        />
      )}

      {/* =====================================================
          HERO
      ===================================================== */}
<section className="relative overflow-hidden border-b border-white/[0.07] bg-[#0A0A0C]">

  {/* GRID BACKGROUND */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      opacity-[0.03]
      [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)]
      [background-size:56px_56px]
      
      "
      />

  <div
    className="
    relative
    mx-auto
    flex
    max-w-[1200px]
    flex-col
    px-6
    py-4
    pb-14
    pt-12
    sm:px-8
    sm:pb-16
    sm:pt-16
    lg:px-8
    lg:pb-20
    lg:pt-20
    "
  >

  {/* STATUS */}
<div
  className="
    mx-auto
    mb-7
    mt-6
    flex
    w-fit
    items-center
    gap-2
    rounded-full
    border
    border-white/10
    bg-white/[0.04]
    px-3
    py-2.5
    backdrop-blur
    sm:mt-8
    sm:py-3
  "
>
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
  </span>

  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
    Status: Finding
  </span>
</div>

    {/* HERO CONTENT */}
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-10">

      {/* HEADLINE */}
      <div className="overflow-hidden">

        <h1
          className="
            hero-title
            text-4xl
            font-black
            leading-[1.05]
            tracking-[-0.055em]
            text-white
            sm:text-5xl
            lg:text-[64px]
          "
        >
          Hey, Jobseeker!

          <br />

          <span
            className="
              relative
              inline-block
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              bg-clip-text
              text-transparent
            "
          >
            Your next company
          </span>

          <br />

          <span className="text-white">
            might be here

            <span
              className={`
                ml-1
                inline-block
                text-blue-400
                transition-opacity
                duration-150
                ${
                  showCursor
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
            >
              |
            </span>
          </span>
        </h1>

        <p
          className="
            hero-fade-in-delay
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-slate-400
            sm:text-base
          "
        >
          Explore companies, discover their open roles,
          and find a workplace that feels right for your
          next move.
        </p>

      </div>

      {/* POPULAR SEARCHES */}
      <div className="hidden border-l border-white/[0.08] pl-6 lg:block">

        <p className="text-xs text-[#6B6963]">
          Popular searches
        </p>

        <ul className="mt-3">
          {POPULAR_CATEGORIES.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() =>
                  handlePopularCategory(item)
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-white/[0.05]
                  py-2.5
                  text-left
                  text-sm
                  text-[#B8B6B0]
                  transition
                  first:pt-0
                  last:border-b-0
                  hover:text-[#F5F2EA]
                "
              >
                <span>{item}</span>

                <ArrowRight
                  size={14}
                  className="
                    shrink-0
                    text-[#4E4C47]
                    transition
                    group-hover:translate-x-0.5
                    group-hover:text-indigo-400
                  "
                />
              </button>
            </li>
          ))}
        </ul>

      </div>

    </div>

    {/* SEARCH BAR */}
    <div className="mt-8 sm:mt-10">

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.10]
          bg-[#111214]
          shadow-[0_20px_60px_rgba(0,0,0,.45)]
        "
      >

        <div className="flex flex-col divide-y divide-white/[0.08] lg:flex-row lg:divide-x lg:divide-y-0">

          {/* JOB */}
          <div className="group flex flex-1 items-center gap-3 px-5 py-4">

            <Search
              size={18}
              className="
                shrink-0
                text-[#5C5A55]
                transition
                group-focus-within:text-indigo-400
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
                w-full
                min-w-0
                bg-transparent
                text-sm
                text-[#F5F2EA]
                outline-none
                placeholder:text-[#5C5A55]
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
                  text-[#5C5A55]
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* LOCATION */}
          <div className="group flex flex-1 items-center gap-3 px-5 py-4">

            <MapPin
              size={18}
              className="
                shrink-0
                text-[#5C5A55]
                transition
                group-focus-within:text-indigo-400
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
                w-full
                min-w-0
                bg-transparent
                text-sm
                text-[#F5F2EA]
                outline-none
                placeholder:text-[#5C5A55]
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
                  text-[#5C5A55]
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* CATEGORY */}
          <div className="group flex items-center gap-3 px-5 py-4 lg:w-[230px]">

            <BriefcaseBusiness
              size={18}
              className="shrink-0 text-[#5C5A55]"
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
                text-[#B8B6B0]
                outline-none
              "
            >
              <option
                value=""
                className="bg-[#111214]"
              >
                All categories
              </option>

              {JOB_CATEGORIES.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                  className="bg-[#111214]"
                >
                  {cat.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="shrink-0 text-[#5C5A55]"
            />

          </div>

          {/* SEARCH BUTTON */}
          <button
            type="button"
            onClick={handleSearch}
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              bg-indigo-400
              px-8
              py-4
              text-sm
              font-semibold
              text-[#0A0A0C]
              transition-colors
              hover:bg-indigo-300
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

      </div>

      {/* MOBILE POPULAR */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto px-0.5 pb-1 scrollbar-none lg:hidden">

        <span className="shrink-0 text-[11px] text-[#6B6963]">
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
              text-[11px]
              font-medium
              transition
              ${
                category === item
                  ? "border-indigo-500/30 bg-indigo-500/[0.10] text-indigo-300"
                  : "border-white/[0.08] bg-white/[0.02] text-[#8B8985] hover:border-indigo-500/25 hover:text-indigo-300"
              }
            `}
          >
            {item}
          </button>
        ))}

      </div>

    </div>

  </div>
</section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-[1400px] px-4 pb-10 sm:px-6 lg:px-8">

        {/* SERVER ERROR */}

        {isError && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-indigo-500/15 bg-indigo-500/[0.06] px-4 py-3 text-indigo-400">

            <ServerOff
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="min-w-0">

              <p className="text-sm font-semibold">
                Server is currently
                unavailable
              </p>

              <p className="mt-0.5 text-xs text-indigo-400/60">
                Showing sample
                opportunities for now.
              </p>

            </div>

          </div>
        )}

        {/* MOBILE FILTER */}

        <div className="mb-4 lg:hidden">

          <button
            type="button"
            onClick={() =>
              setShowFilters(
                !showFilters
              )
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#111214] px-4 py-3 text-sm font-semibold text-[#B8B6B0] transition hover:border-white/[0.16] hover:text-white"
          >

            <SlidersHorizontal
              size={17}
            />

            Filters

            {activeFilters.length >
              0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-400 px-1.5 text-[10px] font-bold text-[#0A0A0C]">
                  {activeFilters.length}
                </span>
              )}

          </button>

        </div>

        {/* MAIN GRID */}

        <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8 py-12" >

          {/* =================================================
              SIDEBAR
          ================================================= */}
          <aside
            className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111214] lg:sticky lg:top-5 lg:self-start ${showFilters ? "block" : "hidden lg:block"
              }`}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal
                  size={16}
                  className="text-indigo-400"
                />

                <div>
                  <h2 className="text-sm font-semibold text-[#F5F2EA]">
                    Filters
                  </h2>

                  <p className="text-[11px] text-[#6B6963]">
                    Refine your search
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg px-2 py-1.5 text-[11px] font-medium text-[#6B6963] transition hover:bg-white/[0.04] hover:text-white"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="rounded-lg p-1.5 text-[#6B6963] transition hover:bg-white/[0.05] hover:text-white lg:hidden"
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="px-5 py-4">

              {/* ACTIVE FILTERS */}
              {activeFilters.length > 0 && (
                <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-500/15 bg-indigo-500/[0.06] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-400 px-1.5 text-[9px] font-bold text-[#0A0A0C]">
                      {activeFilters.length}
                    </span>

                    <span className="text-[11px] font-medium text-indigo-300">
                      Active filters
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[11px] font-medium text-indigo-400/70 transition hover:text-indigo-300"
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* EMPLOYMENT TYPE */}
              <div className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "employment"
                        ? ""
                        : "employment"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Employment type
                    </h3>

                    {employmentType && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        {employmentType}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "employment"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "employment" && (
                  <div className="space-y-1.5 pb-4">
                    {EMPLOYMENT_TYPES.map((type) => {
                      const active = employmentType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setEmploymentType(
                              active ? "" : type
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${active
                              ? "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300"
                              : "border-transparent text-[#8B8985] hover:border-white/[0.06] hover:bg-white/[0.03] hover:text-[#D8D6D0]"
                            }`}
                        >
                          <span className="text-xs font-medium">
                            {type}
                          </span>

                          <span
                            className={`h-3.5 w-3.5 rounded-full border ${active
                                ? "border-indigo-400 bg-indigo-400"
                                : "border-white/[0.15]"
                              }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* WORK MODE */}
              <div className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "workMode"
                        ? ""
                        : "workMode"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Work mode
                    </h3>

                    {workMode && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        {workMode}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "workMode"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "workMode" && (
                  <div className="space-y-1.5 pb-4">
                    {[
                      "Remote",
                      "Hybrid",
                      "On-site",
                    ].map((mode) => {
                      const active = workMode === mode;

                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() =>
                            setWorkMode(
                              active ? "" : mode
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${active
                              ? "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300"
                              : "border-transparent text-[#8B8985] hover:border-white/[0.06] hover:bg-white/[0.03] hover:text-[#D8D6D0]"
                            }`}
                        >
                          <span className="text-xs font-medium">
                            {mode}
                          </span>

                          <span
                            className={`h-3.5 w-3.5 rounded-full border ${active
                                ? "border-indigo-400 bg-indigo-400"
                                : "border-white/[0.15]"
                              }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* EXPERIENCE */}
              <div className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "experience"
                        ? ""
                        : "experience"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Experience
                    </h3>

                    {experience && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        {experience}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "experience"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "experience" && (
                  <div className="space-y-1.5 pb-4">
                    {[
                      "Fresher",
                      "0–1 Year",
                      "1–3 Years",
                      "3–5 Years",
                      "5+ Years",
                    ].map((item) => {
                      const active = experience === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setExperience(
                              active ? "" : item
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${active
                              ? "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300"
                              : "border-transparent text-[#8B8985] hover:border-white/[0.06] hover:bg-white/[0.03] hover:text-[#D8D6D0]"
                            }`}
                        >
                          <span className="text-xs font-medium">
                            {item}
                          </span>

                          <span
                            className={`h-3.5 w-3.5 rounded-full border ${active
                                ? "border-indigo-400 bg-indigo-400"
                                : "border-white/[0.15]"
                              }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SALARY */}
              <div className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "salary"
                        ? ""
                        : "salary"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Salary range
                    </h3>

                    {salaryRange && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        ₹{Number(salaryRange).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "salary"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "salary" && (
                  <div className="pb-5 pt-1">

                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] text-[#6B6963]">
                        Minimum salary
                      </span>

                      <span className="text-xs font-medium text-indigo-300">
                        {salaryRange
                          ? `₹${Number(
                            salaryRange
                          ).toLocaleString()}`
                          : "Any"}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="2000000"
                      step="50000"
                      value={salaryRange || 0}
                      onChange={(e) =>
                        setSalaryRange(e.target.value)
                      }
                      className="w-full accent-indigo-400"
                    />

                    <div className="mt-2 flex justify-between text-[10px] text-[#5C5A55]">
                      <span>₹0</span>
                      <span>₹5L</span>
                      <span>₹10L</span>
                      <span>₹20L+</span>
                    </div>
                  </div>
                )}
              </div>

              {/* SKILLS */}
              <div className="border-b border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "skills"
                        ? ""
                        : "skills"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Skills
                    </h3>

                    {skills && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        {skills}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "skills"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "skills" && (
                  <div className="pb-5">

                    <div className="group flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#0B0C0F] px-3 py-2.5 transition focus-within:border-indigo-500/40">
                      <Search
                        size={14}
                        className="shrink-0 text-[#5C5A55] group-focus-within:text-indigo-400"
                      />

                      <input
                        type="text"
                        value={skills}
                        onChange={(e) =>
                          setSkills(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        placeholder="React, Node, MongoDB..."
                        className="w-full min-w-0 bg-transparent text-xs text-[#F5F2EA] outline-none placeholder:text-[#5C5A55]"
                      />

                      {skills && (
                        <button
                          type="button"
                          onClick={() => setSkills("")}
                          className="shrink-0 text-[#5C5A55] hover:text-white"
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
                          className={`rounded-lg border px-2 py-1.5 text-[10px] font-medium transition ${skills === skill
                              ? "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300"
                              : "border-white/[0.07] bg-white/[0.02] text-[#6B6963] hover:border-indigo-500/25 hover:bg-indigo-500/[0.06] hover:text-indigo-300"
                            }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DATE POSTED */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(
                      openFilter === "datePosted"
                        ? ""
                        : "datePosted"
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <div>
                    <h3 className="text-xs font-medium text-[#D8D6D0]">
                      Date posted
                    </h3>

                    {datePosted && (
                      <p className="mt-1 text-[10px] text-indigo-400">
                        {datePosted}
                      </p>
                    )}
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-[#6B6963] transition-transform ${openFilter === "datePosted"
                        ? "rotate-180 text-indigo-400"
                        : ""
                      }`}
                  />
                </button>

                {openFilter === "datePosted" && (
                  <div className="space-y-1.5 pb-4">
                    {[
                      "Today",
                      "Last 3 days",
                      "Last 7 days",
                      "Last 30 days",
                    ].map((item) => {
                      const active = datePosted === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setDatePosted(
                              active ? "" : item
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition ${active
                              ? "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300"
                              : "border-transparent text-[#8B8985] hover:border-white/[0.06] hover:bg-white/[0.03] hover:text-[#D8D6D0]"
                            }`}
                        >
                          <span className="text-xs font-medium">
                            {item}
                          </span>

                          <span
                            className={`h-3.5 w-3.5 rounded-full border ${active
                                ? "border-indigo-400 bg-indigo-400"
                                : "border-white/[0.15]"
                              }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="min-w-0">

            {/* RESULTS HEADER */}

            <div className="relative z-20 mb-4 bg-[#0A0A0C] py-2 lg:sticky lg:top-0 lg:bg-[#0A0A0C]/95 lg:backdrop-blur-xl">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#F5F2EA]">

                    {jobsData.length}{" "}

                    <span className="font-normal text-[#6B6963]">
                      jobs found
                    </span>

                  </h2>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {/* VIEW */}

                  <div className="hidden items-center rounded-xl border border-white/[0.08] bg-[#111214] p-1 lg:flex">

                    <span className="px-2 text-[10px] font-medium text-[#6B6963]">
                      View
                    </span>

                    {[2, 3, 4].map(
                      (count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() =>
                            setCardsPerRow(
                              count
                            )
                          }
                          className={`min-w-9 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${cardsPerRow ===
                              count
                              ? "bg-indigo-400 text-[#0A0A0C]"
                              : "text-[#6B6963] hover:text-white"
                            }`}
                        >
                          {count}
                        </button>
                      )
                    )}

                  </div>

                  {/* SORT */}

                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111214] px-3 py-2">

                    <ArrowDownUp
                      size={14}
                      className="text-[#6B6963]"
                    />

                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value
                        )
                      }
                      className="cursor-pointer appearance-none bg-transparent text-xs font-medium text-[#B8B6B0] outline-none"
                    >

                      <option
                        value="latest"
                        className="bg-[#111214]"
                      >
                        Latest
                      </option>

                      <option
                        value="salaryHigh"
                        className="bg-[#111214]"
                      >
                        Salary: High
                      </option>

                      <option
                        value="salaryLow"
                        className="bg-[#111214]"
                      >
                        Salary: Low
                      </option>

                    </select>

                    <ChevronDown
                      size={13}
                      className="text-[#6B6963]"
                    />

                  </div>

                  {/* RESET */}

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111214] px-3 py-2 text-xs font-medium text-[#8B8985] hover:border-white/[0.16] hover:text-white"
                  >

                    <RotateCcw
                      size={13}
                    />

                    <span className="hidden sm:block">
                      Reset
                    </span>

                  </button>

                </div>

              </div>

              {/* ACTIVE FILTERS */}

              {activeFilters.length >
                0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    {activeFilters.map(
                      (filter) => (
                        <button
                          key={filter.key}
                          type="button"
                          onClick={() =>
                            removeFilter(
                              filter.key
                            )
                          }
                          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-2.5 py-1 text-[11px] font-medium text-indigo-300"
                        >

                          <span className="truncate">
                            {
                              filter.label
                            }
                          </span>

                          <X
                            size={11}
                            className="shrink-0"
                          />

                        </button>
                      )
                    )}

                  </div>
                )}

            </div>

            {/* JOB AREA */}

            <div
              id="job-scroll-area"
              className="min-w-0 w-full overflow-x-hidden"
            >

              {/* LOADING */}

              {isLoading ? (
                <div
                  className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--job-columns),minmax(0,1fr))]"
                  style={{
                    "--job-columns":
                      cardsPerRow,
                  }}
                >

                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                  ].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-[360px] animate-pulse rounded-2xl border border-white/[0.05] bg-[#111214]"
                      />
                    )
                  )}

                </div>
              ) : jobsData.length ===
                0 ? (

                /* EMPTY */

                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-[#111214] px-6 text-center">

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">

                    <BriefcaseBusiness
                      size={28}
                      className="text-[#6B6963]"
                    />

                  </div>

                  <h3 className="text-xl font-semibold text-[#F5F2EA]">
                    No jobs found
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B6963]">
                    We couldn't find jobs
                    matching your current
                    filters. Try broadening
                    your search.
                  </p>

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-[#0A0A0C] hover:bg-indigo-300"
                  >

                    <RotateCcw
                      size={15}
                    />

                    Clear filters

                  </button>

                </div>

              ) : (

                /* JOB GRID */

                <div
                  className="grid w-full min-w-0 grid-cols-1 gap-4 pb-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[repeat(var(--job-columns),minmax(0,1fr))]"
                  style={{
                    "--job-columns":
                      cardsPerRow,
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

                        <div
                          className="min-w-0 animate-[jobCardIn_.45s_ease_both]"
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
                            onSave={
                              handleSaveJob
                            }
                            onApply={(
                              selectedJob
                            ) => {

                              if (
                                selectedJob?.jobType ===
                                "internal" ||
                                !selectedJob?.jobType
                              ) {

                                setSelectedJobId(
                                  selectedJob?._id
                                );

                                setIsApply(
                                  true
                                );
                              }

                            }}
                            isSaving={
                              savingJobId ===
                              job?._id
                            }
                            jobType={
                              job?.jobType
                            }
                            companyLogo={
                              job?.companyLogo
                            }
                            uploadedByRole={
                              job?.uploadedByRole
                            }
                          />

                        </div>

                        {/* IN-FEED AD */}

                        {(index + 1) %
                          6 ===
                          0 && (
                            <div className="col-span-full py-1">

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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-md sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-job-title"
        >

          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111214] p-4 shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:p-6">

            <button
              type="button"
              onClick={() =>
                setIsApply(false)
              }
              aria-label="Close application form"
              className="absolute right-3 top-3 rounded-xl border border-white/[0.06] p-2 text-[#8B8985] hover:bg-white/[0.06] hover:text-white sm:right-4 sm:top-4"
            >
              <X size={18} />
            </button>

            <div className="pr-10">

              <p className="mb-2 text-[11px] font-medium text-indigo-400">
                Application
              </p>

              <h2
                id="apply-job-title"
                className="text-xl font-semibold tracking-tight text-[#F5F2EA] sm:text-2xl"
              >
                Apply for this job
              </h2>

              <p className="mt-1 text-sm text-[#8B8985]">
                Complete your application
                below.
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
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,450;9..144,560&display=swap');

          .font-hero {
            font-family: 'Fraunces', ui-serif, Georgia, serif;
            font-optical-sizing: auto;
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

function FilterSection({
  title,
  children,
}) {
  return (
    <div className="mb-6 border-b border-white/[0.07] pb-6 last:mb-0 last:border-b-0 last:pb-0">

      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#D8D6D0]">

        <span className="h-3 w-[3px] rounded-full bg-indigo-400/70" />

        {title}

      </h3>

      {children}

    </div>
  );
}

export default FindJob;

