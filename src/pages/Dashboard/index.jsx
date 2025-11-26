import React, { useState } from "react";
import { useGoals } from "../../contexts/GoalsContext";
import GoalCard from "../../components/GoalCard/GoalCard";
import GoalForm from "../../components/GoalForm/GoalForm";


export default function Dashboard() {
  const { goals } = useGoals();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="p-6 relative">

      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setOpenForm(true)}
        className="fixed bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full text-3xl shadow-lg"
      >
        +
      </button>

      {openForm && <GoalForm onClose={() => setOpenForm(false)} />}
    </div>
  );
}
