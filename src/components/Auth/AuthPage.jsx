import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Clock3 } from "lucide-react";

import Login from "../forms/Login";
import Register from "../forms/Register";

const AuthPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <div
      className="
        relative w-full max-w-md
        max-h-[90vh] overflow-y-auto
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-2xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* CLOSE */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="
          absolute right-3 top-3 z-20
          flex h-8 w-8 items-center justify-center
          rounded-lg
          text-slate-400
          hover:bg-slate-100
          hover:text-slate-700
          dark:hover:bg-slate-800
          dark:hover:text-white
        "
      >
        <IoClose size={20} />
      </button>

      <div className="p-5 sm:p-6">

        {/* HEADER */}
        <div className="mb-5 pr-8">
         <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
  {isLogin
    ? "Good to see you again 👋"
    : "Let's get you hired 🚀"}
</h2>

<p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
  {isLogin
    ? "Pick up where you left off."
    : "Create your account and start finding jobs that fit you."}
</p>
        </div>

       

        {/* LOGIN / REGISTER */}
        <div className="mb-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`rounded-md py-2 text-sm font-semibold transition ${
              isLogin
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-500"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`rounded-md py-2 text-sm font-semibold transition ${
              !isLogin
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* FORM */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
            >
              <Login onClose={onClose} />

              <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Start your job hunt 🚀
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
            >
              <Register
                changeTologin={handleRegisterSuccess}
              />

              <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Welcome back 👋
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

    
      </div>
    </div>
  );
};

export default AuthPage;