import React from "react";
import { useGoals } from "../../contexts/GoalsContext";
import TimelineMonth from "./TimelineMonth";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function TimelinePage() {
  const { goals } = useGoals();

  const allMilestones = goals.flatMap(goal =>
    goal.milestones.map(m => ({
      ...m,
      goalColor: goal.color,
      goalTitle: goal.title
    }))
  );

  // Group milestones by month
  const grouped = Array.from({ length: 12 }, () => []);
  allMilestones.forEach(m => {
    const monthIndex = new Date(m.dueDate).getMonth();
    grouped[monthIndex].push(m);
  });

  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="
        grid 
        grid-cols-12 
        min-w-[1400px] 
        sm:min-w-full 
        sm:grid-cols-6 
        xs:grid-cols-3
      ">

        {MONTHS.map((month, i) => (
          <TimelineMonth
            key={month}
            title={month}
            milestones={grouped[i]}
          />
        ))}
      </div>
    </div>
  );
}
