"use client";

import { useState } from "react";
import { createWorkoutExercise } from "@/lib/api";
import { Exercise, WorkoutExercise } from "@/lib/types";

interface Props {
  workoutId: string;
  exercises: Exercise[];
  onLogged?: (entry: WorkoutExercise) => void;
}

export default function LogExerciseForm({
  workoutId,
  exercises,
  onLogged,
}: Props) {
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id ?? "");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(8);
  const [weightKg, setWeightKg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const entry = await createWorkoutExercise({
        workoutId,
        exerciseId,
        sets,
        reps,
        weightKg,
      });
      onLogged?.(entry);
      setSuccess("Exercise logged! Refresh to see it above.");
    } catch {
      setError("Failed to log exercise. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (exercises.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No exercises in catalogue yet.{" "}
        <a href="/exercises" className="underline">
          Add some first.
        </a>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Exercise</label>
        <select
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Sets</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            min={1}
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            min={1}
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            min={0}
            step={0.5}
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Logging..." : "Log Exercise"}
      </button>
    </form>
  );
}
