import { useState } from "react";
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
      <StatsView history={getRecentHistory()} onBack={() => setView("timer")} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-card shadow-sm border border-slate-100 p-8 flex flex-col items-center gap-8">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700">
            Flow<span className="text-brand-600">Timer</span>
          </h1>
          <button
            onClick={() => setView("stats")}
            className="text-sm text-slate-400 font-medium hover:text-brand-600"
          >
            Stats
          </button>
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