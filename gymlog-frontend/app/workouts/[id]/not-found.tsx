import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-2">Workout not found</h2>
      <p className="text-gray-500 mb-6">
        This workout may have been deleted or the link is incorrect.
      </p>
      <Link
        href="/workouts"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Back to workouts
      </Link>
    </div>
  );
}
