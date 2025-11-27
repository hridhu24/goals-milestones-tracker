import React from "react";
import TimelineDot from "./TimelineDot";

export default function TimelineMonth({ title, milestones }) {
  return (
    <div className="border-r border-gray-300 px-4">
      <h3 className="text-center font-medium mb-3 sticky top-0 bg-white dark:bg-gray-900 py-1">
        {title}
      </h3>

      <div className="flex flex-col gap-3">
        {milestones.map(m => (
          <TimelineDot key={m.id} milestone={m} />
        ))}
      </div>
    </div>
  );
}
