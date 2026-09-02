export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

export function toggleTheme() {
  const nextTheme: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  applyTheme(nextTheme);
}
