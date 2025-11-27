import { useGoals } from "../contexts/GoalsContext";

export default function MilestoneItem({ milestone, goalId }) {
  const { toggleMilestone, deleteMilestone } = useGoals();

  return (
    <div className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d] dark:text-white flex justify-between items-center">
      <div>
        <p className={`font-medium ${milestone.status === "completed" ? "line-through opacity-60" : ""}`}>
          {milestone.title}
        </p>
        {milestone.dueDate && (
          <p className="text-xs opacity-60 mt-1">Due: {milestone.dueDate}</p>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={milestone.status === "completed"}
          onChange={() => toggleMilestone(goalId, milestone.id)}
          className="w-5 h-5 cursor-pointer"
        />

        <button
          onClick={() => deleteMilestone(goalId, milestone.id)}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
