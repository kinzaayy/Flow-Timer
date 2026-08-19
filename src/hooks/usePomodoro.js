import { useState, useEffect, useRef, useCallback } from "react";

const DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
};

/**
 * Owns all state and logic for the Pomodoro timer:
 * - which mode is active (focus / shortBreak)
 * - how much time is left
 * - whether the timer is running
 * - how many focus sessions were completed today
 *
 * Components just read this state and call the returned actions.
 */
export function usePomodoro() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

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

    if (mode === "focus") {
      setSessionsCompleted((prev) => prev + 1);
      switchMode("shortBreak");
    } else {
      switchMode("focus");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(DURATIONS[mode]);
  }, [mode]);

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(DURATIONS[newMode]);
  }, []);

  return {
    mode,
    secondsLeft,
    isRunning,
    sessionsCompleted,
    start,
    pause,
    reset,
    switchMode,
  };
}