import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

import { useRegisterUserMutation } from "../../RTK/AuthService";

const Register = ({ changeTologin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "user",
    },
  });

  const [registerUser, { isLoading }] =
    useRegisterUserMutation();

  // =====================================================
  // CREATE ACCOUNT
  // =====================================================

  const onSubmit = async (data) => {
    try {
      // JoblessJob currently supports Job Seekers only
      const registrationData = {
        ...data,
        role: "user",
      };

      await registerUser(registrationData).unwrap();

      alert("Account created! Welcome to the job hunt 🚀");

      changeTologin();
    } catch (err) {
      console.error("Registration failed:", err);

      alert(
        err?.data?.message ||
          err?.error ||
          "Couldn't create your account. Please try again."
      );
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* =====================================================
            FULL NAME
        ====================================================== */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Your Name
          </label>

          <div className="relative">
            <User
              size={19}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              {...register("name", {
                required: "We need your name 👀",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="What should we call you?"
              autoComplete="name"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-12 pr-4
                text-sm text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:bg-slate-800
              "
            />
          </div>

          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* =====================================================
            EMAIL
        ====================================================== */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Your Email
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="email"
              {...register("email", {
                required: "We need your email 👀",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "That email doesn't look right",
                },
              })}
              placeholder="you@example.com"
              autoComplete="email"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-12 pr-4
                text-sm text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:bg-slate-800
              "
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
        ====================================================== */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Create a Password
          </label>

          <div className="relative">
            <Lock
              size={19}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "You'll need a password 🔐",
                minLength: {
                  value: 6,
                  message:
                    "Password needs at least 6 characters",
                },
              })}
              placeholder="Make it a good one"
              autoComplete="new-password"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-12 pr-12
                text-sm text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:bg-slate-800
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="
                absolute right-3 top-1/2
                flex h-8 w-8
                -translate-y-1/2
                items-center justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-slate-200
                hover:text-slate-600

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
            WHAT ARE YOU HERE FOR?
        ====================================================== */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            What brings you here?
          </label>

          {/* =================================================
              JOB SEEKER — ACTIVE
          ================================================= */}

          <div
            className="
              relative
              flex items-center gap-3
              rounded-xl
              border-2
              border-blue-500
              bg-blue-50
              px-4 py-3

              dark:border-blue-500
              dark:bg-blue-950/30
            "
          >
            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-600
                text-white
              "
            >
              <BriefcaseBusiness size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                I'm looking for a job 🚀
              </p>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Find opportunities and make your next move.
              </p>
            </div>

            <CheckCircle2
              size={20}
              className="shrink-0 text-blue-600"
            />
          </div>

          {/* =================================================
              HR — COMING SOON
          ================================================= */}

        

          {/* Hidden role */}
          <input
            type="hidden"
            value="user"
            {...register("role")}
          />
        </div>

        {/* =====================================================
            CREATE ACCOUNT BUTTON
        ====================================================== */}

        <button
          type="submit"
          disabled={isLoading}
          className="
            group
            flex w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-3.5
            text-sm
            font-semibold
            text-white

            shadow-lg
            shadow-blue-500/20

            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-blue-500/25

            active:translate-y-0

            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {isLoading ? (
            <>
              <span
                className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />

              Starting Your Hunt...
            </>
          ) : (
            <>
              Start My Job Hunt
              <span className="transition-transform group-hover:translate-x-0.5">
                🚀
              </span>
            </>
          )}
        </button>

        {/* =====================================================
            TERMS
        ====================================================== */}

        <p className="text-center text-[11px] leading-5 text-slate-400 dark:text-slate-500">
          By joining JoblessJob, you agree to our{" "}
          <span className="font-medium text-slate-500 dark:text-slate-400">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-slate-500 dark:text-slate-400">
            Privacy Policy
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default Register;