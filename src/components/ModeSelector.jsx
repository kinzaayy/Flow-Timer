const MODES = [
  { key: "focus", label: "Focus" },
  { key: "shortBreak", label: "Short Break" },
  { key: "longBreak", label: "Long Break" },
];

export default function ModeSelector({ mode, onSwitchMode }) {
  return (
    <div className="flex gap-2 bg-slate-100 dark:bg-slate-700 rounded-full p-1">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitchMode(key)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            mode === key
              ? "bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}