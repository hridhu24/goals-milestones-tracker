import { useGoals } from "../../contexts/GoalsContext";
import { useNavigate } from "react-router-dom";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function TimelineView() {
  const { goals } = useGoals();
  const navigate = useNavigate();

  const monthData = Array.from({ length: 12 }, () => []);

  goals.forEach(goal => {
    goal.milestones.forEach(m => {
      if (m.dueDate) {
        const monthIndex = new Date(m.dueDate).getMonth();
        monthData[monthIndex].push({
          ...m,
          goalColor: goal.color,
          goalId: goal.id,
          goalTitle: goal.title,
        });
      }
    });
  });

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6">Timeline</h2>

      <div className="flex gap-6 min-w-max">
        {months.map((month, index) => (
          <div
            key={month}
            className="min-w-[180px] p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d]"
          >
            <h3 className="text-lg font-semibold mb-3">{month}</h3>

            {monthData[index].length === 0 ? (
              <p className="text-sm opacity-50">No milestones</p>
            ) : (
              monthData[index].map(m => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg shadow mb-2 cursor-pointer hover:scale-[1.01] transition bg-white dark:bg-[#2a2a2a] border-l-4"
                  style={{ borderColor: m.goalColor }}
                  onClick={() => navigate(`/goal/${m.goalId}`)}
                >
                  <p className="font-medium">{m.title}</p>
                  <p className="text-xs opacity-70">{m.dueDate}</p>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
