import { formatTime } from "../utils/formatTime";

export default function TimerDisplay({ secondsLeft }) {
  return (
    <div className="text-7xl font-bold text-slate-800 tracking-tight tabular-nums">
      {formatTime(secondsLeft)}
    </div>
  );
}