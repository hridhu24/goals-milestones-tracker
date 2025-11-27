import ThemeToggle from "../components/ThemeToggle";


export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold">Goals & Milestones Tracker</h1>
      <ThemeToggle />
    </header>
  );
}
