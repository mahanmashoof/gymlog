import Link from "next/link";
import { getWorkouts } from "@/lib/api";
import WorkoutSearch from "@/components/WorkoutSearch";

interface Props {
  searchParams: Promise<{
    name?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function WorkoutsPage({ searchParams }: Props) {
  const { name, from, to } = await searchParams;
  const workouts = await getWorkouts({ name, from, to });

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

      <WorkoutSearch name={name} from={from} to={to} />

      <div className="mt-6">
        {workouts.length === 0 ? (
          <p className="text-gray-500">
            {name || from || to
              ? "No workouts match your search."
              : "No workouts yet. Create your first one!"}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group bg-white border rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg group-hover:text-black">
                      {workout.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {new Date(workout.date).toLocaleDateString("en-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {workout.workoutExercises.length}{" "}
                      {workout.workoutExercises.length !== 1
                        ? "exercises"
                        : "exercise"}
                    </span>
                    <span className="text-gray-300 group-hover:text-gray-500">
                      →
                    </span>
                  </div>
                </div>
                {workout.notes && (
                  <p className="text-gray-400 text-sm mt-2 truncate">
                    {workout.notes}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
