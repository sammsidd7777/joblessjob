import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative flex h-7 w-14 items-center rounded-full
      bg-gray-300 p-[3px] transition-all duration-300
      hover:scale-105 dark:bg-gray-700"
    >
      <div
        className={`absolute left-[3px] top-[3px] flex h-6 w-6
        items-center justify-center rounded-full bg-white shadow-md
        transition-transform duration-300 dark:bg-gray-900
        ${theme === "dark" ? "translate-x-7" : ""}`}
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-yellow-400" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;