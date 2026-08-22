const STORAGE_KEY = "flowtimer-dark-mode";

/**
 * Reads the saved dark mode preference. Defaults to false (light mode)
 * if nothing is saved yet or storage is inaccessible/corrupt.
 */
export function loadDarkModePreference() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === "true";
  } catch {
    return false;
  }
}

/**
 * Saves the dark mode preference.
 */
export function saveDarkModePreference(isDarkMode) {
  try {
    localStorage.setItem(STORAGE_KEY, String(isDarkMode));
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently,
    // the app still works, it just won't remember the preference.
  }
}