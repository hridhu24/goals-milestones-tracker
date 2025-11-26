import React from "react";

export default function GoalCard({ goal }) {
  return (
    <div
      className="p-4 rounded-xl shadow bg-white border cursor-pointer"
      style={{ borderLeft: `6px solid ${goal.color}` }}
    >
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <p className="text-sm text-gray-500">{goal.category}</p>

      <div className="mt-3 h-2 bg-gray-200 rounded">
        <div
          className="h-full rounded"
          style={{
            width: `${goal.progress || 0}%`,
            backgroundColor: goal.color,
          }}
        />
      </div>
    </div>
  );
}
