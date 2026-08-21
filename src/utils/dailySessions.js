const STORAGE_KEY = "flowtimer-sessions";

/**
 * Returns today's date as "YYYY-MM-DD", used to detect day changes.
 */
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Reads the saved session count from Local Storage.
 * If the saved data is from a previous day (or missing/corrupt), returns 0.
 */
export function loadSessionsCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;

    const { date, count } = JSON.parse(raw);
    if (date !== getTodayKey()) return 0;

    return typeof count === "number" ? count : 0;
  } catch {
    // Corrupt or inaccessible storage — fail safe to 0 rather than crash the app
    return 0;
  }
}

/**
 * Saves the current session count, tagged with today's date.
 */
export function saveSessionsCompleted(count) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), count })
    );
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently,
    // the app still works, it just won't persist across reloads.
  }
}