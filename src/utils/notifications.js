/**
 * Asks the browser for notification permission, if not already
 * granted or denied. Safe to call repeatedly — the browser only
 * prompts once; subsequent calls are a no-op if already decided.
 */
export function requestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

const NOTIFICATION_MESSAGES = {
  focus: "Focus session complete. Time for a break!",
  shortBreak: "Break's over. Ready to focus again?",
  longBreak: "Long break's over. Ready to focus again?",
};

/**
 * Shows a desktop notification announcing that a session ended.
 * Silently does nothing if notifications aren't supported or
 * permission hasn't been granted — the audio beep still covers
 * that case, so this is a bonus signal, not the only one.
 */
export function showSessionEndNotification(mode) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  new Notification("Flow Timer", {
    body: NOTIFICATION_MESSAGES[mode] || "Session complete.",
  });
}