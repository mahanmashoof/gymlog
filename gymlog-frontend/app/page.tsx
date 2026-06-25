import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="text-6xl mb-6">🏋️</div>
      <h1 className="text-4xl font-bold tracking-tight mb-3">GymLog</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Track your workouts, log your exercises, and watch yourself get
        stronger.
      </p>
      <div className="flex gap-3">
        <Link
          href="/workouts"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          View Workouts
        </Link>
        <Link
          href="/workouts/new"
          className="border px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          + New Workout
        </Link>
      </div>
    </div>
  );
}
