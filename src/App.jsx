import { useState, useEffect } from "react";
import { usePomodoro } from "./hooks/usePomodoro";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import ModeSelector from "./components/ModeSelector";
import SessionCounter from "./components/SessionCounter";
import DurationInput from "./components/DurationInput";
import StatsView from "./components/StatsView";
import { getRecentHistory } from "./utils/dailySessions";

export default function App() {
  const [view, setView] = useState("timer");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Applies/removes the "dark" class on <html>, which Tailwind's
  // dark: variants key off of. Not persisted yet — resets on reload.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const {
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
  } = usePomodoro();

  const handleSwitchMode = (newMode) => {
    if (newMode === mode) return;

    if (isRunning) {
      const confirmed = window.confirm(
        "A session is running. Switching modes will stop and reset it. Continue?"
      );
      if (!confirmed) return;
    }

    switchMode(newMode);
  };

  if (view === "stats") {
    return (
      <StatsView
        history={getRecentHistory()}
        onBack={() => setView("timer")}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-card shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center gap-8 transition-colors">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Flow<span className="text-brand-600 dark:text-brand-400">Timer</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setView("stats")}
              className="text-sm text-slate-400 dark:text-slate-500 font-medium hover:text-brand-600 dark:hover:text-brand-400"
            >
              Stats
            </button>
          </div>
        </div>

        <ModeSelector mode={mode} onSwitchMode={handleSwitchMode} />

        <DurationInput
          mode={mode}
          durations={durations}
          isRunning={isRunning}
          onSetDuration={setDuration}
        />

        <TimerDisplay secondsLeft={secondsLeft} />

        <Controls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />

        <SessionCounter count={sessionsCompleted} focusStreak={focusStreak} />
      </div>
    </div>
  );
}