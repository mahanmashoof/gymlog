import { Exercise, Workout, WorkoutExercise } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ── Workouts ──────────────────────────────────────────

export async function getWorkouts(filters?: {
  name?: string;
  from?: string;
  to?: string;
}): Promise<Workout[]> {
  const params = new URLSearchParams();
  if (filters?.name) params.set("name", filters.name);
  if (filters?.from) params.set("from", filters.from);
  if (filters?.to) params.set("to", filters.to);

  const query = params.toString();
  const url = `${BASE_URL}/workouts/search${query ? `?${query}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/workouts/${id}`);
  if (!res.ok) throw new Error("Workout not found");
  return res.json();
}

export async function createWorkout(data: {
  name: string;
  date: string;
  notes: string;
}): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create workout");
  return res.json();
}

export async function updateWorkout(
  id: string,
  data: { name: string; date: string; notes: string },
): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/workouts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update workout");
  return res.json();
}

export async function deleteWorkout(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/workouts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete workout");
}

// ── Exercises ─────────────────────────────────────────

export async function getExercises(): Promise<Exercise[]> {
  const res = await fetch(`${BASE_URL}/exercises`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return res.json();
}

export async function createExercise(data: {
  name: string;
}): Promise<Exercise> {
  const res = await fetch(`${BASE_URL}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create exercise");
  return res.json();
}

export async function deleteExercise(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete exercise");
}

// ── WorkoutExercises ──────────────────────────────────

export async function createWorkoutExercise(data: {
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weightKg: number;
}): Promise<WorkoutExercise> {
  const res = await fetch(`${BASE_URL}/workoutexercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to log exercise");
  return res.json();
}

export async function updateWorkoutExercise(
  id: string,
  data: { sets: number; reps: number; weightKg: number },
): Promise<WorkoutExercise> {
  const res = await fetch(`${BASE_URL}/workoutexercises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update entry");
  return res.json();
}

export async function deleteWorkoutExercise(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/workoutexercises/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete entry");
}
