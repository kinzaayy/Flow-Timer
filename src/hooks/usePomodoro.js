import { useState, useEffect, useRef, useCallback } from "react";
import { loadSessionsCompleted, saveSessionsCompleted } from "../utils/dailySessions";
import {
  requestNotificationPermission,
  showSessionEndNotification,
} from "../utils/notifications";

const DEFAULT_DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const FOCUS_SESSIONS_BEFORE_LONG_BREAK = 4;

const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 120;

/**
 * Plays a short beep using the Web Audio API.
 * No audio file needed — the sound is generated in the browser.
 */
function playBeep() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContextClass();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = 880; // A5 note

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.5
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

/**
 * Owns all state and logic for the Pomodoro timer:
 * - which mode is active (focus / shortBreak / longBreak)
 * - how much time is left
 * - whether the timer is running
 * - how many focus sessions were completed today (persisted in Local
 *   Storage, and automatically reset to 0 when the date changes)
 * - how many focus sessions have been completed since the last long
 *   break (0–3); the 4th automatically routes to a long break instead
 *   of a short one
 *
 * When a session ends, it plays an audio beep and, if the user has
 * granted permission, shows a desktop notification. Permission is
 * requested the first time the timer is started.
 *
 * Components just read this state and call the returned actions.
 */
export function usePomodoro() {
  const [mode, setMode] = useState("focus");
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(loadSessionsCompleted);
  // Tracks focus sessions completed since the last long break (0-3, resets on long break).
  // Separate from sessionsCompleted, which is the persisted daily total.
  const [focusStreak, setFocusStreak] = useState(0);

  const intervalRef = useRef(null);

  // Tick every second while running
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Handle what happens when the timer hits 0
  useEffect(() => {
    if (secondsLeft > 0) return;

    setIsRunning(false);
    playBeep();
    showSessionEndNotification(mode);

    if (mode === "focus") {
      setSessionsCompleted((prev) => prev + 1);

      const newStreak = focusStreak + 1;
      if (newStreak >= FOCUS_SESSIONS_BEFORE_LONG_BREAK) {
        setFocusStreak(0);
        switchMode("longBreak");
      } else {
        setFocusStreak(newStreak);
        switchMode("shortBreak");
      }
    } else {
      switchMode("focus");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // Persist the session count whenever it changes
  useEffect(() => {
    saveSessionsCompleted(sessionsCompleted);
  }, [sessionsCompleted]);

  const start = useCallback(() => {
    requestNotificationPermission();
    setIsRunning(true);
  }, []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(durations[mode]);
  }, [mode, durations]);

  const switchMode = useCallback(
    (newMode) => {
      setIsRunning(false);
      setMode(newMode);
      setSecondsLeft(durations[newMode]);
    },
    [durations]
  );

  /**
   * Updates the duration for a given mode ("focus", "shortBreak", or "longBreak").
   * Only allowed while the timer isn't running, to avoid confusing an
   * in-progress countdown. Clamps to a sane 1–120 minute range and
   * immediately reflects the new duration if that mode is currently active.
   */
  const setDuration = useCallback(
    (targetMode, minutes) => {
      if (isRunning) return;

      const clampedMinutes = Math.min(
        Math.max(minutes, MIN_DURATION_MINUTES),
        MAX_DURATION_MINUTES
      );
      const newSeconds = clampedMinutes * 60;

      setDurations((prev) => ({ ...prev, [targetMode]: newSeconds }));

      if (targetMode === mode) {
        setSecondsLeft(newSeconds);
      }
    },
    [isRunning, mode]
  );

  return {
    mode,
    durations,
    secondsLeft,
    isRunning,
    sessionsCompleted,
    focusStreak,
    start,
    pause,
    reset,
    switchMode,
    setDuration,
  };
}