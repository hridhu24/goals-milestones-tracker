import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar";

export default function GoalCard({ goal }) {
  const navigate = useNavigate();

  const completed = goal.milestones.filter(m => m.status === "completed").length;
  const total = goal.milestones.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div
      onClick={() => navigate(`/goal/${goal.id}`)}
      className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d] dark:text-white cursor-pointer hover:scale-[1.02] transition border-l-4"
      style={{ borderColor: goal.color }}
    >
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <p className="text-sm opacity-70">{goal.category}</p>

      <div className="mt-3">
        <ProgressBar value={progress} color={goal.color} />
        <p className="text-xs mt-1 opacity-70">{progress}%</p>
      </div>

      <p className="text-xs mt-2 opacity-70">{total} milestones</p>
    </div>
  );
}
