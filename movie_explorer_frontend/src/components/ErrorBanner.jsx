import React from "react";

/**
 * PUBLIC_INTERFACE
 * ErrorBanner shows an accessible error alert.
 */
export default function ErrorBanner({ error, onClose }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 flex items-start gap-3"
    >
      <svg className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.75a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM10 5.5a.75.75 0 00-.75.75v4a.75.75 0 001.5 0v-4A.75.75 0 0010 5.5z" clipRule="evenodd"/>
      </svg>
      <div className="flex-1">
        <p className="font-medium">Something went wrong</p>
        <p className="text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-800 focus-ring rounded-md"
        aria-label="Dismiss error"
      >
        Dismiss
      </button>
    </div>
  );
}
