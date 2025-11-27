import { useGoals } from "../../contexts/GoalsContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";

export default function Settings() {
  const { setGoals } = useGoals();
  const { theme, toggleTheme } = useTheme();

  const handleClear = () => {
    if (!confirm("Are you sure you want to clear ALL data?")) return;

    // Clear saved goals
    localStorage.removeItem("goals");

    // Reset state in context
    setGoals([]);

    alert("All data cleared!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Theme Section */}
      <div className="bg-white dark:bg-[#222] p-4 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Appearance</h3>
        <p className="text-sm opacity-70 mb-3">Switch between light & dark modes.</p>
        <ThemeToggle />
      </div>

      {/* Clear Data */}
      <div className="bg-white dark:bg-[#222] p-4 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Data</h3>
        <p className="text-sm opacity-70 mb-3">Clear all stored goals and milestones.</p>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded"
        >
          Clear All Data
        </button>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-[#222] p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-sm opacity-70">
          Goals & Milestones Tracker<br />
          Built using React, TailwindCSS & Framer Motion ✨
        </p>
      </div>
    </div>
  );
}
