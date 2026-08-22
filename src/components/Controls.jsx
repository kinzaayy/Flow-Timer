export default function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="flex items-center gap-3">
      {isRunning ? (
        <button
          onClick={onPause}
          className="px-6 py-2.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-medium hover:bg-brand-100/80 dark:hover:bg-brand-900/60 transition"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-6 py-2.5 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
        >
          Start
        </button>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition"
      >
        Reset
      </button>
    </div>
  );
}