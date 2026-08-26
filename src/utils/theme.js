const STORAGE_KEY = "flowtimer-theme-mode";
export const DEFAULT_THEME_MODE = "light";

/**
 * Reads the saved theme mode: "light", "dark", or "system".
 * Defaults to "light" if nothing saved, storage is inaccessible,
 * or the saved value isn't one of the three valid modes.
 */
export function loadThemeMode() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
    return DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

/**
 * Saves the theme mode.
 */
export function saveThemeMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently.
  }
}

/**
 * Resolves a theme mode to an actual light/dark boolean.
 * "system" reads the OS-level color scheme preference.
 */
export function resolveIsDark(themeMode) {
  if (themeMode === "dark") return true;
  if (themeMode === "light") return false;
  // "system"
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}