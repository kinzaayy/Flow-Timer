import { useState, useEffect } from "react";
import { usePomodoro } from "./hooks/usePomodoro";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";
import ModeSelector from "./components/ModeSelector";
import SessionCounter from "./components/SessionCounter";
import DurationInput from "./components/DurationInput";
import StatsView from "./components/StatsView";
import SettingsModal from "./components/SettingsModal";
import { getRecentHistory } from "./utils/dailySessions";
import { loadThemeMode, saveThemeMode, resolveIsDark } from "./utils/theme";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "./utils/settings";

export default function App() {
  const [view, setView] = useState("timer");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [themeMode, setThemeMode] = useState(loadThemeMode);
  const [settings, setSettings] = useState(loadSettings);

  // Resolves themeMode ("light" | "dark" | "system") to an actual
  // light/dark boolean, and applies/removes the "dark" class on <html>.
  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.classList.toggle("dark", resolveIsDark(themeMode));
    };
    applyTheme();
    saveThemeMode(themeMode);

    // If following the system preference, keep it live-updated in case
    // the user changes their OS theme while the app is open.
    if (themeMode === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [themeMode]);

  // Persist the settings object whenever any toggle changes
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

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
    resetSessionsToday,
  } = usePomodoro({
    soundEnabled: settings.soundEnabled,
    notificationsEnabled: settings.notificationsEnabled,
  });

  const handleSwitchMode = (newMode) => {
    if (newMode === mode) return;

    if (isRunning && settings.confirmBeforeSwitch) {
      const confirmed = window.confirm(
        "A session is running. Switching modes will stop and reset it. Continue?"
      );
      if (!confirmed) return;
    }

    switchMode(newMode);
  };

  const handleRestoreDefaults = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    setThemeMode("light");
  };

  const settingsModal = isSettingsOpen && (
    <SettingsModal
      themeMode={themeMode}
      onSetThemeMode={setThemeMode}
      soundEnabled={settings.soundEnabled}
      onSetSoundEnabled={(value) =>
        setSettings((prev) => ({ ...prev, soundEnabled: value }))
      }
      notificationsEnabled={settings.notificationsEnabled}
      onSetNotificationsEnabled={(value) =>
        setSettings((prev) => ({ ...prev, notificationsEnabled: value }))
      }
      confirmBeforeSwitch={settings.confirmBeforeSwitch}
      onSetConfirmBeforeSwitch={(value) =>
        setSettings((prev) => ({ ...prev, confirmBeforeSwitch: value }))
      }
      onResetSessionsToday={resetSessionsToday}
      onRestoreDefaults={handleRestoreDefaults}
      onClose={() => setIsSettingsOpen(false)}
    />
  );

  if (view === "stats") {
    return (
      <>
        <StatsView
          history={getRecentHistory()}
          onBack={() => setView("timer")}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        {settingsModal}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors">
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-card shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center gap-8 transition-colors">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Flow<span className="text-brand-600 dark:text-brand-400">Timer</span>
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                aria-label="Open settings"
                className="text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
              >
                ⚙️
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
      {settingsModal}
    </>
  );
}