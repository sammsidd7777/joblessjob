import React, { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  UserRound,
  Bookmark,
  PhoneCall,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";

import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../RTK/AuthService";

import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import Loader from "../helper/Loader ";

const navigationItems = [
  {
    name: "My Career",
    subtitle: "Manage your profile",
    path: "/candidate/profile",
    icon: UserRound,
  },
  {
    name: "Job Crushes ❤️",
    subtitle: "Jobs you saved",
    path: "/candidate/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "My Moves 👀",
    subtitle: "Jobs you've been contacted for",
    path: "/candidate/applications",
    icon: PhoneCall,
  },
];

const CandidateLayout = () => {
  const { data: user, isLoading } = useGetProfileQuery();

  console.log(user,"userLayout")

  const [logoutUser, { isLoading: isLoggingOut }] =
    useLogoutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());
      setIsSidebarOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (isLoading) {
    return <Loader message="Loading your career..." />;
  }

  const userName = user?.user?.name || "Candidate";
  const userEmail = user?.user?.email || "user@example.com";

  const userInitials = userName
    .split(" ")
    .map((item) => item?.[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed inset-0 z-[90]
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header
        className="
          sticky top-0 z-40
          flex h-16 items-center
          border-b border-white/[0.06]
          bg-[#05070d]/95
          px-4
          backdrop-blur-xl
          lg:hidden
        "
      >

        <Link
          to="/"
          onClick={closeSidebar}
          className="flex items-center gap-2.5"
        >

          <div
            className="
              flex h-9 w-9
              overflow-hidden
              rounded-xl
              bg-black
              shadow-[2px_2px_0_#a855f7]
            "
          >
            <img
              src="/favicon.png"
              alt="JoblessJob"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-sm font-black tracking-tight">
              Jobless
              <span className="text-fuchsia-500">
                Job
              </span>
            </h1>

            <p className="text-[9px] text-slate-500">
              Find work worth saying yes to.
            </p>
          </div>

        </Link>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            ml-auto
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/[0.04]
            text-slate-300
          "
        >
          <Menu size={20} />
        </button>

      </header>

      {/* =====================================================
          DESKTOP + MOBILE LAYOUT
      ===================================================== */}

      <div className="lg:flex">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside
          className={`
            fixed inset-y-0 left-0 z-[100]
            flex w-[262px] flex-col
            border-r border-white/[0.07]
            bg-[#05070d]
            transition-transform duration-300

            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }

            lg:sticky
            lg:top-0
            lg:h-screen
            lg:translate-x-0
          `}
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="px-5 pt-7">

            <Link
              to="/"
              onClick={closeSidebar}
              className="
                group
                flex items-center gap-3
                px-1
              "
            >

              <div
                className="
                  flex h-11 w-11
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  bg-black
                  shadow-[3px_3px_0_#a855f7]
                  transition-transform
                  group-hover:-translate-y-0.5
                "
              >
                <img
                  src="/favicon.png"
                  alt="JoblessJob"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>

                <h1 className="text-lg font-black tracking-tight">
                  Jobless
                  <span className="text-fuchsia-500">
                    Job
                  </span>
                </h1>

                <p className="text-[10px] text-slate-500">
                  Find work worth saying yes to.
                </p>

              </div>

            </Link>

          </div>

          {/* =================================================
              USER CARD
          ================================================= */}

          <div className="px-4 pt-8">

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border border-white/[0.08]
                bg-gradient-to-br
                from-[#111827]
                via-[#0d1423]
                to-[#0a0f1b]
                p-4
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute -right-8 -top-8
                  h-24 w-24
                  rounded-full
                  bg-blue-600/10
                  blur-2xl
                "
              />

              <div className="relative flex items-center gap-3">

                <div
                  className="
                    flex h-11 w-11
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                  "
                >
                  {userInitials}
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-bold text-white">
                    {userName}
                  </p>

                  <p className="truncate text-[10px] text-slate-500">
                    {userEmail}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="flex-1 overflow-y-auto px-4 pt-8">

            <p
              className="
                mb-3 px-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Your Job Search
            </p>

            <nav className="space-y-1.5">

              {navigationItems.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) => `
                      group
                      flex items-center gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            bg-blue-600
                            text-white
                            shadow-lg
                            shadow-blue-600/20
                          `
                          : `
                            text-slate-300
                            hover:bg-white/[0.04]
                            hover:text-white
                          `
                      }
                    `}
                  >

                    {({ isActive }) => (
                      <>
                        <span
                          className={`
                            flex h-9 w-9
                            shrink-0
                            items-center justify-center
                            rounded-lg

                            ${
                              isActive
                                ? "bg-white/10"
                                : "bg-white/[0.04]"
                            }
                          `}
                        >
                          <Icon
                            size={17}
                            strokeWidth={isActive ? 2.3 : 2}
                          />
                        </span>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold">
                            {item.name}
                          </p>

                          <p
                            className={`
                              truncate text-[9px]
                              ${
                                isActive
                                  ? "text-blue-100"
                                  : "text-slate-600"
                              }
                            `}
                          >
                            {item.subtitle}
                          </p>

                        </div>

                        {isActive && (
                          <ChevronRight
                            size={15}
                            className="opacity-80"
                          />
                        )}

                      </>
                    )}

                  </NavLink>
                );
              })}

            </nav>

            {/* =================================================
                FIND JOB CARD
            ================================================= */}

            <div
              className="
                mt-8
                rounded-2xl
                border border-blue-500/20
                bg-gradient-to-br
                from-blue-500/[0.08]
                via-transparent
                to-fuchsia-500/[0.05]
                p-4
              "
            >

              <div
                className="
                  mb-4
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  bg-blue-500/10
                  text-blue-400
                "
              >
                <Search size={17} />
              </div>

              <p className="text-xs font-bold text-white">
                Still looking?
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                Explore fresh opportunities and find your next move.
              </p>

              <Link
                to="/find-job"
                onClick={closeSidebar}
                className="
                  mt-3
                  inline-flex
                  items-center gap-1
                  text-[10px]
                  font-bold
                  text-blue-400
                  transition
                  hover:text-blue-300
                "
              >
                Find jobs
                <ChevronRight size={13} />
              </Link>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="border-t border-white/[0.06] p-4">

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="
                group
                flex w-full
                items-center gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-red-400
                transition
                hover:bg-red-500/[0.06]
                disabled:opacity-50
              "
            >

              <span
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  bg-red-500/[0.08]
                "
              >
                <LogOut size={17} />
              </span>

              <span>
                {isLoggingOut
                  ? "Logging out..."
                  : "Logout"}
              </span>

            </button>

            <p className="mt-3 text-center text-[9px] text-slate-700">
              JoblessJob • Candidate Portal
            </p>

          </div>

        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main
          className="
            min-w-0
            flex-1
            bg-[#020617]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CandidateLayout;