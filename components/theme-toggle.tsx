"use client";

import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative -mt-0.5 h-6 w-8 cursor-pointer text-xs leading-5 font-medium text-muted transition-colors duration-200 after:absolute after:right-0 after:bottom-0.5 after:left-0 after:border-b after:border-dotted after:border-current after:opacity-55 after:transition-[opacity,transform] after:duration-200 after:ease-out hover:text-ink hover:after:scale-x-75 hover:after:opacity-100 active:translate-y-px focus-visible:rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      aria-label="Change color theme"
      title="Change color theme"
    >
      <span aria-hidden="true" className="dark:hidden">
        Dark
      </span>
      <span aria-hidden="true" className="hidden dark:inline">
        Light
      </span>
    </button>
  );
}
