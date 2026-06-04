"use client";

import { useState } from "react";
import { createExercise, deleteExercise } from "@/lib/api";
import { Exercise } from "@/lib/types";

interface Props {
  initialExercises: Exercise[];
}

export default function ExerciseList({ initialExercises }: Props) {
  const [exercises, setExercises] = useState(initialExercises);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const created = await createExercise({ name });
      setExercises([...exercises, created]);
      setName("");
    } catch {
      setError("Failed to create exercise. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteExercise(id);
      setExercises(exercises.filter((e) => e.id !== id));
    } catch {
      setError("Failed to delete exercise. It may be used in a workout.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Add exercise form */}
      <form onSubmit={handleCreate} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Squat"
          required
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Exercise list */}
      {exercises.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No exercises yet. Add your first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white border rounded-lg px-4 py-3 flex items-center justify-between"
            >
              <span className="font-medium">{exercise.name}</span>
              <button
                onClick={() => handleDelete(exercise.id)}
                className="text-gray-400 hover:text-red-500 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
