const STORAGE_KEY = "flowtimer-sessions-history";
const HISTORY_DAYS_TO_KEEP = 7;

/**
 * Returns today's date as "YYYY-MM-DD", used as the key for each day's count.
 */
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Reads the full history map ({ "YYYY-MM-DD": count, ... }) from Local
 * Storage. Returns an empty object if missing or corrupt.
 */
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    // Corrupt or inaccessible storage — fail safe to an empty history
    return {};
  }
}

/**
 * Saves the history map, pruning any day older than HISTORY_DAYS_TO_KEEP
 * so storage doesn't grow forever.
 */
function saveHistory(history) {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - HISTORY_DAYS_TO_KEEP);

    const pruned = Object.fromEntries(
      Object.entries(history).filter(([date]) => new Date(date) >= cutoff)
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently,
    // the app still works, it just won't persist across reloads.
  }
}

/**
 * Returns today's completed session count from the history map.
 * If today has no entry yet, returns 0.
 */
export function loadSessionsCompleted() {
  const history = loadHistory();
  const todayCount = history[getTodayKey()];
  return typeof todayCount === "number" ? todayCount : 0;
}

/**
 * Updates today's entry in the history map with the given count.
 */
export function saveSessionsCompleted(count) {
  const history = loadHistory();
  history[getTodayKey()] = count;
  saveHistory(history);
}

/**
 * Resets today's session count to 0. Only affects today's entry —
 * past days in the 7-day history are left untouched.
 */
export function resetTodaysSessions() {
  saveSessionsCompleted(0);
}

/**
 * Returns the last N days (oldest first) as an array of
 * { date, count } objects, including days with no sessions (count: 0).
 * Useful for rendering a stats list without gaps.
 */
export function getRecentHistory(days = HISTORY_DAYS_TO_KEEP) {
  const history = loadHistory();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];

    result.push({
      date: key,
      count: typeof history[key] === "number" ? history[key] : 0,
    });
  }

  return result;
}