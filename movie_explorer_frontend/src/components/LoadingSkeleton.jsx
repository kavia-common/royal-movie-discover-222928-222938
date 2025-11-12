import React from "react";

/**
 * PUBLIC_INTERFACE
 * LoadingSkeleton displays animated placeholders while loading.
 */
export default function LoadingSkeleton() {
  return (
    <div
      className="grid gap-6 sm:gap-7 md:gap-8"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      aria-live="polite"
      aria-busy="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-white shadow-soft animate-pulse">
          <div className="aspect-[2/3] bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
