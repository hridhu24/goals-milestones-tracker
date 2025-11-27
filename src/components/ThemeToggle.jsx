import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-pink-200 dark:bg-pink-700 transition"
    >
      {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
