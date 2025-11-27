import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGoals } from "../contexts/GoalsContext";

const pastelColors = [
  "#FFC6C6", // baby pink
  "#FFE5A5", // soft yellow
  "#C5F7C1", // mint
  "#CDE5FF", // light blue
  "#E6C7FF", // lilac
  "#FFD5E5", // rose
];

export default function AddGoalModal({ closeModal }) {
  const { addGoal } = useGoals();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [color, setColor] = useState("#FFC6C6");

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required!");

    addGoal({
      title,
      description,
      category,
      color,
      milestones: [],
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white dark:bg-[#222] p-6 rounded-2xl shadow-xl w-[330px]"
      >
        <h3 className="text-xl font-semibold mb-4">Create New Goal</h3>

        {/* Title */}
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full p-2 border rounded mb-3 dark:bg-[#111]"
          placeholder="Goal title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded mb-3 h-20 dark:bg-[#111]"
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category */}
        <label className="text-sm font-medium">Category</label>
        <select
          className="w-full p-2 border rounded mb-4 dark:bg-[#111]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Personal</option>
          <option>Study</option>
          <option>Career</option>
          <option>Fitness</option>
          <option>Health</option>
          <option>Finance</option>
          <option>Creative</option>
        </select>

        {/* Pastel Color Presets */}
        <label className="text-sm font-medium">Color Theme</label>
        <div className="flex gap-2 my-2">
          {pastelColors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${
                color === c ? "border-black dark:border-white" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Custom Color Picker */}
        <input
          type="color"
          className="w-full h-10 rounded mb-4 cursor-pointer"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-pink-400 hover:bg-pink-500 text-white shadow"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
