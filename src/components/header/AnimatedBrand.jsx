import React, { useEffect, useState } from "react";

const words = ["Job", "Jobless", "JoblessJob"];

const AnimatedBrand = ({ className = "" }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const currentWord = words[wordIndex];

    // -----------------------------------------
    // TYPING
    // -----------------------------------------
    if (phase === "typing") {
      if (visibleText.length < currentWord.length) {
        const timer = setTimeout(() => {
          setVisibleText(
            currentWord.slice(0, visibleText.length + 1)
          );
        }, 90);

        return () => clearTimeout(timer);
      }

      // Word complete
      const timer = setTimeout(() => {
        setPhase(
          wordIndex === words.length - 1
            ? "complete"
            : "pause"
        );
      }, wordIndex === words.length - 1 ? 1800 : 700);

      return () => clearTimeout(timer);
    }

    // -----------------------------------------
    // PAUSE
    // -----------------------------------------
    if (phase === "pause") {
      const timer = setTimeout(() => {
        setVisibleText("");
        setWordIndex((prev) => prev + 1);
        setPhase("typing");
      }, 250);

      return () => clearTimeout(timer);
    }

    // -----------------------------------------
    // FINAL WORD
    // -----------------------------------------
    if (phase === "complete") {
      const timer = setTimeout(() => {
        setVisibleText("");
        setWordIndex(0);
        setPhase("typing");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visibleText, wordIndex, phase]);

  const isFinalWord = wordIndex === 2;

  return (
    <span
      className={`
        inline-flex
        min-w-[82px]
        items-center
        ${className}
      `}
      aria-label="JoblessJob"
    >
      <span
        className={`
          inline-block
          whitespace-nowrap
          transition-all
          duration-300
          ${
            phase === "typing" && visibleText
              ? "opacity-100 blur-0 translate-y-0"
              : ""
          }
        `}
      >
        {visibleText}
      </span>

      {/* Cursor */}
      {phase !== "complete" && (
        <span
          aria-hidden="true"
          className="
            ml-0.5
            inline-block
            h-[1.05em]
            w-[2px]
            rounded-full
            bg-violet-400
            animate-[brandCursor_0.8s_ease-in-out_infinite]
          "
        />
      )}

      <style>
        {`
          @keyframes brandCursor {
            0%, 45% {
              opacity: 1;
            }

            46%, 100% {
              opacity: 0;
            }
          }
        `}
      </style>
    </span>
  );
};

export default AnimatedBrand;