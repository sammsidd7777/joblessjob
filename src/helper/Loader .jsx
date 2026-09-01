import { useEffect, useState } from "react";

const Loader = ({ message = "Finding your next job..." }) => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("> initializing_joblessjob...");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const statuses = [
      "> initializing_joblessjob...",
      "> searching_opportunities...",
      "> matching_your_skills...",
      "> checking_it_jobs...",
      "> opportunity_found ✓",
    ];

    let statusIndex = 0;

    const statusInterval = setInterval(() => {
      statusIndex = Math.min(statusIndex + 1, statuses.length - 1);
      setStatus(statuses[statusIndex]);
    }, 550);

    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        const step =
          prev < 40 ? 5 : prev < 75 ? 3 : prev < 95 ? 2 : 1;

        return Math.min(prev + step, 100);
      });
    }, 80);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2300);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#08090D]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute left-1/2 top-1/2
            h-[420px] w-[420px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-purple-600/10
            blur-[120px]
            animate-pulse
          "
        />

        <div
          className="
            absolute left-[30%] top-[35%]
            h-[180px] w-[180px]
            rounded-full
            bg-cyan-400/5
            blur-[80px]
          "
        />
      </div>

      {/* Main */}
      <div className="relative flex w-[320px] flex-col items-center">
        {/* Logo container */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Outer gradient ring */}
          <div
            className="
              absolute inset-0
              rounded-[34px]
              bg-gradient-to-r
              from-purple-500
              via-blue-500
              to-cyan-400
              animate-spin
            "
            style={{
              animationDuration: "3s",
            }}
          />

          {/* Inner dark background */}
          <div
            className="
              absolute inset-[3px]
              rounded-[31px]
              bg-[#08090D]
            "
          />

          {/* Logo */}
          <img
            src="./favicon.png"
            alt="JoblessJob"
            className="
              relative
              h-[86px]
              w-[86px]
              object-contain
              drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]
              animate-[logoFloat_2s_ease-in-out_infinite]
            "
          />

          {/* Pulse ring */}
          <div
            className="
              pointer-events-none
              absolute inset-[-10px]
              rounded-[42px]
              border border-cyan-400/20
              animate-ping
            "
            style={{
              animationDuration: "2s",
            }}
          />
        </div>

        {/* Brand */}
        <div className="mt-7 text-center">
          <h1
            className="
              text-[25px]
              font-bold
              tracking-[0.08em]
              text-white
            "
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            JOBLESS
            <span className="text-cyan-400">JOB</span>
          </h1>

          <div
            className="
              mt-1
              text-[11px]
              font-medium
              tracking-[0.18em]
              text-gray-500
            "
          >
            FROM JOBLESS TO HIRED
          </div>
        </div>

        {/* Terminal status */}
        <div
          className="
            mt-7
            w-full
            rounded-xl
            border border-white/[0.07]
            bg-white/[0.03]
            px-4
            py-3
            shadow-2xl
          "
        >
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
          </div>

          <div
            className="
              flex
              min-h-[18px]
              items-center
              text-[10px]
              text-cyan-400
            "
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <span>{status}</span>

            <span className="ml-1 animate-pulse">_</span>
          </div>
        </div>

        {/* Message */}
        <p
          className="
            mt-4
            text-center
            text-xs
            text-gray-500
          "
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {message}
        </p>

        {/* Progress */}
        <div className="mt-6 w-full">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-gray-600
              "
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Loading
            </span>

            <span
              className="
                text-[10px]
                font-medium
                text-cyan-400
              "
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {percent}%
            </span>
          </div>

          {/* Progress background */}
          <div
            className="
              h-[3px]
              w-full
              overflow-hidden
              rounded-full
              bg-white/[0.07]
            "
          >
            {/* Progress */}
            <div
              className="
                relative
                h-full
                rounded-full
                bg-gradient-to-r
                from-purple-500
                via-blue-500
                to-cyan-400
                transition-all
                duration-150
                ease-linear
              "
              style={{
                width: `${percent}%`,
              }}
            >
              {/* Moving shine */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-16
                  bg-white/40
                  blur-sm
                  animate-pulse
                "
              />
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-5 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-green-400
                opacity-50
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2
                w-2
                rounded-full
                bg-green-400
              "
            />
          </span>

          <span
            className="
              text-[9px]
              tracking-[0.12em]
              text-gray-600
            "
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            SYSTEM READY
          </span>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes logoFloat {
          0% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-5px) scale(1.03);
          }

          100% {
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;