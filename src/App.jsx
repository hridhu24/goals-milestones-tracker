import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import GoalDetails from "./pages/GoalDetails";
import TimelineView from "./pages/TimelineView";
import Settings from "./pages/Settings";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-black dark:text-white transition">
      <Header />

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goal/:id" element={<GoalDetails />} />
          <Route path="/timeline" element={<TimelineView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
