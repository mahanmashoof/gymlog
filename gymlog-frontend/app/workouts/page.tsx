import Link from "next/link";
import { getWorkouts } from "@/lib/api";

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <Link
          href="/workouts/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + New Workout
        </Link>
      </div>

      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts yet. Create your first one!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{workout.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(workout.date).toLocaleDateString("en-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-gray-400 text-sm">
                  {workout.workoutExercises.length} exercise
                  {workout.workoutExercises.length !== 1 ? "s" : ""}
                </div>
              </div>
              {workout.notes && (
                <p className="text-gray-500 text-sm mt-2">{workout.notes}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
