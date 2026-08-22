function formatDateLabel(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  if (dateStr === todayStr) return "Today";

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function StatsView({ history, onBack, isDarkMode, onToggleDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-card shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col gap-6 transition-colors">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Last 7 Days
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
              className="text-sm text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={onBack}
              className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300"
            >
              ← Back
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {history.map(({ date, count }) => (
            <li
              key={date}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700"
            >
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {formatDateLabel(date)}
              </span>
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                {count} {count === 1 ? "session" : "sessions"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}