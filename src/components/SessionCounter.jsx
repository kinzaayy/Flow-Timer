export default function SessionCounter({ count }) {
  return (
    <div className="text-center">
      <p className="text-sm text-slate-400 font-medium">Today's Sessions</p>
      <p className="text-2xl font-semibold text-brand-600">{count}</p>
    </div>
  );
}