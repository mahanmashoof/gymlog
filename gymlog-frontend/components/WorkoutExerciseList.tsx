"use client";

import { useState } from "react";
import { WorkoutExercise } from "@/lib/types";
import { deleteWorkoutExercise } from "@/lib/api";

interface Props {
  initialEntries: WorkoutExercise[];
  exerciseMap: Record<string, string>;
  workoutId: string;
}

export default function WorkoutExerciseList({
  initialEntries,
  exerciseMap,
  workoutId,
}: Props) {
  const [entries, setEntries] = useState(initialEntries);
  const [error, setError] = useState("");

  async function handleDelete(id: string) {
    try {
      await deleteWorkoutExercise(id);
      setEntries(entries.filter((e) => e.id !== id));
    } catch {
      setError("Failed to remove exercise.");
    }
  }

  if (entries.length === 0) {
    return <p className="text-gray-500 text-sm">No exercises logged yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white border rounded-lg px-4 py-3 flex items-center justify-between"
        >
          <div>
            <p className="font-medium">
              {exerciseMap[entry.exerciseId] ?? "Unknown exercise"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {entry.sets} sets × {entry.reps} reps
              {entry.weightKg > 0 ? ` @ ${entry.weightKg}kg` : " (bodyweight)"}
            </p>
          </div>
          <button
            onClick={() => handleDelete(entry.id)}
            className="text-gray-400 hover:text-red-500 text-sm transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
