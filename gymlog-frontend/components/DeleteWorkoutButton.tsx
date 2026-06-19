"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteWorkout } from "@/lib/api";

interface Props {
  id: string;
}

export default function DeleteWorkoutButton({ id }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteWorkout(id);
      router.push("/workouts");
      router.refresh();
    } catch {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="border border-red-200 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-50"
    >
      Delete
    </button>
  );
}
