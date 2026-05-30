import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">GymLog 🏋️</h1>
      <p className="text-gray-500 mt-2">Track your workouts.</p>
      <pre className="mt-4 text-sm bg-white p-4 rounded border">
        {JSON.stringify(workouts, null, 2)}
      </pre>
    </main>
  );
}
