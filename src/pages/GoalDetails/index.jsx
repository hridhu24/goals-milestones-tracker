import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../../contexts/GoalsContext";
import MilestoneItem from "../../components/MilestoneItem";
import ProgressBar from "../../components/ProgressBar";
import { useState } from "react";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addMilestone } = useGoals();

  const goal = goals.find(g => g.id === id);

  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  if (!goal) return <p>Goal not found</p>;

  const completed = goal.milestones.filter(m => m.status === "completed").length;
  const total = goal.milestones.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleAdd = () => {
    if (!title.trim()) return;
    addMilestone(goal.id, {
      id: crypto.randomUUID(),
      title,
      dueDate: due,
      status: "pending",
    });
    setTitle("");
    setDue("");
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 px-3 py-1 bg-gray-300 dark:bg-[#333] rounded">
        ← Back
      </button>

      <div
        className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d]"
        style={{ borderLeft: `6px solid ${goal.color}` }}
      >
        <h2 className="text-2xl font-semibold">{goal.title}</h2>
        <p className="opacity-70">{goal.category}</p>

        <div className="mt-3">
          <ProgressBar value={progress} color={goal.color} />
          <p className="text-xs mt-1 opacity-70">{progress}% completed</p>
        </div>
      </div>

      <div className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d] mt-6">
        <h3 className="text-lg font-semibold mb-3">Add Milestone</h3>

        <input
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-[#333]"
          placeholder="Milestone title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 border rounded mb-4 bg-white dark:bg-[#333]"
          value={due}
          onChange={e => setDue(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600"
        >
          Add Milestone
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-3">Milestones</h3>

      {goal.milestones.length === 0 ? (
        <p className="opacity-60">No milestones yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {goal.milestones.map(m => (
            <MilestoneItem key={m.id} milestone={m} goalId={goal.id} />
          ))}
        </div>
      )}
    </div>
  );
}
