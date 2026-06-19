"use client";

import { useState } from "react";
import { WorkoutExercise, Exercise } from "@/lib/types";
import WorkoutExerciseList from "./WorkoutExerciseList";
import LogExerciseForm from "./LogExerciseForm";

interface Props {
  initialEntries: WorkoutExercise[];
  exerciseMap: Record<string, string>;
  exercises: Exercise[];
  workoutId: string;
}

export default function WorkoutExerciseSection({
  initialEntries,
  exerciseMap,
  exercises,
  workoutId,
}: Props) {
  const [entries, setEntries] = useState(initialEntries);

  function handleLogged(entry: WorkoutExercise) {
    setEntries((prev) => [...prev, entry]);
  }

  function handleDeleted(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Exercises</h2>
        <WorkoutExerciseList
          entries={entries}
          exerciseMap={exerciseMap}
          onDeleted={handleDeleted}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Log an Exercise</h2>
        <LogExerciseForm
          workoutId={workoutId}
          exercises={exercises}
          onLogged={handleLogged}
        />
      </div>
    </div>
  );
}
