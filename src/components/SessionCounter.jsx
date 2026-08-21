export default function SessionCounter({ count, focusStreak }) {
  return (
    <div className="text-center space-y-3">
      <div>
        <p className="text-sm text-slate-400 font-medium">Today's Sessions</p>
        <p className="text-2xl font-semibold text-brand-600">{count}</p>
      </div>
      <p className="text-xs text-slate-400">
        {focusStreak} / 4 focus sessions until long break
      </p>
    </div>
  );
}