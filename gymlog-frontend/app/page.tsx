import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">GymLog 🏋️</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Track your workouts, log your exercises, and watch yourself improve.
      </p>
      <Link
        href="/workouts"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-lg"
      >
        View Workouts
      </Link>
    </div>
  );
}
