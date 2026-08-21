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

export default function StatsView({ history, onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-card shadow-sm border border-slate-100 p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700">
            Last 7 Days
          </h1>
          <button
            onClick={onBack}
            className="text-sm text-brand-600 font-medium hover:text-brand-700"
          >
            ← Back
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {history.map(({ date, count }) => (
            <li
              key={date}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50"
            >
              <span className="text-sm text-slate-600">
                {formatDateLabel(date)}
              </span>
              <span className="text-sm font-semibold text-brand-600">
                {count} {count === 1 ? "session" : "sessions"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}