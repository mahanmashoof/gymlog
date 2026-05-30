"use client";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white border rounded-lg p-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/4" />
      </div>
      <div className="bg-white border rounded-lg p-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/4" />
      </div>
      <div className="bg-white border rounded-lg p-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
}
