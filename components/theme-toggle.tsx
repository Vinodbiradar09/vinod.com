"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme: Theme = root.classList.contains("dark") ? "light" : "dark";

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative -mt-[7px] grid size-[34px] cursor-pointer place-items-center rounded-full border border-rule-strong bg-surface text-muted shadow-[0_2px_8px_rgb(0_0_0/5%)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:rotate-[5deg] hover:scale-105 hover:text-ink hover:shadow-[0_5px_16px_rgb(0_0_0/8%)] active:scale-95 active:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <MoonIcon className="absolute size-4 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] dark:rotate-45 dark:scale-75 dark:opacity-0" />
      <SunIcon className="absolute size-4 -rotate-45 scale-75 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] dark:rotate-0 dark:scale-100 dark:opacity-100" />
    </button>
  );
}
