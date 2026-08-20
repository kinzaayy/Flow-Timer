export default function DurationInput({ mode, durations, isRunning, onSetDuration }) {
  const currentMinutes = Math.round(durations[mode] / 60);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    onSetDuration(mode, value);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <label htmlFor="duration-minutes">Duration (min):</label>
      <input
        id="duration-minutes"
        type="number"
        min={1}
        max={120}
        value={currentMinutes}
        onChange={handleChange}
        disabled={isRunning}
        className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-center text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
      />
    </div>
  );
}