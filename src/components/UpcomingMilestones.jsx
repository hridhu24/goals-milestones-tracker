import { useGoals } from "../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";

export default function UpcomingMilestones() {
  const { goals } = useGoals();
  const navigate = useNavigate();

  let items = [];

  goals.forEach(goal => {
    goal.milestones.forEach(m => {
      if (m.status !== "completed") {
        items.push({
          ...m,
          goalId: goal.id,
          goalTitle: goal.title,
          goalColor: goal.color,
        });
      }
    });
  });

  items = items
    .filter(m => m.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const daysLeft = (due) => {
    const now = new Date();
    const d = new Date(due);
    return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-[#1d1d1d] dark:text-white p-4 rounded-xl shadow mt-8">
      <h3 className="text-lg font-semibold mb-3">Upcoming Milestones</h3>

      {items.length === 0 && <p className="opacity-60">Nothing upcoming 🎉</p>}

      <div className="flex flex-col gap-3">
        {items.map(m => (
          <div
            key={m.id}
            className="p-3 rounded-lg shadow cursor-pointer hover:scale-[1.01] transition border-l-4 bg-white dark:bg-[#2a2a2a]"
            style={{ borderColor: m.goalColor }}
            onClick={() => navigate(`/goal/${m.goalId}`)}
          >
            <p className="font-medium">{m.title}</p>
            <p className="text-xs opacity-70">{m.goalTitle}</p>

            <div className="flex justify-between text-xs mt-2 opacity-70">
              <span>Due: {m.dueDate}</span>
              <span>{daysLeft(m.dueDate) <= 0 ? "Overdue" : `${daysLeft(m.dueDate)} days left`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
