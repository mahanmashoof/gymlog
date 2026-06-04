import { getExercises } from "@/lib/api";
import ExerciseList from "@/components/ExerciseList";

export default async function ExercisesPage() {
  const exercises = await getExercises();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Exercise Catalogue</h1>
      </div>
      <ExerciseList initialExercises={exercises} />
    </div>
  );
}
