import React, { useState } from "react";
import { useGoals } from "../../contexts/GoalsContext";

const pastelColors = [
  "#FFC6C6", "#FFDFAF", "#FFF3B0",
  "#C9F4DE", "#C7E9FF", "#E4C7FF"
];

export default function GoalForm({ onClose }) {
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [color, setColor] = useState("#FFC6C6");

  const handleSubmit = (e) => {
    e.preventDefault();

    addGoal({
      title,
      description,
      category,
      color,
      milestones: [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">Create New Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full p-2 border rounded"
            placeholder="Goal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Personal</option>
            <option>Study</option>
            <option>Fitness</option>
            <option>Career</option>
            <option>Health</option>
            <option>Finance</option>
          </select>

          {/* Color picker */}
          <div>
            <p className="mb-1 text-sm font-medium">Choose Color</p>
            <div className="flex gap-2">
              {pastelColors.map((c) => (
                <div
                  key={c}
                  className={`w-8 h-8 rounded-full border cursor-pointer ${
                    color === c ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg mt-2"
          >
            Create Goal
          </button>

        </form>

        <button
          className="mt-3 text-sm text-gray-500 underline w-full"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
