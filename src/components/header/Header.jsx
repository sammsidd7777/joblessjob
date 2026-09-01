import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Home,
  BriefcaseBusiness,
  Building2,
  Bookmark,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";

import AuthPage from "../Auth/AuthPage";

import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";
import AnimatedBrand from "./AnimatedBrand";

const Header = () => {
  // =====================================================
  // AUTH STATE
  // =====================================================

  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // =====================================================
  // DESKTOP NAVIGATION
  // =====================================================

  const navLinks = [
    {
      name: "Find Jobs",
      path: "/find-job",
      icon: BriefcaseBusiness,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: Building2,
    },
  ];

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  const mobileNavLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Jobs",
      path: "/find-job",
      icon: BriefcaseBusiness,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: Building2,
    },
  ];

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false);

      dispatch(logout());

      try {
        await logoutUser().unwrap();
      } catch (error) {
        console.error("Backend logout failed:", error);
      }

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = () => {
    setIsLoginCard(true);
  };

  // =====================================================
  // CLOSE LOGIN
  // =====================================================

  const handleCloseLogin = () => {
    setIsLoginCard(false);
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky top-0 z-50 w-full
          border-b border-slate-200/70
          bg-white/90
          backdrop-blur-2xl
          dark:border-slate-800
          dark:bg-slate-950/90
        "
      >
        <nav
          className="
            mx-auto flex
            h-[64px]
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:h-[70px]
            sm:px-6
            lg:h-[76px]
            lg:px-8
          "
        >
          {/* =====================================================
              LOGO
          ===================================================== */}

         {/* =====================================================
    LOGO / BRAND
===================================================== */}

<Link
  to="/"
  onClick={() => setIsProfileOpen(false)}
  className="group flex items-center gap-2.5"
>
  {/* Logo Icon */}
  <div
    className="
      relative flex
      h-9 w-9
      shrink-0
      items-center justify-center
      overflow-hidden
      rounded-xl
      bg-slate-950
      shadow-[3px_3px_0_#a855f7]
      transition-all
      duration-300
      group-hover:-translate-y-0.5
      group-hover:shadow-[4px_4px_0_#a855f7]
      sm:h-10
      sm:w-10
      lg:h-12
      lg:w-12
      lg:rounded-2xl
    "
  >
    <img
      src="/favicon.png"
      alt="JoblessJob"
      className="
        h-full
        w-full
        rounded-xl
        object-contain
        lg:rounded-2xl
      "
    />
  </div>

  {/* =================================================
      BRAND
  ================================================= */}

  <div className="block">
    <div
      className="
        flex
        items-center
        text-xl
        font-black
        leading-none
        tracking-[-0.05em]
        text-white
        sm:text-2xl
        lg:text-2xl
      "
    >
      <AnimatedBrand />
    </div>

    {/* Desktop tagline only */}
    <p
      className="
        mt-1
        hidden
        text-[10px]
        font-medium
        tracking-wide
        text-slate-400
        lg:block
      "
    >
      From Jobless to Hired 🚀
    </p>
  </div>
</Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    }

                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:h-[2px]
                    after:rounded-full
                    after:bg-gradient-to-r
                    after:from-blue-600
                    after:to-purple-600
                    after:transition-all
                    after:duration-300

                    ${
                      isActive
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={2}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                    "
                  />

                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* =====================================================
              DESKTOP RIGHT SIDE
          ===================================================== */}

          <div className="hidden items-center gap-4 lg:flex">
            {!user ? (
              <button
                type="button"
                onClick={handleLogin}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-600
                  hover:shadow-xl
                  hover:shadow-blue-500/20
                  active:scale-95
                  dark:bg-white
                  dark:text-slate-950
                  dark:hover:bg-blue-600
                  dark:hover:text-white
                "
              >
                <LogIn
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />

                Login / Sign Up
              </button>
            ) : (
              <div className="relative">
                {/* Profile Button */}

                <button
                  type="button"
                  onClick={() =>
                    setIsProfileOpen((prev) => !prev)
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-blue-300
                    hover:shadow-lg
                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                >
                  {/* Avatar */}

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-600
                      to-purple-600
                      text-white
                    "
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt=""
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <User size={18} />
                    )}
                  </div>

                  {/* User Details */}

                  <div className="hidden text-left xl:block">
                    <p
                      className="
                        max-w-[130px]
                        truncate
                        text-sm
                        font-bold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {user?.name || "Candidate"}
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-slate-400
                      "
                    >
                      Candidate
                    </p>
                  </div>

                  {/* Arrow */}

                  <ChevronDown
                    size={15}
                    className={`
                      text-slate-400
                      transition-transform
                      duration-300
                      ${
                        isProfileOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================= */}

                {isProfileOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[58px]
                      w-64
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-2
                      shadow-2xl
                      shadow-slate-900/10
                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {/* User Info */}

                    <div
                      className="
                        border-b
                        border-slate-100
                        px-3
                        py-3
                        dark:border-slate-800
                      "
                    >
                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {user?.name || "Candidate"}
                      </p>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {user?.email || ""}
                      </p>
                    </div>

                    {/* Dashboard */}

                    <Link
                      to="/candidate"
                      onClick={() =>
                        setIsProfileOpen(false)
                      }
                      className="
                        mt-2
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-blue-50
                        hover:text-blue-600
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                        dark:hover:text-blue-400
                      "
                    >
                      <LayoutDashboard size={17} />

                      Candidate Dashboard
                    </Link>

                    {/* Saved Jobs */}

                    <Link
                      to="/saved-jobs"
                      onClick={() =>
                        setIsProfileOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-blue-50
                        hover:text-blue-600
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                        dark:hover:text-blue-400
                      "
                    >
                      <Bookmark size={17} />

                      Saved Jobs
                    </Link>

                    {/* Divider */}

                    <div
                      className="
                        my-1
                        h-px
                        bg-slate-100
                        dark:bg-slate-800
                      "
                    />

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-red-500
                        transition
                        hover:bg-red-50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:hover:bg-red-950/30
                      "
                    >
                      <LogOut size={17} />

                      {isLoading
                        ? "Logging out..."
                        : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* =====================================================
          MOBILE + TABLET BOTTOM NAVIGATION
      ===================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-[100]
          border-t
          border-slate-200/80
          bg-white/95
          shadow-[0_-5px_20px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
          dark:border-slate-800
          dark:bg-slate-950/95
          lg:hidden
        "
      >
        <div
          className="
            mx-auto
            grid
            h-[68px]
            max-w-lg
            grid-cols-4
          "
        >
          {mobileNavLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    transition-all
                    duration-300
                    active:scale-95

                    ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                        flex
                        h-8
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-blue-50 shadow-sm shadow-blue-500/10 dark:bg-blue-950/40"
                            : ""
                        }
                      `}
                    >
                      <Icon
                        size={21}
                        strokeWidth={
                          isActive ? 2.5 : 2
                        }
                      />
                    </div>

                    <span
                      className="
                        text-[10px]
                        font-semibold
                      "
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* =================================================
              MOBILE PROFILE / LOGIN
          ================================================= */}

          {user ? (
            <NavLink
              to="/candidate"
              className={({ isActive }) =>
                `
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  transition-all
                  duration-300
                  active:scale-95

                  ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`
                      flex
                      h-8
                      w-11
                      items-center
                      justify-center
                      rounded-xl

                      ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/40"
                          : ""
                      }
                    `}
                  >
                    <User
                      size={21}
                      strokeWidth={
                        isActive ? 2.5 : 2
                      }
                    />
                  </div>

                  <span
                    className="
                      text-[10px]
                      font-semibold
                    "
                  >
                    Profile
                  </span>
                </>
              )}
            </NavLink>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-1
                text-slate-500
                transition-all
                duration-300
                active:scale-95
                dark:text-slate-400
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                "
              >
                <LogIn size={21} />
              </div>

              <span
                className="
                  text-[10px]
                  font-semibold
                "
              >
                Login
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* =====================================================
          LOGIN / SIGN UP MODAL
      ===================================================== */}

      {isLoginCard && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-slate-950/70
            px-4
            backdrop-blur-sm
          "
          onClick={handleCloseLogin}
        >
          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <AuthPage
              onClose={handleCloseLogin}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;