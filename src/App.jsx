import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GoalDetails from "./pages/GoalDetails";
import TimelineView from "./pages/TimelineView";
import Settings from "./pages/Settings";

import Header from "./components/Header";
import Footer from "./components/Footer";

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
      </main>

      <Footer />
    </div>
  );
}
