import Link from "next/link";
import { getWorkout, getExercises } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params;

  let workout;
  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  const exercises = await getExercises();
  const exerciseMap = Object.fromEntries(exercises.map((e) => [e.id, e.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/workouts"
            className="text-sm text-gray-500 hover:text-black mb-1 block"
          >
            ← Back to workouts
          </Link>
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date(workout.date).toLocaleDateString("en-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {workout.notes && (
        <div className="bg-white border rounded-lg p-4 mb-6">
          <p className="text-gray-600 text-sm">{workout.notes}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Exercises</h2>
      </div>

      {workout.workoutExercises.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No exercises logged yet for this workout.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {workout.workoutExercises.map((entry) => (
            <div key={entry.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {exerciseMap[entry.exerciseId] ?? "Unknown exercise"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {entry.sets} sets × {entry.reps} reps
                    {entry.weightKg > 0
                      ? ` @ ${entry.weightKg}kg`
                      : " (bodyweight)"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
