import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../../contexts/GoalsContext";
import MilestoneItem from "../../components/MilestoneItem";
import ProgressBar from "../../components/ProgressBar";
import { useState } from "react";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addMilestone, updateGoal } = useGoals();

  const goal = goals.find((g) => g.id === id);

  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  // Edit modal state
  const [editingMilestone, setEditingMilestone] = useState(null);

  if (!goal) return <p>Goal not found</p>;

  const completed = goal.milestones.filter((m) => m.status === "completed").length;
  const total = goal.milestones.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Add new milestone
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

  // --------------------------------
  // 🔼 Move Up
  // --------------------------------
  const moveUp = (mId) => {
    const index = goal.milestones.findIndex((m) => m.id === mId);
    if (index === 0) return;

    const newList = [...goal.milestones];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];

    updateGoal(goal.id, { milestones: newList });
  };

  // --------------------------------
  // 🔽 Move Down
  // --------------------------------
  const moveDown = (mId) => {
    const index = goal.milestones.findIndex((m) => m.id === mId);
    if (index === goal.milestones.length - 1) return;

    const newList = [...goal.milestones];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];

    updateGoal(goal.id, { milestones: newList });
  };

  // --------------------------------
  // ✏ OPEN EDIT MODAL
  // --------------------------------
  const openEditModal = (milestone) => {
    setEditingMilestone({ ...milestone });
  };

  // --------------------------------
  // 💾 SAVE EDITED MILESTONE
  // --------------------------------
  const saveEditedMilestone = () => {
    const updated = goal.milestones.map((m) =>
      m.id === editingMilestone.id ? editingMilestone : m
    );

    updateGoal(goal.id, { milestones: updated });
    setEditingMilestone(null);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-300 dark:bg-[#333] rounded"
      >
        ← Back
      </button>

      {/* Goal Header */}
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

      {/* Add Milestone */}
      <div className="p-4 rounded-xl shadow bg-white dark:bg-[#1d1d1d] mt-6">
        <h3 className="text-lg font-semibold mb-3">Add Milestone</h3>

        <input
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-[#333]"
          placeholder="Milestone title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 border rounded mb-4 bg-white dark:bg-[#333]"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded bg-pink-500 text-white hover:bg-pink-600"
        >
          Add Milestone
        </button>
      </div>

      {/* Listing Milestones */}
      <h3 className="text-lg font-semibold mt-6 mb-3">Milestones</h3>

      {goal.milestones.length === 0 ? (
        <p className="opacity-60">No milestones yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {goal.milestones.map((m, i) => (
            <MilestoneItem
              key={m.id}
              milestone={m}
              goalId={goal.id}
              index={i}
              total={goal.milestones.length}
              onEdit={() => openEditModal(m)}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
            />
          ))}
        </div>
      )}

      {/* ----------------------------- */}
      {/* ✏ EDIT MILESTONE MODAL */}
      {/* ----------------------------- */}
      {editingMilestone && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1d1d1d] p-5 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Edit Milestone</h3>

            <input
              className="w-full p-2 border rounded mb-3 bg-white dark:bg-[#333]"
              value={editingMilestone.title}
              onChange={(e) =>
                setEditingMilestone({
                  ...editingMilestone,
                  title: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-[#333]"
              value={editingMilestone.dueDate}
              onChange={(e) =>
                setEditingMilestone({
                  ...editingMilestone,
                  dueDate: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingMilestone(null)}
                className="px-3 py-1 bg-gray-300 dark:bg-[#333] rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEditedMilestone}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
