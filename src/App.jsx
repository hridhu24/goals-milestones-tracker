import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GoalDetails from "./pages/GoalDetails";
import TimelineView from "./pages/TimelineView";
import Settings from "./pages/Settings";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { loadGoals, saveGoals } from "./utils/storage";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goal/:id" element={<GoalDetails />} />
          <Route path="/timeline" element={<TimelineView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <div style={{ padding: "20px", background: "#f8f8f8" }}>
          <button onClick={() => {
              saveGoals([
                {
                  id: "g1",
                  title: "Test Goal",
                  description: "Testing LocalStorage",
                  category: "Work",
                  color: "#FFC6C6",
                  milestones: [],
                  progress: 0,
                },
              ]);
              alert("Saved to LocalStorage");
            }}
          >
            Save Test Goal
          </button>

          <button
            onClick={() => {
              const goals = loadGoals();
              console.log(goals);
              alert("Check console (F12) → goals loaded");
            }}
            style={{ marginLeft: "10px" }}
          >
            Load Goals
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
