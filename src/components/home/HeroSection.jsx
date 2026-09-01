import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const locations = [
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Pune, India",
  "Remote",
];

const HeroSection = () => {
  const navigate = useNavigate();
  const locationRef = useRef(null);

  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Delhi, India");
  const [locationOpen, setLocationOpen] = useState(false);

  const messages = [
    {
      text: "BETA, JOB LAGI?",
      emoji: "💀",
      type: "question",
    },
    {
      text: "We know you're tired of hearing it.",
      emoji: "",
      type: "normal",
    },
    {
      text: "So let's find you something worth saying",
      emoji: "",
      type: "final",
    },
  ];

  const current = messages[messageIndex];

  /* ============================================================
     TYPEWRITER
  ============================================================ */

  useEffect(() => {
    let timer;

    const typingSpeed = messageIndex === 0 ? 85 : 45;
    const deletingSpeed = 30;

    if (phase === "typing") {
      if (text.length < current.text.length) {
        timer = setTimeout(() => {
          setText(current.text.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          if (messageIndex === messages.length - 1) {
            setPhase("finished");
          } else {
            setPhase("pause");
          }
        }, messageIndex === 0 ? 1800 : 1400);
      }
    }

    if (phase === "pause") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, 100);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setMessageIndex((prev) => prev + 1);
          setPhase("typing");
        }, 450);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, messageIndex, current.text]);

  /* ============================================================
     OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ============================================================
     SEARCH
  ============================================================ */

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    if (location) {
      params.set("location", location);
    }

    navigate(`/find-job?${params.toString()}`);
  };

  return (
    <section
      className="
        relative
        isolate
        min-h-[calc(90vh-72px)]
        max-h-[calc(100vh-72px)]

        overflow-hidden
        bg-[#f7f7f3]
        text-slate-950
        dark:bg-[#06070a]
        dark:text-white
      "
    >
      {/* ==========================================================
          BACKGROUND
      =========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Purple ambient glow */}

        <div
          className="
            absolute
            left-1/2
            top-[-18rem]
            h-[40rem]
            w-[40rem]
            -translate-x-1/2
            rounded-full
            bg-violet-500/15
            blur-[150px]
          "
        />

        {/* Cyan glow */}

        <div
          className="
            hero-floating-glow
            absolute
            right-[-15rem]
            top-[25%]
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-cyan-400/10
            blur-[140px]
          "
        />

        {/* Lime glow */}

        <div
          className="
            absolute
            bottom-[-18rem]
            left-[-15rem]
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-lime-300/10
            blur-[140px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            dark:opacity-[0.045]
            [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]
            [background-size:55px_55px]
            dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          "
        />

        {/* Floating dots */}

        <span className="absolute left-[8%] top-[28%] h-2 w-2 rounded-full bg-violet-500 animate-pulse" />

        <span className="absolute right-[9%] top-[36%] h-2 w-2 rounded-full bg-cyan-400 animate-ping" />

        <span className="absolute bottom-[20%] left-[18%] h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />

      </div>

      {/* ==========================================================
          CONTENT
      =========================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-72px)]
          max-w-7xl
          flex-col
          items-center
          px-4
          pb-16
          pt-16
          sm:px-6
          sm:pt-20
          lg:px-8
          lg:pt-24
        "
      >

        {/* ========================================================
            BRAND LABEL
        ========================================================= */}

    

        {/* ========================================================
            STATUS
        ========================================================= */}

        <div
          className="
            mb-8
            flex
            items-center
            gap-2
            rounded-full
            border
            border-slate-900/10
            bg-white/60
            px-3
            py-1.5
            backdrop-blur
            dark:border-white/10
            dark:bg-white/[0.04]
          "
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>

          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            Status: Looking
          </span>
        </div>

        {/* ========================================================
            CINEMATIC TEXT
        ========================================================= */}

        <div
          className="
            relative
            flex
            min-h-[260px]
            w-full
            items-center
            justify-center
            text-center
            sm:min-h-[300px]
            lg:min-h-[340px]
          "
        >

          <div
            key={messageIndex}
            className={`
              hero-text-enter
              relative
              ${
                current.type === "question"
                  ? "text-[clamp(3.2rem,9vw,8rem)] font-black tracking-[-0.08em]"
                  : current.type === "normal"
                  ? "max-w-4xl text-[clamp(2.3rem,6vw,5.5rem)] font-bold tracking-[-0.06em]"
                  : "max-w-5xl text-[clamp(2.3rem,6.2vw,5.8rem)] font-black tracking-[-0.07em]"
              }
              leading-[0.92]
            `}
          >
            {current.type === "final" ? (
              <>
                <span>{text}</span>

                {/* YES highlight */}
                {text.includes("saying") && (
                  <span
                    className="
                      relative
                      ml-2
                      inline-block
                      hero-yes
                      bg-lime-300
                      px-3
                      py-1
                      text-slate-950
                      shadow-[6px_6px_0_#111827]
                      dark:shadow-[6px_6px_0_#ffffff]
                    "
                  >
                    YES.
                  </span>
                )}

                <span className="ml-2 inline-block">
                  🚀
                </span>
              </>
            ) : (
              <>
                <span>{text}</span>

                {current.emoji && (
                  <span
                    className="
                      ml-2
                      inline-block
                      hero-emoji
                    "
                  >
                    {current.emoji}
                  </span>
                )}
              </>
            )}

            {/* Typewriter cursor */}

            {phase !== "finished" && (
              <span
                className="
                  ml-1
                  inline-block
                  h-[0.85em]
                  w-[3px]
                  translate-y-[0.05em]
                  bg-cyan-400
                  animate-pulse
                "
              />
            )}
          </div>
        </div>

        {/* ========================================================
            SUBTEXT
        ========================================================= */}

        <div
          className={`
            mt-2
            text-center
            transition-all
            duration-1000
            ${
              phase === "finished"
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
          `}
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-base">
            Less scrolling. More applying. More chances to say
            <span className="mx-1 font-black text-violet-500">
              YES.
            </span>
          </p>
        </div>

        {/* ========================================================
            SEARCH
        ========================================================= */}

        <div
          className={`
            relative
            z-30
            mt-10
            w-full
            max-w-5xl
            transition-all
            duration-1000
            ${
              phase === "finished"
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          <div
            className="
              rounded-[1.8rem]
              border
              border-slate-900/10
              bg-white/80
              p-2.5
              shadow-[0_30px_80px_rgba(15,23,42,0.13)]
              backdrop-blur-2xl
              dark:border-white/10
              dark:bg-white/[0.06]
              dark:shadow-black/30
            "
          >
            <div className="flex flex-col gap-2.5 lg:flex-row">

              {/* ==================================================
                  KEYWORD
              =================================================== */}

              <div
                className="
                  flex
                  min-h-[66px]
                  flex-1
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  transition-all
                  focus-within:border-violet-400
                  focus-within:bg-white
                  dark:border-white/10
                  dark:bg-slate-900/70
                  dark:focus-within:bg-slate-900
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-100
                    text-violet-600
                    dark:bg-violet-500/10
                    dark:text-violet-400
                  "
                >
                  <Search size={19} />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p
                    className="
                      mb-0.5
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-slate-400
                    "
                  >
                    Looking for
                  </p>

                  <input
                    type="text"
                    value={keyword}
                    onChange={(event) =>
                      setKeyword(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="React, MERN, Designer..."
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      font-bold
                      text-slate-950
                      outline-none
                      placeholder:text-slate-400
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* ==================================================
                  LOCATION
              =================================================== */}

              <div
                ref={locationRef}
                className="
                  relative
                  flex
                  min-h-[66px]
                  flex-1
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  dark:border-white/10
                  dark:bg-slate-900/70
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-100
                    text-cyan-600
                    dark:bg-cyan-500/10
                    dark:text-cyan-400
                  "
                >
                  <MapPin size={19} />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <p
                    className="
                      mb-0.5
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-slate-400
                    "
                  >
                    Location
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setLocationOpen((prev) => !prev)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-2
                      text-sm
                      font-bold
                      text-slate-950
                      dark:text-white
                    "
                  >
                    <span className="truncate">
                      {location}
                    </span>

                    <span
                      className={`
                        text-slate-400
                        transition-transform
                        ${
                          locationOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      ↓
                    </span>
                  </button>
                </div>

                {/* Location dropdown */}

                {locationOpen && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-[74px]
                      z-50
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-2
                      shadow-2xl
                      dark:border-slate-700
                      dark:bg-slate-900
                    "
                  >
                    {locations.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setLocation(item);
                          setLocationOpen(false);
                        }}
                        className="
                          flex
                          w-full
                          rounded-xl
                          px-4
                          py-3
                          text-left
                          text-sm
                          font-bold
                          text-slate-700
                          transition
                          hover:bg-violet-50
                          hover:text-violet-600
                          dark:text-slate-300
                          dark:hover:bg-violet-500/10
                        "
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ==================================================
                  SEARCH BUTTON
              =================================================== */}

              <button
                type="button"
                onClick={handleSearch}
                className="
                  group
                  relative
                  flex
                  min-h-[66px]
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  bg-slate-950
                  px-9
                  text-sm
                  font-black
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-violet-600
                  hover:shadow-xl
                  dark:bg-violet-600
                  dark:hover:bg-violet-500
                "
              >
                {/* Shine */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative">
                  Find Jobs
                </span>

                <ArrowUpRight
                  size={19}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            TRUST LINE
        ========================================================= */}

        <div
          className={`
            mt-5
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
            text-[9px]
            font-black
            uppercase
            tracking-[0.16em]
            text-slate-400
            transition-all
            duration-1000
            ${
              phase === "finished"
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        >
          <span>IT Focused</span>

          <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

          <span>Freshers Welcome</span>

          <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

          <span>Built for Job Seekers</span>
        </div>
      </div>

      {/* ==========================================================
          CSS ANIMATIONS
      =========================================================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textEnter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes emojiPop {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-15deg);
          }

          70% {
            transform: scale(1.2) rotate(5deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes yesPunch {
          0% {
            transform: scale(0.7) rotate(-4deg);
            opacity: 0;
          }

          60% {
            transform: scale(1.12) rotate(1deg);
          }

          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }

        @keyframes heroGlow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(-25px, 20px) scale(1.12);
          }
        }

        @keyframes gradientMove {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        .hero-enter {
          opacity: 0;
          animation: fadeUp 0.7s ease-out forwards;
        }

        .hero-text-enter {
          animation: textEnter 0.35s ease-out;
        }

        .hero-emoji {
          animation: emojiPop 0.45s ease-out;
        }

        .hero-yes {
          animation: yesPunch 0.5s cubic-bezier(.22,1,.36,1);
        }

        .hero-floating-glow {
          animation: heroGlow 9s ease-in-out infinite;
        }

        .hero-gradient-text {
          background-image: linear-gradient(
            90deg,
            #7c3aed,
            #2563eb,
            #06b6d4,
            #7c3aed
          );

          background-size: 250% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;

          animation: gradientMove 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;