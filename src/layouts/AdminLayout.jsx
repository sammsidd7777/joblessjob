import React, { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  Plus,
  Tags,
  Users,
  UserRoundCog,
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

import { useGetProfileQuery } from "../RTK/AuthService";

const navItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/jobs",
    label: "Jobs",
    icon: BriefcaseBusiness,
  },
  {
    to: "/admin/jobs/new",
    label: "Add Job",
    icon: Plus,
  },
  {
    to: "/admin/categories",
    label: "Categories",
    icon: Tags,
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: Users,
  },
  {
    to: "/admin/hr",
    label: "HR / Recruiters",
    icon: UserRoundCog,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  // =====================================================
  // GET CURRENT USER
  // =====================================================

  const {
    data: profileData,
    isLoading,
    isFetching,
    isError,
  } = useGetProfileQuery();

  /*
    Depending on your API response, user can be:

    {
      user: {
        _id: "...",
        name: "...",
        role: "admin"
      }
    }

    OR directly:

    {
      _id: "...",
      name: "...",
      role: "admin"
    }
  */

  const user = profileData?.user || profileData;

  const userRole = user?.role;

  // =====================================================
  // ADMIN ACCESS CHECK
  // =====================================================

  /*
    While profile is loading, don't redirect.
    Otherwise a refresh can briefly redirect the admin.
  */

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050608] text-white">
        <div className="flex flex-col items-center">

          <div
            className="
              mb-4
              h-9
              w-9
              animate-spin
              rounded-full
              border-2
              border-white/10
              border-t-white
            "
          />

          <p className="text-sm font-medium text-slate-400">
            Checking admin access...
          </p>

        </div>
      </div>
    );
  }

  /*
    If API error / no user / non-admin:
    redirect to public website.
  */

  if (
    isError ||
    !user ||
    userRole !== "admin"
  ) {
    return <Navigate to="/" replace />;
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    localStorage.removeItem("savedUser");

    // Close mobile sidebar
    setMobileSidebarOpen(false);

    // Go to public website
    navigate("/", {
      replace: true,
    });
  };

  // =====================================================
  // SWITCH TO PUBLIC WEBSITE
  // =====================================================

  const handleSwitchToPublic = () => {
    setMobileSidebarOpen(false);

    navigate("/");
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = () => {
    setMobileSidebarOpen(false);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="h-screen overflow-hidden bg-[#050608] text-white">

      <div className="flex h-full">

        {/* =================================================
            MOBILE OVERLAY
        ================================================= */}

        {mobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            className="
              fixed
              inset-0
              z-40
              bg-black/70
              backdrop-blur-sm
              md:hidden
            "
          />
        )}

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`
            fixed
            inset-y-0
            left-0
            z-50
            flex
            w-[280px]
            flex-col
            border-r
            border-white/[0.07]
            bg-[#080a0f]

            transition-transform
            duration-300
            ease-out

            md:static
            md:z-auto
            md:w-64
            md:translate-x-0

            ${
              mobileSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          {/* =================================================
              SIDEBAR HEADER
          ================================================= */}

          <div
            className="
              flex
              h-[72px]
              shrink-0
              items-center
              justify-between
              border-b
              border-white/[0.06]
              px-4
            "
          >

            <div className="flex items-center gap-3">

              {/* LOGO */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-400
                "
              >
                <ShieldCheck size={20} />
              </div>

              {/* BRAND */}

              <div>
                <p className="text-sm font-bold text-white">
                  JoblessJob
                </p>

                <p className="text-[11px] text-slate-500">
                  Admin Panel
                </p>
              </div>

            </div>

            {/* MOBILE CLOSE */}

            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen(false)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-slate-500
                transition
                hover:bg-white/[0.06]
                hover:text-white
                md:hidden
              "
              aria-label="Close menu"
            >
              <X size={19} />
            </button>

          </div>

          {/* =================================================
              SIDEBAR CONTENT
          ================================================= */}

          <div className="flex min-h-0 flex-1 flex-col">

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <nav
              className="
                flex-1
                space-y-1.5
                overflow-y-auto
                p-3

                scrollbar-thin
                scrollbar-track-transparent
                scrollbar-thumb-white/10
              "
            >

              {/* SECTION LABEL */}

              <div className="mb-3 px-2 pt-1">

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                  "
                >
                  Management
                </p>

              </div>

              {/* NAV ITEMS */}

              {navItems.map(
                ({
                  to,
                  label,
                  icon: Icon,
                  end,
                }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,.06)]"
                          : "text-slate-500 hover:bg-white/[0.05] hover:text-white"
                      }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>

                        {/* ICON */}

                        <span
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            transition

                            ${
                              isActive
                                ? "bg-black/5"
                                : "bg-white/[0.03] group-hover:bg-white/[0.07]"
                            }
                          `}
                        >
                          <Icon size={16} />
                        </span>

                        {/* LABEL */}

                        <span className="flex-1">
                          {label}
                        </span>

                        {/* ACTIVE DOT */}

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-black" />
                        )}

                      </>
                    )}
                  </NavLink>
                )
              )}

            </nav>

            {/* =================================================
                BOTTOM ACTIONS
            ================================================= */}

            <div
              className="
                shrink-0
                border-t
                border-white/[0.07]
                p-3
              "
            >

              {/* =================================================
                  SWITCH TO PUBLIC
              ================================================= */}

              <button
                type="button"
                onClick={handleSwitchToPublic}
                className="
                  mb-2
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-500
                  transition

                  hover:bg-blue-500/[0.08]
                  hover:text-blue-400
                "
              >

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.03]
                  "
                >
                  <ExternalLink size={16} />
                </span>

                <span className="flex-1 text-left">
                  Public Website
                </span>

                <ArrowLeft
                  size={14}
                  className="rotate-180"
                />

              </button>

              {/* =================================================
                  LOGOUT
              ================================================= */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-500
                  transition

                  hover:bg-red-500/[0.08]
                  hover:text-red-400
                "
              >

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.03]
                  "
                >
                  <LogOut size={16} />
                </span>

                <span className="flex-1 text-left">
                  Logout
                </span>

              </button>

              {/* =================================================
                  ADMIN STATUS
              ================================================= */}

              <div
                className="
                  mt-3
                  rounded-xl
                  border
                  border-emerald-500/10
                  bg-emerald-500/[0.04]
                  px-3
                  py-2.5
                "
              >

                <div className="flex items-center gap-2">

                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,.6)]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-emerald-400
                    "
                  >
                    Admin access
                  </span>

                </div>

              </div>

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <main
          className="
            flex
            min-w-0
            flex-1
            flex-col
            overflow-hidden
          "
        >

          {/* =================================================
              TOP HEADER
          ================================================= */}

          <header
            className="
              flex
              h-[72px]
              shrink-0
              items-center
              border-b
              border-white/[0.07]
              bg-[#050608]/90
              px-4
              backdrop-blur-xl
              md:px-7
            "
          >

            <div className="flex min-w-0 flex-1 items-center gap-3">

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  text-slate-400
                  transition

                  hover:bg-white/[0.07]
                  hover:text-white

                  md:hidden
                "
                aria-label="Open admin menu"
              >
                <Menu size={19} />
              </button>

              {/* HEADER TITLE */}

              <div className="min-w-0">

                <p
                  className="
                    hidden
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-slate-600
                    sm:block
                  "
                >
                  Administration
                </p>

                <h1
                  className="
                    truncate
                    text-base
                    font-bold
                    text-white
                    sm:text-lg
                  "
                >
                  JoblessJob Admin
                </h1>

              </div>

            </div>

            {/* =================================================
                HEADER RIGHT
            ================================================= */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >

              {/* PUBLIC WEBSITE BUTTON */}

              <button
                type="button"
                onClick={handleSwitchToPublic}
                className="
                  hidden
                  h-9
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  px-3
                  text-xs
                  font-semibold
                  text-slate-400
                  transition

                  hover:bg-white/[0.07]
                  hover:text-white

                  sm:flex
                "
              >

                <ExternalLink size={14} />

                <span className="hidden lg:inline">
                  Website
                </span>

              </button>

              {/* ADMIN BADGE */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-500/15
                  bg-emerald-500/[0.06]
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-emerald-400
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />

                Admin

              </div>

            </div>

          </header>

          {/* =================================================
              MAIN CONTENT SCROLL
          ================================================= */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overflow-x-hidden

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >

            <div className="p-4 md:p-7">
              <Outlet />
            </div>

          </div>

        </main>

      </div>

      {/* =====================================================
          CUSTOM SCROLLBAR
      ===================================================== */}

      <style>
        {`
          /* Main content scrollbar */

          main > div::-webkit-scrollbar {
            width: 6px;
          }

          main > div::-webkit-scrollbar-track {
            background: transparent;
          }

          main > div::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.10);
            border-radius: 999px;
          }

          main > div::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,.18);
          }

          /* Sidebar scrollbar */

          aside nav::-webkit-scrollbar {
            width: 4px;
          }

          aside nav::-webkit-scrollbar-track {
            background: transparent;
          }

          aside nav::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,.08);
            border-radius: 999px;
          }

          @media (max-width: 767px) {
            aside nav::-webkit-scrollbar {
              width: 3px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              scroll-behavior: auto !important;
              transition-duration: .01ms !important;
            }
          }
        `}
      </style>

    </div>
  );
}