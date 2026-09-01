import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CalendarDays,
  BriefcaseBusiness,
  ArrowUpRight,
  Building2,
} from "lucide-react";

const CompanyCard = ({ company }) => {
  const [imageError, setImageError] = useState(false);

  if (!company) return null;

  const companyName =
    company.companyName ||
    company.name ||
    "Company";

  const category =
    company.category ||
    "Industry not provided";

  const description =
    company.description ||
    "No company description available.";

  const logo =
    company.companyLogo ||
    company.logo ||
    "/meta.png";

  const employees =
    company.employees ?? "N/A";

  const founded =
    company.founded ?? "N/A";

  const totalJobs =
    company.totalJobs ?? 0;

  return (
    <Link
      to={`/company/${company._id}`}
      aria-label={`View details for ${companyName}`}
      className="
        group block
        rounded-2xl
        border border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
        dark:border-gray-800
        dark:bg-gray-900
        dark:hover:border-gray-700
      "
    >
      {/* =========================
          COMPANY HEADER
      ========================== */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">

          {/* LOGO */}
          <div
            className="
              flex h-16 w-16
              shrink-0
              items-center justify-center
              overflow-hidden
              rounded-2xl
              border border-gray-200
              bg-gray-50
              dark:border-gray-700
              dark:bg-gray-800
            "
          >
            {!imageError ? (
              <img
                src={logo}
                alt={`${companyName} logo`}
                onError={() => setImageError(true)}
                className="
                  h-full
                  w-full
                  object-contain
                  p-1
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            ) : (
              <Building2
                size={28}
                aria-hidden="true"
                className="text-gray-400"
              />
            )}
          </div>

          {/* COMPANY NAME */}
          <div className="min-w-0">
            <h2
              className="
                truncate
                text-lg
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {companyName}
            </h2>

            <p
              className="
                mt-1
                truncate
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {category}
            </p>
          </div>
        </div>

        {/* ARROW */}
        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="
            shrink-0
            text-gray-400
            transition-all duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:text-blue-600
            dark:group-hover:text-blue-400
          "
        />
      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <p
        className="
          mb-6
          min-h-[48px]
          line-clamp-2
          text-sm
          leading-6
          text-gray-600
          dark:text-gray-300
        "
      >
        {description}
      </p>

      {/* =========================
          COMPANY STATS
      ========================== */}
      <div
        className="
          grid grid-cols-3
          gap-3
          border-t
          border-gray-100
          pt-5
          dark:border-gray-800
        "
      >
        {/* EMPLOYEES */}
        <div className="text-center">
          <Users
            size={18}
            aria-hidden="true"
            className="mx-auto mb-1 text-blue-500"
          />

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            Employees
          </p>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {employees}
          </p>
        </div>

        {/* FOUNDED */}
        <div className="text-center">
          <CalendarDays
            size={18}
            aria-hidden="true"
            className="mx-auto mb-1 text-purple-500"
          />

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            Founded
          </p>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {founded}
          </p>
        </div>

        {/* OPEN JOBS */}
        <div className="text-center">
          <BriefcaseBusiness
            size={18}
            aria-hidden="true"
            className="mx-auto mb-1 text-green-500"
          />

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            Open Jobs
          </p>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-blue-600
              dark:text-blue-400
            "
          >
            {totalJobs}
          </p>
        </div>
      </div>

      {/* =========================
          BOTTOM ACTION
      ========================== */}
      <div
        className="
          mt-6
          flex items-center
          justify-between
          text-sm
          font-semibold
          text-blue-600
          transition-transform duration-300
          group-hover:translate-x-1
          dark:text-blue-400
        "
      >
        <span>View company details</span>

        <ArrowUpRight
          size={16}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};

export default CompanyCard;