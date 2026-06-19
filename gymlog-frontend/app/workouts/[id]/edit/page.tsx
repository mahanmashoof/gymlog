import { getWorkout } from "@/lib/api";
import { notFound } from "next/navigation";
import EditWorkoutForm from "@/components/EditWorkoutForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditWorkoutPage({ params }: Props) {
  const { id } = await params;

  let workout;
  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>
      <EditWorkoutForm workout={workout} />
    </div>
  );
}
