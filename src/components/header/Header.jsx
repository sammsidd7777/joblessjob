
import { useEffect, useRef, useState } from "react";
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
  Plus,
} from "lucide-react";

import AuthPage from "../Auth/AuthPage";
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";
import AnimatedBrand from "./AnimatedBrand";

const Header = () => {
  const [isLoginCard, setIsLoginCard] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  console.log(user, "user")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  /* ---------------------------------------------
     SCROLL EFFECT
  --------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  --------------------------------------------- */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ---------------------------------------------
     LOGOUT
  --------------------------------------------- */
  const handleLogout = async () => {

    try {
      await logoutUser().unwrap();
      setIsProfileOpen(false);
      dispatch(logout());
    } catch {
      // Local logout is already completed.
    }

    navigate("/");
  };

  /* ---------------------------------------------
     DESKTOP NAV
  --------------------------------------------- */
  const desktopLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Jobs",
      path: "/find-job",
    },
    {
      name: "Companies",
      path: "/companies",
    },
    ...(user
      ? [
        {
          name: "Saved",
          path: "/saved-jobs",
        },
      ]
      : []),
  ];

  /* ---------------------------------------------
     MOBILE NAV
  --------------------------------------------- */
  const mobileLinks = user
    ? [
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
      {
        name: "Saved",
        path: "/saved-jobs",
        icon: Bookmark,
      },

    ]
    : [
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



  return (
    <>
      {/* =====================================================
          FLOATING HEADER
      ===================================================== */}
      <header
        className="
    pointer-events-none
    fixed
    inset-x-0
    top-0
    z-[200]
    px-2.5
    pt-2.5

    drop-shadow-[0_-8px_30px_rgba(245,215,110,0.18)]

    sm:px-4
    sm:pt-3
    md:px-5
    lg:px-7
  "
      >
        <nav
          className={`
            pointer-events-auto
            relative
            mx-auto
            flex
            h-[58px]
            w-full
            max-w-[1340px]
            items-center
            rounded-[18px]
            border
            px-2.5
            transition-all
            duration-500

            sm:h-[64px]
            sm:rounded-[20px]
            sm:px-3

            md:h-[68px]
            md:px-4

            lg:h-[72px]
            lg:rounded-[22px]
            lg:px-5

            ${isScrolled
              ? `
                  border-amber-300/20
                  bg-[#080b0b]/92
                  shadow-[0_18px_60px_rgba(0,0,0,.38)]
                  backdrop-blur-2xl
                `
              : `
                  border-white/[0.09]
                  bg-[#071012]/75
                  shadow-[0_10px_40px_rgba(0,0,0,.20)]
                  backdrop-blur-xl
                `
            }
          `}
        >
          {/* TOP GOLD HAIRLINE */}
          <span
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-amber-300/40
              to-transparent
            "
          />

          {/* =================================================
              BRAND
          ================================================= */}
          <Link
            to="/"
            onClick={() => setIsProfileOpen(false)}
            aria-label="JoblessJob home"
            className="
              group
              flex
              min-w-0
              shrink-0
              items-center
              gap-2
              rounded-xl
              pr-1
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[#F5D76E]

              sm:gap-2.5
              sm:pr-2

              md:gap-3
            "
          >
            {/* LOGO */}
            <span
              className="
                relative
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                overflow-hidden

                sm:h-9
                sm:w-9

                md:h-10
                md:w-10
              "
            >
              <img
                src="./favicon.png"
                alt=""
                className="object-contain w-12"
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-white/10
                  via-transparent
                  to-amber-300/10
                "
              />
            </span>

            {/* BRAND TEXT */}
            <span className="min-w-0">
              <span
                className="
                  block
                  truncate
                  text-[16px]
                  font-extrabold
                  leading-none
                  tracking-[-0.055em]
                  text-white

                  sm:text-[18px]

                  md:text-[20px]

                  lg:text-[21px]
                "
              >
                <AnimatedBrand />
              </span>

              <span
                className="
                  mt-1
                  hidden
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white/35

                  md:block
                "
              >
                Find your next yes
              </span>
            </span>
          </Link>

          {/* =================================================
              DESKTOP / TABLET NAV
          ================================================= */}
          <div
            className="
              mx-auto
              hidden
              h-full
              items-center
              justify-center
              gap-0.5

              md:flex
            "
          >
            {desktopLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                end={path === "/"}
                className={({ isActive }) => `
                  group
                  relative
                  flex
                  h-10
                  items-center
                  rounded-xl
                  px-3
                  text-[12px]
                  font-semibold
                  transition-all
                  duration-300

                  lg:px-4
                  lg:text-[13px]

                  ${isActive
                    ? "text-white"
                    : "text-white/50 hover:bg-white/[0.045] hover:text-white"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {name}

                    <span
                      className={`
                        absolute
                        bottom-1
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-[#F5D76E]
                        transition-all
                        duration-300

                        ${isActive
                          ? "w-5"
                          : "w-0 group-hover:w-4"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* =================================================
              RIGHT SIDE ACTIONS
          ================================================= */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {!user ? (
              <>


                {/* LOGIN */}
                <button
                  type="button"
                  onClick={() => setIsLoginCard(true)}
                  className="
                          group
                          inline-flex
                          h-9
                          items-center
                          justify-center
                          gap-1.5
                          rounded-full
                          border
                          border-[#F5D76E]/25
                          bg-[#F5D76E]
                          px-3.5
                          text-[11px]
                          font-extrabold
                          text-[#0a0b09]
                          shadow-[0_7px_24px_rgba(212,175,55,.13)]
                          transition-all
                          duration-300

                          hover:-translate-y-0.5
                          hover:bg-[#FFF2A8]
                          hover:shadow-[0_10px_30px_rgba(212,175,55,.22)]

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#F5D76E]

                          sm:h-10
                          sm:px-4
                          sm:text-[12px]

                          md:h-11
                          md:px-5
                          md:text-[13px]
                        "
                >
                  <span>Login</span>

                  <span
                    className="
                          inline-block
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        "
                  >
                    →
                  </span>
                </button>
              </>
            ) : (
              /* =============================================
                 LOGGED IN PROFILE
              ============================================= */
              <div
                ref={profileRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsProfileOpen((value) => !value)
                  }
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                  className="
                    group
                    flex
                    h-10
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.045]
                    pl-1
                    pr-2
                    transition

                    hover:border-amber-200/25
                    hover:bg-white/[0.07]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#F5D76E]

                    sm:h-11
                    sm:gap-2
                    sm:pl-1.5
                    sm:pr-3
                  "
                >
                  {/* AVATAR */}
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      border
                      border-amber-200/20
                      bg-gradient-to-br
                      from-[#FFF4B0]
                      via-[#D4AF37]
                      to-[#8A650A]
                      text-[#090a08]
                    "
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={16} />
                    )}
                  </span>

                  {/* USER NAME */}
                 <span
  className="
    hidden
    max-w-24
    truncate
    text-[12px]
    font-bold
    text-white
    lg:block
    xl:max-w-32
  "
>
  {user?.role === "admin" ? (
    <span className="inline-flex items-center rounded-full border border-red-400/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-300">
      Admin
    </span>
  ) : (
    user?.name
  )}
</span>

                  <ChevronDown
                    size={14}
                    className={`
                      text-white/40
                      transition-transform
                      duration-300

                      ${isProfileOpen
                        ? "rotate-180"
                        : ""
                      }
                    `}
                  />
                </button>

                {/* PROFILE DROPDOWN */}
                {isProfileOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[calc(100%+10px)]
                      z-50
                      w-[calc(100vw-24px)]
                      max-w-[280px]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-amber-200/10
                      bg-[#111513]/96
                      p-2
                      shadow-[0_24px_70px_rgba(0,0,0,.45)]
                      backdrop-blur-2xl

                      sm:w-64
                    "
                  >
                    {/* USER INFO */}
                    <div
                      className="
                        border-b
                        border-white/[0.07]
                        px-3
                        py-3
                      "
                    >
                      <p className="truncate text-sm font-bold text-white">
                        {user?.name || "Candidate"}

                      </p>

                      <p className="mt-0.5 truncate text-xs text-white/40">
                        {user?.email || ""}
                      </p>
                    </div>

                    {/* DASHBOARD */}
                    {user?.role === "user" && (
                      <>
                        <Link
                          to="/candidate"
                          onClick={() => setIsProfileOpen(false)}
                          className="
        mt-2
        flex
        min-h-11
        items-center
        gap-3
        rounded-xl
        px-3
        text-sm
        font-medium
        text-white/65
        transition
        hover:bg-white/[0.06]
        hover:text-white
      "
                        >
                          <LayoutDashboard size={17} />
                          Dashboard
                        </Link>

                        {/* SAVED JOBS */}
                        <Link
                          to="/candidate/saved-jobs"
                          onClick={() => setIsProfileOpen(false)}
                          className="
        flex
        min-h-11
        items-center
        gap-3
        rounded-xl
        px-3
        text-sm
        font-medium
        text-white/65
        transition
        hover:bg-white/[0.06]
        hover:text-white
      "
                        >
                          <Bookmark size={17} />
                          Saved jobs
                        </Link>

                        {/* LOGOUT */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="
        mt-1
        flex
        min-h-11
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        text-sm
        font-medium
        text-red-300
        transition
        hover:bg-red-500/10
        disabled:opacity-50
      "
                        >
                          <LogOut size={17} />
                          {isLoading ? "Logging out…" : "Log out"}
                        </button>
                      </>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="
        mt-2
        flex
        min-h-11
        items-center
        gap-3
        rounded-xl
        px-3
        text-sm
        font-medium
        text-white/65
        transition
        hover:bg-white/[0.06]
        hover:text-white
      "
                        >
                          <LayoutDashboard size={17} />
                          Dashboard
                        </Link>

                        {/* LOGOUT */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="
        mt-1
        flex
        min-h-11
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        text-sm
        font-medium
        text-red-300
        transition
        hover:bg-red-500/10
        disabled:opacity-50
      "
                        >
                          <LogOut size={17} />
                          {isLoading ? "Logging out…" : "Log out"}
                        </button>
                      </>
                    )}

                  </div>
                )}
              </div>
            )}
          </div>


        </nav>
      </header>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          Only below md
      ===================================================== */}
      <nav
        className="
          fixed
          inset-x-0
          bottom-0
          z-[190]
          border-t
          border-white/[0.08]
          bg-[#080b0b]/96
          pb-[env(safe-area-inset-bottom)]
          backdrop-blur-2xl

          md:hidden
        "
      >
        <div
          className="
            mx-auto
            grid
            h-[64px]
            w-full
            max-w-lg
            px-1

            sm:h-[68px]
          "
          style={{
            gridTemplateColumns: `repeat(${mobileLinks.length}, minmax(0, 1fr))`,
          }}
        >
          {mobileLinks.map((item) => {
            const Icon = item.icon;

            /* LOGIN BUTTON */
            if (item.action) {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={item.action}
                  className="
                    flex
                    min-h-11
                    flex-col
                    items-center
                    justify-center
                    gap-0.5
                    text-white/40
                    transition
                    active:scale-95
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                    "
                  >
                    <Icon size={19} />
                  </span>

                  <span className="text-[9px] font-semibold sm:text-[10px]">
                    {item.name}
                  </span>
                </button>
              );
            }

            /* NAV LINK */
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `
                  flex
                  min-h-11
                  flex-col
                  items-center
                  justify-center
                  gap-0.5
                  transition-all
                  duration-200
                  active:scale-95

                  ${isActive
                    ? "text-[#F5D76E]"
                    : "text-white/40"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`
                        flex
                        h-8
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        transition

                        ${isActive
                          ? "bg-[#F5D76E]/10"
                          : ""
                        }
                      `}
                    >
                      <Icon
                        size={19}
                        strokeWidth={
                          isActive ? 2.5 : 2
                        }
                      />
                    </span>

                    <span className="text-[9px] font-semibold sm:text-[10px]">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          LOGIN / SIGNUP MODAL
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
            overflow-y-auto
            bg-black/75
            px-3
            py-5
            backdrop-blur-sm

            sm:px-4
            sm:py-8
          "
          onClick={() => setIsLoginCard(false)}
        >
          <div
            className="
              w-full
              max-w-md
              max-h-[calc(100vh-32px)]
              overflow-y-auto
              rounded-2xl
              scrollbar-thin

              sm:max-h-[calc(100vh-64px)]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <AuthPage
              onClose={() =>
                setIsLoginCard(false)
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

