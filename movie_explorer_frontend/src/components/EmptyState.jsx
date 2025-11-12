import React from "react";

/**
 * PUBLIC_INTERFACE
 * EmptyState is shown when there are no results.
 */
export default function EmptyState({ message = "No movies found. Try a different search." }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
        <svg className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}
