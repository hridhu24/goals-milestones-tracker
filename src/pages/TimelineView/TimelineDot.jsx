import React from "react";

export default function TimelineDot({ milestone }) {
  const isOverdue =
    milestone.status !== "Completed" &&
    new Date(milestone.dueDate) < new Date();

  return (
    <button
      onClick={() => alert(`Open milestone: ${milestone.title}`)}
      className="w-full flex items-center gap-2"
    >
      <div
        className={`w-4 h-4 rounded-full border-2`}
        style={{
          backgroundColor: milestone.goalColor,
          borderColor: isOverdue ? "red" : milestone.goalColor,
        }}
      ></div>

      <span className="text-sm truncate">{milestone.title}</span>
    </button>
  );
}
