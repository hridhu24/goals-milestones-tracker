import { useGoals } from "../contexts/GoalsContext";

export default function MilestoneItem({
  milestone,
  goalId,
  index,
  total,
  onEdit,
  onMoveUp,
  onMoveDown,
}) {
  const { toggleMilestone, deleteMilestone } = useGoals();

  return (
    <div className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d] dark:text-white flex justify-between items-center mb-2">
      {/* Left section */}
      <div>
        <p
          className={`font-medium ${
            milestone.status === "completed"
              ? "line-through opacity-60"
              : ""
          }`}
        >
          {milestone.title}
        </p>

        {milestone.dueDate && (
          <p className="text-xs opacity-60 mt-1">
            Due: {milestone.dueDate}
          </p>
        )}
      </div>

      {/* Right buttons */}
      <div className="flex gap-3 items-center">
        {/* Move Up */}
        <button
          disabled={index === 0}
          onClick={() => onMoveUp(milestone.id)}
          className={`text-sm ${
            index === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
        >
          ▲
        </button>

        {/* Move Down */}
        <button
          disabled={index === total - 1}
          onClick={() => onMoveDown(milestone.id)}
          className={`text-sm ${
            index === total - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
        >
          ▼
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(milestone)}
          className="text-sm hover:text-yellow-500"
        >
          ✏
        </button>

        {/* Complete / Uncomplete checkbox */}
        <input
          type="checkbox"
          checked={milestone.status === "completed"}
          onChange={() => toggleMilestone(goalId, milestone.id)}
          className="w-5 h-5 cursor-pointer"
        />

        {/* Delete */}
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
