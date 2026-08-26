const THEME_OPTIONS = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${
          checked ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsModal({
  themeMode,
  onSetThemeMode,
  soundEnabled,
  onSetSoundEnabled,
  notificationsEnabled,
  onSetNotificationsEnabled,
  confirmBeforeSwitch,
  onSetConfirmBeforeSwitch,
  onResetSessionsToday,
  onRestoreDefaults,
  onClose,
}) {
  const handleResetSessions = () => {
    if (window.confirm("Reset today's session count to 0?")) {
      onResetSessionsToday();
    }
  };

  const handleRestoreDefaults = () => {
    if (
      window.confirm(
        "Restore all settings to their defaults? This won't affect timer durations or session history."
      )
    ) {
      onRestoreDefaults();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-card shadow-lg border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Settings
          </h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Theme</p>
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-700 rounded-full p-1">
            {THEME_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onSetThemeMode(key)}
                className={`flex-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  themeMode === key
                    ? "bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ToggleRow
            label="Sound"
            checked={soundEnabled}
            onChange={onSetSoundEnabled}
          />
          <ToggleRow
            label="Desktop Notifications"
            checked={notificationsEnabled}
            onChange={onSetNotificationsEnabled}
          />
          <ToggleRow
            label="Confirm Before Switching Modes"
            checked={confirmBeforeSwitch}
            onChange={onSetConfirmBeforeSwitch}
          />
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={handleResetSessions}
            className="text-sm text-left text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
          >
            Reset Today's Sessions
          </button>
          <button
            onClick={handleRestoreDefaults}
            className="text-sm text-left text-slate-500 dark:text-slate-400 hover:text-red-500"
          >
            Restore Default Settings
          </button>
        </div>
      </div>
    </div>
  );
}