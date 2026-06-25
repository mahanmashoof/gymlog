"use client";

import { WorkoutExercise } from "@/lib/types";
import { deleteWorkoutExercise } from "@/lib/api";
import { useState } from "react";

interface Props {
  entries: WorkoutExercise[];
  exerciseMap: Record<string, string>;
  onDeleted: (id: string) => void;
}

export default function WorkoutExerciseList({
  entries,
  exerciseMap,
  onDeleted,
}: Props) {
  const [error, setError] = useState("");

  async function handleDelete(id: string) {
    try {
      await deleteWorkoutExercise(id);
      onDeleted(id);
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
          className="bg-white border rounded-lg px-4 py-3 flex items-center justify-between hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 rounded-lg p-2 text-center min-w-[48px]">
              <p className="text-xs text-gray-500">sets</p>
              <p className="font-bold text-lg leading-none">{entry.sets}</p>
            </div>
            <div>
              <p className="font-medium">
                {exerciseMap[entry.exerciseId] ?? "Unknown exercise"}
              </p>
              <p className="text-gray-500 text-sm">
                {entry.reps} reps
                {entry.weightKg > 0
                  ? ` · ${entry.weightKg}kg`
                  : " · bodyweight"}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(entry.id)}
            className="text-gray-300 hover:text-red-500 transition-colors text-lg"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
