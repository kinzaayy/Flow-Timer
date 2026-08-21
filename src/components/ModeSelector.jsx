const MODES = [
  { key: "focus", label: "Focus" },
  { key: "shortBreak", label: "Short Break" },
  { key: "longBreak", label: "Long Break" },
];

export default function ModeSelector({ mode, onSwitchMode }) {
  return (
    <div className="flex gap-2 bg-slate-100 rounded-full p-1">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitchMode(key)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            mode === key
              ? "bg-white text-brand-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}