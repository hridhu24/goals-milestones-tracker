import { createContext, useContext, useEffect, useState } from "react";
import { loadGoals, saveGoals } from "../utils/storage";

// --- Sample dataset for development ---
const seedGoals = [
  {
    id: "g1",
    title: "Fitness Journey",
    description: "Daily workouts and weekly tracking",
    category: "Health",
    color: "#FFC6C6",
    milestones: [
      { id: "m1", title: "Day 1 - Warmup", dueDate: "2025-01-05", status: "pending" },
      { id: "m2", title: "Week 1 Complete", dueDate: "2025-01-10", status: "completed" },
    ],
  },
  {
    id: "g2",
    title: "Learning React",
    description: "Build 3 mini projects",
    category: "Study",
    color: "#C6E5FF",
    milestones: [
      { id: "m1", title: "Finish basics", dueDate: "2025-02-01", status: "pending" },
    ],
  },
];

const GoalsContext = createContext();

export const GoalsContextProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  // Load from LocalStorage OR seed data
  useEffect(() => {
    const stored = loadGoals();
    if (stored.length === 0) {
      setGoals(seedGoals);
      saveGoals(seedGoals);
    } else {
      setGoals(stored);
    }
  }, []);

  // 🟣 ACTIONS
  const addGoal = (goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    saveGoals(updated);
  };

  const updateGoal = (goalId, updatedGoal) => {
    const updated = goals.map((g) =>
      g.id === goalId ? { ...g, ...updatedGoal } : g
    );
    setGoals(updated);
    saveGoals(updated);
  };

  const deleteGoal = (goalId) => {
    const updated = goals.filter((g) => g.id !== goalId);
    setGoals(updated);
    saveGoals(updated);
  };

  const addMilestone = (goalId, milestone) => {
    const updated = goals.map((g) =>
      g.id === goalId
        ? { ...g, milestones: [...g.milestones, milestone] }
        : g
    );
    setGoals(updated);
    saveGoals(updated);
  };

  const updateMilestone = (goalId, milestoneId, updatedData) => {
    const updated = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            milestones: g.milestones.map((m) =>
              m.id === milestoneId ? { ...m, ...updatedData } : m
            ),
          }
        : g
    );
    setGoals(updated);
    saveGoals(updated);
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        addMilestone,
        updateMilestone,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

// Easy hook
export const useGoals = () => useContext(GoalsContext);
