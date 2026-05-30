export interface Exercise {
  id: string;
  name: string;
}

export interface WorkoutExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weightKg: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  notes: string;
  workoutExercises: WorkoutExercise[];
}
