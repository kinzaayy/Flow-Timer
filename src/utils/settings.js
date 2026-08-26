const STORAGE_KEY = "flowtimer-settings";

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  notificationsEnabled: true,
  confirmBeforeSwitch: true,
};

/**
 * Reads saved settings, merged over the defaults so a missing or
 * partially-corrupt entry still yields valid booleans for every key.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };

    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Saves the full settings object.
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently.
  }
}