import { useGoals } from "../contexts/GoalsContext";

export default function CompletedMilestones() {
  const { goals } = useGoals();

  const completed = goals
    .map(goal => ({
      goalId: goal.id,
      goalTitle: goal.title,
      goalColor: goal.color,
      items: goal.milestones.filter(m => m.status === "completed"),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className="bg-white dark:bg-[#1d1d1d] dark:text-white p-4 rounded-xl shadow mt-12">
      <h3 className="text-lg font-semibold mb-4">Completed Milestones</h3>

      {completed.length === 0 && (
        <p className="opacity-60 text-sm">No completed milestones yet — keep going! 💪</p>
      )}

      {completed.map(group => (
        <div key={group.goalId} className="mb-6">
          <h4 className="font-semibold mb-2" style={{ color: group.goalColor }}>
            {group.goalTitle}
          </h4>

          <div className="flex flex-col gap-2">
            {group.items.map(m => (
              <div
                key={m.id}
                className="p-3 rounded-lg shadow bg-green-50 dark:bg-green-900/30 flex justify-between items-center"
              >
                <span>{m.title}</span>
                <span className="text-green-600 dark:text-green-300 font-bold">✔</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
