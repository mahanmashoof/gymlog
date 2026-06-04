import Link from "next/link";
import { getWorkout, getExercises } from "@/lib/api";
import { notFound } from "next/navigation";
import LogExerciseForm from "@/components/LogExerciseForm";
import WorkoutExerciseList from "@/components/WorkoutExerciseList";

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
        <h2 className="text-lg font-semibold mb-4">Exercises</h2>
        <WorkoutExerciseList
          initialEntries={workout.workoutExercises}
          exerciseMap={exerciseMap}
          workoutId={id}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Log an Exercise</h2>
        <LogExerciseForm workoutId={id} exercises={exercises} />
      </div>
    </div>
  );
}
