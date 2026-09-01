import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import {
  useLogoutUserMutation,
} from "../RTK/AuthService";

import HRSidebar from "../components/hr/HRSidebar";

const HRLayout = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        text-slate-900
        dark:bg-gray-950
        dark:text-white
      "
    >

      {/* ================= MOBILE OVERLAY ================= */}

      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed inset-0
            z-[90]
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}


      {/* ================= MOBILE HEADER ================= */}

      <header
        className="
          sticky top-0 z-40
          flex h-16
          items-center
          border-b
          border-slate-200
          bg-white/95
          px-4
          backdrop-blur-xl

          dark:border-slate-800
          dark:bg-slate-900/95

          lg:hidden
        "
      >

        {/* Logo / Title */}

        <div className="flex items-center gap-3">

          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              bg-purple-600
              text-sm
              font-bold
              text-white
            "
          >
            JH
          </div>

          <div>
            <h1 className="text-sm font-bold">
              Job<span className="text-purple-600">Hunter</span>
            </h1>

            <p className="text-[10px] text-slate-400">
              HR Portal
            </p>
          </div>

        </div>


        {/* Menu - RIGHT */}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="
            ml-auto
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            shadow-sm
            transition

            hover:border-purple-500
            hover:bg-purple-50
            hover:text-purple-600

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            dark:hover:bg-slate-800
          "
          aria-label="Open menu"
        >
          <Menu size={23} />
        </button>

      </header>


      {/* ================= MAIN LAYOUT ================= */}

      <div className="lg:flex">


        {/* ================= SIDEBAR ================= */}

        <HRSidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          handleLogout={logoutUser}
          isLoading={isLoading}
        />


        {/* ================= MAIN CONTENT ================= */}

        <main
          className="
            min-w-0
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:min-h-screen
            lg:p-8
          "
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default HRLayout;