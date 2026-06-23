"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  name?: string;
  from?: string;
  to?: string;
}

export default function WorkoutSearch({ name, from, to }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [nameValue, setNameValue] = useState(name ?? "");
  const [fromValue, setFromValue] = useState(from ?? "");
  const [toValue, setToValue] = useState(to ?? "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (nameValue) params.set("name", nameValue);
    if (fromValue) params.set("from", fromValue);
    if (toValue) params.set("to", toValue);

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  }

  function handleClear() {
    setNameValue("");
    setFromValue("");
    setToValue("");
    router.push(pathname);
  }

  const hasFilters = nameValue || fromValue || toValue;

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-3 bg-white border rounded-lg p-4"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="date"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="date"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
        >
          Search
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
