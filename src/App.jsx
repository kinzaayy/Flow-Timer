import { usePomodoro } from "./hooks/usePomodoro";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import ModeSelector from "./components/ModeSelector";
import SessionCounter from "./components/SessionCounter";

export default function App() {
  const {
    mode,
    secondsLeft,
    isRunning,
    sessionsCompleted,
    start,
    pause,
    reset,
    switchMode,
  } = usePomodoro();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-card shadow-sm border border-slate-100 p-8 flex flex-col items-center gap-8">
        <h1 className="text-lg font-semibold text-slate-700">
          Flow<span className="text-brand-600">Timer</span>
        </h1>

        <ModeSelector mode={mode} onSwitchMode={switchMode} />

        <TimerDisplay secondsLeft={secondsLeft} />

        <Controls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
        />

        <SessionCounter count={sessionsCompleted} />
      </div>
    </div>
  );
}