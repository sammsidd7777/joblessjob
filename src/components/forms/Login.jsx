import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useLoginUserMutation } from "../../RTK/AuthService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // MESSAGE HELPER
  // =====================================================

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const onSubmit = async (data) => {
    setMessage("");

    try {
      const res = await loginUser(data).unwrap();

      const user = res?.user;
      const token = res?.token;

      console.log("Login user:", user);

      if (!user) {
        showMessage("Unable to login. User information is missing.");
        return;
      }

      // =================================================
      // SAVE LOGIN CREDENTIALS
      // =================================================

      dispatch(
        setCredentials({
          user,
          token,
        })
      );

      // =================================================
      // ADMIN
      // =================================================

      if (user.role === "admin") {
        showMessage(
          "Admin login successful. Opening dashboard...",
          "success"
        );

        if (onClose) {
          onClose();
        }

        setTimeout(() => {
          navigate("/admin", {
            replace: true,
          });
        }, 300);

        return;
      }

      // =================================================
      // HR / RECRUITER
      // =================================================

      if (user.role === "hr") {
        showMessage(
          "HR accounts are coming soon. For now, JoblessJob is focused on job seekers 🚀",
          "info"
        );

        return;
      }

      // =================================================
      // JOB SEEKER
      // =================================================

      if (onClose) {
        onClose();
      }

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      console.error("Login error:", err);

      showMessage(
        err?.data?.message ||
          err?.error ||
          err?.message ||
          "Wrong email or password. Give it another shot."
      );
    }
  };

  return (
    <div className="w-full">

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message && (
        <div
          className={`
            mb-5
            rounded-2xl
            border
            px-4
            py-3
            text-center
            text-sm
            font-medium

            ${
              messageType === "success"
                ? `
                  border-emerald-200
                  bg-emerald-50
                  text-emerald-600

                  dark:border-emerald-900/50
                  dark:bg-emerald-950/30
                  dark:text-emerald-400
                `
                : messageType === "info"
                ? `
                  border-blue-200
                  bg-blue-50
                  text-blue-600

                  dark:border-blue-900/50
                  dark:bg-blue-950/30
                  dark:text-blue-400
                `
                : `
                  border-red-200
                  bg-red-50
                  text-red-600

                  dark:border-red-900/50
                  dark:bg-red-950/30
                  dark:text-red-400
                `
            }
          `}
        >
          {message}
        </div>
      )}

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* =====================================================
            EMAIL
        ===================================================== */}

        <div>
          <label
            htmlFor="email"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={19}
              strokeWidth={2}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isLoading}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-12
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                disabled:cursor-not-allowed
                disabled:opacity-60

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:bg-slate-800
              "
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* =====================================================
            PASSWORD
        ===================================================== */}

        <div>
          <label
            htmlFor="password"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-300
            "
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={19}
              strokeWidth={2}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={isLoading}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-12
                pr-12
                text-sm
                text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                disabled:cursor-not-allowed
                disabled:opacity-60

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:bg-slate-800
              "
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="
                absolute
                right-3
                top-1/2
                flex
                h-9
                w-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition

                hover:bg-slate-100
                hover:text-slate-700

                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:hover:bg-slate-700
                dark:hover:text-slate-200
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* =====================================================
            LOGIN BUTTON
        ===================================================== */}

        <button
          type="submit"
          disabled={isLoading}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:bg-blue-700
            hover:shadow-xl
            hover:shadow-blue-600/25

            active:scale-[.98]

            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {isLoading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />

              Signing you in...
            </>
          ) : (
            <>
              Welcome back

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </>
          )}
        </button>

        {/* =====================================================
            JOBLESSJOB MESSAGE
        ===================================================== */}

        <div
          className="
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            px-4
            py-3
            text-center

            dark:border-blue-900/40
            dark:bg-blue-950/30
          "
        >
          <p
            className="
              text-xs
              leading-relaxed
              text-blue-700
              dark:text-blue-300
            "
          >
            🚀 JoblessJob is currently focused on{" "}
            <span className="font-semibold">
              helping job seekers find better opportunities.
            </span>
          </p>
        </div>

        {/* =====================================================
            ADMIN / HR INFO
        ===================================================== */}

        <div className="space-y-2 text-center">

          {/* ADMIN */}

          <div
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            <ShieldCheck size={13} />

            <span>
              Admin accounts have dashboard access
            </span>
          </div>

          {/* HR */}

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Hiring teams & recruiters
          </p>

          <span
            className="
              inline-block
              text-xs
              font-semibold
              text-blue-600
              dark:text-blue-400
            "
          >
            Coming soon 👀
          </span>
        </div>

      </form>
    </div>
  );
};

export default Login;