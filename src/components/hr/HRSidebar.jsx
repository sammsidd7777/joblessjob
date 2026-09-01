import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Plus,
  BriefcaseBusiness,
  Users,
  MessageCircle,
  Building2,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import logo from "../../../public/favicon.png";

import {
  useLogoutUserMutation,
  useGetProfileQuery,
} from "../../RTK/AuthService";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const HRSidebar = ({ isSidebarOpen, closeSidebar }) => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const { data: user } = useGetProfileQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());

      closeSidebar();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      path: "/hr/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/hr/add-job",
      label: "Add Job",
      icon: Plus,
    },
    {
      path: "/hr/manage-jobs",
      label: "Manage Jobs",
      icon: BriefcaseBusiness,
    },
    {
      path: "/hr/applicants",
      label: "Applicants",
      icon: Users,
    },
    {
      path: "/hr/messages",
      label: "Messages",
      icon: MessageCircle,
    },
    {
      path: "/hr/company",
      label: "Company Profile",
      icon: Building2,
    },
    {
      path: "/hr/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 right-0 z-[100]
        flex w-[290px] flex-col
        overflow-hidden

        bg-gradient-to-b
        from-purple-600
        via-purple-600
        to-indigo-700

        shadow-2xl
        shadow-purple-900/20

        transition-transform
        duration-300
        ease-out

        ${
          isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }

        lg:sticky
        lg:top-0
        lg:h-screen
        lg:translate-x-0
        lg:shadow-none
      `}
    >

      {/* ================= HEADER ================= */}

    <div className="px-5 pt-5">

  {/* MOBILE CLOSE */}
  <div className="mb-4 flex items-center justify-between lg:hidden">
    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
      HR Menu
    </span>

    <button
      onClick={closeSidebar}
      className="
        flex h-9 w-9
        items-center justify-center
        rounded-xl
        bg-white/10
        text-white
        transition
        hover:bg-white/20
      "
    >
      <X size={20} />
    </button>
  </div>

  {/* LOGO */}
  <div
    className="
      mb-8
      flex items-center gap-3
      rounded-2xl
      border border-white/10
      bg-purple-800/50
      p-3
    "
  >
    <div
      className="
        flex h-11 w-11
        shrink-0
        items-center justify-center
        overflow-hidden
        rounded-xl
        bg-white
      "
    >
      <img
        src={logo}
        alt="JoblessJob"
        className="h-9 w-9 object-contain"
      />
    </div>

    <div>
      <h1 className="text-lg font-bold text-white">
        Job<span className="text-purple-200">Hunter</span>
      </h1>

      <p className="text-[11px] text-purple-200/80">
        HR Portal
      </p>
    </div>
  </div>

</div>


      {/* ================= NAVIGATION ================= */}

    <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

  <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
    Workspace
  </p>

  <nav className="space-y-1.5">

    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={closeSidebar}
          className={({ isActive }) => `
            group flex items-center gap-3
            rounded-xl px-3 py-3
            text-sm font-medium
            transition-all duration-200

            ${
              isActive
                ? "bg-white text-purple-700 shadow-lg shadow-purple-900/20"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }
          `}
        >
          {({ isActive }) => (
            <>
              <span
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-lg

                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "bg-white/10 text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </span>

              <span className="flex-1">
                {item.label}
              </span>

              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
              )}
            </>
          )}
        </NavLink>
      );
    })}

  </nav>

</div>


      {/* ================= BOTTOM ================= */}

      <div className="border-t border-white/10 p-4">

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="
            group
            flex w-full
            items-center gap-3
            rounded-xl
            px-3 py-3
            text-sm
            font-medium
            text-white/90
            transition

            hover:bg-white/10
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <span
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              bg-red-500/20
              text-red-200
              transition
              group-hover:bg-red-500/30
            "
          >
            <LogOut size={18} />
          </span>

          <span>
            {isLoading
              ? "Logging out..."
              : "Logout"}
          </span>

        </button>


        <p className="mt-4 text-center text-[10px] text-white/40">
          JoblessJob • HR Portal
        </p>

      </div>

    </aside>
  );
};

export default HRSidebar;