import { useGoals } from "../../contexts/GoalsContext";

export default function Dashboard() {
  const { goals } = useGoals();

  console.log("Goals from context:", goals);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((g) => (
          <div key={g.id} className="p-4 shadow rounded bg-white">
            <h2 className="font-semibold" style={{ color: g.color }}>
              {g.title}
            </h2>
            <p>{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
