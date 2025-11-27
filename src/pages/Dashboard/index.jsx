import React, { useState } from "react";
import { useGoals } from "../../contexts/GoalsContext";
import GoalCard from "../../components/GoalCard/GoalCard";
import AddGoalModal from "../../components/AddGoalModal";
import UpcomingMilestones from "../../components/UpcomingMilestones";
import CompletedMilestones from "../../components/CompletedMilestones";


export default function Dashboard() {
  const { goals } = useGoals();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>

      {/* Grid of Goal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.length === 0 && (
          <div className="text-center opacity-60 mt-4">
            <p>No goals yet ✨</p>
            <p>Create your first goal to get started!</p>
          </div>
        )}

        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Upcoming Section */}
      <div className="mt-10">
        <UpcomingMilestones />
      </div>

      {/* Completed Section */}
      <div className="mt-10">
        <CompletedMilestones />
      </div>


      {/* Floating Add Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 bg-pink-400 hover:bg-pink-500 text-white p-4 rounded-full shadow-lg text-2xl"
      >
        +
      </button>

      {/* Modal */}
      {open && <AddGoalModal closeModal={() => setOpen(false)} />}
    </div>
  );
}
